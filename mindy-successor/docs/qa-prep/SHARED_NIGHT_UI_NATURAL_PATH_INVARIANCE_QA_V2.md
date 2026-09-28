# Shared Night UI natural-path invariance QA v2

Status: COMPLETE / EXECUTABLE_ACCEPTANCE_CONTRACT

Initial acceptance baseline:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

Source expectation:
`shared-night-ui-natural-path-v2.fixture.json`
blob `462ef633f56cb09231e3b5542dae96dcc20b18b1`.

Purpose:
define exact RU↔EN acceptance for the 16-key shared Night/lodging presentation slice.

## Common locale-switch rule

At every presentation checkpoint:
1. snapshot serialized gameplay Save;
2. snapshot NightFlow phase and stable IDs;
3. render RU;
4. switch to EN without dispatching gameplay;
5. require byte-identical gameplay Save;
6. require identical phase/IDs/resources/modifiers;
7. allow only localized visible text to differ.

Locale switch must not execute:
- `chooseLodging`;
- `chooseNightChoice`;
- calendar advance;
- resolver work;
- effect application.

## Natural path A — normal room -> sleep

Start:
NightFlow reaches `LodgingResolution`.

Stable lodging:
`lodging.normal`.

Before choosing lodging:
RU↔EN must preserve:
- available lodging IDs/order;
- money;
- housing;
- `lodgingPaymentCommitted`;
- NightFlow phase;
- RNG.

Localized surfaces may change:
- Night eyebrow;
- lodging prompt;
- lodging label;
- next-day Energy text.

Choose:
`{type:'chooseLodging', id:'lodging.normal'}`.

Required result:
- exactly one charge of 100;
- housing becomes current normal lodging state;
- lodging next-day Energy delta remains 0;
- no lodging next-day effect;
- phase advances exactly as current gameplay defines.

At `VoluntaryNightChoice`:
RU↔EN must preserve:
- same available Night choice IDs;
- same `night.sleep`;
- same selected-lodging identity;
- same money/housing/modifiers;
- same Save/RNG.

Choose:
`night.sleep`.

Required:
- no immediate effect;
- next-day Energy delta 0 from the choice;
- no duplicate lodging charge;
- no locale-dependent branch.

## Natural path B — cheap lodging -> sleep

Stable lodging:
`lodging.cheap`.

Required transaction:
- exactly one charge of 50;
- housing becomes cheap;
- lodging next-day Energy delta 0;
- no lodging next-day effects.

Voluntary choice:
`night.sleep`.

Require identical mechanics in RU and EN.

## Natural path C — street -> sleep

Stable lodging:
`lodging.street`.

Required transaction:
- cost 0;
- housing becomes street;
- lodging next-day Energy delta -1;
- exactly one next-day grooming -1 effect.

Locale switching before or after the lodging choice must not:
- duplicate grooming penalty;
- change Energy delta;
- mark payment twice;
- advance NightFlow.

Then choose:
`night.sleep`.

Night choice adds:
- next-day Energy delta 0;
- no additional effects.

The street consequence remains exactly the gameplay-owned lodging consequence.

## Next-day consequence text

The UI may localize the formatter:
`ui.night.nextDayEnergy`.

It must display the already-computed gameplay delta.

The formatter must not:
- recalculate the delta;
- invert sign;
- store localized text in Save;
- modify next-day modifiers.

For street, visible localized text must reflect the same `-1` gameplay value in RU and EN.

For normal/cheap/sleep paths, zero-delta omission/display behavior must remain structurally the same across locales.

## Town lodging summary

`ui.town.lodgingToday`
may localize:
- label text;
- surrounding formatter.

It must use the same current rent/cost source.

Changing locale cannot change:
- charged amount;
- current housing;
- rent calculation.

## Housing labels

Display localization:
- `room` -> localized room label;
- `hostel` -> localized cheap-lodging label;
- `shelter` -> localized street label.

Persisted housing values remain exact existing machine values.

Do not migrate Save to localized housing strings.

## Generic Night choice label

`nightChoice.night.sleep.label`
localizes only the label for stable choice ID:
`night.sleep`.

Eligibility/effects/order are unchanged.

## School Night Study regression

For any `school.night_study.*` choice:
- keep School-specific dynamic label/context;
- same condition and stat/counter effects;
- same next-day Energy -1;
- shared Night label wiring must not replace School course/stat formatting.

## Foreman regression

`lumber.foreman.night`:
- exact stable ID unchanged;
- relationship requirement unchanged;
- `night_meetings += 1` unchanged;
- next-day Energy delta remains 0;
- existing dedicated label ownership unchanged.

## Save/RNG assertions

For each RU↔EN presentation switch, assert unchanged:
- `run.flow.night.phase`;
- `selectedLodgingId`;
- `lodgingPaymentCommitted`;
- `selectedNightChoiceId`;
- resources/money;
- housing state;
- next-day modifiers;
- day/calendar state;
- gameplay RNG;
- journal/outcome refs from PR54.

PR54 journal refs are orthogonal and must not be created or mutated by merely rendering Night UI.

## Exactly-once acceptance

Each command may execute only once:
- lodging cost once;
- street consequence once;
- Night choice once;
- next-day application once.

RU↔EN re-rendering is read-only.

## Required production tests

At minimum:
- normal room full path RU↔EN;
- cheap lodging full path RU↔EN;
- street full path RU↔EN;
- generic sleep label;
- town lodging summary;
- next-day Energy display;
- School Night Study regression;
- Foreman Night regression;
- exact serialized Save equality on locale-only switches.

## Verdict

Accept only:
`same Night gameplay state + same command = same mechanics/result in RU and EN`.

Localization may change presentation text only.


## PR55 executable evidence

PR55 exact head:
`724ab70a5a83424fb8a576c3deb082b60256ffc0`.

Run #98:
- SUCCESS;
- 342/342.

Post-merge main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Run #99:
- SUCCESS;
- 342/342.

Relevant passing regressions include:
- `shared Night UI production fixture contains exactly 16 additive RU EN keys`;
- `shared Night UI consumers use stable localization keys without NightFlow mechanics changes`;
- `shared Night UI fixture is presentation-only`;
- `renderer: shared Night and lodging UI localizes RU EN without state drift`;
- existing exactly-once street lodging -> voluntary sleep day-advance regression;
- existing normal lodging + optional Foreman Night exactly-once regression.

Thus the natural-path presentation contract is now backed by production CI on merged main.

Current status:
`GREEN_POST_MERGE_MAIN`.
