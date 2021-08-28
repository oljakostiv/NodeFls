module.exports = {
    calibrationUser: (userToCalibrate) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete userToCalibrate[field];
        });

        return userToCalibrate;
    }
};
// work
