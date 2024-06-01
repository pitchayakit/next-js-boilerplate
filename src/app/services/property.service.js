// utils/getFilteredProperties.js
import Sequelize from "sequelize";
import models from "../models";
const { Property } = models;

export async function getProperties(query) {
    const forSale = query.forSale === "true";
    const forRent = query.forRent === "true";
    const minPrice = Number(query.minPrice) || null;
    const maxPrice = Number(query.maxPrice) || null;
    const minBedrooms = Number(query.minBedrooms) || null;
    const maxBedrooms = Number(query.maxBedrooms) || null;

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

    const limit = 10; // number of records per page
    const page = query.page ? Number(query.page) : 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await Property.findAndCountAll({ where, limit, offset });

    return {
        data: JSON.parse(JSON.stringify(rows)),
        pages: Math.ceil(count / limit),
        total: count,
    }
}
