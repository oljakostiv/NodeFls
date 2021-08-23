const users = require('../db/users.json');

module.exports = {
    authUser: (req, res) => {
        res.render('login');
    },
    authPostUser: (req, res) => {
            const {name} = req.body;
            const find = users.findIndex((value) => value.name === name);

            if (find) {
                res.redirect(`/users`);
                return;
            }

            res.redirect('/registration');
    },
};
