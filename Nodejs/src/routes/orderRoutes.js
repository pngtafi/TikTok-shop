import express from 'express'
import { createOrder, exportOrders } from '../controllers/orderController.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createOrder)
router.get('/export', verifyAdmin, exportOrders)

export default router
