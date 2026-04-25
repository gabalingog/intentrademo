import { useState } from 'react'
import styles from './resultsPage.module.css'
import image1 from './../../assets/image1.png'
import image2 from './../../assets/image2.png'
import image3 from './../../assets/image3.png'

// ─── Hardcoded product catalogue ──────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    brand: 'Jacket & Vests',
    name: 'Mtn. Pro 2.0 HS Hooded Jacket Men',
    tagline: 'The reliable hardshell with all-mountain performance',
    price: 490,
    image: image1,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Mammut Red', 'Marine'],
  },
  {
    id: 2,
    brand: 'Jacket & Vests',
    name: 'Crater Light HS Hooded Jacket Men',
    tagline: 'Precision grip. Maximum protection. Built for exposed terrain.',
    price: 399,
    image: image2,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Silver Sage', 'Strata', 'Dark Mammut Red', 'Black', 'Marine'],
  },
  {
    id: 3,
    brand: 'Jacket & Vests',
    name: 'Crater Pro HS Hooded Jacket Men',
    tagline: 'Durable, all-mountain GORE-TEX PRO jacket',
    price: 769,
    image: image3,
    sizes: ['S', 'M', 'L', 'XL', 'XXL, 3XL'],
    colors: ['Black', 'Tschiel', 'Mammut Red'],
  }
]
 
// ─── Cart icon SVG ────────────────────────────────────────────────────────────
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
 
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
 
// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
 
  function handleAdd() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }
 
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.productImg} />
      </div>
      <div className={styles.cardBody}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.tagline}>{product.tagline}</p>
 
        <div className={styles.controls}>
          {/* Size select */}
          <div className={styles.selectWrap}>
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              className={styles.select}
            >
              {product.sizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>
 
          {/* Color select */}
          <div className={styles.selectWrap}>
            <select
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className={styles.select}
            >
              {product.colors.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>
 
          {/* Quantity stepper */}
          <div className={styles.stepper}>
            <button className={styles.stepBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className={styles.qty}>{qty}</span>
            <button className={styles.stepBtn} onClick={() => setQty(q => q + 1)}>+</button>
          </div>
        </div>
 
        <div className={styles.footer}>
          <span className={styles.price}>
            ${product.price % 1 === 0 ? product.price.toFixed(0) : product.price.toFixed(2)}
          </span>
          <button
            className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
            onClick={handleAdd}
          >
            <CartIcon />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
 
// ─── Small Product Card (for "More Products" row) ────────────────────────────
function SmallProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
 
  function handleAdd() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }
 
  return (
    <div className={styles.smallCard}>
      <div className={styles.smallImageWrap}>
        <img src={product.image} alt={product.name} className={styles.productImg} />
      </div>
      <div className={styles.smallCardBody}>
        <h3 className={styles.smallProductName}>{product.name}</h3>
        <p className={styles.smallTagline}>{product.tagline}</p>
 
        <div className={styles.controls}>
          <div className={styles.selectWrap}>
            <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} className={styles.select}>
              {product.sizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>
          {product.colors.length > 1 && (
            <div className={styles.selectWrap}>
              <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} className={styles.select}>
                {product.colors.map(c => <option key={c}>{c}</option>)}
              </select>
              <span className={styles.chevron}>▾</span>
            </div>
          )}
          <div className={styles.stepper}>
            <button className={styles.stepBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className={styles.qty}>{qty}</span>
            <button className={styles.stepBtn} onClick={() => setQty(q => q + 1)}>+</button>
          </div>
        </div>
 
        <div className={styles.footer}>
          <span className={styles.price}>
            ${product.price % 1 === 0 ? product.price.toFixed(0) : product.price.toFixed(2)}
          </span>
          <button
            className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
            onClick={handleAdd}
          >
            <CartIcon />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
 
// ─── Results Page ─────────────────────────────────────────────────────────────
export default function ResultsPage({ onBack }) {
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
 
  const filtered = PRODUCTS.filter(p =>
    search === '' ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )
 
  return (
    <div className={styles.page}>
      {/* Nav */}
      <header className={styles.header}>
        <span className={styles.logo}>Intentra</span>
        <div className={styles.searchBar}>
          <SearchIcon />
          <input
            className={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className={styles.cartBtn}>
          <CartIcon />
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
      </header>
 
      {/* Hero text */}
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Top Matches for You</h1>
          <p className={styles.heroSub}>Curated selections based on your preferences and intent</p>
          {onBack && (
            <button className={styles.backBtn} onClick={onBack}>
              ← Adjust preferences
            </button>
          )}
        </div>
 
        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
 
        {filtered.length === 0 && (
          <p className={styles.empty}>No products match your search.</p>
        )}
 
        {/* More Products section */}
        <div className={styles.moreSection}>
          <h2 className={styles.moreTitle}>More Products That Fit Your Intent</h2>
          <p className={styles.moreSub}>Explore additional items carefully selected for you</p>
          <div className={styles.moreGrid}>
            {MORE_PRODUCTS.map(product => (
              <SmallProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}