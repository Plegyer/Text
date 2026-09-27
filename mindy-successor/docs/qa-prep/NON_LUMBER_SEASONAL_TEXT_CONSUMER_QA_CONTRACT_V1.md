# Non-Lumber seasonal text consumer QA contract v1

Status: COMPLETE / ACCEPTANCE_CONTRACT

Source:
Chat 5 `non-lumber-seasonal-scene-localization-v1.fixture.json`.

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

PR48 now ships the corresponding current seasonal static media identities.

## Exact scope

Nine non-Lumber ordinary careers:
- satyr-maid;
- undead-farm;
- tavern;
- hunter;
- guard;
- merchant;
- artist-geisha;
- assassin;
- prostitute.

Four seasons each:
- spring;
- summer;
- autumn;
- winter.

Expected localized scene entries:
`36`.

Lumber:
`0` entries.

## Stable identity contract

For every row:
- actionId stays exact current ID;
- sceneId stays `<season>.default`;
- presentationId stays `job/<career>/shift/<season>/default`;
- PR48 static SVG stays the same physical asset across locales.

The text consumer must derive copy from already-selected action/scene identity.

It must not select the season.

## Proposed text key

Stable key form:
`action.<action-id>.scene.<season>.default.text`.

Locale is not part of the key identity.

## Gameplay invariance

For equivalent pre-action states, running the same seasonal action under RU and EN must produce identical:
- action ID;
- action count;
- career completed-shift counter;
- Energy delta;
- money/resource/stat deltas;
- action result;
- reaction eligibility;
- RNG state;
- Save state.

The localized scene text must be resolved after the gameplay scene identity is known.

## Result/media invariance

PR48 already binds 40 current seasonal presentation slots to project-owned static SVGs.

For the 36 non-Lumber rows:
- same presentationId in RU and EN;
- same static src in RU and EN;
- same selected media identity;
- scene text localization must not replace the asset or rerun media selection.

## Lumber isolation

The future consumer may be generic in implementation, but this content integration must not change Lumber-owned scene text without a separately reviewed source.

No new Lumber keys should be introduced by the Chat 5 36-entry fixture.

## Hunter ordinary-work firewall

Hunter entries cover only:
`hunter.shift`.

Reject any text consumer/integration that introduces:
- Forest route;
- Old Boundary;
- token;
- clue;
- expedition;
- route result;
- Forest reward semantics.

Ordinary Hunter seasonal work remains independent from the Lumber Forest Activity.

## Assassin and Prostitute boundaries

Assassin:
- presentation prose only;
- no new mission/violence mechanics or reward.

Prostitute:
- non-explicit;
- voluntary ordinary career presentation;
- no new mechanics or forced content.

## Locale-switch test pattern

For each of 36 seasonal identities:
1. reach/select the current action and season;
2. capture action/scene/presentation/media identity and gameplay Save;
3. render RU scene text;
4. switch to EN without replaying the action;
5. assert same actionId/sceneId/presentationId/src;
6. assert serialized Save and RNG unchanged;
7. assert EN scene text is the paired translation.

## Action execution parity

For representative or exhaustive paired runs:
- execute same action from cloned pre-action state under RU and EN;
- compare gameplay state after exactly one action;
- compare actionCount/career counter;
- compare resource/stat deltas;
- compare result identity.

Differences in localized display text are allowed; gameplay differences are not.

## Fallback

If a seasonal scene localization key is missing:
- use current embedded scene text;
- do not alter the selected scene;
- do not change media;
- do not fail the action.

## Required production evidence

Before merge:
- all 36 keys complete RU+EN;
- exact current IDs only;
- no Lumber entries;
- no gameplay fields;
- renderer/consumer tests;
- exact-head full CI;
- post-merge main CI.

## Verdict

Acceptance contract:
`same current seasonal action/scene/media + same gameplay deltas in both locales; only scene text changes`.
