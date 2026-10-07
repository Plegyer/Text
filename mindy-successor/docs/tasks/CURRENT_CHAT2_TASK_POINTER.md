# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - D39 LIVE CONSUMERS NOW**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact production base:
`68f762ae6e87083e37badc418f9c903f7617419a`

D39 runtime is CLOSED on this exact base.

Leader executable evidence:
- source: `68f762ae6e87083e37badc418f9c903f7617419a`
- evidence: `LEADER1_D39_RUNTIME_CLOSURE_RESULT_v86.json`
- run: `37648362110`
- npm ci: PASS
- typecheck: PASS
- validate: PASS
- build: PASS
- focused D39 + Palace: PASS (103/103 after closure fixes)

Do not redo D39 runtime.

## This task only

Apply locked Stage 2 step 5:
**D39 live consumers.**

Do NOT apply Strong Meta UI yet.
Do NOT apply D48 yet.
Do NOT run Stage2 full CI yet.

## Frozen live-consumer authority

Producer branch:
`chat3/d39-consumer-producer-v45`

Frozen production implementation head:
`090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

Current branch head is docs-only ahead at `c1c3f0ae9275b6e76c872733df0195bf73366ac1`; do not use that docs commit as production authority.

Runtime dependency boundary in producer:
`a3e6234af618b10cabd5c8c74ceb365d53232c4d`

Selective live-consumer delta from that boundary to frozen production head contains exactly:
- `content/definitions.json`
- `content/localization.json`
- `content/packs/assassin-relationship.json`
- `content/packs/school-life-content-v1.json`
- `tests/d39-formal-introduction-assassin-v46.test.ts`
- `tests/school-life-content-reload.test.ts`

Do not import producer runtime files. Current D39 runtime is newer/current-main composed and already accepted.

## Source Method consumer

Knowledge:
`palace.inner-truth.source-method`

Existing event:
`school-life-content-v1.night-study.arcana-reason`

Add variant:
`source-method-crosscheck`

Condition:
- kind `strongMetaKnowledge`
- knowledge `palace.inner-truth.source-method`
- present true

Existing choice remains `continue`.
Existing choice effects remain empty.
Source Method changes presentation only; it must not create scene reachability or mechanics.

Pack declares only required Meta read:
`strongMetaKnowledge`

Preserve D49 firewall: no Palace/Threshold/crossing/origin/return/Prince/archive macro-answer leakage beyond accepted producer copy.

## Formal Introduction consumer

Relationship:
`assassin.handler`

Add neutral stage:
`formal-introduced`

Add transition:
`formal-introduction`
- from `introduced`
- to `formal-introduced`
- no conditions
- exactly one effect: add relationship fact `introduced-at-work`

Existing `build-trust` must accept both:
- `introduced`
- `formal-introduced`

Do not change its target/conditions/effects.
Normal trust remains separate and grants `professional-trust-earned` only through normal trust transition.

Existing event:
`assassin.relationship.intro`

Preserve its current career gate and baseline `professional` choice unchanged.

Add opt-in `formal-introduction` choice:
condition `strongMetaFormalIntroductionAvailable`
effect `useStrongMetaFormalIntroduction`
for career `assassin`, relationship `assassin.handler`, transition `formal-introduction`.

Assassin pack adds only required Meta read:
`strongMetaFormalIntroduction`

No shortcut to trust/conflict/route/career/ending/resources/stats.

## Semantic merge rules

`definitions.json`:
- merge only Assassin relationship stage/transition compatibility by stable ID
- preserve all Palace v19/D39 canonical `metaRewards`
- preserve all non-Assassin definitions

`localization.json`:
- merge only D39 consumer keys by key
- preserve all Palace v19, Secret Debt/D51 and non-D39 localization
- no whole-file replacement

Packs:
- semantic union only
- preserve all current capabilities/content unrelated to D39 consumer additions

Tests:
- carry the two frozen consumer tests
- adapt only typing/current-main compatibility if necessary; do not weaken mechanics assertions

## Verification

Run on exact resulting head:
1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. focused:
   - `tests/d39-formal-introduction-assassin-v46.test.ts`
   - `tests/school-life-content-reload.test.ts`
   - `tests/school-night-study-adapter.test.ts`
   - Assassin focused tests
   - `tests/palace-d39-reward-producer-v20.test.ts`
   - Strong Meta focused tests
   - Palace v15-v19 smoke

If runner is unavailable, report NOT RUN; do not fabricate green.

## Stop marker

Stop at:
`D39_LIVE_CONSUMERS_READY_FOR_STRONG_META_UI`

Report exact head, changed files, Source Method lifecycle proof, Formal Introduction no-shortcut proof, and verification result.
