const { carService } = require('../services');
const ErrorHandler = require('../errors/errorHandler');
const {
    errMsg,
    statusCode
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
    }
};
