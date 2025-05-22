import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProducts } from '../services/productService'

const LandingPage = () => {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(12)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 giờ

  useEffect(() => {
    const load = async () => {
      const res = await fetchAllProducts()
      const all = res.data || []
      setProducts(all)
      setFiltered(all)

      const unique = [
        'Tất cả',
        ...Array.from(new Set(all.map((p) => p.category || 'Chưa rõ'))),
      ]
      setCategories(unique)
    }
    load()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const filteredByCategory =
      category === 'Tất cả'
        ? products
        : products.filter((p) => (p.category || 'Chưa rõ') === category)
    const filteredBySearch = filteredByCategory.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFiltered(filteredBySearch)
    setCurrentPage(1)
  }

  const handleSearch = (e) => {
    const keyword = e.target.value
    setSearchTerm(keyword)
    const filteredByCategory =
      selectedCategory === 'Tất cả'
        ? products
        : products.filter((p) => (p.category || 'Chưa rõ') === selectedCategory)
    const filteredBySearch = filteredByCategory.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    )
    setFiltered(filteredBySearch)
    setCurrentPage(1)
  }

  const indexOfLast = currentPage * perPage
  const indexOfFirst = indexOfLast - perPage
  const currentItems = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">🔥 Sản phẩm HOT - Flash Sale</h4>
        <span className="badge bg-danger text-white p-2 rounded-pill">
          ⏳ Kết thúc sau: {formatTime(timeLeft)}
        </span>
      </div>

      <div className="mb-3 d-flex align-items-center gap-2 flex-wrap">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="btn-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${
                selectedCategory === cat ? 'btn-dark' : 'btn-outline-secondary'
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3">
        {currentItems.map((p) => {
          const hasSale = p.original_price && p.original_price > p.price
          const discount = hasSale
            ? Math.round(
                ((p.original_price - p.price) / p.original_price) * 100
              )
            : 0

          return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={p.id}>
              <div className="border rounded-2 bg-white shadow-sm position-relative product-card h-100">
                <div className="position-relative overflow-hidden">
                  <img
                    src={import.meta.env.VITE_API_URL + p.image_url}
                    alt={p.name}
                    className="w-100"
                    style={{
                      height: '190px',
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>

                <div
                  className="p-2 d-flex flex-column"
                  style={{ fontSize: '0.9rem' }}
                >
                  <div
                    className="fw-semibold lh-sm text-dark text-truncate"
                    style={{
                      WebkitLineClamp: 2,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {p.name}
                  </div>

                  <div className="mt-1">
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: '1rem' }}
                    >
                      {Number(p.price).toLocaleString()}₫
                    </span>{' '}
                    {hasSale && (
                      <span
                        className="text-muted ms-2"
                        style={{
                          textDecoration: 'line-through',
                          fontSize: '0.75rem',
                        }}
                      >
                        {Number(p.original_price).toLocaleString()}₫
                      </span>
                    )}
                  </div>

                  {hasSale && (
                    <div
                      className="text-success fw-semibold"
                      style={{ fontSize: '0.75rem' }}
                    >
                      ↓ Giảm {discount}%
                    </div>
                  )}

                  <Link
                    to={`/product/${p.id}`}
                    className="btn btn-sm fw-bold mt-auto"
                    style={{ backgroundColor: '#f53d2d', color: '#fff' }}
                  >
                    Xem chi tiết
                  </Link>
                </div>

                {hasSale && (
                  <span
                    className="position-absolute top-0 start-0 badge rounded-0 text-white px-2 py-1"
                    style={{
                      backgroundColor: '#f53d2d',
                      fontSize: '0.7rem',
                      borderTopLeftRadius: 8,
                    }}
                  >
                    FLASH SALE
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default LandingPage
