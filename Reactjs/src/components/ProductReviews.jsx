import React from 'react'

function ProductReviews({ reviews }) {
  if (!reviews) return null

  const totalRatings = reviews.length
  const avgRating =
    totalRatings > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(
          1
        )
      : 0

  // const avgStars =
  //   '★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating))

  return (
    <div className="product-reviews">
      {/* Tổng quan đánh giá */}
      <div className="d-flex justify-content-between align-items-center px-2 border-bottom">
        <div style={{ fontSize: '1.1rem', padding: '8px 0' }}>
          <strong>{avgRating}</strong>{' '}
          <span className="text-warning" style={{ fontSize: '1rem' }}>
            ★
          </span>{' '}
          <span style={{ fontWeight: 500 }}>Đánh Giá Sản Phẩm</span>{' '}
          <span className="text-muted">({totalRatings})</span>
        </div>
        <div className="text-primary" style={{ fontSize: '0.9rem' }}>
          Tất cả &gt;
        </div>
      </div>

      {/* Danh sách đánh giá */}
      {reviews.length === 0 ? (
        <p className="px-2">Chưa có đánh giá nào.</p>
      ) : (
        <ul className="list-unstyled m-0">
          {reviews.map((review, index) => {
            const stars =
              '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)
            const isLast = index === reviews.length - 1
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
                {/* Tên người dùng và số sao */}
                <div className="mb-1 d-flex justify-content-between mt-2">
                  <strong>{review.user}</strong>
                </div>
                <div className="text-warning mb-1">{stars}</div>

                {/* Nội dung đánh giá */}
                <div className="mb-1">{review.content}</div>

                {/* Phân loại hàng */}
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

                {/* Hình ảnh đính kèm */}
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
