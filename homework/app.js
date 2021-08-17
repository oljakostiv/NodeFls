// Посортувати юзерів по папках.
//     У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.
//
// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.
// (Більше інформації в записі лекції)

const fs = require('fs');
const path = require('path');
// const util = require('util');

// const lidaPath = path.join(__dirname, '2000', 'lida.json');
// const mashaPath = path.join(__dirname, '2000', 'masha.json');
// const dimaPath = path.join(__dirname, '1800', 'dima.json');
// const olehPath = path.join(__dirname, '1800', 'oleh.json');
//
// const dirWithGirls1 = path.join(__dirname, '1800', 'lida.json');
// const dirWithGirls2 = path.join(__dirname, '1800', 'masha.json');
// const dirWithBoys1 = path.join(__dirname, '2000', 'dima.json');
// const dirWithBoys2 = path.join(__dirname, '2000', 'oleh.json');

// fs.rename(lidaPath, dirWithGirls1, err => {
//     console.log(err);
// });

// fs.rename(mashaPath, dirWithGirls2, err => {
//     console.log(err);
// });

// fs.rename(dimaPath, dirWithBoys1, err => {
//     console.log(err);
// });

// fs.rename(olehPath, dirWithBoys2, err => {
//     console.log(err);
// });

// const {promisify} = require('util');
// const fs = require('fs');
// const {join} = require('path');
// const mv = promisify(fs.rename);
//
// const moveToFileSasha = async () => {
//     const original = join(__dirname, 'hidden');
//     const target = join(__dirname, 'secondTask');
//     await mv(original, target);
// }
// moveToFileSasha();


const moveToFileSasha = path.join(__dirname, 'hidden', 'sasha.join');
const newFileSasha = path.join(__dirname, 'secondTask', 'sasha.join');

const readStream = fs.createReadStream(moveToFileSasha);
const writeStream = fs.createWriteStream(newFileSasha);

readStream.on('end', function () {
    fs.unlink(moveToFileSasha, (err => {
        console.log(err);
    }));
});
readStream.pipe(writeStream);

