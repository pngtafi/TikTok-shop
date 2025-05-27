import db from '../models/index.js'
import ExcelJS from 'exceljs'
const Order = db.Order

export const createOrderService = async (data) => {
  try {
    const { name, phone, address, product_name, color, size, quantity, price } =
      data
    // Kiểm tra các trường bắt buộc
    if (
      !name ||
      !phone ||
      !address ||
      !product_name ||
      !color ||
      !size ||
      !quantity ||
      !price
    ) {
      return { errCode: 2, message: 'Thiếu thông tin bắt buộc' }
    }
    // Tạo bản ghi đơn hàng mới
    const newOrder = await Order.create(data)
    return { errCode: 0, message: 'Tạo đơn hàng thành công', data: newOrder }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi tạo đơn hàng', error: err.message }
  }
}

export const exportOrdersService = async (query) => {
  try {
    const { startDate, endDate } = query
    // Xây dựng điều kiện lọc theo ngày nếu có
    const where = {}
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      }
    }

    // Truy vấn tất cả đơn hàng từ bảng orders với các trường cần thiết
    const orders = await Order.findAll({
      attributes: [
        'name',
        'phone',
        'address',
        'note',
        'product_name',
        'color',
        'size',
        'quantity',
        'price',
        'createdAt',
      ],
      where,
      raw: true,
    })

    // Tạo workbook mới và worksheet "Orders"
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Orders')

    // Định nghĩa các cột và tiêu đề cho file Excel
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Note', key: 'note', width: 30 },
      { header: 'Product', key: 'product_name', width: 25 },
      { header: 'Color', key: 'color', width: 15 },
      { header: 'Size', key: 'size', width: 10 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ]

    // Thêm dữ liệu đơn hàng vào worksheet
    worksheet.addRows(orders)

    // Xuất workbook ra buffer và trả về
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
  } catch (error) {
    console.error('Error exporting orders:', error)
    throw error // đẩy lỗi ra để xử lý ở tầng trên (nếu cần)
  }
}
