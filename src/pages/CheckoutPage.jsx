// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useCart } from '../context/CartContext'

// const STEPS = ['Contact', 'Delivery', 'Payment']

// const paymentMethods = [
//   { id: 'upi', label: 'UPI', icon: '📱', desc: 'Pay via any UPI app' },
//   { id: 'credit-card', label: 'Credit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
//   { id: 'debit-card', label: 'Debit Card', icon: '🏦', desc: 'All major banks' },
//   { id: 'net-banking', label: 'Net Banking', icon: '🏛️', desc: 'HDFC, SBI, ICICI & more' },
//   { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when delivered' },
// ]

// const shippingOptions = [
//   { id: 'standard', label: 'Standard Delivery', desc: '5-7 business days', price: 0 },
//   { id: 'express', label: 'Express Delivery', desc: '2-3 business days', price: 299 },
//   { id: 'overnight', label: 'Overnight Delivery', desc: 'Next business day', price: 599 },
// ]

// const indianStates = [
//   'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//   'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//   'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//   'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//   'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//   'Delhi', 'Jammu & Kashmir', 'Ladakh',
// ]

// function FormField({ label, error, children }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-[9px] font-sans tracking-[0.25em] uppercase text-muted font-normal">{label}</label>
//       {children}
//       {error && <span className="text-[10px] font-sans text-red-500">{error}</span>}
//     </div>
//   )
// }

// export default function CheckoutPage() {
//   const { cart, cartTotal, clearCart } = useCart()
//   const navigate = useNavigate()

//   const [step, setStep] = useState(0)
//   const [orderPlaced, setOrderPlaced] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const [contact, setContact] = useState({ name: '', email: '', phone: '' })
//   const [address, setAddress] = useState({
//     country: 'India', address: '', apartment: '',
//     city: '', state: '', postal: '',
//   })
//   const [billingSame, setBillingSame] = useState(true)
//   const [billing, setBilling] = useState({
//     address: '', apartment: '', city: '', state: '', postal: '',
//   })
//   const [shipping, setShipping] = useState('standard')
//   const [payment, setPayment] = useState('upi')
//   const [upiId, setUpiId] = useState('')
//   const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
//   const [errors, setErrors] = useState({})

//   const selectedShipping = shippingOptions.find(s => s.id === shipping)
//   const shippingCost = cartTotal >= 2000 ? 0 : selectedShipping?.price || 0
//   const total = cartTotal + shippingCost

//   if (cart.length === 0 && !orderPlaced) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
//         <h2 className="font-serif text-3xl font-light">Your cart is empty</h2>
//         <Link to="/category/all" className="btn-gold">Continue Shopping</Link>
//       </div>
//     )
//   }

//   const validate = () => {
//     const errs = {}
//     if (step === 0) {
//       if (!contact.name.trim()) errs.name = 'Full name is required'
//       if (!contact.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
//       if (!contact.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Valid 10-digit Indian mobile required'
//     }
//     if (step === 1) {
//       if (!address.address.trim()) errs.address = 'Address is required'
//       if (!address.city.trim()) errs.city = 'City is required'
//       if (!address.state) errs.state = 'State is required'
//       if (!address.postal.match(/^\d{6}$/)) errs.postal = 'Valid 6-digit PIN code required'
//     }
//     if (step === 2) {
//       if (payment === 'upi' && !upiId.match(/.+@.+/)) errs.upiId = 'Valid UPI ID required (e.g. name@upi)'
//       if ((payment === 'credit-card' || payment === 'debit-card')) {
//         if (!card.number.replace(/\s/g, '').match(/^\d{16}$/)) errs.cardNumber = 'Valid 16-digit card number required'
//         if (!card.expiry.match(/^\d{2}\/\d{2}$/)) errs.expiry = 'Valid expiry required (MM/YY)'
//         if (!card.cvv.match(/^\d{3,4}$/)) errs.cvv = 'Valid CVV required'
//         if (!card.name.trim()) errs.cardName = 'Name on card required'
//       }
//     }
//     setErrors(errs)
//     return Object.keys(errs).length === 0
//   }

//   const next = () => {
//     if (!validate()) return
//     if (step < 2) setStep(s => s + 1)
//     else placeOrder()
//   }

//   const placeOrder = () => {
//     setLoading(true)
//     setTimeout(() => {
//       clearCart()
//       setOrderPlaced(true)
//       setLoading(false)
//     }, 1800)
//   }

//   const formatCard = (val) => {
//     const digits = val.replace(/\D/g, '').slice(0, 16)
//     return digits.replace(/(.{4})/g, '$1 ').trim()
//   }

//   const formatExpiry = (val) => {
//     const digits = val.replace(/\D/g, '').slice(0, 4)
//     if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2)
//     return digits
//   }

//   // ── ORDER CONFIRMED ──
//   if (orderPlaced) {
//     const orderId = `SV${Date.now().toString().slice(-8)}`
//     return (
//       <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-20 text-center">
//         <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mb-6 animate-pulse-gold">
//           <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#c6a97e" strokeWidth="1.5">
//             <polyline points="20 6 9 17 4 12"/>
//           </svg>
//         </div>
//         <p className="section-label mb-3">Order Confirmed</p>
//         <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-3">
//           Thank <em className="text-gold not-italic">You!</em>
//         </h1>
//         <p className="font-sans text-sm text-muted font-light max-w-sm leading-relaxed mb-2">
//           Your order <strong className="text-charcoal">#{orderId}</strong> has been placed successfully.
//         </p>
//         <p className="font-sans text-sm text-muted font-light max-w-md leading-relaxed mb-8">
//           A confirmation has been sent to <strong className="text-charcoal">{contact.email}</strong>. Your jewelry will be carefully packaged and dispatched within 2 business days.
//         </p>
//         <div className="bg-white border border-rose/40 p-6 max-w-sm w-full mb-8 text-left">
//           <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-4">Delivery Details</p>
//           <p className="font-sans text-sm text-charcoal font-normal">{contact.name}</p>
//           <p className="font-sans text-xs text-muted mt-1">{address.address}{address.apartment ? `, ${address.apartment}` : ''}</p>
//           <p className="font-sans text-xs text-muted">{address.city}, {address.state} — {address.postal}</p>
//           <p className="font-sans text-xs text-muted">{address.country}</p>
//           <div className="mt-4 pt-4 border-t border-rose/30 flex justify-between">
//             <span className="font-sans text-xs text-muted">Estimated Delivery</span>
//             <span className="font-sans text-xs text-charcoal">
//               {shipping === 'overnight' ? '1 business day' : shipping === 'express' ? '2-3 business days' : '5-7 business days'}
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-4 justify-center">
//           <Link to="/" className="btn-gold">Continue Shopping</Link>
//           <Link to="/category/new-arrivals" className="btn-outline">New Arrivals</Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="bg-cream border-b border-rose/30">
//         <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
//           <nav className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-muted mb-4">
//             <Link to="/" className="hover:text-gold transition-colors">Home</Link>
//             <span>/</span>
//             <Link to="/cart" className="hover:text-gold transition-colors">Cart</Link>
//             <span>/</span>
//             <span className="text-charcoal">Checkout</span>
//           </nav>
//           <h1 className="section-title">Secure <em className="not-italic text-gold font-light">Checkout</em></h1>

//           {/* Step indicator */}
//           <div className="flex items-center gap-0 mt-6">
//             {STEPS.map((s, i) => (
//               <div key={s} className="flex items-center">
//                 <button
//                   onClick={() => i < step && setStep(i)}
//                   className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
//                 >
//                   <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans transition-all ${i < step ? 'bg-green-600 text-white' : i === step ? 'bg-gold text-white' : 'bg-rose/50 text-muted'}`}>
//                     {i < step ? (
//                       <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                     ) : i + 1}
//                   </div>
//                   <span className={`font-sans text-[10px] tracking-widest uppercase ${i === step ? 'text-charcoal' : 'text-muted'}`}>{s}</span>
//                 </button>
//                 {i < STEPS.length - 1 && (
//                   <div className={`w-12 md:w-20 h-px mx-3 ${i < step ? 'bg-green-400' : 'bg-rose/40'}`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">

//           {/* ── FORM AREA ── */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* STEP 0: Contact */}
//             {step === 0 && (
//               <div>
//                 <h2 className="font-serif text-2xl font-light mb-6">Contact Details</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <div className="sm:col-span-2">
//                     <FormField label="Full Name *" error={errors.name}>
//                       <input
//                         className="input-field"
//                         placeholder="Priya Sharma"
//                         value={contact.name}
//                         onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
//                       />
//                     </FormField>
//                   </div>
//                   <FormField label="Email Address *" error={errors.email}>
//                     <input
//                       type="email"
//                       className="input-field"
//                       placeholder="priya@email.com"
//                       value={contact.email}
//                       onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
//                     />
//                   </FormField>
//                   <FormField label="Phone Number *" error={errors.phone}>
//                     <div className="flex">
//                       <span className="border border-rose/50 border-r-0 px-3 flex items-center text-xs text-muted bg-cream">+91</span>
//                       <input
//                         type="tel"
//                         className="input-field flex-1"
//                         placeholder="9876543210"
//                         maxLength={10}
//                         value={contact.phone}
//                         onChange={e => setContact(c => ({ ...c, phone: e.target.value.replace(/\D/g, '') }))}
//                       />
//                     </div>
//                   </FormField>
//                 </div>
//               </div>
//             )}

//             {/* STEP 1: Delivery */}
//             {step === 1 && (
//               <div>
//                 <h2 className="font-serif text-2xl font-light mb-6">Delivery Address</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
//                   <div className="sm:col-span-2">
//                     <FormField label="Country / Region">
//                       <select
//                         className="input-field"
//                         value={address.country}
//                         onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
//                       >
//                         <option>India</option>
//                         <option>United States</option>
//                         <option>United Kingdom</option>
//                         <option>UAE</option>
//                         <option>Singapore</option>
//                         <option>Canada</option>
//                         <option>Australia</option>
//                       </select>
//                     </FormField>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <FormField label="Full Address *" error={errors.address}>
//                       <input
//                         className="input-field"
//                         placeholder="Flat / House no., Street name, Area"
//                         value={address.address}
//                         onChange={e => setAddress(a => ({ ...a, address: e.target.value }))}
//                       />
//                     </FormField>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <FormField label="Apartment / Suite / Floor (optional)">
//                       <input
//                         className="input-field"
//                         placeholder="Apartment, suite, unit, etc. (optional)"
//                         value={address.apartment}
//                         onChange={e => setAddress(a => ({ ...a, apartment: e.target.value }))}
//                       />
//                     </FormField>
//                   </div>
//                   <FormField label="City *" error={errors.city}>
//                     <input
//                       className="input-field"
//                       placeholder="Mumbai"
//                       value={address.city}
//                       onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
//                     />
//                   </FormField>
//                   <FormField label="State *" error={errors.state}>
//                     <select
//                       className="input-field"
//                       value={address.state}
//                       onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
//                     >
//                       <option value="">Select state</option>
//                       {indianStates.map(s => <option key={s}>{s}</option>)}
//                     </select>
//                   </FormField>
//                   <FormField label="PIN Code *" error={errors.postal}>
//                     <input
//                       className="input-field"
//                       placeholder="400001"
//                       maxLength={6}
//                       value={address.postal}
//                       onChange={e => setAddress(a => ({ ...a, postal: e.target.value.replace(/\D/g, '') }))}
//                     />
//                   </FormField>
//                 </div>

//                 {/* Shipping method */}
//                 <h3 className="font-serif text-xl font-light mb-4">Shipping Method</h3>
//                 <div className="space-y-3">
//                   {shippingOptions.map(opt => {
//                     const effectivePrice = cartTotal >= 2000 ? 0 : opt.price
//                     return (
//                       <label
//                         key={opt.id}
//                         className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shipping === opt.id ? 'border-gold bg-gold/5' : 'border-rose/40 hover:border-gold/40'}`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <input
//                             type="radio"
//                             name="shipping"
//                             value={opt.id}
//                             checked={shipping === opt.id}
//                             onChange={() => setShipping(opt.id)}
//                             className="accent-gold"
//                           />
//                           <div>
//                             <p className="font-sans text-sm text-charcoal font-normal">{opt.label}</p>
//                             <p className="font-sans text-xs text-muted">{opt.desc}</p>
//                           </div>
//                         </div>
//                         <span className={`font-sans text-sm font-normal ${effectivePrice === 0 ? 'text-green-600' : 'text-charcoal'}`}>
//                           {effectivePrice === 0 ? 'Free' : `₹${effectivePrice}`}
//                         </span>
//                       </label>
//                     )
//                   })}
//                 </div>

//                 {/* Billing address */}
//                 <div className="mt-8">
//                   <h3 className="font-serif text-xl font-light mb-4">Billing Address</h3>
//                   <label className="flex items-center gap-3 cursor-pointer mb-5">
//                     <input
//                       type="checkbox"
//                       checked={billingSame}
//                       onChange={e => setBillingSame(e.target.checked)}
//                       className="accent-gold w-4 h-4"
//                     />
//                     <span className="font-sans text-sm text-charcoal">Same as delivery address</span>
//                   </label>
//                   {!billingSame && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                       <div className="sm:col-span-2">
//                         <FormField label="Billing Address *">
//                           <input className="input-field" placeholder="Full billing address" value={billing.address} onChange={e => setBilling(b => ({ ...b, address: e.target.value }))} />
//                         </FormField>
//                       </div>
//                       <FormField label="City *">
//                         <input className="input-field" placeholder="City" value={billing.city} onChange={e => setBilling(b => ({ ...b, city: e.target.value }))} />
//                       </FormField>
//                       <FormField label="State *">
//                         <select className="input-field" value={billing.state} onChange={e => setBilling(b => ({ ...b, state: e.target.value }))}>
//                           <option value="">Select state</option>
//                           {indianStates.map(s => <option key={s}>{s}</option>)}
//                         </select>
//                       </FormField>
//                       <FormField label="PIN Code *">
//                         <input className="input-field" placeholder="400001" maxLength={6} value={billing.postal} onChange={e => setBilling(b => ({ ...b, postal: e.target.value.replace(/\D/g, '') }))} />
//                       </FormField>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* STEP 2: Payment */}
//             {step === 2 && (
//               <div>
//                 <h2 className="font-serif text-2xl font-light mb-6">Payment Method</h2>
//                 <div className="space-y-3 mb-7">
//                   {paymentMethods.map(pm => (
//                     <label
//                       key={pm.id}
//                       className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${payment === pm.id ? 'border-gold bg-gold/5' : 'border-rose/40 hover:border-gold/40'}`}
//                     >
//                       <input
//                         type="radio"
//                         name="payment"
//                         value={pm.id}
//                         checked={payment === pm.id}
//                         onChange={() => setPayment(pm.id)}
//                         className="accent-gold"
//                       />
//                       <span className="text-lg">{pm.icon}</span>
//                       <div>
//                         <p className="font-sans text-sm text-charcoal font-normal">{pm.label}</p>
//                         <p className="font-sans text-xs text-muted">{pm.desc}</p>
//                       </div>
//                     </label>
//                   ))}
//                 </div>

//                 {/* UPI input */}
//                 {payment === 'upi' && (
//                   <div className="bg-cream p-5 border border-rose/30">
//                     <FormField label="UPI ID *" error={errors.upiId}>
//                       <input
//                         className="input-field"
//                         placeholder="yourname@upi"
//                         value={upiId}
//                         onChange={e => setUpiId(e.target.value)}
//                       />
//                     </FormField>
//                     <p className="text-[10px] font-sans text-muted mt-2">You will receive a payment request on your UPI app</p>
//                   </div>
//                 )}

//                 {/* Card inputs */}
//                 {(payment === 'credit-card' || payment === 'debit-card') && (
//                   <div className="bg-cream p-5 border border-rose/30 space-y-4">
//                     <FormField label="Card Number *" error={errors.cardNumber}>
//                       <input
//                         className="input-field"
//                         placeholder="1234 5678 9012 3456"
//                         value={card.number}
//                         onChange={e => setCard(c => ({ ...c, number: formatCard(e.target.value) }))}
//                         maxLength={19}
//                       />
//                     </FormField>
//                     <FormField label="Name on Card *" error={errors.cardName}>
//                       <input
//                         className="input-field"
//                         placeholder="PRIYA SHARMA"
//                         value={card.name}
//                         onChange={e => setCard(c => ({ ...c, name: e.target.value.toUpperCase() }))}
//                       />
//                     </FormField>
//                     <div className="grid grid-cols-2 gap-4">
//                       <FormField label="Expiry Date *" error={errors.expiry}>
//                         <input
//                           className="input-field"
//                           placeholder="MM/YY"
//                           value={card.expiry}
//                           onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
//                           maxLength={5}
//                         />
//                       </FormField>
//                       <FormField label="CVV *" error={errors.cvv}>
//                         <input
//                           type="password"
//                           className="input-field"
//                           placeholder="•••"
//                           value={card.cvv}
//                           onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
//                           maxLength={4}
//                         />
//                       </FormField>
//                     </div>
//                     <p className="text-[10px] font-sans text-muted">🔒 Your card details are encrypted and secure. This is a demo simulation.</p>
//                   </div>
//                 )}

//                 {payment === 'net-banking' && (
//                   <div className="bg-cream p-5 border border-rose/30">
//                     <FormField label="Select Bank">
//                       <select className="input-field">
//                         <option>HDFC Bank</option>
//                         <option>State Bank of India (SBI)</option>
//                         <option>ICICI Bank</option>
//                         <option>Axis Bank</option>
//                         <option>Kotak Mahindra Bank</option>
//                         <option>Yes Bank</option>
//                         <option>Other Bank</option>
//                       </select>
//                     </FormField>
//                     <p className="text-[10px] font-sans text-muted mt-2">You will be redirected to your bank's secure portal to complete payment.</p>
//                   </div>
//                 )}

//                 {payment === 'cod' && (
//                   <div className="bg-amber-50 border border-amber-200 p-4">
//                     <p className="font-sans text-xs text-amber-800">
//                       <strong>Note:</strong> Cash on Delivery is available for orders below ₹15,000. An additional handling fee of ₹50 applies. Our delivery agent will collect payment at the time of delivery.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Navigation buttons */}
//             <div className="flex items-center justify-between pt-4 flex-wrap gap-3">
//               {step > 0 ? (
//                 <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 font-sans text-xs tracking-wider text-muted hover:text-gold transition-colors">
//                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
//                     <path d="M19 12H5m7-7l-7 7 7 7"/>
//                   </svg>
//                   Back
//                 </button>
//               ) : (
//                 <Link to="/cart" className="flex items-center gap-2 font-sans text-xs tracking-wider text-muted hover:text-gold transition-colors">
//                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
//                     <path d="M19 12H5m7-7l-7 7 7 7"/>
//                   </svg>
//                   Back to Cart
//                 </Link>
//               )}
//               <button
//                 onClick={next}
//                 disabled={loading}
//                 className={`btn-gold px-10 py-4 text-xs flex items-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3"/>
//                       <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : step < 2 ? `Continue to ${STEPS[step + 1]}` : 'Place Order'}
//               </button>
//             </div>
//           </div>

//           {/* ── ORDER SUMMARY ── */}
//           <div className="lg:col-span-1">
//             <div className="bg-cream p-6 sticky top-24">
//               <h3 className="font-serif text-xl font-light mb-5">Order Summary</h3>

//               {/* Items */}
//               <div className="space-y-4 mb-5 pb-5 border-b border-rose/40 max-h-60 overflow-y-auto">
//                 {cart.map(item => (
//                   <div key={item.id} className="flex gap-3">
//                     <div className="relative flex-shrink-0">
//                       <img src={item.image} alt={item.name} className="w-14 h-18 object-cover" style={{ height: '72px' }} />
//                       <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold text-white text-[9px] rounded-full flex items-center justify-center">{item.qty}</span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-sans text-xs text-charcoal leading-snug truncate">{item.name}</p>
//                       <p className="font-sans text-[10px] text-muted mt-0.5">{item.material}</p>
//                     </div>
//                     <span className="font-sans text-xs text-charcoal flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Totals */}
//               <div className="space-y-3 mb-5 pb-5 border-b border-rose/40">
//                 <div className="flex justify-between">
//                   <span className="font-sans text-xs text-muted">Subtotal</span>
//                   <span className="font-sans text-sm text-charcoal">₹{cartTotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-sans text-xs text-muted">Shipping ({selectedShipping?.label})</span>
//                   <span className={`font-sans text-sm ${shippingCost === 0 ? 'text-green-600' : 'text-charcoal'}`}>
//                     {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
//                   </span>
//                 </div>
//                 {payment === 'cod' && (
//                   <div className="flex justify-between">
//                     <span className="font-sans text-xs text-muted">COD Handling</span>
//                     <span className="font-sans text-sm text-charcoal">₹50</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span className="font-sans text-xs text-muted">GST</span>
//                   <span className="font-sans text-xs text-muted">Included</span>
//                 </div>
//               </div>

//               <div className="flex justify-between mb-5">
//                 <span className="font-sans text-sm tracking-wider uppercase text-charcoal">Total</span>
//                 <span className="font-serif text-2xl text-charcoal">
//                   ₹{(total + (payment === 'cod' ? 50 : 0)).toLocaleString()}
//                 </span>
//               </div>

//               {/* Contact summary if filled */}
//               {step > 0 && contact.name && (
//                 <div className="border-t border-rose/30 pt-4 space-y-1">
//                   <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-2">Contact</p>
//                   <p className="font-sans text-xs text-charcoal">{contact.name}</p>
//                   <p className="font-sans text-xs text-muted">{contact.email}</p>
//                   <p className="font-sans text-xs text-muted">+91 {contact.phone}</p>
//                 </div>
//               )}

//               {step > 1 && address.city && (
//                 <div className="border-t border-rose/30 pt-4 mt-3 space-y-1">
//                   <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-2">Ship to</p>
//                   <p className="font-sans text-xs text-muted">{address.address}</p>
//                   <p className="font-sans text-xs text-muted">{address.city}, {address.state} {address.postal}</p>
//                 </div>
//               )}

//               <p className="text-[10px] font-sans text-muted text-center mt-5">🔒 256-bit SSL encrypted & secure</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { indianStates, getShippingOptions } from '../utils/shipping'
import { generateOrderId, saveOrder, ORDER_STATUS } from '../utils/orders'
import { openRazorpayCheckout, createRazorpayOrder } from '../utils/razorpay'
import { sendOrderConfirmation } from '../utils/email'

const STEPS = ['Contact', 'Delivery', 'Payment', 'Review']

const PAYMENT_METHODS = [
  {
    id: 'upi_qr',
    label: 'UPI QR Code',
    icon: '⬛',
    badge: 'Scan & Pay',
    desc: 'Scan QR with Google Pay, PhonePe, Paytm, BHIM',
    apps: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'],
  },
  {
    id: 'razorpay',
    label: 'Razorpay',
    icon: '💳',
    badge: 'Recommended',
    desc: 'UPI · Cards · Net Banking · Wallets — all in one',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: '📦',
    desc: 'Pay when your order arrives (+₹50 handling fee)',
  },
]

function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-sans tracking-[0.25em] uppercase text-muted font-normal">{label}</label>
      {children}
      {error && <span className="text-[10px] font-sans text-red-500">⚠ {error}</span>}
    </div>
  )
}

function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-sans transition-all duration-300 ${
              i < current  ? 'bg-gold text-white' :
              i === current ? 'bg-charcoal text-white' :
              'bg-rose/50 text-muted'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-[9px] font-sans tracking-wider mt-1 uppercase transition-colors ${i === current ? 'text-charcoal' : 'text-muted'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-10 sm:w-16 mb-4 mx-1 transition-all duration-300 ${i < current ? 'bg-gold' : 'bg-rose/40'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function UPIQRPayment({ total, onScreenshotUploaded, screenshotFile }) {
  const adminQR = localStorage.getItem('samvi-upi-qr') || null
  const upiId   = localStorage.getItem('samvi-upi-id') || 'samvi@upi'
  const fileRef = useRef()

  return (
    <div className="border border-rose/40 p-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="w-1 self-stretch bg-gold flex-shrink-0" />
        <div>
          <p className="font-serif text-lg font-light text-charcoal">Scan &amp; Pay via UPI</p>
          <p className="font-sans text-xs text-muted mt-0.5">Works with all UPI apps</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex-shrink-0">
          {adminQR ? (
            <div className="w-44 h-44 border-2 border-gold/30 p-2 bg-white">
              <img src={adminQR} alt="UPI QR Code" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-44 h-44 border-2 border-dashed border-gold/40 flex flex-col items-center justify-center gap-2 bg-cream">
              <div className="text-3xl">⬛</div>
              <p className="text-[10px] font-sans text-muted text-center leading-snug">QR not configured<br/>Upload in Admin</p>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="bg-gold/10 border border-gold/30 px-4 py-2.5">
            <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-0.5">UPI ID</p>
            <p className="font-sans text-sm text-charcoal tracking-wide">{upiId}</p>
          </div>
          <div className="bg-charcoal/5 px-4 py-2.5">
            <p className="text-[9px] font-sans tracking-widest uppercase text-muted mb-0.5">Amount to Pay</p>
            <p className="font-serif text-2xl font-light text-charcoal">₹{total.toLocaleString()}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Google Pay','PhonePe','Paytm','BHIM UPI'].map(app => (
              <span key={app} className="text-[9px] font-sans border border-rose/50 px-2 py-1 text-muted">{app}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-rose/30 pt-4">
        <p className="font-sans text-xs text-charcoal mb-3">After payment, upload your payment screenshot:</p>
        <div
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed cursor-pointer transition-all duration-200 p-5 text-center ${screenshotFile ? 'border-green-400 bg-green-50' : 'border-rose/50 hover:border-gold/50 bg-cream/50'}`}
        >
          {screenshotFile ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-green-500 text-2xl">✓</div>
              <p className="font-sans text-xs text-green-700">{screenshotFile.name}</p>
              <p className="font-sans text-[10px] text-green-600">Screenshot uploaded — click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl text-muted">📸</div>
              <p className="font-sans text-xs text-charcoal">Click to upload payment screenshot</p>
              <p className="font-sans text-[10px] text-muted">JPG, PNG, PDF accepted</p>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden"
          onChange={e => onScreenshotUploaded(e.target.files[0])} />
        {!screenshotFile && (
          <p className="font-sans text-[10px] text-amber-600 mt-2">
            ⚠ Order will be marked <strong>Pending Verification</strong> until we confirm your payment.
          </p>
        )}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep]               = useState(0)
  const [placedOrder, setPlacedOrder] = useState(null)
  const [loading, setLoading]         = useState(false)
  const [errors, setErrors]           = useState({})

  const [contact, setContact]         = useState({ name: '', email: '', phone: '' })
  const [address, setAddress]         = useState({ country: 'India', address: '', apartment: '', city: '', state: '', postal: '' })
  const [billingSame, setBillingSame] = useState(true)
  const [billing, setBilling]         = useState({ address: '', city: '', state: '', postal: '' })
  const [shippingType, setShippingType] = useState('standard')
  const [payment, setPayment]         = useState('razorpay')
  const [upiScreenshot, setUpiScreenshot] = useState(null)
  const [couponCode, setCouponCode]   = useState('')
  const [discount, setDiscount]       = useState(0)
  const [couponMsg, setCouponMsg]     = useState(null)

  const shippingOptions  = getShippingOptions(cartTotal, address.state, address.postal)
  const selectedShipping = shippingOptions.find(s => s.id === shippingType) || shippingOptions[0]
  const shippingCost     = selectedShipping?.price ?? 0
  const codFee           = payment === 'cod' ? 50 : 0
  const total            = cartTotal + shippingCost + codFee - discount

  function applyCoupon() {
    const codes = { 'SAMVI10': 0.10, 'WELCOME5': 0.05, 'GOLD15': 0.15 }
    const rate = codes[couponCode.toUpperCase()]
    if (rate) {
      const d = Math.round(cartTotal * rate)
      setDiscount(d)
      setCouponMsg({ type: 'success', text: `Coupon applied! You save ₹${d.toLocaleString()}` })
    } else {
      setDiscount(0)
      setCouponMsg({ type: 'error', text: 'Invalid coupon code' })
    }
  }

  function validate() {
    const e = {}
    if (step === 0) {
      if (!contact.name.trim()) e.name = 'Full name is required'
      if (!contact.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
      if (!contact.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit mobile required'
    }
    if (step === 1) {
      if (!address.address.trim()) e.address = 'Address is required'
      if (!address.city.trim())    e.city    = 'City is required'
      if (!address.state)          e.state   = 'State is required'
      if (!address.postal.match(/^\d{6}$/)) e.postal = 'Valid 6-digit PIN required'
      if (!billingSame) {
        if (!billing.address.trim()) e.billingAddress = 'Billing address required'
        if (!billing.city.trim())    e.billingCity = 'Billing city required'
        if (!billing.state)          e.billingState = 'Billing state required'
        if (!billing.postal.match(/^\d{6}$/)) e.billingPostal = 'Valid billing PIN required'
      }
    }
    if (step === 2) {
      if (payment === 'upi_qr' && !upiScreenshot) e.screenshot = 'Please upload payment screenshot after scanning'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function placeOrder(paymentId = null, paymentMethod = payment) {
    const orderId = generateOrderId()
    const status =
      paymentMethod === 'upi_qr' ? ORDER_STATUS.PENDING_VERIFICATION :
      paymentMethod === 'cod'    ? ORDER_STATUS.PROCESSING :
      ORDER_STATUS.PAYMENT_CONFIRMED

    const order = {
      orderId,
      createdAt:       new Date().toISOString(),
      updatedAt:       new Date().toISOString(),
      status,
      customer:        { ...contact },
      items:           cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, image: i.image, material: i.material })),
      shippingAddress: { ...address },
      billingAddress:  billingSame ? { ...address } : { ...billing },
      shippingType,
      shippingCost,
      paymentMethod,
      paymentId:       paymentId || null,
      subtotal:        cartTotal,
      discount,
      tax:             0,
      codFee,
      total,
      couponCode:      couponCode || null,
      upiScreenshot:   upiScreenshot ? upiScreenshot.name : null,
    }

    saveOrder(order)
    await sendOrderConfirmation(order)
    clearCart()
    setPlacedOrder(order)
  }

  async function handleRazorpay() {
    setLoading(true)
    try {
      const amountPaise = total * 100
      const rzpOrder    = await createRazorpayOrder(amountPaise, generateOrderId())

      openRazorpayCheckout({
        amount:      amountPaise,
        orderId:     rzpOrder.id,
        prefill:     { name: contact.name, email: contact.email, contact: `91${contact.phone}` },
        description: 'Samvi Jewellery Order',
        onSuccess: async (resp) => {
          await placeOrder(resp.razorpay_payment_id, 'razorpay')
          setLoading(false)
        },
        onFailure: (err) => {
          setErrors({ payment: err.message || 'Payment failed. Please try again.' })
          setLoading(false)
        },
      })
    } catch (err) {
      setErrors({ payment: err.message })
      setLoading(false)
    }
  }

  async function handleNext() {
    if (!validate()) return
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setLoading(true)
    try {
      if (payment === 'razorpay') {
        await handleRazorpay()
      } else {
        await placeOrder(null, payment)
        setLoading(false)
      }
    } catch (err) {
      setErrors({ payment: err.message })
      setLoading(false)
    }
  }

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <h2 className="font-serif text-3xl font-light">Your cart is empty</h2>
        <Link to="/category/all" className="btn-gold">Continue Shopping</Link>
      </div>
    )
  }

  // ── ORDER PLACED ──────────────────────────────────────────────
  if (placedOrder) {
    const isPending = placedOrder.status === ORDER_STATUS.PENDING_VERIFICATION
    return (
      <div className="min-h-screen bg-cream/30 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-white border border-rose/30 p-8 sm:p-12 text-center space-y-6">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl ${isPending ? 'bg-amber-100' : 'bg-green-100'}`}>
            {isPending ? '⏳' : '✓'}
          </div>
          <div>
            <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold mb-2">
              {isPending ? 'Order Received' : 'Order Confirmed'}
            </p>
            <h1 className="font-serif text-3xl font-light">{isPending ? 'Pending Verification' : 'Thank You!'}</h1>
          </div>
          <div className="bg-cream border border-rose/30 px-6 py-4">
            <p className="text-[9px] font-sans tracking-widest uppercase text-muted mb-1">Order ID</p>
            <p className="font-sans text-sm text-charcoal tracking-wider">{placedOrder.orderId}</p>
          </div>
          {isPending ? (
            <div className="bg-amber-50 border border-amber-200 px-4 py-3 text-left">
              <p className="font-sans text-xs text-amber-800 leading-relaxed">
                <strong>Under review.</strong> We will verify your UPI payment screenshot within 2 hours and confirm your order via email.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 px-4 py-3 text-left">
              <p className="font-sans text-xs text-green-800 leading-relaxed">
                <strong>Payment received!</strong> Confirmation sent to <span className="font-normal">{placedOrder.customer.email}</span>.
              </p>
            </div>
          )}

          <div className="text-left border border-rose/30 divide-y divide-rose/20">
            <div className="px-4 py-3 flex justify-between">
              <span className="font-sans text-xs text-muted">Items</span>
              <span className="font-sans text-xs text-charcoal">{placedOrder.items.reduce((s,i)=>s+i.qty,0)} items</span>
            </div>
            <div className="px-4 py-3 flex justify-between">
              <span className="font-sans text-xs text-muted">Shipping</span>
              <span className="font-sans text-xs text-charcoal">{placedOrder.shippingCost === 0 ? 'Free' : `₹${placedOrder.shippingCost}`}</span>
            </div>
            {placedOrder.discount > 0 && (
              <div className="px-4 py-3 flex justify-between">
                <span className="font-sans text-xs text-muted">Discount</span>
                <span className="font-sans text-xs text-green-600">−₹{placedOrder.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="px-4 py-3 flex justify-between bg-cream/50">
              <span className="font-sans text-sm text-charcoal">Total</span>
              <span className="font-serif text-xl text-charcoal">₹{placedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          <p className="font-sans text-xs text-muted">Delivering to {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state}</p>

          <div className="flex gap-3">
            <Link to="/" className="flex-1 btn-outline text-center text-xs py-3">Home</Link>
            <Link to="/category/all" className="flex-1 btn-gold text-center text-xs py-3">Shop More</Link>
          </div>
        </div>
      </div>
    )
  }

  // ── MAIN CHECKOUT ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-rose/30 py-5 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-light tracking-widest text-charcoal">SAMVI</Link>
          <span className="font-sans text-[10px] tracking-widest text-muted uppercase flex items-center gap-1.5">🔒 Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <StepIndicator steps={STEPS} current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* STEP 0: Contact */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold mb-1">Step 1</p>
                  <h2 className="font-serif text-2xl font-light">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <FormField label="Full Name *" error={errors.name}>
                      <input className="input-field" placeholder="Priya Sharma" value={contact.name}
                        onChange={e => setContact(c => ({...c, name: e.target.value}))} />
                    </FormField>
                  </div>
                  <FormField label="Email Address *" error={errors.email}>
                    <input className="input-field" type="email" placeholder="priya@example.com" value={contact.email}
                      onChange={e => setContact(c => ({...c, email: e.target.value}))} />
                  </FormField>
                  <FormField label="Mobile Number *" error={errors.phone}>
                    <div className="flex">
                      <span className="border border-rose border-r-0 bg-cream px-3 flex items-center font-sans text-xs text-muted">+91</span>
                      <input className="input-field flex-1" placeholder="9876543210" maxLength={10} value={contact.phone}
                        onChange={e => setContact(c => ({...c, phone: e.target.value.replace(/\D/g,'')}))} />
                    </div>
                  </FormField>
                </div>
              </div>
            )}

            {/* STEP 1: Delivery */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold mb-1">Step 2</p>
                  <h2 className="font-serif text-2xl font-light">Delivery Address</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <FormField label="Street Address *" error={errors.address}>
                      <input className="input-field" placeholder="House / Flat no., Street, Area" value={address.address}
                        onChange={e => setAddress(a => ({...a, address: e.target.value}))} />
                    </FormField>
                  </div>
                  <div className="sm:col-span-2">
                    <FormField label="Apartment / Landmark (optional)">
                      <input className="input-field" placeholder="Building name, landmark" value={address.apartment}
                        onChange={e => setAddress(a => ({...a, apartment: e.target.value}))} />
                    </FormField>
                  </div>
                  <FormField label="City *" error={errors.city}>
                    <input className="input-field" placeholder="Mumbai" value={address.city}
                      onChange={e => setAddress(a => ({...a, city: e.target.value}))} />
                  </FormField>
                  <FormField label="PIN Code *" error={errors.postal}>
                    <input className="input-field" placeholder="400001" maxLength={6} value={address.postal}
                      onChange={e => setAddress(a => ({...a, postal: e.target.value.replace(/\D/g,'')}))} />
                  </FormField>
                  <div className="sm:col-span-2">
                    <FormField label="State *" error={errors.state}>
                      <select className="input-field" value={address.state}
                        onChange={e => setAddress(a => ({...a, state: e.target.value}))}>
                        <option value="">Select state / UT</option>
                        {indianStates.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </FormField>
                  </div>
                </div>

                {/* Smart Shipping Options */}
                <div>
                  <h3 className="font-serif text-xl font-light mb-1">Shipping Method</h3>
                  {address.state && address.postal.length === 6 && (
                    <p className="font-sans text-[10px] text-muted mb-4">
                      📍 Rates for {address.city || address.state}, {address.postal}
                    </p>
                  )}
                  <div className="space-y-3">
                    {shippingOptions.map(opt => (
                      <label key={opt.id}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shippingType === opt.id ? 'border-gold bg-gold/5' : 'border-rose/40 hover:border-gold/40'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" value={opt.id} checked={shippingType === opt.id}
                            onChange={() => setShippingType(opt.id)} className="accent-gold" />
                          <div>
                            <p className="font-sans text-sm text-charcoal font-normal">{opt.label}</p>
                            <p className="font-sans text-xs text-muted">{opt.days}</p>
                            {opt.freeNote && <p className="font-sans text-[10px] text-green-600">{opt.freeNote}</p>}
                          </div>
                        </div>
                        <span className={`font-sans text-sm font-normal ${opt.price === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                          {opt.price === 0 ? 'FREE' : `₹${opt.price}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h3 className="font-serif text-xl font-light mb-3">Billing Address</h3>
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} className="accent-gold w-4 h-4" />
                    <span className="font-sans text-sm text-charcoal">Same as delivery address</span>
                  </label>
                  {!billingSame && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <FormField label="Billing Address *" error={errors.billingAddress}>
                          <input className="input-field" placeholder="Full billing address" value={billing.address}
                            onChange={e => setBilling(b => ({...b, address: e.target.value}))} />
                        </FormField>
                      </div>
                      <FormField label="City *" error={errors.billingCity}>
                        <input className="input-field" placeholder="City" value={billing.city}
                          onChange={e => setBilling(b => ({...b, city: e.target.value}))} />
                      </FormField>
                      <FormField label="PIN Code *" error={errors.billingPostal}>
                        <input className="input-field" placeholder="400001" maxLength={6} value={billing.postal}
                          onChange={e => setBilling(b => ({...b, postal: e.target.value.replace(/\D/g,'')}))} />
                      </FormField>
                      <div className="sm:col-span-2">
                        <FormField label="State *" error={errors.billingState}>
                          <select className="input-field" value={billing.state}
                            onChange={e => setBilling(b => ({...b, state: e.target.value}))}>
                            <option value="">Select state</option>
                            {indianStates.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </FormField>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold mb-1">Step 3</p>
                  <h2 className="font-serif text-2xl font-light">Payment Method</h2>
                </div>

                {errors.payment && (
                  <div className="bg-red-50 border border-red-200 px-4 py-3">
                    <p className="font-sans text-xs text-red-700">⚠ {errors.payment}</p>
                  </div>
                )}

                <div className="space-y-3">
                  {PAYMENT_METHODS.map(pm => (
                    <label key={pm.id}
                      className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${payment === pm.id ? 'border-gold bg-gold/5' : 'border-rose/40 hover:border-gold/40'}`}>
                      <input type="radio" name="payment" value={pm.id} checked={payment === pm.id}
                        onChange={() => setPayment(pm.id)} className="accent-gold mt-0.5" />
                      <span className="text-lg mt-0.5">{pm.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-sans text-sm text-charcoal font-normal">{pm.label}</p>
                          {pm.badge && (
                            <span className={`text-[9px] font-sans tracking-wider px-2 py-0.5 ${pm.badge === 'Recommended' ? 'bg-gold text-white' : 'bg-blue-100 text-blue-700'}`}>
                              {pm.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-muted mt-0.5">{pm.desc}</p>
                        {pm.apps && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {pm.apps.map(a => (
                              <span key={a} className="text-[9px] font-sans border border-rose/40 px-1.5 py-0.5 text-muted">{a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {payment === 'upi_qr' && (
                  <UPIQRPayment total={total} screenshotFile={upiScreenshot} onScreenshotUploaded={setUpiScreenshot} />
                )}

                {payment === 'razorpay' && (
                  <div className="border border-gold/30 bg-gold/5 p-5 space-y-3">
                    <p className="font-sans text-xs text-muted">You'll be redirected to Razorpay's secure payment window. Accepts all UPI apps, credit/debit cards, net banking, and wallets.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Visa','Mastercard','RuPay','UPI','PhonePe','GPay','Paytm','NEFT'].map(b => (
                        <span key={b} className="text-[9px] font-sans border border-rose/40 px-2 py-1 text-muted">{b}</span>
                      ))}
                    </div>
                    <p className="font-sans text-[10px] text-muted">🔒 256-bit SSL · PCI DSS Compliant</p>
                  </div>
                )}

                {payment === 'cod' && (
                  <div className="bg-amber-50 border border-amber-200 p-4">
                    <p className="font-sans text-xs text-amber-900">Cash on Delivery available for orders up to ₹15,000. A ₹50 handling fee applies, payable to the delivery agent.</p>
                  </div>
                )}

                {errors.screenshot && (
                  <p className="font-sans text-xs text-red-500">⚠ {errors.screenshot}</p>
                )}
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold mb-1">Step 4</p>
                  <h2 className="font-serif text-2xl font-light">Review &amp; Place Order</h2>
                </div>

                {[
                  { title: 'Contact',          edit: () => setStep(0), lines: [contact.name, contact.email, `+91 ${contact.phone}`] },
                  { title: 'Delivery Address', edit: () => setStep(1), lines: [address.address, address.apartment, `${address.city}, ${address.state} — ${address.postal}`, 'India'].filter(Boolean) },
                  { title: 'Shipping Method',  edit: () => setStep(1), lines: [`${selectedShipping?.label} (${selectedShipping?.days})`, shippingCost === 0 ? 'Free' : `₹${shippingCost}`] },
                  { title: 'Payment',          edit: () => setStep(2), lines: [PAYMENT_METHODS.find(p => p.id === payment)?.label || payment, payment === 'cod' ? '+₹50 COD fee' : payment === 'upi_qr' ? (upiScreenshot ? `Screenshot: ${upiScreenshot.name}` : 'No screenshot yet') : 'Razorpay secure checkout'].filter(Boolean) },
                ].map(section => (
                  <div key={section.title} className="border border-rose/30 p-4 flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-sans tracking-[0.2em] uppercase text-gold mb-2">{section.title}</p>
                      {section.lines.map((l, i) => <p key={i} className="font-sans text-xs text-charcoal leading-relaxed">{l}</p>)}
                    </div>
                    <button onClick={section.edit} className="font-sans text-[10px] text-gold hover:text-gold-dark tracking-wider underline underline-offset-2 flex-shrink-0 ml-4">Edit</button>
                  </div>
                ))}

                <div className="border border-rose/30 p-4">
                  <p className="text-[9px] font-sans tracking-[0.2em] uppercase text-gold mb-3">Items ({cart.reduce((s,i)=>s+i.qty,0)})</p>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <img src={item.image} alt={item.name} className="w-12 object-cover flex-shrink-0" style={{height:56}} />
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-xs text-charcoal truncate">{item.name}</p>
                          <p className="font-sans text-[10px] text-muted">Qty: {item.qty}</p>
                        </div>
                        <span className="font-sans text-xs text-charcoal flex-shrink-0">₹{(item.price*item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {errors.payment && (
                  <div className="bg-red-50 border border-red-200 px-4 py-3">
                    <p className="font-sans text-xs text-red-700">⚠ {errors.payment}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
              {step > 0 ? (
                <button onClick={() => setStep(s => s-1)} className="flex items-center gap-2 font-sans text-xs tracking-wider text-muted hover:text-gold transition-colors">
                  ← Back
                </button>
              ) : (
                <Link to="/cart" className="flex items-center gap-2 font-sans text-xs tracking-wider text-muted hover:text-gold transition-colors">
                  ← Cart
                </Link>
              )}
              <button onClick={handleNext} disabled={loading}
                className={`btn-gold px-10 py-4 text-xs flex items-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}>
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    {payment === 'razorpay' && step === STEPS.length - 1 ? 'Opening Payment...' : 'Processing...'}
                  </>
                ) : step < STEPS.length - 1 ? `Continue to ${STEPS[step+1]}` : (
                  payment === 'razorpay' ? 'Pay with Razorpay →' :
                  payment === 'upi_qr'  ? 'Confirm UPI Order →' :
                  'Place Order (COD) →'
                )}
              </button>
            </div>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 sticky top-24 space-y-5">
              <h3 className="font-serif text-xl font-light">Order Summary</h3>

              <div className="space-y-3 pb-4 border-b border-rose/40 max-h-56 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-13 object-cover" style={{width:52,height:64}} />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold text-white text-[9px] rounded-full flex items-center justify-center">{item.qty}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs text-charcoal leading-snug truncate">{item.name}</p>
                      <p className="font-sans text-[10px] text-muted">{item.material}</p>
                    </div>
                    <span className="font-sans text-xs text-charcoal flex-shrink-0">₹{(item.price*item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div>
                <div className="flex gap-2">
                  <input className="input-field flex-1 text-xs py-2" placeholder="Coupon code" value={couponCode}
                    onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg(null) }} />
                  <button onClick={applyCoupon} className="btn-outline text-xs px-4 py-2 whitespace-nowrap">Apply</button>
                </div>
                {couponMsg && (
                  <p className={`font-sans text-[10px] mt-1.5 ${couponMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{couponMsg.text}</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pb-4 border-b border-rose/40">
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-muted">Subtotal</span>
                  <span className="font-sans text-sm text-charcoal">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-muted">Shipping ({selectedShipping?.label})</span>
                  <span className={`font-sans text-sm ${shippingCost === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-muted">Discount</span>
                    <span className="font-sans text-sm text-green-600">−₹{discount.toLocaleString()}</span>
                  </div>
                )}
                {codFee > 0 && (
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-muted">COD Fee</span>
                    <span className="font-sans text-sm text-charcoal">₹{codFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-muted">GST</span>
                  <span className="font-sans text-xs text-muted">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-sans text-sm tracking-wider uppercase text-charcoal">Total</span>
                <span className="font-serif text-2xl text-charcoal">₹{total.toLocaleString()}</span>
              </div>

              {/* Free shipping progress */}
              {step === 0 && cartTotal < 999 && (
                <div className="bg-gold/10 border border-gold/30 px-3 py-2">
                  <p className="font-sans text-[10px] text-gold-dark">Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping!</p>
                  <div className="w-full bg-rose/30 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="h-1 bg-gold transition-all" style={{width:`${Math.min((cartTotal/999)*100,100)}%`}} />
                  </div>
                </div>
              )}

              {/* Contact mini-summary */}
              {step > 0 && contact.name && (
                <div className="border-t border-rose/30 pt-3 space-y-0.5">
                  <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-1.5">Contact</p>
                  <p className="font-sans text-xs text-charcoal">{contact.name}</p>
                  <p className="font-sans text-[10px] text-muted">{contact.email}</p>
                </div>
              )}

              {step > 1 && address.city && (
                <div className="border-t border-rose/30 pt-3">
                  <p className="text-[9px] font-sans tracking-widest uppercase text-gold mb-1.5">Ship to</p>
                  <p className="font-sans text-[10px] text-muted">{address.address}</p>
                  <p className="font-sans text-[10px] text-muted">{address.city}, {address.state} — {address.postal}</p>
                </div>
              )}

              <p className="font-sans text-[10px] text-muted text-center flex items-center justify-center gap-1">🔒 256-bit SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}