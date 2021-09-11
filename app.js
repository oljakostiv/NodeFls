// зареєструватися на AWS
//
// створити s3 та інтегрувати собі в апку
// Користувач повинен мати можливість додати аватар при створенні також змінити його на оновленні

const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');

require('dotenv')
    .config();

const {
    notFound: {
        _notFoundError,
        _mainErrorHandler
    }
} = require('./helper');
const { apiRouter } = require('./routes/api');

const {
    variables: {
        PORT,
        DB_CONNECTION_URL
    }
} = require('./config');
const { UserModel } = require('./dataBase');

const app = express();

mongoose.connect(DB_CONNECTION_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, async (err) => {
    await UserModel.setOwner();

    if (err) {
        console.log(err);
    }

    console.log(chalk.cyan(`${PORT} hi boss!`));
});
