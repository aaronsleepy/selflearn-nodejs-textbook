const crypto = require('crypto');

const testPass = '비밀번호';
const testNewPass = '다른 비밀번호';

const encryptedBase64Pass = crypto.createHash('sha512').update(testPass).digest('base64');
const encryptedBase64NewPass = crypto.createHash('sha512').update(testNewPass).digest('base64');
const encryptedHexPass = crypto.createHash('sha512').update(testPass).digest('hex');

console.log("encryptedBase64Pass:", encryptedBase64Pass);
console.log("encryptedBase64NewPass:", encryptedBase64NewPass);
console.log("encryptedHexPass:", encryptedHexPass);

console.log("\n================= pbkdf2 encryption")

crypto.randomBytes(64, ((err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2(testPass, salt, 100000, 64, 'sha512', ((err1, derivedKey) => {
        console.log('password:', derivedKey.toString('base64'));
    }))
}));