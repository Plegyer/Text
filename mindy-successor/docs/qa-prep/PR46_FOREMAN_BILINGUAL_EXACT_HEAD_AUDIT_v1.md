# PR46 Foreman bilingual exact-head audit v1

Status: COMPLETE / BLOCKED_ON_EXACT_HEAD_CI

PR:
- #46 `Lead: integrate Foreman relationship RU/EN localization`
- base: `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`
- reviewed exact head: `f06a991e5d252931cd74ab2ea3ce1b699d8a6a54`
- state at review: OPEN / mergeable / not merged.

## Reviewed production scope

The PR diff is limited to:
- 11 additive Foreman RU+EN localization entries in `content/localization.json`;
- generic stable-ID Night-choice localization lookup in `src/ui/app.ts`;
- new Foreman bilingual production regression;
- new renderer RU↔EN Foreman Night smoke.

No production relationship definition, Night definition, Lumber pack, Forest pack, ending, Save schema or gameplay RNG file is changed by the reviewed diff.

## Localization payload

The PR adds the reviewed current identities only:
- `event.lumber.foreman-notice.*`
- `nightChoice.lumber.foreman.night.label`
- `event.lumber-night.foreman-professional.*`
- `media.relationship.lumber.foreman.professional.alt`
- `media.relationship.lumber.foreman.night.professional.alt`

All entries have non-empty RU+EN and locale-neutral keys.

No broader relationship roster, deeper Foreman stage, romance route, School result, Hunter/Old Boundary semantics, Secret Debt identity or Palace content is added.

## Generic Night-choice presentation wiring

The reviewed UI change preserves School-specific dynamic formatting first:

- IDs beginning with `school.night_study.` continue to resolve the current course/stat structure and format `ui.school.nightStudyChoice`.
- only non-School choices fall through to:
  `tr('nightChoice.' + id + '.label', fallback)`.

Malformed/unknown School Night-study IDs fall back through the stable-ID localization lookup and then the embedded fallback.

This is presentation-only lookup by the existing gameplay choice ID; it does not create a localized Night choice ID or put locale into gameplay state.

## Exact-head CI evidence

Workflow:
- `mindy-successor check`
- run #68
- run id `36323692624`
- conclusion: FAILURE

Test summary:
- tests: 307
- pass: 305
- fail: 2

### Failure 1 — Hard Work assertion uses the reward ID as the ending ID

Failing test:
`Foreman localization does not alter locked relationship Night or Hard Work mechanics`

The test searches:
`definitions.endings.find(x => x.id === 'hardWork:lumber')`

Current authoritative definitions use:
- ending ID: `ending.lumber.hard-work`
- Meta reward ID: `hardWork:lumber`

Therefore `hardWork` is undefined and `assert.ok(hardWork)` fails.

Correct QA shape:
- find ending by `ending.lumber.hard-work`;
- assert its only condition is `careerCounter(lumber.completed_shifts, gte, 50)`;
- separately assert `metaRewards=[{kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}]`.

Do not rename the production ending merely to satisfy the test.

### Failure 2 — renderer smoke mutates a relationship state object that does not exist yet

Failing test:
`renderer: Foreman relationship and voluntary Night scene localize RU EN without gameplay drift`

The setup performs:
`s.run.progression.relationships['lumber.foreman'].stage='route-professional'`

on a fresh save where that relationship state entry has not yet been materialized, causing:
`Cannot set properties of undefined (setting 'stage')`.

Correct QA shape:
- either create the exact persisted typed relationship state object explicitly with current schema fields; or
- better, reach `route-professional` through the current Lumber/relationship progression path before entering Night.

Do not weaken relationship state validation or change production initialization to make the test pass.

## Mechanic drift check

The reviewed production diff does not alter:
- relationship stages `unknown -> professional -> route-professional`;
- relationship transitions `notice-work` / `choose-professional`;
- `lumber.foreman.night` gameplay identity;
- `night_meetings += 1`;
- `nextDayEnergyDelta = 0`;
- ordinary voluntary Night semantics;
- Lumber Hard Work `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- Forest exact result identities or Lumber continuation;
- Save schema;
- gameplay RNG.

The current failures are regression-test setup/identity mistakes, not evidence that the localization production changes altered mechanics.

## Verdict

`BLOCKED_ON_EXACT_HEAD_CI`.

The localization/UI production diff is within the intended additive presentation scope, but exact head `f06a991...` is red.

A later exact PR46 head must:
1. assert the real Hard Work ending ID and reward separately;
2. use valid current relationship state/progression setup;
3. preserve School dynamic Night-study formatting;
4. prove Foreman RU↔EN choice/pending-scene invariance;
5. pass full exact-head CI before merge.
