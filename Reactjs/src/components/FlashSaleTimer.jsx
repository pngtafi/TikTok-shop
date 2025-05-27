import React, { useEffect, useState } from 'react'
import FlipNumber from './FlipNumber'

const FlashSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return { h, m, s }
  }

  const { h, m, s } = formatTime(timeLeft)

  return (
    <div
      className="d-flex justify-content-between align-items-center px-3 py-1 mt-2"
      style={{
        background: 'linear-gradient(to right, #ff5722, #ff9800)',
        color: '#fff',
        fontWeight: 600,
        fontSize: '0.95rem',
      }}
    >
      <div className="d-flex align-items-center gap-1 flash-sale-text">
        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>F</span>
        <i
          className="bi bi-lightning-fill"
          style={{
            color: '#fff200',
            fontSize: '1.1rem',
            marginBottom: '1px',
            marginLeft: '-6px',
          }}
        ></i>
        <span
          style={{ fontWeight: 'bold', fontSize: '1rem', marginLeft: '-7px' }}
        >
          ASH SALE
        </span>
      </div>
      <div className="d-flex gap-1 align-items-center">
        <span
          style={{ fontWeight: 600, fontSize: '0.6rem', marginLeft: '-9px' }}
        >
          KẾT THÚC SAU
        </span>{' '}
        <FlipNumber value={h} /> : <FlipNumber value={m} /> :{' '}
        <FlipNumber value={s} />
      </div>
    </div>
  )
}

export default FlashSaleTimer
