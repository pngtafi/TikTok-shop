import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrderSuccessPage() {
  const navigate = useNavigate()

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center py-5"
      style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}
    >
      {/* Icon ✅ */}
      <div
        className="mb-4"
        style={{
          fontSize: '4rem',
          color: '#28a745',
          backgroundColor: '#d4edda',
          borderRadius: '50%',
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        ✅
      </div>

      {/* Tiêu đề */}
      <h2 className="text-success fw-bold mb-3">Đặt hàng thành công!</h2>

      {/* Nội dung phụ */}
      <p className="text-muted mb-4 text-center" style={{ maxWidth: '400px' }}>
        Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng sẽ được xử
        lý và vận chuyển trong thời gian sớm nhất. Shop sẽ liên hệ để xác nhận
        đơn hàng.
      </p>

      {/* Button về trang chủ */}
      <button
        className="btn btn-outline-success px-4 py-2 fw-bold"
        onClick={() => navigate('/')}
      >
        Về trang chủ
      </button>
    </div>
  )
}

export default OrderSuccessPage
