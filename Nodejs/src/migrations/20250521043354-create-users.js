export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'admin',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users')
}
