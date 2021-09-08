const { v1 } = require('uuid');

const {
    actions: { ACTIVATE_ACCOUNT },
    emailActions,
    statusCode,
    variables: { NO_REPLY_EMAIL }
} = require('../config');
const {
    UserModel,
    ActionToken
} = require('../dataBase');
const {
    emailService,
    mainService: {
        deleteItem,
        findItem,
        setItem,
        updateItem
    },
    passwordService
} = require('../services');
const { userUtil } = require('../util');

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const { deleteByUser } = req;
            const { user_id } = req.params;
            const { name } = req.item;

            await deleteItem(UserModel, user_id);

            if (deleteByUser) {
                await emailService.sendMail(
                    NO_REPLY_EMAIL,
                    emailActions.DELETE_BY_USER,
                    { userName: name }
                );
            } else {
                await emailService.sendMail(
                    NO_REPLY_EMAIL,
                    emailActions.DELETE_BY_ADMIN,
                    { userName: name }
                );
            }

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const usersAll = await findItem(UserModel);

            const userToReturn = usersAll.map((user) => userUtil.calibrationUser(user));

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userUtil.calibrationUser(req.item);
            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    setUser: async (req, res, next) => {
        try {
            const {
                name,
                password
            } = req.body;

            const passwordHashed = await passwordService.hash(password);
            const token = v1();

            const usersSet = await setItem(UserModel, {
                ...req.body,
                password: passwordHashed
            });

            await ActionToken.create({
                action: ACTIVATE_ACCOUNT,
                token,
                user: usersSet._id
            });

            await emailService.sendMail(
                NO_REPLY_EMAIL,
                emailActions.WELCOME,
                {
                    userName: name,
                    password,
                    token
                }
            );

            const userToReturn = userUtil.calibrationUser(usersSet);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { name } = req.logUser;

            const updateUser = await updateItem(UserModel, user_id, req.body);

            await emailService.sendMail(
                NO_REPLY_EMAIL,
                emailActions.UPDATE_USER,
                { userName: name }
            );

            const userToReturn = userUtil.calibrationUser(updateUser);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(userToReturn);
        } catch (e) {
            next(e);
        }
    }
};
