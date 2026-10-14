/* Development-only exact-byte restoration of the author PNG from GitHub chunks.
   The portable game itself does NOT need Node; it uses foreman-spears-inline-image.js. */
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const root=new URL('../',import.meta.url);
const imageParts={SUSLIK2ForemanImageParts:[]};
imageParts.globalThis=imageParts;
for(let i=1;i<=20;i++){
 const name='assets/foreman/embedded/part-'+String(i).padStart(2,'0')+'.js';
 runInNewContext(await readFile(new URL(name,root),'utf8'),imageParts,{filename:name});
}
const encoded=imageParts.SUSLIK2ForemanImageParts.join('');
if(encoded.length!==4715968) throw new Error('Incomplete original image source');
const bytes=Buffer.from(encoded,'base64');
const digest=createHash('sha256').update(bytes).digest('hex');
if(bytes.length!==3536974||
 digest!=='015f3c0d6e1602abfa8580e4a98ce8c95d3322e7bf5b60a257b5d1f9503ab95e')
 throw new Error('PNG is not identical to the original upload');
const output=new URL('assets/foreman/spears-handover.png',root);
await mkdir(new URL('assets/foreman/',root),{recursive:true});
await writeFile(output,bytes);
console.log('Restored original PNG:',output.pathname,bytes.length,'bytes',digest);
