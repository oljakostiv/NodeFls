const { userService } = require('../services');
const ErrorHandler = require('../errors/errorHandler');
const {
    errMsg,
    statusCode
} = require('../config');
const { UserModel } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUniqueName: async (req, res, next) => {
        try {
            const { name } = req.body;

            const userByName = await UserModel.findOne({ name });

            if (userByName) {
                throw new ErrorHandler(statusCode.CONFLICT, errMsg.NAME_EXIST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const currentUser = await userService.getById(user_id);

            if (!currentUser) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.currentUser = currentUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserParams: (req, res, next) => {
        try {
            const { error } = userValidator.paramsUserValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, errMsg.ID_WRONG);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserQuery: (req, res, next) => {
        try {
            const { error } = userValidator.queryUserValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, errMsg.QUERY_ERROR);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
