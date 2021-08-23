const path = require('path');
const fs = require('fs/promises');

const usersDbPath = path.join(process.cwd(), 'db', 'users.join');

const readUser = async () => {
    try {
        const data = await fs.readFile(usersDbPath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.log(err);
    }
};

const writeUser = async (user) => {
    try {
        const writeNewText = JSON.stringify(user, null, 2);
        
        await fs.writeFile(usersDbPath, writeNewText);
    }catch (err) {
        console.log(err);
    }
};

module.exports = {readUser, writeUser};