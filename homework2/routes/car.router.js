const router = require('express').Router();

const { carsController } = require('../controllers');
const { carMiddle } = require('../middlewares');

router.get('/',
    carMiddle.validateCarQuery,
    carMiddle.getCarsByDynamicParam('year'),
    // carMiddle.allCarsPresent,
    carsController.getAllCars);
router.post('/',
    carMiddle.validateCarBody,
    // carMiddle.getCarByDynamicParam('model'),
    carMiddle.checkUniqueModel,
    carsController.setCar);

router.delete('/:car_id', carMiddle.validateCarParams, carMiddle.isCarPresent, carsController.deleteCar);
router.get('/:car_id',
    carMiddle.validateCarParams,
    carMiddle.getCarByDynamicParam('car_id', 'params', '_id'),
    carsController.getSingleCar);
router.put('/:car_id',
    carMiddle.validateCarParams,
    carMiddle.validateCarUpdate,
    carMiddle.isCarPresent,
    carMiddle.checkUniqueModel,
    carsController.updateCar);

module.exports = router;
