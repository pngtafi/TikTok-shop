import React, { useState } from 'react'
import './ProductPurchaseModal.css'
import { useNavigate } from 'react-router-dom'

function ProductPurchaseModal({ show, onClose, product }) {
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  if (!show || !product) return null

  const { price, original_price, image_url, variants } = product
  const { sizes = [], colors = [] } = variants || {}

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const handleCheckout = () => {
    if (selectedColor && selectedSize) {
      navigate('/checkout', {
        state: {
          product,
          variant: { color: selectedColor, size: selectedSize },
          quantity,
        },
      })
    }
  }

  return (
    <div className="modal-overlay">
      <div
        className="modal-content p-3 rounded"
        style={{ backgroundColor: '#fff' }}
      >
        <div className="d-flex justify-content-between align-items-start">
          {/* Ảnh và giá */}
          <div className="d-flex">
            <img
              src={Array.isArray(image_url) ? image_url[0] : image_url}
              alt="product"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              className="me-2 rounded"
            />
            <div>
              <div className="text-danger fw-bold fs-5">
                ₫{Number(price).toLocaleString('vi-VN')}
              </div>
              {original_price && original_price > price && (
                <div className="text-muted text-decoration-line-through">
                  ₫{Number(original_price).toLocaleString('vi-VN')}
                </div>
              )}
              <div className="text-muted small">
                Giá tại Chương trình Flash Sale
              </div>
              <div className="text-muted small">
                Kho: {product.stock || 1000}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-close" />
        </div>

        {/* Chọn màu sắc */}
        {colors?.length > 0 && (
          <div className="mt-3">
            <div className="fw-bold mb-2">Màu sắc</div>
            <div className="d-flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`btn btn-sm ${
                    selectedColor === color
                      ? 'btn-danger text-white'
                      : 'btn-outline-secondary'
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chọn size */}
        {selectedColor && sizes?.length > 0 && (
          <div className="mt-3">
            <div className="fw-bold mb-2">Size</div>
            <div className="d-flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`btn btn-sm ${
                    selectedSize === size
                      ? 'btn-danger text-white'
                      : 'btn-outline-secondary'
                  }`}
                  style={{
                    width: '60px',
                    height: '36px',
                    fontSize: '0.9rem',
                    padding: 0,
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Số lượng */}
        {selectedSize && (
          <div className="mt-3">
            <div className="fw-bold mb-2">Số lượng</div>
            <div className="input-group" style={{ width: '120px' }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Nút mua ngay */}
        <button
          className="btn w-100 mt-4 py-2 fw-bold"
          style={{
            backgroundColor: selectedColor && selectedSize ? '#d0011b' : '#ccc',
            color: 'white',
            cursor: selectedColor && selectedSize ? 'pointer' : 'not-allowed',
          }}
          disabled={!(selectedColor && selectedSize)}
          onClick={handleCheckout}
        >
          Mua ngay
        </button>
      </div>
    </div>
  )
}

export default ProductPurchaseModal
