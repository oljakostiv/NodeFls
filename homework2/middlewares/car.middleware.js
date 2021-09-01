const ErrorHandler = require('../errors/ErrorHandler');
const {
    errMsg,
    statusCode
} = require('../config');
const { CarModel } = require('../dataBase');
const { carValidator } = require('../validators');

module.exports = {
    checkUniqueModel: async (req, res, next) => {
        try {
            const { model } = req.body;

            const carByModel = await CarModel.findOne({ model });

            if (carByModel) {
                return next(ErrorHandler(statusCode.CONFLICT, errMsg.MODEL_EXIST));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
        try {
            const dynamicValue = req[searchIn][paramName];

            const car = await CarModel.findOne({ [dbFiled]: dynamicValue });

            if (!car) {
                return next(ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND));
            }

            req.currentCar = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarsByDynamicParam: (paramName, searchIn = 'params') => (req, res, next) => {
        try {
            const { error } = carValidator[paramName].validate(req[searchIn]);

            if (error) {
                return next(ErrorHandler(statusCode.BAD_REQ, errMsg.NOT_VALID));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
