# Chat 3 Starter Careers + Poverty Candidate Handoff v1

Status: C3-24 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@75cbd6f5aa2ae81fa7b677c7e47d8d16faa75892`.

## Scope

This candidate contains C3-15 through C3-23 only:
- Satyr Maid identity/content handoffs;
- Undead Farm identity/content handoffs;
- incremental ordinary-poverty seasonal/contact/recovery depth;
- focused content-side collision regression.

It does not reopen historical C3-01..14 work.

Historical PR #67 and PR #82 are closed/archive sources. Current main already contains the selectively integrated poverty depth consumer/localization and the prior Chat 3 Forest/poverty handoff fixtures needed as context.

## Production impact

This candidate adds new docs, fixtures and one focused test only.

It does not modify:
- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- any `src/` runtime/UI file;
- any media asset;
- School content;
- relationship state;
- Save/RNG;
- endings;
- Secret Debt runtime.

## Satyr Maid

Current exact production surface remains:
- career `satyr-maid`;
- stages `new-maid`, `known-face`;
- transition `first-shift`;
- fact `first-shift-complete`;
- action `satyr-maid.shift`;
- seasonal scenes `spring.default`, `summer.default`, `autumn.default`, `winter.default`.

Candidate handoffs prepare:
- four RU/EN seasonal service/guest texts;
- four presentation-only boundary/flirt/recognition variants.

No persistent guest, flirt, boundary, reputation, relationship, NightFlow or ending state is created.

## Undead Farm

Current exact production surface remains:
- career `undead-farm`;
- stages `new-hand`, `reliable-helper`;
- transition `first-shift`;
- fact `first-shift-complete`;
- action `undead-farm.shift`;
- four seasonal scenes;
- global item `field_preservation_kit` with capability `preserve_specimen`.

Candidate handoffs prepare:
- four RU/EN agriculture/Magic/Reason texts;
- two successor-flavor hooks;
- two external-anomaly hints.

No Farm research fact, specimen item, trust/relationship, management state, world fact, Activity hook, ending or reward is created. The existing `preserve_specimen` capability remains unconsumed by Undead Farm.

## Ordinary poverty

Current main already contains:
- 26 production depth localization keys;
- the shared `src/ui/povertyDepth.ts` consumer;
- prior C3-07/C3-08 handoff fixtures that remain unconsumed as production depth keys.

C3-21 adds eight new append-only RU/EN seasonal depth candidates:
- two spring;
- two summer;
- two autumn;
- two winter.

C3-22 adds six new append-only RU/EN small-job/help/contact/recovery candidates.

All 14 candidate keys:
- map to existing ordinary-poverty event/variant identities;
- are absent from current production localization at candidate creation;
- preserve current core fallback and occurrence rotation;
- do not introduce persistent contacts, recovery state, debt or Secret Debt.

## Collision regression

Added:
- `content/chat3-starter-poverty-collision-v1.fixture.json`;
- `tests/chat3-starter-poverty-collision-v1.test.ts`;
- `docs/tasks/CHAT3_STARTER_POVERTY_COLLISION_REGRESSION_V1.md`.

The regression verifies current exact career/scene identities, RU/EN completeness, absent persistent systems, existing preservation capability boundaries, poverty event/variant mappings, current effect snapshots and no candidate localization collision.

## Candidate files

Career docs:
- `docs/career-content/SATYR_MAID_CONTENT_IDENTITY_MAP_V1.md`
- `docs/career-content/SATYR_MAID_SERVICE_CONTENT_BUNDLE_V1.md`
- `docs/career-content/SATYR_MAID_BOUNDARY_REPUTATION_CONTENT_V1.md`
- `docs/career-content/UNDEAD_FARM_CONTENT_IDENTITY_MAP_V1.md`
- `docs/career-content/UNDEAD_FARM_RESEARCH_AGRICULTURE_CONTENT_V1.md`
- `docs/career-content/UNDEAD_FARM_SUCCESSOR_EXTERNAL_CONTENT_V1.md`

Poverty docs:
- `docs/poverty-prep/POVERTY_SEASONAL_DEPTH_V2.md`
- `docs/poverty-prep/POVERTY_CONTACTS_RECOVERY_DEPTH_V2.md`

Regression/handoff docs:
- `docs/tasks/CHAT3_STARTER_POVERTY_COLLISION_REGRESSION_V1.md`
- this handoff.

Content fixtures:
- `content/satyr-maid-content-identity-map-v1.fixture.json`
- `content/satyr-maid-service-content-v1.fixture.json`
- `content/satyr-maid-boundary-reputation-content-v1.fixture.json`
- `content/undead-farm-content-identity-map-v1.fixture.json`
- `content/undead-farm-research-agriculture-content-v1.fixture.json`
- `content/undead-farm-successor-external-content-v1.fixture.json`
- `content/poverty-seasonal-depth-v2.fixture.json`
- `content/poverty-contacts-recovery-depth-v2.fixture.json`
- `content/chat3-starter-poverty-collision-v1.fixture.json`

Test:
- `tests/chat3-starter-poverty-collision-v1.test.ts`.

## Checks before candidate creation

Revalidated against current main:
- Satyr career fixture exact: PASS;
- Undead Farm career fixture exact: PASS;
- Satyr/Undead scene references: PASS;
- no Satyr/Undead production event/relationship/ending identity: PASS;
- `field_preservation_kit -> preserve_specimen`: present; Farm consumer still absent;
- 14 new poverty event/variant mappings: PASS;
- 14 new poverty localization keys unique and absent from current production localization: PASS;
- six C3-22 positive-choice effect snapshots match current production: PASS.

Repository exact-head CI and frozen head are recorded in the candidate PR after creation.

## Selective consumption

Chat 1 / Lead may consume later:
- Satyr/Undead RU/EN action-scene strings through an approved multi-scene action localization consumer;
- presentation-only Satyr boundary/reputation and Undead successor/external hooks only where an approved content selector exists;
- C3-21/C3-22 poverty keys by appending them to current localization and the exact current poverty-depth lookup.

Do not consume fixture metadata as gameplay state.

## Open dependencies not invented

Satyr Maid:
- persistent guest/flirt/boundary/reputation/relationship identities;
- Night hooks/endings.

Undead Farm:
- research/specimen consumers;
- School continuation;
- successor trust/management;
- external Activity/world-fact return;
- endings.

Ordinary poverty:
- persistent contacts/recovery milestone remain intentionally absent.

Secret Debt:
- stays separate; no Product-open values or runtime state are chosen here.

QA acceptance remains Chat 4 ownership.
