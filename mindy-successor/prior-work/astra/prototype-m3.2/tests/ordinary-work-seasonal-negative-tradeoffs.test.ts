import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const baseline=JSON.parse(readFileSync('tests/ordinary-work-seasonal-negative-tradeoffs-baseline.fixture.json','utf8'));

const seasons=['spring','summer','autumn','winter'] as const;
const approved:any={
  lumber:{spring:'dexterity',winter:'strength'},
  'satyr-maid':{summer:'sociability',autumn:'endurance'},
  'undead-farm':{spring:'reason',autumn:'strength'},
  tavern:{spring:'reason',summer:'wits'},
  hunter:{spring:'endurance',winter:'dexterity'},
  guard:{summer:'manners',winter:'reason'},
  merchant:{summer:'wits',winter:'manners'},
  'artist-geisha':{summer:'manners',autumn:'dexterity'},
  assassin:{spring:'reason',winter:'manners'},
  prostitute:{summer:'sexuality',winter:'endurance'}
};

function preservedSeason(effects:any[]){
  return effects.filter(effect=>!(effect.kind==='modifyStat'&&effect.delta<0));
}

test('D31 ordinary-work tradeoff map is exact: two -1 seasons per profession, 20 total, no Lust',()=>{
  assert.deepEqual(Object.keys(approved),baseline.ordinaryRoster);
  let totalNegatives=0;
  for(const career of baseline.ordinaryRoster){
    const action=definitions.actions.find((item:any)=>item.id===career+'.shift');
    assert.ok(action,career);
    const negatives:any[]=[];
    for(const season of seasons){
      const seasonNegatives=action.seasonal[season].filter((effect:any)=>
        effect.kind==='modifyStat'&&effect.delta<0
      );
      assert.ok(seasonNegatives.length<=1,career+' '+season);
      for(const effect of seasonNegatives)negatives.push({season,...effect});
    }
    assert.equal(negatives.length,2,career);
    totalNegatives+=negatives.length;
    assert.deepEqual(
      Object.fromEntries(negatives.map(item=>[item.season,item.stat])),
      approved[career],
      career
    );
    for(const effect of negatives){
      assert.equal(effect.delta,-1,career+' '+effect.season);
      assert.notEqual(effect.stat,'lust',career+' '+effect.season);
    }
  }
  assert.equal(totalNegatives,20);
});

test('D31 tradeoffs never cancel same-season positives and every target is replenished by another season',()=>{
  for(const career of baseline.ordinaryRoster){
    const action=definitions.actions.find((item:any)=>item.id===career+'.shift');
    assert.ok(action,career);
    for(const season of seasons){
      const effects=action.seasonal[season];
      const positive=new Set(effects.filter((effect:any)=>
        effect.kind==='modifyStat'&&effect.delta>0
      ).map((effect:any)=>effect.stat));
      const negative=effects.filter((effect:any)=>
        effect.kind==='modifyStat'&&effect.delta<0
      );
      for(const effect of negative){
        assert.equal(positive.has(effect.stat),false,career+' '+season+' same-stat cancellation');
        const replenishedElsewhere=seasons.some(other=>
          other!==season&&action.seasonal[other].some((candidate:any)=>
            candidate.kind==='modifyStat'&&candidate.stat===effect.stat&&candidate.delta>0
          )
        );
        assert.equal(replenishedElsewhere,true,career+' '+season+' floor-aware replenishment');
      }
    }
  }
});

test('tradeoff implementation preserves costs, shift counters, wages, unlocks, positives and non-stat season effects',()=>{
  for(const career of baseline.ordinaryRoster){
    const expected=baseline.careers[career];
    const action=definitions.actions.find((item:any)=>item.id===career+'.shift');
    assert.ok(action,career);
    assert.deepEqual(action.cost,expected.cost,career+' cost');
    assert.deepEqual(action.effects,expected.effects,career+' shift effects');
    assert.deepEqual(action.wage,expected.wage,career+' wage');
    assert.deepEqual(action.conditions,expected.conditions,career+' unlock');
    for(const season of seasons){
      assert.deepEqual(
        preservedSeason(action.seasonal[season]),
        expected.seasonal[season],
        career+' '+season+' positive/non-stat preservation'
      );
    }
  }
});

test('all ten ordinary Hard Work endings remain exactly the accepted 50-shift contracts',()=>{
  for(const career of baseline.ordinaryRoster){
    const ending=definitions.endings.find((item:any)=>item.id==='ending.'+career+'.hard-work');
    assert.ok(ending,career);
    const expected=baseline.careers[career].hardWork;
    assert.deepEqual(ending.conditions,expected.conditions,career+' conditions');
    assert.deepEqual(ending.metaRewards,expected.metaRewards,career+' meta rewards');
    assert.equal(ending.reward,expected.reward,career+' reward');
    assert.deepEqual(ending.conditions,[{
      kind:'careerCounter',career,counter:'completed_shifts',op:'gte',value:50
    }],career+' 50-shift gate');
  }
});

test('Lumber D31 targets are only Spring Dexterity -1 and Winter Strength -1',()=>{
  const action=definitions.actions.find((item:any)=>item.id==='lumber.shift');
  assert.ok(action);
  const actual:any[]=[];
  for(const season of seasons){
    for(const effect of action.seasonal[season]){
      if(effect.kind==='modifyStat'&&effect.delta<0)actual.push({season,stat:effect.stat,delta:effect.delta});
    }
  }
  assert.deepEqual(actual,[
    {season:'spring',stat:'dexterity',delta:-1},
    {season:'winter',stat:'strength',delta:-1}
  ]);
  assert.equal(JSON.stringify(action.seasonal.summer).includes('"delta":-1'),false);
  assert.equal(JSON.stringify(action.seasonal.autumn).includes('"delta":-1'),false);
});
