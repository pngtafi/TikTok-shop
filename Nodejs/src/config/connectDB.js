import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
)

// Hàm kết nối
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Kết nối MySQL thành công với Sequelize!')
  } catch (error) {
    console.error('❌ Lỗi kết nối Sequelize:', error)
  }
}

export { connectDB, sequelize }
