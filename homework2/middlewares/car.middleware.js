const { carService } = require('../services');
const ErrorHandler = require('../errors/ErrorHandler');
const {
    errMsg,
    statusCode
} = require('../config');
const { CarModel } = require('../dataBase');
const { carValidator } = require('../validators');

module.exports = {
    allCarsPresent: async (req, res, next) => {
        try {
            const {
                model,
                year,
                price
            } = req.query;

            if (!model && !year && !price) {
                const cars = await carService.findCar();

                req.cars = cars;
                return next();
            }

            if (model || year || price) {
                const carsQuery = await carService.findCar({
                    model,
                    year,
                    price
                });

                req.cars = carsQuery;
                return next();
            }
        } catch (e) {
            next(e);
        }
    },

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

    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const currentCar = await carService.getById(car_id);

            if (!currentCar) {
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.currentCar = currentCar;

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
                throw new ErrorHandler(statusCode.NOT_FOUND, errMsg.NOT_FOUND);
            }

            req.currentCar = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarParams: (req, res, next) => {
        try {
            const { error } = carValidator.paramsCarValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, errMsg.ID_WRONG);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarQuery: (req, res, next) => {
        try {
            const { error } = carValidator.queryCarValidator.validate(req.query);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, errMsg.QUERY_ERROR);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarBody: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarUpdate: (req, res, next) => {
        try {
            const { error } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQ, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
