"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Generate 100 unique cities
        const citiesSet = new Set();
        while(citiesSet.size < 100) {
            citiesSet.add(faker.location.city());
        }

        const cities = Array.from(citiesSet);

        const fakeProperties = Array.from({ length: 10000 }).map(() => ({
            projectName: faker.company.name(),
            shortTitle: faker.lorem.words(3),
            price: faker.commerce.price(),
            bedroomCount: faker.number.int({ min: 1, max: 5 }),
            area: cities[Math.floor(Math.random() * cities.length)],
            shortDescription: faker.lorem.sentences(3),
            imageGallery: JSON.stringify([
                faker.image.urlLoremFlickr(),
                faker.image.urlLoremFlickr(),
                faker.image.urlLoremFlickr(),
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
