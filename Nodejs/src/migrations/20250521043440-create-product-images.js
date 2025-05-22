export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ProductImages', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('ProductImages')
}
