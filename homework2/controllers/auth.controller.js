const {
    constants: { AUTHORIZATION },
    emailActions,
    statusCode,
    variables: { NO_REPLY_EMAIL }
} = require('../config');
const { OAuthModel } = require('../dataBase');
const {
    emailService,
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

            await emailService.sendMail(
                NO_REPLY_EMAIL,
                emailActions.WELCOME,
                { userName: body.name }
            );

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
            const access_token = req.get(AUTHORIZATION);
            await OAuthModel.deleteOne({ access_token });

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const user = req.logUser;

            const tokenPair = jwtService.giveTokenPair();

            await OAuthModel.updateOne({ refresh_token }, tokenPair);

            res.json({
                ...tokenPair,
                user: calibrationUser(user)
            });
        } catch (e) {
            next(e);
        }
    },
};
