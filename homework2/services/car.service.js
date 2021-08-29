const carsDb = require('../dataBase/Car');

module.exports = {
    deleteCar: async (_id) => {
        await carsDb.deleteOne({ _id });
    },

    findCar: (cars) => carsDb.find(cars),

    getById: (car_id) => carsDb.findById(car_id),

    setCar: (car) => carsDb.create(car),

    updateCar: async (_id, data) => {
        await carsDb.findByIdAndUpdate(_id, data);
    }
};
