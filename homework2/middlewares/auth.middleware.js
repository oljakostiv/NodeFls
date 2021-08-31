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
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.authUser = authUser;
            next();
        } catch (e) {
            next(e);
        }
    },
};
