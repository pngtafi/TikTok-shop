import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.data?.message) {
      return Promise.reject(error.response.data.message)
    }
    return Promise.reject('Lỗi không xác định từ server.')
  }
)

export default instance
