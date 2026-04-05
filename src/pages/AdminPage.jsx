import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrders, updateOrderStatus, STATUS_LABELS, ORDER_STATUS } from '../utils/orders'
import { getAdminRates, saveAdminRates } from '../utils/shipping'
import { getRazorpayKey, saveRazorpayKey } from '../utils/razorpay'

const NAV_ITEMS = [
  { id: 'orders',   label: 'Orders',          icon: '📦' },
  { id: 'payments', label: 'Payment Settings', icon: '💳' },
  { id: 'shipping', label: 'Shipping Rules',   icon: '🚚' },
  { id: 'email',    label: 'Email Setup',      icon: '📧' },
]

// ── QR Upload Component ───────────────────────────────────────────
function QRUpload() {
  const [qrPreview, setQrPreview] = useState(localStorage.getItem('samvi-upi-qr') || null)
  const [upiId, setUpiId]         = useState(localStorage.getItem('samvi-upi-id') || '')
  const [saved, setSaved]         = useState(false)
  const fileRef = useRef()

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setQrPreview(dataUrl)
      localStorage.setItem('samvi-upi-qr', dataUrl)
    }
    reader.readAsDataURL(file)
  }

  function saveUpiId() {
    localStorage.setItem('samvi-upi-id', upiId)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-sans text-sm text-charcoal font-normal mb-1">UPI QR Code</p>
        <p className="font-sans text-xs text-muted mb-4">Upload a QR code image for customers to scan and pay. This will appear on the checkout page.</p>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div>
            {qrPreview ? (
              <div className="w-44 h-44 border-2 border-gold/30 p-2 bg-white">
                <img src={qrPreview} alt="UPI QR" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-44 h-44 border-2 border-dashed border-rose/50 flex flex-col items-center justify-center gap-2 bg-cream cursor-pointer hover:border-gold/50 transition-colors"
                onClick={() => fileRef.current?.click()}>
                <div className="text-3xl text-muted">⬛</div>
                <p className="text-[10px] font-sans text-muted text-center">No QR uploaded</p>
              </div>
            )}
          </div>

          <div className="space-y-3 flex-1">
            <button onClick={() => fileRef.current?.click()}
              className="btn-gold text-xs px-6 py-2.5 block">
              {qrPreview ? 'Replace QR Code' : 'Upload QR Code'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {qrPreview && (
              <button onClick={() => { setQrPreview(null); localStorage.removeItem('samvi-upi-qr') }}
                className="btn-outline text-xs px-6 py-2.5 block text-red-500 border-red-300 hover:bg-red-50">
                Remove QR
              </button>
            )}
            <p className="font-sans text-[10px] text-muted">PNG, JPG, WebP accepted. Keep under 1MB for best performance.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-rose/30 pt-5">
        <p className="font-sans text-sm text-charcoal font-normal mb-3">UPI ID</p>
        <div className="flex gap-3 max-w-sm">
          <input className="input-field flex-1" placeholder="yourname@upi" value={upiId}
            onChange={e => setUpiId(e.target.value)} />
          <button onClick={saveUpiId} className={`btn-gold text-xs px-5 whitespace-nowrap ${saved ? 'bg-green-600' : ''}`}>
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
        <p className="font-sans text-[10px] text-muted mt-2">This UPI ID will be shown on the checkout page alongside the QR code.</p>
      </div>
    </div>
  )
}

// ── Shipping Rate Editor ──────────────────────────────────────────
function ShippingRules() {
  const [rates, setRates]       = useState(getAdminRates())
  const [threshold, setThreshold] = useState(localStorage.getItem('samvi-free-shipping-threshold') || '999')
  const [saved, setSaved]       = useState(false)

  function updateRate(type, zone, value) {
    setRates(r => ({
      ...r,
      [type]: { ...r[type], [zone]: parseInt(value) || 0 }
    }))
  }

  function save() {
    saveAdminRates(rates)
    localStorage.setItem('samvi-free-shipping-threshold', threshold)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Free shipping threshold */}
      <div>
        <p className="font-sans text-sm text-charcoal font-normal mb-1">Free Shipping Threshold</p>
        <p className="font-sans text-xs text-muted mb-3">Orders above this amount get free shipping on the standard tier.</p>
        <div className="flex items-center gap-3 max-w-xs">
          <span className="font-sans text-sm text-muted">₹</span>
          <input className="input-field flex-1" type="number" value={threshold}
            onChange={e => setThreshold(e.target.value)} placeholder="999" />
        </div>
      </div>

      {/* Rate table */}
      <div>
        <p className="font-sans text-sm text-charcoal font-normal mb-3">Shipping Rates by Zone (₹)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-cream">
                <th className="border border-rose/30 px-4 py-2.5 text-left text-muted font-normal tracking-wider text-[10px] uppercase">Shipping Type</th>
                <th className="border border-rose/30 px-4 py-2.5 text-center text-muted font-normal tracking-wider text-[10px] uppercase">Metro Cities</th>
                <th className="border border-rose/30 px-4 py-2.5 text-center text-muted font-normal tracking-wider text-[10px] uppercase">Standard</th>
                <th className="border border-rose/30 px-4 py-2.5 text-center text-muted font-normal tracking-wider text-[10px] uppercase">Remote Areas</th>
                <th className="border border-rose/30 px-4 py-2.5 text-left text-muted font-normal tracking-wider text-[10px] uppercase">Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates).map(([id, config]) => (
                <tr key={id} className="hover:bg-cream/50">
                  <td className="border border-rose/30 px-4 py-2.5">
                    <p className="text-charcoal font-normal">{config.label}</p>
                  </td>
                  {['metro','base','remote'].map(zone => (
                    <td key={zone} className="border border-rose/30 px-4 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-muted">₹</span>
                        <input
                          type="number"
                          className="w-16 border border-rose/40 px-2 py-1 text-center text-charcoal bg-white focus:border-gold outline-none text-xs"
                          value={config[zone]}
                          onChange={e => updateRate(id, zone, e.target.value)}
                        />
                      </div>
                    </td>
                  ))}
                  <td className="border border-rose/30 px-4 py-2.5 text-muted">{config.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-sans text-[10px] text-muted mt-2">Metro: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Ahmedabad. Remote: NE India, J&amp;K, Ladakh, Andaman.</p>
      </div>

      <button onClick={save} className={`btn-gold text-xs px-8 py-3 ${saved ? 'bg-green-600' : ''}`}>
        {saved ? '✓ Saved Successfully' : 'Save Shipping Rules'}
      </button>
    </div>
  )
}

// ── Razorpay Settings ─────────────────────────────────────────────
function PaymentSettings() {
  const [rzpKey, setRzpKey]   = useState(getRazorpayKey())
  const [saved, setSaved]     = useState(false)
  const [showKey, setShowKey] = useState(false)

  function save() {
    saveRazorpayKey(rzpKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-sm text-charcoal font-normal mb-1">Razorpay API Key</p>
        <p className="font-sans text-xs text-muted mb-4">Enter your Razorpay Key ID. Use test key (rzp_test_...) for testing, live key (rzp_live_...) for production.</p>

        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mb-4">
          <p className="font-sans text-xs text-amber-800">
            <strong>Important:</strong> For production, Razorpay order creation must happen on your server (not client-side). The Key Secret must never be exposed to browsers. Set up a backend endpoint at <code className="bg-amber-100 px-1">/api/razorpay/create-order</code> and update <code className="bg-amber-100 px-1">src/utils/razorpay.js</code>.
          </p>
        </div>

        <div className="space-y-3 max-w-md">
          <div className="flex gap-2">
            <input
              type={showKey ? 'text' : 'password'}
              className="input-field flex-1"
              placeholder="rzp_test_xxxxxxxxxxxx"
              value={rzpKey}
              onChange={e => setRzpKey(e.target.value)}
            />
            <button onClick={() => setShowKey(v => !v)} className="border border-rose/40 px-3 text-muted hover:text-charcoal transition-colors text-xs">
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <button onClick={save} className={`btn-gold text-xs px-8 py-3 ${saved ? 'bg-green-600' : ''}`}>
            {saved ? '✓ Saved' : 'Save API Key'}
          </button>
        </div>
      </div>

      <div className="border-t border-rose/30 pt-6">
        <p className="font-sans text-sm text-charcoal font-normal mb-3">Accepted Payment Methods via Razorpay</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: '📱', label: 'UPI / QR', status: 'active' },
            { icon: '💳', label: 'Credit Cards', status: 'active' },
            { icon: '🏦', label: 'Debit Cards', status: 'active' },
            { icon: '🏛️', label: 'Net Banking', status: 'active' },
            { icon: '👛', label: 'Wallets', status: 'active' },
            { icon: '📦', label: 'Cash on Delivery', status: 'manual' },
          ].map(m => (
            <div key={m.label} className="border border-rose/30 p-3 flex items-center gap-2.5">
              <span className="text-lg">{m.icon}</span>
              <div>
                <p className="font-sans text-xs text-charcoal">{m.label}</p>
                <span className={`text-[9px] font-sans ${m.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                  {m.status === 'active' ? '● Active' : '● Manual'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Email Setup ───────────────────────────────────────────────────
function EmailSetup() {
  const [config, setConfig] = useState({
    service:    localStorage.getItem('samvi-emailjs-service')  || '',
    template:   localStorage.getItem('samvi-emailjs-template') || '',
    key:        localStorage.getItem('samvi-emailjs-key')      || '',
    adminEmail: localStorage.getItem('samvi-admin-email')      || '',
  })
  const [saved, setSaved] = useState(false)

  function save() {
    localStorage.setItem('samvi-emailjs-service',  config.service)
    localStorage.setItem('samvi-emailjs-template', config.template)
    localStorage.setItem('samvi-emailjs-key',      config.key)
    localStorage.setItem('samvi-admin-email',      config.adminEmail)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 px-4 py-3">
        <p className="font-sans text-xs text-blue-800 leading-relaxed">
          <strong>Setup EmailJS (Free):</strong> Go to <a href="https://emailjs.com" target="_blank" rel="noreferrer" className="underline">emailjs.com</a> → Create account → Add Email Service → Create Email Template → Copy your Service ID, Template ID, and Public Key below. Emails will be sent directly from your browser — no server required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
        {[
          { key: 'service',    label: 'Service ID',   placeholder: 'service_xxxxxxx' },
          { key: 'template',   label: 'Template ID',  placeholder: 'template_xxxxxxx' },
          { key: 'key',        label: 'Public Key',   placeholder: 'xxxxxxxxxxx' },
          { key: 'adminEmail', label: 'Admin Email',  placeholder: 'admin@samvi.in' },
        ].map(f => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans tracking-[0.25em] uppercase text-muted">{f.label}</label>
            <input className="input-field" placeholder={f.placeholder} value={config[f.key]}
              onChange={e => setConfig(c => ({...c, [f.key]: e.target.value}))} />
          </div>
        ))}
      </div>

      <div>
        <p className="font-sans text-xs text-muted mb-2">Your email template should include these variables:</p>
        <div className="bg-cream border border-rose/30 p-3 font-mono text-[10px] text-muted space-y-0.5">
          {['{{to_email}}','{{to_name}}','{{order_id}}','{{order_date}}','{{items_list}}','{{subtotal}}','{{shipping}}','{{total}}','{{payment_method}}','{{delivery_address}}','{{status}}'].map(v => (
            <p key={v}>{v}</p>
          ))}
        </div>
      </div>

      <button onClick={save} className={`btn-gold text-xs px-8 py-3 ${saved ? 'bg-green-600' : ''}`}>
        {saved ? '✓ Saved' : 'Save Email Config'}
      </button>
    </div>
  )
}

// ── Orders List ───────────────────────────────────────────────────
function OrdersList() {
  const [orders, setOrders]     = useState(getOrders())
  const [filter, setFilter]     = useState('all')
  const [expanded, setExpanded] = useState(null)

  function refreshOrders() { setOrders(getOrders()) }

  function changeStatus(orderId, newStatus) {
    updateOrderStatus(orderId, newStatus)
    refreshOrders()
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Orders',  value: orders.length,                           color: 'text-charcoal' },
          { label: 'Pending',       value: (statusCounts.pending_verification || 0) + (statusCounts.pending_payment || 0), color: 'text-amber-600' },
          { label: 'Processing',    value: statusCounts.processing || 0,            color: 'text-blue-600' },
          { label: 'Revenue',       value: `₹${orders.reduce((s,o) => s + (o.total || 0), 0).toLocaleString()}`, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="border border-rose/30 p-4">
            <p className="font-sans text-[10px] text-muted uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`font-serif text-2xl font-light ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', ...Object.keys(STATUS_LABELS)].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`font-sans text-[10px] tracking-wider px-3 py-1.5 border transition-all ${filter === f ? 'bg-charcoal text-white border-charcoal' : 'border-rose/40 text-muted hover:border-gold/50'}`}>
            {f === 'all' ? `All (${orders.length})` : `${STATUS_LABELS[f]?.label} (${statusCounts[f] || 0})`}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-rose/40 py-12 text-center">
          <p className="font-sans text-sm text-muted">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => {
            const statusInfo = STATUS_LABELS[order.status] || { label: order.status, color: 'text-muted', bg: 'bg-cream', border: 'border-rose/30' }
            const isExpanded = expanded === order.orderId
            return (
              <div key={order.orderId} className="border border-rose/30">
                {/* Order Header */}
                <div className="p-4 flex flex-wrap items-center gap-3 justify-between cursor-pointer hover:bg-cream/50 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : order.orderId)}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="font-sans text-xs text-charcoal font-normal">{order.orderId}</span>
                    <span className={`text-[9px] font-sans px-2 py-1 border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs text-muted">{order.customer?.name}</span>
                    <span className="font-serif text-lg text-charcoal">₹{(order.total || 0).toLocaleString()}</span>
                    <span className="font-sans text-[10px] text-muted">{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                    <span className={`font-sans text-xs text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-rose/30 p-4 space-y-4 bg-cream/30">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-2">Customer</p>
                        <p className="font-sans text-xs text-charcoal">{order.customer?.name}</p>
                        <p className="font-sans text-[10px] text-muted">{order.customer?.email}</p>
                        <p className="font-sans text-[10px] text-muted">+91 {order.customer?.phone}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-2">Shipping Address</p>
                        <p className="font-sans text-xs text-muted leading-relaxed">
                          {order.shippingAddress?.address}<br/>
                          {order.shippingAddress?.city}, {order.shippingAddress?.state}<br/>
                          {order.shippingAddress?.postal}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-2">Payment</p>
                        <p className="font-sans text-xs text-charcoal capitalize">{order.paymentMethod?.replace('_',' ')}</p>
                        {order.paymentId && <p className="font-sans text-[10px] text-muted">ID: {order.paymentId}</p>}
                        {order.upiScreenshot && <p className="font-sans text-[10px] text-amber-600">📸 Screenshot: {order.upiScreenshot}</p>}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-2">Items</p>
                      <div className="space-y-2">
                        {order.items?.map(item => (
                          <div key={item.id} className="flex gap-3 items-center">
                            <img src={item.image} alt={item.name} className="w-10 object-cover flex-shrink-0" style={{height:44}} />
                            <span className="font-sans text-xs text-charcoal flex-1">{item.name}</span>
                            <span className="font-sans text-[10px] text-muted">×{item.qty}</span>
                            <span className="font-sans text-xs text-charcoal">₹{(item.price * item.qty).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financials */}
                    <div className="flex gap-6 text-xs font-sans border-t border-rose/20 pt-3">
                      <span className="text-muted">Subtotal: ₹{(order.subtotal||0).toLocaleString()}</span>
                      <span className="text-muted">Shipping: {order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost}`}</span>
                      {order.discount > 0 && <span className="text-green-600">Discount: −₹{order.discount.toLocaleString()}</span>}
                      <span className="text-charcoal font-normal">Total: ₹{(order.total||0).toLocaleString()}</span>
                    </div>

                    {/* Status Change */}
                    <div className="flex flex-wrap items-center gap-3 border-t border-rose/20 pt-3">
                      <p className="font-sans text-[10px] text-muted">Change status:</p>
                      {Object.entries(ORDER_STATUS).map(([, status]) => (
                        <button key={status} onClick={() => changeStatus(order.orderId, status)}
                          disabled={order.status === status}
                          className={`font-sans text-[9px] tracking-wider px-3 py-1.5 border transition-all ${
                            order.status === status
                              ? 'bg-charcoal text-white border-charcoal cursor-default'
                              : 'border-rose/40 text-muted hover:border-gold/50 hover:text-charcoal'
                          }`}>
                          {STATUS_LABELS[status]?.label || status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── MAIN ADMIN DASHBOARD ──────────────────────────────────────────
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('orders')
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('samvi-admin-auth') === 'true'
  )
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const ADMIN_PASSWORD = localStorage.getItem('samvi-admin-password') || 'samvi2024'

  function login() {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('samvi-admin-auth', 'true')
      setAuthenticated(true)
    } else {
      setAuthError('Incorrect password')
      setTimeout(() => setAuthError(''), 2000)
    }
  }

  function logout() {
    localStorage.removeItem('samvi-admin-auth')
    setAuthenticated(false)
    setPassword('')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white border border-rose/30 p-8 text-center space-y-6">
          <div>
            <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold mb-2">Admin Panel</p>
            <h1 className="font-serif text-2xl font-light">SAMVI Dashboard</h1>
          </div>
          <div className="space-y-3">
            <input type="password" className="input-field text-center" placeholder="Enter admin password"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()} />
            {authError && <p className="font-sans text-xs text-red-500">{authError}</p>}
            <button onClick={login} className="btn-gold w-full text-xs py-3">Access Dashboard</button>
          </div>
          <p className="font-sans text-[10px] text-muted">Default password: samvi2024</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream/20">
      {/* Top bar */}
      <div className="bg-charcoal text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-serif text-lg font-light tracking-widest">SAMVI</Link>
          <span className="font-sans text-[10px] tracking-widest text-gold/80 uppercase">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="font-sans text-[10px] text-white/60 hover:text-white tracking-wider">← View Store</Link>
          <button onClick={logout} className="font-sans text-[10px] text-white/60 hover:text-white tracking-wider">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-6">
        {/* Sidebar */}
        <div className="sm:w-48 flex-shrink-0">
          <nav className="space-y-1 bg-white border border-rose/30 p-2">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 font-sans text-xs tracking-wider transition-all ${
                  activeTab === item.id ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-muted hover:text-charcoal hover:bg-cream/50'
                }`}>
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border border-rose/30 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-light mb-6">
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </h2>

          {activeTab === 'orders'   && <OrdersList />}
          {activeTab === 'payments' && (
            <div className="space-y-10">
              <div>
                <h3 className="font-sans text-sm text-charcoal font-normal mb-4 pb-2 border-b border-rose/30">UPI QR Code Setup</h3>
                <QRUpload />
              </div>
              <div>
                <h3 className="font-sans text-sm text-charcoal font-normal mb-4 pb-2 border-b border-rose/30">Razorpay Configuration</h3>
                <PaymentSettings />
              </div>
            </div>
          )}
          {activeTab === 'shipping' && <ShippingRules />}
          {activeTab === 'email'    && <EmailSetup />}
        </div>
      </div>
    </div>
  )
}