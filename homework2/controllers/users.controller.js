const {
    userService,
    passwordService
} = require('../services');
const { statusCode } = require('../config');
const { userUtil } = require('../util');

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userService.deleteUser(user_id);

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const usersAll = await userService.findUser();

            res.json(usersAll);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userUtil.calibrationUser(req.currentUser);
            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    setUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const passwordHashed = await passwordService.hash(password);
            const usersSet = await userService.setUser({
                ...req.body,
                password: passwordHashed
            });

            const userToReturn = userUtil.calibrationUser(usersSet);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updateUser = await userService.updateUser(user_id, req.body);

            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    }
};
// work
