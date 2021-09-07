// ОБОВʼЯЗКОВО:
//     створити емейли на :
// - створення акаунту
// - оновлення акаунту
// - видалення акаунту користувачем
// - видалення акаунту адміном
// - авторизація
// ДОДАТКОВО :
//     **реалізувати флоу forgot password.
// (створити новий ендпоінт методом GET який буде очікувати токен в query/Authorization. Для цих токенів має бути окрема модель)
// **реалізувати активацію акаунту через мейл (використи модель з попереднього завдання)
// Активація акаунту має відпутися при кліку на посилання яке прийшло на email
// **реалізувати change password

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { notFound: { _notFoundError, _mainErrorHandler } } = require('./helper');
const { apiRouter } = require('./routes/api');

const { variables: { PORT, DB_CONNECTION_URL } } = require('./config');

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
