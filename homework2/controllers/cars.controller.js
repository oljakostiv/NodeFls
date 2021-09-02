const { statusCode } = require('../config');
const { carService } = require('../services');

module.exports = {
    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carService.deleteCar(car_id);

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const carsAll = await carService.findCar(req.query);
            res.json(carsAll);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.currentCar);
        } catch (e) {
            next(e);
        }
    },

    setCar: async (req, res, next) => {
        try {
            const carsSet = await carService.setCar(req.body);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(carsSet);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const updateCar = await carService.updateCar(car_id, req.body);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(updateCar);
        } catch (e) {
            next(e);
        }
    },
};
