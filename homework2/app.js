const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const { PORT } = require('./config/variables');
const usersDb = require('./db/users.js');

const users = JSON.parse(JSON.stringify(usersDb));
const userSet = path.join(__dirname, 'db', 'users.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.get('/ping', ((req, res) => {
    res.json('pong');
}));

app.get('/', (req, res) => {
    console.log(req);
    res.render('home');
});

app.get('/auth', (req, res) => {
    res.render('login');
});

app.post('/auth', (req, res) => {
    const { name } = req.body;

    usersDb.forEach(((value, index) => {

        if (value.name === name) {
            res.redirect('/users/' + index)
            return;
        }

        res.status(404).render('reg', { about: 'Register, please!' });
    }))

    // const loginUser = users.find(value => value.name = name);
    //
    // if (!loginUser) {
    //     res.status(404)
    //         .render('reg', { about: 'Register, please!' });
    // }
    //
    // res.redirect('/users/');
    //
    // return;
});

app.get('/registration', (req, res) => {
    res.render('reg');
});

app.post('/registration', (req, res) => {

    const {
        name,
        age,
        gender,
        email,
        password
    } = req.body;

    for (let user of usersDb) {
        if (!name || !age || !gender || !email || !password) {
            res.status(404)
                .json('Fill in each item!');
            return;
        }
    }

    usersDb.push({
        name,
        age,
        gender,
        email,
        password
    });

    const newUser = `module.exports = ${JSON.stringify(usersDb)}`;

    fs.writeFile(userSet, newUser, (err) => {
        if (err) console.log(err);
    });

    res.status(201)
        .render('login');
});

app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;

    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404)
            .end('User not found.');

        return;
    }

    res.render('user', { currentUser });
});

app.listen(PORT, () => {
    console.log('Hello', PORT);
});
