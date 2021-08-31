const ErrorHandler = require('../errors/ErrorHandler');
const {
    errMsg,
    statusCode
} = require('../config');
const { UserModel } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUserRoleMiddle: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.currentUser;

            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(statusCode.FORBIDDEN, errMsg.FORBIDDEN);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

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

    getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const dynamicValue = req[searchIn][paramName];

            const user = await UserModel.findOne({ [dbFiled]: dynamicValue });

            if (!user) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.currentUser = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    getUsersByDynamicParam: (paramName, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = userValidator[paramName].validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, errMsg.NOT_VALID);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
