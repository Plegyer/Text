import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const replacement=json('content/presentation-replacement-bundle.fixture.json');
const overridePack=json('content/presentation-override-pack-preflight.fixture.json');

type Kind='gif'|'image'|'video';

function validateMediaPath(ref:string,kind:Kind){
  if(/^[A-Za-z]:[\\/]/.test(ref)||ref.startsWith('/'))throw new Error('absolute path');
  if(ref.includes('..'))throw new Error('parent traversal');
  if(/^(?:file|https?):/i.test(ref))throw new Error('external protocol');
  if(kind==='video'&&ref.startsWith('data:'))throw new Error('data URL video');
  if(ref.startsWith('data:'))throw new Error('data URL');
  if(!/^(?:media|assets)\//.test(ref))throw new Error('non-portable root');

  const extension=ref.split('.').pop()?.toLowerCase()??'';
  const allowed=kind==='gif'
    ?new Set(['gif'])
    :kind==='video'
      ?new Set(['mp4','webm'])
      :new Set(['png','jpg','jpeg','webp','svg']);
  if(!allowed.has(extension))throw new Error('unsupported extension');
  if(extension==='json')throw new Error('gameplay JSON target');
  return ref;
}

test('all current replacement-bundle logical targets pass portable media preflight',()=>{
  for(const [presentationId,value] of Object.entries(replacement.replacements) as [string,any][]){
    assert.equal(
      validateMediaPath(value.futureGif.logicalTargetName,'gif'),
      value.futureGif.logicalTargetName,
      presentationId
    );
    assert.match(presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
  }
});

test('all current override-pack fixture refs pass media preflight',()=>{
  for(const [presentationId,entry] of Object.entries(overridePack.entries) as [string,any][]){
    if(entry.primary){
      const kind:Kind=entry.primary.kind==='gif'?'gif':entry.primary.kind==='video'?'video':'image';
      assert.equal(validateMediaPath(entry.primary.ref,kind),entry.primary.ref,presentationId);
    }
    if(entry.static){
      assert.equal(validateMediaPath(entry.static.ref,'image'),entry.static.ref,presentationId);
    }
  }
});

test('absolute filesystem paths reject',()=>{
  for(const ref of [
    '/Users/example/Desktop/replacement.gif',
    '/home/example/replacement.gif',
    'C:\\Users\\example\\replacement.gif'
  ]){
    assert.throws(()=>validateMediaPath(ref,'gif'),/absolute path/);
  }
});

test('parent-directory traversal rejects',()=>{
  for(const ref of [
    '../replacement.gif',
    'media/../replacement.gif',
    'assets/lumber/../../definitions.gif'
  ]){
    assert.throws(()=>validateMediaPath(ref,'gif'),/parent traversal/);
  }
});

test('data URLs for video reject',()=>{
  assert.throws(
    ()=>validateMediaPath('data:video/mp4;base64,AAAA','video'),
    /data URL video/
  );
});

test('unsupported extensions reject',()=>{
  for(const [ref,kind] of [
    ['media/replacement.exe','gif'],
    ['media/replacement.txt','image'],
    ['assets/replacement.mov','video'],
    ['media/replacement.zip','image']
  ] as [string,Kind][]){
    assert.throws(()=>validateMediaPath(ref,kind),/unsupported extension/);
  }
});

test('gameplay JSON cannot be used as a media target',()=>{
  for(const ref of [
    'content/definitions.json',
    'assets/definitions.json',
    'media/gameplay.json'
  ]){
    assert.throws(
      ()=>validateMediaPath(ref,'image'),
      /non-portable root|unsupported extension|gameplay JSON target/
    );
  }
});

test('valid local assets references remain portable',()=>{
  const valid:[string,Kind][]=[
    ['assets/stage-lumber.svg','image'],
    ['assets/stage-town.svg','image'],
    ['assets/lumber/shift-spring.gif','gif'],
    ['media/lumber/shift-spring.gif','gif'],
    ['assets/cutscene.webm','video']
  ];
  for(const [ref,kind] of valid)assert.equal(validateMediaPath(ref,kind),ref);
});
