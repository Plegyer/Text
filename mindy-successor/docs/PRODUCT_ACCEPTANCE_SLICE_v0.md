# Product Acceptance Slice v0

Дата: 2026-09-25.

Статус: **PRODUCT GATE SPEC**.

Это второй gate после `ARCHITECTURE_MIGRATION_SLICE_v1.md`.

Architecture Slice доказывает engine contracts.
Product Acceptance Slice доказывает, что из них получается игра требуемой глубины.

## 1. Scope

Использовать:
- Lumber как основную full career;
- Satyr Maid и Undead Farm как видимые стартовые альтернативы с ограниченной глубиной;
- School;
- normal housing/night;
- Foreman relationship;
- Forest Activity;
- initial items;
- one ending + one complex Lumber ending;
- one visible Meta effect in next run.

## 2. Required player flow

```text
Create character
-> choose Lumber
-> ordinary shift
-> seasonal/repeatable variant
-> career milestone
-> Foreman relationship opens
-> School lesson
-> School result triggers career/relationship continuation
-> obtain meaningful item
-> end day / choose lodging
-> optional night meeting
-> next day
-> enter Forest Activity for 2 Energy
-> save inside Activity
-> reload/resume
-> use item capability
-> return with result fact
-> Resolver triggers Lumber continuation without extra shift
-> at least two endings become eligible
-> continue playing
-> commit one ending
-> central completion
-> New Run
-> visible Meta difference
```

Reactive career/relationship scenes in this flow cost 0 daily Energy unless an explicit action definition says otherwise. The Forest Activity entry is the explicit 2-Energy exception. Night relationship meetings consume the Night slot, not daytime Energy.

## 3. UI requirements

Throughout:
- day/season/year visible;
- Energy/money visible;
- central media stage;
- compact actions;
- resource/stat deltas understandable;
- pending event blocks incompatible actions;
- inventory shows known capability;
- ending eligibility separate from commitment.

## 4. Economy requirements

Slice must demonstrate:
- normal room payment;
- at least one School cost;
- one saving decision;
- no softlock at low money.

Street/Secret Debt can remain outside first playable product slice if system hooks/tests already exist, but ordinary poverty path should be testable separately.

## 5. School requirement

School cannot be only `pay -> +stat`.

Need:
- track;
- teacher/presentation;
- progress;
- at least one milestone/public fact;
- that fact affects Lumber progression.

## 6. Relationship requirement

Foreman:
- starts through work;
- has optional night beat;
- asks/reveals external problem;
- external fact changes relationship;
- professional route works without romance.

## 7. Activity requirement

Forest Activity:
- 3 route contexts;
- separate internal resource;
- 3 challenge families;
- item capability;
- season difference;
- save/resume;
- success/escape difference.

## 8. Item requirement

At least:
- one work tool;
- one route item;
- one Activity extraction/tool capability.

Using item must change available action, not just number.

## 9. Ending requirement

At minimum:
- Lumber Hard Work;
- one complex branch such as Forewoman or Forest route.

Both can be simultaneously eligible under at least one test setup.

Eligibility does not award Meta.

## 10. Meta requirement

After commitment/completion:
- New Run visibly changes one rule/option/contact/item availability.

No reward duplication after reload.

## 11. Presentation requirement

At least:
- ordinary shift media;
- milestone media;
- relationship media;
- Activity media;
- ending media;
- fallback for missing optional media.

Placeholders acceptable.

## 12. Save checkpoints

Must save/reload deterministically:
- DayHub;
- pending career scene;
- after lodging payment before night choice;
- pending relationship scene;
- inside Activity;
- ending eligible but not committed;
- ending committed before completion;
- post-RunResult/new run.

## 13. Failure conditions

Slice fails if:
- School requires manual visit to job to trigger already-earned progression;
- Activity consumes daily Energy internally;
- ending auto-ends run on eligibility;
- relationship is only affinity points;
- item only adds %;
- UI becomes a dashboard of flags;
- reload rerolls pending event;
- new content requires hard-coded core branch.

## 14. Why this is separate from full release

Passing this slice proves:
- architecture;
- shell;
- depth;
- cross-system feedback.

It does not mean:
- all 10 jobs complete;
- Palace complete;
- macro mystery complete;
- content volume final.
