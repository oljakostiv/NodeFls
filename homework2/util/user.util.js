module.exports = {
    calibrationUser: (userToCalibrate) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        userToCalibrate = userToCalibrate.toObject();

        fieldsToRemove.forEach((field) => {
            delete userToCalibrate[field];
        });

        return userToCalibrate;
    }
};
