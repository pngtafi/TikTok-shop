import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem('admin')

  // Nếu chưa login hoặc không có role admin → redirect
  if (!admin) {
    return <Navigate to="/admin/login" replace />
  }

  try {
    const parsed = JSON.parse(admin)
    if (parsed.role !== 'admin') {
      return <Navigate to="/admin/login" replace />
    }
  } catch (err) {
    console.log('Lỗi', err)
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
