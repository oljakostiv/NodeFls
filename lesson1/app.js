// const fileData = require('./dir/file1');
//
// // console.log(fileData);
// fileData.greeting('Olha');
//
// console.log(__dirname);
// console.log(__filename);

const fs = require('fs');
const path = require('path');

const textPath = path.join(__dirname, 'dir', 'text.txt');
// const textPath2 = path.join(__dirname, 'dir', 'text2.txt');
const folderWithDeletedData = path.join(__dirname, 'foldernew', 'deleter.txt');
const dirToReadPath = path.join(__dirname, 'dir');
// console.log(textPath);

// fs.writeFile(textPath, 'hello', err => {
//     console.log(err);
// })

//додати файл:
// fs.appendFile(textPath, 'new hello', err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('done');
// })

//додати папку:
// const mkdirPath = path.join(__dirname, 'dir', 'folder');
// fs.mkdir(mkdirPath, {recursive: true}, err => {
//     console.log(err);
// });

//вивести вміст файлу:
// fs.readFile(textPath, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     fs.appendFile(textPath2, data, err => {
//         console.log(err);
//     })
//     console.log(data.toString());
// });

//вивести інфо про папку\файл:
// fs.readdir(dirToReadPath, ((err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     // console.log(files);
//
//     files.forEach(file => {
//         // console.log(file);
//         const filePath = path.join(dirToReadPath, file)
//         fs.stat(filePath, ((err1, stats) => {
//             console.log('----------');
//             console.log(stats.isFile(), 'isFile');
//             console.log(stats.isDirectory(), 'isDir');
//             console.log(stats.size);
//         }))
//     });
// }));

//втерти папку:
// fs.rmdir(path.join(dirToReadPath, 'folder'), err =>{
//     console.log(err);
// });

//стерти файл:
// fs.unlink(path.join(__dirname, 'dir', 'text2.txt'), err => {
//     console.log(err);
// });

// //переміщення:
// fs.rename(textPath, folderWithDeletedData, err => {
//     console.log(err);
// });

