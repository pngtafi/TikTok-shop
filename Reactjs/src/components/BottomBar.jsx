import React, { useState } from 'react'
import ProductPurchaseModal from './ProductPurchaseModal'

function BottomBar({ product }) {
  const [showModal, setShowModal] = useState(false)
  const price = product?.price

  return (
    <>
      <div className="bottom-bar bg-light border-top py-3 position-fixed bottom-0 start-0 end-0">
        <div className="container d-flex justify-content-end">
          <button className="btn btn-outline-warning me-2">
            Thêm vào giỏ hàng
          </button>

          <button
            className="btn btn-warning d-flex flex-column align-items-center"
            onClick={() => setShowModal(true)}
          >
            <span style={{ fontSize: '0.8rem' }}>Mua với voucher</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              ₫{Number(price).toLocaleString('vi-VN')}
            </span>
          </button>
        </div>
      </div>

      {/* Modal hiện khi click nút mua */}
      <ProductPurchaseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </>
  )
}

export default BottomBar
