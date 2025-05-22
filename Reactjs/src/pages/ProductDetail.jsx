import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchProductById,
  fetchProductImages,
} from '../services/productService'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState('')
  const [subImages, setSubImages] = useState([])

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProductById(id)
        const data = res.data
        setProduct(data)
        setMainImage(data.image_url || '')
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err)
      }
    }

    const loadSubImages = async () => {
      try {
        const res = await fetchProductImages(id)
        console.log('📷 Ảnh phụ:', res)
        setSubImages(res.data || [])
      } catch (err) {
        console.error('Lỗi khi tải ảnh phụ:', err)
      }
    }

    loadProduct()
    loadSubImages()
  }, [id])

  if (!product) return <p>Đang tải sản phẩm...</p>

  // Gộp ảnh chính và phụ
  const allImages = [
    product.image_url,
    ...subImages.map((img) => img.image_url),
  ]

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hình ảnh lớn */}
        <div className="col-md-5">
          <div className="border rounded mb-3">
            <img
              src={import.meta.env.VITE_API_URL + mainImage}
              alt={product.name}
              className="w-100"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>

          {/* Ảnh phụ giống Shopee */}
          <div className="d-flex gap-2 overflow-auto">
            {allImages.map((img, i) => {
              const fullUrl = import.meta.env.VITE_API_URL + img
              return (
                <img
                  key={i}
                  src={fullUrl}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className="img-thumbnail"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    border:
                      mainImage === img ? '2px solid red' : '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-7">
          <h3>{product.name}</h3>
          <h4 className="text-danger">
            {Number(product.price).toLocaleString()}₫
          </h4>
          <p>
            <strong>Danh mục:</strong> {product.category}
          </p>
          <p>
            <strong>Link TikTok:</strong>{' '}
            <a
              href={product.tiktok_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.tiktok_link}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
