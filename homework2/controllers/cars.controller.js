const { carService } = require('../services');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const carsAll = await carService.findCar();
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

            res.json(carsSet);
        } catch (e) {
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await carService.deleteCar(car_id);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
