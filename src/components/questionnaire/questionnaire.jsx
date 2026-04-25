import { useState } from 'react'
import OptionButton from './optionButton'
import styles from './questionnaire.module.css'

const FLOW = {
  start: {
    question: "Let's get started.",
    isTitle: true,
    options: [
      { label: 'Wintersports', next: 'wintersport_type' },
      { label: 'Mountains/Outdoors', next: 'mountains_type' },
      { label: 'Running', next: 'running_type' },
      { label: 'Biking', next: 'biking_type' },
      { label: 'Other', next: 'other_type' },
    ],
  },

  // Winter sports
  wintersport_type: {
    question: 'What kind of winter sport?',
    options: [
      { label: 'Skiing', next: 'skiing_type' },
      { label: 'Snowboarding', next: 'snowboarding_type' },
      { label: 'Snowshoeing', next: 'snowshoeing_surface' },
      { label: 'Ice Climbing', next: 'iceclimbing_type' },
    ],
  },

  skiing_type: {
    question: 'What kind of skiing?',
    options: [
      { label: 'Resort', next: 'skiing_resort_terrain' },
      { label: 'Freeride', next: 'skiing_freeride_terrain' },
      { label: 'Ski Mountaineering', next: 'skiing_skimo_terrain' },
      { label: 'Cross-Country', next: 'skiing_xc_style' },
    ],
  },

  skiing_resort_terrain: {
    question: 'What snow terrain should we plan for?',
    options: [
      { label: 'Groomed', next: 'skiing_resort_surface' },
      { label: 'Ungroomed', next: 'skiing_resort_surface' },
      { label: 'Mixed', next: 'skiing_resort_surface' },
      { label: 'Not sure', next: 'skiing_resort_surface' },
    ],
  },
  skiing_resort_surface: {
    question: 'What snow surface should we plan for?',
    options: [
      { label: 'Soft snow/powder', next: 'focus' },
      { label: 'Firm/Icy', next: 'focus' },
      { label: 'Mixed conditions', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  skiing_freeride_terrain: {
    question: 'What snow terrain should we plan for?',
    options: [
      { label: 'Ungroomed', next: 'skiing_freeride_surface' },
      { label: 'Backcountry', next: 'skiing_freeride_surface' },
      { label: 'Mixed', next: 'skiing_freeride_surface' },
      { label: 'Not sure', next: 'skiing_freeride_surface' },
    ],
  },
  skiing_freeride_surface: {
    question: 'What snow surface should we plan for?',
    options: [
      { label: 'Soft snow/powder', next: 'skiing_freeride_conditions' },
      { label: 'Firm/Icy', next: 'skiing_freeride_conditions' },
      { label: 'Mixed conditions', next: 'skiing_freeride_conditions' },
      { label: 'Not sure', next: 'skiing_freeride_conditions' },
    ],
  },
  skiing_freeride_conditions: {
    question: 'Expected snow conditions?',
    options: [
      { label: 'Powder', next: 'focus' },
      { label: 'Mixed', next: 'focus' },
      { label: 'Technical', next: 'focus' },
    ],
  },

  skiing_skimo_terrain: {
    question: 'What snow terrain should we plan for?',
    options: [
      { label: 'Backcountry', next: 'skiing_skimo_surface' },
      { label: 'High Alpine', next: 'skiing_skimo_surface' },
      { label: 'Mixed Alpine', next: 'skiing_skimo_surface' },
      { label: 'Not sure', next: 'skiing_skimo_surface' },
    ],
  },
  skiing_skimo_surface: {
    question: 'What snow surface should we plan for?',
    options: [
      { label: 'Soft snow', next: 'skiing_skimo_technical' },
      { label: 'Firm/Icy', next: 'skiing_skimo_technical' },
      { label: 'Mixed conditions', next: 'skiing_skimo_technical' },
      { label: 'Not sure', next: 'skiing_skimo_technical' },
    ],
  },
  skiing_skimo_technical: {
    question: 'How technical is the terrain?',
    options: [
      { label: 'Skinning and skiing', next: 'focus' },
      { label: 'Bootpacking', next: 'focus' },
      { label: 'Technical alpine', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  skiing_xc_style: {
    question: 'What style of cross-country skiing?',
    options: [
      { label: 'Classic', next: 'skiing_xc_terrain' },
      { label: 'Skate', next: 'skiing_xc_terrain' },
      { label: 'Not sure', next: 'skiing_xc_terrain' },
    ],
  },
  skiing_xc_terrain: {
    question: 'What snow terrain should we plan for?',
    options: [
      { label: 'Groomed', next: 'skiing_xc_surface' },
      { label: 'Rolling', next: 'skiing_xc_surface' },
      { label: 'Mixed', next: 'skiing_xc_surface' },
      { label: 'Not sure', next: 'skiing_xc_surface' },
    ],
  },
  skiing_xc_surface: {
    question: 'What snow surface should we plan for?',
    options: [
      { label: 'Soft snow', next: 'focus' },
      { label: 'Firm/Icy', next: 'focus' },
      { label: 'Mixed conditions', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  snowboarding_type: {
    question: 'What kind of snowboarding?',
    options: [
      { label: 'Resort', next: 'snowboarding_surface' },
      { label: 'Terrain Park', next: 'snowboarding_surface' },
      { label: 'Backcountry', next: 'snowboarding_surface' },
      { label: 'Mixed Terrain', next: 'snowboarding_surface' },
      { label: 'Not sure', next: 'snowboarding_surface' },
    ],
  },
  snowboarding_surface: {
    question: 'What snow surface should we plan for?',
    options: [
      { label: 'Soft snow/powder', next: 'focus' },
      { label: 'Firm/Icy', next: 'focus' },
      { label: 'Mixed conditions', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  snowshoeing_surface: {
    question: 'What snow surface should we plan for?',
    options: [
      { label: 'Packed', next: 'focus' },
      { label: 'Deep', next: 'focus' },
      { label: 'Icy', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  iceclimbing_type: {
    question: 'What kind of ice will you climb?',
    options: [
      { label: 'Frozen waterfall', next: 'iceclimbing_temp' },
      { label: 'Mixed ice & rock', next: 'iceclimbing_temp' },
      { label: 'Alpine ice', next: 'iceclimbing_temp' },
      { label: 'Not sure', next: 'iceclimbing_temp' },
    ],
  },
  iceclimbing_temp: {
    question: 'What temperature range should we plan for?',
    options: [
      { label: 'Cold', next: 'focus' },
      { label: 'Very Cold', next: 'focus' },
      { label: 'Extreme cold', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  // Mountains/Outdoors
  mountains_type: {
    question: 'What kind of outdoor activity?',
    options: [
      { label: 'Trekking', next: 'mountains_duration' },
      { label: 'Mountaineering', next: 'mountains_duration' },
      { label: 'Climbing', next: 'climbing_where' },
      { label: 'Bouldering', next: 'bouldering_where' },
      { label: 'Camping', next: 'camping_style' },
    ],
  },
  mountains_duration: {
    question: 'How long will you be out?',
    options: [
      { label: 'Short', next: 'mountains_temp' },
      { label: 'Full Day', next: 'mountains_temp' },
      { label: 'Multi-Day', next: 'mountains_temp' },
    ],
  },
  mountains_temp: {
    question: 'What temperatures should we plan for?',
    options: [
      { label: 'Mostly warm', next: 'mountains_ground' },
      { label: 'Cool to mild', next: 'mountains_ground' },
      { label: 'Cold', next: 'mountains_ground' },
      { label: 'Variable', next: 'mountains_ground' },
    ],
  },
  mountains_ground: {
    question: 'What ground conditions should we plan for?',
    options: [
      { label: 'Mostly dry', next: 'focus' },
      { label: 'Wet or muddy', next: 'focus' },
      { label: 'Snow or icy', next: 'focus' },
      { label: 'Variable', next: 'focus' },
    ],
  },
  climbing_where: {
    question: 'Where will you climb?',
    options: [
      { label: 'Indoor', next: 'focus' },
      { label: 'Outdoor', next: 'climbing_duration' },
    ],
  },
  climbing_duration: {
    question: 'How long will you be out?',
    options: [
      { label: 'Short', next: 'climbing_temp' },
      { label: 'Full Day', next: 'climbing_temp' },
      { label: 'Multi-Day', next: 'climbing_temp' },
    ],
  },
  climbing_temp: {
    question: 'What temperatures should we plan for?',
    options: [
      { label: 'Mostly warm', next: 'climbing_ground' },
      { label: 'Cool to mild', next: 'climbing_ground' },
      { label: 'Cold', next: 'climbing_ground' },
      { label: 'Variable', next: 'climbing_ground' },
    ],
  },
  climbing_ground: {
    question: 'What ground conditions should we plan for?',
    options: [
      { label: 'Mostly dry', next: 'focus' },
      { label: 'Wet or muddy', next: 'focus' },
      { label: 'Snow or icy', next: 'focus' },
      { label: 'Variable', next: 'focus' },
    ],
  },
  bouldering_where: {
    question: 'Where will you climb?',
    options: [
      { label: 'Indoor', next: 'focus' },
      { label: 'Outdoor', next: 'bouldering_duration' },
    ],
  },
  bouldering_duration: {
    question: 'How long will you be out?',
    options: [
      { label: 'Short', next: 'bouldering_temp' },
      { label: 'Full Day', next: 'bouldering_temp' },
      { label: 'Multi-Day', next: 'bouldering_temp' },
    ],
  },
  bouldering_temp: {
    question: 'What temperatures should we plan for?',
    options: [
      { label: 'Mostly warm', next: 'bouldering_ground' },
      { label: 'Cool to mild', next: 'bouldering_ground' },
      { label: 'Cold', next: 'bouldering_ground' },
      { label: 'Variable', next: 'bouldering_ground' },
    ],
  },
  bouldering_ground: {
    question: 'What ground conditions should we plan for?',
    options: [
      { label: 'Mostly dry', next: 'focus' },
      { label: 'Wet or muddy', next: 'focus' },
      { label: 'Snow or icy', next: 'focus' },
      { label: 'Variable', next: 'focus' },
    ],
  },
  camping_style: {
    question: 'Camping style?',
    options: [
      { label: 'Car camping', next: 'camping_temp' },
      { label: 'Backpacking', next: 'camping_temp' },
    ],
  },
  camping_temp: {
    question: 'What temperatures should we plan for?',
    options: [
      { label: 'Mostly warm', next: 'camping_ground' },
      { label: 'Cool to mild', next: 'camping_ground' },
      { label: 'Cold', next: 'camping_ground' },
      { label: 'Large day-night swings', next: 'camping_ground' },
    ],
  },
  camping_ground: {
    question: 'What ground conditions should we plan for?',
    options: [
      { label: 'Mostly dry', next: 'focus' },
      { label: 'Wet or muddy', next: 'focus' },
      { label: 'Snow or icy', next: 'focus' },
      { label: 'Variable', next: 'focus' },
    ],
  },

  // Running
  running_type: {
    question: 'What kind of running are you planning?',
    options: [
      { label: 'Running', next: 'running_distance' },
      { label: 'Trail Running', next: 'running_distance' },
      { label: 'Triathlon', next: 'triathlon_distance' },
    ],
  },
  running_distance: {
    question: 'How far are you typically running?',
    options: [
      { label: 'Short (under 5 km)', next: 'running_temp' },
      { label: 'Medium (5–15 km)', next: 'running_temp' },
      { label: 'Long (15 km+)', next: 'running_temp' },
      { label: 'Not sure', next: 'running_temp' },
    ],
  },
  running_temp: {
    question: 'What temperatures should we plan for?',
    options: [
      { label: 'Mostly warm', next: 'running_ground' },
      { label: 'Cool to mild', next: 'running_ground' },
      { label: 'Cold', next: 'running_ground' },
      { label: 'Variable', next: 'running_ground' },
    ],
  },
  running_ground: {
    question: 'What ground conditions should we plan for?',
    options: [
      { label: 'Mostly dry pavement', next: 'focus' },
      { label: 'Wet pavement', next: 'focus' },
      { label: 'Icy sections', next: 'focus' },
      { label: 'Variable', next: 'focus' },
    ],
  },
  triathlon_distance: {
    question: 'What race distance are you preparing for?',
    options: [
      { label: 'Sprint', next: 'running_temp' },
      { label: 'Olympic', next: 'running_temp' },
      { label: 'Half', next: 'running_temp' },
      { label: 'Full Day', next: 'running_temp' },
      { label: 'Not sure', next: 'running_temp' },
    ],
  },

  // --- BIKING ---
  biking_type: {
    question: 'What kind of riding are you planning?',
    options: [
      { label: 'Road Cycling', next: 'biking_road_ground' },
      { label: 'Gravel Riding', next: 'biking_gravel_ground' },
      { label: 'Mountain Biking', next: 'biking_mtb_ground' },
      { label: 'Trekking/Travel', next: 'biking_trek_gear' },
      { label: 'City/Commuting', next: 'biking_city_style' },
      { label: "Children's Bike", next: 'biking_kids_age' },
    ],
  },
  biking_road_ground: {
    question: 'What ground conditions should we plan for?',
    options: [
      { label: 'Speed & performance', next: 'focus' },
      { label: 'Fitness & training', next: 'focus' },
      { label: 'Long-distance endurance', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  biking_gravel_ground: {
    question: 'Where will you ride the most?',
    options: [
      { label: 'Hard-packed gravel', next: 'focus' },
      { label: 'Rough gravel & dirt roads', next: 'focus' },
      { label: 'Mixed pavement & gravel', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  biking_mtb_ground: {
    question: 'Where will you ride the most?',
    options: [
      { label: 'Smooth trails', next: 'focus' },
      { label: 'Technical/rocky trails', next: 'focus' },
      { label: 'Steep downhill', next: 'focus' },
      { label: 'Mixed Terrain', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  biking_trek_gear: {
    question: 'Will you carry gear on your rides?',
    options: [
      { label: 'No, light day rides', next: 'focus' },
      { label: 'Yes, for commuting or errands', next: 'focus' },
      { label: 'Yes, for multi-day trips', next: 'focus' },
    ],
  },
  biking_city_style: {
    question: 'What best describes your riding?',
    options: [
      { label: 'Daily commuting', next: 'focus' },
      { label: 'Short errands', next: 'focus' },
      { label: 'Leisure city riding', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  biking_kids_age: {
    question: "What is the rider's age?",
    options: [
      { label: '2–4 years', next: 'focus' },
      { label: '5–7 years', next: 'focus' },
      { label: '8–12 years', next: 'focus' },
    ],
  },

  // --- OTHER ---
  other_type: {
    question: 'What kind of activity is this?',
    options: [
      { label: 'Yoga & Pilates', next: 'yoga_where' },
      { label: 'Fitness/Gym', next: 'gym_training' },
      { label: 'Soccer', next: 'soccer_where' },
      { label: 'Basketball', next: 'basketball_where' },
      { label: 'Swimmer', next: 'swim_where' },
      { label: 'Sportswear/Leisure', next: 'leisure_how' },
    ],
  },
  yoga_where: {
    question: 'Where will you practice?',
    options: [
      { label: 'Studio', next: 'focus' },
      { label: 'At home', next: 'focus' },
      { label: 'Both', next: 'focus' },
    ],
  },
  gym_training: {
    question: 'What kind of training?',
    options: [
      { label: 'Strength training', next: 'focus' },
      { label: 'Cardio workouts', next: 'focus' },
      { label: 'Functional/Cross training', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  soccer_where: {
    question: 'Where will you play?',
    options: [
      { label: 'Natural grass', next: 'focus' },
      { label: 'Artificial turf', next: 'focus' },
      { label: 'Indoor court', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  basketball_where: {
    question: 'Where will you play?',
    options: [
      { label: 'Indoor court', next: 'focus' },
      { label: 'Outdoor court', next: 'focus' },
      { label: 'Both', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  swim_where: {
    question: 'Where will you swim?',
    options: [
      { label: 'Indoor pool', next: 'focus' },
      { label: 'Outdoor pool', next: 'focus' },
      { label: 'Open water', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },
  leisure_how: {
    question: 'How will you wear it?',
    options: [
      { label: 'Everyday comfort', next: 'focus' },
      { label: 'Active lifestyle', next: 'focus' },
      { label: 'Travel', next: 'focus' },
      { label: 'Not sure', next: 'focus' },
    ],
  },

  // --- FOCUS (final step) ---
  focus: {
    question: 'Anything you want to focus on?',
    isFocus: true,
  },
}

const GENDER_OPTIONS = ['Women', 'Men', 'Unisex', 'Kids']

const CLOTHES_OPTIONS = [
  'Tops', 'Bottoms', 'Base layers', 'Outer layers', 'Insulation', 'Socks',
]

const OTHER_OPTIONS = [
  'Footwear', 'Core Gear', 'Safety', 'Add-Ons',
]

export default function Questionnaire({ onComplete, onViewResults }) {
  const [stepKey, setStepKey] = useState('start')
  const [history, setHistory] = useState([])
  const [answers, setAnswers] = useState({})

  // Focus step state
  const [gender, setGender] = useState('Women')
  const [clothes, setClothes] = useState([])
  const [other, setOther] = useState([])
  const [done, setDone] = useState(false)

  const step = FLOW[stepKey]

  function handleOption(option, stepKey) {
    setAnswers(prev => ({ ...prev, [stepKey]: option.label }))
    setHistory(prev => [...prev, stepKey])
    setStepKey(option.next)
  }

  function handleBack() {
    if (history.length === 0) return
    const prev = [...history]
    const last = prev.pop()
    setHistory(prev)
    setStepKey(last)
  }

  function handleSkip() {
    setHistory(prev => [...prev, stepKey])
    setStepKey(step.options?.[0]?.next || 'focus')
  }

  function toggleItem(list, setList, item) {
    setList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  function handleSubmit() {
    const focusAnswers = { gender, clothes, other }
    if (onComplete) onComplete({ ...answers, focus: focusAnswers })
    setDone(true)
  }

  // Done screen
  if (done) {
    return (
      <div className="flex flex-col items-center py-10 gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">✓</div>
        <h2 className="text-2xl font-bold">Perfect</h2>
        <p className="text-gray-500 text-center">We've captured your preferences. Let's find the perfect gear for your adventure.</p>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => onViewResults && onViewResults()}
            className="bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            View Results →
          </button>
          <button
            onClick={() => {
              setStepKey('start')
              setHistory([])
              setAnswers({})
              setGender('Women')
              setClothes([])
              setOther([])
              setDone(false)
            }}
            className="text-gray-500 hover:text-gray-800 font-medium transition-colors"
          >
            Start over
          </button>
        </div>
      </div>
    )
  }

  // Focus step
  if (step.isFocus) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Anything you want to focus on?</h2>

        {/* Gender */}
        <div>
          <p className="text-sm text-gray-500 text-center mb-3">Gender</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {GENDER_OPTIONS.map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all ${
                  gender === g
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Clothes + Other */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Clothes</p>
            <div className="flex flex-col gap-2">
              {CLOTHES_OPTIONS.map(item => (
                <label key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-400 transition-all">
                  <input
                    type="checkbox"
                    checked={clothes.includes(item)}
                    onChange={() => toggleItem(clothes, setClothes, item)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Other</p>
            <div className="flex flex-col gap-2">
              {OTHER_OPTIONS.map(item => (
                <label key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-400 transition-all">
                  <input
                    type="checkbox"
                    checked={other.includes(item)}
                    onChange={() => toggleItem(other, setOther, item)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Submit
          </button>
          <button
            onClick={handleSubmit}
            className="border border-gray-200 text-gray-600 hover:border-gray-400 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Show everything
          </button>
        </div>
      </div>
    )
  }

  const isStart = stepKey === 'start'

  return (
    <div className="flex flex-col gap-4">
      {/* Question */}
      <h2 className={`font-bold text-center ${isStart ? 'text-2xl' : 'text-xl'}`}>
        {step.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mt-2">
        {step.options.map(option => (
          <OptionButton
            key={option.label}
            label={option.label}
            onClick={() => handleOption(option, stepKey)}
          />
        ))}
      </div>

      {/* Back / Skip */}
      {!isStart && (
        <div className="flex justify-between mt-4 px-1">
          <button
            onClick={handleBack}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            Skip →
          </button>
        </div>
      )}
    </div>
  )
}