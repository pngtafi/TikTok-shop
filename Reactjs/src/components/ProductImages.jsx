import React, { useState, useRef, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import './ProductImages.css'

function ProductImages({ images, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const thumbnailRefs = useRef([])

  useEffect(() => {
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'nearest',
      })
    }
    if (onSelect && typeof onSelect === 'function') {
      onSelect(images[selectedIndex])
    }
  }, [selectedIndex, images, onSelect])

  if (!images || images.length === 0) {
    return <div>Không có hình ảnh</div>
  }

  const selectedImage = images[selectedIndex]

  const handlers = useSwipeable({
    onSwipedLeft: () => setSelectedIndex((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // hỗ trợ kéo bằng chuột (PC)
  })

  return (
    <div>
      {/* Ảnh lớn hiển thị chính */}
      <div
        {...handlers}
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <img
          src={selectedImage.url}
          alt={selectedImage.name}
          className="img-fluid w-100 mb-2"
          style={{ height: 'auto' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'black',
            padding: '0 8px',
            fontSize: '0.8rem',
            borderRadius: '10px',
          }}
        >
          {selectedIndex + 1}/{images.length}
        </div>
      </div>

      <div
        className="text-muted"
        style={{
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: '0 8px',
        }}
      >
        {selectedImage.name}
      </div>
      {/* Danh sách thumbnail các ảnh nhỏ trượt ngang */}
      <div
        className="d-flex hide-scrollbar"
        style={{
          gap: '8px',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          padding: '0 8px 8px 8px',
        }}
      >
        {images.map((img, index) => (
          <div
            key={img.name}
            ref={(el) => (thumbnailRefs.current[index] = el)}
            style={{ position: 'relative', flex: '0 0 auto' }}
            onClick={() => setSelectedIndex(index)}
          >
            <img
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
                padding: 0,
                borderRadius: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
