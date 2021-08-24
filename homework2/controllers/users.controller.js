// const fs = require('fs');
// const users = require('../db/users.json');

const {readUsersFile, writeUsersFile} = require('../services/main.service');

module.exports = {
    getAllUsers: async (req, res) => {
        res.json(await readUsersFile());
    },
    getSingleUser: async (req, res) => {
        const users = await readUsersFile();

        const {user_id} = req.params;
        const currentUser = users[user_id];

        if (!currentUser) {
            res.status(404).end('User not found.');
            return;
        }

        res.json(currentUser);
    },
    setUser: async (req, res) => {
        const users = await readUsersFile();

        const {name, age, gender, email, password} = req.body;
        const findUser = users.find((value) => value.name === name);

        console.log(req.body);

        if (findUser) {
            res.status(404).end('Name exists!');
            return;
        }

        if (!name || !age || !gender || !email || !password) {
            res.status(404).end('Fill in each item!');
            return;
        }

        users.push(req.body);

        await writeUsersFile(users);
        res.redirect('/auth');
    }
};

//без сервісу:
// module.exports = {
//     getAllUsers: (req, res) => {
//         res.render('users', {users});
//     },
//     getSingleUser: (req, res) => {
//         const {user_id} = req.params;
//         const currentUser = users[user_id];
//
//         if (!currentUser) {
//             res.status(404).end('User not found.');
//             return;
//         }
//
//         res.json(currentUser);
//     },
//     setUser: (req, res) => {
//         fs.readFile('db/users.json', 'utf8', (err, data) => {
//
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//
//             const {name, age, gender, email, password} = req.body;
//             const arr = (data.toString()) ? JSON.parse(data.toString()) : [];
//             const findUser = arr.find((value) => value.name === name);
//
//             console.log(req.body);
//             console.log(arr);
//
//             if (findUser) {
//                 res.status(404).end('Name exists!');
//                 return;
//             }
//
//             if (!name || !age || !gender || !email || !password) {
//                 res.status(404).end('Fill in each item!');
//                 return;
//             }
//
//             arr.push(req.body);
//
//             fs.writeFile('db/users.json', `${JSON.stringify(arr)}`, (err) => {
//
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//
//                 res.redirect('/auth');
//             });
//
//         });
//     }
// };
