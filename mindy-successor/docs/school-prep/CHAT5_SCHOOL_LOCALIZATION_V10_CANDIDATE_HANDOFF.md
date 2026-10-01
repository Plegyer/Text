# Chat 5 School Localization Queue v10 Candidate Handoff

Owner: Chat 5 / School + Text Localization Content Worker
Baseline: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`
Queue: C5-97 through C5-107

## C5-97 School content reachability audit

Audited School content categories:
- player-facing: existing course, teacher, lesson, and Night-study text consumed by current School surfaces;
- consumer-ready: existing exact School identities already referenced by current content consumers;
- preparation-only: handoff atlases, transfer wording preparations, and audit fixtures without runtime consumer;
- obsolete: no audited School identity marked obsolete.

No new School identity was introduced.

## C5-98 School localization parity v10

Validated existing School identities retain RU/EN parity where localized pairs exist. No root localization ownership was changed. Missing runtime localization seams remain documented rather than patched through invented keys.

## C5-99 Teacher and milestone text audit

Reviewed existing teacher and milestone-facing text boundaries. Existing identities remain unchanged. No curriculum, teacher canon, milestone thresholds, or progression mechanics were added.

## C5-100 Night-study text preparation v10

Prepared audit notes for existing Night-study choice identities only. No new choices, effects, energy rules, NightFlow behavior, or progress writes were created.

## C5-101 School-to-career handoff audit

Verified School-side handoff wording uses existing mappings only. No career state, unlock, threshold, producer fact, or runtime transition was created.

## C5-102 Terminology consistency audit

Reviewed School naming boundaries between canonical course identity, presentation wording, and handoff text. No automatic rename was performed where a product decision would be required.

## C5-103 Fixture collision regression

Prepared ownership notes for School-owned fixture identities. New content must not duplicate course, teacher, milestone, night-study, or localization ownership already present in current main.

## C5-104 Ownership boundary regression

Verified queue scope remains content-side only:
- no runtime changes;
- no Save fields;
- no RNG changes;
- no NightFlow mechanics;
- no progression layer;
- no career state machine changes.

## C5-105 Accessibility text parity

Audited existing School text metadata parity expectations. Accessibility text remains paired with existing media/content identities only.

## C5-106 Handoff refresh

Refreshed School content-side handoff documentation from current main baseline. Existing consumer seams remain unchanged.

## C5-107 Regression fixture coverage

Added candidate coverage notes for focused School content-side validation:
- identity uniqueness;
- RU/EN parity;
- consumer ownership boundaries;
- no runtime mechanic writes.

## Explicit blockers

The following remain design decisions outside Chat 5 scope:
- new School facts for Lumber or other careers;
- new runtime consumers;
- Save-visible School state;
- new progression mechanics;
- new curriculum or teacher identities.

## Candidate rule

Freeze only an exact green CI head. Do not move the candidate for unrelated main drift. Any later push requires a concrete blocker or explicit Lead request and full revalidation.
