const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('../../README.md');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('/tmp/README.md.gz');

readStream.pipe(zlibStream).pipe(writeStream);
