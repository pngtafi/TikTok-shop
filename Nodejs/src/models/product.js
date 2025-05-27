export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      original_price: DataTypes.DECIMAL,
      image_url: DataTypes.TEXT,
      category: DataTypes.STRING,
      variants: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      reviews: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'Products',
      timestamps: true,
    }
  )

  return Product
}
