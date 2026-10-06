# Chat 6 — Final Player-Facing Preassembly v53

Status: **BUNDLE COMPLETE — READY FOR FINAL PLAYER-FACING ASSEMBLY PREP**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-preassembly-v51`  
Date: 2026-10-06

This is the final Chat 6 handoff for cumulative player-facing/localization/presentation assembly after the accepted D46/D47/legacy tranche. It is a selective-merge packet only. No production runtime/mechanics change and no full CI are performed by this branch.

## 1. Governing artifacts

- v51 exact collision inventory:
  `CHAT6_FINAL_PLAYER_FACING_COLLISION_INVENTORY_v51.md`
- v52 integrity audit:
  `CHAT6_FINAL_PLAYER_FACING_INTEGRITY_AUDIT_v52.md`
- v47 cumulative player-facing packet:
  `CHAT6_FINAL_PLAYER_FACING_CUMULATIVE_PACKET_v47.md`
- Palace D48 handoff:
  `CHAT6_PALACE_D48_MEDIA_HANDOFF_v50.md`
- D46+D47+legacy integration authority:
  `CHAT3_D46_D47_LEGACY_FINAL_ASSEMBLY_PACKET_v29.md`

Frozen authorities include:

- global presentation v23: `f25069c369c449ce0efbfe57acf877f950b1dfea`
- localization/presentation audit v28: `d57381dc7fa4af028cea3effdb4146a75cc9c60a`
- Strong Meta/modal implementation: `fac645878ebd726f50fd1364ac72414796755a2d`
- Palace D48 implementation: `e0277dc302df178e73184bf1623d0e91e5237b45`
- lumber-stay retirement verified target: `39912e7435c3707d98f96fe550d697c20ac0bedb`

## 2. Cumulative player-facing operation contract

After v47 + D48 + the player-facing portion of lumber retirement:

- unique localization upsert targets: **343**
- ordered localization upsert operations: **344**
- localization deletes: **17**
- cumulative presentation target additions: **127**
- later presentation replacements: **17** (D48 over Palace v19)
- presentation deletes: **1** (`ending/lumber-stay`)
- live ending-definition deletes relevant to this lane: **1** (`lumber-stay`)
- new dedicated Palace assets: **4**
- Strong Meta/modal UI semantic hunks: **7**

The extra localization operation beyond the 343 unique targets is the accepted Activity v17 -> v36 override.

## 3. Required cumulative assembly order

### Phase 0 — assemble D46 / D47 / legacy first

Use the accepted Chat3 v29 packet on the then-current Chat2/main base:

`current production base -> D46 -> D47 -> lumber-stay retirement / legacy normalization`

Preserve all newer D42, Strong Meta, Secret Debt/D51, Palace, Activity, localization and presentation work already present.

Do not wholesale-copy the D46/D47/legacy producer files.

Before continuing with player-facing overlays, require:

- D46 fresh Lust/wage semantics present
- D47 package mapping present
- live `lumber-stay` retired
- historical `legacy.lumber-stay.vitality` compatibility present
- D42 content still present

### Phase 1 — freeze the actual post-D46/D47/legacy base

Read the exact current:

- `content/localization.json`
- `content/presentation.json`
- `content/definitions.json`
- `src/ui/app.ts`
- presentation asset tree

Do not assume the research branch snapshots equal this base.

For every later operation, use predecessor/final-value conflict rules from v51/v47.

### Phase 2 — v26 localization

Apply the accepted ordinary-ending v26 changes by key.

Do not reintroduce the six disconnected single-prefix Merchant/Artist rows that belong to the final deletion fence.

### Phase 3 — v27 Secret Debt ending localization

Apply the nine accepted bilingual Secret Debt ending rows by key.

### Phase 4 — preserve D42

D42 is already part of the modern base in the accepted integration line.

Do not overwrite it from older producers. Verify/retain:

- +110 Night localization rows
- +12 Night presentation slots
- 12 Night alt/caption pairs
- current Night/private-space UI consumers

### Phase 5 — Activity v17

Apply accepted Activity D38 localization/presentation/content consumer seams only on its owning runtime prerequisite.

Then immediately apply Phase 6.

### Phase 6 — v36 Activity Network final override

Final authority for:

`ending.ending.activity.network.epilogue`

is v36.

Accepted transition:

`Activity v17 value -> v36 final practical-network value`

Any third value is STOP.

Never restore the unconditional four-direction wording.

### Phase 7 — Palace v19

Apply the accepted Palace v19 prose/localization/presentation semantics on the required Palace v18 mechanics/content base.

At this phase all 19 accepted Palace v19 presentation slots exist.

Do not apply D48 before v19 slot semantics are present or already equivalently assembled.

### Phase 8 — global presentation v23

Add/verify the 93 accepted non-Palace presentation mappings selectively.

No Palace slot belongs to v23.

### Phase 9 — v29 generic captions

Ensure:

- `media.stage.room.caption`
- `media.base.town.caption`

exist with accepted bilingual values.

These close the strict caption pair for the v23 neutral room/town mappings.

### Phase 10 — v40 player-facing localization repair

Apply/verify all 21 bilingual rows.

This phase is authoritative for the audited raw-key/reward-label closure surfaces.

### Phase 11 — v42/v43 localization

Apply/verify all 14 accepted rows:

- 13 `ui.strongMeta.*`
- `ui.menu.catalogInspector`

### Phase 12 — v42/v43 UI semantic rebase

Rebase the seven Strong Meta/modal hunks onto the already assembled `src/ui/app.ts`.

This phase comes after D46/D47/legacy UI composition because historical legacy display can also touch `app.ts`.

Required final behavior:

- Strong Meta selector rendered during creation after Hard Work
- accepted Strong Meta commands used
- no auto-select
- generic dialog accessible name uses `panelAccessibleName(panel)`
- raw `aria-label="${panel}"` behavior must not return

Never replace `app.ts` wholesale with the v42 producer snapshot.

### Phase 13 — D48 Palace dedicated media

After Palace v19 is present:

1. add exactly four D48 SVG masters;
2. merge the 8 D48 alt/caption localization rows;
3. replace exactly 17 v19 fallback slot objects with the D48 final objects.

Keep the two Palace invitation slots on neutral `assets/stage-town.svg`.

No D48 asset may be used by a non-Palace slot.

### Phase 14 — final deletion / retirement fence

Only after all older additive layers are composed, enforce the final absent-live-surface set.

#### v47 deletion fence — 12 localization rows

- six disconnected Merchant/Artist single-prefix Hard Work rows
- six retired Tavern presentation-localization rows

#### lumber retirement — 5 localization rows

Keep absent:

- `ending.lumber-stay.title`
- `ending.lumber-stay.description`
- `presentation.static.ending.lumber-stay.alt`
- `presentation.static.ending.lumber-stay.caption`
- `unlock.vitality.label`

Also keep absent:

- live ending definition `lumber-stay`
- presentation slot `ending/lumber-stay`

Retain historical compatibility rows from lumber retirement and Tavern migration.

### Phase 15 — static + focused closure gate

Run the final integrity checks and focused executable roster below on the exact assembled head.

No Chat 6 packet authorizes a full-CI run; final integration ownership decides that separately.

## 4. Final collision table

| Collision | Predecessor | Final authority | Final action |
|---|---|---|---|
| Activity Network epilogue | Activity v17 | v36 | replace one localization row |
| 7 Palace service/court presentation slots | Palace v19 room fallback | D48 service-interior | replace slot object |
| 4 Palace archive slots | Palace v19 room fallback | D48 threshold-archive | replace slot object |
| 5 Palace Custodian slots | Palace v19 room fallback | D48 custodian-audience | replace slot object |
| Return Home slot | Palace v19 town fallback | D48 return-home-threshold | replace slot object |
| live lumber-stay ending | pre-retirement live surface | lumber retirement | delete live definition/slot |
| live lumber/vitality localization | pre-retirement rows | lumber retirement | delete five live rows |
| historical lumber compatibility | absent/pre-normalized | lumber retirement | retain five bilingual historical UI rows |

Accepted-authority third-value conflicts found by v51: **0**.

Any future assembled value outside the frozen predecessor/final pair is a third-value conflict and must STOP.

## 5. Final static integrity requirements

The final assembled tree must simultaneously prove:

- all required localization rows have non-empty RU and EN;
- v40 21-row repair remains exact;
- v42/v43 14-row localization remains exact;
- v29 two captions remain present;
- all 8 D48 alt/caption rows remain exact;
- lumber historical rows remain bilingual;
- raw generic modal panel IDs do not appear as accessible names;
- referenced presentation asset paths exist;
- all normal images have valid localized alt coverage;
- required caption pairs remain present;
- retired Tavern live presentation does not return;
- retired lumber-stay live definition/presentation/localization does not return;
- D48 lore firewalls remain intact;
- D48 assets are used by exactly the intended Palace family, never as non-Palace fallback art.

Because no single cumulative production candidate exists in this Chat 6 research lane, the final global “no raw internal IDs anywhere” check must be re-run against the assembled UI/rendered surfaces.

## 6. Final focused executable roster

Run from the assembled project checkout.

### Build/static baseline

- `npm run typecheck`
- `npm run validate`
- `npm run build`

### Ending/localization/presentation base

- `tests/ending-localization-closure-producer-v26.test.ts`
- `tests/secret-debt-ending-localization-producer-v27.test.ts`
- `tests/global-caption-closure-producer-v29.test.ts`
- `tests/retired-tavern-localization-cleanup-v31.test.ts`
- `tests/localization.test.ts`
- `tests/presentation.test.ts`
- `tests/presentation-source-integrity-v9.test.ts`
- `tests/presentation-locale-accessibility-v9.test.ts`
- `tests/presentation-ending-parity-v9.test.ts`

### D42

- `tests/night-content-gap-v10.test.ts`
- current authoritative shared Night UI/localization/presentation tests retained by the assembled base

### Activity

- `tests/activity-ending-content-presentation-v17.test.ts`
- `tests/activity-network-copy-fix-v36.test.ts`

### Global presentation

- `tests/global-presentation-mapping-producer-v23.test.ts`

### Palace

- `tests/palace-final-prose-media-v19.test.ts`
- `tests/palace-d48-media-v50.test.ts`
- retain accepted Palace v18 mechanics/consumer focused tests

### v40 player-facing repair

- `tests/final-player-facing-localization-v40.test.ts`

### Strong Meta / modal accessibility

- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/strong-meta-registry-v7.test.ts`

### D46 / D47 / lumber legacy adjacency

Retain the Chat3 v29 focused bundle, including at minimum:

- `tests/economy-start-balance-v14.test.ts`
- `tests/hard-work-bonus-mapping-v13.test.ts`
- `tests/hard-work-package-catalog-runtime.test.ts`
- `tests/hard-work-newstart-ui-v2.test.ts`
- `tests/lumber-stay-retirement-v17.test.ts`
- `tests/migration.test.ts`
- `tests/ending-meta.test.ts`
- `tests/hard-work-palace-meta-smoke.test.ts`
- `tests/palace-d23-consumer-integration-v8.test.ts`
- `tests/chat3-secret-debt-separation-v2.test.ts`

If a test was renamed by the current assembly line, use its authoritative replacement rather than dropping the domain.

## 7. Final behavioral smoke

On the assembled build, manually/focused-test these player-visible seams.

### Strong Meta

- owned/imported rewards remain unselected until explicit choice;
- max 1 Keystone / 2 Specialists;
- `palace.true.cap-200` consumes a Specialist slot;
- inherited Source Method knowledge is automatic and slot-free;
- Hard Work packages are outside Strong Meta slots;
- preferred selection survives reload;
- current-run snapshot remains immutable through the accepted engine path.

### Modal accessibility

In RU and EN:

- Work
- School
- Explore
- Night
- Heroine
- Journal
- Bag
- Fates
- Menu
- Editor
- Catalog

must expose human-readable accessible names, never raw panel IDs.

### Activity

The Network ending must show the v36 final practical-network epilogue, not the old unconditional wording.

### Palace

- v19 prose/ending semantics remain;
- 17 intended slots use the four D48 assets;
- two invitation slots remain neutral town;
- Custodian is human/institutional, not divine/combat-coded;
- Archive art does not answer Threshold/displacement mysteries;
- Return Home does not imply successor-world collapse;
- no D48 asset leaks to a non-Palace surface.

### Retired surfaces

- no live Tavern retired ending/presentation leakage;
- no live `lumber-stay`;
- no live `vitality` reward;
- historical lumber compatibility remains visible only through the accepted non-interactive legacy path.

## 8. STOP conditions after D46/D47/legacy integration

Stop and reconcile instead of improvising if any of these is observed:

1. D46/D47/legacy integration is not on the accepted v29 semantic contract.
2. A player-facing overlay would overwrite a newer D46/D47/legacy runtime/UI behavior.
3. Any localization ADD target already has a different third value.
4. Any localization REPLACE target is neither its frozen predecessor nor frozen final value.
5. Activity Network epilogue is neither accepted v17 predecessor nor v36 final during composition.
6. Old four-direction Activity Network wording returns after v36.
7. Any v23/D42/Activity/Palace presentation ADD target exists with a different object.
8. Any of the 17 Palace v19->D48 targets has a third object.
9. Either Palace invitation slot is remapped away from the accepted neutral town source without a new Product authority.
10. Any D48 asset is referenced from a non-Palace slot.
11. Any D48 asset path is missing.
12. D48 accessibility copy implies dream/simulation, world collapse, divine Prince, resolved displacement cause, Threshold creator/mechanism, or a single all-truth artifact.
13. Any required RU/EN row is missing or empty.
14. Any v40 audited player-facing row regresses to raw key/ID output.
15. Raw generic panel IDs return as modal accessible names.
16. Applying Strong Meta/modal UI requires wholesale replacement of `app.ts`.
17. Strong Meta selection mechanics differ from accepted engine semantics.
18. Any retired Tavern live ending/presentation surface reappears.
19. Any of the six retired Tavern presentation-localization rows reappears.
20. Any required Tavern migration compatibility row disappears.
21. Live `lumber-stay` definition or `ending/lumber-stay` presentation reappears.
22. Live `ending.lumber-stay.*`, old presentation rows, or `unlock.vitality.label` reappears.
23. Lumber historical compatibility rows disappear or conflict.
24. Historical lumber/vitality evidence starts granting Hard Work/package/Strong Meta identity.
25. D42 Night localization/presentation/UI is lost through an older snapshot.
26. Palace v19 prose semantics are lost when D48 art is applied.
27. A referenced final asset path does not exist.
28. Final assembled normal UI exposes a raw internal route/key/reward ID where accepted human-readable copy exists.
29. Any focused test fails.
30. Conflict resolution would require whole-file replacement of shared localization/presentation/definitions/UI/runtime files.

On STOP:

- do not use chronology as a tie-breaker;
- do not use generic last-write-wins;
- do not broaden scope into new mechanics/content;
- return the exact key/slot/hunk conflict to the owning producer/Leader.

## 9. Selective-merge guidance

Chat2/final closure should consume **operations**, not producer snapshots.

### Safe direct-add candidates

Only when absent and byte-equivalent to frozen producer content:

- four D48 SVG files;
- uniquely named focused test files;
- uniquely named handoff/docs where needed for audit history.

### Shared JSON

Merge:

- localization by exact key;
- presentation by exact slot;
- definitions by exact owned semantic change.

Never wholesale-copy shared producer JSON.

### UI

Apply Strong Meta/modal and legacy historical-display work by semantic hunk on the actual assembled `app.ts`.

### Runtime

This Chat 6 packet contributes no runtime mechanic. Runtime ownership remains with D46/D47/legacy, Activity, Palace, D42, Secret Debt and Strong Meta producers.

## 10. Chat 6 disposition

v51 produced the cumulative collision/precedence inventory.

v52 statically audited accepted player-facing authorities and found no new frozen-authority defect. The remaining risk is integration drift on the eventual cumulative candidate.

v53 provides the exact selective order, final integrity gates, focused test roster and stop conditions for final player-facing assembly prep.

No full CI was run by this Chat 6 lane.

`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_ASSEMBLY_PREP`
