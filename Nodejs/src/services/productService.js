import db from '../models/index.js'
const Product = db.Product

const parseImageUrl = (product) => {
  try {
    if (product.image_url) {
      product.image_url = JSON.parse(product.image_url)
    }
  } catch (err) {
    product.image_url = []
  }
  return product
}

export const getAllProductsService = async () => {
  try {
    let products = await Product.findAll()
    products = products.map((p) => parseImageUrl(p.toJSON()))
    return { errCode: 0, message: 'OK', data: products }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi lấy sản phẩm', error: err.message }
  }
}

export const createProductService = async (data) => {
  console.log('📥 Backend nhận:', data)
  try {
    const { name, price, category, image_url } = data

    if (!name || !price || !category) {
      return { errCode: 2, message: 'Thiếu thông tin bắt buộc' }
    }

    if (Array.isArray(data.image_url)) {
      data.image_url = JSON.stringify(data.image_url)
    }

    const newProduct = await Product.create(data)
    const parsed = parseImageUrl(newProduct.toJSON())
    return { errCode: 0, message: 'Tạo thành công', data: parsed }
  } catch (err) {
    return { errCode: 1, message: 'Lỗi khi tạo sản phẩm', error: err.message }
  }
}

export const updateProductService = async (id, data) => {
  try {
    const product = await Product.findByPk(id)
    if (!product) return { errCode: 3, message: 'Không tìm thấy sản phẩm' }

    if (Array.isArray(data.image_url)) {
      data.image_url = JSON.stringify(data.image_url)
    }

    await Product.update(data, { where: { id } })
    const updated = await Product.findByPk(id)
    const parsed = parseImageUrl(updated.toJSON())
    return { errCode: 0, message: 'Cập nhật thành công', data: parsed }
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

    const parsed = parseImageUrl(product.toJSON())

    return {
      errCode: 0,
      data: parsed,
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

    const newUrls = files.map((file) => `/uploads/${file.filename}`)

    let current = []
    try {
      current = JSON.parse(product.image_url || '[]')
    } catch (err) {}

    const updatedUrls = [...current, ...newUrls]

    await Product.update(
      { image_url: JSON.stringify(updatedUrls) },
      { where: { id: productId } }
    )

    return { errCode: 0, message: 'Upload ảnh thành công', data: updatedUrls }
  } catch (error) {
    return { errCode: -1, message: 'Lỗi server', error: error.message }
  }
}
