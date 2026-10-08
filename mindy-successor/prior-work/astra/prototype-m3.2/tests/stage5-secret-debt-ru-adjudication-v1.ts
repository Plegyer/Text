/**
 * TEST ONLY — exact Leader 1 adjudication.
 * mindy-successor/docs/tasks/LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md
 * The frozen Golden fixture bc8617be68825543ed7617e9dd5c7d915f6b0e14 and
 * v55 validator e40737f3c6d6da83d1e4692e4457c04936279d53 stay immutable.
 */
import assert from 'node:assert/strict';

export const STAGE5_SECRET_DEBT_RU_LEADER_AUTHORITY=
  'mindy-successor/docs/tasks/LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md' as const;

export const STAGE5_SECRET_DEBT_RU_OVERLAY:Readonly<Record<string,Readonly<{frozenRu:string;acceptedRu:string;en:string}>>>=Object.freeze({
  'unlock.secret-debt.paid-freedom.earned-reserve-match.label':{
    frozenRu:'Паритет заработанного резерва',
    acceptedRu:'Сопоставление заработанного резерва',
    en:'Earned Reserve Match'
  },
  'unlock.secret-debt.takeover.network-retainer.label':{
    frozenRu:'Сетевой гонорар',
    acceptedRu:'Сетевое содержание',
    en:'Network Retainer'
  }
});

const approvedKeys=[
  'unlock.secret-debt.paid-freedom.earned-reserve-match.label',
  'unlock.secret-debt.takeover.network-retainer.label'
].sort();

export function assertStage5OverlayAuthority(required:Record<string,any>):void{
  const keys=Object.keys(STAGE5_SECRET_DEBT_RU_OVERLAY).sort();
  assert.deepEqual(keys,approvedKeys,'exactly two Leader-authorized RU keys');
  assert.equal(keys.length,2,'no blanket Golden exceptions');
  for(const key of keys){
    const expected=required[key]?.value;
    const approved=STAGE5_SECRET_DEBT_RU_OVERLAY[key];
    assert.equal(expected?.ru,approved.frozenRu,key+' frozen RU must remain byte-identical');
    assert.equal(expected?.en,approved.en,key+' original EN remains unchanged');
    assert.ok(approved.acceptedRu.length>0);
  }
}

export function stage5FinalExpectedLocalization<T extends {ru:string;en:string}>(key:string,frozenValue:T):T{
  const override=STAGE5_SECRET_DEBT_RU_OVERLAY[key];
  if(!override)return frozenValue;
  assert.equal(frozenValue.ru,override.frozenRu,key+' must match frozen authority');
  assert.equal(frozenValue.en,override.en,key+' EN is not negotiable');
  return {...frozenValue,ru:override.acceptedRu};
}

/** Exact Leader v2 historical Tavern visible-copy exception; frozen v54 source stays unchanged.
 * The accepted frozen string quotes raw ending.tavern.information-broker,
 * which conflicts with the final UI rule prohibiting raw IDs. Render a human name.
 */
export const STAGE5_TAVERN_LEGACY_DISPLAY_KEY='ending.tavern-court.description' as const;
export const STAGE5_TAVERN_LEGACY_DISPLAY={
  frozen:{ru:'Старый ID больше не является современным финалом; завершение мигрирует в ending.tavern.information-broker и не открывает Дворец.',en:'This legacy ID is no longer a modern ending; completed credit migrates to ending.tavern.information-broker and grants no Palace access.'},
  final:{ru:'Этот исторический путь больше не является современной концовкой. Его завершение учитывается для пути информационного посредника и не открывает доступ во Дворец.',en:'This historical route is no longer a modern ending. Its completion counts toward the Information Broker path and does not grant Palace access.'}
} as const;
export function stage5FinalExpectedHistoricalCompatibility<T extends {ru:string;en:string}>(key:string,original:T):T{
  if(key==='ending.tavern-guild.description'){
    const frozen={ru:'Старый ID больше не является современным финалом; завершение мигрирует в ending.tavern.sanctuary.',en:'This legacy ID is no longer a modern ending; completed credit migrates to ending.tavern.sanctuary.'};
    assert.deepEqual(original,frozen,'v54 frozen Guild historical description');
    return {...original,ru:'Этот исторический путь больше не является современной концовкой. Его завершение учитывается для пути убежища при таверне.',en:'This historical route is no longer a modern ending. Its completion counts toward the Tavern Sanctuary path.'};
  }
  if(key==='ending.tavern-stay.description'){
    const frozen={ru:'Старый ID больше не является современным финалом; завершение мигрирует в ending.tavern.innkeeper.',en:'This legacy ID is no longer a modern ending; completed credit migrates to ending.tavern.innkeeper.'};
    assert.deepEqual(original,frozen,'v54 frozen Stay historical description');
    return {...original,ru:'Этот исторический путь больше не является современной концовкой. Его завершение учитывается для пути хозяйки таверны.',en:'This historical route is no longer a modern ending. Its completion counts toward the Innkeeper path.'};
  }
  if(key!==STAGE5_TAVERN_LEGACY_DISPLAY_KEY)return original;
  assert.deepEqual(original,STAGE5_TAVERN_LEGACY_DISPLAY.frozen,'unchanged Golden v54 legacy reference');
  return {...original,...STAGE5_TAVERN_LEGACY_DISPLAY.final};
}
