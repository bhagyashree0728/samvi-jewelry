import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('samvi-cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('samvi-wishlist')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem('samvi-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('samvi-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
    showToast(`${product.name} added to bag`)
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const toggleWishlist = (product) => {
    const inWishlist = wishlist.some(i => i.id === product.id)
    if (inWishlist) {
      setWishlist(prev => prev.filter(i => i.id !== product.id))
    } else {
      setWishlist(prev => [...prev, product])
      showToast(`${product.name} added to wishlist`)
    }
  }

  const isWishlisted = (id) => wishlist.some(i => i.id === id)

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart,
      cartCount, cartTotal,
      wishlist, toggleWishlist, isWishlisted,
      toast
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
