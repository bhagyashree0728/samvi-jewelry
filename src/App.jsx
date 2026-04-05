// import { Routes, Route, useLocation } from 'react-router-dom'
// import { useEffect } from 'react'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import CartDrawer from './components/CartDrawer'
// import Toast from './components/Toast'
// import Home from './pages/Home'
// import CategoryPage from './pages/CategoryPage'
// import ProductDetail from './pages/ProductDetail'
// import CartPage from './pages/CartPage'
// import CheckoutPage from './pages/CheckoutPage'
// import { useCart } from './context/CartContext'

// export default function App() {
//   const location = useLocation()
//   const { toast } = useCart()

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/category/:slug" element={<CategoryPage />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//         </Routes>
//       </main>
//       <Footer />
//       <CartDrawer />
//       {toast && <Toast message={toast} />}
//     </div>
//   )
// }

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminPage from './pages/AdminPage'
import { useCart } from './context/CartContext'

export default function App() {
  const location = useLocation()
  const { toast } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isAdmin = location.pathname === '/admin'

  return (
    <div className="min-h-screen flex flex-col">

      {!isAdmin && <Navbar />}

      <main className="flex-1">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/category/:slug" element={<CategoryPage />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/admin" element={<AdminPage />} />

        </Routes>

      </main>

      {!isAdmin && <Footer />}

      {!isAdmin && <CartDrawer />}

      {toast && <Toast message={toast} />}

    </div>
  )
}
