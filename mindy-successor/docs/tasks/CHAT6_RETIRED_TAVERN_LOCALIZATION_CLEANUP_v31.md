# Chat 6 — Retired Tavern Localization Cleanup v31

Status: **READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 6  
Branch: `chat6/retired-tavern-localization-cleanup-v31`

Accepted audit:

`chat6/retired-tavern-localization-compat-audit-v30@083166a80439a6c9dbc222f3ab99a20e6ff0d4a6`

Task seed:

`36711bc8c9c5e8c2b99ffb8f8c861c462c414bca`

Frozen implementation head:

`b37551d567d8017dbc25b87d66034af3e9c7a812`

No runtime change.  
No mechanics change.  
No presentation routing change.  
No full CI.

---

## Result

v31 removes exactly the six retired Tavern presentation-localization rows approved by v30:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

No other localization key was removed or modified.

Localization count:

- before: **3288**
- after: **3282**

Exact key comparison:

- removed: **6**
- added: **0**
- changed existing keys: **0**

v31 localization blob:

`d95d3e16b64d60e246f5923e2d0fc7840ddc8c04`

---

## Compatibility rows intentionally retained

The migration-oriented ending rows remain unchanged:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`

The retired unlock labels also remain unchanged:

- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

No runtime/history compatibility localization outside the six approved presentation rows was touched.

---

## Live identity / routing invariants

These production files are byte-identical to the v31 task seed:

- `content/presentation.json` — `2adff5582cb9cf9c755b952c35fafb7e0ae6702b`
- `content/definitions.json` — `45d4287be3db6a828a4bd8b71825ff23e7f7bc31`
- `src/core/advancedEndingsD41.ts` — `b6b144d1f295d5c8d4353e2d0bf0d671a1488e01`

Therefore v31 does not alter live definitions, presentation routing, or migration runtime.

The three retired Tavern IDs remain absent from live ending definitions and presentation slots:

- `tavern-stay`
- `tavern-guild`
- `tavern-court`

---

## D41 migration mapping preserved

The frozen mapping remains:

- `tavern-stay` -> `ending.tavern.innkeeper`
- `tavern-guild` -> `ending.tavern.sanctuary`
- `tavern-court` -> `ending.tavern.information-broker`

No D41 source file changed.

---

## Focused regression test

Added:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/retired-tavern-localization-cleanup-v31.test.ts`

Test blob:

`8c9e0bfa14e2fac9851ef24f9693f0accdd87cb2`

It proves:

1. all six retired presentation-localization rows are absent;
2. the migration-oriented ending copy and retired unlock labels remain bilingual;
3. retired Tavern ending IDs remain absent from live definitions;
4. retired Tavern ending IDs remain absent from presentation slots;
5. `D41_TAVERN_LEGACY_ENDING_MIGRATIONS` exactly matches the accepted mapping.

The focused test was authored but not executed from this connector-only producer lane.

Full CI was not run, per task instruction.

---

## Implementation diff

Compared with seed `36711bc8c9c5e8c2b99ffb8f8c861c462c414bca`, frozen implementation head `b37551d567d8017dbc25b87d66034af3e9c7a812` changes exactly two files:

1. `content/localization.json`
   - **+0 / -24**
   - six JSON localization objects removed

2. `tests/retired-tavern-localization-cleanup-v31.test.ts`
   - **+60 / -0**

No `src/` file changed.

---

## Chat 2 assembly guidance

Assemble selectively:

1. remove exactly the six approved localization rows;
2. add the focused v31 regression test;
3. preserve current D41 migration/runtime;
4. preserve current live Tavern ending definitions and presentation routing;
5. do not delete migration title/description rows or retired unlock labels as part of this producer.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
