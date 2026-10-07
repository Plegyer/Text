# Chat 2 — Stage 2 Palace v18 Assembly v68

Status: **START NOW — PALACE v18 ONLY**
Owner: Chat 2 / sole current-main production assembly + full-CI lane

## Base

Current main after Stage 1 closure:

`main@93b12b14ef1ad8cf6a8f786f2fad7d26eaa9619d`

Production tree was exact-main green at:

`ff1dfe3ec3554eaecf068de655e7473dd3387b63`

Stage 1 is CLOSED.

Broad burn-down: **4**.

## Branch

Work only on:

`chat2/assembly-palace-d39-d48-current-main-v68`

Do not create a replacement branch.

## Authority

Primary Palace v18 production authority:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Preassembly/collision authority:

`chat3/palace-full-stack-preassembly-v48`

`mindy-successor/docs/tasks/CHAT3_PALACE_FULL_STACK_PREASSEMBLY_v50.md`

Read that handoff first, but do not replay its research phase.

## This task is ONLY the first Stage 2 tranche

Assemble **Palace v18 mechanics/content** selectively onto current main.

Do NOT yet apply:

- Palace v19 prose/presentation;
- Chat4 capability repair;
- D39 runtime;
- D39 School/Assassin consumers;
- Strong Meta UI closure;
- D48 media overlay.

Those come later in the locked order.

## Palace v18 owned production surfaces

Selective semantic composition may touch only the v18-owned Palace surfaces that actually differ from current main:

- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-invitation.json`
- `content/packs/palace-outcome-finalize.json`
- `content/packs/palace-prince-confrontation.json`
- `content/packs/palace-progression.json`
- `src/core/palace.ts`
- `src/ui/app.ts`
- `src/ui/palaceUi.ts`
- exact Palace v18 focused tests

Do not whole-file replace shared files.

## Mandatory current-main firewall

Preserve all Stage 1 behavior already merged into main:

- Secret Debt runtime/state;
- D51 exact provenance pair behavior;
- forced Night priority;
- poverty/Secret Debt separation;
- current schema/migration fields;
- current shared UI/localization;
- current Strong Meta registry and capacities;
- current Activity/School/Night behavior.

If a historical Palace blob would revert a newer current-main owner, port only the Palace semantic delta.

## Locked Palace v18 invariants

Preserve exactly:

- D23 invitation requires all ten ordinary Hard Work permanent completions and all ten current-life packages;
- explicit invitation acceptance;
- exactly 15 structural duties;
- max 1 structural duty/day;
- Palace duty cost = 1 Energy;
- support max 1/day;
- Prince readiness = all 12 progression stats >= 91;
- Lust excluded;
- confrontation zero money / zero Energy;
- deterministic four blocking phases;
- retryable not-yet path;
- no RNG;
- no automatic ending commit;
- only final successful phase writes `palace.prince-defeated`;
- Return Home lifecycle remains explicit;
- successor world remains real;
- displacement cause remains unknown.

## Known historical issue — DO NOT FIX IN THIS TRANCHE

`content/packs/palace-outcome-finalize.json` historically omits exactly these three existing facts from:

`capabilities.reads.worldFacts`

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

Chat4 owns that narrow repair after this v18 assembled head is frozen.

Historical Palace tests may also need strict typing adaptation.

Do not change mechanics to silence those failures.

## Execution

1. Freeze current main base and re-fetch all shared current-main owners before composing.
2. Compare Palace v18 authority against current main.
3. Apply only Palace v18 semantic delta.
4. Run:
   - `npm ci`
   - `npm run typecheck`
   - `npm run validate`
   - `npm run build`
5. Run the Palace v18 focused tests available from the authority.
6. Classify every red result.
7. Do not repair the known Chat4 capability/test-typing issue yourself.
8. Freeze exact assembled v18 SHA.

## Stop / handoff condition

When v18 composition is complete, stop and report:

`PALACE_V18_READY_FOR_CHAT4_REPAIR`

Include:

- exact branch SHA;
- exact files changed;
- typecheck / validate / build status;
- focused Palace results;
- exact red failures classified as:
  - known capability metadata debt;
  - historical test typing debt;
  - real semantic regression;
  - other.

Do not continue to v19/D39/Strong Meta UI/D48 until Leader 1 clears the Chat4 repair step.

Do not merge main.
