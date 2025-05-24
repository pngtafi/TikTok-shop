import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function CheckoutPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { product, variant, quantity } = state || {}

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')

  if (!product || !variant || !quantity) {
    return <div className="container py-3">Không có dữ liệu sản phẩm.</div>
  }

  const total = Number(product.price) * quantity

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin người nhận!')
      return
    }

    console.log({
      product,
      variant,
      quantity,
      buyer: { name, phone, address, note },
    })

    alert('Đặt hàng thành công!')
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

        <input
          className="form-control mb-2"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Địa chỉ nhận hàng"
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          className="form-control"
          placeholder="Lời nhắn cho shop (tuỳ chọn)"
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
              Array.isArray(product.image_url)
                ? product.image_url[0]
                : product.image_url
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
              ₫{Number(product.price).toLocaleString('vi-VN')}
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
        >
          Đặt hàng
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
