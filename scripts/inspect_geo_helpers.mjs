import fs from 'fs';

const code = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');

const dIdx = code.indexOf('D=function(e="high")');
console.log('Code before D:\n', code.slice(dIdx - 2000, dIdx));
