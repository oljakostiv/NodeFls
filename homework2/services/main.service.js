const path = require('path');
const fs = require('fs').promises;

const usersDb = path.join(process.cwd(), 'db', 'users.json');

const readUsersFile = async () => {
        const data = await fs.readFile(usersDb, 'utf8');
        return data ? JSON.parse(data) : [];
};

const writeUsersFile = async (arr) => {
        const userText = JSON.stringify(arr, null);

        await fs.writeFile(usersDb, userText);
};

module.exports = {readUsersFile, writeUsersFile};