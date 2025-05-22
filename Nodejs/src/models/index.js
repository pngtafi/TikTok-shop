import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const env = process.env.NODE_ENV || 'development'
const configModule = await import(
  pathToFileURL(path.resolve(__dirname, '../config/config.js'))
)
const config = configModule.default[env]

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

// Đọc và import tất cả model *.js
const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === '.js' &&
    !file.endsWith('.test.js')
  )
})

for (const file of files) {
  const fullPath = path.join(__dirname, file)
  const moduleUrl = pathToFileURL(fullPath).href
  const modelModule = await import(moduleUrl)

  const model = modelModule.default(sequelize, Sequelize.DataTypes)
  db[model.name] = model
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
