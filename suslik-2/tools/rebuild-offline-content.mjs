// Run after editing JSON. Portable index.html uses content/offline-content.js,
// not fetch(); keeping the copy synchronized is required for file://.
import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('../',import.meta.url);
const data={};
for(const key of ['scenes','creation','story','music','work']){
  data[key]=JSON.parse(await readFile(new URL('content/'+key+'.json',base),'utf8'));
}
data.map=JSON.parse(await readFile(new URL('map-locations.json',base),'utf8'));
await writeFile(new URL('content/offline-content.js',base),
  'window.SUSLIK2_CONTENT = '+JSON.stringify(data)+';\n');
console.log('Updated offline content from source JSON.');
