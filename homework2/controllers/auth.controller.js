const fs = require('fs');

module.exports = {
    authUser: (req, res) => {
        res.render('login')
    },
    authPostUser: (req, res) => {

        fs.readFile('users', (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            const {name} = req.body;
            const userName = JSON.parse(data);
            const find = userName.find((value) => value.name === name);

            if (find) {
                res.render('users', {userFind: {find}})
            }
            res.redirect('/registration')
        })
    }
}