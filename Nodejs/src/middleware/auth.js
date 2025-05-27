import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Token không được cung cấp' })
  }
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Forbidden: Chỉ admin mới được phép' })
    }

    req.user = decoded

    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Token không hợp lệ hoặc đã hết hạn' })
  }
}
