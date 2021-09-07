module.exports = {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/nodefls',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret_Info',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Refresh',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://www.skyatnightmagazine.com/advice/stargazing-what-to-see-in-the-night-sky-this-year/',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'example@gmail.com',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || '1235',
};
