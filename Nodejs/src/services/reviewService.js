import db from '../models/index.js'
const Review = db.Review

export const importReviews = async (reviews) => {
  // Dùng bulkCreate để tối ưu tốc độ import
  const payload = reviews.map((rev) => ({
    product_id: rev.product_id,
    user: rev.user,
    icon: rev.icon || null,
    images: rev.images || [],
    rating: rev.rating,
    content: rev.content || '',
    variant: rev.variant || '',
  }))

  await Review.bulkCreate(payload)
  return payload.length
}

export const getReviewsByProduct = async (productId) => {
  return await Review.findAll({
    where: { product_id: productId },
    order: [['created_at', 'DESC']],
  })
}
