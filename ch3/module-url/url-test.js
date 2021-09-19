const url = require('url');

const { URL } = url;

const targetUrl = 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor';

// WHATWG style
const myURL = new URL(targetUrl);
console.log('new URL():', myURL);

console.log('----------------------------------');

// node style
let parsedUrl = url.parse(targetUrl);
console.log('url.parse():', parsedUrl);