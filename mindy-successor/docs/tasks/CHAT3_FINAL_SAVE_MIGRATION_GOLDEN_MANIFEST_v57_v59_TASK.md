# CHAT 3 — FINAL SAVE / MIGRATION GOLDEN MANIFEST v57-v59

Status: **START NOW**
Owner: Chat 3
Branch: `chat3/final-save-migration-golden-manifest-v57`

Previous bundles accepted:
- final save/migration gate prep v51-v53;
- final historical fixture recovery v54-v56.

This bundle turns the accepted 23-case release contract plus recovered F1-F5 fixtures into one exact machine-auditable golden manifest for later final integration.

No production runtime/content changes.
No full CI.
Do not merge main.

Primary authorities:
- `CHAT3_FINAL_SAVE_MIGRATION_GATE_DESIGN_v52.md`
- `CHAT3_FINAL_SAVE_MIGRATION_GATE_PREP_v53.md`
- `CHAT3_FINAL_HISTORICAL_FIXTURE_RECOVERY_v56.md`
- Chat4 final save/migration closure preflight v21 at `1601be7b224f7b6687c4146c53d37499efb6a3f1`

## v57 — exact 23-case golden manifest

Create a machine-readable manifest for all 23 release save/migration cases.

For every case include:
- exact case ID/name;
- fixture/source authority;
- required subsystem dependencies;
- exact before/after reload checkpoints;
- expected exactly-once invariants;
- expected rejection/defaulting rules;
- stable IDs/transactions/reward ownership checks;
- whether the case is runnable now or only on the fully assembled release target;
- required historical fixture provenance;
- explicit stop conditions.

Link F1-F5 reconstructed fixtures to their exact cases and label them as authoritative reconstructions, never genuine user saves.

Prefer:
`tests/fixtures/final-save-migration-golden-v57.json`

plus a concise human-readable companion.

## v58 — golden validator/test contract

Author a test-only validator for the manifest itself.

It must check:
- exactly 23 unique cases;
- unique case IDs/names;
- all required dependency classifications present;
- every future-only case has explicit post-integration requirement;
- F1-F5 provenance labels remain reconstructed;
- no case silently permits inference forbidden by v21;
- all exactly-once domains are represented;
- required Strong Meta/current-run snapshot separation is represented;
- Activity/Camp/Secret Debt/Palace/D46/D47/lumber retirement domains are all covered;
- no content/presentation-only tranche is allowed to mutate save mechanics.

Where safe, execute manifest-structure validation now.
Do not claim the final migration suite itself is green before the final assembled target exists.

## v59 — handoff

Create:
`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_MANIFEST_v59.md`

Include:
- manifest path;
- validator path;
- exact authorities;
- internal consistency checks run;
- unresolved post-integration dependencies;
- exact future execution command/roster;
- stop conditions for Leader/Chat2 final closure.

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_SAVE_MIGRATION_GOLDEN_EXECUTION`

No production mutation. No full CI. Do not merge main.
