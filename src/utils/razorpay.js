// ─────────────────────────────────────────────
//  SAMVI JEWELRY — Razorpay Integration
//  NOTE: In production, order creation must happen server-side.
//  This file provides the client-side Razorpay checkout flow.
// ─────────────────────────────────────────────

/**
 * Load Razorpay SDK dynamically
 */
export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

/**
 * Get Razorpay key from admin settings (or env)
 */
export function getRazorpayKey() {
  return localStorage.getItem('samvi-razorpay-key') || 'rzp_test_SZikZ4EawaMrFl'
}

export function saveRazorpayKey(key) {
  localStorage.setItem('samvi-razorpay-key', key)
}

/**
 * Open Razorpay checkout
 * @param {Object} options
 * @param {number} options.amount — in paise (rupees × 100)
 * @param {string} options.orderId — Razorpay order id (from your server)
 * @param {Object} options.prefill — { name, email, contact }
 * @param {string} options.description
 * @param {Function} options.onSuccess — called with { razorpay_payment_id, razorpay_order_id, razorpay_signature }
 * @param {Function} options.onFailure — called with error
 */
export async function openRazorpayCheckout({ amount, orderId, prefill, description, onSuccess, onFailure }) {
  const loaded = await loadRazorpay()
  if (!loaded) { onFailure(new Error('Failed to load Razorpay SDK')); return }

  const key = getRazorpayKey()

  const options = {
    key,
    amount,          // paise
    currency: 'INR',
    name: 'Samvi Jewellery',
    description,
    order_id: orderId, // pass Razorpay order ID from server
    image: '/favicon.ico',
    prefill: {
      name:    prefill?.name    || '',
      email:   prefill?.email   || '',
      contact: prefill?.contact || '',
    },
    theme: { color: '#c6a97e' },
    modal: {
      ondismiss: () => onFailure(new Error('Payment cancelled by user')),
    },
    handler: function (response) {
      onSuccess({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id:   response.razorpay_order_id   || orderId,
        razorpay_signature:  response.razorpay_signature  || '',
      })
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.on('payment.failed', (resp) => {
    onFailure(new Error(resp.error?.description || 'Payment failed'))
  })
  rzp.open()
}

/**
 * Simulate server-side Razorpay order creation.
 * In production, POST to /api/razorpay/create-order
 */
export async function createRazorpayOrder(amountInPaise, receiptId) {
  // ── PRODUCTION CODE (server endpoint) ──────────────────────
  // const res = await fetch('/api/razorpay/create-order', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ amount: amountInPaise, receipt: receiptId }),
  // })
  // return res.json()   // returns { id: 'order_xxx', amount, currency }
  // ────────────────────────────────────────────────────────────

  // ── DEMO: Return a mock Razorpay order for testing ──────────
  return {
    id: `order_demo_${Date.now()}`,
    amount: amountInPaise,
    currency: 'INR',
    receipt: receiptId,
  }
}