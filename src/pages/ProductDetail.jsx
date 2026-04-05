import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import allProducts from '../data/products.json'

export default function ProductDetail() {
  const { id } = useParams()
  const product = allProducts.find(p => p.id === Number(id))
  const { addToCart, toggleWishlist, isWishlisted } = useCart()

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <h2 className="font-serif text-3xl font-light">Product not found</h2>
        <Link to="/category/all" className="btn-gold">Browse Collection</Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)
  const images = product.images || [product.image]
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const related = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(t => product.tags.includes(t))))
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-rose/30">
        <div className="max-w-7xl mx-auto px-6 py-3.5">
          <nav className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-muted">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-gold transition-colors capitalize">
              {product.category.replace(/-/g, ' ')}
            </Link>
            <span>/</span>
            <span className="text-charcoal truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── IMAGE GALLERY ── */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[600px] pb-2 sm:pb-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-20 sm:w-18 sm:h-24 overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? 'border-gold' : 'border-transparent hover:border-rose'}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative overflow-hidden group">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-charcoal text-white text-[9px] tracking-widest uppercase font-sans px-3 py-1">{product.badge}</span>
                )}
                {discount && (
                  <span className="bg-red-600 text-white text-[9px] tracking-widest uppercase font-sans px-3 py-1">−{discount}%</span>
                )}
              </div>
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 bg-white/95 flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-white ${wishlisted ? 'text-gold' : 'text-muted hover:text-charcoal'}`}
                aria-label="Add to wishlist"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#c6a97e' : 'none'} stroke={wishlisted ? '#c6a97e' : 'currentColor'} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="flex flex-col">
            {/* Category + Stock */}
            <div className="flex items-center justify-between mb-3">
              <Link
                to={`/category/${product.category}`}
                className="section-label hover:text-gold-dark transition-colors capitalize"
              >
                {product.category.replace(/-/g, ' ')}
              </Link>
              <span className={`text-[10px] font-sans tracking-wider px-2.5 py-1 ${product.stock > 5 ? 'bg-green-50 text-green-700' : product.stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'}`}>
                {product.stock > 5 ? '✓ In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#c6a97e' : 'none'} stroke="#c6a97e" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span className="font-sans text-xs text-muted">{product.rating} · {product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-rose/40">
              <span className="font-serif text-3xl text-charcoal">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-sans text-base text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-red-600 text-white text-[10px] font-sans tracking-wider px-2 py-0.5">−{discount}%</span>
                </>
              )}
            </div>

            {/* Specs summary */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-rose/40">
              {[
                { label: 'Material', value: product.material },
                { label: 'Weight', value: product.weight },
                { label: 'Stone', value: product.stone },
              ].map(spec => (
                <div key={spec.label}>
                  <p className="text-[9px] font-sans tracking-widest uppercase text-muted mb-1">{spec.label}</p>
                  <p className="font-sans text-xs text-charcoal">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <p className="text-[10px] font-sans tracking-widest uppercase text-muted mb-2">Quantity</p>
              <div className="flex items-center border border-rose/50 w-fit">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-muted hover:text-charcoal hover:bg-cream transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 h-11 flex items-center justify-center font-sans text-sm text-charcoal border-x border-rose/50">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-11 flex items-center justify-center text-muted hover:text-charcoal hover:bg-cream transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-4 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${added ? 'bg-green-700 text-white' : 'btn-dark'} ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex items-center justify-center gap-2 px-6 py-4 border font-sans text-xs tracking-widest uppercase transition-all duration-200 ${wishlisted ? 'border-gold bg-gold/5 text-gold' : 'border-rose/60 text-muted hover:border-gold hover:text-gold'}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? '#c6a97e' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>

            {/* Perks */}
            <div className="bg-cream p-5 space-y-3 mb-6">
              {[
                { icon: '✦', text: 'Handcrafted by master artisans in Mumbai' },
                { icon: '⟡', text: 'Free insured shipping on all orders' },
                { icon: '◈', text: 'Certified authentic gold & gemstones' },
                { icon: '❧', text: 'Lifetime free cleaning & polishing' },
              ].map(perk => (
                <div key={perk.text} className="flex items-start gap-3">
                  <span className="text-gold text-sm mt-0.5 flex-shrink-0">{perk.icon}</span>
                  <span className="font-sans text-xs text-muted leading-relaxed">{perk.text}</span>
                </div>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-sans tracking-widest uppercase text-muted">Share:</span>
              {['Instagram', 'WhatsApp', 'Copy Link'].map(s => (
                <button
                  key={s}
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="text-[10px] font-sans tracking-wider text-muted hover:text-gold transition-colors border border-rose/40 px-2.5 py-1 hover:border-gold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="mt-16 border-t border-rose/30 pt-10">
          <div className="flex gap-0 border-b border-rose/30 mb-8 overflow-x-auto">
            {['description', 'details', 'care', 'reviews'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 font-sans text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${tab === t ? 'border-gold text-gold' : 'border-transparent text-muted hover:text-charcoal'}`}
              >
                {t === 'reviews' ? `Reviews (${product.reviews})` : t}
              </button>
            ))}
          </div>

          <div className="max-w-2xl">
            {tab === 'description' && (
              <div>
                <p className="font-sans text-sm text-muted leading-loose font-light">{product.description}</p>
              </div>
            )}
            {tab === 'details' && (
              <div className="space-y-0 divide-y divide-rose/30">
                {[
                  ['Product Name', product.name],
                  ['Category', product.category.replace(/-/g, ' ')],
                  ['Material', product.material],
                  ['Weight', product.weight],
                  ['Stone', product.stone],
                  ['Stock Available', `${product.stock} pieces`],
                  ['Certified', 'BIS Hallmarked, IGI Certified'],
                  ['Origin', 'Handcrafted in Mumbai, India'],
                ].map(([k, v]) => (
                  <div key={k} className="flex py-3.5">
                    <span className="w-44 flex-shrink-0 text-[10px] font-sans tracking-widest uppercase text-muted">{k}</span>
                    <span className="font-sans text-sm text-charcoal capitalize">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'care' && (
              <div className="space-y-4">
                {[
                  { title: 'Store Properly', text: 'Keep in the provided velvet pouch or the SAMVI jewellery box when not wearing to prevent scratches and tarnishing.' },
                  { title: 'Avoid Chemicals', text: 'Remove jewellery before swimming, bathing, or applying perfume, lotion, or hairspray.' },
                  { title: 'Clean Gently', text: 'Wipe with the soft cloth provided. For deeper cleaning, use lukewarm water and mild soap — then dry thoroughly.' },
                  { title: 'SAMVI Lifetime Service', text: 'Bring your piece to any SAMVI service centre for free professional cleaning and polishing, once every year.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-gold mt-0.5 flex-shrink-0">◈</span>
                    <div>
                      <p className="font-sans text-xs font-normal text-charcoal tracking-wider mb-1">{item.title}</p>
                      <p className="font-sans text-sm text-muted font-light leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-5 pb-6 border-b border-rose/30">
                  <div className="text-center">
                    <p className="font-serif text-5xl text-charcoal">{product.rating}</p>
                    <div className="flex gap-0.5 justify-center my-1">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#c6a97e' : 'none'} stroke="#c6a97e" strokeWidth="1.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-[10px] font-sans text-muted">{product.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map(star => {
                      const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 2
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-[10px] font-sans text-muted w-2">{star}</span>
                          <div className="flex-1 h-1.5 bg-rose/40 overflow-hidden">
                            <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] font-sans text-muted w-6 text-right">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {[
                  { name: 'Divya R.', city: 'Mumbai', text: 'Absolutely gorgeous piece. The craftsmanship is impeccable and it arrived in beautiful packaging. Exceeded my expectations completely.', rating: 5 },
                  { name: 'Kavitha M.', city: 'Chennai', text: 'Bought this as a gift for my mother and she was overjoyed. The quality is outstanding and it looks even more beautiful in person.', rating: 5 },
                  { name: 'Shreya B.', city: 'Pune', text: 'Love the design and the feel. Very happy with the purchase. Shipping was fast and the jewellery is exactly as pictured.', rating: 4 },
                ].map((r, i) => (
                  <div key={i} className="pb-5 border-b border-rose/20">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-sans text-xs font-normal text-charcoal">{r.name}</p>
                        <p className="text-[10px] font-sans text-muted">{r.city}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= r.rating ? '#c6a97e' : 'none'} stroke="#c6a97e" strokeWidth="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="font-sans text-sm text-muted italic font-light leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p className="section-label mb-2">You Might Also Love</p>
              <h2 className="section-title">Related <em className="not-italic text-gold font-light">Pieces</em></h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
