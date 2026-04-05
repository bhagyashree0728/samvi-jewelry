// // ─────────────────────────────────────────────
// //  SAMVI JEWELRY — Smart Shipping Calculator
// // ─────────────────────────────────────────────

// export const indianStates = [
//   'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
//   'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
//   'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
//   'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
//   'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
//   'Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry',
//   'Andaman & Nicobar Islands','Dadra & Nagar Haveli','Daman & Diu','Lakshadweep',
// ]

// // Remote / difficult zones cost more
// const REMOTE_STATES = ['Arunachal Pradesh','Assam','Manipur','Meghalaya','Mizoram','Nagaland','Tripura','Sikkim','Jammu & Kashmir','Ladakh','Andaman & Nicobar Islands','Lakshadweep']
// const METRO_STATES  = ['Maharashtra','Delhi','Karnataka','Tamil Nadu','Telangana','Gujarat','West Bengal']

// // PIN code range → region (simplified)
// export function getPinZone(pin) {
//   if (!pin || pin.length !== 6) return 'standard'
//   const prefix = parseInt(pin.substring(0,2))
//   // NE India: 78x, 79x
//   if (prefix >= 78 && prefix <= 79) return 'remote'
//   // J&K: 18x, 19x
//   if (prefix === 18 || prefix === 19) return 'remote'
//   // Andaman: 74x
//   if (prefix === 74) return 'remote'
//   // Metro PINs
//   if ([40,41,42,43,44,56,57,58,60,61,62,63,64,11,12,20,21].includes(prefix)) return 'metro'
//   return 'standard'
// }

// // Default shipping rates (admin can override via localStorage)
// export const DEFAULT_RATES = {
//   standard: { label: 'Standard Delivery', days: '5-7 business days', base: 49, remote: 99,  metro: 49  },
//   express:  { label: 'Express Delivery',  days: '2-3 business days', base: 99, remote: 149, metro: 99  },
//   overnight:{ label: 'Overnight Delivery',days: 'Next business day', base: 199,remote: 299, metro: 199 },
// }

// export function getAdminRates() {
//   try {
//     const saved = localStorage.getItem('samvi-shipping-rates')
//     return saved ? JSON.parse(saved) : DEFAULT_RATES
//   } catch { return DEFAULT_RATES }
// }

// export function saveAdminRates(rates) {
//   localStorage.setItem('samvi-shipping-rates', JSON.stringify(rates))
// }

// export function calculateShipping({ state, pincode, orderValue, type = 'standard' }) {
//   const rates = getAdminRates()
//   const config = rates[type] || rates.standard

//   // Free shipping above threshold
//   const freeThreshold = parseInt(localStorage.getItem('samvi-free-shipping-threshold') || '999')
//   if (orderValue >= freeThreshold) return 0

//   const zone = getPinZone(pincode)
//   const isRemote = REMOTE_STATES.includes(state) || zone === 'remote'
//   const isMetro  = METRO_STATES.includes(state) && zone !== 'remote'

//   if (isRemote) return config.remote
//   if (isMetro)  return config.metro
//   return config.base
// }

// export function getShippingOptions(orderValue, state, pincode) {
//   const rates = getAdminRates()
//   const freeThreshold = parseInt(localStorage.getItem('samvi-free-shipping-threshold') || '999')

//   return Object.entries(rates).map(([id, config]) => {
//     const cost = calculateShipping({ state, pincode, orderValue, type: id })
//     return {
//       id,
//       label: config.label,
//       days: config.days,
//       price: cost,
//       isFree: cost === 0,
//       freeNote: orderValue >= freeThreshold ? `Free (orders above ₹${freeThreshold})` : null,
//     }
//   })
// }

// ─────────────────────────────────────────────
//  SAMVI JEWELRY — Smart Shipping Calculator
// ─────────────────────────────────────────────

export const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu',
  'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry',
  'Andaman & Nicobar Islands','Dadra & Nagar Haveli','Daman & Diu','Lakshadweep',
]

// Remote / difficult zones cost more
const REMOTE_STATES = ['Arunachal Pradesh','Assam','Manipur','Meghalaya','Mizoram','Nagaland','Tripura','Sikkim','Jammu & Kashmir','Ladakh','Andaman & Nicobar Islands','Lakshadweep']
const METRO_STATES  = ['Maharashtra','Delhi','Karnataka','Tamil Nadu','Telangana','Gujarat','West Bengal']

// PIN code range → region (simplified)
export function getPinZone(pin) {
  if (!pin || pin.length !== 6) return 'standard'
  const prefix = parseInt(pin.substring(0,2))
  // NE India: 78x, 79x
  if (prefix >= 78 && prefix <= 79) return 'remote'
  // J&K: 18x, 19x
  if (prefix === 18 || prefix === 19) return 'remote'
  // Andaman: 74x
  if (prefix === 74) return 'remote'
  // Metro PINs
  if ([40,41,42,43,44,56,57,58,60,61,62,63,64,11,12,20,21].includes(prefix)) return 'metro'
  return 'standard'
}

// Default shipping rates (admin can override via localStorage)
export const DEFAULT_RATES = {
  standard: { label: 'Standard Delivery', days: '5-7 business days', base: 49, remote: 99,  metro: 49  },
  express:  { label: 'Express Delivery',  days: '2-3 business days', base: 99, remote: 149, metro: 99  },
  overnight:{ label: 'Overnight Delivery',days: 'Next business day', base: 199,remote: 299, metro: 199 },
}

export function getAdminRates() {
  try {
    const saved = localStorage.getItem('samvi-shipping-rates')
    return saved ? JSON.parse(saved) : DEFAULT_RATES
  } catch { return DEFAULT_RATES }
}

export function saveAdminRates(rates) {
  localStorage.setItem('samvi-shipping-rates', JSON.stringify(rates))
}

export function calculateShipping({ state, pincode, orderValue, type = 'standard' }) {
  const rates = getAdminRates()
  const config = rates[type] || rates.standard

  // Free shipping above threshold
  const freeThreshold = parseInt(localStorage.getItem('samvi-free-shipping-threshold') || '999')
  if (orderValue >= freeThreshold) return 0

  const zone = getPinZone(pincode)
  const isRemote = REMOTE_STATES.includes(state) || zone === 'remote'
  const isMetro  = METRO_STATES.includes(state) && zone !== 'remote'

  if (isRemote) return config.remote
  if (isMetro)  return config.metro
  return config.base
}

export function getShippingOptions(orderValue, state, pincode) {
  const rates = getAdminRates()
  const freeThreshold = parseInt(localStorage.getItem('samvi-free-shipping-threshold') || '999')

  return Object.entries(rates).map(([id, config]) => {
    const cost = calculateShipping({ state, pincode, orderValue, type: id })
    return {
      id,
      label: config.label,
      days: config.days,
      price: cost,
      isFree: cost === 0,
      freeNote: orderValue >= freeThreshold ? `Free (orders above ₹${freeThreshold})` : null,
    }
  })
}