export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_url: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      tiktok_link: DataTypes.TEXT,
      category: DataTypes.STRING,
      original_price: DataTypes.DECIMAL,
    },
    {
      tableName: 'Products',
      timestamps: true,
    }
  )

  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'images',
    })
  }

  return Product
}
