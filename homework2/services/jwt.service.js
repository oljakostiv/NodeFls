const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
    variables: {
        ACCESS_SECRET_KEY,
        REFRESH_SECRET_KEY
    }
} = require('../config');
const {
    constants: { ACCESS },
    errMsg,
    statusCode
} = require('../config');
const { ErrorHandler } = require('../errors');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    giveTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secretInfo = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretInfo);
        } catch (e) {
            throw new ErrorHandler(statusCode.UNAUTHORIZED, errMsg.INVALID_TOKEN);
        }
    }
};
