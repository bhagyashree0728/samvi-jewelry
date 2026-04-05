import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount, clearCart } = useCart()

  const shipping = cartTotal >= 2000 ? 0 : 150
  const total = cartTotal + shipping

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#c6a97e" strokeWidth="1.2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-2">Your bag is empty</h2>
          <p className="font-sans text-sm text-muted font-light">Add something beautiful to begin your journey.</p>
        </div>
        <Link to="/category/all" className="btn-gold">Explore Collection</Link>
        <Link to="/" className="font-sans text-xs text-muted underline underline-offset-2 hover:text-gold transition-colors">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-cream border-b border-rose/30">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <nav className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-muted mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-charcoal">Shopping Bag</span>
          </nav>
          <div className="flex items-baseline gap-3">
            <h1 className="section-title">Shopping <em className="not-italic text-gold font-light">Bag</em></h1>
            <span className="font-sans text-sm text-muted">({cartCount} item{cartCount !== 1 ? 's' : ''})</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">

          {/* ── CART ITEMS ── */}
          <div className="lg:col-span-2">
            {/* Free shipping bar */}
            {cartTotal < 2000 && (
              <div className="mb-6 p-4 bg-blush border border-rose/40">
                <p className="font-sans text-xs text-muted">
                  Add <strong className="text-gold">₹{(2000 - cartTotal).toLocaleString()}</strong> more for free shipping
                </p>
                <div className="mt-2 h-1 bg-rose/30 overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-500"
                    style={{ width: `${Math.min(100, (cartTotal / 2000) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {cartTotal >= 2000 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200">
                <p className="font-sans text-xs text-green-700">✓ You qualify for <strong>free shipping!</strong></p>
              </div>
            )}

            {/* Items list */}
            <div className="divide-y divide-rose/30">
              {cart.map(item => {
                const discount = item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : null
                return (
                  <div key={item.id} className="py-6 flex gap-5">
                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0 img-zoom">
                      <img src={item.image} alt={item.name} className="w-24 h-32 sm:w-28 sm:h-36 object-cover" />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-1 capitalize">
                          {item.category.replace(/-/g, ' ')}
                        </p>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-serif text-base md:text-lg font-light text-charcoal hover:text-gold transition-colors leading-snug mb-1">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-sans text-xs text-muted">{item.material} · {item.stone}</p>
                      </div>

                      <div className="flex items-end justify-between mt-4 flex-wrap gap-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-rose/50">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-9 h-9 flex items-center justify-center text-muted hover:text-charcoal hover:bg-cream transition-colors"
                          >
                            −
                          </button>
                          <span className="w-10 h-9 flex items-center justify-center font-sans text-sm text-charcoal border-x border-rose/50">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-9 h-9 flex items-center justify-center text-muted hover:text-charcoal hover:bg-cream transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price + Remove */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-serif text-lg text-charcoal">₹{(item.price * item.qty).toLocaleString()}</p>
                            {item.qty > 1 && (
                              <p className="text-[10px] font-sans text-muted">₹{item.price.toLocaleString()} each</p>
                            )}
                            {discount && (
                              <p className="text-[10px] font-sans text-muted line-through">
                                ₹{(item.originalPrice * item.qty).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 flex-wrap gap-4">
              <Link to="/category/all" className="flex items-center gap-2 font-sans text-xs tracking-wider text-muted hover:text-gold transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5m7-7l-7 7 7 7"/>
                </svg>
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="font-sans text-xs tracking-wider text-muted hover:text-red-500 transition-colors underline underline-offset-2"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 sticky top-24">
              <h2 className="font-serif text-xl font-light text-charcoal mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5 pb-5 border-b border-rose/40">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between gap-3">
                    <span className="font-sans text-xs text-muted flex-1 truncate">{item.name} ×{item.qty}</span>
                    <span className="font-sans text-xs text-charcoal flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-5 pb-5 border-b border-rose/40">
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-muted">Subtotal</span>
                  <span className="font-sans text-sm text-charcoal">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-muted">Shipping</span>
                  <span className={`font-sans text-sm ${shipping === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-muted">GST (included)</span>
                  <span className="font-sans text-xs text-muted">Included</span>
                </div>
              </div>

              <div className="flex justify-between mb-7">
                <span className="font-sans text-sm tracking-wider uppercase text-charcoal">Total</span>
                <span className="font-serif text-2xl text-charcoal">₹{total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-gold w-full block text-center py-4 text-xs tracking-widest mb-3">
                Proceed to Checkout
              </Link>

              {/* Payment icons */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                {['UPI', 'Visa', 'MC', 'GPay', 'COD'].map(m => (
                  <span key={m} className="text-[9px] font-sans text-muted border border-rose/40 px-2 py-0.5">{m}</span>
                ))}
              </div>
              <p className="text-[10px] font-sans text-muted text-center mt-3">🔒 Secure 256-bit encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
