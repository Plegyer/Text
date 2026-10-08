/**
 * Test-only authoritative reconstruction recipes for historical fixture debt F3-F5.
 *
 * These are NOT genuine user-save blobs.
 * Provenance is documented in fixtures/final-historical/README.md.
 *
 * The functions deliberately operate on raw JSON-shaped values before parseSave.
 * They must not import or normalize through the current production schema.
 */

function clone<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

function requireObject(value:any,label:string){
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error(`Missing raw object: ${label}`);
  return value;
}

/**
 * F3 reconstruction.
 *
 * Authority:
 * - D23 accepted-access producer at 959fb3f4e61b4237ae3afb52f5d4dfe5733b4531
 * - Palace v15 migration test on chat6/palace-prince-narrative-producer-v18
 *
 * Input requirement:
 * a serialized accepted Palace life whose worldFacts already contain
 * palace.access-granted and whose Meta does not use the obsolete palace unlock.
 *
 * Historical reconstruction:
 * - typed run.progression.palace is absent;
 * - palace.progression-complete is absent;
 * - palace.access-granted remains present.
 */
export function reconstructPalaceAccessWithoutLedger<T>(input:T):T{
  const raw:any=clone(input);
  const run=requireObject(raw.run,'run');
  const progression=requireObject(run.progression,'run.progression');
  if(!Array.isArray(progression.worldFacts))throw new Error('Missing raw worldFacts');
  if(!progression.worldFacts.includes('palace.access-granted'))throw new Error('F3 base must already contain palace.access-granted');
  if(raw.meta?.unlocks?.includes?.('palace'))throw new Error('F3 D23 base must not contain obsolete meta palace unlock');

  delete progression.palace;
  progression.worldFacts=progression.worldFacts.filter((fact:string)=>fact!=='palace.progression-complete');
  return raw;
}

/**
 * F4 reconstruction.
 *
 * Exact accepted recipe from lumber-stay-retirement-v17.test.ts:
 * "existing historical RunResult and transaction proof are preserved exactly".
 *
 * The baseline is intentionally supplied by the migration test because the
 * accepted v17 producer also starts from freshSave() and then injects the
 * historical evidence below.
 */
export function reconstructLumberStayWithRunResult<T>(input:T):T{
  const raw:any=clone(input);
  const meta=requireObject(raw.meta,'meta');
  const run=requireObject(raw.run,'run');
  const endings=requireObject(run.endings,'run.endings');

  meta.completedEndings=['lumber-stay'];
  meta.unlocks=['vitality'];
  meta.appliedResultTransactions=['tx.legacy.lumber-stay'];

  run.status='ended';
  endings.committed='lumber-stay';
  endings.result={
    resultId:'rr.legacy.lumber-stay',
    endingId:'lumber-stay',
    transactionId:'tx.legacy.lumber-stay',
    completedAtDay:17,
    firstCompletion:true,
    appliedMetaRewardIds:['legacy.reward.vitality']
  };
  return raw;
}

/**
 * F5 reconstruction.
 *
 * Exact accepted recipe from lumber-stay-retirement-v17.test.ts:
 * "ended pre-RunResult lumber-stay gets deterministic compatibility proof
 * without reward replay".
 */
export function reconstructLumberStayPreRunResult<T>(input:T):T{
  const raw:any=clone(input);
  const meta=requireObject(raw.meta,'meta');
  const run=requireObject(raw.run,'run');
  const endings=requireObject(run.endings,'run.endings');

  meta.completedEndings=['lumber-stay'];
  meta.unlocks=[];
  meta.appliedResultTransactions=[];

  run.status='ended';
  endings.committed='lumber-stay';
  endings.result=null;
  return raw;
}
