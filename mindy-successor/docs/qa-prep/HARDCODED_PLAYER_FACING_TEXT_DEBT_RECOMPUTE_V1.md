# Hardcoded player-facing text debt recompute v1

Status: COMPLETE / CURRENT_APP_DEBT_RECORDED

Current main:
`f93878b954385a1c61d8a06a0673354207d11d70`.

Audited file:
`src/ui/app.ts`.

Exact app blob:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

## Counting rule

The source is intentionally compact and often places several literal labels inside one render expression.

For a reproducible source-level count, this audit counts **Cyrillic-bearing source occurrences by line**:
- one source line containing at least one Cyrillic literal/template fragment = one raw occurrence;
- a line already using only `tr(...)` localized fallback copy is not counted as remaining hardcoded debt;
- mixed lines that still contain at least one direct hardcoded display/aria/status string remain debt.

This is a conservative source-occurrence count, not a word/character count.

## Raw scan

Cyrillic-bearing source lines:
`64`.

Already-localized-only lines with no remaining direct hardcoded consumer debt:
`5`.

Those are current localized School/Work result/title fallback expressions:
- line ~36;
- line ~104;
- line ~171;
- line ~177;
- line ~178.

Remaining hardcoded RU-bearing source occurrences:
`59`.

## Classification

| Classification | Source occurrences |
| --- | ---: |
| SHARED_UI_SHELL | 39 |
| NIGHT_LODGING | 7 |
| ACTIVITY | 3 |
| ENDING_LEGACY | 6 |
| DEBUG_INTERNAL | 4 |
| NON_PLAYER_FACING | 0 |
| **Total remaining** | **59** |

## SHARED_UI_SHELL — 39

This bucket includes direct hardcoded presentation/status text still visible outside dedicated Night/Activity/ending groups.

Major seams:

### Dynamic condition explanations

`explain()` remains predominantly Russian-only for:
- item capability;
- calendar year/day/elapsed days;
- housing;
- career/quest/relationship stages/counters/facts/choices;
- world facts;
- Meta unlocks;
- visits;
- flags;
- negation;
- conjunctions.

These are player-visible in action requirements and ending conditions.

They need structured localization because dynamic values/operators are composed into the text.

### Generic action controls

Still direct:
- `Надёжно`;
- `Быстро`;
- ordinary `Выбрать`.

Chat 5 item 94 now has source keys for these, but current main has not wired them.

### Missing-media fallback

Still direct:
`Сцена доступна без медиа`.

### Character creation

Still direct:
- eyebrow;
- title;
- body;
- heroine heading;
- age/free-points sentence;
- increase/decrease aria labels;
- start-story button.

No current Chat 5 item-94 key covers this block.

### Event shell

Still direct:
`Встреча`.

The event title/body/choice label themselves use stable localization helpers.

### Pre-arrival

Current main still directly renders:
- pre-arrival title/body/button
despite source-ready Chat 5 keys.

### Stats / Journal / Bag

Current main still directly renders shell headings/labels.

Chat 5 source is ready, but wiring is not shipped.

### Menu/save lifecycle

Still contains direct user-facing RU for:
- export/import controls;
- restart;
- confirmations;
- import size/load/success messages;
- save recovery;
- load-stop/startup errors;
- close/dismiss aria labels.

Some shared controls now have source-ready keys; lifecycle copy remains a later wave.

## NIGHT_LODGING — 7

Source-line occurrences include:
- generic Night-slot annotation;
- lodging stage title/body/cost/next-day annotation;
- voluntary evening stage/body;
- generic Night sequence heading;
- result -> lodging shortcut;
- town-note `Ночлег сегодня`;
- outer Sleep panel.

Chat 3 owns the dedicated Night/lodging transaction source.

Chat 5 item 94 covers only:
- outer Sleep panel shell;
- generic result choose-lodging shared control.

Current main has not wired those new keys yet.

## ACTIVITY — 3

Current Activity/Explore hardcoded source occurrences:
- Activity list explanation + entry Energy + enter button;
- active Activity state line with `Прогресс` / `Выносливость`;
- Explore panel title / ordinary errands disclosure.

Chat 5 source now covers the Explore list/panel parts.

The active Activity state/debug-like labels remain outside that source.

## ENDING_LEGACY — 6

Includes:
- Meta ending/Hard Work explanation branches inside `explain()`;
- inactive-run `Судьба принята` / `Срок истёк`;
- `Судьбы и следующая жизнь`;
- Legacy panel shell;
- accept confirmation.

Chat 5 item 94 covers the Legacy panel shell itself.

Inactive-run headings/confirmation remain separate debt.

## DEBUG_INTERNAL — 4

Direct Russian strings on source lines whose primary role is developer/operational tooling:
- event inspector heading;
- presentation editor save-status;
- catalog-read failure;
- custom presentation load failure.

They are visible in some developer/error paths, but are not part of the current player-shell localization wave.

The menu also exposes debug-oriented editor/catalog controls on a mixed source line classified under SHARED_UI_SHELL because that same line contains ordinary save/restart controls.

## NON_PLAYER_FACING — 0

After limiting the scan to Cyrillic-bearing `app.ts` source that can reach render/status/error surfaces, no remaining source occurrence is classified as truly non-player-facing.

Code IDs/tokens without Cyrillic are not part of this count.

## Source-ready reduction potential

Chat 5 item-94 fixture provides:
- 34 bilingual keys;
- 29 additive;
- 5 exact-identical existing root keys.

Wiring those approved shell seams will remove a meaningful subset of the 59 source occurrences, but it will not close:
- condition explanation localization;
- character creation;
- active Activity state labels;
- dedicated Chat3 Night/lodging;
- save lifecycle;
- inactive-run/end confirmation;
- Journal outcome migration.

Therefore full-product UI localization remains incomplete even after item-94 integration.

## Product/development terminology

Some visible strings contain implementation terms:
- `Activity`;
- `checkpoint`;
- `route`;
- `NightFlow`;
- `lodging`;
- `voluntary choice`.

Where Chat 5 already supplies approved player-facing replacements, prefer those source strings.

For remaining surfaces, Product/Lead should approve player wording before localization rather than translating implementation vocabulary literally.

## Verdict

Current exact `app.ts` still has:
`59`
hardcoded RU-bearing source occurrences by the reproducible line-based counting rule above.

The debt is presentation/UI-only, but several shared consumers remain required.
