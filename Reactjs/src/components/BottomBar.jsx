import React, { useState } from 'react'
import ProductPurchaseModal from './ProductPurchaseModal'

function BottomBar({ product, selectedImage }) {
  const [showModal, setShowModal] = useState(false)
  const displayPrice = selectedImage?.price || product?.price

  return (
    <>
      <div
        className="bottom-bar bg-light border-top py-2 position-fixed bottom-0 start-0 end-0"
        style={{ zIndex: 999 }}
      >
        <div className="container d-flex justify-content-end align-items-center gap-3 flex-nowrap">
          {/* Nút Chat Zalo */}
          <a
            href="https://zalo.me/0817586856"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center"
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#fff',
              color: '#0099ff',
              fontSize: '1.3rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <img
              src="/zalo-logo-vector.jpg" // hoặc /zalo-icon.png tuỳ bạn đặt
              alt="Zalo"
              style={{ width: '22px', height: '22px', objectFit: 'contain' }}
            />
          </a>

          {/* Nút Chat Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61558711828377"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center align-items-center"
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#fff',
              color: '#1877f2',
              fontSize: '1.3rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <i className="bi bi-facebook" />
          </a>

          {/* Nút Mua với voucher — giữ nguyên bản gốc */}
          <button
            className="btn text-white d-flex flex-column align-items-center"
            style={{
              background:
                'linear-gradient(to right, rgb(255, 87, 34), rgb(255, 152, 0))',
              border: 'none',
              padding: '6px 32px',
              borderRadius: '10px',
              minWidth: '50vw',
            }}
            onClick={() => setShowModal(true)}
          >
            <span style={{ fontSize: '0.8rem' }}>Mua với voucher</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              ₫{Number(displayPrice).toLocaleString('vi-VN')}
            </span>
          </button>
        </div>
      </div>

      <ProductPurchaseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        selectedColor={selectedImage?.name}
      />
    </>
  )
}

export default BottomBar
