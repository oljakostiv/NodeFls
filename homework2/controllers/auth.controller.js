const fs = require('fs');

module.exports = {
    authUser: (req, res) => {
        res.render('login');
    },
    authPostUser: (req, res) => {
        fs.readFile('db/users.json', 'utf8', (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            const {name, password} = req.body;
            const arr = (data.toString()) ? JSON.parse(data.toString()) : [];
            const find = arr.find((value) => value.name === name && value.password === password);

            console.log(req.body);

            if (find) {
                res.redirect(`/users`);
                return;
            }

            res.redirect('/registration');
            // res.status(404).end('Name not exists!');

        });
    },
};
