const usersDb = require('../dataBase/User');

module.exports = {
    findUser: () => usersDb.find({}),
    getById: (user_id) => usersDb.findOne({ _user_id: user_id }),
    setUser: (user) => usersDb.create(user),
    deleteUser: async (_id) => {
        await usersDb.deleteOne({ _id });
    }
};
