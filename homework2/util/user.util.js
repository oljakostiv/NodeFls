module.exports = {
    calibrationUser: (userToCalibrate) => {
        const fieldsToRemove = ['password'];

        userToCalibrate = userToCalibrate.toObject();

        fieldsToRemove.forEach((field) => {
            delete userToCalibrate[field];
        });

        return userToCalibrate;
    }
};
