const router = require('express').Router();

const { carsController } = require('../controllers');
const { carMiddle } = require('../middlewares');

router.get('/', carsController.getAllCars);
router.post('/', carMiddle.checkUniqueModel, carsController.setCar);
router.put('/:car_id', carMiddle.isCarPresent, carMiddle.checkUniqueModel, carsController.updateCar);
router.delete('/:car_id', carMiddle.isCarPresent, carsController.deleteCar);
router.get('/:car_id', carMiddle.isCarPresent, carsController.getSingleCar);

module.exports = router;
