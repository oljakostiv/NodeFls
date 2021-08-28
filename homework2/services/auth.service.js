const usersDb = require('../dataBase/User');

module.exports = {
    findUserAuth: (user) => usersDb.findOne(user)
};
// work
