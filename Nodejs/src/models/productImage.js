export default (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'ProductImages',
      timestamps: true,
    }
  )

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'CASCADE',
    })
  }

  return ProductImage
}
