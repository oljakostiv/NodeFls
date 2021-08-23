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
            const regUser = arr.find((value) => value.name === name);

            if (regUser) {
                res.status(404).end('Name exists!').redirect('/auth');
            }

            arr.push(req.body);

            fs.writeFile(users, `${JSON.stringify(arr)}`, (err) => {

                if (err) {
                    console.log(err);
                    return;
                }

                if (!name || !age || !gender || !email || !password) {
                    res.status(404).end('Fill in each item!');
                    return;
                }

                res.render('user', {users});
            })

        });
    },
};


