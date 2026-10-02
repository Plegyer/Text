# Chat 6 — Palace Authored Safe Content v5

Status: **READY FOR CHAT2 OR LEADER**
Owner: Chat 6 / Palace Producer
Branch: `chat6/palace-authored-safe-v5`
Exact branch base: `426ec9146716e1246d6b7bfdd4a570ef2fcb0a54`
Task pointer observed on main: `223135d62b41c0add3cd621f756d8fad63072b39`

Preserved prior prep:
- `chat6/palace-safe-prep-v4@302c5cd636b2389edd05de2b4e50d5df8f88133d`

## Scope

This branch expands only Palace-local authored content that is safe before the shared D23/New Start+ seam exists.

No live Palace pack is bound.
No shared runtime file is modified.
No Prince confrontation mechanics are chosen.
No final 3-vs-6 Palace career topology is chosen.

## Added authored fixture

`content/palace-authored-safe-v5.fixture.json`

Status: `SAFE_PREP_UNBOUND`.

### Day-1 invitation / entry

Three-scene RU/EN flow:

1. `palace.invitation.day1-arrival`
   - automatic first-day letter reveal;
   - deterministic authored presentation;
   - no stat/random/item check.

2. `palace.invitation.reveal`
   - explains that the invitation is already valid for this life;
   - acceptance opens Palace access;
   - no second gate.

3. `palace.entry.gates`
   - Palace entrance acknowledges the invitation;
   - explicitly avoids strength/manners/origin checks.

The fixture preserves the v4 D23 contract:
- permanent ordinary Hard Work 10/10;
- active current-life Hard Work career packages 10/10;
- Day 1;
- `creationCompleted`;
- latched;
- deterministic;
- no legacy item substitution.

### First-day orientation

Two RU/EN scenes:

- `palace.orientation.first-day`
- `palace.orientation.handoff`

Copy stays role-neutral and work-focused:
- routes;
- schedules;
- documents;
- handoffs;
- staff procedure.

It assigns no heroine title and assumes no final Palace stage topology.

### Professional patron route

Three authored scenes:

- `palace.relationship.patron.intro`
- `palace.relationship.patron.trust`
- `palace.relationship.patron.conflict`

Conflict supports:
- clarification;
- refusal while keeping professional cooperation;
- ending patronage while preserving ordinary Palace work.

Patronage is not required for access or career completion.

### Rival route

Three authored scenes:

- `palace.relationship.rival.intro`
- `palace.relationship.rival.cooperation`
- `palace.relationship.rival.conflict`

Supports:
- transparent cooperation;
- bounded professional competition;
- safe disengagement without losing Palace work.

### Servant / official contact route

Three authored scenes:

- `palace.relationship.contact.intro`
- `palace.relationship.contact.practical-help`
- `palace.relationship.contact.boundary`

Supports:
- practical routing/help;
- help only within role authority;
- refusal-safe continuation;
- closing personal favors without closing Palace work.

### Optional romance

Two authored scenes:

- `palace.relationship.romance.invitation`
- `palace.relationship.romance.mode`

Choices include:
- professional-only continuation;
- decline;
- friendship;
- optional romance;
- closing the personal route.

Explicit contract:
- not required for Palace access;
- not required for career completion;
- not required for any ending.

### Voluntary Palace Night

Two authored choices:

- `palace.night.work-review`
- `palace.night.social-conversation`

Both:
- are voluntary;
- consume the normal voluntary Night choice;
- do not own forced-night behavior;
- require Palace access;
- add no free extra Night slot.

This remains compatible with a separate forced-Night owner such as Secret Debt.

### Optional shipped legacy-item reactions

Ten optional capability reactions are authored:

- `artist_formal_presence`
- `artist_handle_invitation`
- `official_guard_access`
- `guard_sealed_pass`
- `merchant_verify_manifest`
- `merchant_handle_samples`
- `access_guest_rooms_staff`
- `cross_rough_route`
- `preserve_specimen`
- `prostitute_handle_evidence`

Every capability was statically revalidated against shipped `definitions.json` on the assigned base.

Every reaction has:
- `entryGate: false`;
- `grantsAccess: false`.

Legacy-item ownership can change an optional Palace response, never Palace eligibility or entry.

## True Ending readiness copy

Locked authored stat semantics:

- exactly 12 progression stats;
- each must be at least 91;
- Lust excluded;
- threshold is not normalized against an active 200 cap.

The fixture includes separate RU/EN:
- not-ready text;
- ready text;
- cap-200-life clarification.

No Prince confrontation mechanics are authored here.

## Cap-200 reward copy

The English production-safe wording is:

> The maximum of each of the 12 progression stats becomes 200 instead of 100.

The Russian production-safe wording is:

> Максимум каждой из 12 характеристик развития становится 200 вместо 100.

The copy explicitly states:
- current values are not multiplied;
- starting bonuses are not multiplied;
- the 10 allocation points are not multiplied;
- Lust is unaffected.

No player-facing copy describes the stats as doubling.

## Focused tests

`tests/palace-authored-safe-v5.test.ts` covers:

- `SAFE_PREP_UNBOUND` state;
- unresolved shared/Prince/topology bindings remain null;
- Day-1 deterministic invitation identity;
- RU/EN choice-ID parity;
- unique Palace scene identities;
- first-day orientation boundaries;
- four generic relationship identities;
- patron refusal safety;
- rival cooperation/disengagement;
- contact practical-help/refusal safety;
- optional romance non-requirement;
- voluntary Night / no forced-night ownership;
- all legacy capabilities exist in shipped definitions;
- all legacy reactions are non-entry;
- fixed 12 x 91 readiness semantics;
- Lust exclusion;
- cap-200 fixed wording and non-multiplication;
- no authored Prince mechanics;
- no 3-stage / 6-stage topology assumptions.

## Independent static audit

Before freeze:

- authored scene count: 16;
- entry scenes: 3;
- orientation scenes: 2;
- relationship scenes: 11;
- voluntary Night choices: 2;
- legacy-item reactions: 10;
- duplicate scene IDs: 0;
- RU/EN choice-parity errors: 0;
- missing shipped capability references: 0;
- item entry gate: false;
- random entry gate: false;
- romance required for an ending: false;
- True Ending stat minimum: 91;
- cap reward: 100 -> 200;
- player-facing “stats double” wording: absent.

## Integration boundary

Shared owner still needs to provide the actual D23 run-local condition/seam before these authored scenes become live content.

Chat 6 content should consume that shared condition; it should not implement:
- New Start+ package selection;
- Meta package persistence;
- Save migration;
- dynamic 100/200 cap infrastructure.

## CI / PR

No full CI.
No early PR.

Freeze this branch and report:

`READY_FOR_CHAT2_OR_LEADER`
