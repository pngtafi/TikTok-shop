// models/review.js
export default (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.JSON,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      variant: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'reviews',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  return Review
}
