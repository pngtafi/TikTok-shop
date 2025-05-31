import axios from 'axios'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const sha256 = (val) =>
  crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex')

export const sendTikTokEvent = async (eventData) => {
  const pixelCode = process.env.TIKTOK_PIXEL_CODE
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN
  if (!pixelCode || !accessToken) {
    console.error(
      'TikTok Pixel Code hoặc Access Token chưa được cấu hình trong .env'
    )
    return
  }

  const payload = {
    pixel_code: pixelCode,
    event: eventData.event, // Ví dụ: "Purchase" cho đơn hàng thành công
    event_id: eventData.eventId, // Id duy nhất cho event (dùng để gộp trùng)
    timestamp: Math.floor(Date.now() / 1000), // Thời gian (Unix timestamp, giây)
    context: {
      page: {
        url: eventData.url || 'https://tik-tok-shop-five.vercel.app',
      },
      user: {
        external_id: sha256(eventData.external_id || ''),
        email: sha256(eventData.email || ''),
        phone_number: sha256(eventData.phone_number || ''),
        ip: eventData.ip || '',
        user_agent: eventData.user_agent || '',
        ttclid: eventData.ttclid || '',
      },
    },
    properties: {
      value: eventData.value || 1,
      currency: eventData.currency || 'VND',
      content_type: 'product',
      content_id: eventData.productId || 'unknown',
    },
  }

  console.log('🚀 Payload gửi TikTok:', JSON.stringify(payload, null, 2))

  try {
    const response = await axios.post(
      'https://business-api.tiktok.com/open_api/v1.3/pixel/track/',
      payload,
      {
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('TikTok Event sent:', response.data)
  } catch (error) {
    console.error(
      'Error sending TikTok event:',
      error.response ? error.response.data : error.message
    )
  }
}
