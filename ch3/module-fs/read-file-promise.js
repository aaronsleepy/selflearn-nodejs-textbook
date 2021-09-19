const fs = require('fs').promises;

fs.readFile('../../README.md')
    .then(value => {
        console.log(value);
        console.log(value.toString());
    })
    .catch(reason => {
        console.error(reason);
    });