# Localized lastAction outcome QA v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Current `lastAction` Save shape:
- `id`;
- `title`;
- `text`;
- `media`;
- optional `presentationId`;
- `deltas`.

Current event-choice resolution can write embedded `sceneChoice.text` into `lastAction.text`.

Current action/School result rendering also uses `lastAction`, with School already having specialized localized result presentation.

## Goal

Localize event-choice outcomes shown through `lastAction` using stable event/choice identity, while leaving ordinary action results and School result behavior unchanged.

## Stable event-choice identity

For an event-choice-backed lastAction outcome, use:
- event ID;
- choice ID
as presentation identity.

Localization key:
`event.<eventId>.choice.<choiceId>.text`.

Locale must not be encoded in the identity.

## Do not repurpose action ID

Current `lastAction.id` is already used for action result behavior, including:
- profession detection;
- School special handling;
- result presentation mapping.

Do not overload or rewrite `lastAction.id` to an event ID if that would break existing action/school semantics.

If event-choice identity needs persistence, add an optional dedicated ref/metadata field under a versioned/backward-compatible design.

## Ordinary action results must remain unchanged

For a normal career/action result:
- current action ID remains authoritative;
- current title/text fallback remains valid;
- current presentationId/media selection remains valid;
- result deltas remain unchanged;
- replay/perform semantics remain unchanged.

A journal/outcome localization patch must not reinterpret ordinary `lastAction.text` as an event-choice localization key unless explicit stable event/choice metadata exists.

## School result behavior must remain unchanged

Current School lesson result:
- derives course from the existing School presentationId;
- localizes course label;
- formats `ui.school.lessonResult`;
- preserves current Save identity.

Future localized event-choice outcome logic must not bypass or shadow this School special case.

Regression required:
School RU↔EN result continues to show the same course result and preserves serialized gameplay Save.

## Event-choice outcome render

When explicit stable event/choice ref exists:
1. compute `event.<eventId>.choice.<choiceId>.text`;
2. resolve current locale;
3. fall back to embedded/stored `lastAction.text`;
4. render only.

Do not mutate `lastAction.text` when locale changes.

## Old-save compatibility

For existing saves with no event/choice ref:
- render existing `lastAction.text`;
- do not guess event/choice from title/text;
- do not rewrite Save on locale switch.

## Gameplay invariance

Locale switching on a result screen must not change:
- `lastAction.id`;
- deltas;
- media IDs;
- presentationId;
- event/choice ref;
- career counters;
- School progression;
- flags/metrics/resources;
- RNG;
- pending/resolver state.

Only rendered text may change.

## Exactly-once rule

Rendering localized outcome must not:
- re-dispatch event choice;
- reapply choice effects;
- update action counts;
- append Journal entries;
- change `lastAction` identity;
- consume RNG.

## Required executable tests

### Legacy event-choice result
- resolve exact event + choice;
- capture resulting gameplay Save;
- render RU localized outcome;
- switch EN;
- assert same serialized Save;
- assert same event/choice ref;
- assert EN outcome text.

### Ordinary action
- perform current career action;
- locale switch;
- same action ID/deltas/presentation identity;
- existing result behavior preserved.

### School lesson
- perform current School lesson;
- locale switch;
- current specialized course result remains correct;
- Save remains invariant.

### Old save
- load lastAction with text only and no ref;
- parser succeeds;
- text renders as fallback;
- no identity inference.

## Verdict

`ACCEPTANCE_CONTRACT_READY`.

Localized event-choice outcomes must be an additive stable-ref presentation layer.

Existing action and School result ownership must remain unchanged.
