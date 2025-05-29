import React, { useEffect, useState } from 'react'
import FlipNumber from './FlipNumber'

const TOTAL_TIME = 3 * 60 * 60

const FlashSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)

  useEffect(() => {
    const storedStartTime = localStorage.getItem('flashSaleStartTime')
    let startTime = storedStartTime ? parseInt(storedStartTime, 10) : null

    const now = Math.floor(Date.now() / 1000)

    // Nếu chưa có startTime hoặc đã hết 3h thì tạo mới
    if (!startTime || now - startTime >= TOTAL_TIME) {
      startTime = now
      localStorage.setItem('flashSaleStartTime', startTime)
    }

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000)
      let elapsed = now - startTime
      if (elapsed >= TOTAL_TIME) {
        // Reset vòng mới
        startTime = now
        localStorage.setItem('flashSaleStartTime', startTime)
        elapsed = 0
      }
      setTimeLeft(TOTAL_TIME - elapsed)
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
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
