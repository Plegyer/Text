# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — AUTO-CONTINUE RELEASE LOCALIZATION BUNDLE v33-v35**
Owner: Chat 6

This bundle is for a FRESH Chat 6 context.

Completed:
- v26 ordinary ending localization
- v27 Secret Debt localization
- v28 final presentation/localization audit
- v29 global caption closure
- v30 Tavern compatibility audit
- v31 Tavern cleanup
- v32 final localization assembly packet

Current branch:
`chat6/release-localization-bundle-v33`

IMPORTANT:
Complete ALL tasks below in order.
Do not stop after the first deliverable.
Only stop for a real content/Product ambiguity.

## Task A — v33
Create machine-readable manifest:
`mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_PRESENTATION_MANIFEST_v33.json`

It must enumerate, by source tranche:
- localization keys to add/replace;
- localization keys to delete;
- keys that must remain for migration;
- presentation slots to add;
- known dependency order;
- source exact SHAs.

No whole-file snapshots.

## Task B — v34
Create:
`CHAT6_PLAYER_FACING_FALLBACK_AUDIT_v34.md`

Audit all accepted live player-facing families for raw-key/fallback-text risk:
- ordinary endings;
- Secret Debt endings;
- D42 Night;
- Activity endings;
- Palace endings;
- generic ending screen;
- generic Night room/rest surfaces.

Classify any finding P0/P1/P2.

## Task C — v35
Create:
`CHAT6_FINAL_COPY_CONSISTENCY_AUDIT_v35.md`

Check RU/EN consistency and route semantics across final ending titles/descriptions/epilogues.
Do not rewrite accepted mechanics or lore.
List only concrete contradictions or confirm clean.

No runtime changes.
No full CI.

After all three are committed, report:
`BUNDLE_COMPLETE — READY_FOR_LEADER_REVIEW`.
