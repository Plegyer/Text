# Localization Key Collision Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main eaae5e5c59f40eb032943c048e99a26af9a688ba

## Purpose

Define and apply deterministic localization-key collision checks before localization runtime lands.

Current main has no localization runtime yet, so this audit operates on current locale-neutral production identities and a proposed deterministic key mapping.

## Proposed deterministic key mapping

Actions:
- action.<actionId>.label
- action.<actionId>.description
- action.<actionId>.scene.<sceneId>.text

Careers:
- career.<careerId>.label
- career.<careerId>.description where applicable

Events:
- event.<eventId>.title
- event.<eventId>.variant.<variantId>.text
- event.<eventId>.choice.<choiceId>.label
- event.<eventId>.choice.<choiceId>.text

Media:
- media.<mediaId>.alt
- media.<mediaId>.caption where later supported

UI shell:
- ui.<surface>.<control>

Presentation-specific localized text:
- presentation.<semanticPresentationId>.<field>

Gameplay/content IDs remain locale-neutral.
Locale is a lookup dimension, not part of the gameplay key identity.

## Current production identity scan

Applied to current main:
- 16 root production packs
- 43 root production events
- 61 root production media IDs

A broader identity scan across:
- actions
- careers
- activities
- endings
- root pack IDs
- event IDs
- media IDs

contained 175 current IDs.

## Exact deterministic-key collision result

Generated current player-facing candidate keys from:
- action labels/descriptions/scenes;
- event titles/variants/choices;
- media alt text.

Candidate localization keys checked:
457.

Exact duplicate candidate keys:
0.

PASS.

## Normalization collision result

Also checked a deliberately aggressive normalization:
- lowercase;
- replace non-alphanumeric runs with ".";
- trim edge dots.

Current identity count checked:
175.

Distinct-ID collisions after normalization:
0.

PASS at current baseline.

This does not authorize destructive normalization in the runtime; it only shows current IDs do not collide under this stress check.

## Career coverage

Current target career/action IDs remain distinct:
- lumber.shift
- satyr-maid.shift
- undead-farm.shift
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

Do not strip punctuation/hyphens in a way that could later collapse IDs.

Recommended:
use exact canonical ID segments.

## School coverage

School localization keys must derive from:
- canonical course/track IDs;
- existing School event IDs;
- teacher media IDs.

Do not derive keys from teacher display names.

Reason:
names are authoring text and may change/localize; gameplay/course IDs are stable.

Staged exact-course School content may own localization keys without being counted as naturally production-routed.

## Poverty coverage

Ordinary poverty currently has distinct pack/event namespaces.

Localization keys should preserve full event IDs such as:
- poverty-street-production.*
- poverty-street-production-v2.*
- poverty-cheap-production.*
- poverty-cheap-production-v2.*
- poverty-recovery-production.*
- poverty-pressure-production.*

Do not shorten all of them to generic "poverty.event.*".

That would create avoidable collision risk.

## Forest coverage

Use exact authoritative identities:
- lumber.forest
- lumber.forest.success
- lumber.forest.escape
- lumber.forest.failure
- forest route/option IDs
- future forest-result-content-v1.* events.

Do not localize or transform result IDs into display text-derived keys.

Future localized Forest result pack should keep one event ID and two locale text payloads.

## UI shell coverage

Current UI shell still contains many hardcoded Russian strings.

Localization runtime should assign stable explicit keys rather than deriving keys from Russian source text.

Recommended examples:
- ui.nav.work
- ui.nav.school
- ui.nav.explore
- ui.nav.sleep
- ui.nav.stats
- ui.nav.journal
- ui.nav.bag
- ui.nav.legacy
- ui.work.title
- ui.school.title
- ui.night.lodging.title
- ui.menu.export_save
- ui.menu.import_save
- ui.common.choose
- ui.common.close

Forbidden:
key = transliterated/slugified visible Russian text.

Reason:
copy edits would become identity migrations.

## Choice-ID collision guard

Choice IDs such as "continue", "return", or "accept" may repeat across different events.

Therefore localization choice keys MUST include owner event ID:

Correct:
event.<eventId>.choice.continue.label

Wrong:
choice.continue.label

The owner-qualified mapping avoids cross-event collisions.

## Variant-ID collision guard

Variant IDs such as "default" repeat widely.

Therefore:
event.<eventId>.variant.default.text

is valid, while:
variant.default.text

is collision-prone and forbidden.

## Scene-ID collision guard

Action scene IDs such as:
- spring.default
- summer.default
- default

must remain owner-qualified by action ID.

Correct:
action.lumber.shift.scene.spring.default.text

Wrong:
scene.spring.default.text

## Presentation key collision guard

Semantic presentation IDs already contain owner context.

Localization must preserve the complete semantic ID.

Do not key localized alt/caption only by:
- filename;
- asset path;
- candidate index.

The same GIF may be reused by several semantic slots.

## Candidate-pool collision guard

For multi-GIF pools:
- candidate key is presentation-local;
- localization alt/caption key must include semantic presentation ID + candidate key.

Example shape:
presentation.<presentationId>.candidate.<candidateKey>.alt

This prevents candidate key "a" in two different pools from colliding.

## Import validation

Localization import should reject:
- duplicate exact key within one locale;
- same key declared twice with conflicting text;
- unknown locale;
- malformed owner-qualified key;
- localized gameplay ID aliases.

Import may warn, not necessarily reject, unused valid keys depending on tooling policy.

## CI collision gate

Required automated checks:
1. build deterministic key inventory from current catalog/UI registry;
2. exact duplicate count = 0;
3. ownerless repeated choice/variant keys forbidden;
4. stable locale-neutral IDs identical across ru/en;
5. translation files may not introduce new gameplay IDs;
6. report missing RU/EN separately from collision failures.

## Current conclusion

Exact candidate key collisions:
0 / 457.

Aggressive normalized ID collisions:
0 / 175.

Current content identities provide a clean basis for deterministic localization keys.

Runtime localization implementation:
not yet present, so key-registry validation still needs to be implemented and rerun as exact-head CI.

No production runtime/UI/content file was modified by Chat 4.
