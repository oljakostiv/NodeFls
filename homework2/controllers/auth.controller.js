const { constants: { AUTHORIZATION }, statusCode } = require('../config');
const { OAuthModel } = require('../dataBase');
const {
    jwtService,
    passwordService
} = require('../services');
const { userUtil: { calibrationUser } } = require('../util');

module.exports = {
    authPostUser: async (req, res, next) => {
        try {
            const {
                authUser,
                body
            } = req;

            await passwordService.compare(authUser.password, body.password);

            const tokenPair = jwtService.giveTokenPair();

            await OAuthModel.create({
                ...tokenPair,
                user: authUser._id
            });

            res.json({
                ...tokenPair,
                user: calibrationUser(authUser)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const isToken = req.get(AUTHORIZATION);
            await OAuthModel.deleteOne({ access_token: isToken });

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const isToken = req.get(AUTHORIZATION);
            const user = req.logUser;

            await OAuthModel.deleteOne({ refresh_token: isToken });

            const tokenPair = jwtService.giveTokenPair();

            await OAuthModel.create({
                ...tokenPair,
                user: user._id
            });

            res.json({
                ...tokenPair,
                user: calibrationUser(user)
            });
        } catch (e) {
            next(e);
        }
    },
};
