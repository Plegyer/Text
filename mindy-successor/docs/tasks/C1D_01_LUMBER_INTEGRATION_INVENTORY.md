# C1D-01 — Exact-current Lumber integration inventory

Status: COMPLETE INVENTORY / NO RUNTIME EDITS  
Owner: Chat 1 Developer / Integration Developer  
Inventory base: `main` @ `921abfa79f4dba9c0acee4eca6724c3ed122d42f`  
Worker source inspected: `chat1/lumber-vertical-slice` @ `8386391dc3dbce0cd7d856454941d39df8ed88fa`  
Coordination authority inspected from open PR #70 branch: `lead/recreate-five-worker-chats-v2` @ `ab01b3dd08063b2c7fe507b7cb8dcdea335daaa8`

## Authority and baseline

Current `main` is the merged PR #68 baseline. PR #68 removed two unintegrated files from the shipped pack directory:

- `content/packs/lumber-career-hotfix.json`
- `content/packs/lumber-progression.json`

The removal is intentional. The former was not a runtime Pack; the latter referenced incomplete career progression and old numeric assumptions. Their removal must not be reversed wholesale.

The active current-main pointer and the PR #70 coordination queue agree on the following:

- existing career: `lumber`;
- existing stages: `newcomer`, `accepted-hand`;
- existing transition: `accept-hand`;
- required missing stage identities for the vertical slice: `trusted-worker`, `veteran`, `forewoman-ready`, `forest-ready`, `outcome-ready`;
- existing endings remain `ending.lumber.hard-work`, `ending.lumber.forewoman`, `ending.lumber.forest`;
- Hard Work is fixed at `completed_shifts >= 50`;
- exact intermediate Lumber shift thresholds remain OPEN unless a later authority explicitly locks them;
- existing career / relationship / event / Activity / ending / Save contracts must be reused.

`CAREER_LUMBER_DRAFT_v0.md` also keeps intermediate shift gates symbolic (`MILESTONE_A`, `MILESTONE_B`) rather than locking numbers.

## Current-main Lumber material

### REUSABLE

1. `content/definitions.json`
   - `lumber.shift` spends 1 Energy and increments `RunState.progression.careers.lumber.counters.completed_shifts` exactly once.
   - `lumber` career currently contains `newcomer -> accepted-hand` through `accept-hand`.
   - `lumber.foreman` relationship has `unknown -> professional -> route-professional`.
   - `lumber.forest` Activity and result IDs already exist.
   - all three Lumber ending IDs already exist.
   - Hard Work eligibility is directly and independently encoded as `completed_shifts >= 50`.

2. `content/packs/lumber-production.json`
   - schema-valid active production pack;
   - `lumber.career-first-shift` advances the existing `accept-hand` transition;
   - `lumber.foreman-notice` opens the existing professional Foreman route;
   - should be extended selectively, not replaced.

3. `content/packs/lumber-cross-production.json`
   - schema-valid active cross-system consumer pack;
   - already consumes `lumber.school.management-ready` into Lumber career facts;
   - already consumes successful `lumber.forest` ActivityResult into Lumber career facts;
   - reusable as the current consumer seam.
   - School authoring identity/source remains an external dependency for C1D-10; Forest authoring/result handoff remains an external dependency for C1D-11.

4. `content/packs/lumber-night-production.json`
   - schema-valid active night consumer;
   - keeps the Foreman route professional and uses existing NightFlow semantics;
   - no new daytime Energy cost;
   - reusable as-is unless a later integration condition must reference its existing relationship fact.

5. Existing Lumber target fixtures/tests:
   - `content/lumber-target-definitions.fixture.json`;
   - `content/lumber-product-acceptance.fixture-manifest.json`;
   - `tests/lumber-target-production.test.ts`;
   - `tests/lumber-target-cross-system.test.ts`;
   - `tests/lumber-night-acceptance.test.ts`.
   These are reusable regression/acceptance references, not a replacement production state machine. They already prove the independent 49 -> 50 Hard Work gate, Foreman professional route, School return seam, Forest return seam, and ending eligibility without automatic commitment.

6. `content/packs/ds-lumber.json`
   - existing shipped legacy event material using visits/flags rather than the typed Lumber career stages;
   - preserve during this queue unless an actual collision is demonstrated;
   - it is not authority for new career-stage thresholds.

### STALE

1. PR #68 removed `lumber-career-hotfix.json`.
   - It was a change-description object, not a runtime Pack.
   - It must not be restored to shipped `content/packs`.

2. `chat1/lumber-vertical-slice/mindy-successor/docs/tasks/CURRENT_CHAT1_LUMBER_IMPLEMENTATION_HANDOFF.md`.
   - Its only durable content is “existing systems only / no parallel Save or profession state”.
   - Its `IN_PROGRESS` status and old task framing are superseded by the current role contract, pointer and C1D queue.

3. Worker idea `leadership-experience` career fact.
   - No current ending, transition, pointer or active consumer requires it.
   - It is not approved as a new narrative/progression fact and must not be imported merely because it exists in the draft branch.

### CONFLICTING

1. PR #68 removed old shipped `lumber-progression.json`.
   - It contained old hard-coded progression thresholds and referenced missing stages/transitions.
   - PR #68 intentionally restored the valid runtime baseline by removing it.

2. Worker file `chat1/lumber-vertical-slice/.../content/packs/lumber-progression.json`.
   - `trusted-worker` is hard-coded to `completed_shifts >= 10`; this is not locked.
   - `veteran` is hard-coded to `completed_shifts >= 25`; this is not locked.
   - it represents `trusted-worker`, `veteran`, `forewoman-ready`, `forest-ready`, `outcome-ready` as career facts instead of advancing the approved career stage identities;
   - it ties generic `outcome-ready` to `completed_shifts >= 50`, which incorrectly reuses the Hard Work-specific invariant as a common outcome gate and can misrepresent Forewoman/Forest readiness;
   - it must not be imported wholesale.

3. Worker use of `forewoman-ready` as a career fact.
   - The active implementation contract requires a career stage identity, not a shadow fact standing in for that stage.
   - Current Forewoman ending eligibility already uses `management-school-ready`, `forewoman-problem-resolved`, and `lumber.foreman:route-professional`.

4. Worker use of `trusted-worker`, `veteran`, `forest-ready`, and `outcome-ready` as milestone facts in place of stage transitions.
   - The active pointer explicitly requires missing Lumber stage identities to be added to the existing career mechanism.

### BLOCKED

1. Worker file `chat1/lumber-vertical-slice/.../content/packs/lumber-leadership-progress.json`.
   - Its event shell is structurally close to current Pack style, but it reacts to a draft `forewoman-ready` fact and writes the unapproved `leadership-experience` fact.
   - It has no current production consumer and should not ship until the Forewoman stage/transition contract is wired through approved existing facts/relationship state.
   - Selective text/Pack shape can be reconsidered later; current file is blocked from direct integration.

2. Trusted-worker transition numeric gate.
   - Identity is approved.
   - Exact intermediate shift threshold is not.

3. Veteran transition numeric gate.
   - Identity is approved.
   - Exact intermediate shift threshold is not.

4. Any transition that requires a new School-authored producer identity beyond the existing current-main consumer seam.
   - C1D-10 waits for Chat 5 approved handoff.

5. Any transition that requires new Forest-authored result/content hooks beyond the existing ActivityResult seam.
   - C1D-11 waits for Chat 3 approved handoff.

## Worker branch idea-by-idea disposition

- Existing `accept-hand` anchor: **REUSABLE**; already live on main.
- New stage identities `trusted-worker`, `veteran`, `forewoman-ready`, `forest-ready`, `outcome-ready`: **REUSABLE** as approved identities.
- Literal draft thresholds `10` and `25`: **CONFLICTING**.
- Old removed threshold `30`: **CONFLICTING** and historical only.
- `completed_shifts >= 50` for `ending.lumber.hard-work`: **REUSABLE / LOCKED**.
- `completed_shifts >= 50` as a generic `outcome-ready` transition gate: **CONFLICTING**.
- Foreman professional relationship route: **REUSABLE**; already live.
- School -> Lumber reaction pattern: **REUSABLE** current consumer seam; new authoring producer is **BLOCKED** on Chat 5 handoff.
- Forest ActivityResult -> Lumber reaction pattern: **REUSABLE** current consumer seam; new authored hooks are **BLOCKED** on Chat 3 handoff.
- Draft `leadership-experience` fact: **STALE** unless a later authority explicitly adopts it.
- Draft career facts shadowing approved stage identities: **CONFLICTING**.
- Worker event wording / Pack envelope: **REUSABLE only selectively** after removing conflicting conditions/effects; no whole-file import.

## Branch and PR overlap check

`chat1/lumber-vertical-slice` is diverged from current main and must remain a draft source. Against current `main`, it is 5 commits ahead and 7 behind; its unique diff is four files:

- `mindy-successor/docs/tasks/CHAT1_LUMBER_VERTICAL_SLICE_HANDOFF.md`;
- `mindy-successor/docs/tasks/CURRENT_CHAT1_LUMBER_IMPLEMENTATION_HANDOFF.md`;
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-leadership-progress.json`;
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-progression.json`.

Open PR #70 changes coordination/task files only and establishes the active C1D queue; it does not modify Lumber production runtime files.

Open PR #67 changes ordinary-poverty content/fixtures/tests only. Its changed-file set contains no Lumber production/runtime file and creates no direct file collision with C1D-01/C1D-02.

## Exact dependency recorded for later queue work

C1D-04 cannot safely choose the exact intermediate shift thresholds for Trusted Worker / Veteran progression from the currently authoritative material. The later implementation must either:

- consume a newer explicit Lead-approved value if one appears; or
- report the single missing design value and continue independent tasks.

No value from 10 / 25 / 30 is promoted by this inventory.

## C1D-02 extraction boundary

C1D-02 should start from current main, not the draft branch. The selective source candidates are limited to schema-compatible event envelope/text/reaction patterns that do not import:

- draft numeric thresholds;
- shadow career facts replacing stages;
- `leadership-experience`;
- generic `outcome-ready = 50 shifts`;
- removed non-Pack hotfix material.

No runtime code/content was changed by C1D-01.
