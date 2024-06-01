import Sequelize from "sequelize";
import models from "../models";
const { Property } = models;

/**
 * Retrieves properties based on the provided query parameters.
 * @param {Object} query - The query parameters for filtering properties.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the retrieved properties.
 */
export async function getProperties(query) {
    const forSale = query.forSale === "true";
    const forRent = query.forRent === "true";
    const minPrice = Number(query.minPrice) || null;
    const maxPrice = Number(query.maxPrice) || null;
    const minBedrooms = Number(query.minBedrooms) || null;
    const maxBedrooms = Number(query.maxBedrooms) || null;
    const area = query.area || null;

    const where = {};
    if (forSale) {
        where.forSale = true;
    }

    if (forRent) {
        where.forRent = true;
    }

    if (minPrice !== null) {
        where.price = {
            [Sequelize.Op.gte]: minPrice,
        };
    }

    if (maxPrice !== null) {
        where.price = {
            ...where.price,
            [Sequelize.Op.lte]: maxPrice,
        };
    }

    if (minBedrooms !== null) {
        where.bedroomCount = {
            [Sequelize.Op.gte]: minBedrooms,
        };
    }

    if (maxBedrooms !== null) {
        where.bedroomCount = {
            ...where.bedroomCount,
            [Sequelize.Op.lte]: maxBedrooms,
        };
    }

    if (area) {
        where.area = area;
    }

    const limit = 9; // number of records per page
    const page = query.page ? Number(query.page) : 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await Property.findAndCountAll({ where, limit, offset });

    return {
        data: JSON.parse(JSON.stringify(rows)),
        pages: Math.ceil(count / limit),
        total: count,
    }
}

/**
 * Retrieves unique areas from the properties.
 * @returns {Promise<string[]>} An array of unique areas.
 */
export async function getAreas() {
    const properties = await Property.findAll({
        attributes: ["area"],
        group: ["area"],
    });

    return properties.map((property) => property.area);
}
