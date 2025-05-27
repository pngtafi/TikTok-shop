import React from 'react'

function ProductDescription({ description }) {
  if (!description) return null

  return (
    <div className="product-description p-3" style={{ marginBottom: '68px' }}>
      <h5 className="mb-3">Mô tả sản phẩm</h5>
      <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
    </div>
  )
}

export default ProductDescription
