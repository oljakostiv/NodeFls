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
