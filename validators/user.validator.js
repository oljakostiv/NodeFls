const Joi = require('joi');

const {
    constants,
    userRole
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
    role: Joi.string()
        .allow(...Object.values(userRole)),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP)
        .trim(),
    password: Joi.string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

const paramsUserValidator = Joi.object({
    user_id: Joi.string()
        .regex(constants.ID_REGEXP)
        .trim()
});

const password = Joi.object({
    password: Joi.string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
});

const email = Joi.object({
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP)
        .required(),
});

// const passReset = Joi.object({
//     oldPassword: Joi.string()
//         .regex(constants.PASSWORD_REGEXP)
//         .required(),
//     password: Joi.string()
//         .regex(constants.PASSWORD_REGEXP)
//         .required(),
// });

const queryUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim(),
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    role: Joi.string()
        .allow(...Object.values(userRole))
});

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    role: Joi.string()
        .allow(...Object.values(userRole)),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP),
    password: Joi.string()
        .regex(constants.PASSWORD_REGEXP)
});

module.exports = {
    authUserValidator,
    createUserValidator,
    paramsUserValidator,
    password,
    email,
    // passReset,
    queryUserValidator,
    updateUserValidator
};
