module.exports = {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/nodefls',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret_Info',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Refresh'
};
