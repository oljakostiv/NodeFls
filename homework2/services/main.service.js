const path = require('path');
const fs = require('fs').promises;

const usersDb = path.join(process.cwd(), 'db', 'users.json');

const readUsersFile = async () => {
    try {
        const data = await fs.readFile(usersDb, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.log(err);
        throw new Error(`There was a problem!`);
    }
};

const writeUsersFile = async (arr) => {
    try {
        const userText = JSON.stringify(arr, null);
        await fs.writeFile(usersDb, userText);
    }catch (err) {
        console.log(err);
    }
};

module.exports = {readUsersFile, writeUsersFile};