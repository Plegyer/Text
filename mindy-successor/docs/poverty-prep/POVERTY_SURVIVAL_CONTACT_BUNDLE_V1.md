# Poverty Survival Contact Bundle v1

Status: C3-08 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.
Dependency candidate: PR #67 exact head `b6d1a451b9f729aa7e3534bf4a928961c7eee134`.
Fixture: `prior-work/astra/prototype-m3.2/content/poverty-survival-contact-depth-v1.fixture.json`.

## Scope

C3-08 prepares additional presentation-only RU/EN depth around existing ordinary-poverty survival opportunities:
- small paid work;
- anonymous help;
- a short cleanup job;
- a found resource;
- brief one-off human contact around those opportunities.

It changes no event identity or effect.

The current ordinary-poverty packs have no relationship write, contact counter, acquaintance fact, persistent NPC state, or career write. Therefore all “contact” in this bundle is deliberately narrative-only and one-off.

Secret Debt is out of scope.

## Existing survival opportunity map

### Small paid errand

Event:
`poverty-street-production.helpful-summer`.

Representative existing choice:
`take-errand`.

Current effect:
money resource modification already present in the production pack.

C3-08 does not change the amount or introduce any relationship effect.

New additive depth key:
`presentation.poverty.depth.poverty-street-production-helpful-summer.default.c.text`.

RU:
`Продавец уже убирает прилавок и на несколько шагов берётся за второй край ящика. Пара коротких фраз нужна только для того, чтобы донести груз под навес: это разовое знакомство и небольшая работа, а не новое обязательство.`

EN:
`The stallholder is already closing up and takes the other end of the crate for a few steps. A couple of brief words are only enough to get it under cover: this is a one-off acquaintance and a small job, not a new obligation.`

### Market-closing small task

Event:
`poverty-street-production-v2.helpful-summer-shade`.

Variant:
`market-closing`.

Representative existing choice:
`take-small-task`.

Current effect:
money resource modification already present in the production pack.

New additive depth key:
`presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.c.text`.

RU:
`У прилавка торопятся свернуть полотно до дождя. Ты подхватываешь свободный край, уточняешь, куда убрать связку, и на этом короткое рабочее знакомство заканчивается вместе с поручением.`

EN:
`At the stall, someone is hurrying to roll the canvas before the rain. You take the free edge, ask where the bundle should go, and the brief working acquaintance ends with the task.`

### Anonymous coin help

Event:
`poverty-recovery-production.small-coin-help`.

Representative existing choice:
`take-coins`.

Current effect:
money resource modification already present in the production pack.

New additive depth key:
`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.c.text`.

RU:
`Монеты лежат рядом с хлебом так, будто кто-то оставил помощь и специально не стал ждать благодарности. Здесь нет имени и обещания на будущее — только маленький ресурс, который можно принять или оставить.`

EN:
`The coins sit beside the bread as if someone left help and deliberately chose not to wait for thanks. There is no name and no promise for later—only a small resource you can take or leave.`

This scene deliberately remains anonymous. It does not create a lender, patron, recurring benefactor, or Secret Debt hook.

### Short cleanup

Event:
`poverty-recovery-production.short-cleanup`.

Representative existing choice:
`do-cleanup`.

Current effect:
money resource modification already present in the production pack.

New additive depth key:
`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.c.text`.

RU:
`Перед закрытием лавки остаются метла, ведро и несколько минут работы. Человек у двери показывает, с какого угла начать; вы перебрасываетесь парой бытовых реплик, заканчиваете уборку и расходитесь без новых обязательств.`

EN:
`At closing time, a broom, a bucket, and a few minutes of work remain. The person at the door points out where to start; you trade a couple of ordinary remarks, finish the cleanup, and part without new obligations.`

This is the clearest current “acquaintance opportunity”, but it remains a single-scene interaction because no persistent acquaintance identity exists in current ordinary-poverty state.

### Herb bundle

Event:
`poverty-recovery-production.herb-bundle`.

Representative existing choice:
`take-herb`.

Current effect:
add the already-existing item `herb`.

New additive depth key:
`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.c.text`.

RU:
`У края рыночного ящика остался перевязанный пучок трав. Никого рядом уже нет, поэтому находка не превращается в знакомство: это просто небольшой полезный ресурс, который можно забрать или оставить.`

EN:
`A tied bundle of herbs has been left beside a market crate. No one is nearby now, so the find does not turn into an acquaintance: it is simply a small useful resource you can take or leave.`

No new item ID or inventory rule is introduced.

## Exact effect boundary

The fixture records current effect snapshots only so integration can prove the content is attached to the intended survival opportunity.

Those snapshots are observations of current runtime content, not new Product locks.

C3-08 does not alter:
- money deltas;
- item counts;
- next-day modifiers;
- choice conditions;
- event conditions;
- cooldowns;
- maxShows;
- NightFlow policy.

The no-effect alternatives on those events remain unchanged.

## PR #67 relationship

PR #67 already supplies presentation-depth candidates for these events. C3-08 appends one additional candidate to selected exact event/variant pairs; it does not replace or duplicate the existing keys.

The five new keys are absent from:
- current production localization;
- PR #67's 26-key depth fixture.

Recommended lookup integration:
append the new key to the existing ordered candidate list for the exact pair.

Do not reorder the existing PR #67 keys unless Lead explicitly requests a different content order.

## Acquaintance boundary

Current ordinary poverty has no typed persistent acquaintance state.

Therefore:
- a stallholder may speak during the current scene;
- a shop worker may briefly work beside the heroine;
- anonymous help may imply a humane town without naming a persistent benefactor;
- none of those scenes creates a relationship, counter, fact, recurring NPC, or guaranteed future help.

If Product later wants persistent poverty acquaintances, that requires an approved identity/state contract. Chat 3 does not create it inside a copy bundle.

## Consumer seam

These five candidates use the same presentation-only depth selector contract handed off in PR #67.

The selector may use the existing event occurrence count for deterministic presentation ordering.

It must not:
- reroll gameplay;
- change event choice/effects;
- write Save identity;
- create relationship state;
- route into Secret Debt.

Core event text remains the fallback.

## C3-08 disposition

Ready:
- five incremental RU/EN survival/contact depth candidates;
- exact current event/variant/choice mappings;
- explicit current-effect snapshots;
- explicit non-persistent-contact rule;
- selective integration instructions on top of PR #67.

Dependency:
shared pending-scene depth consumption remains Chat 1 / Lead ownership.

No ordinary-poverty or Secret Debt mechanics are changed.
