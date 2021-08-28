const router = require('express').Router();

const { carsController } = require('../controllers');
const { carMiddle } = require('../middlewares');

router.get('/', carsController.getAllCars);
router.post('/', carMiddle.validateCarBody, carMiddle.checkUniqueModel, carsController.setCar);

router.delete('/:car_id', carMiddle.isCarPresent, carsController.deleteCar);
router.get('/:car_id', carMiddle.isCarPresent, carsController.getSingleCar);
router.put('/:car_id', carMiddle.isCarPresent, carMiddle.checkUniqueModel, carsController.updateCar);

module.exports = router;
