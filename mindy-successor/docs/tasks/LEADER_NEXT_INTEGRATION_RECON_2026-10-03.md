# Leader 1 — next integration reconnaissance — 2026-10-03

Status: **INTEGRATION GUIDANCE / CURRENT-MAIN AWARE**

Purpose: durable assembly notes for the two frozen producer packets scheduled after shared Hard Work Meta merge.

Current shared runtime merge:
- PR #264 merged as `de6f95c89cdb43fb853bc569745e822bb1f2636b`;
- exact-main CI #1126 was still running when this note was written.

Do not start the next Chat 2 assembly until exact-main #1126 is green.

## 1. Frozen New Start+ UI producer

Frozen head:
`837156277f7329f0187b04442acb8d5258a2e189`

Dependency base:
`chat4/hard-work-meta-shared-runtime-v1@c085eda62dd39f71d3a4c75a6c31f4c72527039a`

The frozen head is **8 commits ahead** of the shared runtime base.

Whole producer delta is exactly:

- add `content/hard-work-new-start-presentation-v2.fixture.json`;
- modify `src/ui/app.ts`;
- add `src/ui/hardWorkNewStart.ts`;
- modify `src/ui/style.css`;
- add `tests/hard-work-newstart-presentation-v2.test.ts`;
- add `tests/hard-work-newstart-ui-v2.test.ts`.

### Current-main drift audit

At shared-runtime current main after #264:

- `src/ui/app.ts` blob is byte-identical to producer base `c085...`;
- `src/ui/style.css` blob is byte-identical to producer base;
- `src/core/hardWorkMeta.ts` is byte-identical to producer base;
- `src/core/hardWorkPackageCatalog.ts` is byte-identical to producer base;
- `src/core/schema.ts` is byte-identical to producer base;
- the four newly added UI/fixture/test files do not exist on current main.

Therefore New Start+ UI should be a mechanically clean current-main reconstruction.

### Required semantic preservation

The UI packet already correctly:
- shows only earned ordinary Hard Work packages;
- filters Secret Debt/non-ordinary IDs;
- supports none/some/all package activation with no slot limit;
- uses the shared centralized package catalog;
- keeps permanent profession early access separate from package activation;
- uses `palaceNewStartQualified()` for 10/10 permanent + 10/10 active;
- describes cap 200 as maximum-only, with values unchanged;
- exposes Prostitute Lust +3 as package content;
- does not restore permanent Palace Meta unlock.

Do not add D27/D28 Keystone/Specialist UI into this assembly. That is a separate later Meta catalog/loadout feature.

## 2. Frozen Palace D23 consumer producer

Frozen head:
`9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`

Dependency base:
`chat4/hard-work-meta-shared-runtime-v1@c085eda62dd39f71d3a4c75a6c31f4c72527039a`

The frozen head is **6 commits ahead** of that base.

Whole producer delta:
- add `docs/tasks/CHAT6_PALACE_D23_CONSUMER_INTEGRATION_v8.md`;
- modify `content/localization.json`;
- add `content/packs/palace-invitation.json`;
- modify `src/core/engine.ts` by exactly two lines;
- add `src/core/palace.ts`;
- add `tests/palace-d23-consumer-integration-v8.test.ts`.

### Clean files

At current main:
- `content/localization.json` is byte-identical to producer base;
- `src/core/palace.ts` does not exist;
- invitation pack does not exist;
- focused Palace consumer test does not exist.

Those pieces can be reconstructed from the frozen producer delta.

### Critical engine hazard

**Do not copy the frozen producer `engine.ts` wholesale.**

The producer base `c085...` still contained the stale legacy call:

`ensurePalaceUnlock(s.meta)`

The shared-runtime integration intentionally removed this call before #264 became green because D23 forbids permanent Palace Meta unlock semantics.

Current-main `engine.ts` correctly has no `ensurePalaceUnlock` call.

The Palace consumer's legitimate engine delta is only:

1. add:
   `import {markPalaceCreationQualification} from './palace.ts';`

2. in successful `finishCreation`, after:
   - shared Hard Work packages are applied;
   - the applied package identities are frozen;
   - `hardWorkPackagesApplied` is set;
   - creation is complete at the intended producer ordering point;

   call:
   `markPalaceCreationQualification(s);`

Preserve the current-main absence of `ensurePalaceUnlock`.

### D23 consumer invariants

Focused assembly must preserve:
- 9 permanent + 9 active -> no invitation;
- 10 permanent + 0 active -> no invitation;
- 10 permanent + 9 active -> no invitation;
- 10 permanent + 10 active -> deterministic Day-1 invitation;
- duplicate/Secret Debt/Palace IDs cannot fill missing ordinary careers;
- no RNG/stat/item alternate Palace entry gate;
- invitation/access is run-local;
- no permanent `meta.unlocks['palace']`;
- new life clears access and requires D23 qualification again;
- migrated old completed saves receive no retroactive invitation;
- True readiness remains all 12 progression stats >=91, Lust excluded;
- cap 200 does not change the 91 threshold or multiply values.

## 3. Integration order

After #264 exact-main green:

1. Chat 2 assembles New Start+ UI frozen head `837156...` on fresh exact main.
2. Focused/static QA; Chat 2 may use its sole full-CI lane for the integration candidate when Leader authorizes.
3. Leader merge -> exact-main CI.
4. Only then assemble Palace D23 consumer `9dfa...` on the new exact main.
5. Preserve the engine hazard guidance above.
6. Leader merge -> exact-main CI.

D31 seasonal target-map producer can follow the dependency-safe queue after those already-frozen consumers unless Leader explicitly reorders it.

## 4. Source-of-truth rule

Never cherry-pick only the final commit message SHA without reconstructing the full frozen producer delta from its dependency base:
- New Start+ UI frozen head contains an 8-commit delta;
- Palace D23 consumer frozen head contains a 6-commit delta.

The frozen head identifies the accepted final tree, not a promise that the final individual commit contains the whole feature.
