import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/authService'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await loginAdmin(email, password)

      if (res.errCode !== 0) {
        return setError(res.message || 'Đăng nhập thất bại')
      }

      const user = res.user || {}
      const token = res.token || ''

      if (user.role !== 'admin') {
        return setError('Tài khoản không có quyền truy cập')
      }

      localStorage.setItem('admin', JSON.stringify(user))
      localStorage.setItem('adminToken', token)

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="bg-white p-4 rounded shadow"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h3 className="text-center mb-4">Đăng nhập Admin</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
