const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {
    authRouter,
    registrationRouter,
    userRouter
} = require('./routes');

const staticDir = path.join(__dirname, 'static');

app.use(express.static(staticDir));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', staticDir);

app.use('/auth', authRouter);
app.use('/registration', registrationRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('Hello', PORT);
});

