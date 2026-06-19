import { useState } from 'react'
import styles from './resultsPage.module.css'
import { getRecommendations } from '../../lib/recommend'

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

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({ cart, onClose, onUpdateQty, onRemove, onClearCart, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className={styles.cartOverlay} onClick={onClose}>
      <div className={styles.cartPanel} onClick={e => e.stopPropagation()}>
        <div className={styles.cartHeader}>
          <div>
            <h2 className={styles.cartTitle}>Shopping Cart</h2>
            <p className={styles.cartSubtitle}>{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button className={styles.cartClose} onClick={onClose}>✕</button>
        </div>

        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <p className={styles.cartEmpty}>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.key} className={styles.cartItem}>
                <img src={item.product.image} alt={item.product.name} className={styles.cartItemImg} />
                <div className={styles.cartItemInfo}>
                  <p className={styles.cartItemName}>{item.product.name}</p>
                  <p className={styles.cartItemMeta}>Size: {item.size} · Color: {item.color}</p>
                  <div className={styles.cartItemRow}>
                    <div className={styles.cartItemStepper}>
                      <button onClick={() => onUpdateQty(item.key, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.key, 1)}>+</button>
                    </div>
                    <span className={styles.cartItemPrice}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <button className={styles.cartRemove} onClick={() => onRemove(item.key)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartTotalRow}>
              <span className={styles.cartTotalLabel}>Total</span>
              <span className={styles.cartTotalPrice}>${total.toFixed(2)}</span>
            </div>
            <button className={styles.cartCheckoutBtn} onClick={onCheckout}>Checkout</button>
            <button className={styles.cartClearBtn} onClick={onClearCart}>Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Checkout Page ────────────────────────────────────────────────────────────
function CheckoutPage({ cart, onBack, onPlaceOrder }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = 9.99
  const tax = subtotal * 0.19
  const total = subtotal + shipping + tax

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutInner}>
        <div className={styles.checkoutTopBar}>
          <button className={styles.backBtn} onClick={onBack}>← Back</button>
          <h1 className={styles.checkoutTitle}>Checkout</h1>
        </div>

        <div className={styles.checkoutLayout}>
          <div className={styles.checkoutForms}>
            <div className={styles.checkoutSection}>
              <h2 className={styles.checkoutSectionTitle}>Shipping Address</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>First Name</label>
                  <input className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Last Name</label>
                  <input className={styles.formInput} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone</label>
                <input className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Address</label>
                <input className={styles.formInput} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Postal Code</label>
                  <input className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City</label>
                  <input className={styles.formInput} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Country</label>
                <select className={styles.formInput}>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>

            <div className={styles.checkoutSection}>
              <h2 className={styles.checkoutSectionTitle}>Payment Information</h2>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cardholder Name</label>
                <input className={styles.formInput} placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Card Number</label>
                <input className={styles.formInput} placeholder="1234 5678 9012 3456" />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Expiry Date</label>
                  <input className={styles.formInput} placeholder="MM/YY" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>CVV</label>
                  <input className={styles.formInput} placeholder="123" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.orderSummaryCard}>
            <h2 className={styles.orderSummaryTitle}>Order Summary</h2>
            {cart.map(item => (
              <div key={item.key} className={styles.orderItem}>
                <img src={item.product.image} alt={item.product.name} className={styles.orderItemImg} />
                <div className={styles.orderItemInfo}>
                  <p className={styles.orderItemName}>{item.product.name.length > 32 ? item.product.name.slice(0, 32) + '…' : item.product.name}</p>
                  <p className={styles.orderItemMeta}>Size: {item.size} · Color: {item.color} · Qty: {item.qty}</p>
                </div>
                <span className={styles.orderItemPrice}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr className={styles.orderDivider} />
            <div className={styles.orderLine}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className={styles.orderLine}><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className={styles.orderLine}><span>Tax (19%)</span><span>${tax.toFixed(2)}</span></div>
            <div className={styles.orderTotal}><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className={styles.placeOrderBtn} onClick={onPlaceOrder}>Place Order</button>
            <p className={styles.sslNote}>Secure payment with SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Success Page ─────────────────────────────────────────────────────────────
function SuccessPage({ onBackToShop }) {
  return (
    <div className={styles.successPage}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <CheckIcon />
        </div>
        <h2 className={styles.successTitle}>Order Successful!</h2>
        <p className={styles.successMsg}>Thank you for your order. We've sent you a confirmation email.</p>
        <p className={styles.successRedirect}>You will be redirected to the homepage shortly...</p>
        <button className={styles.successBtn} onClick={onBackToShop}>Back to Shop</button>
      </div>
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAddToCart(product, selectedSize, selectedColor, qty)
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
          <div className={styles.selectWrap}>
            <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} className={styles.select}>
              {product.sizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>
          <div className={styles.selectWrap}>
            <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} className={styles.select}>
              {product.colors.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>
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
          <button className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`} onClick={handleAdd}>
            <CartIcon />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Small Product Card ───────────────────────────────────────────────────────
function SmallProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAddToCart(product, selectedSize, selectedColor, qty)
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
          <button className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`} onClick={handleAdd}>
            <CartIcon />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Results Page ─────────────────────────────────────────────────────────────
export default function ResultsPage({ onBack, answers }) {
  const recommendations = getRecommendations(answers || {})
  const PRODUCTS = recommendations.slice(0, 3)
  const MORE_PRODUCTS = recommendations.slice(3, 6)
  const RELATED_PRODUCTS = recommendations.slice(6, 9)

  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [view, setView] = useState('results') // 'results' | 'checkout' | 'success'
  const [search, setSearch] = useState('')

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  function addToCart(product, size, color, qty) {
    setCart(prev => {
      const key = `${product.id}-${size}-${color}`
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { key, product, size, color, qty, price: product.price }]
    })
  }

  function updateQty(key, delta) {
    setCart(prev =>
      prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(i => i.key !== key))
  }

  function clearCart() {
    setCart([])
  }

  function handleCheckout() {
    setCartOpen(false)
    setView('checkout')
  }

  function handlePlaceOrder() {
    setView('success')
  }

  function handleBackToShop() {
    setCart([])
    setView('results')
  }

  const filtered = PRODUCTS.filter(p =>
    search === '' ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  if (view === 'checkout') {
    return (
      <CheckoutPage
        cart={cart}
        onBack={() => setView('results')}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  }

  if (view === 'success') {
    return <SuccessPage onBackToShop={handleBackToShop} />
  }

  return (
    <div className={styles.page}>
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
        <button className={styles.cartBtn} onClick={() => setCartOpen(true)}>
          <CartIcon />
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
      </header>

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

        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No products match your search.</p>
        )}

        <div className={styles.moreSection}>
          <h2 className={styles.moreTitle}>More Products That Fit Your Intent</h2>
          <p className={styles.moreSub}>Explore additional items carefully selected for you</p>
          <div className={styles.moreGrid}>
            {MORE_PRODUCTS.map(product => (
              <SmallProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>

        <div className={styles.relatedSection}>
          <h2 className={styles.moreTitle}>Related Products</h2>
          <p className={styles.moreSub}>Items that complement your current selections</p>
          <div className={styles.relatedGrid}>
            {RELATED_PRODUCTS.map(product => (
              <SmallProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.pageFooter}>
        <p className={styles.footerMain}>© 2026 Intentra. Intelligent shopping, curated for you.</p>
        <p className={styles.footerSub}>Premium products · Thoughtful curation · Seamless experience</p>
      </footer>

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  )
}