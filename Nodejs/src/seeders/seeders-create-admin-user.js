import bcrypt from 'bcryptjs'

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash('taiyeuhien', 10)

  return queryInterface.bulkInsert('Users', [
    {
      email: 'phungtai99zz@gmail.com',
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
