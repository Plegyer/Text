# Presentation Production Integration Handoff v8

Status: Lead-facing selective-integration handoff for the current starter-trio/media-production wave.

Production authority:
- current main observed during this wave: `22772b1439c247d67fdd20c4e3fd55cc2eba4e20`;
- PR #34 merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`;
- PR34 exact-head CI: **227/227 PASS**;
- worker branch is long-lived and behind main: **do not merge it wholesale**.

Selectively copy reviewed artifacts onto a fresh Lead branch from current main.

## Media that can be produced now

### Lumber

Ready semantic surfaces:
- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`
- `job/lumber/result/default`

Current fallback:
`assets/stage-lumber.svg`.

Optional existing milestone/Foreman production GIF targets also remain valid where their semantic identities are already shipped.

### Satyr Maid — PR34

Ready semantic surfaces:
- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`
- `job/satyr-maid/result/default`

Current seasonal media:
`stage.tavern.<season>`

Current static asset:
`assets/stage-tavern.svg`.

These slots can receive GIFs now without new gameplay decisions.

### Undead Farm — PR34

Ready semantic surfaces:
- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`
- `job/undead-farm/result/default`

Current seasonal media:
`stage.hunt.<season>`

Current static asset:
`assets/stage-forest.svg`.

These slots can receive GIFs now without new gameplay decisions.

## Starter-trio production batch

The first concrete batch contains **15 semantic slots**:
- 12 seasonal shift slots;
- 3 stable result/default slots.

All 15:
- already have static fallback;
- remain usable animations-off;
- can be addressed independently;
- do not require GIFs for functional correctness.

Canonical batch:
`STARTER_TRIO_GIF_PRODUCTION_BATCH_v1.md`.

## PR34-specific presentation consequences

PR34 provides real production identity for Satyr Maid and Undead Farm repeatable shifts.

Important invariants:
- seasonal shift IDs are separate per career and season;
- result/default remains stable across seasons;
- Tavern media reuse does not merge Satyr Maid with legacy Tavern gameplay identity;
- Hunt/Forest media reuse does not merge Undead Farm with Hunter/Activity gameplay identity;
- PR34 does not invent Hard Work endings for the two new starter careers;
- no new media asset was required for PR34 functional merge.

Canonical audit:
`PR34_STARTER_CAREER_PRESENTATION_COVERAGE_v1.md`.

## Media waiting on authored identities

### Satyr Maid
Wait for authored production IDs before dedicated media for:
- milestones/events beyond current shift layer;
- recurring NPC/relationship scenes;
- voluntary Night scenes;
- endings/outcomes.

### Undead Farm
Wait for authored production IDs before dedicated media for:
- anomaly/milestone scenes;
- major NPC/relationship scenes;
- School research continuations;
- Activity-return continuations;
- endings/outcomes.

### Other ordinary careers
Most remain content-first before final media binding.

### Forest depth
Hunter trail, challenge families, seasonal topology and some Old Boundary specialization remain content-first/Product-dependent.

### Palace
Final media waits on authoritative Palace role/assignment/event/outcome identities.

## School dependencies

Already media-addressable:
- eight paid lesson semantic IDs;
- real blocking `base.school / lesson` scene;
- current shared School/workshop static fallbacks.

Still content/Product-dependent:
- teacher/presenter-specific visual identities;
- management/accounting public-result identity;
- Arcana/Forest public-result identity;
- optional certificate/project/exam visuals where retained.

Night study can continue using shared town/Night presentation unless Product authors a dedicated visible identity.

## Poverty / Secret Debt dependencies

Ordinary housing/presentational surfaces still need production content identities for:
- normal room;
- cheap lodging;
- street sleep;
- ordinary street-event families.

Secret Debt structural surfaces are known but final production semantic IDs wait on authored content:
- lender offer;
- delayed activation;
- hidden day work;
- forced Night;
- outcomes.

Static/text fallback is sufficient during implementation.

## Human art decisions that remain optional

Humans/Product may decide:
- which system receives optional GIF polish first;
- dedicated vs reusable media for already-authored scenes;
- teacher/presenter visual identity;
- route/challenge-specific visual depth;
- ending polish;
- animation vs static-only for any already-safe slot.

None of these decisions reopen:
- save identity;
- semantic-ID syntax;
- fallback requirement;
- animation-off mechanics invariance;
- no-timing-coupling rule.

## Ready import shape

New draft:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/starter-trio-media-batch-v1.json`

Properties:
- 15 existing/current-main semantic slots;
- static/base fallback mappings only;
- no invented GIF paths;
- no gameplay fields;
- ready as a shape for later GIF replacement.

### Worker-branch validation limitation

The long-lived Chat 2 branch does **not** contain PR34 Satyr Maid / Undead Farm action definitions.

Therefore:
`starter-trio-presentation-draft.test.ts`

validates the draft against a **minimal explicit PR34 presentation fixture** constructed in the test.

This limitation is explicit and must not be mistaken for current-main runtime state.

On a fresh Lead branch from current main, the same draft should be revalidated against the actual PR34 catalog.

## External producer workflow

Use:
- `EXTERNAL_GIF_FILENAME_IMPORT_CONVENTION_v1.md`
- `MEDIA_PRODUCER_ACCEPTANCE_CARD_TEMPLATE_v1.md`
- `SEMANTIC_MEDIA_BRIEF_TEMPLATE_v1.md`
- `FULL_GAME_MEDIA_PRODUCTION_BATCH_TEMPLATE_v1.md`
- `MEDIA_REPLACEMENT_PACKAGE_ACCEPTANCE_PLAN_v1.md`

Flow:

approved content
-> semantic ID
-> media card/brief
-> GIF/static delivery
-> import mapping
-> fallback check
-> animations-off
-> save/reload
-> rollback
-> acceptance evidence.

## Exact files ready for selective integration

### Items 89–91
- `docs/presentation-prep/STARTER_TRIO_MEDIA_REPLACEMENT_READINESS_v1.md`
- `docs/presentation-prep/PR34_STARTER_CAREER_PRESENTATION_COVERAGE_v1.md`
- `docs/presentation-prep/STARTER_TRIO_GIF_PRODUCTION_BATCH_v1.md`

### Item 92
- `docs/presentation-prep/STARTER_TRIO_PRESENTATION_REGISTRY_DELTA_v1.md`
- `prior-work/astra/prototype-m3.2/content/starter-trio-presentation-registry-delta.fixture.json`

### Items 93–94
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/starter-trio-media-batch-v1.json`
- `prior-work/astra/prototype-m3.2/tests/starter-trio-presentation-draft.test.ts`

### Items 95–96
- `docs/presentation-prep/EXTERNAL_GIF_FILENAME_IMPORT_CONVENTION_v1.md`
- `docs/presentation-prep/MEDIA_PRODUCER_ACCEPTANCE_CARD_TEMPLATE_v1.md`

## Selective-integration order

Recommended technical order:

1. registry delta + readiness/PR34 audit docs;
2. static draft bundle;
3. draft validation test rebased/rechecked against current-main PR34 catalog;
4. external producer/import convention docs;
5. production batch/acceptance docs.

Any non-doc integration should receive exact-head CI on the fresh Lead branch.

## No gameplay mutation boundary

None of the 89–96 deliverables authorizes:
- new career thresholds;
- new ending eligibility;
- new rewards;
- new NPC identity;
- new route mechanics;
- save schema changes;
- animation-completion mechanics.

Media replacement remains presentation-only.

## Final disposition

**READY_NOW**
- 15 starter-trio shift/result semantic slots for media production.

**CONTENT_FIRST**
- unshipped career milestones, relationships, Night scenes, cross-system continuations and endings.

**PRODUCT_DECISION_OPTIONAL**
- art priority, reuse-vs-dedicated choice, character visual identity, ending polish, optional animation scope.

**INTEGRATION**
- selectively copy onto fresh current-main branch;
- revalidate the starter-trio draft against actual PR34 catalog;
- require exact-head CI for non-doc changes.
