import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const dataFolder = './data';
const userNamesCount = {};

function scanDir() {
    readdirSync(dataFolder).forEach(file => {
        const fPath = path.join(dataFolder, file);
        const data = readFileSync(fPath, "utf-8", (e) => { if (e) throw e });

        data.split(/\n/).forEach(user => {
            if (userNamesCount[user]) {
                return userNamesCount[user]++;
            }
            userNamesCount[user] = 1;
        })
    })
};

function uniqueValues() {
    return Object.keys(userNamesCount).length;
};

function existInAllFiles() {
    return Object.keys(userNamesCount).filter((userName) => userNamesCount[userName] === 20).length;
};

function existInAtLeastTen() {
    return Object.keys(userNamesCount).filter((userName) => userNamesCount[userName] >= 10).length;
};

console.time('performance');
scanDir();
console.log('total users: ', uniqueValues());
console.log('at least 10 posts liked: ', existInAtLeastTen());
console.log('all 20 liked: ', existInAllFiles());

console.timeEnd('performance');