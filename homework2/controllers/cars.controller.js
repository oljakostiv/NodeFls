const { statusCode } = require('../config');
const { CarModel } = require('../dataBase');
const {
    mainService: {
        deleteItem,
        setItem,
        updateItem,
        findItem
    }
} = require('../services');

module.exports = {
    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await deleteItem(CarModel, car_id);

            res.status(statusCode.DELETED).json(`Car with id ${car_id} id deleted.`);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const carsAll = await findItem(CarModel, req.query);
            res.json(carsAll);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.body.item);
        } catch (e) {
            next(e);
        }
    },

    setCar: async (req, res, next) => {
        try {
            const carsSet = await setItem(CarModel, req.body);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(carsSet);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const updateCar = await updateItem(CarModel, car_id, req.body);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(updateCar);
        } catch (e) {
            next(e);
        }
    },
};
