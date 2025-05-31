import {
  createOrderService,
  exportOrdersService,
} from '../services/orderService.js'

import { sendTikTokEvent } from '../services/tiktokService.js'

export const createOrder = async (req, res) => {
  try {
    const result = await createOrderService(req.body)
    if (result.errCode === 0 && result.data) {
      const order = result.data
      await sendTikTokEvent({
        event: 'Purchase',
        eventId: order.eventId,
        value: order.price * order.quantity,
        currency: 'VND',
        productId: order.product_name,
        userId: order.phone,
        url: 'https://tik-tok-shop-five.vercel.app/checkout',

        // các trường định danh
        email: order.email,
        phone_number: formattedPhone,
        external_id: order.phone,

        // optional
        ip: req.ip,
        user_agent: req.headers['user-agent'],
        ttclid: req.body.ttclid || '', // nếu frontend gửi về
      })
    }
    return res.status(result.errCode === 0 ? 200 : 500).json(result)
  } catch (error) {
    console.error('❌ Lỗi createOrder:', error)
    return res.status(500).json({ errCode: -1, message: 'Lỗi từ máy chủ' })
  }
}

export const exportOrders = async (req, res, next) => {
  try {
    // Lấy tham số lọc ngày bắt đầu và kết thúc từ query (nếu có)
    const { startDate, endDate } = req.query

    // Gọi service để truy vấn đơn hàng và tạo workbook Excel
    const excelData = await exportOrdersService(startDate, endDate)

    // Thiết lập header phản hồi để tải xuống file Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx')

    // Gửi dữ liệu file Excel về phía client
    res.end(excelData)
  } catch (error) {
    console.error('Export orders failed:', error)
    next(error) // đẩy lỗi cho middleware xử lý lỗi chung (nếu có)
  }
}
