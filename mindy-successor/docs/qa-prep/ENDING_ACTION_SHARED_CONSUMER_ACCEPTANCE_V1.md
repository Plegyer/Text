# Ending/action shared consumer acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Purpose:
define exact Lead acceptance for bilingual ending cards and ordinary action result screens without changing gameplay identity, eligibility, effects, RNG or Save.

## Ending card consumer

Current Legacy panel renders:
- raw `e.title`;
- raw `e.description`.

Required render-only lookup:

`tr('ending.' + e.id + '.title', e.title)`

`tr('ending.' + e.id + '.description', e.description)`.

Stable ending ID remains:
`e.id`.

Do not create a locale-specific ending ID.

## Ending eligibility invariance

The localization consumer must not change:
- ending order;
- condition objects;
- `availableEndings`;
- `eligible(...)`;
- button enabled/disabled state;
- acceptedEnding;
- reward;
- metaReward;
- epilogue;
- ending presentationId.

RU and EN on the same Save must show the same exact eligible ending set.

## Hard Work lock

For:
`ending.lumber.hard-work`

require unchanged:
- only `completed_shifts >= 50`;
- reward `lumber.hardwork.compat`;
- meta reward `hardWork:lumber`.

Localizing its title/description must not add Forest/School/Foreman prerequisites.

## Ordinary action result consumer

Current generic result screen has:
- School special-case localization;
- event-choice `outcomeRef` localization;
- raw ordinary `lastAction.title/text` fallback.

For the reviewed 16-action one-scene set, use stable:
- `lastAction.id`;
- current scene identity `default`.

Lookup:
- title: `action.<id>.label`;
- body: `action.<id>.scene.default.text`.

Fallback:
- stored `lastAction.title`;
- stored `lastAction.text`.

## Consumer precedence

Required order:

1. School course result stays on its existing School-specific path.
2. Event-choice `outcomeRef` stays on existing event localization.
3. Reviewed ordinary action result uses actionId + exact current scene identity.
4. Unknown/unmapped result uses stored raw fallback.

Do not let the ordinary-action consumer shadow School or event-choice result ownership.

## Scene identity rule

Today the reviewed 16 ordinary actions each map unambiguously to current scene:
`default`.

This permits a current shared consumer without Save-schema change.

Future multi-scene actions:
- must retain or deterministically expose selected locale-neutral sceneId;
- must not choose scene identity from localized prose;
- must not assume default when multiple scenes are possible.

## Result gameplay invariance

From cloned identical pre-action Saves:
- perform the same exact action;
- select the same recipe/command when relevant;
- compare resulting gameplay state.

Require identical:
- action ID;
- effects;
- deltas;
- costs;
- money/Energy;
- inventory;
- flags/metrics;
- action counts;
- career/progression;
- pending event identity;
- presentationId;
- RNG evolution.

Only rendered title/body may differ.

## Locale switch on result screen

After one action resolves:
1. snapshot full serialized gameplay Save;
2. render RU result;
3. switch EN;
4. render EN result;
5. require byte-identical gameplay Save.

Do not:
- replay action;
- recompute effects;
- change presentation occurrence;
- append Journal;
- consume RNG.

## Journal boundary

Ordinary action completion Journal rows currently lack stable ordinary-action refs.

This shared result consumer must not:
- rewrite stored Journal text;
- infer action IDs from prose;
- add refs during locale switch.

Journal action-result localization remains separate runtime/Save work.

Event-choice Journal refs from PR54 remain unchanged.

## Ending end-state boundary

Current inactive-run screen uses:
- generic localized state heading;
- latest Journal text;
- ending media.

It does not directly render ending title/description.

Do not force ending-card localization into Journal text or epilogue persistence.

If ending title is later shown there, reuse the same:
`ending.<id>.title`
source.

## RNG rule

All localization lookup is pure presentation.

Neither ending nor action result consumer may:
- read locale to choose gameplay content;
- reroll a scene;
- change candidate eligibility;
- consume gameplay RNG.

## Save rule

Stable IDs stay persisted exactly as gameplay IDs.

Do not persist:
- localized ending title;
- localized action title;
- localized result body
as identity.

Existing stored fallback prose remains compatibility text only.

## Executable acceptance matrix

### Endings
At minimum:
- one legacy ending;
- Lumber Hard Work;
- Forewoman;
- Forest ending.

For each:
RU↔EN same availability/button state and same Save.

### Ordinary actions
At minimum:
- forage;
- repay;
- forest-search;
- brew representative path.

For each:
same gameplay result and localized title/body.

### Ownership regressions
Must retain:
- School course-result localization;
- event-choice outcomeRef localization;
- Journal stable-ref behavior;
- Forest route/result ownership;
- NightFlow.

## Exact-head CI gate

Lead integration requires:
- root-load approved ending/action strings;
- consumer wiring only;
- source regression;
- RU↔EN renderer Save-invariance tests;
- full exact-head CI;
- successful post-merge main push.

## Verdict

`ACCEPTANCE_CONTRACT_READY`.

Accept only render-time localization driven by stable ending/action identities with zero eligibility/effect/RNG/Save drift.
