import { Sequelize } from "sequelize";
import Property from "./property.mjs";
import sequelize from "../database/sequelize.mjs";

const models = {
    Property: Property(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});

export default models;
