// Вам необхідно реалізувати CRUD на дві сутності (user, car)
//
// Мають бути реалізовані такі методи:
//     1) Create user
// 2) Get all users
// 3) Get user by id
// 4) Delete current user
//
// Все це має бути розбито по роутах, контроллерах, сервісах з обовязковою перевіркою всього що приходить через мідлвари.
//     Також всі меджік стрінги мають бути винесені в константи.
//
//     додати errorHandler

const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/variables');

const app = express();

mongoose.connect('mongodb://localhost:27017/nodefls');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    carRouter,
    userRouter
} = require('./routes');

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('Hello', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found!'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
