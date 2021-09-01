const { authService } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const {
    errMsg,
    statusCode
} = require('../config');

module.exports = {
    foundUser: async (req, res, next) => {
        try {
            const { name } = req.body;

            const authUser = await authService.findUserAuth({ name });

            if (!authUser) {
                return next(ErrorHandler(statusCode.NOT_FOUND, errMsg.EMAIL_PASSWORD_WRONG));
            }

            req.authUser = authUser;

            next();
        } catch (e) {
            next(e);
        }
    },
};
