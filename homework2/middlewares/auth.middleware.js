const {
    constants: { AUTHORIZATION, REFRESH, USER },
    errMsg,
    statusCode
} = require('../config');
const { OAuthModel, UserModel } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { jwtService: { verifyToken } } = require('../services');

module.exports = {
    foundUser: async (req, res, next) => {
        try {
            const { name } = req.body;

            const authUser = await UserModel.findOne({ name });

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
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.NO_TOKEN);
            }

            await verifyToken(access_token);

            const tokenFromDB = await OAuthModel.findOne({ access_token })
                .populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.INVALID_TOKEN);
            }

            req.logUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.NO_TOKEN);
            }

            await verifyToken(refresh_token, REFRESH);

            const tokenFromDB = await OAuthModel.findOne({ refresh_token })
                .populate(USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.INVALID_TOKEN);
            }

            req.logUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
