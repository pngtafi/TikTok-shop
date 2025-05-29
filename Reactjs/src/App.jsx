import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RedirectToFirstProduct from './components/RedirectToFirstProduct'
// import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetail from './pages/ProductDetail'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToFirstProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
