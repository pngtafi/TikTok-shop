import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

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
        external_id: eventData.userId || 'unknown_user',
      },
    },
  }

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
