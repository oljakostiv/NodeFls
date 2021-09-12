module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ID_REGEXP: new RegExp('^[0-9a-fA-F]{24}$'),
    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,30})'),

    ACCESS: 'access',
    ADMIN: 'admin',
    AUTHORIZATION: 'Authorization',
    BODY: 'body',
    CAR_ID: 'car_id',
    EMAIL: 'email',
    ID: '_id',
    FROM: 'No replay',
    GMAIL: 'gmail',
    MODEL: 'model',
    NAME: 'name',
    OWNER: 'owner',
    PARAMS: 'params',
    PASSWORD: 'password',
    QUERY: 'query',
    QUERY_TOKEN: '?token=',
    REFRESH: 'refresh',
    USER: 'user',
    USER_ID: 'user_id',
    USERS: 'users',
    __V: '__v',

    FILE_MAX_SIZE: {
        PHOTO: [5 * 1024 * 1024]
    },
    MIMETYPE: {
        PHOTO: [
            'image/jpeg',
            'image/png'
        ]
    }

};
