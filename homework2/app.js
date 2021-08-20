const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users');

const user = path.join(__dirname, 'db', 'users.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

// app.get('/ping', ((req, res) => {
//     res.json('pong');
// }));

app.get('/', (req, res) => {
    console.log(req);
    res.send('<h1>Hello!</h1>');
});

app.get('/users', ((req, res) => {
    res.render('users', {users});
}));

app.get('/users/:user_id', ((req, res) => {
    const {user_id} = req.params;
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found.');
        return;
    }
    res.json(currentUser);
}));

app.get('/auth', ((req, res) => {
    res.render('login');
}));

app.post('/auth', ((req, res) => {
    const {name} = req.body;
    const loginUser = users[name];

    if(!loginUser) {
        res.status(404).render('reg', {about: 'Register, please!'});
    }
    res.redirect(`/users`);
}));

app.get('/registration', ((req, res) => {
    res.render('reg');
}));

app.post('/registration', ((req, res) => {
    const {name, age, gender, email, password} = req.body;
    const isPresent = users[name];

    fs.writeFile(user, `${JSON.stringify(users)}`, err => {
        console.log(err);
    });

    if(!name || !age || !gender || !email || !password) {
        res.status(404).end('Fill in each item!');
        return;
    }
    if (isPresent) {
        res.status(404).end('Need to change the name');
        return;
    }
    res.render('login');
}));

app.listen(PORT, () => {
    console.log('Hello', PORT);
});