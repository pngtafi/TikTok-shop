import React, { useState } from 'react'

function ProductImages({ images }) {
  // Chỉ số ảnh đang được chọn để hiển thị lớn
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return <div>Không có hình ảnh</div>
  }

  return (
    <div>
      {/* Ảnh lớn hiển thị chính */}
      <img
        src={images[selectedIndex]}
        alt="Product"
        className="img-fluid w-100 mb-2"
        style={{ height: 'auto' }}
      />
      {/* Danh sách thumbnail các ảnh nhỏ */}
      <div>
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="thumb"
            className={`img-thumbnail me-2 ${
              index === selectedIndex ? 'border-primary' : ''
            }`}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImages
