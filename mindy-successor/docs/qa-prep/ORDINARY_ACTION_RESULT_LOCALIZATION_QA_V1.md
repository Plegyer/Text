# Ordinary action result localization QA v1

Status: COMPLETE / GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Reviewed Chat 5 items:
`140–143`.

Key map:
`content/ordinary-action-result-key-map-v2.fixture.json`.

Blob:
`646c565e1f8139ffb0ba37c7d84d6112d12de6b4`.

Localization source:
`content/ordinary-action-result-localization-v2.fixture.json`.

Blob:
`628a450dfe9b5e2ee32b7dfbec0ea172f7941e98`.

## Exact current identity map

Mapped ordinary actions:
`16`.

Every mapped actionId exists in exact current definitions.

Every mapped current scene ID is:
`default`.

No scene mismatch found.

Mapped actions:
- work;
- forage;
- brew;
- sell;
- scales;
- exam;
- deliver;
- visit;
- oddjob;
- repay;
- rent-room;
- rest;
- arrival;
- forest-search;
- tavern-talk;
- landlord.

This source intentionally does not claim all 35 current actions.

It is the reviewed ordinary/legacy result slice only.

## Stable localization keys

Per mapped action:
- title: `action.<actionId>.label`;
- body: `action.<actionId>.scene.default.text`.

Total localization strings:
`32`.

Expected from 16 × 2:
`32`.

Missing expected key:
`0`.

Extra key:
`0`.

## RU+EN completeness

Missing RU:
`0`.

Missing EN:
`0`.

Post-PR59 current-root collisions:
`0`.

Therefore all 32 remain additive.

Chat5 production-v3 source confirms the same 16 action/default-scene mapping and 32-key additive result after PR59.

## Current result consumer

Current generic result screen handles:
1. School special case;
2. event `outcomeRef`;
3. otherwise raw:
   - `lastAction.title`;
   - `lastAction.text`.

Thus these 32 strings are not yet consumed for ordinary action results.

## Current runtime identity limitation

Current ordinary `lastAction` persists:
- action ID;
- raw title;
- raw text;
- media;
- presentationId;
- deltas.

It does not persist an explicit ordinary-action sceneId.

For this exact audited 16-action set, the current scene is unambiguously `default`.

Therefore current result rendering can safely derive:
`actionId + default`
for this set.

If any action later gains multiple current scenes, exact selected-scene identity must be retained/derived explicitly before localization lookup.

Do not guess from prose.

## forest-search boundary

`forest-search` here is the ordinary legacy/tutorial action result:
- action ID `forest-search`;
- scene ID `default`.

It is not Forest Activity route/result ownership.

PR59 route-specific media does not change this action-result text identity.

## Journal limitation

Current ordinary action completion Journal rows have:
`journalRef = null`.

The result screen can be localized from current action identity, but existing/current Journal rows cannot safely be retroactively localized without a stable ordinary-action Journal ref.

Do not fuzzy-match stored text.

This QA approves result source, not Journal migration.

## Presentation-only payload

The localization fixture contains no:
- cost;
- wage;
- condition;
- effect;
- reward;
- RNG;
- Save
field.

It contains only localization text, entries and invariants.

## Required future consumer test

From identical pre-action Saves:
- perform exact same action under RU and EN;
- same selected current scene;
- same deltas;
- same resources;
- same flags/metrics;
- same RNG evolution;
- same presentationId;
- result title/body localized by stable action/default-scene identity.

Locale switch after result:
- same serialized gameplay Save;
- only visible title/body changes.

## Verdict

`GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`.

The 16 exact current ordinary action/default-scene identities have complete RU+EN title/body source with no gameplay or Save fields.
