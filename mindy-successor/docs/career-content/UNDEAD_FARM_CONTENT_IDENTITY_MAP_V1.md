# Undead Farm Content Identity Map v1

Status: C3-18 current-main content identity audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`.
Fixture: `prior-work/astra/prototype-m3.2/content/undead-farm-content-identity-map-v1.fixture.json`.

## Current production identity

Career:
- `undead-farm`
- initial stage `new-hand`
- current second stage `reliable-helper`.

Current transition:
- transition ID `first-shift`;
- from `new-hand`;
- to `reliable-helper`;
- exact condition: `completed_shifts >= 1`;
- exact effect: add career fact `first-shift-complete`.

This is the complete current typed Undead Farm progression surface. Later draft stages are not production identities.

## Agriculture identity

Repeatable production action:
`undead-farm.shift`.

Existing scene IDs:
- `spring.default`;
- `summer.default`;
- `autumn.default`;
- `winter.default`.

Existing result presentation:
`job/undead-farm/result/default`.

Existing seasonal presentation IDs:
- `job/undead-farm/shift/spring/default`;
- `job/undead-farm/shift/summer/default`;
- `job/undead-farm/shift/autumn/default`;
- `job/undead-farm/shift/winter/default`.

Current scenes already provide the only safe agriculture content seam:
- wet spring work / unstable shoots;
- fast summer growth / maintenance;
- autumn harvest / sorting / processing;
- winter storage / repair / preserved material.

C3-19 must deepen these existing identities rather than invent crop/resource event IDs.

## Magic and Reason identity

Current `undead-farm.shift` already uses:
- `magic` as a wage weight;
- `reason` as a wage weight;
- spring seasonal `magic` gain;
- autumn seasonal `reason` gain;
- winter seasonal `magic + reason` gains.

These are current gameplay axes.

They are **not** current Research-route identities.

There is no:
- research fact;
- research counter;
- experiment event;
- analysis event;
- School milestone tied to Undead Farm;
- research ending.

C3-19 may write player-facing research-flavored text against the existing winter/spring work scenes, but must not state that a Research route has been unlocked or progressed.

## Existing preservation capability

Current global item definition:
- item `field_preservation_kit`;
- capability `preserve_specimen`.

This is a real current production identity.

However, on the audited current main:
- `preserve_specimen` appears only on that item definition;
- Undead Farm has no condition or effect consuming it;
- no specimen event exists;
- no preserved-specimen career fact exists.

Classification:
existing cross-system capability, **no current Undead Farm consumer**.

The design draft's Preservation Kit concept therefore has a partial identity match, but not a working Farm research hook.

C3-19/C3-20 may reference this capability only as a handoff dependency, not as proof that a Farm route is implemented.

## Research identity

Current production has no Undead Farm research route identity.

Absent:
- Research stage;
- specimen fact;
- experiment event;
- School Arcana/Reason producer;
- research-choice effect;
- research ending.

Classification:
`CONTENT_GAP_REQUIRES_EXISTING_GAMEPLAY_IDENTITY`.

The design draft remains future intent, not authority for new IDs or thresholds.

## Successor identity

Current production has no:
- farm owner/manager relationship;
- trust counter/fact;
- management fact;
- successor choice;
- supply/labor crisis event;
- successor ending.

Classification:
`CONTENT_GAP_REQUIRES_EXISTING_GAMEPLAY_IDENTITY`.

The current `reliable-helper` stage is not a successor or ownership signal.

C3-20 may prepare successor-facing prose only as a handoff attached to current recognition/work identities, without implying that succession state exists.

## External-route identity

Current production has no:
- Undead Farm anomaly world fact;
- Farm-specific Activity result;
- Merchant return hook;
- world-to-career resolver event;
- external anomaly ending.

Classification:
`CONTENT_GAP_REQUIRES_EXISTING_GAMEPLAY_IDENTITY`.

No current Forest or other Activity result should be repurposed into an Undead Farm external route without a Lead-approved identity.

## Resources

The design draft calls for production resources, specimens and trade goods.

Current `undead-farm.shift` does not write an item/resource beyond its ordinary wage/stat behavior.

No Farm-specific resource ID is present in the current shift.

Therefore C3-19 must not invent:
- crop item IDs;
- specimen IDs;
- trade-good IDs;
- quantities;
- sale values.

Text may describe sorting, storage or preserved material as scene flavor only unless an exact resource identity exists.

## Relationships

Current `definitions.json` has no Undead Farm relationship identity.

The design draft candidates:
- owner;
- caretaker;
- agronomist;
- undead worker relationship;

remain design-only.

C3-20 must not create trust, romance, mentor or succession state until exact IDs exist.

## Endings

Current production has no:
- `ending.undead-farm.hard-work`;
- Research Farmer ending;
- Farm Successor ending;
- External Anomaly ending.

Existing starter-career tests explicitly protect the absence of guessed Undead Farm Hard Work.

No threshold or reward is selected in this map.

## Current content gaps by queue task

### C3-19 — research/agriculture/magic content

Ready now:
- four seasonal shift IDs;
- Magic and Reason as current shift axes;
- existing preservation capability as a documented but unconsumed dependency;
- result presentation identity.

Safe content:
- planting, growth, harvest, storage;
- observation of unstable growth/material;
- sorting and record-like reasoning;
- careful magical handling as job flavor.

Blocked:
- specimen acquisition;
- research progression;
- School-driven continuation;
- new item/resource production;
- experiment outcomes.

### C3-20 — successor/external content

Ready now:
- `reliable-helper` as the only current durable recognition stage;
- current seasonal shift identities;
- existing global `preserve_specimen` capability as a possible future dependency.

Blocked:
- successor trust/relationship state;
- management thresholds;
- ownership transfer;
- Activity anomaly result;
- Merchant contract return;
- external world fact;
- ending eligibility.

## Ownership boundaries

Chat 3 may author:
- player-facing Undead Farm content/localization bundles;
- content fixtures;
- identity/collision audits;
- handoff prose.

Chat 3 must not change:
- career state machine;
- wage/stat tuning;
- resource/item catalog;
- School producers;
- Activity runtime/results;
- relationship state;
- ending framework;
- shared runtime/UI;
- media ownership;
- Save/RNG.

## C3-18 conclusion

Current Undead Farm is a starter-career slice:
- one repeatable shift;
- four seasonal agriculture scenes;
- one first-shift transition;
- stage `reliable-helper`;
- fact `first-shift-complete`;
- Magic/Reason already participate in the current shift;
- a global `preserve_specimen` capability exists but is not wired to the Farm.

Research, successor and external routes remain content-design gaps without production gameplay identities. C3-19 and C3-20 must stay on current seasonal work surfaces and hand off missing dependencies rather than creating state.
