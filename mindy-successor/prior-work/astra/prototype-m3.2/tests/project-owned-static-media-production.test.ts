import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const staticSlots=Object.entries(presentation.slots??{}).filter(([,slot]:any)=>
  slot?.static?.src?.startsWith('assets/presentation/') &&
  !/\/career-[a-z0-9-]+-shift-(spring|summer|autumn|winter)\.svg$/.test(slot.static.src)
) as [string,any][];

test('baseline project-owned static slots use current semantic IDs and bilingual alt keys',()=>{
  presentationSchema.parse(presentation);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.ok(staticSlots.length>=39);
  const sources=new Set<string>();
  for(const [id,slot] of staticSlots){
    assert.ok(known.has(id),id);
    assert.equal(slot.static.kind,'image',id);
    assert.match(slot.static.src,/^assets\/presentation\/[a-z0-9-]+\.svg$/);
    assert.match(slot.static.altKey,/^presentation\.(?:static|activity)\..+\.alt$/);
    assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
    assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    assert.ok(existsSync('dist/'+slot.static.src),'dist/'+slot.static.src);
    const source=readFileSync(slot.static.src,'utf8');
    assert.match(source,/^\s*<svg\b/i,slot.static.src);
    assert.equal(source,readFileSync('dist/'+slot.static.src,'utf8'),slot.static.src+' build copy');
    sources.add(slot.static.src);
  }
  assert.ok(sources.size>=21);
});

test('baseline project-owned static resolution does not depend on animation mode',()=>{
  const checked=applyPresentation(catalog,presentation);
  for(const [id,slot] of staticSlots){
    const animated=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'same'});
    const reduced=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'same'});
    if(slot.pool){
      assert.equal(animated.selected?.source,'override-pool',id+' animations on source');
      assert.ok(slot.pool.candidates.some((candidate:any)=>candidate.src===animated.selected?.src),id+' animations on pool member');
      assert.ok(slot.pool.candidates.some((candidate:any)=>candidate.altKey===animated.selected?.altKey),id+' animations on altKey');
    }else{
      assert.equal(animated.selected?.src,slot.static.src,id+' animations on');
      assert.equal(animated.selected?.altKey,slot.static.altKey,id+' altKey');
    }
    assert.equal(reduced.selected?.src,slot.static.src,id+' animations off');
    assert.equal(reduced.selected?.altKey,slot.static.altKey,id+' altKey reduced');
  }
});

test('optional altKey preserves old overrides and deterministic GIF selection',()=>{
  const sample={
    version:1,
    texts:{},
    media:{},
    slots:{
      'job/lumber/shift/spring/default':{
        pool:{
          version:1,
          ordering:'ordered',
          selectionPolicy:'unweighted',
          candidates:[
            {key:'a',kind:'gif',src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',alt:'a',altKey:'presentation.test.a.alt'},
            {key:'b',kind:'gif',src:'data:image/gif;base64,R0lGODlhAQABAIAAAAD/AAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',alt:'b',altKey:'presentation.test.b.alt'},
            {key:'c',kind:'gif',src:'data:image/gif;base64,R0lGODlhAQABAIAAAAD/AP///ywAAAAAAQABAAACAUwAOw==',alt:'c',altKey:'presentation.test.c.alt'}
          ]
        },
        static:{
          kind:'image',
          src:'assets/presentation/career-lumber-result.svg',
          alt:'fallback',
          altKey:'presentation.static.career.lumber.result.alt'
        }
      }
    }
  };
  assert.doesNotThrow(()=>presentationSchema.parse(sample));
  const first=resolvePresentation(catalog,sample,'job/lumber/shift/spring/default',{animationsEnabled:true,occurrenceKey:'same'});
  const second=resolvePresentation(catalog,sample,'job/lumber/shift/spring/default',{animationsEnabled:true,occurrenceKey:'same'});
  assert.equal(first.selected?.candidateKey,second.selected?.candidateKey);
  assert.equal(first.selected?.altKey,second.selected?.altKey);

  assert.doesNotThrow(()=>presentationSchema.parse({
    version:1,
    texts:{},
    media:{},
    slots:{
      'job/lumber/shift/spring/default':{
        static:{kind:'image',src:'assets/stage-lumber.svg',alt:'legacy static without altKey'}
      }
    }
  }));
});
