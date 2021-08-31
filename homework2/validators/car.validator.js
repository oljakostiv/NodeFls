const Joi = require('joi');

const {
    constants,
    carType
} = require('../config');

const createCarValidator = Joi.object({
    model: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    type: Joi.string()
        .allow(...Object.values(carType)),
    year: Joi.number()
        .min(constants.CURRENT_YEAR - 20)
        .max(constants.CURRENT_YEAR)
        .required(),
    price: Joi.number()
        .min(888)
        .max(888888)
        .required()
});

const paramsCarValidator = Joi.object({
    car_id: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
});

const queryCarValidator = Joi.object({
    model: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    year: Joi.number()
        .min(constants.CURRENT_YEAR - 20)
        .max(constants.CURRENT_YEAR),
    price: Joi.number()
        .min(888)
        .max(888888)
});

const updateCarValidator = Joi.object({
    model: Joi.string()
        .alphanum()
        .min(2)
        .max(30),
    type: Joi.string()
        .allow(...Object.values(carType)),
    year: Joi.number()
        .min(constants.CURRENT_YEAR - 20)
        .max(constants.CURRENT_YEAR),
    price: Joi.number()
        .min(888)
        .max(888888)
});

module.exports = {
    createCarValidator,
    paramsCarValidator,
    queryCarValidator,
    updateCarValidator
};
