import {
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
  getProductServiceById,
  uploadProductImagesService,
} from '../services/productService.js'

export const getAllProducts = async (req, res) => {
  try {
    const result = await getAllProductsService()
    return res.status(result.errCode === 0 ? 200 : 500).json(result)
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server',
      error: error.message,
    })
  }
}

export const createProduct = async (req, res) => {
  try {
    const result = await createProductService(req.body)
    return res.status(result.errCode === 0 ? 201 : 400).json(result)
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server',
      error: error.message,
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const result = await updateProductService(req.params.id, req.body)
    return res.status(result.errCode === 0 ? 200 : 404).json(result)
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server',
      error: error.message,
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id)
    if (result.errCode === 0) {
      return res.status(204).end() // no content
    }
    return res.status(404).json(result)
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server',
      error: error.message,
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const result = await getProductServiceById(req.params.id)
    return res.status(result.errCode === 0 ? 200 : 404).json(result)
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server',
      error: error.message,
    })
  }
}

export const uploadProductImages = async (req, res) => {
  try {
    const { id } = req.params
    const result = await uploadProductImagesService(id, req.files)
    return res.status(result.errCode === 0 ? 201 : 400).json(result)
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server',
      error: error.message,
    })
  }
}
