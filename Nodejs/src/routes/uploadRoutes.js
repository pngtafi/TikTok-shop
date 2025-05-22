import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const name = Date.now() + ext
    cb(null, name)
  },
})

const upload = multer({ storage })

router.post('/', upload.array('images'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Không có ảnh nào được upload' })
  }

  const image_urls = req.files.map((file) => `/uploads/${file.filename}`)
  res.status(201).json({
    message: 'Upload thành công',
    image_urls,
  })
})

export default router
