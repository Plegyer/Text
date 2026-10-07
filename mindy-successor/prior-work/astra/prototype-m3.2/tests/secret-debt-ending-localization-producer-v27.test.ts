import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {localizationSchema} from '../src/core/localization.ts';

const bundle=localizationSchema.parse(
  JSON.parse(readFileSync('content/localization.json','utf8'))
);

const endings=[
  {
    id:'ending.secret-debt.paid-freedom',
    title:{ru:'Свобода через выплату',en:'Paid Freedom'},
    description:{
      ru:'Полностью выплатить 20 000 одним явным действием и выйти из связанного состояния.',
      en:'Repay the full 20,000 principal in one explicit action and leave the bound state.'
    },
    epilogue:{
      ru:'Ты закрываешь весь долг полной выплатой и выходишь из связанного состояния. Долговой маршрут завершён именно выплатой; никакой другой исход не подменяет этот выбор.',
      en:'You close the entire debt through full repayment and leave the bound state. The debt route ends through repayment itself; no other outcome substitutes for that choice.'
    }
  },
  {
    id:'ending.secret-debt.bound-life',
    title:{ru:'Связанная жизнь',en:'Bound Life'},
    description:{
      ru:'Завершить 50 скрытых дневных смен, оставаясь связанным долгом, а затем явно принять эту судьбу.',
      en:'Complete 50 hidden daytime shifts while still bound, then explicitly commit to this ending.'
    },
    epilogue:{
      ru:'После ровно пятидесяти скрытых дневных смен ты явно выбираешь исход «Связанная жизнь», пока долг остаётся активным. Это не автоматический финал: завершение наступает только после отдельного выбора этой судьбы.',
      en:'After exactly fifty hidden daytime shifts, you explicitly choose the Bound Life ending while the debt remains active. This is not an automatic ending: completion happens only after the separate ending choice.'
    }
  },
  {
    id:'ending.secret-debt.takeover',
    title:{ru:'Перехват контроля',en:'Takeover'},
    description:{
      ru:'Выполнить точные требования D44 и отдельным явным действием перехватить контроль над долговым маршрутом.',
      en:'Meet the exact D44 requirements and use the separate explicit action to take control of the debt route.'
    },
    epilogue:{
      ru:'Выполнив высокие требования маршрута, ты отдельным явным действием перехватываешь контроль над долговой системой и выходишь из роли должницы. Этот исход фиксирует подготовленный захват управления, а не автоматическое завершение за сам факт долга.',
      en:'After meeting the route\'s high requirements, you use a separate explicit action to take control of the debt system and leave the debtor role. This ending records a prepared takeover, not an automatic result of being in debt.'
    }
  }
] as const;

test('v27: all three Secret Debt endings have exact bilingual runtime title/description/epilogue keys',()=>{
  for(const ending of endings){
    for(const field of ['title','description','epilogue'] as const){
      const key=`ending.${ending.id}.${field}`;
      assert.deepEqual(bundle.strings[key],ending[field],key);
      assert.ok(bundle.strings[key]?.ru.trim(),key+' ru');
      assert.ok(bundle.strings[key]?.en?.trim(),key+' en');
    }
  }
});

test('v27: Paid Freedom copy preserves explicit full-debt exit',()=>{
  const row=endings[0];
  assert.match(row.description.ru,/20 000/);
  assert.match(row.description.en,/20,000/);
  assert.match(row.description.ru,/явным действием/);
  assert.match(row.description.en,/explicit action/);
  assert.match(row.epilogue.ru,/весь долг полной выплатой/);
  assert.match(row.epilogue.en,/entire debt through full repayment/);
  assert.match(row.epilogue.ru,/выходишь из связанного состояния/);
  assert.match(row.epilogue.en,/leave the bound state/);
});

test('v27: Bound Life copy preserves exactly 50 hidden shifts and explicit commit',()=>{
  const row=endings[1];
  assert.match(row.description.ru,/50 скрытых дневных смен/);
  assert.match(row.description.en,/50 hidden daytime shifts/);
  assert.match(row.epilogue.ru,/ровно пятидесяти скрытых дневных смен/);
  assert.match(row.epilogue.en,/exactly fifty hidden daytime shifts/);
  assert.match(row.description.ru,/явно принять/);
  assert.match(row.description.en,/explicitly commit/);
  assert.match(row.epilogue.ru,/не автоматический финал/);
  assert.match(row.epilogue.en,/not an automatic ending/);
});

test('v27: Takeover copy preserves high-threshold route plus separate explicit control action',()=>{
  const row=endings[2];
  assert.match(row.description.ru,/точные требования D44/);
  assert.match(row.description.en,/exact D44 requirements/);
  assert.match(row.description.ru,/отдельным явным действием/);
  assert.match(row.description.en,/separate explicit action/);
  assert.match(row.epilogue.ru,/высокие требования маршрута/);
  assert.match(row.epilogue.en,/route's high requirements/);
  assert.match(row.epilogue.ru,/не автоматическое завершение/);
  assert.match(row.epilogue.en,/not an automatic result/);
});

test('v27: Secret Debt ending copy adds no Palace romance consent or Strong Meta implication',()=>{
  for(const ending of endings){
    const copy=[
      ending.title.ru,ending.title.en,
      ending.description.ru,ending.description.en,
      ending.epilogue.ru,ending.epilogue.en
    ].join(' ').toLowerCase();

    assert.doesNotMatch(copy,/palace|дворц|romance|роман|consent|согласие|keystone|specialist|strong meta/);
  }
});
