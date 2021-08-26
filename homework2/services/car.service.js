const carsDb = require('../dataBase/Car');

module.exports = {
    findCar: () => carsDb.find({}),
    getById: (car_id) => carsDb.findOne({ _car_id: car_id }),
    setCar: (car) => carsDb.create(car),
    deleteCar: async (_id) => {
        await carsDb.deleteOne({ _id });
    }
};
