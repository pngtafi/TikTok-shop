import axios from '../utils/axios'

export const loginAdmin = async (email, password) => {
  return axios.post('/api/login', { email, password })
}
