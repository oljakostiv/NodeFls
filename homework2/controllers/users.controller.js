const { userService } = require('../services');
const { statusCode } = require('../config');

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
            res.json(req.currentUser);
        } catch (e) {
            next(e);
        }
    },

    setUser: async (req, res, next) => {
        try {
            const usersSet = await userService.setUser(req.body);

            res.json(usersSet);
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
