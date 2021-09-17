const { UserModel } = require('../dataBase');

module.exports = {
    getAll: async (query = {}) => {
        const {
            perPage = 5,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            // ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;

        const users = await UserModel.find()
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        return users;
    }
};
