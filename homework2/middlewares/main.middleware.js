const ErrorHandler = require('../errors/ErrorHandler');
const {
    errMsg,
    statusCode,
    constants: { PARAMS }
} = require('../config');

module.exports = {
    isDataValid: (validator, searchIn = PARAMS) => (req, res, next) => {
        try {
            const { error } = validator.validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, errMsg.NOT_VALID);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
