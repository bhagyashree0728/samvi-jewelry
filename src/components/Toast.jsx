export default function Toast({ message }) {
  return (
    <div className="toast fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-charcoal text-white px-5 py-3.5 shadow-xl">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#c6a97e" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span className="font-sans text-xs tracking-wider whitespace-nowrap">{message}</span>
    </div>
  )
}
