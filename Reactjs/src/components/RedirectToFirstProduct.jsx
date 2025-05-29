import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { fetchAllProducts } from '../services/productService'

function RedirectToFirstProduct() {
  const [productId, setProductId] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadFirstProduct = async () => {
      try {
        const res = await fetchAllProducts()
        const products = res.data
        if (products.length > 0) {
          setProductId(products[0].id) // lấy sản phẩm đầu tiên
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Lỗi lấy sản phẩm:', err)
        setError(true)
      }
    }

    loadFirstProduct()
  }, [])

  if (error)
    return <div className="text-center mt-5">Không tìm thấy sản phẩm.</div>
  if (!productId) return <div className="text-center mt-5">Đang tải…</div>

  return <Navigate to={`/product/${productId}`} replace />
}

export default RedirectToFirstProduct
