const {odd, even} = require('./var');

function checkOddOrEven(num) {
    if (1 === num % 2) {
        return odd;
    }

    return even;
}

module.exports = checkOddOrEven;