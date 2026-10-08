import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const endings=JSON.parse(readFileSync('content/ending-localization-production-v2.fixture.json','utf8'));
const actions=JSON.parse(readFileSync('content/ordinary-action-result-localization-v3.fixture.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

const endingIds=['guild-life','scholar-life','ending.tavern.innkeeper','ending.tavern.information-broker','ending.tavern.sanctuary','ending.lumber.hard-work','ending.lumber.forewoman','ending.lumber.forest'].sort();
const actionIds=['work','forage','brew','sell','scales','exam','deliver','visit','oddjob','repay','rent-room','rest','arrival','forest-search','tavern-talk','landlord'].sort();

test('ending and ordinary action production patches are fully merged RU EN',()=>{
 const merged={...endings.strings,...actions.strings};
 assert.equal(Object.keys(endings.strings).length,18);
 assert.equal(Object.keys(actions.strings).length,32);
 assert.equal(Object.keys(merged).length,50);
 const retired=new Set(['ending.lumber-stay.title','ending.lumber-stay.description']);
 for(const [key,value] of Object.entries(merged) as [string,{ru:string;en:string}][]){
  if(retired.has(key)){
   assert.equal(root[key],undefined,'retired live label '+key);
   continue;
  }
  assert.deepEqual(root[key],value,key);
  assert.ok(value.ru?.trim(),key+' ru');
  assert.ok(value.en?.trim(),key+' en');
 }
});

test('ending localization patch remains an exact presentation-only subset of current ending IDs',()=>{
 const currentIds=new Set(definitions.endings.map((ending:any)=>ending.id));
 for(const id of endingIds)assert.ok(currentIds.has(id),id);
 assert.equal(new Set(endingIds).size,endingIds.length);
 const raw=JSON.stringify(endings).toLowerCase();
 for(const token of ['"conditions"','"rewards"','"metarewards"','"rng"','"save"'])assert.equal(raw.includes(token),false,token);
});

test('ordinary action result patch targets exact one-scene current action identities',()=>{
 const byId=new Map(definitions.actions.map((action:any)=>[action.id,action]));
 assert.deepEqual(actions.entries.map((entry:any)=>entry.actionId).sort(),actionIds);
 for(const entry of actions.entries){
  const action:any=byId.get(entry.actionId);
  assert.ok(action,entry.actionId);
  assert.equal(action.scenes.length,1,entry.actionId);
  assert.equal(action.scenes[0].id,'default',entry.actionId);
  assert.equal(entry.sceneId,'default',entry.actionId);
  assert.equal(entry.titleKey,`action.${entry.actionId}.label`);
  assert.equal(entry.bodyKey,`action.${entry.actionId}.scene.default.text`);
 }
 const raw=JSON.stringify(actions).toLowerCase();
 for(const token of ['"conditions"','"effects"','"rewards"','"rng"','"savefields"','"cost"','"wage"'])assert.equal(raw.includes(token),false,token);
});

test('shared consumers use stable ending and action localization namespaces',()=>{
 assert.ok(app.includes("tr(`ending.${e.id}.title`,e.title)"));
 assert.ok(app.includes("tr(`ending.${e.id}.description`,e.description)"));
 assert.ok(app.includes("tr(`action.${a.id}.label`,last.title)"));
 assert.ok(app.includes("tr(`action.${action.id}.scene.${scene.id}.text`,lastText)"));
 assert.ok(app.includes("a?localizedActionSceneText(a,last.text):last.text"));
});
