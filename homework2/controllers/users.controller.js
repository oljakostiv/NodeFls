const { userService } = require('../services');

module.exports = {
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
    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userService.deleteUser(user_id);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
