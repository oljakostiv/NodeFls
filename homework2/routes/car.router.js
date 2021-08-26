const router = require('express').Router();

const { carsController } = require('../controllers');
const { isCarPresent, checkUniqueName } = require('../middlewares/car.middleware');

router.get('/', carsController.getAllCars);
router.get('/:car_id', isCarPresent, carsController.getSingleCar);
router.post('/', checkUniqueName, carsController.setCar);
router.delete('/:car_id', isCarPresent, carsController.deleteCar);

module.exports = router;
