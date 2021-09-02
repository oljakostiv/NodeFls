const carsDb = require('../dataBase/Car');

module.exports = {
    deleteCar: (_id) => carsDb.findByIdAndDelete(_id),

    findCar: (cars) => carsDb.find(cars),

    setCar: (car) => carsDb.create(car),

    updateCar: (_id, data) => carsDb.findByIdAndUpdate(_id, data)
};
