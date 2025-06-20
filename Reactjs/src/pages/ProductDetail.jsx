import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductImages from '../components/ProductImages'
import ProductInfo from '../components/ProductInfo'
import ProductReviews from '../components/ProductReviews'
import ProductDescription from '../components/ProductDescription'
import BottomBar from '../components/BottomBar'
import { fetchProductById } from '../services/productService'

function ProductDetail() {
  const { id } = useParams() // Lấy product ID từ URL
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProductById(id)
        setProduct(res.data)
        setSelectedImage(res.data.image_url?.[0] || null)
        if (typeof ttq !== 'undefined' && res.data) {
          ttq.track('ViewContent', {
            contents: [
              {
                content_id: res.data.id,
                content_type: 'product',
                content_name: res.data.name,
              },
            ],
            value: res.data.price,
            currency: 'VND',
          })
        }
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // Hiển thị "Đang tải..." khi dữ liệu chưa có
  if (loading) {
    return <div className="text-center my-5">Đang tải…</div>
  }

  // Nếu đã tải xong nhưng không có sản phẩm (ví dụ ID không tồn tại)
  if (!product) {
    return <div className="text-center my-5">Không tìm thấy sản phẩm.</div>
  }

  // Tách dữ liệu từ product để truyền vào các component con
  const {
    name,
    description,
    price,
    original_price,
    image_url,
    category,
    sold,
    // variants,
    reviews,
    policy,
  } = product

  return (
    <div className="product-detail">
      {/* Hình ảnh sản phẩm */}
      <ProductImages images={image_url} onSelect={setSelectedImage} />

      {/* Thông tin + biến thể */}
      <ProductInfo
        name={name}
        price={selectedImage?.price || price}
        original_price={selectedImage?.original_price || original_price}
        category={category}
        sold={sold}
      />
      {/* <ProductVariants variants={variants} /> */}

      {/* Đánh giá */}
      <ProductReviews reviews={reviews} />

      {/* Mô tả sản phẩm */}
      <ProductDescription description={description} policy={policy} />

      {/* Thanh cố định dưới cùng */}
      <BottomBar product={product} selectedImage={selectedImage} />
    </div>
  )
}

export default ProductDetail
