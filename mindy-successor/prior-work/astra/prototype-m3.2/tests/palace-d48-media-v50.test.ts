import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';

const ASSET_DIR='assets/presentation';
const PRESENTATION_PATH='content/presentation.json';
const LOCALIZATION_PATH='content/localization.json';

const expectedAssets=[
  'palace-custodian-audience.svg',
  'palace-return-home-threshold.svg',
  'palace-service-interior.svg',
  'palace-threshold-archive.svg'
] as const;

const families={
  service:{
    src:'assets/presentation/palace-service-interior.svg',
    altKey:'presentation.static.palace.service-interior.alt',
    captionKey:'presentation.static.palace.service-interior.caption',
    slots:[
      'job/palace/event/palace-progression-milestone-02-working-rhythm/default',
      'job/palace/event/palace-progression-milestone-05-trusted-service/default',
      'job/palace/event/palace-progression-milestone-08-palace-network/default',
      'job/palace/event/palace-outcome-finalize-service-life/default',
      'job/palace/event/palace-outcome-finalize-court-power/default',
      'ending/palace/service-life',
      'ending/palace/court-power'
    ]
  },
  archive:{
    src:'assets/presentation/palace-threshold-archive.svg',
    altKey:'presentation.static.palace.threshold-archive.alt',
    captionKey:'presentation.static.palace.threshold-archive.caption',
    slots:[
      'job/palace/event/palace-progression-milestone-12-crossroads/default',
      'job/palace/event/palace-progression-milestone-15-outcome-ready/default',
      'job/palace/event/palace-outcome-finalize-inner-truth/default',
      'ending/palace/inner-truth'
    ]
  },
  custodian:{
    src:'assets/presentation/palace-custodian-audience.svg',
    altKey:'presentation.static.palace.custodian-audience.alt',
    captionKey:'presentation.static.palace.custodian-audience.caption',
    slots:[
      'location/town/palace/confront-prince/default',
      'job/palace/event/palace-prince-confrontation-phase-01-audit-record/default',
      'job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default',
      'job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default',
      'job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default'
    ]
  },
  returnHome:{
    src:'assets/presentation/palace-return-home-threshold.svg',
    altKey:'presentation.static.palace.return-home-threshold.alt',
    captionKey:'presentation.static.palace.return-home-threshold.caption',
    slots:['ending/palace/return-home']
  }
} as const;

const presentation=JSON.parse(readFileSync(PRESENTATION_PATH,'utf8')) as {
  slots:Record<string,{static?:{kind:string;src:string;alt:string;altKey:string}}>
};
const localization=JSON.parse(readFileSync(LOCALIZATION_PATH,'utf8')).strings as Record<string,{ru:string;en:string}>;

test('v48 contains exactly four approved project-owned Palace SVG masters',()=>{
  const palaceAssets=readdirSync(ASSET_DIR)
    .filter(name=>name.startsWith('palace-')&&name.endsWith('.svg'))
    .sort();
  assert.deepEqual(palaceAssets,[...expectedAssets].sort());

  for(const name of expectedAssets){
    const path=join(ASSET_DIR,name);
    assert.equal(existsSync(path),true,name+' must exist');
    const svg=readFileSync(path,'utf8');

    assert.match(svg,/^<svg\b/);
    assert.match(svg,/viewBox="0 0 1200 675"/);
    assert.match(svg,/role="img"/);
    assert.doesNotMatch(svg,/<script\b/i);
    assert.doesNotMatch(svg,/<image\b/i);
    assert.doesNotMatch(svg,/<text\b/i);
    assert.doesNotMatch(svg,/\b(?:href|xlink:href)\s*=/i);
    assert.doesNotMatch(svg,/url\(\s*['"]?https?:/i);
  }
});

test('v48 SVG source stays inside the D45/D48 visual firewall vocabulary',()=>{
  const forbidden=[
    /dream/i,
    /simulation/i,
    /chosen[- ]?one/i,
    /godhood/i,
    /\bdeity\b/i,
    /\bavatar\b/i,
    /combat[- ]?boss/i,
    /romance/i,
    /world[- ]?collapse/i,
    /threshold[- ]?creator/i,
    /displacement[- ]?cause/i,
    /threshold[- ]?mechanism/i
  ];
  for(const name of expectedAssets){
    const svg=readFileSync(join(ASSET_DIR,name),'utf8');
    for(const pattern of forbidden) assert.doesNotMatch(svg,pattern,name+' violates visual firewall token '+pattern);
  }
});

test('v49 maps exactly the 17 approved fallback targets to the four D48 assets',()=>{
  const requiredSlots=new Set<string>();
  for(const family of Object.values(families)){
    for(const slotId of family.slots){
      requiredSlots.add(slotId);
      const slot=presentation.slots[slotId];
      assert.ok(slot,slotId+' must be mapped');
      assert.equal(slot.static?.kind,'image');
      assert.equal(slot.static?.src,family.src);
      assert.equal(slot.static?.altKey,family.altKey);
      assert.equal(slot.static?.alt,localization[family.altKey]?.en);
      assert.equal(existsSync(family.src),true,family.src+' must exist');
    }
  }
  assert.equal(requiredSlots.size,17);

  const invitationSlots=new Set([
    'job/palace/event/palace-invitation-day1-arrival/default',
    'job/palace/event/palace-invitation-reveal/default'
  ]);
  const palaceSlots=Object.keys(presentation.slots).filter(id=>id.includes('palace'));
  for(const slotId of palaceSlots){
    assert.equal(requiredSlots.has(slotId)||invitationSlots.has(slotId),true,'unexpected Palace slot mutation: '+slotId);
  }

  for(const invitation of invitationSlots){
    const slot=presentation.slots[invitation];
    if(slot) assert.equal(slot.static?.src,'assets/stage-town.svg',invitation+' must retain neutral town reuse');
  }
});

test('v49 provides RU/EN alt and caption parity for every D48 visual family',()=>{
  for(const family of Object.values(families)){
    for(const key of [family.altKey,family.captionKey]){
      const row=localization[key];
      assert.ok(row,key+' must exist');
      assert.ok(row.ru.trim(),key+' RU must be non-empty');
      assert.ok(row.en.trim(),key+' EN must be non-empty');
      assert.notEqual(row.ru,row.en,key+' must provide distinct RU/EN copy');
    }
  }
});

test('v49 remaps no non-Palace presentation slot to a D48 Palace asset',()=>{
  const palaceSrcs=new Set(Object.values(families).map(family=>family.src));
  for(const [slotId,slot] of Object.entries(presentation.slots)){
    if(palaceSrcs.has(slot.static?.src??'')){
      assert.match(slotId,/palace/,'D48 asset leaked into non-Palace slot '+slotId);
    }
  }
});
