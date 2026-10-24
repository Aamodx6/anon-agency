import fs from 'fs';

const code = fs.readFileSync('scripts/herocoins_entire_module.js', 'utf8');

// Find how D.body, D.floor, D.walls are created and mapped
const startIdx = code.indexOf('D=function(e="high")');
console.log('--- D FUNCTION ---\n', code.slice(startIdx, startIdx + 2500));

// Find how meshes are constructed for each coin
const enIdx = code.indexOf('en=(e,t,o)=>{');
console.log('\n--- EN FUNCTION (COIN SPAWN) ---\n', code.slice(enIdx, enIdx + 1200));
