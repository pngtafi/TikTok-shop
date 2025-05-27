import {
  createOrderService,
  exportOrdersService,
} from '../services/orderService.js'

import { sendTikTokEvent } from '../services/tiktokService.js'

export const createOrder = async (req, res) => {
  try {
    const result = await createOrderService(req.body)
    if (result.errCode === 0 && result.data) {
      // Sử dụng sự kiện chuẩn "Purchase" (đơn hàng thành công):contentReference[oaicite:1]{index=1}
      sendTikTokEvent({ event: 'Purchase', eventId: result.data.id.toString() })
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
