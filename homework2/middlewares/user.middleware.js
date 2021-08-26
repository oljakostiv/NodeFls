const { userService } = require('../services');
const ErrorHandler = require('../errors/errorHandler');
const UserModel = require('../dataBase/User');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const currentUser = await userService.getById(user_id);

            if (!currentUser) {
                throw new ErrorHandler(418, 'User not found.');
            }

            req.currentUser = currentUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueName: async (req, res, next) => {
        try {
            const { name } = req.body;

            const userByName = await UserModel.findOne({ name });

            if (userByName) {
                throw new ErrorHandler(409, `Name ${name} is exists!`);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
