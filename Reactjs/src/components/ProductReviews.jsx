import React, { useState } from 'react'
import MediaPreviewModal from './MediaPreviewModal'

const maskUsername = (fullName) => {
  if (!fullName) return ''

  const maskWord = (word) => {
    if (word.length <= 1) return word

    const chars = [...word]
    const totalKeep = Math.min(4, word.length)
    const keepIndexes = new Set([0]) // luôn giữ ký tự đầu tiên

    while (keepIndexes.size < totalKeep) {
      const i = Math.floor(Math.random() * word.length)
      if (i !== 0) keepIndexes.add(i)
    }

    return chars.map((ch, i) => (keepIndexes.has(i) ? ch : '*')).join('')
  }

  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => {
      const masked = maskWord(word)
      return masked.charAt(0).toUpperCase() + masked.slice(1)
    })
    .join(' ')
}

function ProductReviews({ reviews }) {
  const [previewIndex, setPreviewIndex] = useState(null)
  const [previewList, setPreviewList] = useState([])

  if (!reviews) return null

  const totalRatings = '5,1k' // 🔢 Giả lập tổng số đánh giá
  const avgRating = 4.9 // 🔒 Cố định giá trung bình sao

  return (
    <div className="product-reviews">
      {/* Tổng quan đánh giá */}
      <div className="d-flex justify-content-between align-items-center px-2 border-bottom">
        <div
          className="d-flex align-items-center gap-1"
          style={{ fontSize: '1.1rem' }}
        >
          <strong>{avgRating}</strong>{' '}
          <span
            className="text-warning"
            style={{ fontSize: '1.2rem', position: 'relative', top: '-2.2px' }}
          >
            ★
          </span>{' '}
          <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
            Đánh Giá Sản Phẩm
          </span>{' '}
          <span className="text-muted" style={{ fontSize: '0.9rem' }}>
            ({totalRatings})
          </span>
        </div>
        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
          Tất cả &gt;
        </div>
      </div>

      {/* Bộ lọc theo sao và hình ảnh */}
      <div
        className="d-flex flex-nowrap gap-2 px-2 py-2 border-bottom"
        style={{ fontSize: '0.75rem' }}
      >
        <button className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1 text-dark">
          <i className="bi bi-image me-1" style={{ fontSize: '0.85rem' }}></i>
          254
        </button>

        <button className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1 text-dark">
          <i
            className="bi bi-star-fill text-warning me-1"
            style={{ fontSize: '0.85rem' }}
          ></i>
          5 (4,6k)
        </button>

        <button className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1 text-dark">
          <i
            className="bi bi-star-fill text-warning me-1"
            style={{ fontSize: '0.85rem' }}
          ></i>
          4 (449)
        </button>

        <button className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1 text-dark">
          <i
            className="bi bi-star-fill text-warning me-1"
            style={{ fontSize: '0.85rem' }}
          ></i>
          3 (29)
        </button>
      </div>

      {/* Danh sách đánh giá */}
      {reviews.length === 0 ? (
        <p className="px-2">Chưa có đánh giá nào.</p>
      ) : (
        <ul className="list-unstyled m-0">
          {reviews.slice(0, 3).map((review, index) => {
            const stars =
              '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)
            const isLast = index === 2
            return (
              <li
                key={index}
                className={!isLast ? 'border-bottom' : ''}
                style={{
                  padding: '10px',
                  ...(isLast && {
                    borderBottom: '10px solid rgb(238, 238, 238)',
                  }),
                }}
              >
                <div className="mb-2 d-flex align-items-center gap-2">
                  <img
                    src={
                      review.icon ||
                      'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                    }
                    alt="avatar"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <strong>{maskUsername(review.user)}</strong>
                </div>
                <div className="text-warning mb-1">{stars}</div>
                <div className="mb-1">{review.content}</div>

                {review.variant && (
                  <div
                    className="mb-1 text-muted"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Phân loại:{' '}
                    {typeof review.variant === 'object'
                      ? Object.values(review.variant).join(', ')
                      : review.variant}
                  </div>
                )}

                {review.images?.length > 0 && (
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    {review.images.map((mediaUrl, i) => {
                      const isVideo = mediaUrl.endsWith('.mp4')
                      return isVideo ? (
                        <video
                          key={i}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          onClick={() => {
                            setPreviewList(review.images)
                            setPreviewIndex(i)
                          }}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            backgroundColor: '#000',
                            cursor: 'pointer',
                            borderRadius: '6px',
                          }}
                        >
                          <source src={mediaUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          key={i}
                          src={mediaUrl}
                          alt="review-img"
                          onClick={() => {
                            setPreviewList(review.images)
                            setPreviewIndex(i)
                          }}
                          className="img-thumbnail"
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                          }}
                        />
                      )
                    })}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}

      <MediaPreviewModal
        show={previewIndex !== null}
        mediaList={previewList}
        currentIndex={previewIndex}
        onClose={() => setPreviewIndex(null)}
        setCurrentIndex={setPreviewIndex}
      />
    </div>
  )
}

export default ProductReviews
