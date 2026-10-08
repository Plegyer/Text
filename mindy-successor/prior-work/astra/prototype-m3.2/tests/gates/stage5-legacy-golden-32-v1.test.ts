/**
 * Stage 5: 32 mandatory assertions of Chat4 legacy Golden v54 are linked to
 * executed accepted production test witnesses, with additional direct checks.
 * This is NOT 32 novel independent end-to-end scenarios. It executes the
 * mapped producer suites once and verifies the exact A01..A32 witnesses.
 * Isolated under tests/gates: NOT globbed into npm test; run explicitly.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {catalog,definitions} from '../helpers.ts';
import {freshSave,parseSave,energyMax,palaceAvailable} from '../../src/core/engine.ts';
import {ordinaryHardWorkCareers} from '../../src/core/schema.ts';

const gate=JSON.parse(readFileSync('../../../docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const pres=JSON.parse(readFileSync('content/presentation.json','utf8')).slots;
const files={
  eco:'tests/economy-start-balance-v14.test.ts',
  hw:'tests/hard-work-bonus-mapping-v13.test.ts',
  progress:'tests/ordinary-hard-work-meta-production.test.ts',
  lumber:'tests/lumber-stay-retirement-v17.test.ts',
  strong:'tests/strong-meta-engine-integration-v7.test.ts',
  debt:'tests/secret-debt-activity-energy-compat-v20.test.ts',
  activity:'tests/activity.test.ts',
  night:'tests/night-flow.test.ts'
} as const;
type FileKey=keyof typeof files;
type Witness=readonly [FileKey,string];
const witness:Record<string,readonly Witness[]>={
  A01:[['eco','fresh life starts at Lust 5']],
  A02:[['eco','schema-5 migration preserves stored Lust']],
  A03:[['eco','fresh life starts at Lust 5']],
  A04:[['eco','fresh life starts at Lust 5']],
  A05:[['eco','ordinary bases are exactly 35/37']],
  A06:[['eco','ordinary bases are exactly 35/37']],
  A07:[['eco','can never raise an ordinary shift above the D46 cap 120']],
  A08:[['eco','cap is isolated to the ten ordinary shift identities']],
  A09:[['progress','all ten production Hard Work endings grant']],
  A10:[['hw','production catalog matches the accepted profession mapping exactly']],
  A11:[['hw','arbitrary earned subset remains profession-package selection']],
  A12:[['hw','arbitrary earned subset remains profession-package selection']],
  A13:[['hw','arbitrary earned subset remains profession-package selection'],['strong','creation resolves one Keystone']],
  A14:[['lumber','live ordinary-career surface is exactly canonical 40']],
  A15:[['lumber','live ordinary-career surface is exactly canonical 40']],
  A16:[['lumber','live ordinary-career surface is exactly canonical 40']],
  A17:[['lumber','completed lumber-stay and vitality normalize']],
  A18:[['lumber','completed lumber-stay and vitality normalize']],
  A19:[['lumber','profile merge dedupes historical perk']],
  A20:[['lumber','existing historical RunResult and transaction proof are preserved']],
  A21:[['lumber','eligible-only retired ending is removed']],
  A22:[['lumber','committed but unfinished retired ending is cancelled']],
  A23:[['lumber','ended pre-RunResult lumber-stay gets deterministic']],
  A24:[['lumber','profile merge dedupes historical perk']],
  A25:[['lumber','completed lumber-stay and vitality normalize']],
  A26:[['lumber','completed lumber-stay and vitality normalize'],['strong','D23 Palace qualification is unaffected']],
  A27:[['strong','creation resolves one Keystone'],['strong','save/reload preserves current-run snapshot']],
  A28:[['debt','T1 D51 bound + normal control'],['debt','T11 unrelated third -1 applies after D51 pair floor']],
  A29:[['activity','Activity entry costs exactly two daily Energy once'],['night','NightFlow advances calendar exactly once']],
  A30:[['lumber','live presentation/source inventory retires ending/lumber-stay']],
  A31:[['lumber','live presentation/source inventory retires ending/lumber-stay']],
  A32:[['lumber','live presentation/source inventory retires ending/lumber-stay']]
};
const ids=Array.from({length:32},(_,i)=>'A'+String(i+1).padStart(2,'0'));
assert.deepEqual(gate.mandatoryAssertions.map((row:any)=>row.id),ids,'Golden A01..A32 contiguous');
assert.deepEqual(Object.keys(witness).sort(),[...ids].sort(),'each Golden assertion mapped exactly once');
const suite=spawnSync(process.execPath,['--experimental-strip-types','--test',...Object.values(files)],{
  cwd:process.cwd(),encoding:'utf8',timeout:240000,maxBuffer:48*1024*1024,windowsHide:true,
  env:{...process.env,NODE_TEST_CONTEXT:undefined}
});
const tap=suite.stdout??'';
const suiteSummary='stdout tail:\n'+tap.slice(-1300)+'\nstderr tail:\n'+(suite.stderr??'').slice(-1300);
for(const id of ids){
  const index=ids.indexOf(id);
  const spec=gate.mandatoryAssertions[index] as {id:string;assert:string};
  test(id+' '+spec.assert,()=>{
    assert.equal(suite.error,undefined,suiteSummary);
    assert.equal(suite.status,0,'accepted producer runtime suites must be green\n'+suiteSummary);
    for(const [file,label] of witness[id]){
      assert.ok(files[file],'missing mapped suite '+file);
      assert.ok(tap.includes('# Subtest: ')&&tap.includes(label),'missing executed producer witness: '+id+' '+file+' '+label);
    }
    const fresh=freshSave();
    if(id==='A01')assert.equal(fresh.run.character.lust,5);
    if(id==='A03')assert.equal(fresh.run.resources.money,600);
    if(id==='A04')assert.equal(energyMax(fresh),3);
    if(id==='A05'||id==='A06')for(const career of ordinaryHardWorkCareers){
      const a=definitions.actions.find((a:any)=>a.id===career+'.shift');
      assert.equal(a?.wage?.base,career==='lumber'?35:37,career);
    }
    if(id==='A14')assert.equal(definitions.endings.some((x:any)=>x.id==='lumber-stay'),false);
    if(id==='A15'){
      const prefixes=ordinaryHardWorkCareers.map(c=>'ending.'+c+'.');
      assert.equal(definitions.endings.filter((e:any)=>prefixes.some(p=>e.id.startsWith(p))).length,40);
    }
    if(id==='A16')assert.equal(definitions.endings.some((x:any)=>x.reward==='vitality'),false);
    if(['A17','A18','A19','A24','A25','A26'].includes(id)){
      const history=freshSave({completedEndings:['lumber-stay'],unlocks:['vitality']});
      assert.deepEqual(history.meta.activeLegacyPerks,['legacy.lumber-stay.vitality']);
      assert.equal(history.meta.unlocks.includes('vitality'),false);
      assert.equal(energyMax(history),4);
      assert.equal(history.meta.hardWorkProgress.length,0);
      assert.equal(palaceAvailable(history.meta,[]),false);
    }
    if(id==='A20'||id==='A23'){
      const history=freshSave({completedEndings:['lumber-stay']});
      history.run.status='ended';
      history.run.endings.committed='lumber-stay';
      const parsed=parseSave(JSON.stringify(history),catalog);
      const twice=parseSave(JSON.stringify(parsed),catalog);
      assert.deepEqual(twice,parsed);
    }
    if(id==='A30')assert.equal(pres['ending/lumber-stay'],undefined);
    if(id==='A31'){
      for(const k of ['ending.lumber-stay.title','ending.lumber-stay.description','unlock.vitality.label','presentation.static.ending.lumber-stay.alt','presentation.static.ending.lumber-stay.caption'])assert.equal(loc[k],undefined,k);
    }
    if(id==='A32'){
      for(const k of ['legacy.ending.lumber-stay.title','legacy.ending.lumber-stay.description','legacy.perk.lumber-stay-vitality.label','ui.legacy.historicalTitle','ui.ending.state.historical'])for(const lang of ['ru','en'])assert.ok(loc[k]?.[lang]?.trim(),k+' '+lang);
    }
  });
}
