import db from '../models/index.js'
const Product = db.Product

export const getAllProductsService = async () => {
  try {
    const products = await Product.findAll()
    return { errCode: 0, message: 'OK', data: products }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi lấy sản phẩm', error: err.message }
  }
}

export const createProductService = async (data) => {
  try {
    const { name, price, tiktok_link, category } = data
    if (!name || !price || !tiktok_link || !category) {
      return { errCode: 2, message: 'Thiếu thông tin bắt buộc' }
    }
    const newProduct = await Product.create(data)
    return { errCode: 0, message: 'Tạo thành công', data: newProduct }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi tạo sản phẩm', error: err.message }
  }
}

export const updateProductService = async (id, data) => {
  try {
    const product = await Product.findByPk(id)
    if (!product) return { errCode: 3, message: 'Không tìm thấy sản phẩm' }

    await Product.update(data, { where: { id } })
    const updated = await Product.findByPk(id)
    return { errCode: 0, message: 'Cập nhật thành công', data: updated }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi cập nhật', error: err.message }
  }
}

export const deleteProductService = async (id) => {
  try {
    const product = await Product.findByPk(id)
    if (!product) return { errCode: 3, message: 'Không tìm thấy sản phẩm' }

    await Product.destroy({ where: { id } })
    return { errCode: 0, message: 'Xoá thành công' }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi xoá', error: err.message }
  }
}

export const getProductServiceById = async (id) => {
  try {
    const product = await Product.findByPk(id)

    if (!product) {
      return {
        errCode: 1,
        message: 'Không tìm thấy sản phẩm',
      }
    }

    return {
      errCode: 0,
      data: product,
    }
  } catch (error) {
    return {
      errCode: -1,
      message: 'Lỗi server',
    }
  }
}

export const uploadProductImagesService = async (productId, files) => {
  try {
    if (!files || files.length === 0) {
      return { errCode: 1, message: 'Không có ảnh nào' }
    }

    const images = files.map((file) => ({
      productId,
      image_url: `/uploads/${file.filename}`,
    }))

    await db.ProductImage.bulkCreate(images)

    return { errCode: 0, message: 'Đã lưu ảnh phụ thành công' }
  } catch (error) {
    return {
      errCode: -1,
      message: 'Lỗi khi lưu ảnh phụ',
      error: error.message,
    }
  }
}

export const getProductImagesService = async (productId) => {
  try {
    const images = await db.ProductImage.findAll({
      where: { productId },
    })

    return {
      errCode: 0,
      message: 'Lấy ảnh phụ thành công',
      data: images,
    }
  } catch (error) {
    return {
      errCode: 1,
      message: 'Lỗi khi lấy ảnh phụ',
      error: error.message,
    }
  }
}
