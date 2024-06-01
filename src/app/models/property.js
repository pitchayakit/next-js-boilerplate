import { DataTypes } from 'sequelize';

const Property = (sequelize) => {
  const Property = sequelize.define(
    'Property',
    {
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      bedroomCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageGallery: {
        type: DataTypes.JSON, // Assuming you'll store image URLs in a JSON array
        allowNull: true,
      },
      forSale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      forRent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'Properties',
      underscored: false,
      timestamps: true,
    }
  );

  return Property;
};

export default Property;