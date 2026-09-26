# Presentation Asset Replacement Operator Guide v1

Status: safe operator workflow for replacing presentation media by semantic `presentationId`.

This guide does **not** use source-path editing as the operator workflow and does not modify gameplay content.

## 1. Locate the semantic slot

Start from the canonical semantic `presentationId`, for example:

- `job/lumber/shift/spring/default`;
- `school/arcana/lesson/default`;
- `activity/forest/route/default`;
- `ending/lumber/hard-work`.

Do not locate the replacement target by guessing from:

- a filename;
- a dotted media ID;
- an event/course/ending gameplay ID;
- a source file path.

The semantic slot is the replacement identity.

## 2. Inspect current fallback

Before importing anything, record:

- current shipped static fallback;
- current text fallback;
- whether the slot has an optional future GIF target;
- animation-off behavior.

A replacement is safe only if static/text fallback remains valid.

## 3. Choose/import the file

Use an operator/import surface that associates the selected file with the semantic slot.

Accepted replacement media must use the declared media kind.

For a future GIF replacement:

- expected kind: GIF;
- keep a non-animated static fallback;
- keep non-empty alt text;
- keep text fallback.

Do not edit repository source paths as an operator action.

## 4. Preflight

Before persistence, validate:

1. semantic `presentationId` exists in the shipped slot registry;
2. duplicate replacement IDs reject;
3. stale/removed IDs reject or quarantine;
4. media kind matches the selected file;
5. no absolute filesystem path is persisted;
6. no parent traversal or external URL is accepted;
7. static fallback still resolves;
8. text fallback is non-empty;
9. presentation payload contains no gameplay state.

If preflight fails, leave the current active replacement set unchanged.

## 5. Preview

Preview the target semantic slot with:

- animations enabled;
- animations disabled;
- primary asset intentionally unavailable.

Confirm:

- semantic slot label is correct;
- alt text is understandable;
- static fallback appears when needed;
- text fallback remains sufficient;
- no gameplay controls/outcomes change.

Preview must not commit gameplay or presentation state.

## 6. Persist the override

Persist only normalized presentation override metadata:

- semantic `presentationId`;
- media kind;
- managed/logical media reference;
- alt text;
- optional presentation fallback metadata.

Do not persist:

- event/course/activity/ending progress;
- Energy/money/resources;
- conditions/effects;
- RNG;
- GIF frame index;
- playback time;
- loop count;
- transient preview state.

## 7. Verify animations-off

Disable animations and reopen the same semantic slot.

Expected:

- semantic `presentationId` is unchanged;
- GIF/video is not required;
- static fallback is selected when available;
- otherwise text fallback remains safe;
- gameplay identity and controls are unchanged.

## 8. Verify save/reload

At a real save/reload boundary, verify:

- event/variant/course/activity/ending identity is unchanged;
- semantic `presentationId` remains stable where persisted;
- media filename/path is not the identity;
- GIF frame/time/playback state is not saved;
- no cost/effect/reward is replayed because media changed.

## 9. Rollback

Rollback means removing or disabling the presentation override for the semantic slot.

After rollback:

- the shipped static/text fallback must become active;
- semantic `presentationId` remains unchanged;
- gameplay state is untouched;
- save compatibility remains intact.

Never rollback by renaming a gameplay ID or editing a production mechanic.

## 10. Acceptance checklist

A replacement operation is complete only when:

- preflight passes;
- preview passes;
- animations-off passes;
- missing-primary fallback passes;
- save/reload identity check passes;
- rollback has a known safe path.

Media replacement is presentation-only polish. It must never become a prerequisite for gameplay correctness.
