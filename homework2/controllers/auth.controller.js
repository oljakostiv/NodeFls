const { passwordService } = require('../services');
const { errMsg } = require('../config');

module.exports = {
    authPostUser: async (req, res, next) => {
        try {
            const {
                authUser,
                body
            } = req;

            await passwordService.compare(authUser.password, body.password);

            res.end(errMsg.NAME_EXIST);
        } catch (e) {
            next(e);
        }
    },
};
