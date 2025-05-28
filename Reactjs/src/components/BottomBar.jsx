import React, { useState } from 'react'
import ProductPurchaseModal from './ProductPurchaseModal'

function BottomBar({ product, selectedImage }) {
  const [showModal, setShowModal] = useState(false)
  const displayPrice = selectedImage?.price || product?.price

  return (
    <>
      <div className="bottom-bar bg-light border-top py-2 position-fixed bottom-0 start-0 end-0">
        <div className="container d-flex justify-content-end">
          <button
            className="btn text-white d-flex flex-column align-items-center"
            style={{
              background:
                'linear-gradient(to right, rgb(255, 87, 34), rgb(255, 152, 0))',
              border: 'none',
              padding: '6px 24px',
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
      />
    </>
  )
}

export default BottomBar
