# PR54 current-head compatibility re-audit v2

Status: COMPLETE / GREEN_COMPATIBILITY

PR #54:
`Lead: localize journal choice outcomes via stable refs`.

Accepted exact head:
`81664ef3cf70e58daaa7b323dd42267971860088`.

Current merged main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

## Compatibility fixes re-audited

### 1. School direct journal producer keeps refs aligned

`executeSchoolLesson` now writes:
- the existing School journal fallback text;
- one matching `null` entry into `historyState.journalRefs`;
- both arrays are sliced to the same 160-entry window.

This removes the earlier School/save-reload mismatch.

Relevant existing School reload/UI tests pass on exact head and post-merge main.

### 2. Legacy `run.journal=` assignment keeps refs aligned

The legacy facade setter now:
- replaces `historyState.journal`;
- rebuilds `historyState.journalRefs` to the same length;
- preserves an existing ref at the same index when available;
- fills unmatched positions with `null`.

Thus legacy text-only assignment no longer produces parser-rejected journal/ref length drift.

This directly fixes the run-#93 compatibility failures.

### 3. School course-result presentation retains priority

The final renderer order is:
- if `lastAction.id === 'school'` and the course is recognized, use the existing School course-title/result localization;
- otherwise, if `outcomeRef` exists, localize by event+choice ref;
- otherwise use stored fallback title/text.

This prevents a future event-choice ref from shadowing the current School course-result presentation path.

The existing School RU↔EN renderer regression passes.

### 4. Old schema-4 save omission remains supported

`parseSave` behavior:
- if schema-4 `historyState.journalRefs` is absent, create a same-length array of `null`;
- old `lastAction` without `outcomeRef` remains valid;
- stored legacy journal text is preserved.

Focused test:
`schema4 save without journal refs loads with null refs and keeps old text fallback`
PASS.

### 5. No fuzzy prose migration

No code attempts to infer:
- eventId;
- choiceId;
- variantId
from stored text.

New stable refs are created only when a current event choice is actually resolved.

Old text-only history receives null refs.

## Stable-ref write path

On current event-choice resolution:
- existing choice effects still execute once;
- existing source text remains the persisted fallback;
- one locale-neutral ref is stored:
  `{ kind:'eventChoice', eventId, choiceId }`;
- the same ref is attached to `lastAction.outcomeRef` when a lastAction exists.

No locale string is stored as identity.

## Validation

Parser rejects an explicitly malformed state where:
`journalRefs.length !== journal.length`.

This is now safe because all known direct producers/setters keep both arrays aligned.

## Gameplay invariance

Compatibility changes do not alter:
- event conditions;
- effects;
- flags;
- metrics/resources;
- action counts;
- RNG;
- NightFlow;
- Activity state;
- endings.

Validator counts remain:
17 packs / 46 events / 35 actions / 9 endings.

## Verdict

`GREEN_COMPATIBILITY`.

The latest PR54 exact head fixes the prior journal/ref alignment failures while preserving School result priority, old schema-4 omission compatibility and locale-neutral stable-ref semantics.
