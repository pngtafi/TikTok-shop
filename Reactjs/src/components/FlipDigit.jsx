import React, { useEffect, useState } from 'react'
import './FlashSaleTimer.css'

const FlipDigit = ({ digit }) => {
  const [prevDigit, setPrevDigit] = useState(digit)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (digit !== prevDigit) {
      setAnimate(true)
      const timeout = setTimeout(() => {
        setAnimate(false)
        setPrevDigit(digit)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [digit, prevDigit])

  return (
    <div className="flip-container">
      <div className={`flip-number ${animate ? 'animate' : ''}`}>{digit}</div>
    </div>
  )
}

export default FlipDigit
