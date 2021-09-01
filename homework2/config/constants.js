module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ID_REGEXP: new RegExp('^[0-9a-fA-F]{24}$'),
    PASSWORD_REGEXP: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,30})'),
    AUTHORIZATION: 'Authorization',
    BODY: 'body',
    CAR_ID: 'car_id',
    ID: '_id',
    PARAMS: 'params',
    QUERY: 'query',
    USER_ID: 'user_id',
};
