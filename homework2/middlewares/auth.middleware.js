const { authService } = require('../services');
const ErrorHandler = require('../errors/errorHandler');
const {
    errMsg,
    statusCode
} = require('../config');
const { userValidator } = require('../validators');

module.exports = {
    foundUser: async (req, res, next) => {
        try {
            const { name } = req.body;

            const authUser = await authService.findUserAuth({ name });

            if (!authUser) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.authUser = authUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.authUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
