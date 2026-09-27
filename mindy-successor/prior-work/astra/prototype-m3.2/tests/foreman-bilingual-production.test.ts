import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const lumber=JSON.parse(readFileSync('content/packs/lumber-production.json','utf8'));
const night=JSON.parse(readFileSync('content/packs/lumber-night-production.json','utf8'));

test('Foreman shipped relationship and Night surfaces are fully RU EN localized',()=>{
 const keys=[
  'event.lumber.foreman-notice.title',
  'event.lumber.foreman-notice.variant.default.text',
  'event.lumber.foreman-notice.choice.professional.label',
  'event.lumber.foreman-notice.choice.professional.text',
  'nightChoice.lumber.foreman.night.label',
  'event.lumber-night.foreman-professional.title',
  'event.lumber-night.foreman-professional.variant.default.text',
  'event.lumber-night.foreman-professional.choice.continue.label',
  'event.lumber-night.foreman-professional.choice.continue.text',
  'media.relationship.lumber.foreman.professional.alt',
  'media.relationship.lumber.foreman.night.professional.alt'
 ];
 for(const key of keys){
  assert.ok(localization[key],key);
  assert.ok(localization[key].ru?.trim(),key+' ru');
  assert.ok(localization[key].en?.trim(),key+' en');
  assert.equal(/(^|[._/-])(ru|en)([._/-]|$)/i.test(key),false,key);
 }
});

test('Foreman localization does not alter locked relationship Night or Hard Work mechanics',()=>{
 const rel=definitions.relationships.find((x:any)=>x.id==='lumber.foreman');
 assert.deepEqual(rel.stages,['unknown','professional','route-professional']);
 const choice=definitions.nightChoices.find((x:any)=>x.id==='lumber.foreman.night');
 assert.ok(choice);
 assert.equal(choice.nextDayEnergyDelta,0);
 assert.deepEqual(choice.nextDayEffects,[]);
 assert.deepEqual(choice.effects,[{kind:'incrementRelationshipCounter',relationship:'lumber.foreman',counter:'night_meetings',amount:1}]);

 const event=lumber.events.find((x:any)=>x.id==='lumber.foreman-notice');
 assert.ok(event);
 assert.deepEqual(event.choices[0].effects,[
  {kind:'advanceRelationship',relationship:'lumber.foreman',transition:'notice-work'},
  {kind:'advanceRelationship',relationship:'lumber.foreman',transition:'choose-professional'}
 ]);
 const nightEvent=night.events.find((x:any)=>x.id==='lumber-night.foreman-professional');
 assert.ok(nightEvent);
 assert.equal(nightEvent.nightPolicy.consumesNight,true);
 assert.equal(nightEvent.reactionTriggers[0].choice,'lumber.foreman.night');

 const hardWork=definitions.endings.find((x:any)=>x.id==='hardWork:lumber');
 assert.ok(hardWork);
 assert.deepEqual(hardWork.conditions,[{kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}]);
});
