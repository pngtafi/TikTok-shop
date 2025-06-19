import axios from '../utils/axios'

export const importReviews = async (reviews) => {
  const res = await axios.post('api/reviews/import', reviews)
  return res.data
}

// Lấy tất cả đánh giá theo product_id
export const getReviewsByProduct = async (productId) => {
  const res = await axios.get(`api/reviews`, {
    params: { product_id: productId },
  })
  return res.data
}
