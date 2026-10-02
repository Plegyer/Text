# C2-195 — Artist/Geisha career-stage presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Activation baseline: `8067539a606714fad8400ccbba30fd7ccf4a9158`
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Draft stage families

The design draft currently describes these stage families:
- `novice`
- `performer`
- `recognized-artist`
- `veteran`
- `master-artist`
- `patron-network`
- `court-invitation`
- `outcome-ready`

These names are preparation vocabulary only. They are not treated as production runtime authority until Chat 1 publishes/finalizes exact stage identities.

## Presentation semantics

Prepared semantic identity:
- `job/artist-geisha/stage/<stage>`

`presentationSlots()` now creates an Artist/Geisha stage surface only when:
1. the live catalog contains career `artist-geisha`; and
2. that live career contains the exact matching stage string.

On the activation baseline only `novice` exists, so only:
- `job/artist-geisha/stage/novice`

can materialize from this preparation.

Every materialized stage surface falls back to:
- `job/artist-geisha/result/default`

No static override is published for draft-only advanced stages at C2-195.

## Advanced-readiness firewall

The following draft families are status/career-stage presentation concepts, not ending cards:
- `master-artist`
- `patron-network`
- `court-invitation`
- `outcome-ready`

They create no:
- ending ID;
- ending eligibility;
- reward;
- Meta fact;
- Palace unlock;
- automatic route commitment.

`court-invitation` must remain visually and semantically distinct from Palace access even if frozen runtime later publishes that exact career stage.

## Final rebuild rule

C2-204 must compare this draft list against the exact frozen Artist/Geisha runtime:
- exact matches may be retained;
- renamed/absent stages must not keep stale semantic bindings;
- final production overrides may target only exact frozen runtime stages.

This preparation changes no career state, transitions, gameplay conditions/effects/rewards, Save/RNG, economy, School/NightFlow/Activity mechanics, ending eligibility or Meta.
