import axios from '../utils/axios'

export const createOrder = async (orderData) => {
  return axios.post('/api/orders', orderData)
}

export const exportOrders = async (startDate, endDate) => {
  try {
    const token = localStorage.getItem('adminToken')
    const response = await axios.get('/api/orders/export', {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })
    return response
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
