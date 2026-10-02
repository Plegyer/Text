import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const baseline=JSON.parse(readFileSync('tests/ordinary-work-seasonal-negative-tradeoffs-baseline.fixture.json','utf8'));

const seasons=['spring','summer','autumn','winter'] as const;
const approved:any={
  lumber:{spring:'grooming',winter:'sociability'},
  'satyr-maid':{summer:'grooming',autumn:'endurance'},
  'undead-farm':{spring:'grooming',autumn:'sociability'},
  tavern:{spring:'grooming',summer:'endurance'},
  hunter:{spring:'grooming',winter:'sociability'},
  guard:{summer:'grooming',winter:'sociability'},
  merchant:{summer:'endurance',winter:'strength'},
  'artist-geisha':{summer:'endurance',autumn:'reason'},
  assassin:{spring:'grooming',winter:'sociability'},
  prostitute:{summer:'grooming',winter:'creativity'}
};

function conditionStats(conditions:any[],out=new Set<string>()){
  for(const condition of conditions??[]){
    if(condition.kind==='stat')out.add(condition.stat);
    if(Array.isArray(condition.conditions))conditionStats(condition.conditions,out);
    if(condition.condition)conditionStats([condition.condition],out);
  }
  return out;
}

function preservedSeason(effects:any[]){
  return effects.filter(effect=>!(effect.kind==='modifyStat'&&effect.delta<0));
}

test('approved ordinary-work tradeoff map is exact: two -1 seasons per profession and no Lust',()=>{
  assert.deepEqual(Object.keys(approved),baseline.ordinaryRoster);
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
});

test('approved tradeoffs never cancel a same-season positive stat or hit current unlock/wage core',()=>{
  for(const career of baseline.ordinaryRoster){
    const action=definitions.actions.find((item:any)=>item.id===career+'.shift');
    assert.ok(action,career);
    const unlock=conditionStats(action.conditions);
    const wage=new Set((action.wage?.weights??[]).map((item:any)=>item.stat));
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
        assert.equal(unlock.has(effect.stat),false,career+' '+season+' unlock collision');
        assert.equal(wage.has(effect.stat),false,career+' '+season+' wage collision');
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

test('Lumber is normalized to only Spring Grooming -1 and Winter Sociability -1',()=>{
  const action=definitions.actions.find((item:any)=>item.id==='lumber.shift');
  assert.ok(action);
  const actual:any[]=[];
  for(const season of seasons){
    for(const effect of action.seasonal[season]){
      if(effect.kind==='modifyStat'&&effect.delta<0)actual.push({season,stat:effect.stat,delta:effect.delta});
    }
  }
  assert.deepEqual(actual,[
    {season:'spring',stat:'grooming',delta:-1},
    {season:'winter',stat:'sociability',delta:-1}
  ]);
  assert.equal(JSON.stringify(action.seasonal.summer).includes('"delta":-1'),false);
  assert.equal(JSON.stringify(action.seasonal.autumn).includes('"delta":-1'),false);
});
