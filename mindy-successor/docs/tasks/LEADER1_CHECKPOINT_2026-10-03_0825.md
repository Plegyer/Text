# LEADER 1 CHECKPOINT — 2026-10-03 08:25 +03

Status: **CURRENT RECOVERY CHECKPOINT**
Repository: `Plegyer/Text`

This supersedes the earlier 08:05 checkpoint for recovery purposes. Future Leader must still requery fresh Git before acting.

## Fresh snapshot at checkpoint creation

Main before checkpoint commit:
`7e59abb2320e49d054dc21eb8704f88e1f2896f4`
Message:
`Leader: anchor Secret Debt calibration to live economy`

### Chat 2 / PR #264

Branch:
`chat2/assembly-hard-work-meta-shared-20261003-v1`

Current head:
`c1bfcef4d50590f5ed9769552fc58392b4c1c6d0`

Focused QA:
- #1124 SUCCESS on the repair candidate;
- typecheck PASS;
- validate PASS;
- build PASS;
- prior #1122 failure files 83/83;
- migration/journal 18/18;
- D21-D24 35/35;
- School D20 21/21;
- seasonal tradeoffs 51/51.

Repair commit changes tests/fixtures only relative to the previously tested runtime head:
- schema5 roundtrip expectation;
- genuine schema4 journal fixtures;
- retired Lumber automatic +3/+3 expectation removed;
- completed-creation fixtures mark Hard Work packages applied;
- stale permanent Palace legacy-label expectation removed.

No production runtime/content changes in the repair commit.

Full CI #1125 is currently **IN PROGRESS** on exact head:
`c1bfcef4d50590f5ed9769552fc58392b4c1c6d0`.

Do not merge until #1125 is complete and green.

Current-main drift from PR base through this checkpoint is docs/research only; no runtime/content/test drift was found. GitHub API reports the PR content itself mergeable; unstable state is due draft/check state rather than a content conflict.

If #1125 succeeds:
1. final Leader acceptance;
2. merge #264;
3. verify exact-main CI on merge SHA;
4. only after exact-main green, move Chat 2 to frozen New Start+ UI `837156277f7329f0187b04442acb8d5258a2e189`;
5. then Palace D23 consumer `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`.

If #1125 fails:
- mine complete failure set;
- no rerun unchanged head.

## Product locks added since 08:05 checkpoint

### D28 — Specialist capacity

Strong Meta current-run selection:
- 0..1 Keystone;
- 0..2 Specialists;
- Hard Work packages separate/unrestricted earned subset;
- automatic knowledge separate/no slot;
- Palace cap-200 uses one normal Specialist slot;
- current-run loadout is snapshotted.

Accepted packet:
`chat4/strong-meta-keystone-capacity-v5@68d480c46d604da4f298ba03241011f8a55550d9`.

### D29 — Palace rich six-stage topology

Stages:
1. Entered Service
2. Working Rhythm
3. Trusted Service
4. Palace Network
5. Crossroads
6. Outcome Ready

Structural duty milestones:
2 -> 5 -> 8 -> 12 -> 15.

Non-True preparation is non-exclusive until ending commit.
Service Life prep may begin at Trusted Service.
Court Power prep may begin at Palace Network.
Inner Truth prep may begin at Crossroads.
Romance/items/Night are optional, not gates.
No `hardWork:palace`.
D26 is not silently imposed on Palace.
Exact Palace daily cadence remains open.

Accepted packet:
`chat6/palace-progression-topology-decision-v10@7a65f2dd88b53135c393be64f6e78ab46b9bcab8`.

### D30 — Secret Debt three future-run Keystones

Paid Freedom -> **Earned Reserve Match**:
bounded 1:1 match on eligible ordinary wages while not bound; hidden work/lender grant/repayment/non-work excluded.

Bound Life -> **Work Rhythm**:
ordinary-shift day can arm +1 usable Energy next day; nonstacking; finite trigger count; hidden work/School/Activity do not arm; bound Secret Debt -1 remains real relative to same unbound loadout.

Takeover -> **Network Retainer**:
small fixed eligible early-day payment; paused while bound; missed payments not banked; finite period/total.

Identities/classes/invariants are locked.
Exact numeric caps/durations remain open for economy calibration.

Accepted packet:
`chat5/secret-debt-ending-meta-rewards-v6@461bfa161e00bea15bbda15baea2c08b2f6aa52a`.

### D31 — exact ordinary seasonal negative target map

Locked targets:

- Lumber: Spring Dexterity; Winter Strength
- Satyr Maid: Summer Sociability; Autumn Endurance
- Undead Farm: Spring Reason; Autumn Strength
- Tavern: Spring Reason; Summer Wits
- Hunter: Spring Endurance; Winter Dexterity
- Guard: Summer Manners; Winter Reason
- Merchant: Summer Wits; Winter Manners
- Artist/Geisha: Summer Manners; Autumn Dexterity
- Assassin: Spring Reason; Winter Manners
- Prostitute: Summer Sexuality; Winter Endurance

Structure unchanged:
two negative seasons per career, one -1, no Lust negatives, seasons unchanged, positives/wages/costs/unlocks/HW50/D26 unchanged.

Accepted packet:
`chat3/progression-floor-aware-negative-map-v5@255c0c9b59870f91c8b7032863db6dd6966ec4bc`.

## Current worker queue

### Chat 3

New branch:
`chat3/seasonal-negative-target-map-implementation-v6`

Dispatch/main head at last check:
`844aabdf9bf42c42e67961c75c0364ec7ea36aef`

Task:
smallest D31 content-only implementation, exact 20 target replacements, focused static/harness QA, no full CI.

### Chat 4

New branch:
`chat4/strong-meta-catalog-contract-v6`

Dispatch head at last check:
`f3d6273fc27247ac08e9def79e488f13c29880eb`

Task:
implementation-ready typed catalog/validation/migration contract for D27+D28, including cap-200 Specialist and D30 three Keystones. No production runtime/full CI.

### Chat 5

New branch:
`chat5/secret-debt-keystone-calibration-v7`

Branch fast-forwarded at checkpoint preparation to:
`7e59abb2320e49d054dc21eb8704f88e1f2896f4`

Task:
calibrate D30 open numbers.

Important baseline:
use current executable economy and `LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md`.
Do not use stale old WU wage assumptions as the calibration baseline.

Minimum sweeps:
- Reserve Match cap 500/750/1000/1500;
- Work Rhythm 10/15/20/25 bonus days;
- Retainer total-power envelopes about 500/750/1000/1500.

### Chat 6

New branch:
`chat6/palace-rich6-stage-contract-v11`

Dispatch head at last check:
`f3d6273fc27247ac08e9def79e488f13c29880eb`

Task:
implementation-ready D29 rich-six stage/duty contract, functional duty taxonomy, transition/reaction/save semantics; static fixture/tests allowed, no production runtime/full CI.

## Leader research completed since 08:05 checkpoint

### Original Meta stacking scale

Docs:
- `original_meta_stacking_scale_verified_v1.md`
- `original_meta_stacking_scale_v1.csv`

Key derived scale:
- +459 fixed starting-stat points across 11 original stats;
- +$18,666 fixed starting money;
- +2/day ending Stamina stack;
- Busy Bee separately can reach normal 6 Stamina;
- 8 late-job early-access triggers;
- all 3 dungeon intros;
- all 12 spell slots;
- every enabled ending still costs flat +1 Finale count regardless of reach.

### Original Bikini Model / forced-night route

Docs:
- `original_model_forced_night_route_verified_v1.md`
- `original_model_forced_night_route_v1.csv`

Exact forced route:
- nights 1–10 base Stamina 2;
- nights 11–15 base 1;
- nights 16–18 base 0;
- total 25 vs normal 54 = **29 lost actions** over 18 nights.

Relative loss remains 29 under the same broad Stamina Meta loadout because Meta applies after night base.

Forced sleep bypasses:
- rent resolver;
- normal +$200 sleep reward;
- Froglord sleep income;
- nightly stat Titles.

Busy Bee survives because it applies later at common new-day.

This is reference evidence for Secret Debt timing/invariants, not authority to copy the route.

## Live economy calibration warning

`LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md` shows current executable successor wages are materially below older WU candidate assumptions while lodging/School retain their current price scale.

Current live baseline includes:
- fresh money 600;
- Energy 3;
- lodging normal 100 / cheap 50 / street 0;
- paid School 300–500;
- early starter shifts roughly mid-teens to about 20, not ~50.

Any D30 numeric calibration must use executable current economy, not stale candidate wage scale.

## Recovery rule

On context rollover:
1. read `CURRENT_LEADER1_CHECKPOINT.md`;
2. read this checkpoint;
3. read `USER_DECISIONS_LOCKED_v1.md`;
4. requery fresh main, PR #264/current integration PR, workflows and real worker heads;
5. never infer activity from pointer/branch existence;
6. preserve Chat 2 as sole worker full-CI lane;
7. never merge producer verbal completion.

If raw original SWF extraction is needed in a new chat, ask user to re-upload `Simply_Mindy_360(5).swf`. Extracted research is already durable in Git.
