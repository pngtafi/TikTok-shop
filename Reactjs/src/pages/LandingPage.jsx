import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../services/productService'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await fetchAllProducts()
      const parsed = res.data.map((p) => ({
        ...p,
        image_url: Array.isArray(p.image_url)
          ? p.image_url
          : JSON.parse(p.image_url || '[]'),
      }))
      setProducts(parsed)
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err)
    }
  }

  return (
    <div className="container py-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="border rounded p-3 h-100 shadow-sm text-decoration-none text-dark d-flex flex-column"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Ảnh chính */}
              <div className="mb-3 w-100 text-center">
                <img
                  src={product.image_url[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Tiêu đề */}
              <h5 className="fw-bold text-truncate mb-2" title={product.name}>
                {product.name}
              </h5>

              {/* Mô tả */}
              <p className="text-muted small mb-2">
                {product.description?.slice(0, 100)}...
              </p>

              {/* Giá */}
              <div className="mb-2">
                <span className="text-danger fw-bold fs-5 me-2">
                  {Number(product.price).toLocaleString()}₫
                </span>
                <small>
                  <del className="text-muted">
                    {Number(product.original_price).toLocaleString()}₫
                  </del>
                </small>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <button className="btn btn-danger w-100">Mua ngay</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage
