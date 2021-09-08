const { v1 } = require('uuid');

const {
    actions: { ACTIVATE_ACCOUNT },
    constants: { QUERY_TOKEN },
    emailActions,
    statusCode,
    variables: {
        ACTIVATE_URL
    }
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
            const {
                deleteByUser,
                item: {
                    name,
                    email
                },
                params: { user_id }
            } = req;

            await deleteItem(UserModel, user_id);

            if (deleteByUser) {
                await emailService.sendMail(
                    email,
                    emailActions.DELETE_BY_USER,
                    { userName: name }
                );
            } else {
                await emailService.sendMail(
                    email,
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
                usersSet.email,
                emailActions.WELCOME,
                {
                    userName: name,
                    activateURL: `${ACTIVATE_URL}${QUERY_TOKEN}${token}`
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
                updateUser.email,
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
