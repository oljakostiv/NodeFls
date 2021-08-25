const {readUsersFile} = require('../services/main.service');

module.exports = {
    authUser: (req, res) => {
        res.render('login');
    },

    authPostUser: async (req, res) => {
        const user = await readUsersFile();

        const {name, password} = req.body;
        const find = user.find((value) => value.name === name && value.password === password);

        if (find) {
            res.redirect(`/users`);
            return;
        }

        res.redirect('/registration');
    }
};
