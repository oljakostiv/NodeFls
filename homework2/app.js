// Вам необхідно покрити всі місця, де це необхідно валідаторами JOI (query, params, body).
//
//     Зробити хешування паролів
//
// Зробити заготовку для флоу аутернтифікації. Тобто роут, контроллер, мідлвари і так далі
// https://www.youtube.com/watch?v=NO8rRUk_G_I&t=5700s

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {
    errMsg,
    statusCode,
    variables: { PORT, DB_CONNECTION_URL }
} = require('./config');

const app = express();

mongoose.connect(DB_CONNECTION_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    authRouter,
    carRouter,
    userRouter
} = require('./routes');

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
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
