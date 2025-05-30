import React from 'react'
import { useSwipeable } from 'react-swipeable'

function MediaPreviewModal({
  show,
  mediaList,
  currentIndex,
  onClose,
  setCurrentIndex,
}) {
  if (!show || !mediaList || mediaList.length === 0) return null

  const currentMedia = mediaList[currentIndex]
  const isVideo = currentMedia.endsWith('.mp4')

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < mediaList.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    },
    trackMouse: true,
  })

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
      onClick={onClose}
      {...swipeHandlers}
    >
      {/* Nút quay lại (góc trên trái) */}
      <button
        onClick={onClose}
        className="position-absolute"
        style={{
          top: '16px',
          left: '16px',
          zIndex: 1060,
          background: 'transparent',
          border: 'none',
          padding: 0,
        }}
      >
        <i
          className="bi bi-arrow-left"
          style={{ color: '#fff', fontSize: '1.6rem' }}
        />
      </button>

      {/* Số ảnh/video (top center) */}
      <span
        className="position-absolute top-0 start-50 translate-middle-x"
        style={{
          marginTop: '16px',
          padding: '4px 12px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: '#fff',
          fontSize: '0.9rem',
          borderRadius: '12px',
          zIndex: 1060,
        }}
      >
        {currentIndex + 1}/{mediaList.length}
      </span>

      {/* Nội dung ảnh hoặc video */}
      <div onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            src={currentMedia}
            controls
            autoPlay
            muted
            playsInline
            style={{ marginTop: '20px', maxHeight: '80vh', maxWidth: '90vw' }}
          />
        ) : (
          <img
            src={currentMedia}
            alt="preview"
            style={{ marginTop: '20px', maxHeight: '80vh', maxWidth: '90vw' }}
          />
        )}
      </div>
    </div>
  )
}

export default MediaPreviewModal
