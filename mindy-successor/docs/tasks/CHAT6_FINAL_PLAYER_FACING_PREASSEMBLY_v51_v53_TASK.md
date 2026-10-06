# CHAT 6 — FINAL PLAYER-FACING PREASSEMBLY v51-v53

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-player-facing-preassembly-v51`

Player-facing/preassembly lane only. No runtime/mechanics changes. No full CI. Do not merge main.

Accepted authorities to reconcile:
- global presentation producer v23: `f25069c369c449ce0efbfe57acf877f950b1dfea`
- final localization/presentation closure audit v28: `d57381dc7fa4af028cea3effdb4146a75cc9c60a`
- accepted Strong Meta UI producer: `fac645878ebd726f50fd1364ac72414796755a2d`
- final cumulative player-facing packet v47 on `chat6/final-player-facing-cumulative-v45`
- Palace D48 implementation head: `e0277dc302df178e73184bf1623d0e91e5237b45`
- Palace D48 handoff v50.

## v51 — cumulative player-facing collision inventory
Reconcile localization, presentation, accessibility and asset overlays without creating a production candidate.
Cover:
- cumulative v47 upsert/delete contract;
- accepted Activity Network override;
- Strong Meta selector and localized modal ARIA;
- global presentation additions;
- Palace v19 presentation semantics;
- D48 17-slot Palace overlay and 8 localization rows;
- retired Tavern/lumber-stay live-surface removal requirements.

Produce an exact collision/precedence table and flag any third-value conflicts.

## v52 — final user-facing integrity audit
Static/auditable checks for:
- RU/EN parity;
- no raw internal IDs on player-facing surfaces;
- no missing referenced asset paths;
- accessible names/alt/caption coverage;
- no retired Tavern/lumber-stay live presentation leakage;
- no D45/D49 Palace lore leakage from D48;
- no accidental non-Palace use of Palace D48 assets.

Do not claim npm executable green unless actually run.

## v53 — handoff
Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_PREASSEMBLY_v53.md`

Include:
- cumulative operation order;
- collision table;
- static integrity results;
- final closure test roster;
- stop conditions after D46/D47/legacy integration;
- selective-merge guidance for Chat2/final closure.

No mechanics changes. No full CI.
Report:
`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_ASSEMBLY_PREP`.
