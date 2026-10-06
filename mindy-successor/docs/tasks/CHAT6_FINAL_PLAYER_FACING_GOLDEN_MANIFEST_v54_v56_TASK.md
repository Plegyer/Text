# CHAT 6 — FINAL PLAYER-FACING GOLDEN MANIFEST v54-v56

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-player-facing-golden-manifest-v54`

Previous v51-v53 final player-facing preassembly is accepted and frozen:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_PREASSEMBLY_v53.md`

This bundle prepares an exact final player-facing golden manifest for later Chat2/final closure.
No runtime/mechanics changes. No full CI. Do not merge main.

## v54 — exact golden manifest

From accepted authorities, produce an exact machine-auditable manifest of the final expected player-facing state.

Cover at minimum:
- required localization keys and final authority/precedence;
- required deleted localization keys;
- final presentation slot set and final source/altKey expectation;
- required presentation deletions;
- four Palace D48 assets and their exact allowed slot families;
- Strong Meta UI/modal accessibility semantic hunks;
- retired Tavern live-surface absence;
- retired lumber-stay/vitality live-surface absence with historical compatibility rows retained;
- Activity Network v36 final wording authority;
- D42 Night player-facing surfaces that must survive all later overlays.

Use the accepted v53 counts/contracts as starting authority, but re-query exact producer files before freezing exact entries.

Prefer a machine-readable JSON fixture/manifest under tests/fixtures or docs/tasks plus a human-readable companion document.
Do not change production content.

## v55 — manifest validator / focused QA preparation

Author a test-only validator or exact executable test contract that can validate the golden manifest against a future fully assembled checkout.

It must distinguish:
- missing required key/slot/asset;
- forbidden retired live surface;
- wrong predecessor/final collision value;
- third-value conflict;
- missing RU/EN parity;
- missing alt/caption pair;
- raw modal/internal-ID accessibility regression;
- Palace D48 leakage to non-Palace slots.

If the current branch cannot execute the future full manifest because production tranches are not assembled, do not weaken assertions and do not claim green. Validate the manifest structure itself and any checks that are runnable against frozen source authorities.

No runtime changes.

## v56 — replacement-chat handoff

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v56.md`

Include:
- exact manifest path;
- exact source authorities;
- validator/test path;
- what was actually executable now;
- what must be re-run on the final assembled target;
- stop conditions and third-value conflict policy;
- selective guidance for Chat2/final closure.

Report:
`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_GOLDEN_GATE`.

No full CI. Do not merge main.
