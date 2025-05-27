import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { connectDB, sequelize } from './config/connectDB.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/products', productRoutes)
app.use('/api', authRoutes)

app.use('/uploads', express.static('uploads'))
app.use('/api/upload', uploadRoutes)

app.use('/api/orders', orderRoutes)

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Backend API is running...')
})

// Kết nối DB & Khởi động server
const startServer = async () => {
  await connectDB()

  try {
    await sequelize.sync()
    console.log('✅ Sequelize đã sync model với database')
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Lỗi sync DB:', error)
  }
}

startServer()
