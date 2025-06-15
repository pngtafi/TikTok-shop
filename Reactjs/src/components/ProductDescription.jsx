import React from 'react'

function ProductDescription({ description, policy }) {
  if (!description) return null

  return (
    <div className="product-description p-3" style={{ marginBottom: '68px' }}>
      <h5 className="mb-3">Mô tả sản phẩm</h5>
      <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
      <h5 className="mb-3">Chính sách của shop</h5>
      <p style={{ whiteSpace: 'pre-line' }}>{policy}</p>
      <img
        src="https://w.ladicdn.com/s750x500/64cd0a9c5cc416001261944a/z5296475053186_6e47b7e92bbea3588686da84485b54e9-20240329092128-bmh33.jpg"
        alt=""
      />
    </div>
  )
}

export default ProductDescription
