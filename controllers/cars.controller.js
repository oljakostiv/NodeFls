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

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const {
                perPage = 3,
                page = 1
            } = req.query;

            const carsAll = await findItem(CarModel)
                .limit(+perPage)
                .skip((+perPage * (page - 1)));

            res.json(carsAll);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.item);
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
