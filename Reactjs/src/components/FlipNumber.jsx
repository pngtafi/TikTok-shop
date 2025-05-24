import React from 'react'
import FlipDigit from './FlipDigit'

const FlipNumber = ({ value }) => {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flip-number-wrapper d-flex justify-content-center align-items-center">
      <FlipDigit digit={padded[0]} />
      <FlipDigit digit={padded[1]} />
    </div>
  )
}

export default FlipNumber
