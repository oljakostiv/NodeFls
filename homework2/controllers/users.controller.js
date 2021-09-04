const { statusCode } = require('../config');
const { UserModel } = require('../dataBase');
const {
    // userService,
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
            const { user_id } = req.params;
            await deleteItem(UserModel, user_id);

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const usersAll = await findItem(UserModel, req.query);

            const userToReturn = usersAll.map((user) => userUtil.calibrationUser(user));

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const { item: user } = req.body;

            // const userToReturn = userUtil.calibrationUser(user);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    setUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const passwordHashed = await passwordService.hash(password);

            const usersSet = await setItem(UserModel, {
                ...req.body,
                password: passwordHashed
            });

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
            const updateUser = await updateItem(UserModel, user_id, req.body);

            const userToReturn = userUtil.calibrationUser(updateUser);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(userToReturn);
        } catch (e) {
            next(e);
        }
    }
};
