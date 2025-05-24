import express from 'express'
import multer from 'multer'
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  uploadProductImages,
} from '../controllers/productController.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', getAllProducts)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

router.get('/:id', getProductById)

router.post('/:id/images', upload.array('images'), uploadProductImages)

export default router
