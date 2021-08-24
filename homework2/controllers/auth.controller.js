const {readUsersFile} = require('../services/main.service');

module.exports = {
    authUser: (req, res) => {
        res.render('login');
    },
    authPostUser: async (req, res) => {
        const user = await readUsersFile();

        const {name, password} = req.body;
        const find = user.find((value) => value.name === name && value.password === password);

        console.log(req.body);

        if (find) {
            res.redirect(`/users`);
            return;
        }

        res.redirect('/registration');
        // res.status(404).end('Name not exists!');
    }
};
