"use strict";
const { faker } = require("@faker-js/faker");
const _ = require("lodash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Generate 1,000,000 properties.
        const seedQty = 100000;
        const chunkSize = 50000;
        console.log(`Seeding ${seedQty} properties`);

        // Generate 100 unique cities
        const citiesSet = new Set();
        while (citiesSet.size < 100) {
            citiesSet.add(faker.location.city());
        }

        const cities = Array.from(citiesSet);

        const times = Math.ceil(seedQty / chunkSize);

        for (let i = 1; i <= times; i++) {
            let length = i === times ? seedQty % chunkSize : chunkSize;
  
            if(!length) {
                length = chunkSize;
            }

            const fakeProperties = Array.from({ length: length }).map(() => ({
                projectName: faker.company.name(),
                shortTitle: faker.lorem.words(3),
                price: faker.commerce.price({ min: 100000, max: 1000000 }),
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

            console.log(`Seeded ${i * chunkSize} properties`);
        }
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Properties", null, {});
    },
};
