// встановити PM2
// оптимізнути свою апку за допомогою нових мідлвар
// додати:
//     .env - не пушимо (перед створенням додайте його в .gitignore)
// .env-example
// в кого відсутня друга сутність обов'язково доробити

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
