import { Link } from 'react-router-dom'

const footerLinks = {
  Collections: [
    { label: 'New Arrivals', slug: 'new-arrivals' },
    { label: 'Best Sellers', slug: 'best-sellers' },
    { label: 'Bridal Collection', slug: 'bridal-collection' },
    { label: 'Festive Collection', slug: 'festive-collection' },
    { label: 'Daily Wear', slug: 'daily-wear' },
  ],
  Jewelry: [
    { label: 'Rings', slug: 'rings' },
    { label: 'Necklaces', slug: 'necklaces' },
    { label: 'Earrings', slug: 'earrings' },
    { label: 'Bracelets', slug: 'bracelets' },
    { label: 'Chains & Pendants', slug: 'chains' },
  ],
  Help: [
    { label: 'Shipping Policy', slug: null },
    { label: 'Returns & Exchange', slug: null },
    { label: 'Ring Size Guide', slug: null },
    { label: 'Jewellery Care', slug: null },
    { label: 'Contact Us', slug: null },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <span className="font-serif text-3xl tracking-[0.2em]">SAMVI</span>
            <div className="text-[9px] tracking-[0.35em] uppercase text-gold font-sans mt-0.5">Fine Jewelry</div>
          </div>
          <p className="font-sans text-sm font-light text-white/60 leading-relaxed mb-6 max-w-xs">
            Handcrafted in Mumbai with ethically sourced gold and certified gemstones. Every SAMVI piece is a whisper of devotion made permanent.
          </p>
          <div className="flex gap-3">
            {/* Instagram */}
            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Instagram">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Pinterest">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="YouTube">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold mb-5 font-normal">{section}</h4>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link.label}>
                  {link.slug ? (
                    <Link to={`/category/${link.slug}`} className="font-sans text-sm font-light text-white/60 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <span className="font-sans text-sm font-light text-white/60 hover:text-gold transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-xs text-white/40 font-light">
          © 2025 SAMVI Fine Jewelry. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {['Visa', 'Mastercard', 'UPI', 'GPay', 'PhonePe'].map(method => (
            <span key={method} className="text-[10px] font-sans text-white/40 tracking-wider border border-white/10 px-2 py-1">{method}</span>
          ))}
        </div>
        <p className="font-sans text-xs text-white/40 font-light">samvi.in</p>
      </div>
    </footer>
  )
}
