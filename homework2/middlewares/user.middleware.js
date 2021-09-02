const ErrorHandler = require('../errors/ErrorHandler');
const {
    constants: { BODY },
    errMsg,
    statusCode
} = require('../config');
const { UserModel } = require('../dataBase');

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

    checkUserRoleMiddle: (roleArr = []) => (req, res, next) => {
        try {
            const {
                logUser,
                currentUser
            } = req;

            if (logUser._id.toString() === currentUser._id.toString()) {
                return next();
            }

            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(logUser.role)) {
                throw new ErrorHandler(statusCode.FORBIDDEN, errMsg.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = BODY, dbFiled = paramName) => async (req, res, next) => {
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

    isNotPresent: (req, res, next) => {
        try {
            const { logUser } = req;

            if (!logUser) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateMiddle: (req, res, next) => {
        try {
            const {
                logUser,
                currentUser
            } = req;

            if (logUser._id.toString() !== currentUser._id.toString()) {
                throw new ErrorHandler(statusCode.FORBIDDEN, errMsg.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
