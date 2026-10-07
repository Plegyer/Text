# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - D39 LIVE CONSUMER NARROW REPAIR**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact repair base:
`42a34904fe9ab2d04d53902a82e53643d3255642`

D39 runtime remains CLOSED on:
`68f762ae6e87083e37badc418f9c903f7617419a`

Do not redo runtime.
Do not apply Strong Meta UI.
Do not apply D48.
Do not run Stage2 full CI.

## Leader executable finding

Exact-source gate:
- source: `42a34904fe9ab2d04d53902a82e53643d3255642`
- run: `37655550245`
- npm ci: PASS
- typecheck: PASS
- validate: PASS
- build: PASS
- focused D39 live-consumer bundle: **113/114 PASS**

Single failure:
`tests/d39-formal-introduction-assassin-v46.test.ts`

The failing expectation is valid. This is a real selective-merge omission, not a stale test.

## Exact missing consumer fragment

File:
`content/packs/assassin-relationship.json`

Event:
`assassin.relationship.trust`

Current condition wrongly accepts only:
- relationship stage `introduced`

Frozen authority:
`chat3/d39-consumer-producer-v45@090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

Required condition must be:

- `kind: any`
- children:
  - relationshipStage `assassin.handler` = `introduced`
  - relationshipStage `assassin.handler` = `formal-introduced`

Then keep the existing second condition unchanged:
- relationshipFact `introduced-at-work` present true

Do not change:
- trust event trigger/reaction triggers
- priority/delivery/maxShows
- trust choice
- trust effects
- `build-trust` transition
- Formal Introduction choice
- any other Assassin event
- localization
- definitions
- tests unless typing requires no semantic weakening

## Why this is required

Formal Introduction intentionally moves:
`introduced -> formal-introduced`

Normal trust must remain reachable afterward.
The relationship machine already permits `build-trust` from both stages, but the live trust event currently blocks `formal-introduced`.

The frozen producer authority already contains this exact `any(introduced, formal-introduced)` event condition.

## Verification

Run on exact resulting head if available:
1. `npm run typecheck`
2. `npm run validate`
3. `npm run build`
4. focused:
   - `tests/d39-formal-introduction-assassin-v46.test.ts`
   - Assassin focused tests
   - `tests/school-life-content-reload.test.ts`
   - `tests/palace-d39-reward-producer-v20.test.ts`
   - Strong Meta focused tests

Do not run Stage2 full CI.

## Stop marker

Stop at:
`D39_LIVE_CONSUMER_REPAIR_READY_FOR_LEADER`

Report exact head, changed files, and verification result.
