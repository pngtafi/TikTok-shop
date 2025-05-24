import React, { useState } from 'react'

function ProductVariants({ variants }) {
  if (!variants) return null // Không có biến thể nào

  const { sizes = [], colors = [] } = variants
  // Local state để lưu lựa chọn (nếu cần thiết cho UI)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  return (
    <div className="product-variants my-3">
      {/* Chọn kích cỡ (nếu có) */}
      {sizes.length > 0 && (
        <div className="mb-2">
          <span className="me-2 fw-bold">Kích cỡ:</span>
          {sizes.map((size) => (
            <button
              type="button"
              key={size}
              className={`btn btn-outline-secondary btn-sm me-2 ${
                selectedSize === size ? 'active' : ''
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      {/* Chọn màu sắc (nếu có) */}
      {colors.length > 0 && (
        <div className="mb-3">
          <span className="me-2 fw-bold">Màu sắc:</span>
          {colors.map((color) => (
            <button
              type="button"
              key={color}
              className={`btn btn-outline-secondary btn-sm me-2 ${
                selectedColor === color ? 'active' : ''
              }`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductVariants
