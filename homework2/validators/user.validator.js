const Joi = require('joi');
const {
    constants,
    userGender
} = require('../config');

const authUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),
    password: Joi.string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

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

const paramsUserValidator = Joi.object({
    user_id: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
});

const queryUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim(),
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    gender: Joi.string()
        .allow(...Object.values(userGender))
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
    authUserValidator,
    createUserValidator,
    paramsUserValidator,
    queryUserValidator,
    updateUserValidator
};
