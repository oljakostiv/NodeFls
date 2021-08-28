const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/errorHandler');
const {
    errMsg,
    statusCode
} = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (hash, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCode.BAD_REQ, errMsg.EMAIL_PASSWORD_WRONG);
        }
    }
};
