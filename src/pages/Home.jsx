import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import products from '../data/products.json'

const categories = [
  { label: 'Rings', slug: 'rings' },
  { label: 'Necklaces', slug: 'necklaces' },
  { label: 'Earrings', slug: 'earrings' },
  { label: 'Bracelets', slug: 'bracelets' },
  { label: 'Kada', slug: 'kada' },
  { label: 'Chains', slug: 'chains' },
  { label: 'Pendant Sets', slug: 'pendant-sets' },
  { label: 'Hampers', slug: 'hampers' },
]

const bestSellers = products.filter(p => p.tags.includes('best-sellers')).slice(0, 4)
const newArrivals = products.filter(p => p.tags.includes('new-arrivals')).slice(0, 4)

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-cream">
        {/* Background image */}
        <div className="absolute inset-0 img-zoom">
          <img
            src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1400&q=85"
            alt="SAMVI Fine Jewelry"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-24">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="w-10 h-px bg-gold" />
              <span className="section-label text-gold-light">New Collection 2025</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Where Love<br />
              Becomes <em className="text-gold-light not-italic">Eternal</em>
            </h1>
            <p className="font-sans text-sm md:text-base font-light text-white/75 leading-relaxed mb-10 max-w-sm animate-fade-up" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
              Handcrafted in Mumbai with ethically sourced gold and certified gemstones. Every SAMVI piece tells a story worth keeping.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <Link to="/category/new-arrivals" className="btn-gold">Explore Collection</Link>
              <Link to="/category/bridal-collection" className="btn-outline border-white/60 text-white hover:bg-white hover:text-charcoal">Bridal Collection</Link>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute bottom-10 right-6 md:right-12 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-4 text-white hidden md:block">
          <p className="text-xs tracking-widest uppercase font-sans text-gold-light mb-1">Certified</p>
          <p className="font-serif text-2xl font-light">18k Gold</p>
          <p className="text-xs font-sans text-white/60 mt-0.5">Ethically Sourced</p>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-blush border-y border-rose/40 py-5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: '✦', label: 'Handcrafted', sub: 'By master artisans' },
            { icon: '◈', label: 'Certified Gold', sub: '18k & 22k authentic' },
            { icon: '⟡', label: 'Free Shipping', sub: 'Orders above ₹2,000' },
            { icon: '❧', label: 'Lifetime Care', sub: 'Free cleaning service' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 justify-center">
              <span className="text-gold text-lg">{item.icon}</span>
              <div className="text-left">
                <p className="font-sans text-xs font-normal text-charcoal tracking-wider">{item.label}</p>
                <p className="font-sans text-[10px] text-muted">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Browse by Category</p>
          <h2 className="section-title">Find Your <em className="font-light not-italic text-gold">Perfect Piece</em></h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map(cat => (
            <CategoryCard key={cat.slug} label={cat.label} slug={cat.slug} />
          ))}
        </div>
      </section>

      {/* ── FEATURED EDITORIAL ── */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            <div className="img-zoom">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85"
                alt="SAMVI Bridal Collection"
                className="w-full h-full object-cover min-h-[400px] lg:min-h-[580px]"
              />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-16 bg-charcoal text-white">
              <p className="section-label text-gold mb-4">Spotlight</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-light leading-tight mb-5">
                The Heritage<br />
                <em className="text-gold-light">Kada Collection</em>
              </h2>
              <p className="font-sans text-sm font-light text-white/65 leading-relaxed mb-8">
                Rooted in centuries of Indian goldsmithing tradition. Each Heritage Kada is cast in solid 22k gold and intricately engraved by hand — a piece that carries the weight of history and the warmth of legacy.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-2xl text-gold-light">22k</p>
                  <p className="text-[10px] font-sans tracking-widest uppercase text-white/50">Pure Gold</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-2xl text-gold-light">Hand</p>
                  <p className="text-[10px] font-sans tracking-widest uppercase text-white/50">Engraved</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-2xl text-gold-light">100%</p>
                  <p className="text-[10px] font-sans tracking-widest uppercase text-white/50">Authentic</p>
                </div>
              </div>
              <Link to="/category/kada" className="btn-outline border-gold text-gold hover:bg-gold hover:text-white self-start">
                Shop Kada
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-2">Customer Favourites</p>
            <h2 className="section-title">Best <em className="font-light not-italic text-gold">Sellers</em></h2>
            <div className="w-12 h-px bg-gold mt-4" />
          </div>
          <Link to="/category/best-sellers" className="btn-outline hidden sm:inline-block">View All</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link to="/category/best-sellers" className="btn-outline">View All Best Sellers</Link>
        </div>
      </section>

      {/* ── BRAND STORY STRIP ── */}
      <section className="bg-blush py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label mb-4">Our Promise</p>
          <blockquote className="font-serif text-2xl md:text-3xl font-light text-charcoal italic leading-relaxed mb-6">
            "Every piece of SAMVI jewelry is a whisper of devotion, crafted to be cherished for generations."
          </blockquote>
          <div className="gold-divider" />
          <p className="font-sans text-sm text-muted font-light leading-relaxed mt-6 max-w-lg mx-auto">
            Founded in Mumbai, SAMVI blends traditional Indian goldsmithing with contemporary design. We use only ethically sourced metals and certified gemstones, ensuring each piece is as responsible as it is beautiful.
          </p>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-2">Just In</p>
            <h2 className="section-title">New <em className="font-light not-italic text-gold">Arrivals</em></h2>
            <div className="w-12 h-px bg-gold mt-4" />
          </div>
          <Link to="/category/new-arrivals" className="btn-outline hidden sm:inline-block">View All</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── GIFT / BRIDAL BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/category/gift-sets" className="group relative overflow-hidden img-zoom">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
              alt="Gift Sets"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/55 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <p className="section-label text-gold-light mb-2">For Every Occasion</p>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-4">Gift Sets & Hampers</h3>
              <span className="btn-outline border-white/70 text-white text-xs group-hover:bg-white group-hover:text-charcoal transition-all">Shop Gifts</span>
            </div>
          </Link>
          <Link to="/category/bridal-collection" className="group relative overflow-hidden img-zoom">
            <img
              src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80"
              alt="Bridal Collection"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/55 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <p className="section-label text-gold-light mb-2">For the Bride</p>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-4">Bridal Collection</h3>
              <span className="btn-outline border-white/70 text-white text-xs group-hover:bg-white group-hover:text-charcoal transition-all">View Bridal</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Reviews</p>
            <h2 className="section-title">Loved by <em className="font-light not-italic text-gold">Thousands</em></h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Sharma, Mumbai', text: 'The Celestial Ring I purchased for my engagement is breathtaking. The craftsmanship is extraordinary — far more stunning in person. SAMVI truly understands luxury.', rating: 5 },
              { name: 'Rajan Mehta, Delhi', text: "I gifted my wife the Bridal Choker Set for our anniversary. She cried when she opened it. The packaging alone is gift-worthy, and the jewellery is absolutely magnificent.", rating: 5 },
              { name: 'Aanya Krishnan, Bangalore', text: "Finally a brand that delivers on its promises — the quality is exceptional, delivery was on time, and the presentation was like receiving a gift from a luxury boutique. Will order again.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white p-7 border-t-2 border-gold">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#c6a97e" className="flex-shrink-0">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="font-serif text-sm italic text-muted leading-relaxed mb-5">"{t.text}"</p>
                <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-charcoal py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="section-label text-gold mb-3">Stay in the Know</p>
          <h2 className="font-serif text-3xl font-light text-white mb-2">New Arrivals, <em className="text-gold-light">First</em></h2>
          <p className="font-sans text-sm font-light text-white/55 mb-8">Join the SAMVI circle for exclusive access to new collections, offers & jewellery care tips.</p>
          <form className="flex gap-0" onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!') }}>
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/8 border border-white/20 px-4 py-3.5 font-sans text-sm text-white placeholder-white/35 outline-none focus:border-gold transition-colors"
            />
            <button type="submit" className="bg-gold text-white px-6 py-3.5 font-sans text-xs tracking-widest uppercase hover:bg-gold-dark transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
