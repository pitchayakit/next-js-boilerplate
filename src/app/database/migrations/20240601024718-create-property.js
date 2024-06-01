module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Properties", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            projectName: {
                type: Sequelize.STRING,
            },
            shortTitle: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            bedroomCount: {
                type: Sequelize.INTEGER,
            },
            area: {
                type: Sequelize.FLOAT,
            },
            shortDescription: {
                type: Sequelize.TEXT,
            },
            imageGallery: {
                type: Sequelize.JSON, // Assuming you'll store image URLs in a JSON array
            },
            forSale: {
                type: Sequelize.BOOLEAN,
            },
            forRent: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Properties");
    },
};
