const { ErrorHandler } = require('../errors');
const {
    constants: { BODY },
    errMsg,
    statusCode,
} = require('../config');
const { CarModel } = require('../dataBase');

module.exports = {
    checkUniqueModel: async (req, res, next) => {
        try {
            const { model } = req.body;

            const carByModel = await CarModel.findOne({ model });

            if (carByModel) {
                throw new ErrorHandler(statusCode.CONFLICT, errMsg.MODEL_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParam: (paramName, searchIn = BODY, dbFiled = paramName) => async (req, res, next) => {
        try {
            const dynamicValue = req[searchIn][paramName];

            const car = await CarModel.findOne({ [dbFiled]: dynamicValue });

            if (!car) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.currentCar = car;

            next();
        } catch (e) {
            next(e);
        }
    }
};
