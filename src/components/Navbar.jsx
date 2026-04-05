import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const categories = [
  { label: 'New Arrivals', slug: 'new-arrivals' },
  { label: 'Best Sellers', slug: 'best-sellers' },
  { label: 'Necklaces', slug: 'necklaces' },
  { label: 'Earrings', slug: 'earrings' },
  { label: 'Rings', slug: 'rings' },
  { label: 'Bracelets', slug: 'bracelets' },
  { label: 'Kada', slug: 'kada' },
  { label: 'Chains', slug: 'chains' },
  { label: 'Pendant Sets', slug: 'pendant-sets' },
  { label: 'Hampers', slug: 'hampers' },
  { label: 'Gift Sets', slug: 'gift-sets' },
  { label: 'Bridal Collection', slug: 'bridal-collection' },
  { label: 'Festive Collection', slug: 'festive-collection' },
  { label: 'Daily Wear', slug: 'daily-wear' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [shopOpen, setShopOpen] = useState(false)
  const { cartCount, cart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setShopOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar text-white text-center py-2.5 px-4">
        <div className="flex items-center justify-center gap-8 overflow-hidden">
          <div className="marquee-track pointer-events-none select-none">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 whitespace-nowrap">
                {['✦ Free shipping on orders above ₹2,000', '◈ Ethically sourced 18k & 22k gold', '⟡ Certified authentic gemstones', '❧ Lifetime jewellery care warranty', '✦ Handcrafted in Mumbai, India'].map((text, j) => (
                  <span key={j} className="text-xs tracking-widest font-sans font-light text-gold-light px-4">{text}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-rose/40' : 'bg-white border-b border-rose/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-charcoal"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-px bg-charcoal transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-px bg-charcoal transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-charcoal transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-7">
              <div
                className="relative group"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="nav-link flex items-center gap-1 py-7">
                  Shop
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 bg-white border border-rose/30 shadow-lg py-4 z-50 w-52">
                    {categories.map(cat => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className="block px-5 py-2 font-sans text-xs tracking-wider text-charcoal hover:text-gold hover:bg-cream transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/category/bridal-collection" className="nav-link">Bridal</Link>
              <Link to="/category/new-arrivals" className="nav-link">New Arrivals</Link>
              <Link to="/category/gift-sets" className="nav-link">Gifts</Link>
            </nav>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="text-center">
                <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] text-charcoal">SAMVI</span>
                <div className="text-[9px] tracking-[0.35em] uppercase font-sans text-gold font-light -mt-0.5">Fine Jewelry</div>
              </div>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-charcoal hover:text-gold transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/>
                </svg>
              </button>

              <Link to="/cart" className="relative p-2 text-charcoal hover:text-gold transition-colors" aria-label="Cart">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-rose/30 py-4">
              <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search jewellery..."
                  className="input-field flex-1 text-sm"
                />
                <button type="submit" className="btn-gold px-6 py-2 text-xs">Search</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="p-2 text-muted hover:text-charcoal">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-charcoal/50 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
        <div className={`mobile-menu absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col ${mobileOpen ? 'open' : ''}`}>
          <div className="flex items-center justify-between px-5 py-5 border-b border-rose/30">
            <span className="font-serif text-xl tracking-widest">SAMVI</span>
            <button onClick={() => setMobileOpen(false)} className="text-muted">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="block px-6 py-3 font-sans text-xs tracking-widest uppercase text-charcoal hover:text-gold hover:bg-cream transition-colors border-b border-rose/20"
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <div className="p-5 border-t border-rose/30">
            <Link to="/cart" className="btn-gold w-full block text-center py-3 text-xs tracking-widest">
              View Cart ({cartCount})
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
