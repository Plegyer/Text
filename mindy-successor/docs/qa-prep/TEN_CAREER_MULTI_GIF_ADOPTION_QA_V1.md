# Ten-Career Multi-GIF Adoption QA v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed branch: chat2/presentation-replacement-next
Primary manifest: ten-career-pool-adoption-v2.json

## Disposition

MAPPING_READY / ASSETS_NOT_READY.

The adoption manifest is compatible with the PR42 pool model and uses shipped semantic career presentation IDs only.

It must remain staging until real GIF assets replace the non-shipped placeholder paths.

## Semantic coverage

Manifest entries:
50.

Expected current career surfaces:
10 careers x:
- spring shift;
- summer shift;
- autumn shift;
- winter shift;
- result/default.

Observed:
50 / 50.

Every presentation ID matches the current shipped semantic families:

job/<career>/shift/<season>/default

or:

job/<career>/result/default

Careers:
- lumber
- satyr-maid
- undead-farm
- tavern
- hunter
- guard
- merchant
- artist-geisha
- assassin
- prostitute

Unknown/unshipped career semantic IDs:
NONE FOUND.

PASS.

## Pool bounds

Every runtimeSlot pool has:
3 candidates.

Required PR42 range:
3..5.

Out-of-range pools:
NONE.

PASS.

## Candidate identity

Candidates use:
- stable locale-neutral key;
- kind gif;
- presentation-only source;
- alt source text;
- pool version 1;
- unweighted selection.

Localization metadata refers to the same candidate key and requires:
- ru
- en

No locale-specific candidate identity is used.

PASS.

## RU + EN alt authoring

The adoption manifest uses deterministic alt localization keys per semantic slot + candidate key.

The companion readiness ledger reports RU and EN authoring/reference coverage for the full ten-career adoption, including result/default entries.

Companion authoring:
TEN_CAREER_MEDIA_ALT_RU_EN_v1.md

explicitly supplies 120 RU+EN pairs for the 40 seasonal shift surfaces.

The readiness ledger additionally records RU+EN authoring/reference keys for the 10 result surfaces.

Classification:
RU_EN_ALT_AUTHORING_READY.

Before production, Lead must materialize those references into the current localization bundle and validate every referenced key.

Do not treat requiredLocales metadata alone as proof of integrated localization.

## Asset truth

Manifest status:
STAGING_ONLY.

For the ten-career adoption:
- entries: 50;
- candidate references: 150;
- real GIF candidates: 0;
- placeholder candidates: 150;
- production-ready GIF pools: 0.

All candidate paths are under non-shipped staging placeholder locations.

PASS for honest status reporting.

The manifest does NOT claim placeholder files are production media.

## Static fallbacks

Existing real static fallback files are used by career family, including:
- stage-lumber.svg;
- stage-tavern.svg;
- stage-forest.svg;
- stage-town.svg;
- stage-room.svg.

Therefore missing bespoke GIFs do not block gameplay/presentation fallback.

PASS.

## No gameplay fields

Machine scan of the adoption manifest found no gameplay fields such as:
- conditions;
- effects;
- rewards;
- wage;
- Energy;
- counter;
- eligibility;
- RNG.

The manifest owns presentation mapping only.

PASS.

## Gameplay firewall

Candidate selection must not alter:
- target action ID;
- 1-Energy Work cost;
- wage;
- seasonal stat effect;
- completed_shifts;
- career stage;
- Lumber Hard Work;
- ending/Meta state.

PR42 now supplies the shared deterministic presentation-only selector.

The adoption manifest does not duplicate those mechanics.

PASS.

## Locale firewall

Locale:
- changes alt/caption text;
- does not change presentationId;
- does not change candidate key;
- does not change media selection seed.

Same occurrence RU <-> EN must keep the same selected candidate.

PR42 runtime has exact-head evidence for this invariant.

PASS at runtime-contract level.

## Production promotion requirements

Before any pool is promoted from staging:
1. referenced GIF files must exist in managed production asset paths;
2. each pool keeps 3..5 valid candidates;
3. RU and EN alt keys resolve in current localization bundle;
4. static fallback remains;
5. no placeholder/non-shipped path remains;
6. semantic presentation ID is still shipped;
7. exact-head UI smoke proves candidate stability/reload/locale switch;
8. full CI passes.

## Final classification

Shipped semantic IDs only:
PASS.

50/50 career surfaces:
PASS.

Pool 3..5:
PASS — all are 3.

Locale-neutral candidate IDs:
PASS.

RU+EN alt authoring/reference:
READY.

Gameplay fields in media manifest:
NONE.

Real GIF assets:
0 / 150.

Placeholder honesty:
PASS.

Production media readiness:
NOT READY.

Selective mapping readiness:
READY AFTER REAL-ASSET SUBSTITUTION.

No Chat 4 production runtime/UI/content file was modified.
