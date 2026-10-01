import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible,resolveReactions} from '../src/core/engine.ts';
import type {ReactionFact,Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const endingId='ending.satyr-maid.boundary-mastery';

function boundaryQualified(){
  const s=started();
  s.run.progression.careers['satyr-maid']={
    stage:'boundaries',
    shifts:0,
    counters:{completed_shifts:20},
    choices:{},
    facts:[
      'first-shift-complete',
      'floor-rhythm-complete',
      'known-face-established',
      'house-regular-established',
      'school-boundaries-ready',
      'crisis-resolved',
      'crisis-boundaries',
      'boundaries-ready'
    ]
  };
  s.run.progression.relationships['satyr-maid.recurring-guest']={
    stage:'professional-trust',
    counters:{service-meetings:2},
    choices:{'night-response':'declined'},
    facts:['introduced-at-work','professional-trust-earned','night-declined']
  };
  return s;
}

function makeRunActive(s:Save){
  s.run.character.creation.remaining=0;
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  return s;
}

test('Boundary Mastery is reachable through explicit refusal and boundary choices without romance',()=>{
  const ending=catalog.definitions.endings.find(e=>e.id===endingId);
  assert.ok(ending);
  const s=boundaryQualified();
  assert.equal(eligible(ending.conditions,s,catalog),true);
  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].choices['night-response'],'declined');
  assert.equal(s.run.status,'active');
});

test('Clear Terms unlock exposes one narrow professional negotiation option in a later run',()=>{
  let s=boundaryQualified();
  s.run.endings.eligible=[endingId];
  s=dispatch(s,{type:'commitEnding',id:endingId},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.ok(s.meta.unlocks.includes('satyr-maid.clear-terms'));
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['satyr-maid.clear-terms']);

  s=dispatch(s,{type:'newLife'},catalog);
  s=makeRunActive(s);
  s.run.progression.relationships['satyr-maid.recurring-guest']={
    stage:'night-contact',
    counters:{service-meetings:2,night-meetings:1},
    choices:{'night-response':'accepted'},
    facts:['introduced-at-work','professional-trust-earned','night-met']
  };

  const fact:ReactionFact={
    kind:'relationshipTransition',
    relationship:'satyr-maid.recurring-guest',
    from:'professional-trust',
    to:'night-contact'
  };
  s=resolveReactions(s,[fact],catalog).state;
  assert.equal(s.run.pending?.eventId,'satyr-maid.recurring-guest.request');

  const event=catalog.events.find(e=>e.id==='satyr-maid.recurring-guest.request');
  assert.ok(event);
  const clearTerms=event.choices.find(c=>c.id==='clear-terms-negotiation');
  assert.ok(clearTerms);
  assert.equal(eligible(clearTerms.conditions,s,catalog),true);

  s=dispatch(s,{type:'choice',id:'clear-terms-negotiation'},catalog);
  assert.equal(s.run.progression.relationships['satyr-maid.recurring-guest'].stage,'request-open');
  assert.ok(s.run.progression.relationships['satyr-maid.recurring-guest'].facts.includes('clear-terms-used'));
});
