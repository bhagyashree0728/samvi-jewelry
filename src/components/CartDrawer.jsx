import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { cart, removeFromCart, updateQty, cartTotal, cartCount } = useCart()

  // Expose open function globally via custom event
  if (typeof window !== 'undefined') {
    window.__openCart = () => setOpen(true)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-charcoal/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div className={`cart-panel fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col ${open ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rose/40">
          <div>
            <h2 className="font-serif text-xl font-light">Shopping Bag</h2>
            <p className="text-xs font-sans text-muted mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 text-muted hover:text-charcoal transition-colors">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#c6a97e" strokeWidth="1.2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div>
                <p className="font-serif text-lg font-light text-charcoal">Your bag is empty</p>
                <p className="text-xs font-sans text-muted mt-1">Add something beautiful</p>
              </div>
              <Link to="/category/new-arrivals" onClick={() => setOpen(false)} className="btn-gold text-xs px-6 py-3 mt-2">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-5 border-b border-rose/30">
                  <Link to={`/product/${item.id}`} onClick={() => setOpen(false)} className="flex-shrink-0 img-zoom">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-widest uppercase font-sans text-gold mb-1">{item.category.replace(/-/g,' ')}</p>
                    <Link to={`/product/${item.id}`} onClick={() => setOpen(false)}>
                      <p className="font-serif text-sm text-charcoal leading-snug hover:text-gold transition-colors">{item.name}</p>
                    </Link>
                    <p className="text-xs font-sans text-muted mt-0.5">{item.material}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-rose/50">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-muted hover:text-charcoal transition-colors">−</button>
                        <span className="w-8 text-center text-xs font-sans">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-muted hover:text-charcoal transition-colors">+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-sm text-charcoal">₹{(item.price * item.qty).toLocaleString()}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted hover:text-red-500 transition-colors">
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-rose/30 bg-cream/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs tracking-widest uppercase text-muted">Subtotal</span>
              <span className="font-serif text-xl text-charcoal">₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-[10px] font-sans text-muted">Shipping & taxes calculated at checkout</p>
            <Link to="/checkout" onClick={() => setOpen(false)} className="btn-gold w-full block text-center py-4 text-xs tracking-widest">
              Proceed to Checkout
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="block text-center text-xs font-sans text-muted hover:text-gold transition-colors underline underline-offset-2">
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
