# C2-205 — Assassin shipped presentation inventory

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Preparation branch: `chat2/assassin-presentation-prep-v19`
Activation checkpoint: `d3b7fe038b35cdc53d786189ef7ba44853a7610d`

This inventory records only Assassin identities already shipped on the Lead activation checkpoint. Future Assassin runtime identities remain non-authoritative until a later Lead runtime activation.

## Shipped gameplay identities

Action:
- `assassin.shift`
- ordinary shift cost: 1 Energy
- unlock: Dexterity 30 + Wits 25 + Reason 20 OR Year 3
- current wage: base 15 with shipped Dexterity/Wits/Reason/Manners weighting
- shipped seasonal scene IDs:
  - `spring.default`
  - `summer.default`
  - `autumn.default`
  - `winter.default`
- ordinary work text remains surveillance/delivery/route preparation/cleanup oriented; presentation does not reinterpret an ordinary shift as mandatory combat.

Career:
- career id: `assassin`
- label: Assassin
- initial stage: `runner`
- shipped stages: `runner`
- shipped transitions: none.

Ending:
- `ending.assassin.hard-work`
- shipped requirement: 50 completed Assassin shifts
- reward: `assassin.hardwork.compat`
- Meta reward: `hardWork:assassin`
- this is the only shipped public Assassin ending identity at this checkpoint.

## Shipped presentation identities

Ordinary result:
- `job/assassin/result/default`
- static source: `assets/presentation/career-assassin-result.svg`
- accessibility key: `presentation.static.career.assassin.result.alt`

Seasonal ordinary Work:
- `job/assassin/shift/spring/default`
  - `assets/presentation/career-assassin-shift-spring.svg`
- `job/assassin/shift/summer/default`
  - `assets/presentation/career-assassin-shift-summer.svg`
- `job/assassin/shift/autumn/default`
  - `assets/presentation/career-assassin-shift-autumn.svg`
- `job/assassin/shift/winter/default`
  - `assets/presentation/career-assassin-shift-winter.svg`

Hard Work:
- `ending/assassin/hard-work`
- static source: `assets/presentation/career-assassin-result.svg`
- accessibility key: `presentation.static.assassin-ending-hard-work.alt`

Current shipped Assassin presentation authority therefore contains six semantic slots:
- one ordinary result;
- four seasonal ordinary Work slots;
- one Hard Work ending.

## Accessibility state

Current production localization already contains RU/EN alt/caption pairs for:
- ordinary Assassin result;
- Spring shift;
- Summer shift;
- Autumn shift;
- Winter shift;
- Hard Work ending.

Current shipped seasonal alt text deliberately depicts preparation/equipment with no target shown and does not claim a lethal/nonlethal route.

## Current project-owned media

Project-owned Assassin static media already exists for:
- ordinary result;
- Spring;
- Summer;
- Autumn;
- Winter.

The current project-owned animation source manifest contains no Assassin-specific animation sequence. C2-205 therefore claims no Assassin GIF/video path and creates none.

## Current School preparation authority

Existing School material is preparation-only:
- `docs/school-prep/SCHOOL_ASSASSIN_PREPARATION_V1.md`
- `docs/school-prep/SCHOOL_ASSASSIN_REACTIVE_DEPTH_V1.md`

Prepared capability-match tracks:
- Field Craft;
- Rhetoric & Social;
- Etiquette & Presentation;
- Literacy & Numbers;
- Physical Training.

These are explicitly capability matches only, not canonical Assassin gates.

Current School prep does not create:
- Assassin contract state;
- target identity;
- lethal/nonlethal rule;
- career stage;
- numeric threshold;
- public School fact;
- Activity route;
- combat curriculum.

## Identities absent from production at C2-205

No shipped Assassin runtime authority currently publishes:
- advanced career stage beyond `runner`;
- contract-phase identity;
- method identity;
- handler/rival/informant/recurring-contact relationship id;
- Assassin-specific item/capability id;
- Assassin Activity/infiltration event id;
- Assassin Guard/Tavern/Merchant cross-system event id;
- Ghost / Handler Takeover / Turncoat public ending id;
- Palace-access identity.

Therefore Chat 2 publishes no such production presentation IDs during Assassin prep.

## Draft-only vocabulary

`docs/CAREER_ASSASSIN_DRAFT_v0.md` is design context only.

The following terms are useful as presentation-prep vocabulary but are not production IDs:
- Runner / Operative / Trusted Blade / Veteran / Ghost / Turncoat / Handler Takeover / Refusal Chain / Outcome-ready;
- offer / intel gathering / prep / choose method / execute / abort / redirect / fallout;
- stealth / social access / staged accident / indirect manipulation / nonlethal substitution / expose target;
- handler / rival operative / recurring target-contact / informant;
- Concealed Toolset / Sealed Pass / disguise or formal attire / evidence-document / Activity route tool;
- Ghost / Handler Takeover / Refusal-Turncoat outcomes.

C2-205 does not reserve these strings as runtime IDs.

## Presentation firewall

Assassin presentation prep must not invent or imply:
- combat mechanics;
- Morality stat;
- universal black-market shop;
- Palace unlock;
- global fallout/reputation meter;
- new ending eligibility or reward;
- Save/RNG changes;
- new Activity/NightFlow/School mechanics.

Ordinary Assassin work remains city-side and separate from any future Activity/infiltration flow until exact runtime authority exists.
