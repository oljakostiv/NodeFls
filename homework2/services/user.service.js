const usersDb = require('../dataBase/User');

module.exports = {
    deleteUser: (_id) => usersDb.findByIdAndDelete(_id),

    findUser: (user) => usersDb.find(user),

    setUser: (user) => usersDb.create(user),

    updateUser: (_id, data) => usersDb.findByIdAndUpdate(_id, data)
};
