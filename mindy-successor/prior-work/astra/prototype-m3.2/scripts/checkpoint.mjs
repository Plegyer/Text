import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const status=git('status','--porcelain');
if(status){console.error('Сначала завершите проверку, обновите docs/STATUS.md и создайте commit. Изменения:\n'+status);process.exit(1);}
const sha=git('rev-parse','--short','HEAD');const stamp=new Date().toISOString().replace(/[:.]/g,'-');
mkdirSync('release',{recursive:true});const prefix=`release/checkpoint-${stamp}-${sha}`;
git('archive','--format=zip',`--output=${prefix}.zip`,'HEAD');git('bundle','create',`${prefix}.bundle`,'--all');
const entries=['zip','bundle'].map(ext=>{const file=`${prefix}.${ext}`;return {file,sha256:createHash('sha256').update(readFileSync(file)).digest('hex')};});
writeFileSync(prefix+'.json',JSON.stringify({commit:git('rev-parse','HEAD'),created:stamp,files:entries,note:'Copy all three files to a second device or remote repository. Local git alone is not a durable backup.'},null,2));
console.log(`Контрольная точка: ${prefix}.zip, .bundle, .json`);
