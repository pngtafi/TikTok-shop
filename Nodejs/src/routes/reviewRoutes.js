import express from 'express'
import { createReview, getAllReview } from '../controllers/reviewController.js'

const router = express.Router()

router.post('/import', createReview)
router.get('/', getAllReview)

export default router
