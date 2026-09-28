# Remaining Hardcoded RU Debt Closure Audit v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
Consumer audited: `src/ui/app.ts` blob `30626e7fd68e6d92fcd01f0eb3bea1a1605002fb`

## Interpretation

This audit classifies normal-player hardcoded RU that would remain **after selective integration/wiring of items 109–118**.

Prepared-but-not-yet-wired strings from items 114–116 are treated as closed by this wave, not as remaining debt.

## SHIP_NEXT

These normal-player seams are still outside items 109–118 and should be a later generic-shell localization wave.

### Pending event eyebrow

Current:
`Встреча`

Consumer:
- pending event stage eyebrow in `central()`.

Suggested stable key:
`ui.event.eyebrow`

RU: Встреча  
EN: Encounter

### Inactive-run accepted ending title

Current:
`Судьба принята`

Consumer:
- `r.status==='ended'` stage title.

Suggested:
`ui.run.endingAccepted`

RU: Судьба принята  
EN: Fate accepted

### Inactive-run expired title

Current:
`Срок истёк`

Consumer:
- inactive run when not ended/accepted.

Suggested:
`ui.run.timeExpired`

RU: Срок истёк  
EN: Time expired

### Inactive-run legacy navigation

Current:
`Судьбы и следующая жизнь`

Suggested:
`ui.run.fatesAndNextLife`

RU: Судьбы и следующая жизнь  
EN: Fates and next life

### Town lodging-cost prefix

Current:
`Ночлег сегодня: {cost} монет`

Suggested:
`ui.town.lodgingToday`

RU: Ночлег сегодня: {cost} {coins}  
EN: Lodging today: {cost} {coins}

Reuse the existing localized coin word instead of embedding a second coin translation.

## OTHER_OWNER

### Night / lodging shell — Chat3 overlap

Still hardcoded in current `app.ts`, but explicitly outside Chat5 ownership in prior handoffs:

- `Ночной слот`
- `энергия завтра`
- generic non-School Night `Выбрать`
- Night stage `Ночлег`
- `Выберите место на эту ночь. Оплата фиксируется ровно один раз.`
- lodging `монет`
- lodging `энергия завтра`
- voluntary Night stage `Вечер`
- `Один добровольный Night choice. Daytime Energy не расходуется.`
- `Ночная последовательность`

These should be reconciled by the Night/lodging owner, not duplicated in Chat5 label/condition fixtures.

## DEBUG_INTERNAL

Current hardcoded RU intentionally excluded from normal-player localization scope:

- `Инспектор событий` menu button;
- `Инспектор событий` panel heading;
- raw serialized event JSON shown by the catalog inspector.

Presentation editor internals remain separately owned/debug-oriented; only its normal-menu label and visible save/load statuses are covered by items 115/118.

## ACCEPTABLE_FALLBACK

RU strings inside a stable `tr(key, ruFallback)` call are not remaining hardcoded localization debt when the same stable key has an approved RU+EN root/source entry.

Examples already shipped on post-PR53 main:
- Explore/Sleep/Stats/Journal/Bag/Legacy shell keys from item 94;
- Arrival shell;
- generic select/close/dismiss/result-lodging/work-recipe controls;
- existing Work/School/HUD/Town keys.

Examples prepared by items 109–118:
- creation/menu/recovery Activity shell;
- generic condition templates/state words;
- season/housing/item/resource/metric/unlock labels;
- target stat hints;
- media-missing fallback.

Keeping the approved RU text as the code fallback is acceptable; it is not locale identity.

## Labels/hints closure condition

Items 109–118 close shared dictionary debt only if Lead rewires direct `labels[id]` / `hints[id]` player-facing consumers through item-117 resolvers.

If those consumers remain direct dictionary reads, the RU-only dictionary is still visible despite the source fixtures being ready.

## Error payload caveat

Localized wrappers do not make raw `{error}` payloads bilingual. This is acceptable fallback behavior when no stable semantic error code exists.

Do not machine-translate exception text or make error payload text part of gameplay identity.

## Result

After items 109–118 are selectively integrated, the main Chat5-owned normal-player RU debt in `app.ts` is reduced to five small generic shell seams under SHIP_NEXT.

Night/lodging text remains OTHER_OWNER; catalog-inspector text remains DEBUG_INTERNAL.
