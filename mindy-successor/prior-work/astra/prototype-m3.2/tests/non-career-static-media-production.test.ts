import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const expected=[
  ['school/literacy-and-numbers/lesson/default','school-course-literacy-and-numbers'],
  ['school/arcana/lesson/default','school-course-arcana'],
  ['school/rhetoric-and-social/lesson/default','school-course-rhetoric-and-social'],
  ['school/etiquette-and-presentation/lesson/default','school-course-etiquette-and-presentation'],
  ['school/field-craft/lesson/default','school-course-field-craft'],
  ['school/physical-training/lesson/default','school-course-physical-training'],
  ['school/arts-and-performance/lesson/default','school-course-arts-and-performance'],
  ['school/body-confidence/lesson/default','school-course-body-confidence'],
  ['location/town/event/school-life-content-v1-after-night-study/default','school-night-study-generic-v2'],
  ['location/town/event/poverty-street-production-helpful-summer/default','poverty-street-helpful-summer'],
  ['location/town/event/poverty-street-production-neutral-autumn/default','poverty-street-neutral-autumn'],
  ['location/town/event/poverty-street-production-pressure-winter/default','poverty-street-pressure-winter'],
  ['location/town/event/poverty-cheap-production-shared-quiet-autumn/default','poverty-cheap-shared-quiet-autumn'],
  ['location/town/event/poverty-recovery-production-small-coin-help/default','poverty-recovery-small-coin-help'],
  ['location/town/event/poverty-recovery-production-short-cleanup/default','poverty-recovery-short-cleanup'],
  ['location/town/event/poverty-recovery-production-herb-bundle/default','poverty-recovery-herb-bundle'],
  ['location/town/event/poverty-pressure-production-cold-rain/default','poverty-pressure-cold-rain'],
  ['location/town/event/poverty-pressure-production-noisy-loading/default','poverty-pressure-noisy-loading'],
  ['location/town/event/poverty-pressure-production-muddy-splash/default','poverty-pressure-muddy-splash'],
  ['activity/forest/return/success','forest-return-success-v2'],
  ['job/lumber/event/forest-result-content-v1-success/default','forest-reaction-success-v2'],
  ['activity/forest/return/escape','forest-return-escape-v2'],
  ['job/lumber/event/forest-result-content-v1-escape/default','forest-reaction-escape-v2'],
  ['activity/forest/return/failure','forest-return-failure-v2'],
  ['job/lumber/event/forest-result-content-v1-failure/default','forest-reaction-failure-v2'],
  ['relationship/lumber-foreman/lumber-foreman-notice/default','foreman-professional-milestone-v2'],
  ['relationship/lumber-foreman/lumber-night-foreman-professional/default','foreman-night-voluntary-v2']
] as const;

test('27 safe non-career semantic slots use refined project-owned static assets',()=>{
  presentationSchema.parse(presentation);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.equal(expected.length,27);
  for(const [id,key] of expected){
    assert.ok(known.has(id),id);
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id);
    assert.equal(slot.static.kind,'image',id);
    assert.equal(slot.static.src,'assets/presentation/'+key+'.svg',id);
    assert.equal(slot.static.altKey,'presentation.static.'+key+'.alt',id);
    for(const suffix of ['alt','caption']){
      const locKey='presentation.static.'+key+'.'+suffix;
      assert.ok(localization[locKey]?.ru?.trim(),locKey+' ru');
      assert.ok(localization[locKey]?.en?.trim(),locKey+' en');
    }
    assert.ok(existsSync(slot.static.src),slot.static.src);
    assert.ok(existsSync('dist/'+slot.static.src),'dist/'+slot.static.src);
    assert.equal(readFileSync('dist/'+slot.static.src,'utf8'),readFileSync(slot.static.src,'utf8'),slot.static.src+' build copy');
  }
});

test('safe non-career refinements preserve semantic identity and animation-mode independence',()=>{
  const checked=applyPresentation(catalog,presentation);
  for(const [id,key] of expected){
    const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'same'});
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'same'});
    assert.equal(on.selected?.src,'assets/presentation/'+key+'.svg',id+' on');
    assert.equal(off.selected?.src,'assets/presentation/'+key+'.svg',id+' off');
    assert.equal(on.selected?.altKey,'presentation.static.'+key+'.alt',id+' alt');
    assert.equal(off.selected?.altKey,'presentation.static.'+key+'.alt',id+' alt off');
  }
});

test('route-specific Product-open Forest assets remain absent from root production presentation',()=>{
  const serialized=JSON.stringify(presentation);
  assert.doesNotMatch(serialized,/forest-route-logging-road\.svg/);
  assert.doesNotMatch(serialized,/forest-route-old-boundary\.svg/);
  assert.equal(presentation.slots['activity/forest/route/logging-road'],undefined);
  assert.equal(presentation.slots['activity/forest/route/old-boundary'],undefined);
  assert.ok(presentation.slots['activity/forest/route/default']===undefined || presentation.slots['activity/forest/route/default']);
});
