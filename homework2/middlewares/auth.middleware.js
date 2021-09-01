const { OAuthModel } = require('../dataBase');
const {
    constants: { AUTHORIZATION },
    errMsg,
    statusCode
} = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');
const { authService } = require('../services');
const { jwtService: { verifyToken } } = require('../services');

module.exports = {
    foundUser: async (req, res, next) => {
        try {
            const { name } = req.body;

            const authUser = await authService.findUserAuth({ name });

            if (!authUser) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.EMAIL_PASSWORD_WRONG);
            }

            req.authUser = authUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateAccessToken: async (req, res, next) => {
        try {
            const isToken = req.get(AUTHORIZATION);

            if (!isToken) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.NO_TOKEN);
            }

            await verifyToken(isToken);

            const tokenfromDB = await OAuthModel.findOne({ access_token: isToken })
                .populate('user');

            console.log(tokenfromDB);

            if (!tokenfromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.INVALID_TOKEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const isToken = req.get(AUTHORIZATION);

            if (!isToken) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.NO_TOKEN);
            }

            await verifyToken(isToken, 'refresh');

            const tokenfromDB = await OAuthModel.findOne({ refresh_token: isToken })
                .populate('user');

            console.log(tokenfromDB);

            if (!tokenfromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.INVALID_TOKEN);
            }

            req.logUser = tokenfromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
