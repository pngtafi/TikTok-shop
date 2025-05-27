import React, { useState, useEffect } from 'react'
import {
  fetchAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
} from '../services/productService'
import { exportOrders } from '../services/orderService'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: '',
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    loadProducts()

    const now = new Date()
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59
    )
    const yesterdayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      0,
      0
    )

    setStartDate(yesterdayStart.toISOString().slice(0, 16))
    setEndDate(todayEnd.toISOString().slice(0, 16))
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetchAllProducts()
      const parsed = res.data.map((p) => ({
        ...p,
        image_url: Array.isArray(p.image_url)
          ? p.image_url
          : JSON.parse(p.image_url || '[]'),
      }))
      setProducts(parsed)
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err)
      setError('Không tải được danh sách sản phẩm')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files)
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      original_price: product.original_price,
      category: product.category || '',
    })
    setEditingId(product.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
      await deleteProduct(id)
      loadProducts()
    }
  }

  const handleCancelEdit = () => {
    setForm({
      name: '',
      description: '',
      price: '',
      original_price: '',
      category: '',
    })
    setSelectedFiles([])
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      let imageUrls = []

      if (selectedFiles.length > 0) {
        const formData = new FormData()
        for (let file of selectedFiles) {
          formData.append('images', file)
        }

        const res = await uploadImages(formData)

        imageUrls = Array.isArray(res.image_urls)
          ? res.image_urls.map((url) =>
              url.startsWith('/uploads')
                ? `${import.meta.env.VITE_API_URL}${url}`
                : url
            )
          : []
      }

      const payload = {
        ...form,
        price: Number(form.price),
        original_price: Number(form.original_price),
        ...(imageUrls.length > 0 && { image_url: imageUrls }),
      }

      if (editingId) {
        await updateProduct(editingId, payload)
        setMessage('✅ Cập nhật sản phẩm thành công!')
      } else {
        await createProduct(payload)
        setMessage('✅ Thêm sản phẩm thành công!')
      }

      await loadProducts()

      // Reset form
      setForm({
        name: '',
        description: '',
        price: '',
        original_price: '',
        category: '',
      })
      setSelectedFiles([])
      setEditingId(null)
    } catch (err) {
      setMessage(`❌ Lỗi: ${err}`)
    }
  }

  const handleExport = async () => {
    setMessage('')
    setError('')

    try {
      const res = await exportOrders(
        new Date(startDate).toISOString(),
        new Date(endDate).toISOString()
      )

      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'orders-export.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Lỗi export:', err)
      setError('❌ Lỗi xuất đơn hàng: ' + err.message)
    }
  }

  return (
    <div className="container mt-4">
      <h3>🛠 {editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h3>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mô tả</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Giá</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Giá gốc</label>
          <input
            type="number"
            name="original_price"
            className="form-control"
            value={form.original_price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Danh mục</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Ảnh sản phẩm (chọn nhiều)</label>
          <input
            type="file"
            multiple
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editingId ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={handleCancelEdit}
          >
            Huỷ chỉnh sửa
          </button>
        )}
      </form>

      <hr />
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Từ thời gian:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Đến thời gian:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-5 mb-2">
        <h4>📦 Danh sách sản phẩm</h4>
        <button className="btn btn-success" onClick={handleExport}>
          ⬇️ Export Đơn Hàng (Excel)
        </button>
      </div>

      <table className="table table-bordered table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {p.image_url?.length > 0 ? (
                  p.image_url.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${p.name}-${index}`}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        marginRight: '4px',
                      }}
                    />
                  ))
                ) : (
                  <span>Không có ảnh</span>
                )}
              </td>
              <td>{p.name}</td>
              <td>{Number(p.price).toLocaleString()}₫</td>
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
