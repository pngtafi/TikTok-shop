import React from 'react'

function ProductReviews({ reviews }) {
  if (!reviews) return null

  const totalRatings = '1,5k' // 🔢 Giả lập tổng số đánh giá
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
                <div className="mb-1 d-flex justify-content-between mt-2">
                  <strong>{review.user}</strong>
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
                  <div className="mb-3">
                    {review.images.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt="review-img"
                        className="me-2 mb-2 img-thumbnail"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                        }}
                      />
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ProductReviews
