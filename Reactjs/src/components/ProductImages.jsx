import React, { useState } from 'react'
import './ProductImages.css'

function ProductImages({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return <div>Không có hình ảnh</div>
  }

  const selectedImage = images[selectedIndex]

  return (
    <div>
      {/* Ảnh lớn hiển thị chính */}
      <img
        src={selectedImage.url}
        alt={selectedImage.name}
        className="img-fluid w-100 mb-2"
        style={{ height: 'auto' }}
      />
      {/* Danh sách thumbnail các ảnh nhỏ trượt ngang */}
      <div
        className="d-flex hide-scrollbar"
        style={{
          gap: '8px',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.name}
            title={img.name}
            className={`img-thumbnail ${
              index === selectedIndex ? 'border border-primary' : ''
            }`}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              cursor: 'pointer',
              flex: '0 0 auto',
            }}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImages
