import React, { useEffect, useState } from 'react'
import {
  fetchAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
  uploadProductImages,
} from '../services/productService'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    price: '',
    tiktok_link: '',
    category: '',
    image_url: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [allFiles, setAllFiles] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetchAllProducts()
      setProducts(res.data)
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err)
      setError('Không tải được danh sách sản phẩm')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
      await deleteProduct(id)
      loadProducts()
    }
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      tiktok_link: product.tiktok_link,
      category: product.category || '',
    })
    setEditingId(product.id)
  }

  const handleCancelEdit = () => {
    setForm({
      name: '',
      price: '',
      tiktok_link: '',
      category: '',
      image_url: '',
    })
    setEditingId(null)
    setAllFiles([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.price || !form.tiktok_link || !form.category) {
      setError('Vui lòng điền đầy đủ thông tin!')
      return
    }

    try {
      let uploadedUrls = []

      if (allFiles.length > 0) {
        const formData = new FormData()
        allFiles.forEach((file) => formData.append('images', file))
        const res = await uploadImages(formData)
        uploadedUrls = res.image_urls || []
      }

      const payload = {
        ...form,
        price: Number(form.price), // ép kiểu
        image_url: uploadedUrls[0] || '',
      }

      let createdProduct
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        const res = await createProduct(payload)
        createdProduct = res.data

        if (allFiles.length > 1 && createdProduct?.id) {
          const imageFormData = new FormData()
          allFiles.slice(1).forEach((file) => {
            imageFormData.append('images', file)
          })

          await uploadProductImages(createdProduct.id, imageFormData)
        }
      }

      setForm({
        name: '',
        price: '',
        tiktok_link: '',
        category: '',
        image_url: '',
      })
      setAllFiles([])
      setEditingId(null)
      loadProducts()
    } catch (err) {
      console.error('Lỗi khi lưu sản phẩm:', err)
      setError('Không thể lưu sản phẩm')
    }
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Quản lý Sản phẩm</h3>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={(e) => setAllFiles(Array.from(e.target.files))}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Tên sản phẩm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Giá"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Link TikTok"
              value={form.tiktok_link}
              onChange={(e) =>
                setForm({ ...form, tiktok_link: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Danh mục"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="col-md-1 d-flex">
            <button type="submit" className="btn btn-success w-100">
              {editingId ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </div>
        {editingId && (
          <div className="mt-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleCancelEdit}
            >
              Huỷ sửa
            </button>
          </div>
        )}
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Link TikTok</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={import.meta.env.VITE_API_URL + p.image_url}
                  alt={p.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              </td>
              <td>{p.name}</td>
              <td>{Number(p.price).toLocaleString()}₫</td>
              <td>
                <a
                  href={p.tiktok_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem
                </a>
              </td>
              <td>{p.category}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(p)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  )
}

export default AdminDashboard
