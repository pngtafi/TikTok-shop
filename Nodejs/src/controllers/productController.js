import {
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
  getProductServiceById,
  uploadProductImagesService,
  getProductImagesService,
} from '../services/productService.js'
import db from '../models/index.js'

export const getAllProducts = async (req, res) => {
  const result = await getAllProductsService()
  return res.status(result.errCode === 0 ? 200 : 500).json(result)
}

export const createProduct = async (req, res) => {
  const result = await createProductService(req.body)
  return res.status(result.errCode === 0 ? 201 : 400).json(result)
}

export const updateProduct = async (req, res) => {
  const result = await updateProductService(req.params.id, req.body)
  return res.status(result.errCode === 0 ? 200 : 404).json(result)
}

export const deleteProduct = async (req, res) => {
  const result = await deleteProductService(req.params.id)
  return res.status(result.errCode === 0 ? 204 : 404).json(result)
}

export const getProductById = async (req, res) => {
  const result = await getProductServiceById(req.params.id)
  return res.status(result.errCode === 0 ? 200 : 404).json(result)
}

export const uploadProductImages = async (req, res) => {
  const { id } = req.params
  const result = await uploadProductImagesService(id, req.files)
  return res.status(result.errCode === 0 ? 201 : 400).json(result)
}

export const getProductImages = async (req, res) => {
  const result = await getProductImagesService(req.params.id)
  return res.status(result.errCode === 0 ? 200 : 500).json(result)
}
