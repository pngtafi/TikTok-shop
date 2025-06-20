import axios from '../utils/axios'

export const importReviews = (reviews) => {
  return axios.post('api/reviews/import', reviews)
}

// Lấy tất cả đánh giá theo product_id
export const getReviewsByProduct = async (productId) => {
  return axios.get('api/reviews', {
    params: { product_id: productId },
  })
}
