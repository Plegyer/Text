# Chat5 non-Lumber seasonal content QA v1

Status: COMPLETE / GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED

Reviewed Chat 5 items:
`49–60`.

Baseline named by the worker audit:
current main `1af3104c1e4c180019b965adac8e87e67de89347`.

## Exact scope

Nine non-Lumber ordinary careers:
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

Four seasons each:
- spring;
- summer;
- autumn;
- winter.

Total:
`36` current seasonal scene identities.

## Fixture verification

`non-lumber-seasonal-scene-localization-v1.fixture.json`
blob:
`e0b321feb94176980aea8f6341a495c5bc259a1e`.

Verified:
- entries: 36;
- unique presentation IDs: 36;
- unique localization keys: 36;
- missing RU: 0;
- missing EN: 0;
- Lumber entries: 0;
- gameplay-owned fields: 0.

Presentation IDs use exact current form:
`job/<career>/shift/<season>/default`.

Text keys are stable locale-neutral proposed keys:
`action.<action-id>.scene.<season>.default.text`.

## Hunter isolation

Hunter scope is ordinary:
`hunter.shift`
seasonal work only.

No fixture entry contains:
- Forest route;
- Old Boundary;
- token;
- clue;
- expedition semantics.

Thus ordinary Hunter seasonal prose does not promote Hunter/Forest Product work.

## Assassin / Prostitute boundaries

Assassin copy is presentation-only and does not introduce violent mechanics, rewards or mission state.

Prostitute copy remains:
- non-explicit;
- voluntary;
- mechanics-neutral.

## Media ownership

The Chat 5 fixture contains no media paths.

It does not duplicate or replace Chat 2 seasonal static assets.

Expected cross-owner relationship:
- Chat 5 supplies text;
- Chat 2 supplies project-owned seasonal static art;
- Lead owns production consumer wiring.

## Current consumer gap

Current production does not yet consume the proposed 36 localized seasonal scene text keys.

Therefore classification:
`SHARED_PRESENTATION_CONSUMER_REQUIRED`.

Lead integration must:
- resolve localized scene text by the already-selected action/scene identity;
- fall back to embedded current scene text;
- preserve the selected presentationId;
- preserve selected media;
- preserve action mechanics, Energy, wages/effects, RNG and Save.

## Verdict

`GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`.

All 36 entries are complete RU+EN text-only current identities. No mechanic or Forest-route bleed was found.

Integrate selectively from fresh main; do not merge the Chat 5 worker branch wholesale.
