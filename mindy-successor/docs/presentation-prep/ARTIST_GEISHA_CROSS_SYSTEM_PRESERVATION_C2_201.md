# C2-201 — Artist/Geisha cross-system presentation preservation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Artist runtime contract authority observed: `chat1/artist-geisha-complete-v16@73d328578f4d9c35e97675400edb14b2b1468493`
Frozen Merchant presentation reference: PR #227 @ `77becbeb8ce139ce4326df018af779fd741d70af`
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Artist cross-system authority

The current `ARTIST_GEISHA_RUNTIME_CONTRACT_v1.json` publishes no `crossSystem` section and no exact Artist cross-system event identity.

The contract also explicitly leaves/forbids invention of:
- Palace access from Artist career;
- generic patron system;
- Assassin seam;
- Prostitute seam;
- new curriculum;
- universal reputation or contest engine.

Therefore C2-201 binds **zero** guessed Artist cross-system presentation surfaces.

## Existing consumer preservation

Artist/Geisha additions must not remove or reinterpret already-shipped presentation consumers including:
- `job/lumber/result/default`
- `job/satyr-maid/result/default`
- `job/undead-farm/result/default`
- `job/tavern/result/default`
- `job/hunter/result/default`
- `job/guard/result/default`
- `job/merchant/result/default`
- existing Forest/Activity presentation identities
- existing relationship/stage/item/state surfaces for earlier careers.

Artist presentation uses its own namespace families:
- `job/artist-geisha/*`
- any future exact Artist relationship namespace derived from the frozen relationship id;
- exact live Artist event IDs from the shared event mapper;
- `ending/artist-geisha/hard-work`.

No Artist preparation ID uses `job/merchant/*`, `job/guard/*`, `job/hunter/*`, `job/tavern/*`, `job/satyr-maid/*`, `job/undead-farm/*` or `job/lumber/*`.

## Frozen Merchant collision rule

Merchant PR #227 remains immutable and QA-accepted.

Artist v18 does not modify that head. Final Artist freeze must compare its exact semantic namespace against frozen Merchant presentation before QA handoff.

The currently prepared Artist namespace and frozen Merchant namespace are disjoint by career/relationship prefix:
- Artist: `job/artist-geisha/*`
- Merchant: `job/merchant/*`, `relationship/merchant-supplier/*`, `ending/merchant/*`

Exact live event IDs are also career-owned by source id and cannot collide if the runtime catalog remains valid.

## Court/Palace boundary

A future exact Artist Court Invitation/readiness surface is not a Palace presentation surface.

C2-201 must not reserve:
- `palace/*`
- Palace access event IDs;
- generic court-contact cross-system IDs not present in frozen runtime.

## Final C2-204 preservation gate

The final frozen candidate must verify:
1. every Artist semantic override has exact frozen runtime backing;
2. existing non-Artist presentation consumers remain reachable on the frozen runtime base;
3. the Artist delta has zero exact semantic ID overlap with frozen Merchant presentation;
4. no cross-system Artist surface is published unless the frozen runtime provides a concrete exact identity.

If the frozen runtime still contains no Artist cross-system identities, the correct final Artist cross-system presentation count remains zero.

C2-201 changes no cross-career facts, gameplay conditions/effects/rewards, Save/RNG, Activity, NightFlow, School, economy, endings or Meta.
