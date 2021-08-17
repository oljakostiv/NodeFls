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

// 2.
// const moveToFileSasha = path.join(__dirname, 'hidden', 'sasha.txt');
// const newFileSasha = path.join(__dirname, 'secondTask', 'sasha.txt');
//
// const readStream = fs.createReadStream(moveToFileSasha);
// const writeStream = fs.createWriteStream(newFileSasha);
//
// readStream.on('end', function () {
//     fs.unlink(moveToFileSasha, err => {
//         console.log(err);
//     });
// });
// readStream.pipe(writeStream);

// const moveToFileKolya = path.join(__dirname, 'dir', 'kolya.txt');
// const newFileKolya = path.join(__dirname, 'secondTask', 'kolya.txt');
//
// const readStream1 = fs.createReadStream(moveToFileKolya);
// const writeStream1 = fs.createWriteStream(newFileKolya);
//
// readStream1.pipe(writeStream1);

// const moveToFileVasyl = path.join(__dirname, 'folder', 'vasyl.txt');
// const newFileVasyl = path.join(__dirname, 'secondTask', 'vasyl.txt');
//
// const readStream2 = fs.createReadStream(moveToFileVasyl);
// const writeStream2 = fs.createWriteStream(newFileVasyl);
//
// readStream2.pipe(writeStream2);

