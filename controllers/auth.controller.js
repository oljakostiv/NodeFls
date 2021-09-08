const {
    actions: { FORGOT_PASS },
    constants: {
        AUTHORIZATION,
        QUERY_TOKEN
    },
    emailActions,
    errMsg,
    statusCode,
    variables: {
        ACTIVATE_URL,
        FRONTEND_URL_TOKEN,
        NO_REPLY_EMAIL
    }
} = require('../config');
const {
    OAuthModel,
    ActionToken,
    UserModel
} = require('../dataBase');
const {
    emailService,
    jwtService,
    passwordService,
    jwtActionService
} = require('../services');
const { userUtil: { calibrationUser } } = require('../util');

module.exports = {
    activateAccount: async (req, res, next) => {
        try {
            const {
                logUser: { _id },
                query: { token }
            } = req;

            await ActionToken.deleteOne({ token });
            await UserModel.updateOne({ _id }, { isActivated: true });

            res.status(statusCode.CREATED_AND_UPDATE)
                .send(errMsg.USER_ACTIVE);
        } catch (e) {
            next(e);
        }
    },

    changePass: async (req, res, next) => {
        try {
            const { password } = req.body;
            const token = req.get(AUTHORIZATION);

            await ActionToken.deleteOne({ token });

            const passwordHashed = await passwordService.hash(password);
            //                                                       ?

            const updateUser = await UserModel.findByIdAndUpdate({ token }, { password: passwordHashed });

            const userToReturn = calibrationUser(updateUser);

            await OAuthModel.deleteMany({ user: updateUser._id });

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    authPostUser: async (req, res, next) => {
        try {
            const {
                authUser,
                body
            } = req;

            const token = req.get(AUTHORIZATION);

            await passwordService.compare(authUser.password, body.password);

            await emailService.sendMail(
                NO_REPLY_EMAIL,
                emailActions.AUTH,
                {
                    userName: body.name,
                    action: ACTIVATE_URL + QUERY_TOKEN + token
                }
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

    mailForUserPass: async (req, res, next) => {
        try {
            const {
                name,
                _id
            } = req.item;

            const token = await jwtActionService.giveActionToken();

            await ActionToken.create({
                token,
                action: FORGOT_PASS,
                user: _id
            });

            await emailService.sendMail(
                NO_REPLY_EMAIL,
                emailActions.FORGOT_PASS,
                {
                    userName: name,
                    accTokenURL: FRONTEND_URL_TOKEN + QUERY_TOKEN + token
                }
            );

            res.status(statusCode.CREATED_AND_UPDATE)
                .send(errMsg.CHECK_MAIL);
        } catch (e) {
            next(e);
        }
    }
};
