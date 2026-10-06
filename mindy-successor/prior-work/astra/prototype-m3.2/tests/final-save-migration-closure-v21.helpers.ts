import assert from 'node:assert/strict';

/**
 * Test-only helpers for the final 1.0 save/migration closure suite.
 *
 * Deliberately schema-agnostic:
 * - no production imports;
 * - no assumptions about future Camp / Secret Debt / Palace fields;
 * - safe to carry forward onto the fully assembled release target.
 */

export function jsonClone<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

export function cloneAndMutate<T>(value:T,mutate:(raw:any)=>void):any{
  const raw=jsonClone(value) as any;
  mutate(raw);
  return raw;
}

export function jsonValue(value:unknown):unknown{
  return JSON.parse(JSON.stringify(value));
}

export function assertJsonEqual(actual:unknown,expected:unknown,message?:string){
  assert.deepEqual(jsonValue(actual),jsonValue(expected),message);
}

export function assertParseTwiceIdempotent<T>(
  raw:unknown,
  parse:(text:string)=>T,
  message='parse -> serialize -> parse must be semantically idempotent'
){
  const once=parse(JSON.stringify(raw));
  const twice=parse(JSON.stringify(once));
  assertJsonEqual(twice,once,message);
  return {once,twice};
}

export function exactCount<T>(values:readonly T[],target:T){
  return values.reduce((count,value)=>count+(Object.is(value,target)?1:0),0);
}

export function assertExactlyOnce<T>(
  values:readonly T[],
  target:T,
  message='expected stable identity exactly once'
){
  assert.equal(exactCount(values,target),1,message);
}

export function assertAbsent<T>(
  values:readonly T[],
  target:T,
  message='unexpected stable identity'
){
  assert.equal(exactCount(values,target),0,message);
}

export function protectedRunSnapshot(save:any){
  return jsonValue({
    status:save?.run?.status,
    pending:save?.run?.pending??save?.run?.flow?.pendingScene??null,
    rng:save?.run?.rng??save?.run?.rngState??null,
    endings:save?.run?.endings??null,
    strongMetaSnapshot:save?.run?.strongMetaSnapshot??null,
    strongMetaRuntime:save?.run?.strongMetaRuntime??null,
    activity:save?.run?.flow?.activity??null,
    night:save?.run?.flow?.night??null
  });
}

export function transactionSnapshot(save:any){
  return jsonValue({
    completedEndings:save?.meta?.completedEndings??[],
    appliedResultTransactions:save?.meta?.appliedResultTransactions??[],
    endingResult:save?.run?.endings?.result??null
  });
}

export function assertStableTransaction(before:any,after:any){
  assertJsonEqual(
    transactionSnapshot(after),
    transactionSnapshot(before),
    'reload must not replay or rewrite stable ending transaction state'
  );
}

export function assertStableRunSnapshot(before:any,after:any){
  assertJsonEqual(
    protectedRunSnapshot(after),
    protectedRunSnapshot(before),
    'reload/profile merge must not rewrite current-run snapshots or pending identity'
  );
}
