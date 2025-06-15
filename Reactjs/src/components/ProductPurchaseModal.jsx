import React, { useState, useEffect } from 'react'
import './ProductPurchaseModal.css'
import { useNavigate } from 'react-router-dom'

function ProductPurchaseModal({
  show,
  onClose,
  product,
  selectedColor: propSelectedColor,
}) {
  const [selectedColor, setSelectedColor] = useState(propSelectedColor || null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  useEffect(() => {
    if (propSelectedColor) {
      setSelectedColor(propSelectedColor)
    }
  }, [propSelectedColor])

  if (!show || !product) return null

  const { price, original_price, image_url, variants } = product
  const { sizes = [] } = variants || {}

  const selectedImageObj = image_url?.find((img) => img.name === selectedColor)
  const displayPrice = selectedImageObj?.price || product.price

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
              src={
                selectedImageObj?.url ||
                (Array.isArray(image_url) ? image_url[0].url : image_url)
              }
              alt="product"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              className="me-2 rounded"
            />
            <div>
              <div className="text-danger fw-bold fs-5">
                ₫{Number(displayPrice).toLocaleString('vi-VN')}
              </div>
              {original_price && original_price > price && (
                <div className="text-muted text-decoration-line-through">
                  ₫{Number(original_price).toLocaleString('vi-VN')}
                </div>
              )}
              <div className="text-muted small">
                Kho: {product.stock || 1000}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-close" />
        </div>

        {/* Chọn mẫu từ image_url */}
        {Array.isArray(image_url) && image_url.length > 0 && (
          <div className="mt-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="fw-bold me-2">Chọn mẫu</div>
              <button
                className="btn btn-link p-0"
                style={{ fontSize: '0.9rem' }}
                onClick={() => setShowSizeGuide(true)}
              >
                Hướng dẫn chọn size
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {image_url.map((img, index) => {
                if (img.name === 'Ảnh tham khảo') return null
                return (
                  <button
                    key={`${img.name}-${index}`}
                    className={`btn btn-sm ${
                      selectedColor === img.name
                        ? 'border-danger text-danger'
                        : 'text-dark'
                    } d-flex align-items-center`}
                    onClick={() => setSelectedColor(img.name)}
                    style={{ backgroundColor: 'rgb(244 246 250)' }}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'cover',
                        marginRight: '4px',
                      }}
                      className="rounded"
                    />
                    {img.name}
                  </button>
                )
              })}
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
                      ? 'border-danger text-danger'
                      : 'text-dark'
                  }`}
                  style={{
                    width: '60px',
                    height: '36px',
                    fontSize: '0.9rem',
                    padding: 0,
                    backgroundColor: 'rgb(244 246 250)',
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

      <SizeGuideModal
        show={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </div>
  )
}

const SizeGuideModal = ({ show, onClose }) => {
  if (!show) return null
  return (
    <div
      className="modal-overlay"
      style={{ background: 'rgba(0, 0, 0, 1)', display: 'flex' }}
    >
      <div
        className="modal-content p-3 rounded"
        style={{
          backgroundColor: '#fff',
          maxWidth: '500px',
          alignSelf: 'anchor-center',
        }}
      >
        <button
          onClick={onClose}
          className="btn-close"
          style={{ alignSelf: 'flex-end' }}
        />
        <img
          src="https://tiktok-backend-0zv2.onrender.com/uploads/11.jpg"
          alt="Hướng dẫn chọn size"
          className="img-fluid rounded"
        />
      </div>
    </div>
  )
}

export default ProductPurchaseModal
