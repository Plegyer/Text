# Satyr Maid Boundary / Reputation Depth v2

Status: C3-28 incremental presentation-only handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/satyr-maid-boundary-reputation-depth-v2.fixture.json`.
Dependency candidate: PR #93 exact head `340ed61e2a7294ecf5ce20632e469caf00e386ab`.

## Scope

C3-28 extends C3-17 with eight additional RU/EN presentation variants on the existing four seasonal Satyr Maid shift scenes.

The bundle adds content around:
- polite deflection;
- neutral recognition;
- optional light flirt tone;
- decline of personal pressure;
- fair service under familiarity;
- professional composure;
- familiar courtesy;
- familiar limits.

## Identity boundary

All variants attach only to existing `satyr-maid.shift` scene IDs.

The only durable recognition context is the existing career stage `known-face`.

No variant creates:
- a reputation score;
- a guest relationship;
- a flirt flag;
- consent state;
- a boundary counter;
- a private-meeting hook;
- NightFlow state.

## Recognition vs reputation

The copy may describe patrons recognizing the heroine or forming an impression during a shift.

That does not mean a separate reputation system exists.

`known-face` remains a career stage and is not promoted into a numeric or hidden reputation mechanic.

## Flirt boundary

Light flirt appears only as a local conversational tone.

The content never asserts:
- automatic reciprocation;
- romance;
- relationship progression;
- after-hours access;
- a future private meeting.

A decline is equally valid presentation flavor and does not need a separate gameplay effect.

## Integration

These keys are content handoff candidates only.

No runtime selector is added by Chat 3.

Safe fallback order:
1. C3-17 presentation variant if integrated;
2. C3-16 service copy if integrated;
3. current source seasonal scene text.

## Exact non-scope

No changes to:
- career stages/transitions;
- wage/stat effects;
- relationships;
- NightFlow;
- endings;
- Save/RNG;
- media;
- shared runtime/UI.

## C3-28 disposition

Ready:
- eight additional RU/EN boundary/recognition/flirt-tone variants;
- exact current-scene attachments;
- explicit non-persistent reputation and relationship boundary.

Blocked as mechanics:
- reputation progression;
- guest/flirt relationship routes;
- boundary-state progression;
- Night/private meeting content.
