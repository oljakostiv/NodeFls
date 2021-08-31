const router = require('express').Router();

const { carsController } = require('../controllers');
const { carMiddle } = require('../middlewares');

router.get('/',
    carMiddle.getCarsByDynamicParam('queryCarValidator', 'query'),
    carsController.getAllCars);

router.post('/',
    carMiddle.getCarsByDynamicParam('createCarValidator'),
    carMiddle.checkUniqueModel,
    carsController.setCar);

router.delete('/:car_id',
    carMiddle.getCarsByDynamicParam('paramsCarValidator', 'params'),
    carsController.deleteCar);

router.get('/:car_id',
    carMiddle.getCarsByDynamicParam('paramsCarValidator', 'params'),
    carMiddle.getCarByDynamicParam('car_id', 'params', '_id'),
    carsController.getSingleCar);

router.put('/:car_id',
    carMiddle.getCarsByDynamicParam('paramsCarValidator', 'params'),
    carMiddle.getCarsByDynamicParam('updateCarValidator', 'params'),
    carMiddle.checkUniqueModel,
    carsController.updateCar);

module.exports = router;
