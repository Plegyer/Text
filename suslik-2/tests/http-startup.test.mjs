import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {readFile} from 'node:fs/promises';
import {setTimeout as delay} from 'node:timers/promises';

async function freePort() {
  const socket=createServer();
  await new Promise((resolve,reject) => socket.once('error',reject).listen(0,'127.0.0.1',resolve));
  const port=socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  return port;
}

test('the optional HTTP server still serves modules, offline scripts and the real GIF',async()=>{
  const port=await freePort();
  const server=spawn(process.execPath,['server.mjs'],{
    cwd:new URL('..',import.meta.url).pathname,
    env:{...process.env,PORT:String(port)},
    stdio:['ignore','pipe','pipe']
  });
  try {
    let loaded=false;
    for(let n=0;n<45;n++) {
      try {const r=await fetch(`http://127.0.0.1:${port}/`); if(r.ok){loaded=true; break;}}
      catch {}
      await delay(50);
    }
    assert.equal(loaded,true,'game server did not start');
    for(const file of ['src.js','creation-state.mjs','music-director.mjs']){
      const response=await fetch(`http://127.0.0.1:${port}/${file}`);
      assert.equal(response.status,200,file);
      assert.match(response.headers.get('content-type'),/^text\/javascript/,file);
    }
    for(const file of ['content/scenes.json','content/story.json']) {
      const response=await fetch(`http://127.0.0.1:${port}/${file}`);
      assert.equal(response.status,200,file);
      assert.match(response.headers.get('content-type'),/^application\/json/,file);
    }
    const gifResponse=await fetch(`http://127.0.0.1:${port}/assets/intro-allow-01.gif`);
    assert.equal(gifResponse.status,200);
    assert.match(gifResponse.headers.get('content-type'),/^image\/gif/);
    const bytes=new Uint8Array(await gifResponse.arrayBuffer());
    assert.equal(new TextDecoder().decode(bytes.slice(0,6)),'GIF89a');
    assert.ok(bytes.length>1_000_000);
    const audio=await fetch(`http://127.0.0.1:${port}/assets/music/Clockwork%20Cupcake.mp3`);
    assert.equal(audio.status,200);
    assert.match(audio.headers.get('content-type'),/^audio\/mpeg/);
    const audioBytes=new Uint8Array(await audio.arrayBuffer());
    assert.equal(new TextDecoder().decode(audioBytes.slice(0,3)),'ID3');
    const fall=await fetch(`http://127.0.0.1:${port}/assets/preworld-fall-04.png`);
    assert.equal(fall.status,200);
    assert.match(fall.headers.get('content-type'),/^image\/png/);
    const html=await (await fetch(`http://127.0.0.1:${port}/`)).text();
    assert.match(html,/<script defer src="content\/offline-content\.js"><\/script>/);
    assert.match(html,/<script defer src="offline\.js"><\/script>/);
    assert.match(html,/Загрузка SUSLIK 2/);
  } finally {
    server.kill();
    await new Promise(resolve => {if(server.exitCode!==null)resolve(); else {server.once('exit',resolve);setTimeout(resolve,1000).unref();}});
  }
});

test('portable Windows launch opens index.html without requiring Node.js',async()=>{
  const play=await readFile(new URL('../PLAY SUSLIK 2.cmd',import.meta.url),'utf8');
  const installer=await readFile(new URL('../INSTALL OR UPDATE SUSLIK 2.cmd',import.meta.url),'utf8');
  const index=await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.match(play,/start "" "%~dp0index\.html"/);
  assert.doesNotMatch(play,/node|npm|cscript|powershell/i);
  assert.match(index,/content\/offline-content\.js/);
  assert.match(index,/offline\.js/);
  assert.match(installer,/LOCALAPPDATA%\\SUSLIK2/);
});
