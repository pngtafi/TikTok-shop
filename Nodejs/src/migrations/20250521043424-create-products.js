export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    image_url: Sequelize.TEXT,
    price: Sequelize.DECIMAL(10, 2),
    tiktok_link: Sequelize.TEXT,
    category: Sequelize.STRING,
    original_price: Sequelize.DECIMAL,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Products')
}
