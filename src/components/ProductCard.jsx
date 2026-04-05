import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const badgeColors = {
  'New Arrival': 'bg-charcoal text-white',
  'Best Seller': 'bg-gold text-white',
  'Sale': 'bg-rose-700 text-white',
  'Bridal': 'bg-pink-800 text-white',
  'Heirloom': 'bg-amber-900 text-white',
  'Limited Edition': 'bg-charcoal text-gold',
  'Daily Wear': 'bg-white/90 text-charcoal border border-rose/60',
  'Gift Set': 'bg-gold/20 text-gold-dark border border-gold/30',
  'Festive': 'bg-amber-700 text-white',
}

export default function ProductCard({ product, className = '' }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart()
  const wishlisted = isWishlisted(product.id)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className={`group bg-white relative flex flex-col product-card-shadow hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block img-zoom relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[9px] tracking-widest uppercase font-sans px-2.5 py-1 font-normal ${badgeColors[product.badge] || 'bg-charcoal text-white'}`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-[9px] tracking-widest uppercase font-sans px-2.5 py-1 bg-red-600 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
          className={`wishlist-btn absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white ${wishlisted ? 'opacity-100 active' : ''}`}
          aria-label="Wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? '#c6a97e' : 'none'} stroke={wishlisted ? '#c6a97e' : '#2c2c2c'} strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* Quick add */}
        <button
          onClick={(e) => { e.preventDefault(); addToCart(product) }}
          className="absolute bottom-0 left-0 right-0 bg-charcoal text-white text-[10px] tracking-widest uppercase font-sans py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-gold"
        >
          Add to Bag
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1.5">
        <p className="section-label text-[9px]">{product.category.replace(/-/g, ' ')}</p>
        <Link to={`/product/${product.id}`} className="font-serif text-sm md:text-base text-charcoal hover:text-gold transition-colors leading-snug">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-sans text-sm font-normal text-charcoal">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#c6a97e' : 'none'} stroke="#c6a97e" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="text-[10px] font-sans text-muted">({product.reviews})</span>
        </div>
      </div>
    </div>
  )
}
