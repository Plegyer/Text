# CHAT 4 — CROSS-GOLDEN LEGACY CONSISTENCY QA v56-v58

Status: **START NOW**
Owner: Chat 4
Branch: `chat4/cross-golden-legacy-consistency-v56`

Previous D46+D47+legacy golden manifest v53-v55 is accepted.

This bundle independently cross-checks the accepted legacy-retirement/economy package against the final player-facing and save/migration golden contracts before any production assembly.

No production runtime/content mutation.
No full CI.
Do not merge main.

Primary accepted inputs:
- Chat4 D46+D47+legacy operations:
  `mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json`
- Chat4 golden gate:
  `mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json`
- Chat4 v55 handoff
- Chat6 player-facing golden fixture:
  `tests/fixtures/final-player-facing-golden-v54.json`
- Chat6 v56 handoff
- Chat3 final save/migration gate design v52
- Chat3 final save/migration gate prep v53
- Chat3 historical fixture recovery v56

## v56 — cross-golden consistency matrix

Build an exact consistency matrix across the three closure domains:

1. D46/D47/legacy mechanics contract;
2. final player-facing localization/presentation contract;
3. final save/migration compatibility contract.

At minimum prove agreement on:
- live `lumber-stay` absence;
- live `vitality` acquisition absence;
- `legacy.lumber-stay.vitality` historical-only identity;
- exactly +1 Energy once only from historical vitality;
- no Strong Meta / Hard Work / Palace identity fabrication;
- exactly 40 canonical ordinary endings;
- exact five live lumber localization deletions;
- exact historical compatibility localization retention;
- `ending/lumber-stay` presentation deletion;
- historical display remains non-interactive;
- RunResult/transaction preservation and pre-RunResult deterministic proof;
- profile-merge/idempotence requirements;
- D46 stored Lust preservation / fresh Lust 5 separation;
- D47 package snapshot separation from Strong Meta slots.

Flag any disagreement as an exact key/ID/assertion conflict.
Do not resolve by chronology or last-write-wins.

## v57 — machine-auditable cross-contract validator

Author a test-only JSON manifest and/or validator that checks the accepted contracts agree.

The validator must fail on:
- mismatched deletion sets;
- historical compatibility key mismatch;
- live/retired identity contradiction;
- Energy bonus other than exactly +1 once;
- Strong Meta/Hard Work slot contamination;
- canonical ordinary ending count mismatch;
- save/migration rule that would fabricate a modern ending;
- player-facing rule that would expose a retired live action/ending;
- D46/D47 rule that conflicts with migration preservation.

Run the validator where possible.
No production files may change.

## v58 — handoff

Create:
`mindy-successor/docs/tasks/CHAT4_CROSS_GOLDEN_LEGACY_CONSISTENCY_v58.md`

Include:
- exact input authority SHAs/blobs;
- consistency matrix;
- validator path and executable evidence;
- contradictions found, if any;
- exact stop conditions for Chat2/final closure;
- whether D46/D47/legacy can proceed to selective assembly without cross-golden semantic conflict.

Expected:
`BUNDLE_COMPLETE — READY_FOR_CROSS_GOLDEN_LEGACY_GATE`

No production mutation. No full CI. Do not merge main.
