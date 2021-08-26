const { carService } = require('../services');
const ErrorHandler = require('../errors/errorHandler');
const CarModel = require('../dataBase/Car');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const currentCar = await carService.getById(car_id);

            if (!currentCar) {
                throw new ErrorHandler(418, 'User not found.');
            }

            req.currentCar = currentCar;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueName: async (req, res, next) => {
        try {
            const { model } = req.body;

            const carByModel = await CarModel.findOne({ model });

            if (carByModel) {
                throw new ErrorHandler(409, `Model ${model} is exists!`);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
