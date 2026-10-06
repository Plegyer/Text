# Chat 5 — Retired Tavern Cleanup Exact-Head QA v23

Status: **READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 5  
QA branch: `chat5/qa-retired-tavern-cleanup-v23`

## Frozen producer under verification

`chat6/retired-tavern-localization-cleanup-v31@eb03a847347339ade109b0ec9022b81cd4abadaf`

Frozen implementation head from producer handoff:

`b37551d567d8017dbc25b87d66034af3e9c7a812`

Task seed used for production firewall:

`36711bc8c9c5e8c2b99ffb8f8c861c462c414bca`

The frozen producer was not mutated.

## Final successful executable evidence

Workflow:

`Chat 5 Retired Tavern Cleanup v23 exact-head QA`

Run:

`37458000037`

Job:

`112250237851`

Runner:

self-hosted Windows X64

Node:

`22.18.0`

Exact checkout guard verified:

`eb03a847347339ade109b0ec9022b81cd4abadaf`

## Production firewall

The QA gate compared the producer implementation against its task seed.

Allowed implementation delta was exactly:

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`
2. `mindy-successor/prior-work/astra/prototype-m3.2/tests/retired-tavern-localization-cleanup-v31.test.ts`

The firewall passed.

It also compared the frozen implementation head with final handoff head under:

`mindy-successor/prior-work/astra/prototype-m3.2`

Result:

**no post-implementation production/test delta**

The final handoff commit therefore does not mutate prototype production/test files after the frozen implementation.

## Build/schema gate

- `npm ci` — PASS
- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
  - `Content OK: 84 packs, 357 events, 39 actions, 43 endings.`
- `npm run build` — **PASS**
  - `Built renderer, content catalog and desktop save validator.`

## Tavern cleanup + D41 compatibility bundle

Executed:

```text
node --experimental-strip-types --test
tests/retired-tavern-localization-cleanup-v31.test.ts
tests/advanced-endings-tranche-a-v11.test.ts
tests/migration.test.ts
tests/presentation-legacy-migration.test.ts
```

Result:

- tests: **24**
- pass: **24**
- fail: **0**

This verifies the requested cleanup and D41/history compatibility surface:

- all six approved retired Tavern presentation-localization rows remain absent;
- migration-oriented retired Tavern ending title/description copy remains;
- retired unlock labels remain;
- D41 legacy mapping remains:
  - `tavern-stay -> ending.tavern.innkeeper`
  - `tavern-guild -> ending.tavern.sanctuary`
  - `tavern-court -> ending.tavern.information-broker`
- save migration/history behavior stays green;
- presentation legacy migration stays green.

## Presentation/source-integrity adjacency bundle

Executed:

```text
node --experimental-strip-types --test
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/chat3-tavern-live-authored-v15.test.ts
```

Result:

- tests: **15**
- pass: **15**
- fail: **0**

This verifies:

- current ending/presentation parity remains green;
- source-integrity remains green;
- live Tavern authored surface remains green;
- retired Tavern identities are not reintroduced into live ending definitions;
- retired Tavern identities are not reintroduced into presentation slots.

## Focused total

Across the two executable test bundles:

**39 / 39 PASS**

No full CI was run.

## Cleanup surface verified

The producer removes exactly these six retired presentation-localization rows:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

Compatibility rows intentionally remain:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`
- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

No live Tavern ending or presentation identity was restored.

## QA harness repair history

### Attempt 1

Run:

`37457831597`

Job:

`112249686608`

Failure occurred before Node/tests because the self-hosted runner does not provide `bash`.

The checkout itself had already succeeded and logged:

`HEAD is now at eb03a847...`

This was a QA shell defect, not a producer defect.

### Attempt 2

Run:

`37457928539`

Job:

`112250006032`

Exact SHA guard passed.

Production firewall then failed because the Node diff parser was accidentally over-escaped and treated two newline-separated paths as one string.

The log visibly showed the expected two-file implementation delta.

This was a QA parser defect, not a producer defect.

### Attempt 3

Run:

`37458000037`

After changing only QA harness code:

- exact SHA guard PASS;
- production firewall PASS;
- npm ci PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- compatibility tests 24/24 PASS;
- presentation/source tests 15/15 PASS.

No frozen producer file changed during any QA repair.

## Final disposition

Frozen producer:

`chat6/retired-tavern-localization-cleanup-v31@eb03a847347339ade109b0ec9022b81cd4abadaf`

is executable-green for the exact Chat 5 v23 verification scope.

Verified:

- exact SHA;
- production firewall;
- typecheck;
- validate;
- build;
- v31 cleanup focused regression;
- D41 migration/history compatibility;
- presentation/source-integrity adjacency;
- no live retired Tavern ending reintroduction;
- no retired Tavern presentation slot reintroduction.

No full CI was run.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
