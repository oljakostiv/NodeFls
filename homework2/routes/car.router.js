const router = require('express').Router();

const { carsController } = require('../controllers');
const { carMiddle } = require('../middlewares');
const {
    constants: {
        BODY,
        CAR_ID,
        ID,
        QUERY,
        PARAMS
    }
} = require('../config');
const {
    carValidator: {
        createCarValidator,
        queryCarValidator,
        paramsCarValidator,
        updateCarValidator
    }
} = require('../validators');

router.get('/',
    carMiddle.getCarsByDynamicParam(queryCarValidator, QUERY),
    carsController.getAllCars);

router.post('/',
    carMiddle.getCarsByDynamicParam(createCarValidator, BODY),
    carMiddle.checkUniqueModel,
    carsController.setCar);

router.delete('/:car_id',
    carMiddle.getCarsByDynamicParam(paramsCarValidator),
    carsController.deleteCar);

router.get('/:car_id',
    carMiddle.getCarsByDynamicParam(paramsCarValidator),
    carMiddle.getCarByDynamicParam(CAR_ID, PARAMS, ID),
    carsController.getSingleCar);

router.put('/:car_id',
    carMiddle.getCarsByDynamicParam(paramsCarValidator),
    carMiddle.getCarsByDynamicParam(updateCarValidator),
    carMiddle.checkUniqueModel,
    carsController.updateCar);

module.exports = router;
