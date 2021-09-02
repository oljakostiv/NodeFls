// імплементувати токенти у вашу апку
// зробити закриті ендпоінти, тепер редагувати дані користувача може лише цей конкретний користувач
// Видалити акаунт може власник акаунту, або admin
// * спробуйте реалізувати refresh

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { apiRouter } = require('./routes/api');

const {
    errMsg,
    statusCode,
    variables: { PORT, DB_CONNECTION_URL }
} = require('./config');

const app = express();

mongoose.connect(DB_CONNECTION_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('Hello', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCode.NOT_FOUND,
        message: err.message || errMsg.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCode.SERVER_ERROR)
        .json({
            message: err.message
        });
}
