const jwt = require('jsonwebtoken');

const {
    errMsg,
    statusCode,
    variables: {
        BACKEND_KEY
    }
} = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    giveActionToken: () => jwt.sign({}, BACKEND_KEY, { expiresIn: '22m' }),

    verifyActionToken: async (token) => {
        try {
            await jwt.verify(token, BACKEND_KEY);
        } catch (e) {
            throw new ErrorHandler(statusCode.BAD_REQ, errMsg.INCORRECT);
        }
    }
};
