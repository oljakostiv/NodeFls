const fs = require('fs');

const users = require('../db/users.json');

module.exports = {
    presentUser: (req, res) => {
        res.render('reg');
    },
    registrationUser: (req, res) => {
        fs.readFile(users, (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            const {name, age, gender, email, password} = req.body;
            const arr = (data.toString()) ? JSON.parse(data.toString()) : [];

            if (!name || !age || !gender || !email || !password) {
                arr.push(req.body);
                res.status(404).end('Fill in each item!');
                return;
            }

            res.render('login');

            fs.writeFile(users, `${JSON.stringify(arr)}`, (err) => {

                if (err) {
                    console.log(err)
                    return;
                }

                const regUser = arr.find((value) => value.name === name);
                res.render('users', {userFind: {regUser}});

                if (!regUser) {
                    res.status(404).end('Need to change the name');
                }

            });
        });
    },
};
