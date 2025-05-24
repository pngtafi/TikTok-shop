import { handleLogin } from '../services/userService.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const login = async (req, res) => {
  const { email, password } = req.body
  const result = await handleLogin(email, password)

  if (result.errCode === 0) {
    const userPayload = result.user

    const token = jwt.sign(userPayload, JWT_SECRET, {
      expiresIn: '3h',
    })

    return res.status(200).json({
      errCode: 0,
      message: result.message,
      user: userPayload,
      token,
    })
  }

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
