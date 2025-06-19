// controllers/reviewController.js
import {
  importReviews,
  getReviewsByProduct,
} from '../services/reviewService.js'

export const createReview = async (req, res) => {
  try {
    const reviews = req.body
    if (!Array.isArray(reviews)) {
      return res
        .status(400)
        .json({ success: false, message: 'Dữ liệu không hợp lệ' })
    }

    const count = await importReviews(reviews)
    return res.json({
      success: true,
      message: 'Import đánh giá thành công',
      count,
    })
  } catch (err) {
    console.error('Import reviews failed:', err)
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi import đánh giá',
      error: err.message,
    })
  }
}

export const getAllReview = async (req, res) => {
  try {
    const productId = req.query.product_id
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: 'Thiếu product_id' })
    }

    const reviews = await getReviewsByProduct(productId)
    return res.json({ success: true, data: reviews })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đánh giá',
      error: err.message,
    })
  }
}
