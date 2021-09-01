const usersDb = require('../dataBase/User');

module.exports = {
    deleteUser: async (_id) => {
        await usersDb.deleteOne({ _id });
    },

    findUser: (user) => usersDb.find(user),

    setUser: (user) => usersDb.create(user),

    updateUser: async (_id, data) => {
        await usersDb.findByIdAndUpdate(_id, data);
    }
};
