# Poverty Contacts and Recovery Depth v2

Status: C3-22 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Current-main baseline used for this task: `e8eb7392c1db8075bbf20c6c0993621250f2f050`.
Fixture: `prior-work/astra/prototype-m3.2/content/poverty-contacts-recovery-depth-v2.fixture.json`.

## Scope

C3-22 extends existing ordinary-poverty small-job/help/resource scenes with more human texture while keeping every contact one-off.

This bundle does not add:
- a contact list;
- relationship state;
- helper reputation;
- recurring benefactor;
- recovery milestone;
- job contract;
- debt;
- Secret Debt;
- new effects.

All content attaches to current event/variant identities and preserves existing choices/effects.

## Exact existing opportunities

### Small paid errand

Event:
`poverty-street-production.helpful-summer / default`.

Candidate key:
`presentation.poverty.depth.poverty-street-production-helpful-summer.default.d.text`.

RU:
`У прилавка уже почти всё убрано, но один ящик остался снаружи. Продавец придерживает навес и коротко спрашивает, сможешь ли ты помочь перенести груз. Это несколько минут совместной работы и обычный разговор по делу, не обещание следующей смены.`

EN:
`The stall is almost packed away, but one crate is still outside. The seller holds the awning and briefly asks whether you can help move it. It is a few minutes of shared work and ordinary talk about the task, not a promise of another shift.`

Current positive choice remains:
`take-errand`.

Its current money effect is observed, not changed.

### Market closing task

Event:
`poverty-street-production-v2.helpful-summer-shade / market-closing`.

Candidate key:
`presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.d.text`.

RU:
`Пока ставни закрывают по одной, кто-то у соседнего края полотна просит придержать его, чтобы быстрее свернуть тент. Вы успеваете согласовать только пару движений и место для связки; знакомство заканчивается вместе с коротким поручением.`

EN:
`As the shutters close one by one, someone at the other edge of the canvas asks you to hold it so the awning can be rolled faster. You only need to agree on a few movements and where the bundle goes; the acquaintance ends with the short task.`

Current positive choice remains:
`take-small-task`.

### Late-shade optional task

Event:
`poverty-street-production-v2.helpful-summer-shade / late-shade`.

Candidate key:
`presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.d.text`.

RU:
`Перед закрытием у лавки ещё остаётся одно небольшое дело. Тебя замечают в тени и предлагают помочь на несколько минут, но предложение не требует соглашаться и не создаёт никакой работы на завтра.`

EN:
`Before closing, one small job is still left at the stall. Someone notices you in the shade and offers a few minutes of work, but the offer does not require you to accept and creates no job for tomorrow.`

The scene preserves both current choices:
- take the task;
- keep the resting place.

No future job is implied.

## Recovery help

### Anonymous coin help

Event:
`poverty-recovery-production.small-coin-help / default`.

Candidate key:
`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.d.text`.

RU:
`Рядом с хлебом лежат несколько монет без записки и без человека, который ждал бы ответа. Помощь остаётся анонимной: её можно принять как небольшой ресурс или оставить, не вступая ни в долг, ни в новые отношения.`

EN:
`A few coins lie beside the bread with no note and no person waiting for an answer. The help remains anonymous: you can take it as a small resource or leave it without entering either a debt or a new relationship.`

This is ordinary help, not lender content.

### One-off cleanup

Event:
`poverty-recovery-production.short-cleanup / default`.

Candidate key:
`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.d.text`.

RU:
`У закрывающейся лавки остаётся немного мусора после дня торговли. Человек у двери показывает, куда убрать ведро и с какой стороны начать; если ты берёшься за уборку, это разовая работа с понятным концом, а не новый постоянный контакт.`

EN:
`A little mess remains outside a shop closing for the day. The person at the door points out where the bucket goes and which side to start from; if you take the cleanup, it is one clearly bounded job, not a new permanent contact.`

No employment or relationship state is created.

### Herb bundle

Event:
`poverty-recovery-production.herb-bundle / default`.

Candidate key:
`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.d.text`.

RU:
`Пучок трав лежит у пустого ящика, перевязанный простой бечёвкой. Рядом нет ни продавца, ни просьбы вернуть находку, ни имени, за которое можно зацепиться: это только небольшой ресурс, который можно взять или оставить.`

EN:
`A bundle of herbs lies beside an empty crate, tied with plain twine. There is no seller nearby, no request to return it, and no name to follow up with: it is only a small resource you can take or leave.`

The current `herb` item effect remains authoritative.

## Current effect snapshots

The fixture records the exact current positive-choice effects for audit only:
- small errand: existing money modification;
- small market task: existing money modification;
- anonymous coin help: existing money modification;
- cleanup: existing money modification;
- herb bundle: existing `herb` item addition.

Those snapshots do not promote balance numbers to new Product locks and do not alter any effect.

## Relationship / contact boundary

Current ordinary-poverty packs still have no relationship write or persistent contact state.

Therefore every human interaction here is deliberately local:
- seller;
- market worker;
- shop worker;
- anonymous helper.

No person becomes:
- recurring contact;
- guarantor;
- patron;
- lender;
- employer;
- relationship route.

If a future persistent contact system is approved, it needs exact gameplay identities first.

## Recovery boundary

C3-22 does not create a `recovered`, `stabilized` or `escaped poverty` state.

These scenes provide small current resources/opportunities only.

The existing NightFlow and future lodging affordability remain authoritative.

## Secret Debt boundary

No scene:
- creates debt;
- names a lender;
- promises future repayment;
- activates hidden career state;
- implies that accepting ordinary help has a secret cost.

Ordinary poverty remains independently playable.

## Integration contract

These six keys are append-only candidates for the current-main poverty depth consumer.

For each exact event/variant pair:
- append the candidate to the existing ordered key list;
- preserve core fallback;
- preserve event/variant selection;
- preserve deterministic occurrence rotation;
- preserve all current choices/effects.

No new runtime system is requested.

## Exact non-scope

No changes to:
- effects/rewards;
- contact state;
- career/relationship state;
- lodging/NightFlow;
- recovery state;
- Secret Debt;
- Save/RNG;
- media.

## C3-22 disposition

Ready:
- six additive RU/EN contacts/recovery depth candidates;
- exact current effect snapshots;
- explicit one-off-contact and no-recovery-state rules;
- append-only integration guidance.
