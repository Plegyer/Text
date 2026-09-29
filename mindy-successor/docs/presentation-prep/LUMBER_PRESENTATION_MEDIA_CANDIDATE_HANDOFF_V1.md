# Lumber Presentation / Media Candidate Handoff v1

Status: C2-12 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
PR: #79
Branch: `chat2/lumber-presentation-media-c2-02-12`
Current-main integration base: `715bbb7eb605427eba4c6a9618cfa9d3717c39e8`

The exact frozen candidate head and exact-head CI run are recorded in PR #79 after this handoff commit passes required CI. This document deliberately does not self-reference its own commit SHA.

## Scope delivered

This candidate is presentation/media-only and covers C2-02 through C2-12 for the current Lumber vertical slice.

It adds or verifies:
- Spring/Summer/Autumn/Winter Lumber shift static presentation;
- current first-shift career milestone presentation;
- existing Foreman professional opening and night follow-up presentation sources;
- existing School-management -> Lumber leadership/Forewoman presentation seam;
- current Forest route, return, result-reaction and Lumber continuation presentation;
- Hard Work, Forewoman and Forest ending presentation;
- static fallback completeness for the selected set;
- RU/EN alt + caption metadata;
- replacement/editor compatibility through the existing presentation-v1 slot override mechanism;
- focused manifest/source/fallback validators.

No gameplay state, progression, conditions, effects, rewards, economy, ending eligibility/commitment logic, Save schema/identity, RNG, School authoring, Forest gameplay logic, or gameplay IDs are changed.

## Production files

- `prior-work/astra/prototype-m3.2/content/presentation.json`
- `prior-work/astra/prototype-m3.2/content/localization.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/lumber-presentation-source-manifest-v1.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-presentation-replacement-compatibility.test.ts`
- `prior-work/astra/prototype-m3.2/tests/lumber-presentation-source-manifest-v1.test.ts`

No new image/video bytes are introduced. Existing project-owned SVGs are reused.

## Selected presentation set

The manifest owns 22 current semantic presentation slots. Every selected slot:
- maps to a project-owned local static SVG;
- has an exact production `presentation.json` static binding;
- has RU/EN alt and caption metadata;
- resolves to a non-text-only static result with animations enabled or disabled;
- remains replaceable by presentation ID through the existing editor/override mechanism.

The selected manifest intentionally activates no GIF, MP4 or WebM source.

## Current gameplay identities consumed

Existing identities only, including:
- `lumber.shift`;
- `lumber.career-first-shift`;
- `lumber.foreman-notice`;
- `lumber.foreman`;
- `lumber.foreman.night`;
- `lumber-night.foreman-professional`;
- `lumber-cross.school-management-return`;
- `lumber.forest`;
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`;
- current Forest result-content events;
- `lumber-cross.activity-forest-return`;
- `ending.lumber.hard-work`;
- `ending.lumber.forewoman`;
- `ending.lumber.forest`.

## Explicit unresolved consumers

Not invented or activated by Chat 2:
- later Lumber intermediate career milestone event/presentation emitters beyond the current first-shift event;
- Hunter Trail presentation until its production route/gameplay identity exists;
- future Forest encounter/tool-specific presentation slots until their production content/gameplay emitters exist.

These are dependencies for later queues, not blockers for the selected current candidate.

## Validation contract

Focused validators require:
- unique known semantic IDs;
- exact manifest -> presentation static binding;
- source asset existence;
- built `dist/` copy existence and byte equality;
- RU/EN alt + caption parity;
- safe static resolution with animations on and off;
- no stale `assets/lumber/` target-fixture dynamic paths;
- no selected current GIF/MP4/WebM path;
- replacement through semantic presentation ID without gameplay-definition mutation.

## Integration notes

Main movement since the original working base was coordination/QA task documentation only. This handoff is integrated onto current main `715bbb7eb605427eba4c6a9618cfa9d3717c39e8` before QA freeze.

PR #72 remains historical C2-01 inventory context. Merged PR #64 / historical queue 352–363 is not duplicated.

Once PR #79 publishes a green exact-head CI result and the exact head is declared frozen, follow `CANDIDATE_QA_FREEZE_PROTOCOL.md`: do not move the head except for a concrete QA/CI blocker or explicit Lead request.
