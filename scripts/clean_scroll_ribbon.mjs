import fs from 'fs';

let code = fs.readFileSync('components/ScrollRibbon.tsx', 'utf8');
code = code.replace(/className="\[object Object\]"/g, 'className=""');
code = code.replace(
  'key={0}\n          className=""\n          d="M70.00 393.09L433.71',
  'key={0}\n          style={{ fill: "rgba(22, 29, 37, 0.045)", stroke: "none" }}\n          d="M70.00 393.09L433.71'
);
fs.writeFileSync('components/ScrollRibbon.tsx', code, 'utf8');
console.log('ScrollRibbon.tsx cleaned up successfully');
