# Chat 6 — Final Player-Facing Golden Manifest v54

Status: **COMPLETE — EXACT GOLDEN FIXTURE FROZEN**
Owner: Chat 6
Date: 2026-10-06

This document is the human-readable companion to the exact machine-auditable final player-facing fixture. It changes no production content, runtime, mechanics, schema, or save behavior.

## Exact machine authority

- Fixture: `mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-player-facing-golden-v54.json`
- Validator contract: `mindy-successor/prior-work/astra/prototype-m3.2/tests/final-player-facing-golden-manifest-v55.test.ts`
- Final handoff: `mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v56.md`

The fixture, not a prose summary, is authoritative for every required localization value, predecessor/final collision pair, presentation object, final source, altKey, deletion, retained compatibility row, modal accessible-name value, and D48 slot family.

## Frozen counts

- 343 required localization targets; 344 ordered operations because Activity Network v17 is intentionally superseded by v36 on one key.
- 17 forbidden/deleted localization targets.
- 9 retained Tavern migration/history localization rows.
- 127 required presentation targets.
- 17 Palace v19 -> D48 presentation replacements.
- 1 required presentation deletion: `ending/lumber-stay`.
- 3 retired Tavern ending presentation slots required absent.
- exactly 4 Palace D48 SVG assets.
- exactly 7 Strong Meta/modal semantic UI hunks.
- D42 preservation set: 110 Night localization rows and 12 Night presentation slots.

## Final precedence and collision policy

`ending.ending.activity.network.epilogue` is finally owned by Activity Network v36. Its exact final value is RU `Контакты связывают разрозненные направления в единое рабочее пространство.` / EN `The contacts tie disconnected routes into one practical working network.` The accepted Activity v17 value is stored in the fixture as `predecessorValue`; any third value is STOP.

The 17 Palace D48 slots retain their exact Palace v19 predecessor objects and exact D48 final objects in the fixture. A final target still on the predecessor is a stale accepted predecessor; any other object is a third-value conflict. No generic last-write-wins rule is allowed.

## Palace D48 firewall

The only dedicated Palace assets are `palace-custodian-audience.svg`, `palace-threshold-archive.svg`, `palace-return-home-threshold.svg`, and `palace-service-interior.svg`. Their exact allowed slot sets are frozen in `presentation.d48.allowedSlotsByAsset`. No D48 source may appear in a slot outside that 17-slot union.

`job/palace/event/palace-invitation-day1-arrival/default` and `job/palace/event/palace-invitation-reveal/default` are explicitly outside D48 and remain on `assets/stage-town.svg` with the accepted invitation alt key.

## Retired live surfaces and historical compatibility

Retired Tavern live IDs `tavern-stay`, `tavern-guild`, and `tavern-court` must have no live ending definition or ending presentation slot. Their six stale presentation-localization rows remain deleted, while the nine accepted migration/history rows remain exact and bilingual.

`lumber-stay` and live `vitality` remain retired: no live ending definition, no `ending/lumber-stay` slot, and no five live localization rows. The five historical lumber rows and `legacy.lumber-stay.vitality` compatibility identity remain preserved; historical evidence is compatibility only, not a new Hard Work/package/Strong Meta identity.

## Strong Meta and modal accessibility

The fixture freezes the seven accepted semantic hunks from implementation head `fac645878ebd726f50fd1364ac72414796755a2d`: registry/capacity import, localized label helpers, creation command allowlist, selector renderer, selector placement after Hard Work, localized generic dialog name, and selector handlers.

Final behavior keeps no auto-select, max 1 Keystone / 2 Specialists, cap-200 as a Specialist, automatic inherited knowledge slot-free, Hard Work packages outside Strong Meta, preferred selection persistent, and the current-run snapshot engine-owned/immutable. Generic modal naming must use `panelAccessibleName(panel)` and must not regress to raw panel IDs. Exact RU/EN accessible-name localization values for Work, School, Explore, Night, Heroine, Journal, Bag, Fates, Menu, Editor, and Catalog are frozen in the fixture.

## RU/EN and alt/caption integrity

All 343 required localization rows plus retained historical rows were reconstructed from exact accepted source blobs and checked for non-empty RU and EN before fixture publication. The final validator also requires localized alt/caption pairing for required static image slots and exact D48 English fallback-alt parity.

## Current-branch disposition

This Chat 6 branch is not the fully assembled production release target. Missing later production tranches on this research branch are therefore a post-integration condition, not a product failure. Assertions are not weakened: the final-target portion of v55 must be explicitly enabled on the fully assembled target.

**v54 COMPLETE**
