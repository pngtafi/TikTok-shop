import db from '../models/index.js'
import bcrypt from 'bcryptjs'

const User = db.User

export const handleLogin = async (email, password) => {
  try {
    if (!email || !password) {
      return {
        errCode: 1,
        message: 'Email và mật khẩu là bắt buộc',
      }
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return {
        errCode: 2,
        message: 'Tài khoản không tồn tại',
      }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return {
        errCode: 3,
        message: 'Mật khẩu không đúng',
      }
    }

    return {
      errCode: 0,
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    }
  } catch (err) {
    return {
      errCode: -1,
      message: 'Lỗi server',
      error: err.message,
    }
  }
}
