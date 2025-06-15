import React from 'react'
import FlashSaleTimer from './FlashSaleTimer'

function ProductInfo({ name, price, original_price, sold }) {
  function formatSold(sold) {
    if (sold >= 1000) {
      const rounded = Math.round((sold / 1000) * 10) / 10 // làm tròn 1 chữ số thập phân
      return `${rounded.toString().replace('.', ',')}k`
    }
    return sold.toString()
  }

  function getDateRange() {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    const options = { day: '2-digit', month: 'short' }

    const start = today.toLocaleDateString('vi-VN', options).replace('.', '')
    const endDate = new Date()
    endDate.setDate(today.getDate() + 4)
    const end = endDate.toLocaleDateString('vi-VN', options).replace('.', '')

    return `${start} - ${end}`
  }

  return (
    <div className="product-info">
      <FlashSaleTimer />

      {/* Giá + Giá gốc + Đã bán */}
      <div
        className="d-flex justify-content-between align-items-center mb-1 px-2"
        style={{ backgroundColor: 'rgb(242, 242, 242)' }}
      >
        <div className="d-flex align-items-center gap-2">
          <span
            className="fw-semibold text-danger"
            style={{ fontSize: '1.8rem' }}
          >
            ₫{Number(price).toLocaleString('vi-VN')}
          </span>

          {original_price && original_price > price && (
            <span
              className="text-muted text-decoration-line-through"
              style={{ fontSize: '1rem' }}
            >
              ₫{Number(original_price).toLocaleString('vi-VN')}
            </span>
          )}
        </div>

        <div
          className="text-muted me-2"
          style={{ fontSize: '0.9rem', fontWeight: 500 }}
        >
          Đã bán {formatSold(sold)}
        </div>
      </div>

      {/* Mô tả kiểu Shopee nếu muốn */}
      {/* <div className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
        Chỉ từ ₫{Math.round(price / 6).toLocaleString('vi-VN')} x 6 kỳ với SPayLater
      </div> */}

      {/* Tên sản phẩm */}
      <div className="fw-bold px-2" style={{ fontSize: '1rem' }}>
        <span
          style={{
            backgroundColor: '#d0011b',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 500,
            padding: '1px 6px',
            borderRadius: '3px',
            marginRight: '6px',
            textTransform: 'uppercase',
            lineHeight: '1.2',
          }}
        >
          Mall
        </span>
        {name}
      </div>

      {/* Thông tin giao hàng, bảo hành, SPayLater */}
      <div className="mt-2">
        {/* Nhận hàng */}
        <div className="d-flex align-items-start py-2 border-top border-bottom px-2">
          <i
            className="bi bi-truck"
            style={{ fontSize: '1.1rem', color: '#00bfa5', marginRight: '6px' }}
          ></i>
          <div>
            <div style={{ fontSize: '0.9rem' }}>Nhận từ {getDateRange()}</div>
            <div style={{ fontSize: '0.85rem', color: '#555' }}>
              Miễn phí vận chuyển toàn quốc
            </div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>
              Giảm ₫15.000 nếu đơn giao sau thời gian trên.
            </div>
          </div>
        </div>

        {/* Bảo hành */}
        <div className="d-flex align-items-center py-2 border-bottom px-2">
          <i
            className="bi bi-shield-check"
            style={{ fontSize: '1.1rem', color: '#ff424e', marginRight: '6px' }}
          ></i>
          <div style={{ fontSize: '0.9rem' }}>
            Bảo hành 12 tháng · Chính hãng 100%
          </div>
        </div>

        {/* SPayLater */}
        <div
          className="d-flex align-items-center px-2 py-2"
          style={{ borderBottom: '8px solid #eee' }}
        >
          <i
            className="bi bi-credit-card"
            style={{ fontSize: '1.1rem', color: '#ec4899', marginRight: '6px' }}
          ></i>
          <div style={{ fontSize: '0.9rem' }}>Thanh toán khi nhận hàng</div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      {/* {description && (
        <p
          className="text-body small mt-1 mb-0"
          style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}
        >
          {description}
        </p>
      )} */}
    </div>
  )
}

export default ProductInfo
