// utils/getFilteredProperties.js
import Sequelize from 'sequelize';
import models from '../models';
const { Property } = models;

export async function getProperties(query) {
  const forSale = query.forSale === "true";
  const forRent = query.forRent === "true";
  const minPrice = Number(query.minPrice) || null;
  const maxPrice = Number(query.maxPrice) || null;

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

  const properties = await Property.findAll({ where });
  
  return JSON.parse(JSON.stringify(properties));
}