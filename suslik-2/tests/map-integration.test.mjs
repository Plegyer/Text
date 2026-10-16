import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=new URL('../',import.meta.url);
const read=async path=>await readFile(new URL(path,base),'utf8');
const map=JSON.parse(await read('map-locations.json'));
const scenes=JSON.parse(await read('content/scenes.json'));
const overlaps=(a,b)=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h;

test('final author-supplied intro scene enters integrated map, not a debug route',()=>{
  assert.equal(scenes.scenes['intro-06'].actions[0].target,'game-main');
  assert.equal(scenes.scenes['game-main'].kind,'map');
  assert.equal(scenes.scenes['game-main'].music,'menu');
});
test('GitHub map permanent location IDs and initial access are preserved',()=>{
  const expected=['sawmill','satyr_bar','undead_farm','tavern','hunters','guard','arts','assassin','merchants','brothel','school','castle','slave_market'];
  assert.equal(map.sourceCommit,'f5ec253da65153dea1b74866815631bb33febf43');
  assert.deepEqual(map.locations.map(x=>x.id),expected);
  assert.deepEqual(map.initialVisible,['sawmill','satyr_bar','undead_farm','school']);
  assert.equal(map.background,'assets/map/map-background.webp');
  for(const loc of map.locations)assert.equal(loc.image,`assets/map/buildings/${loc.id}.png`);
});
test('GitHub click zones lie within the map and do not overlap',()=>{
  const {width,height}=map.coordinateSystem;
  for(const loc of map.locations){
    for(const shape of [loc.position,loc.hit]) {
      assert.ok(shape.x>=0&&shape.y>=0&&shape.w>0&&shape.h>0);
      assert.ok(shape.x+shape.w<=width&&shape.y+shape.h<=height);
    }
    assert.ok(overlaps(loc.position,loc.hit));
  }
  for(let i=0;i<map.locations.length;i++)for(let j=0;j<i;j++)assert.ok(!overlaps(map.locations[i].hit,map.locations[j].hit));
});
test('offline game uses only initial 4 hit areas and no invented stat thresholds',async()=>{
  const js=await read('offline.js');
  const offline=await read('content/offline-content.js');
  assert.match(js,/const available=new Set\(data\.initialVisible\)/);
  assert.match(js,/const accessible=data\.locations\.filter\(loc=>available\.has\(loc\.id\)\)/);
  assert.doesNotMatch(js,/data\.locations\.map\(loc=>openLocation/);
  assert.match(offline,/SUSLIK2_CONTENT =/);
  assert.match(offline,/"initialVisible":\["sawmill","satyr_bar","undead_farm","school"\]/);
});

test('all fourteen authored map art files are bundled, genuine and consistent with the manifest',async()=>{
  const {createHash}=await import('node:crypto');
  const {stat}=await import('node:fs/promises');
  const githubBlobHashes={
    'map-background.webp':'633761d1e6f20e23ab6dea8e43f76d6d97a0ebcc',
    'arts.png':'11b5e8113ebe8a5a93b29ad9ad37bc0651f048ad',
    'assassin.png':'b7963ac07b5d390ae40ec9393f1a207b1e92893d',
    'brothel.png':'d816915d8e8bb46774baa5697e45f5c0dd3fe55b',
    'castle.png':'330ddc5544cdf5190c1fddadd5baa3bad0c42533',
    'guard.png':'5e0635b054b764a16242b17bffed129438b3c3c9',
    'hunters.png':'a6c1d53821ee0abea5aedec393ada6f782a9de44',
    'merchants.png':'1a49895645d1f13a5960eebfa92579e7b64b42b0',
    'satyr_bar.png':'6fe62306a1d68afcf27c018b7f06c2aeb9ec76b4',
    'sawmill.png':'7f23facbfec2c06ed596a2b84406a4446da0ba05',
    'school.png':'4e6fcfd4a4ce19ea3620d38ab9c57c6fd5bc260b',
    'slave_market.png':'0056b5757ef231ca0ca7481da27b75ba84868f13',
    'tavern.png':'9a49110d0ece7d96544d1e739d12112525d4c74a',
    'undead_farm.png':'b8d650514a5b9213c1c52fdd94e4e70d8e171ae3'
  };
  // The original GitHub blob IDs are verified for each image, with no placeholders.
  const paths=[map.background,...map.locations.map(x=>x.image)];
  assert.equal(paths.length,14);
  for(const path of paths){
    const name=path.split('/').at(-1);
    const buffer=await readFile(new URL(path,base));
    assert.ok(buffer.byteLength>10000,name);
    assert.ok((await stat(new URL(path,base))).isFile(),name);
    const hash=createHash('sha1').update(`blob ${buffer.byteLength}\0`).update(buffer).digest('hex');
    assert.equal(hash,githubBlobHashes[name],name);
    if(name.endsWith('.png')){
      assert.equal(buffer.subarray(0,8).toString('hex'),'89504e470d0a1a0a',name);
      assert.equal(buffer[25],6,`PNG must retain an alpha channel: ${name}`);
    }else{
      assert.equal(buffer.subarray(0,4).toString(),'RIFF');
      assert.equal(buffer.subarray(8,12).toString(),'WEBP');
    }
  }
});

test('offline map embeds the exact 13 location definitions; no standalone demo is required',async()=>{
  const bundled=await read('content/offline-content.js');
  const payload=JSON.parse(bundled.split('window.SUSLIK2_CONTENT = ',2)[1].trim().replace(/;$/,''));
  assert.deepEqual(payload.map,map);
  assert.deepEqual(payload.scenes,scenes);
  assert.match(await read('index.html'),/src="offline\.js"/);
  assert.doesNotMatch(await read('offline.js'),/fetch\(/);
});
