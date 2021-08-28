const Joi = require('joi');
const {
    constants,
    userGender
} = require('../config');

const createUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    gender: Joi.string()
        .allow(...Object.values(userGender)),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP)
        .trim(),
    password: Joi.string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    gender: Joi.string()
        .allow(...Object.values(userGender)),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP),
});

module.exports = {
    createUserValidator,
    updateUserValidator
};
