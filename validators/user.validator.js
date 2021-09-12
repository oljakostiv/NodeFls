const Joi = require('joi');

const {
    constants,
    userRole
} = require('../config');

const emailSchema = Joi.string()
    .regex(constants.EMAIL_REGEXP)
    .trim();
const nameSchema = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required();
const passwordSchema = Joi.string()
    .regex(constants.PASSWORD_REGEXP)
    .required();
const roleSchema = Joi.string()
    .allow(...Object.values(userRole));

const authUserValidator = Joi.object({
    name: nameSchema,
    password: passwordSchema
});

const createUserValidator = Joi.object({
    name: nameSchema,
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    role: roleSchema,
    email: emailSchema,
    password: passwordSchema
});

const paramsUserValidator = Joi.object({
    user_id: Joi.string()
        .regex(constants.ID_REGEXP)
        .trim()
});

const passwordValidator = Joi.object({
    password: passwordSchema
});

const emailValidator = Joi.object({
    email: emailSchema,
});

const passwordResetValidator = Joi.object({
    oldPassword: passwordSchema,
    password: passwordSchema,
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
    role: roleSchema,
});

const updateUserValidator = Joi.object({
    name: nameSchema,
    born_year: Joi.number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 5),
    role: roleSchema,
    email: emailSchema,
    password: passwordSchema
});

module.exports = {
    authUserValidator,
    createUserValidator,
    paramsUserValidator,
    passwordValidator,
    emailValidator,
    passwordResetValidator,
    queryUserValidator,
    updateUserValidator
};
