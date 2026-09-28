# Journal RU EN switch invariance QA v1

Status: COMPLETE / EXECUTABLE_ACCEPTANCE_CONTRACT

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Current Journal storage:
`run.historyState.journal: string[]`.

Future locale-aware journal rendering must preserve gameplay/history identity and old-save compatibility.

## Primary acceptance rule

Switching RU ↔ EN while the Journal is open may change only rendered localized text.

It must not change:
- serialized gameplay Save;
- entry count;
- entry order;
- stable event/choice ref identity;
- event history;
- effects/flags/resources;
- action counts;
- current pending scene;
- NightFlow/Activity state;
- RNG.

## Ref-backed entry

For a new identity-backed outcome:
- stable ref = same eventId + choiceId in both locales;
- RU render resolves the RU value;
- EN render resolves the EN value;
- same ref remains persisted;
- no translated prose is written back because of rendering.

## Old text-only entry

For an old save entry with only text:
- RU view shows stored text;
- EN view may still show the same stored text when no stable ref exists;
- Save remains unchanged;
- renderer must not guess a translation identity.

This is expected backward-compatible behavior, not a failure.

## Mixed history

Required mixed-history scenario:
- at least one legacy text-only entry;
- at least one new ref-backed entry.

RU -> EN:
- entry order unchanged;
- count unchanged;
- ref-backed entry localizes;
- legacy text-only entry remains its stored fallback;
- serialized Save unchanged.

## Byte-stability boundary

For a pure locale switch with no gameplay command:
`localStorage['portal-life.v1']`
must be byte-identical before and after whenever the application does not intentionally persist UI preference inside that same gameplay Save.

Current product stores locale separately from gameplay Save, so the expected current contract is exact byte equality.

## No rerun / no mutation

Journal rendering must not:
- call event resolver;
- reapply effects;
- re-log an outcome;
- mutate `lastAction`;
- create a second ref;
- increment counters;
- consume RNG.

## Current PR52 source

PR52 ships bilingual outcome keys for 26 current legacy choices.

Those keys are valid targets for a future ref-backed renderer.

PR52 itself does not alter Journal persistence.

## Regression scenarios

Required:
1. one PR52 legacy choice outcome;
2. one pre-feature text-only old save;
3. mixed old/new Journal;
4. locale switch twice RU -> EN -> RU;
5. save/reload after a ref-backed outcome;
6. same rendered entry order after reload;
7. no effect duplication.

## Journal shell independence

Localizing the Journal heading/empty state through Chat5 global UI-shell keys is separate.

Shell localization must not be treated as evidence that historical outcome strings are dynamically localized.

## Verdict

`EXECUTABLE_ACCEPTANCE_CONTRACT`.

Pass only when locale switching is presentation-only and historical gameplay/ref identity is byte-stable.
