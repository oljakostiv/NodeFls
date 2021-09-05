// Посортувати юзерів по папках.
//     У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.

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
