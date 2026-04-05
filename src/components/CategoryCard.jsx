import { Link } from 'react-router-dom'

const categoryImages = {
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  necklaces: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
  bracelets: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
  kada: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  chains: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
  'pendant-sets': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
  hampers: 'https://images.unsplash.com/photo-1677344173539-aeabb36c0e24?w=600&q=80',
  'gift-sets': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  'bridal-collection': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
  'festive-collection': 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80',
  'daily-wear': 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=600&q=80',
}

export default function CategoryCard({ label, slug, className = '' }) {
  const img = categoryImages[slug] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'

  return (
    <Link to={`/category/${slug}`} className={`group relative block img-zoom overflow-hidden ${className}`}>
      <img src={img} alt={label} className="w-full aspect-square object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-white text-base md:text-lg font-light leading-tight">{label}</h3>
        <div className="flex items-center gap-2 mt-1 overflow-hidden">
          <span className="text-[10px] font-sans tracking-widest uppercase text-gold-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  )
}
