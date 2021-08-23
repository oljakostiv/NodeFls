const users = require('../db/users.json');

module.exports = {
    presentUser: (req, res) => {
        res.render('reg');
    },
    registrationUser: (req, res) => {
        const {name, age, gender, email, password} = req.body;
        const regUser = users.findIndex((value) => value.name === name);

        if (!name || !age || !gender || !email || !password) {
            res.status(404).end('Fill in each item!');
            return;
        }

        if (!regUser) {
            res.status(404).end('Name exists!');
        }

        users.push(req.body);
        res.redirect('/auth');
    },
};
