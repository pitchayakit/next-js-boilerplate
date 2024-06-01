"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const fakeProperties = Array.from({ length: 50 }).map(() => ({
            projectName: faker.company.name(),
            shortTitle: faker.lorem.words(3),
            price: faker.commerce.price(),
            bedroomCount: faker.number.int({ min: 1, max: 5 }),
            area: faker.number.int({ min: 50, max: 500 }),
            shortDescription: faker.lorem.sentences(3),
            imageGallery: JSON.stringify([
                faker.image.urlLoremFlickr(),
                faker.image.urlLoremFlickr(),
            ]),
            forSale: faker.number.int({ min: 0, max: 1 }),
            forRent: faker.number.int({ min: 0, max: 1 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("Properties", fakeProperties, {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Properties", null, {});
    },
};
