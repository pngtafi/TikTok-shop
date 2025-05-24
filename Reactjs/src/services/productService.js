import axios from '../utils/axios'

export const fetchAllProducts = () => {
  return axios.get('/api/products')
}

export const createProduct = (productData) => {
  return axios.post('/api/products', productData)
}

export const updateProduct = (id, productData) => {
  return axios.put(`/api/products/${id}`, productData)
}

export const deleteProduct = (id) => {
  return axios.delete(`/api/products/${id}`)
}

export const fetchProductById = (id) => {
  return axios.get(`/api/products/${id}`)
}

export const uploadImages = (formData) => {
  return axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
