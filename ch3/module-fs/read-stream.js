const fs = require('fs');

const readStream = fs.createReadStream('../../README.md', { highWaterMark: 16});
const data = [];

readStream
    .on('data', chunk => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length, chunk.toString());
    })
    .on('end', () => {
        console.log('end: ', Buffer.concat(data).toString());
    })
    .on('error', err => {
       console.log('error: ', err);
    });