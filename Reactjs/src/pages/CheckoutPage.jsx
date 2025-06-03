import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderService'

const ttclid = new URLSearchParams(window.location.search).get('ttclid')

function CheckoutPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { product, variant, quantity } = state || {}

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [phoneValid, setPhoneValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  if (!product || !variant || !quantity) {
    return <div className="container py-3">Không có dữ liệu sản phẩm.</div>
  }

  const selectedImage = Array.isArray(product.image_url)
    ? product.image_url.find((img) => img.name === variant.color)
    : null

  const displayPrice = selectedImage?.price || product.price
  const total = Number(displayPrice) * quantity

  const normalizePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    if (/^0\d{9}$/.test(cleaned)) return `+84${cleaned.slice(1)}`
    if (/^84\d{9}$/.test(cleaned)) return `+${cleaned}`
    if (/^\+84\d{9}$/.test(cleaned)) return cleaned
    return ''
  }

  const handleOrder = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const rawPhone = phone.trim()
    const normalizedPhone = normalizePhone(rawPhone)

    setPhoneValid(true)
    setEmailValid(true)

    if (!name || !rawPhone || !address) {
      setError('Vui lòng điền đầy đủ thông tin người nhận!')
      return
    }

    if (email && !emailRegex.test(email.trim())) {
      setEmailValid(false)
      setError('Email không hợp lệ!')
      return
    }

    if (!normalizedPhone) {
      setPhoneValid(false)
      setError('Số điện thoại không hợp lệ!')
      return
    }

    setLoading(true)

    const safeEmail =
      email && email.trim() && email.includes('@')
        ? email.trim()
        : `guest_${Date.now()}@aodieuhoa.vn`
    const eventId =
      Date.now().toString() + Math.random().toString(36).substring(2, 8)

    try {
      await createOrder({
        name,
        email: safeEmail,
        phone: normalizedPhone,
        address,
        note,
        product_name: product.name,
        color: variant.color,
        size: variant.size,
        quantity,
        price: displayPrice,
        eventId: eventId,
        ttclid,
      })

      // TikTok client-side
      if (typeof ttq !== 'undefined') {
        ttq.identify({
          email: safeEmail,
          phone_number: normalizedPhone,
        })

        ttq.track('CompletePayment', {
          value: total,
          currency: 'VND',
          content_id: product.id,
          content_type: 'product',
          quantity,
          event_id: eventId,
        })
      }

      setTimeout(() => {
        navigate('/order-success')
      }, 500)
    } catch (error) {
      alert(error.message || 'Có lỗi xảy ra khi gửi đơn hàng.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-3">
      <div
        className="d-flex align-items-center justify-content-between px-3 py-2"
        style={{
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{ color: '#000', fontSize: '1.4rem', cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        >
          ←
        </div>
        <div className="fw-bold">Thanh toán</div>
        <div style={{ width: '24px' }} />{' '}
      </div>

      {/* Thông tin người nhận */}
      <div className="bg-white p-3 rounded shadow-sm mb-3">
        <h6 className="fw-bold mb-3">Thông tin người nhận</h6>

        {error && (
          <div className="alert alert-warning p-2 mb-2 text-center">
            {error}
          </div>
        )}

        <label className="form-label">Họ và tên</label>
        <input
          className="form-control mb-2"
          placeholder="Nhập họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label">
          Email <span className="text-muted">(không bắt buộc)</span>
        </label>
        <input
          className={`form-control mb-2 ${!emailValid ? 'is-invalid' : ''}`}
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!emailValid && (
          <div className="invalid-feedback">Email không đúng định dạng</div>
        )}

        <label className="form-label">Số điện thoại</label>
        <input
          className={`form-control mb-2 ${!phoneValid ? 'is-invalid' : ''}`}
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {!phoneValid && (
          <div className="invalid-feedback">
            Số điện thoại phải đủ 10 số và bắt đầu bằng 0
          </div>
        )}

        <label className="form-label">Địa chỉ nhận hàng</label>
        <textarea
          className="form-control mb-2"
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="form-label">
          Lời nhắn cho shop <span className="text-muted">(không bắt buộc)</span>
        </label>
        <textarea
          className="form-control"
          placeholder="Ví dụ: Giao giờ hành chính"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Sản phẩm */}
      <div className="bg-white p-3 rounded shadow-sm mb-3">
        <div className="d-flex">
          <img
            src={
              selectedImage?.url ||
              (Array.isArray(product.image_url)
                ? product.image_url[0].url
                : product.image_url)
            }
            alt="product"
            width="60"
            height="60"
            className="rounded me-2"
            style={{ objectFit: 'cover' }}
          />
          <div>
            <div className="fw-bold">{product.name}</div>
            <div className="text-muted small">
              Phân loại: {variant?.color}, {variant?.size} · Số lượng:{' '}
              {quantity}
            </div>
            <div className="text-danger mt-1">
              ₫{Number(displayPrice).toLocaleString('vi-VN')}
            </div>
          </div>
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="bg-white p-3 rounded shadow-sm mb-5">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">Tổng cộng</span>
          <span className="text-danger fw-bold">
            ₫{Number(total).toLocaleString('vi-VN')}
          </span>
        </div>
      </div>

      {/* Nút đặt hàng */}
      <div className="fixed-bottom bg-white p-3 border-top d-flex justify-content-between align-items-center">
        <div>
          <div className="small text-muted">Tổng cộng</div>
          <div className="text-danger fw-bold fs-5">
            ₫{Number(total).toLocaleString('vi-VN')}
          </div>
        </div>
        <button
          className="btn btn-danger px-4 py-2 fw-bold"
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ? 'Đang gửi...' : 'Đặt hàng'}
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
