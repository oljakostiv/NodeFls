const users = require('../db/users.json');

module.exports = {
   getAllUsers: (req, res) => {
        res.render('users', {users});
    },
   getSingleUser: (req, res) => {
       const {user_id} = req.params;
       const currentUser = users[user_id];

       if (!currentUser) {
           res.status(404).end('User not found.');
           return;
       }

       res.json(currentUser);
   },
};