// Посортувати юзерів по папках.
//     У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.
//
// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.
// (Більше інформації в записі лекції)

const fs = require('fs');
const path = require('path');

const mkdirPathF = path.join(__dirname, '1800');
fs.mkdir(mkdirPathF, {recursive: true}, err => {
    console.log(err);
});

const mkdirPathM = path.join(__dirname, '2000');
fs.mkdir(mkdirPathM, {recursive: true}, err => {
    console.log(err);
});

const lidaPath = path.join(__dirname, '2000', 'lida.json');
const mashaPath = path.join(__dirname, '2000', 'masha.json');
const dimaPath = path.join(__dirname, '1800', 'dima.json');
const olehPath = path.join(__dirname, '1800', 'oleh.json');

fs.readFile(lidaPath, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    if (data.toString().includes('female')) {
        fs.rename(lidaPath, path.join(mkdirPathF, 'lida.json'), err => {
            console.log(err);
        });
    }
});

fs.readFile(mashaPath, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    if (data.toString().includes('female')) {
        fs.rename(mashaPath, path.join(mkdirPathF, 'masha.json'), err => {
            console.log(err);
        });
    }
});

fs.readFile(dimaPath, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    if (data.toString().includes('male')) {
        fs.rename(dimaPath, path.join(mkdirPathM, 'dima.json'), err => {
            console.log(err);
        });
    }
});

fs.readFile(olehPath, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    if (data.toString().includes('male')) {
        fs.rename(olehPath, path.join(mkdirPathM, 'oleh.json'), err => {
            console.log(err);
        });
    }
});

// 2. видалити не вийшло :\
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

