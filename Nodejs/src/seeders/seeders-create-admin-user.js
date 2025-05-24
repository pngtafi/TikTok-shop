import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export async function up(queryInterface, Sequelize) {
  const plainPassword = process.env.ADMIN_PASSWORD
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  return queryInterface.bulkInsert('Users', [
    {
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users', {
    email: 'phungtai99zz@gmail.com',
  })
}
