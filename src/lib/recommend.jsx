// src/lib/recommend.js
import products from '../data/products.json'

// Maps questionnaire step keys + selected option labels to catalog activity tags
const TAG_RULES = [
  // Winter sports
  { match: { wintersport_type: 'Skiing', skiing_type: 'Resort' }, tags: ['Skiing'] },
  { match: { skiing_type: 'Freeride' }, tags: ['Freeriding', 'Skiing'] },
  { match: { skiing_type: 'Ski Mountaineering' }, tags: ['Ski Touring', 'Speed Mountaineering', 'Mountaineering'] },
  { match: { skiing_type: 'Cross-Country' }, tags: ['Skiing', 'Trailrunning'] },
  { match: { wintersport_type: 'Snowboarding' }, tags: ['Freeriding'] },
  { match: { wintersport_type: 'Snowshoeing' }, tags: ['Hiking', 'Trekking'] },
  { match: { wintersport_type: 'Ice Climbing' }, tags: ['Ice & Mixed Climbing', 'Alpine Climbing'] },

  // Mountains/Outdoors
  { match: { mountains_type: 'Trekking' }, tags: ['Trekking', 'Hiking'] },
  { match: { mountains_type: 'Mountaineering' }, tags: ['Mountaineering', 'Expedition'] },
  { match: { mountains_type: 'Climbing' }, tags: ['Climbing', 'Alpine Climbing'] },
  { match: { mountains_type: 'Bouldering' }, tags: ['Climbing'] },
  { match: { mountains_type: 'Camping' }, tags: ['Hiking', 'Everyday'] },

  // Running
  { match: { running_type: 'Running' }, tags: ['Trailrunning', 'Everyday'] },
  { match: { running_type: 'Trail Running' }, tags: ['Trailrunning', 'Hiking'] },
  { match: { running_type: 'Triathlon' }, tags: ['Trailrunning', 'Everyday'] },

  // Biking - clothing catalog has no bike tags, fall back to Everyday
  { match: { start: 'Biking' }, tags: ['Everyday'] },

  // Other
  { match: { other_type: 'Yoga & Pilates' }, tags: ['Everyday'] },
  { match: { other_type: 'Fitness/Gym' }, tags: ['Everyday'] },
  { match: { other_type: 'Soccer' }, tags: ['Everyday'] },
  { match: { other_type: 'Basketball' }, tags: ['Everyday'] },
  { match: { other_type: 'Swimmer' }, tags: ['Everyday'] },
  { match: { other_type: 'Sportswear/Leisure' }, tags: ['Everyday'] },

  // Conditions/terrain -> protection-related boosts (handled via secondary keywords)
]

// Secondary "need" boosts based on terrain/surface/temp answers
const NEED_BOOSTS = [
  { values: ['Soft snow/powder', 'Powder', 'Deep'], keywords: ['warmth', 'packability'] },
  { values: ['Firm/Icy', 'Icy', 'Icy sections'], keywords: ['durability', 'water_impermeability'] },
  { values: ['Wet or muddy', 'Wet pavement', 'Wet or muddy trails'], keywords: ['waterproof'] },
  { values: ['Cold', 'Very Cold', 'Extreme cold'], keywords: ['warmth', 'windproof'] },
  { values: ['Mostly warm'], keywords: ['breathability', 'lightweight'] },
  { values: ['Variable', 'Mixed conditions', 'Mixed Terrain', 'Mixed'], keywords: ['stretch', 'breathability'] },
  { values: ['Backcountry', 'High Alpine', 'Technical alpine'], keywords: ['durability', 'warmth'] },
]

// Focus step -> which subcategories to include/prioritize
const CLOTHES_SUBCATEGORY = {
  Tops: ['Tops'],
  Bottoms: ['Pants', 'Shorts'],
  'Base layers': ['Tops'],
  'Outer layers': ['Jackets & Vests'],
  Insulation: ['Jackets & Vests', 'Tops'],
  Socks: ['Accessories'],
}
const OTHER_SUBCATEGORY = {
  Footwear: [], // not in this catalog
  'Core Gear': ['Jackets & Vests', 'Pants', 'Tops'],
  Safety: ['Accessories'],
  'Add-Ons': ['Accessories'],
}

function buildTagProfile(answers) {
  const tagScores = {}
  const needKeywords = new Set()

  for (const [stepKey, answerLabel] of Object.entries(answers)) {
    if (stepKey === 'focus') continue
    for (const rule of TAG_RULES) {
      const matches = Object.entries(rule.match).every(
        ([k, v]) => answers[k] === v
      )
      if (matches) {
        rule.tags.forEach(tag => { tagScores[tag] = (tagScores[tag] || 0) + 1 })
      }
    }
    for (const boost of NEED_BOOSTS) {
      if (boost.values.includes(answerLabel)) {
        boost.keywords.forEach(k => needKeywords.add(k))
      }
    }
  }

  return { tagScores, needKeywords }
}

function buildSubcategoryFilter(focus) {
  if (!focus) return null
  const subs = new Set()
  ;(focus.clothes || []).forEach(c => (CLOTHES_SUBCATEGORY[c] || []).forEach(s => subs.add(s)))
  ;(focus.other || []).forEach(o => (OTHER_SUBCATEGORY[o] || []).forEach(s => subs.add(s)))
  return subs.size > 0 ? subs : null
}

function genderMatches(productGender, selectedGender) {
  if (!selectedGender || selectedGender === 'Unisex') return true
  if (!productGender) return true
  if (selectedGender === 'Kids') return productGender === 'Kids'
  return productGender === selectedGender || productGender === 'Unisex'
}

export function scoreProduct(product, profile, subcategoryFilter, gender) {
  if (!genderMatches(product.gender, gender)) return -1
  if (subcategoryFilter && !subcategoryFilter.has(product.subcategory)) return -1

  let score = 0
  let matchedTags = 0

  for (const [tag, weight] of Object.entries(profile.tagScores)) {
    const val = product[tag]
    if (typeof val === 'number') {
      score += val * weight
      matchedTags++
    }
  }

  for (const keyword of profile.needKeywords) {
    const val = product[keyword]
    if (typeof val === 'number') score += val * 0.5
  }

  // require at least one relevant activity tag match, otherwise it's irrelevant
  if (matchedTags === 0 && Object.keys(profile.tagScores).length > 0) return -1

  score += (product.rating || 0) * 1.5
  return score
}

export function getRecommendations(answers, { limit = 12 } = {}) {
  const profile = buildTagProfile(answers)
  const focus = answers.focus || {}
  const subcategoryFilter = buildSubcategoryFilter(focus)
  const gender = focus.gender

  const scored = products
    .map(p => ({ product: p, score: scoreProduct(p, profile, subcategoryFilter, gender) }))
    .filter(s => s.score >= 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(s => normalizeProduct(s.product))
}

function normalizeProduct(p) {
  return {
    id: p.product_url,
    brand: p.subcategory,
    name: p.product_name,
    tagline: p.short_description || '',
    price: p.price_usd,
    image: p.image_url,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], // catalog has no size data; static placeholder
    colors: ['Default'], // catalog has no color data; static placeholder
  }
}