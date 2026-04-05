import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import allProducts from '../data/products.json'

const categoryMeta = {
  'all': { label: 'All Jewelry', description: 'Browse our complete collection of handcrafted fine jewelry.' },
  'new-arrivals': { label: 'New Arrivals', description: 'The latest additions to the SAMVI collection — fresh, beautiful, and made to be loved.' },
  'best-sellers': { label: 'Best Sellers', description: 'Our most-loved pieces, chosen by thousands of happy customers.' },
  'rings': { label: 'Rings', description: 'From solitaire engagement rings to stackable everyday bands — find yours.' },
  'necklaces': { label: 'Necklaces', description: 'Delicate chains to statement chokers, crafted in 18k and 22k gold.' },
  'earrings': { label: 'Earrings', description: 'Studs, drops, hoops and jhumkas — for every occasion and every face.' },
  'bracelets': { label: 'Bracelets', description: 'Bangles, tennis bracelets, and cuffs to adorn your wrist with elegance.' },
  'kada': { label: 'Kada', description: 'Traditional gold kadas rooted in Indian artisanship — bold and timeless.' },
  'chains': { label: 'Chains', description: 'Delicate everyday chains in 18k gold — barely-there beauty.' },
  'pendant-sets': { label: 'Pendant Sets', description: 'Coordinated pendant and earring sets for an effortlessly polished look.' },
  'hampers': { label: 'Hampers', description: 'Curated jewelry hampers — the perfect gifting experience.' },
  'gift-sets': { label: 'Gift Sets', description: 'Thoughtfully assembled gift sets for every special person in your life.' },
  'bridal-collection': { label: 'Bridal Collection', description: 'Heirloom-quality bridal jewelry for the most important day of your life.' },
  'festive-collection': { label: 'Festive Collection', description: 'Celebrate every festival in radiant gold and gemstones.' },
  'daily-wear': { label: 'Daily Wear', description: 'Lightweight, comfortable, and beautiful — jewelry made for every day.' },
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
]

export default function CategoryPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const [sort, setSort] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 40000])
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCats, setSelectedCats] = useState([])

  const meta = categoryMeta[slug] || { label: slug?.replace(/-/g, ' '), description: '' }

  // Filter products
  const filtered = useMemo(() => {
    let list = [...allProducts]

    // Category filter
    if (slug === 'new-arrivals') {
      list = list.filter(p => p.tags.includes('new-arrivals'))
    } else if (slug === 'best-sellers') {
      list = list.filter(p => p.tags.includes('best-sellers'))
    } else if (slug === 'daily-wear') {
      list = list.filter(p => p.tags.includes('daily-wear'))
    } else if (slug === 'bridal-collection') {
      list = list.filter(p => p.tags.includes('bridal-collection'))
    } else if (slug === 'festive-collection') {
      list = list.filter(p => p.tags.includes('festive'))
    } else if (slug && slug !== 'all') {
      list = list.filter(p => p.category === slug || p.tags.includes(slug))
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.stone?.toLowerCase().includes(q)
      )
    }

    // Price range
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sub-category filter
    if (selectedCats.length > 0) {
      list = list.filter(p => selectedCats.includes(p.category))
    }

    // Sort
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'newest') list.sort((a, b) => b.id - a.id)

    return list
  }, [slug, searchQuery, sort, priceRange, selectedCats])

  const allCats = [...new Set(allProducts.map(p => p.category))]

  const toggleCat = (cat) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  useEffect(() => {
    setSelectedCats([])
    setSort('featured')
    setPriceRange([0, 40000])
  }, [slug])

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-cream border-b border-rose/30">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-muted mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-charcoal">{meta.label}</span>
          </nav>
          <h1 className="section-title mb-2">{meta.label}</h1>
          {searchQuery && (
            <p className="font-sans text-sm text-muted mt-1">Search results for: <strong className="text-charcoal">"{searchQuery}"</strong></p>
          )}
          <p className="font-sans text-sm text-muted font-light mt-2 max-w-lg">{meta.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 border border-rose/50 px-4 py-2.5 text-xs font-sans tracking-wider text-charcoal hover:border-gold transition-colors"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filter {selectedCats.length > 0 && `(${selectedCats.length})`}
            </button>
            <span className="font-sans text-xs text-muted">{filtered.length} piece{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-muted tracking-wider">Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-rose/50 px-3 py-2 text-xs font-sans text-charcoal outline-none focus:border-gold bg-white"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${filterOpen ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0`}>
            <div className="sticky top-24 space-y-7">
              {/* Price Range */}
              <div>
                <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Price Range</h3>
                <div className="space-y-3">
                  {[
                    [0, 5000, 'Under ₹5,000'],
                    [5000, 10000, '₹5,000 – ₹10,000'],
                    [10000, 20000, '₹10,000 – ₹20,000'],
                    [20000, 40000, '₹20,000+'],
                  ].map(([min, max, label]) => (
                    <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange[0] === min && priceRange[1] === max}
                        onChange={() => setPriceRange([min, max])}
                        className="accent-gold"
                      />
                      <span className="font-sans text-xs text-muted group-hover:text-charcoal transition-colors">{label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === 0 && priceRange[1] === 40000}
                      onChange={() => setPriceRange([0, 40000])}
                      className="accent-gold"
                    />
                    <span className="font-sans text-xs text-muted group-hover:text-charcoal transition-colors">All Prices</span>
                  </label>
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Category</h3>
                <div className="space-y-2.5">
                  {allCats.map(cat => (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(cat)}
                        onChange={() => toggleCat(cat)}
                        className="accent-gold"
                      />
                      <span className="font-sans text-xs text-muted group-hover:text-charcoal transition-colors capitalize">
                        {cat.replace(/-/g, ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(selectedCats.length > 0 || priceRange[1] !== 40000) && (
                <button
                  onClick={() => { setSelectedCats([]); setPriceRange([0, 40000]) }}
                  className="text-xs font-sans text-gold underline underline-offset-2 hover:text-gold-dark transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center">
                  <span className="text-2xl text-gold opacity-50">◇</span>
                </div>
                <h3 className="font-serif text-xl font-light text-charcoal">No pieces found</h3>
                <p className="font-sans text-sm text-muted max-w-xs">
                  {searchQuery ? `No results for "${searchQuery}". Try a different search.` : 'Try adjusting your filters.'}
                </p>
                <Link to="/category/all" className="btn-gold mt-2">Browse All Jewelry</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
