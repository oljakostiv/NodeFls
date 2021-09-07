const jwt = require('jsonwebtoken');

const {
    errMsg,
    statusCode,
    variables: {
        ACCESS_SECRET_KEY
    }
} = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
    giveActionToken: () => jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '22m' }),

    verifyActionToken: async (token) => {
        try {
            await jwt.verify(token, ACCESS_SECRET_KEY);
        } catch (e) {
            throw new ErrorHandler(statusCode.BAD_REQ, errMsg.INCORRECT);
        }
    }
};
