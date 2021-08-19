const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variables');
const users = require('./db/users');

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
    // res.json('<h1>Hello!</h1>');
    res.send('<h1>Hello!</h1>');
});

app.get('/login', ((req, res) => {
    res.render('login', {isPresent: false});
}));

app.get('/users', ((req, res) => {
    res.render('users', {userName: 'ddd', users});
}));

app.get('/users/:user_id', ((req, res) => {
    const {user_id} = req.params;
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found.');
        return;
    }
    res.json(currentUser)
}));

app.post('/auth', ((req, res) => {
    console.log(req.body);
    const {name, password} = req.body;
    res.json(name);
}));

app.listen(PORT, () => {
    console.log('Hello', PORT);
});