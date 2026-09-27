# Media-Pool Accessibility / Alt Audit v1

Purpose: define and audit alt-text requirements for 3–5-candidate presentation pools.

Alt text belongs to the semantic mapping, not merely to the media file.

## Core requirements

Every candidate GIF/image in a presentation pool must have useful alt/accessibility text.

Alt text must:
- describe the visible presentation;
- stay context-correct for the semantic `presentationId`;
- avoid hidden mechanics;
- avoid unchosen outcomes;
- avoid implying unavailable choices;
- avoid unapproved character/NPC identity;
- remain meaningful when the same GIF is reused elsewhere.

## What alt text should describe

Good alt text may describe:
- visible setting;
- visible work/activity;
- visible season/weather;
- visible objects relevant to scene context;
- visible participants when authoritatively defined;
- neutral movement or environmental change.

## What alt text should not describe

Do not include hidden or mechanical information such as:
- exact money reward;
- Energy/stat changes;
- RNG result;
- cooldown;
- eligibility;
- ending unlock;
- relationship threshold;
- route unlock;
- whether a future choice succeeds;
- Secret Debt state unless the semantic scene itself is explicitly that content.

## Candidate-specific text is required

Within one pool, candidates should not all use the same vague alt text when their visuals differ materially.

Example poor set:
- "Lumber shift."
- "Lumber shift."
- "Lumber shift."

Better:
- "A worker sorts cut timber in a spring work area."
- "Timber is carried across muddy spring ground."
- "Tools are checked beside stacked logs in a spring lumber yard."

The semantic meaning is shared, while visible detail is candidate-specific.

## Reused GIF across different semantic IDs

A reused GIF may need different alt text for different semantic mappings.

Example:
one generic classroom-writing GIF may be mapped to:
- `school/literacy-and-numbers/lesson/default`;
- `school/arcana/lesson/default`.

The file may be identical, but alt text should match the context.

Acceptable mapping:
- Literacy: "Notes and number exercises are reviewed at a School desk."
- Arcana: "Arcana notes and a controlled diagram are reviewed at a School desk."

Do not use one context-specific alt string globally when reuse crosses semantic contexts.

## Fallback text remains meaningful

Alt text is not the only fallback.

When animation is unavailable:
- static fallback still needs alt text;
- authored scene text still carries essential meaning;
- gameplay choices remain understandable.

No critical gameplay fact may exist only in GIF alt text.

---

# Representative audit — careers

## Lumber spring pool

Semantic ID:
`job/lumber/shift/spring/default`

Current static fallback:
`assets/stage-lumber.svg`

Candidate alt examples:
1. "Timber is handled in a damp spring work area."
2. "A worker carries cut wood across muddy spring ground."
3. "Tools are checked beside stacked logs during a spring shift."
4. "Spring forest work continues near wet access paths."

Audit:
- visible context: PASS;
- no wage/effect claim: PASS;
- no Foreman identity implied: PASS;
- no ending/milestone claim: PASS;
- candidate-specific detail: PASS.

## Merchant autumn pool

Semantic ID:
`job/merchant/shift/autumn/default`

Current fallback:
`assets/stage-town.svg`

Candidate alt examples:
1. "Goods are arranged at a town market during an autumn shift."
2. "A ledger and ordinary goods are checked at a market counter."
3. "A routine parcel is prepared for delivery through the autumn market."

Audit:
- no profit/result claim: PASS;
- no named buyer/contract invented: PASS;
- season/context visible: PASS.

## Prostitute base shift pool

Semantic family:
`job/prostitute/shift/<season>/default`

Current fallback:
`assets/stage-room.svg`

Candidate alt examples:
1. "A private professional room is prepared before an ordinary shift."
2. "Room items are arranged in a neutral professional setting."
3. "A quiet room is reset between ordinary work periods."

Audit:
- no explicit sexual action: PASS;
- no named client: PASS;
- no coercion/relationship implication: PASS;
- no gameplay outcome encoded: PASS.

---

# Representative audit — School

## Arcana paid lesson

Semantic ID:
`school/arcana/lesson/default`

Current fallback:
`assets/stage-school.svg`

Candidate alt examples:
1. "Arcana notes are reviewed beside a controlled classroom diagram."
2. "A careful observation exercise is performed in the School classroom."
3. "A simple Arcana pattern is compared with written notes."

Audit:
- no extra stat gain mentioned: PASS;
- no teacher identity required: PASS;
- visible track context clear: PASS;
- usable with animations off: PASS.

## Generic post-paid-lesson hook

Semantic ID:
`location/town/event/school-lesson-content-v1-after-school/default`

Candidate alt examples:
1. "A School classroom settles after a completed lesson."
2. "Notes and materials are gathered after class."
3. "A quiet classroom reflection continues before leaving."

Audit:
- does not guess exact course: PASS;
- does not guess teacher: PASS;
- no tuition/Energy/progress implication: PASS.

## Night-study hook

Semantic ID:
`location/town/event/school-life-content-v1-after-night-study/default`

Candidate alt examples:
1. "Quiet notes are reviewed at the end of Night study."
2. "A diagram is checked under low evening light."
3. "Study materials are organized as the Night session ends."

Audit:
- no paid-lesson language: PASS;
- no extra Night-study benefit claimed: PASS;
- no stat/energy numbers exposed: PASS.

---

# Representative audit — ordinary poverty

## Helpful summer street event

Semantic ID:
`location/town/event/poverty-street-production-helpful-summer/default`

Candidate alt examples:
1. "A closing market stall has one crate left beside the street."
2. "A quiet summer market edge is being packed away for the night."
3. "A covered crate waits near a closing street stall."

Audit:
- does not imply player accepted paid errand: PASS;
- no money value disclosed: PASS;
- no Secret Debt implication: PASS.

## Cheap lodging

Semantic ID:
`location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

Candidate alt examples:
1. "A cramped shared room settles into early quiet."
2. "Belongings are kept close in a thin-walled cheap room."
3. "A shared lodging room grows quiet for the night."

Audit:
- no added penalty/cost claim: PASS;
- context matches cheap lodging: PASS;
- fallback remains meaningful: PASS.

## Cold rain pressure event

Semantic ID:
`location/town/event/poverty-pressure-production-cold-rain/default`

Candidate alt examples:
1. "Cold rain reaches the edge of a street shelter."
2. "A deeper doorway is visible beyond a wet curb."
3. "Rain runs along the pavement beside an exposed resting place."

Audit:
- does not decide `take-doorway` vs `wait-it-out`: PASS;
- does not state Energy/grooming loss: PASS;
- no hidden outcome encoded: PASS.

---

# Reuse-group audit rule

For every reuse group, review a matrix:

| Check | Required |
| --- | --- |
| semantic ID preserved | yes |
| candidate-specific alt | yes |
| context-specific remap alt allowed | yes |
| hidden mechanics absent | yes |
| unchosen outcome absent | yes |
| unapproved identity absent | yes |
| static fallback has useful alt | yes |
| text fallback remains sufficient | yes |

A reusable file passes only if every semantic mapping has correct accessible meaning.

## Import validation

Reject a candidate when:
- alt is empty;
- alt only says "animation" or filename;
- alt describes a different semantic scene;
- alt reveals hidden mechanics;
- alt assumes a choice outcome;
- alt names an unapproved character;
- reused asset inherited stale alt text from another context.

## Static fallback audit

Every pool must also audit its static fallback alt.

Current representative fallback assets:
- careers: `stage-lumber.svg`, `stage-tavern.svg`, `stage-forest.svg`, `stage-town.svg`, `stage-room.svg`;
- School: `stage-school.svg`;
- poverty street: `stage-outside.svg`;
- cheap lodging: `stage-room.svg`.

Generic current alt text may remain technically valid, but context-specific override alt is preferable when the static asset is mapped through a specific semantic presentation slot.

## Accessibility acceptance

A pool is accessibility-ready when:
1. every candidate has non-empty context-correct alt;
2. reused media can carry per-mapping alt;
3. alt never contains hidden mechanics or unchosen outcomes;
4. animations-off static fallback also has meaningful alt;
5. authored text remains sufficient without any image/GIF;
6. removing one candidate does not remove essential accessible information.
