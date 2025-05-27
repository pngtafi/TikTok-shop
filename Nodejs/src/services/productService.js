import db from '../models/index.js'
const Product = db.Product

export const getAllProductsService = async () => {
  try {
    const products = await Product.findAll()
    const data = products.map((p) => p.toJSON())
    return { errCode: 0, message: 'OK', data }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi lấy sản phẩm', error: err.message }
  }
}

export const createProductService = async (data) => {
  console.log('📥 Backend nhận:', data)
  try {
    const { name, price, category } = data

    if (!name || !price || !category) {
      return { errCode: 2, message: 'Thiếu thông tin bắt buộc' }
    }

    const newProduct = await Product.create(data)
    return { errCode: 0, message: 'Tạo thành công', data: newProduct.toJSON() }
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
    return {
      errCode: 0,
      message: 'Cập nhật thành công',
      data: updated.toJSON(),
    }
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
      data: product.toJSON(),
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
    const product = await Product.findByPk(productId)
    if (!product) return { errCode: 1, message: 'Không tìm thấy sản phẩm' }

    if (!files || files.length === 0) {
      return { errCode: 2, message: 'Không có file nào được upload' }
    }

    const current = Array.isArray(product.image_url) ? product.image_url : []

    const newUrls = files.map((file, index) => ({
      url: `/uploads/${file.filename}`,
      name: `ảnh ${current.length + index + 1}`,
    }))

    const updatedUrls = [...current, ...newUrls]

    await Product.update(
      { image_url: updatedUrls },
      { where: { id: productId } }
    )

    return { errCode: 0, message: 'Upload ảnh thành công', data: updatedUrls }
  } catch (error) {
    return { errCode: -1, message: 'Lỗi server', error: error.message }
  }
}
