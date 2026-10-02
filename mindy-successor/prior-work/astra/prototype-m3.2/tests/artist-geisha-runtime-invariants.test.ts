import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/ARTIST_GEISHA_RUNTIME_CONTRACT_v1.json','utf8'));

test('Artist/Geisha v16 preserves shipped action, seasonal, and Hard Work identities',()=>{
  const action=definitions.actions.find((a:any)=>a.id==='artist-geisha.shift');
  assert.ok(action);
  assert.deepEqual(action.cost,{money:0,energy:1});
  assert.deepEqual(action.conditions,[{
    kind:'any',
    conditions:[
      {kind:'all',conditions:[
        {kind:'stat',stat:'creativity',op:'gte',value:35},
        {kind:'stat',stat:'manners',op:'gte',value:25},
        {kind:'stat',stat:'grooming',op:'gte',value:30}
      ]},
      {kind:'calendarYear',op:'gte',value:3}
    ]
  }]);
  assert.deepEqual(action.wage,{
    base:15,
    weights:[
      {stat:'manners',factor:0.3},
      {stat:'charm',factor:0.3},
      {stat:'sexuality',factor:0.15},
      {stat:'dexterity',factor:0.15}
    ]
  });
  assert.deepEqual(action.scenes.map((x:any)=>x.id),[
    'spring.default','summer.default','autumn.default','winter.default'
  ]);

  const expectedSeasonal:any={
    spring:[
      {kind:'modifyStat',stat:'manners',delta:1},
      {kind:'modifyStat',stat:'charm',delta:1}
    ],
    summer:[
      {kind:'modifyStat',stat:'charm',delta:1},
      {kind:'modifyStat',stat:'dexterity',delta:1}
    ],
    autumn:[
      {kind:'modifyStat',stat:'manners',delta:1},
      {kind:'modifyStat',stat:'sexuality',delta:1}
    ],
    winter:[
      {kind:'modifyStat',stat:'charm',delta:1},
      {kind:'modifyStat',stat:'reason',delta:1}
    ]
  };
  const counters:any={
    spring:'spring_performances',
    summer:'summer_performances',
    autumn:'autumn_performances',
    winter:'winter_performances'
  };
  for(const season of ['spring','summer','autumn','winter']){
    assert.deepEqual(action.seasonal[season].slice(0,2),expectedSeasonal[season],season);
    assert.deepEqual(action.seasonal[season][2],{
      kind:'incrementCareerCounter',
      career:'artist-geisha',
      counter:counters[season],
      amount:1
    });
    assert.equal(action.seasonal[season].length,3,season);
  }

  const ending=definitions.endings.find((e:any)=>e.id==='ending.artist-geisha.hard-work');
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',career:'artist-geisha',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.equal(ending.reward,'artist-geisha.hardwork.compat');
  assert.deepEqual(ending.metaRewards,[{
    kind:'hardWork',rewardId:'hardWork:artist-geisha',career:'artist-geisha'
  }]);
  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.artist-geisha.')).map((e:any)=>e.id),
    ['ending.artist-geisha.hard-work']
  );
});

test('Artist/Geisha contract matches the typed career and leaves open authority null',()=>{
  const career=definitions.careers.find((c:any)=>c.id==='artist-geisha');
  assert.ok(career);
  assert.deepEqual(career.stages,contract.career.stages);
  assert.deepEqual(career.transitions.map((x:any)=>x.id),contract.career.transitions);

  assert.deepEqual(contract.unresolved,{
    finalFantasyFramingOrName:null,
    exactArtDisciplines:null,
    contestSubsystem:null,
    npcIdentities:null,
    salaryRetuning:null,
    schoolThresholds:null,
    schoolProducerPublicFacts:null,
    complexEndingIds:null,
    genericPatronSystem:null,
    palaceAccessFromArtistCareer:null
  });
  assert.equal(contract.endings.masterArtist,null);
  assert.equal(contract.endings.patronNetwork,null);
  assert.equal(contract.endings.courtInvitation,null);

  const exactItems:any={
    artist_formal_attire:['artist_formal_presence'],
    artist_performance_kit:['artist_performance_ready'],
    artist_invitation_token:['artist_handle_invitation']
  };
  for(const [id,capabilities] of Object.entries(exactItems)){
    const item=definitions.itemDefinitions.find((x:any)=>x.id===id);
    assert.ok(item,id);
    assert.deepEqual(item.capabilities,capabilities,id);
  }
});

test('Artist night choices remain ordinary voluntary Night alternatives',()=>{
  const ids=[
    'artist-geisha.night.rehearsal',
    'artist-geisha.night.salon',
    'artist-geisha.night.mentor-review'
  ];
  for(const id of ids){
    const choice=definitions.nightChoices.find((x:any)=>x.id===id);
    assert.ok(choice,id);
    assert.equal(choice.nextDayEnergyDelta,0,id);
    assert.deepEqual(choice.nextDayEffects,[],id);
  }
  assert.ok(definitions.nightChoices.some((x:any)=>x.id==='school.night_study.arts_and_performance.creativity'),
    'Artist Night content must coexist with the shipped School night-study menu');
});
