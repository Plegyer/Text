import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const src=readFileSync('src/ui/mediaSmoke.ts','utf8');
const app=readFileSync('src/ui/app.ts','utf8');
const builder=readFileSync('scripts/build.mjs','utf8');
const index=readFileSync('src/ui/index.html','utf8');
const gif=['01-animal.gif','02-running.gif','03-waking.gif','04-explaining.gif','05-tool.gif'];
const music=['Rum Punch Parlay.mp3','Clockwork Cupcake.mp3','Tiki Chase.mp3','Banjo Barn Shuffle.mp3','Cape and Cadence.mp3','Neon Orbit Loop.mp3','Velvet Banana Split.mp3'];

test('smoke intro follows five user-specified P0/P1 steps and hooks only real arrival',()=>{
 let last=-1;
 for(const name of gif){const i=src.indexOf("file:'"+name+"'");assert.ok(i>last,'P0/P1 order '+name);last=i;}
 assert.match(app,/smokeMaybeShowIntro\(\)/);
 assert.match(app,/cmd\.type==='action'&&cmd\.id==='arrival'/);
 assert.match(src,/sessionStorage\.getItem/);
 assert.match(src,/smokeOpenPreview/);
});
test('all seven supplied tracks are mapped to playable local music contexts',()=>{
 for(const name of music)assert.ok(src.includes("file:'"+name+"'"),name);
 for(const key of ['town','creation','intro','work','palace','activity','night'])assert.ok(src.includes("key:'"+key+"'"),key);
 assert.match(src,/sound\.volume=volume/);
 assert.match(src,/sound\.play\(/);
 assert.match(app,/smokeSetContext\(smokeContext\)/);
});
test('packaged smoke accepts local media and graceful missing-file diagnostics',()=>{
 assert.match(builder,/media-smoke\.css/);
 assert.match(index,/media-smoke\.css/);
 assert.match(src,/Missing GIF|GIF не найден/);
 assert.match(src,/MP3 not found|MP3 не найден/);
 // Binary assets are intentionally separate from the release repository until
 // their distribution rights are verified and the user's smoke ZIP is supplied.
 for(const file of gif.map(x=>'assets/smoke/gif/'+x).concat(music.map(x=>'assets/smoke/music/'+x))){
   if(existsSync(file)){
     const buf=readFileSync(file);
     if(file.endsWith('.gif'))assert.equal(buf.toString('ascii',0,3),'GIF');
     else assert.ok(buf.length>1000,'MP3 byte presence '+file);
   }
 }
});
