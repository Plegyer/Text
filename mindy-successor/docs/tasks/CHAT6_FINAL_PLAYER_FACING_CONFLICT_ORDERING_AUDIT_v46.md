# Chat 6 — Final Player-Facing Conflict / Ordering Audit v46

Status: **COMPLETE — INPUT TO v47**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-cumulative-v45`  
Date: 2026-10-06

Scope: ordering and collision contract for composing the accepted player-facing layers onto a future final-main / Chat2 assembly head. This is a research/assembly document only. No runtime or content file is changed by v46.

## 1. Current reference head facts

At audit time, current `main` resolves to:

- `src/ui/app.ts` blob: `149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`
- `content/localization.json` blob: `9281d3880d01c54f352effa5e372ad5393cc3eaa` (D42 accepted localization snapshot)
- `content/presentation.json` blob: `e800d2b16f2bc868273e39d45718dcd0c7fe74a5` (D42 accepted presentation snapshot)

The accepted v42/v43 UI patch was authored directly from that `app.ts` base and produces blob `43a3fdcd7a3a4cabb2ab84777feb9bb826cbdeb7` at implementation head `fac645878ebd726f50fd1364ac72414796755a2d`.

Historical producer app blobs are not cumulative:

- Activity v17 app blob: `02afa7a9b32720c6e391c0a07974d662e77f8ea0`
- Palace v19 app blob: `1e444168484734663dfab49db97ac0de440e53c5`
- v42/v43 app blob: `43a3fdcd7a3a4cabb2ab84777feb9bb826cbdeb7`

Therefore none of those historical app snapshots is a valid whole-file final source.

## 2. Exact cumulative composition order

Use this order. A layer already present with byte/JSON-equivalent target values is a no-op.

### Phase 0 — prerequisite / runtime gate

Before shared JSON or UI composition:

1. preserve the current assembled runtime/mechanics head;
2. require Activity mechanics/content authority `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4` before Activity v17;
3. require Palace mechanics/content authority `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48` before Palace v19;
4. preserve D42 runtime/content authority and its Night/private-space/Secret-Debt consumer seams;
5. confirm assembly is merge-by-key / merge-by-slot / patch-by-hunk only.

If an owning runtime prerequisite is absent, STOP rather than importing a producer's shared runtime file.

### Phase 1 — v26 localization upserts

Apply the 70 ADD + 9 REPLACE operations from localization blob `b355f08650cc1cdbb0d08e07529382c1afb0605c`, predecessor `65568847f09df4997fffc6facb7dc7907a10c872`.

Defer the six v26 deletes to the final deletion fence.

### Phase 2 — v27 Secret Debt localization

Apply the 9 ADD operations from `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`.

### Phase 3 — D42 localization + presentation

Apply / verify:

- 110 localization ADDs from `9281d3880d01c54f352effa5e372ad5393cc3eaa`;
- 12 presentation slot ADDs from `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`.

On current main these are already the shared-file snapshots, so this phase is expected to no-op there. Do not use that fact as permission to overwrite a future newer file.

### Phase 4 — Activity v17 overlay + owned runtime seam

Only after v16-r1 mechanics/content is present:

- 9 localization ADD + 9 REPLACE from `4449ca46ad6580ca5f36adf140e9e1e14a007b64`, predecessor `c68f8eed960371c987f1ec79a6f219b6a5ffc8b5`;
- 3 presentation slot ADDs from `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`;
- preserve/integrate the accepted localized ended-state epilogue consumer and Activity UI seam through the owning runtime/content assembly.

Do not copy Activity v17 `src/ui/app.ts` wholesale.

### Phase 5 — v36 Activity Network correction

Immediately after Activity v17 localization, make `ending.ending.activity.network.epilogue` authoritative from `d631544c96c724375ac48d3c563dd1c1865bb5b5`.

This is the only accepted late localization override in the cumulative packet.

Conflict rule for this key:

- absent -> add v36 final value;
- equal to Activity v17 predecessor value -> replace;
- equal to v36 final value -> no-op;
- any other value -> STOP.

Never reapply the Activity v17 four-direction wording after v36.

### Phase 6 — Palace v19 overlay + owning content/UI seam

Only after Palace v18 mechanics/content is present:

- 14 localization ADD + 63 REPLACE from `64922de3b6aab606f9b2932853e6bbd686766b6a`, predecessor `7f7d976fc686a599abe3917018925ba0b85e1885`;
- 19 presentation slot ADDs from `02c9a19eee0366131f793ed9e141b33a93f213b3`;
- integrate Palace player-facing runtime/UI changes through the accepted Palace owner path.

Do not copy Palace v19 `src/ui/app.ts`, `definitions.json`, or packs wholesale.

### Phase 7 — global presentation v23

Apply 93 presentation slot ADDs from `defe52fe665831a7194e4b7d0df99ae28588207c`, predecessor `83ce718fd324552b687342cd34707d62da8572fd`.

### Phase 8 — v29 caption closure

Apply:

- `media.stage.room.caption`
- `media.base.town.caption`

from `75df2ed68b5cbf0a451e33d81e060ee5a3360d10`.

Keeping this after v23 preserves the semantic pairing with the global room/town mappings.

### Phase 9 — v40 21-row player-facing repair

Apply all 21 ADD keys from `4626e55203cda0d841a04eaf781db7879781138c`, predecessor D42 blob `9281d3880d01c54f352effa5e372ad5393cc3eaa`.

v40 must precede final Strong Meta UI acceptance because it supplies the locked Secret Debt reward labels used by the generic `unlock.${rewardId}.label` consumer.

### Phase 10 — v42/v43 localization

Apply all 14 ADD keys from `bb8143eb836ca7be3a841ad6aeac8a106f751e28`, predecessor D42 blob `9281d3880d01c54f352effa5e372ad5393cc3eaa`:

- 13 `ui.strongMeta.*` rows;
- `ui.menu.catalogInspector`.

This phase must be present before or atomically with the v42/v43 UI hunks.

### Phase 11 — v42/v43 UI hunks on the assembled app

After Activity/Palace/other accepted runtime/UI changes are integrated, rebase the seven v42/v43 semantic hunks from implementation head `fac645878ebd726f50fd1364ac72414796755a2d` onto the assembled `src/ui/app.ts`.

Do not cherry-pick by assuming the long template lines are unchanged and do not replace the file. Apply the semantic hunks listed in v45 section 5.

Reason for placing this late: the v42/v43 patch was authored from current D42 main, while final assembly may already contain newer Activity/Palace consumer changes. Rebasing Strong Meta/modal hunks last minimizes accidental regression of those owner seams.

### Phase 12 — final deletion fence

After every upsert/slot/UI composition is complete, delete exactly:

- six v26 disconnected Merchant/Artist single-prefix Hard Work rows;
- six v31 retired Tavern presentation-localization rows.

No later layer in the cumulative packet targets these 12 keys, so deleting last prevents resurrection from an older snapshot.

### Phase 13 — focused QA

Add/retain the producer tests and run the v47 focused roster. No full CI is required by this Chat 6 packet.

## 3. Localization collision audit

Machine comparison of all accepted frozen localization deltas found one and only one mutating-key overlap:

- Activity v17 and v36 both target `ending.ending.activity.network.epilogue`.

This overlap is intentional and ordered: v36 wins only for that key.

There are **zero** other mutating-key overlaps among:

- v26;
- v27;
- D42;
- Activity v17;
- Palace v19;
- v29;
- v31;
- v36;
- v40;
- v42/v43.

Therefore no generic last-write-wins policy is allowed.

## 4. Presentation collision audit

Across D42 (12), Activity v17 (3), Palace v19 (19), and global presentation v23 (93):

- target slot count: 127;
- direct target-slot collisions: 0;
- accepted presentation replacements: 0;
- accepted presentation deletions: 0.

A present non-identical target slot is always STOP, never overwrite.

## 5. Shared `app.ts` collision audit

All three accepted producer families touch `src/ui/app.ts`, but their **accepted semantic targets** are separable.

### Activity v17 semantic targets

Activity v17 owns, among other scoped seams:

- localized ended-state epilogue rendering;
- expanded Activity route state/progress presentation;
- additional Activity entries in Explore;
- Activity-specific checkpoint/status presentation.

Its historical branch app blob is stale relative to D42 current main in Night localization helpers. Whole-file replacement would regress accepted D42 behavior.

### Palace v19 semantic targets

Palace v19 owns, among other scoped seams:

- Palace UI helper/model import;
- Palace work-panel UI;
- Palace ending-card/Legacy presentation;
- Palace action labeling and dedicated player-facing Palace surfaces.

Its historical branch app blob is also stale relative to D42 current main. Whole-file replacement would regress newer shared UI behavior.

### v42/v43 semantic targets

v42/v43 owns only:

- Strong Meta registry import/helper/render/handlers and creation-time command stay-on-screen behavior;
- insertion of the Strong Meta selector after Hard Work during creation;
- generic modal accessible-name resolution through `panelAccessibleName`.

No accepted Activity or Palace semantic requirement targets those same Strong Meta/modal behaviors.

### Collision disposition

- semantic target collision: **none identified**;
- textual same-file conflict risk: **high if historical files/commits are applied wholesale**;
- safe method: integrate owner runtime/UI seams first, then apply v42/v43 by semantic hunk and run focused UI tests.

If an assembled app has removed/renamed the creation, modal, perform, or handler anchors so the seven v42/v43 hunks cannot be mapped unambiguously, STOP for manual owner review.

## 6. Generic conflict policy

### Localization ADD

- absent -> add exact source value;
- already exact -> no-op;
- present with different value -> STOP.

### Localization REPLACE

- current equals frozen predecessor -> replace with frozen final;
- current already equals frozen final -> no-op;
- any third value -> STOP.

### Localization DELETE

- absent -> no-op;
- present with the known retired/disconnected value and no live consumer -> delete;
- repurposed value or live consumer -> STOP.

### Presentation ADD

- absent -> add exact source slot object;
- exact object already present -> no-op;
- any different object -> STOP.

### UI semantic hunk

- required target seam exists and behavior is equivalent to frozen predecessor -> apply;
- exact accepted behavior already present -> no-op;
- target seam contains a distinct newer behavior that cannot be preserved while adding the accepted hunk -> STOP; do not force-replace.

## 7. Retention / anti-regression fence

During composition, preserve:

- all nine Tavern migration compatibility rows listed in v45;
- D41 Tavern migration mapping;
- D42 Night localization/presentation/runtime behavior;
- Activity v16-r1 mechanics and v17 player-facing consumer behavior;
- Palace v18 mechanics/content and v19 accepted player-facing behavior;
- v23 global mappings;
- all current localization keys and presentation slots outside the exact cumulative target sets;
- Strong Meta engine/schema/capacity/ownership/snapshot semantics;
- every assembled `app.ts` behavior outside the accepted owner hunks.

No whole-file replacement is permitted for shared JSON/runtime/UI files.

**v46 COMPLETE**
