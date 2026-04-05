// ─────────────────────────────────────────────
//  SAMVI JEWELRY — Order Management Utilities
// ─────────────────────────────────────────────

export function generateOrderId() {
  const ts  = Date.now().toString(36).toUpperCase()
  const rnd = Math.random().toString(36).substring(2,6).toUpperCase()
  return `SAMVI-${ts}-${rnd}`
}

export function saveOrder(orderData) {
  const orders = getOrders()
  orders.unshift(orderData)
  localStorage.setItem('samvi-orders', JSON.stringify(orders))
  return orderData
}

export function getOrders() {
  try {
    const saved = localStorage.getItem('samvi-orders')
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function updateOrderStatus(orderId, status, paymentId = null) {
  const orders = getOrders()
  const updated = orders.map(o => {
    if (o.orderId === orderId) {
      return { ...o, status, ...(paymentId ? { paymentId } : {}), updatedAt: new Date().toISOString() }
    }
    return o
  })
  localStorage.setItem('samvi-orders', JSON.stringify(updated))
}

export function getOrder(orderId) {
  return getOrders().find(o => o.orderId === orderId)
}

export const ORDER_STATUS = {
  PENDING_PAYMENT:     'pending_payment',
  PENDING_VERIFICATION:'pending_verification',
  PAYMENT_CONFIRMED:   'payment_confirmed',
  PROCESSING:          'processing',
  SHIPPED:             'shipped',
  DELIVERED:           'delivered',
  CANCELLED:           'cancelled',
}

export const STATUS_LABELS = {
  pending_payment:     { label: 'Pending Payment',     color: 'text-yellow-600', bg: 'bg-yellow-50',  border: 'border-yellow-200' },
  pending_verification:{ label: 'Pending Verification',color: 'text-orange-600', bg: 'bg-orange-50',  border: 'border-orange-200' },
  payment_confirmed:   { label: 'Payment Confirmed',   color: 'text-green-600',  bg: 'bg-green-50',   border: 'border-green-200'  },
  processing:          { label: 'Processing',          color: 'text-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-200'   },
  shipped:             { label: 'Shipped',             color: 'text-purple-600', bg: 'bg-purple-50',  border: 'border-purple-200' },
  delivered:           { label: 'Delivered',           color: 'text-emerald-600',bg: 'bg-emerald-50', border: 'border-emerald-200'},
  cancelled:           { label: 'Cancelled',           color: 'text-red-600',    bg: 'bg-red-50',     border: 'border-red-200'    },
}