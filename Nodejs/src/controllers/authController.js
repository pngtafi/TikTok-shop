import { handleLogin } from '../services/userService.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  const result = await handleLogin(email, password)

  const statusCode =
    result.errCode === 0
      ? 200
      : result.errCode === 1
      ? 400
      : result.errCode === 2 || result.errCode === 3
      ? 401
      : 500

  return res.status(statusCode).json(result)
}
