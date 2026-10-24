import fs from 'node:fs';

const html = fs.readFileSync('scripts/home.html', 'utf8');

if (html.includes('__NEXT_DATA__')) {
  console.log('App uses Pages Router (__NEXT_DATA__)');
} else if (html.includes('self.__next_f')) {
  console.log('App uses App Router (RSC self.__next_f)');
  // Let's count how many self.__next_f calls there are
  const rscMatches = [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
  console.log('RSC chunks:', rscMatches.length);
} else {
  console.log('Neither found');
}
