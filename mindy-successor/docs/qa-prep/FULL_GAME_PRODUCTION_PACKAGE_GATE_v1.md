# Full-Game Production Package Gate v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: reusable QA gate for every future career/system production package.

## Gate rule

A future package is not production-ready because a design draft exists or because generic runtime support exists.

It must pass this package gate against the exact integration SHA.

Applicable to:

- ordinary careers;
- Palace;
- poverty / Secret Debt;
- School content;
- relationship packages;
- Night packages;
- item/capability packages;
- Activity regions/challenges;
- endings/Meta additions;
- presentation content packages.

---

# Gate 1 — authoritative source identified

The package must name its authoritative source documents.

Required:

- product/design authority path(s);
- locked decisions that apply;
- explicitly open decisions;
- historical sources used only as reference.

Fail if implementation silently derives canon from:

- old prototype data;
- fixture IDs;
- stale handoff text;
- model-created temporary values.

---

# Gate 2 — no locked-rule drift

Before review, list relevant locked invariants.

Examples:

- Lumber Hard Work only 50 completed shifts;
- Palace unlock 10/10 ordinary Hard Work;
- Secret Debt hidden careers do not count for Palace;
- paid School lesson = 1 current-day Energy;
- Night study is separate;
- GIF mechanics separation.

For every changed file, verify no unrelated locked rule changes.

Any intentional locked-rule change requires explicit Product authority before code integration.

---

# Gate 3 — one-file ownership respected

Production package work must obey active ownership.

Required:

- branch/owner identified;
- changed paths match task ownership;
- shared runtime/schema/UI touched only if assigned;
- no parallel worker edits the same file.

Fail if a worker modifies an actively owned shared file without reassignment.

---

# Gate 4 — package boundary explicit

The package must state exactly what it adds.

Examples:

For a career:

- action(s);
- career state machine;
- event pack(s);
- relationship(s);
- endings;
- item/public hooks;
- presentation slots.

For a system:

- state owner;
- commands;
- conditions/effects;
- content definitions;
- UI surface;
- persistence.

Avoid “misc content cleanup” packages that mix unrelated domains.

---

# Gate 5 — target architecture used

New production content must use target typed systems where available.

Do not add new authoritative progression through:

- raw legacy flags;
- actionCounts where typed career counter exists;
- ad hoc global booleans for typed state;
- duplicate money/Energy/calendar owners.

Legacy compatibility may remain for old saves, but new production authoring must target current architecture.

---

# Gate 6 — save/reload behavior explicit

Every package must document persisted boundaries.

At minimum identify:

- pre-command stable state;
- post-transaction stable state;
- pending scene state;
- active subflow if applicable;
- ending/terminal state if applicable.

For each relevant boundary define:

- what is persisted;
- what reload must preserve;
- what must not replay;
- stale/malformed behavior.

Fail if a package adds a transaction with no reload contract.

---

# Gate 7 — exactly-once transactions

Money, Energy, items, counters, rewards and calendar changes must have one commit boundary.

Test:

```text
command
-> save
-> reload
-> resolve pending continuation
```

must not repeat the original transaction.

Critical examples:

- Work cost/wage;
- School tuition;
- lodging payment;
- item grant/removal;
- Activity entry;
- ending Meta reward.

---

# Gate 8 — cross-system public boundaries explicit

If the package affects another system, identify the public boundary.

Preferred forms include:

- typed fact;
- career/relationship stage/counter/fact;
- item capability;
- ActivityResult;
- ending/meta state;
- explicit event trigger.

Do not make another subsystem read private internal state directly unless the architecture contract explicitly permits it.

For every cross-system boundary document:

- provider;
- consumer;
- identity;
- commit timing;
- reload behavior.

---

# Gate 9 — no fixture-only authoring promoted

Search package changes for IDs/content that previously existed only in QA fixtures.

Fail if a fixture placeholder becomes production merely because tests already know the ID.

Examples of prohibited shortcuts:

- synthetic School management action;
- QA-selected thresholds;
- test-only capability adapter;
- direct pre-earned ending facts.

If fixture-derived content is intentionally promoted, it needs an explicit Product/content decision and production review.

---

# Gate 10 — human decisions remain human

List every unresolved Product choice touched by the package.

Examples:

- thresholds;
- acquisition source;
- consumption policy;
- NPC identity;
- route identity;
- exact reward;
- narrative outcome.

Implementation must not choose among open alternatives unless authority has accepted the choice.

A package may prepare generic hooks without closing the decision.

---

# Gate 11 — repeatable action is genuinely repeatable

For career/action packages:

- ordinary action remains usable according to its intended cadence;
- first-use milestone does not make the base action disappear unintentionally;
- one-time events use maxShows/history rather than making repeatable work one-shot;
- seasonal variants do not duplicate transaction effects.

If repeatability is not part of the package, mark N/A explicitly.

---

# Gate 12 — seasonal behavior checked where applicable

If the career/system claims season-dependent content:

- use authoritative calendar season;
- verify all authored seasons;
- prevent fall-through to wrong variant;
- ensure season affects intended gameplay/content dimension.

Presentation-only season art does not count as mechanical/content seasonal depth where the design requires more.

---

# Gate 13 — relationships are typed and optional where designed

For relationship-bearing packages:

- typed relationship machine;
- stages/counters/facts owned by relationship domain;
- professional/friendship/romance paths not conflated;
- romance not accidentally required for a professional career outcome unless explicitly authored.

Night relationship events must respect NightFlow priority/cost rules.

---

# Gate 14 — School hooks use School-owned outputs

Career packages that depend on education must consume an accepted public School result.

Do not:

- read raw course internals from career content;
- create a synthetic “School action” inside the career;
- invent an unapproved threshold in QA.

If the provider is still open, package remains authoring-blocked at that boundary.

---

# Gate 15 — item/capability semantics

If an item changes action-space:

- item definition exists;
- capability is declared;
- acquisition path is explicit if the package claims natural reachability;
- route/action condition uses authoritative capability;
- removal/consumption is explicit;
- save/reload preserves ownership exactly once.

Seeded inventory may prove runtime mechanics but cannot prove acquisition.

---

# Gate 16 — Activity boundary

For Activity-integrated content:

- entry cost committed once;
- active envelope versioned;
- internal state owned by Activity;
- route/challenge identities persisted;
- success/escape/failure distinct where required;
- Activity result crosses to external systems via public trigger;
- save/resume tested.

Do not use global daily Energy as an internal repeated Activity stamina unless explicitly designed.

---

# Gate 17 — Night boundary

For Night-integrated packages:

- explicit intercept priority;
- lodging transaction not replayed;
- voluntary choice consumes only Night slot as designed;
- forced events block lower-priority choices;
- next-day modifiers applied once;
- day advances exactly once.

Night presentation must not drive timing/mechanics.

---

# Gate 18 — ending eligibility separate from commitment

New ending packages must preserve:

```text
eligible
!= committed
!= completed
```

Required:

- eligibility can coexist with continued play unless design says otherwise;
- commit does not grant Meta;
- completion creates one RunResult transaction;
- reload/retry cannot duplicate reward;
- New Run preserves Meta.

---

# Gate 19 — Meta / Palace interactions explicit

If a package grants Hard Work or Meta progress:

- exact reward ID documented;
- uniqueness/idempotency tested;
- Palace contribution classification documented.

Ordinary Hard Work may count toward Palace if it is one of the 10 ordinary careers.

Hidden Secret Debt endings must not count.

Do not infer Palace contribution from reward naming.

---

# Gate 20 — semantic presentation IDs valid

Every significant new production scene needs a semantic presentation strategy.

Required:

- stable presentationId;
- no gameplay branch on filename;
- fallback defined;
- missing media non-fatal;
- animation-off mechanics identical;
- pending reload preserves semantic identity;
- no frame/time in Save.

Use:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`.

---

# Gate 21 — media/package asset validation

For newly referenced assets:

- local/allowed format;
- file exists in shipped build where required;
- fallback reference exists;
- no fallback cycle;
- no unknown presentation slot.

Final GIF polish may be optional if valid static/text fallback exists and release ownership accepts it.

---

# Gate 22 — UI reachability

Production content must be reachable through normal player UI/commands.

A definition existing in the catalog is insufficient.

Prove:

- how player discovers it;
- unavailable state behavior;
- enabled state behavior;
- pending/active flow controls.

Do not count direct engine dispatch only as full product reachability unless package scope is explicitly runtime-only.

---

# Gate 23 — negative path

Every package must include at least one meaningful rejection/negative test.

Examples:

- insufficient money;
- missing item capability;
- wrong relationship stage;
- blocked Night phase;
- invalid stale save;
- unavailable route;
- duplicate ending completion.

Failed command must be atomic.

---

# Gate 24 — targeted test suite

Package PR must add/identify targeted tests for its new behavior.

A career package should normally cover:

- base shift;
- season;
- milestone;
- relationship or explicit N/A;
- cross-system hook;
- ending boundary;
- save/reload;
- presentation.

A system package should cover all new public commands/state transitions.

---

# Gate 25 — full check on exact integration SHA

Before merge require:

- typecheck;
- content validation;
- build;
- full tests.

Record:

- exact SHA;
- exact test total;
- pass/fail;
- any expected skipped tests.

Do not cite a green older head after later commits.

---

# Gate 26 — regression floor preserved

Current baseline after PR27:

**221/221**

A new package must not delete/skip/weaken current floor tests without an explicitly documented stronger replacement.

Key retained contracts are listed in:

`FINAL_TECHNICAL_REGRESSION_FLOOR_v1.md`.

---

# Gate 27 — full-scope preservation

A package should not accidentally narrow global handoff/roadmap documents.

After integration, verify full scope still includes:

- 10 ordinary careers;
- Palace;
- poverty;
- Secret Debt;
- School;
- relationships;
- Night;
- items;
- Activity;
- endings/Meta;
- GIF-first presentation.

Use:

`FULL_PRODUCT_SCOPE_PRESERVATION_AUDIT_v1.md`.

---

# Reusable package disposition

Classify each package as one of:

- **BLOCKED_BY_HUMAN_DECISION**
- **AUTHORING_READY**
- **INTEGRATION_READY**
- **TECHNICALLY_GREEN**
- **SUPERSEDED / DO_NOT_MERGE**

Do not use a single percentage score.

---

# Required PR handoff template

Every future package handoff should state:

```text
Package:
Authority:
Exact head SHA:
Changed files:
Production boundaries added:
Open Product decisions:
Save/reload checkpoints:
Cross-system public boundaries:
Presentation IDs/fallback:
Targeted tests:
Full-check result:
Known non-blocking polish:
Known blockers:
```

No production runtime/UI/content file was modified by Chat 4.
