import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const lumber=JSON.parse(readFileSync('content/packs/lumber-production.json','utf8'));
const lumberNight=JSON.parse(readFileSync('content/packs/lumber-night-production.json','utf8'));
const foreman=JSON.parse(readFileSync('content/relationship-foreman-localization-v2.fixture.json','utf8'));
const ordinaryNight=JSON.parse(readFileSync('content/ordinary-night-result-localization-v2.fixture.json','utf8'));

const relationship=definitions.relationships.find((item:any)=>item.id==='lumber.foreman');

test('exact current Foreman relationship identity is unchanged',()=>{
  assert.ok(relationship);
  assert.equal(relationship.initialStage,'unknown');
  assert.deepEqual(relationship.stages,['unknown','professional','route-professional']);

  assert.deepEqual(
    relationship.transitions.map((item:any)=>item.id),
    ['notice-work','choose-professional']
  );
});

test('exact current ordinary non-School voluntary Night choices are unchanged',()=>{
  const ids=definitions.nightChoices
    .filter((choice:any)=>!choice.id.startsWith('school.night_study.'))
    .map((choice:any)=>choice.id)
    .sort();

  assert.deepEqual(ids,['lumber.foreman.night','night.sleep']);
  assert.equal(ids.some((id:string)=>id.toLowerCase().includes('debt')),false);

  const foremanNight=definitions.nightChoices.find((choice:any)=>choice.id==='lumber.foreman.night');
  assert.equal(foremanNight.nextDayEnergyDelta,0);
  assert.deepEqual(foremanNight.nextDayEffects,[]);
});

test('exact current Foreman event identities remain present',()=>{
  assert.ok(lumber.events.some((event:any)=>event.id==='lumber.foreman-notice'));
  assert.ok(lumberNight.events.some((event:any)=>event.id==='lumber-night.foreman-professional'));

  const event=lumberNight.events.find((item:any)=>item.id==='lumber-night.foreman-professional');
  assert.equal(event.sourceDomain,'lumber.foreman');
  assert.equal(event.nightPolicy.intercept,'after_choice');
  assert.equal(event.nightPolicy.consumesNight,true);
});

test('Foreman localization fixture has complete RU EN pairs and only approved namespaces',()=>{
  for(const [key,value] of Object.entries(foreman.strings) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' missing ru');
    assert.ok(value.en?.trim(),key+' missing en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
    assert.ok(
      key.startsWith('relationship.lumber.foreman.') ||
      key.startsWith('event.lumber.foreman-notice.'),
      'unexpected Foreman key '+key
    );
  }
});

test('ordinary Night localization fixture excludes School and Secret Debt ownership',()=>{
  for(const [key,value] of Object.entries(ordinaryNight.strings) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' missing ru');
    assert.ok(value.en?.trim(),key+' missing en');
    assert.equal(key.includes('school.'),false,key);
    assert.equal(key.toLowerCase().includes('debt'),false,key);
  }

  assert.deepEqual(
    ordinaryNight.invariants.ordinaryNightChoiceIds,
    ['night.sleep','lumber.foreman.night']
  );
  assert.equal(ordinaryNight.invariants.secretDebtExcluded,true);
  assert.equal(ordinaryNight.invariants.schoolExactCourseChoicesExcluded,true);
});

test('localization fixtures contain no relationship/Night mechanics, RNG, Save, or gameplay payloads',()=>{
  const forbidden=new Set([
    'conditions','condition','effects','effect','nextDayEffects','nextDayEnergyDelta',
    'transitions','transition','rng','rngState','save','Save','cost','wage','moneyCost',
    'energyCost','nightPolicy'
  ]);

  const scan=(value:any,path:string[]=[]):void=>{
    if(Array.isArray(value)){value.forEach((item,index)=>scan(item,[...path,String(index)]));return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value)){
        assert.equal(forbidden.has(key),false,'forbidden field '+[...path,key].join('.'));
        scan(child,[...path,key]);
      }
    }
  };

  scan({strings:foreman.strings});
  scan({strings:ordinaryNight.strings});
});
