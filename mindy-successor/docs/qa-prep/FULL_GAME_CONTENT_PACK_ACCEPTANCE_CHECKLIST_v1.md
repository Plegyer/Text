# Full-Game Content Pack Acceptance Checklist v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: reusable acceptance checklist for future data-driven production content packs.

## Scope

Use for:

- career packs;
- School packs;
- poverty / Secret Debt packs;
- relationship packs;
- Night packs;
- Activity packs;
- item/capability packs;
- ending packs;
- presentation-linked content packs.

This checklist is for data/content integration, not a substitute for runtime architecture review.

---

# 1. Namespace and ID uniqueness

Every pack must have:

- unique pack ID;
- unique event IDs;
- unique action IDs;
- unique item IDs;
- unique relationship/career/quest IDs where defined;
- unique ending IDs;
- unique presentation IDs where the registry requires uniqueness.

Reject:

- accidental collision with production IDs;
- fixture ID reused as production without explicit promotion;
- two semantic gameplay identities merged because they share one media file.

---

# 2. Canonical namespace

IDs should follow the accepted domain namespace.

Examples:

```text
job/<career>/...
school/<track>/...
relationship/<id>/...
activity/<activity>/...
ending/<career>/<ending>
```

Exact content IDs must come from accepted authoring.

Do not “normalize” a Product-authored identity into a different meaning purely for test convenience.

---

# 3. Pack inclusion is explicit

Production build must include the pack intentionally.

Reject accidental shipping through:

- recursive fixture directory inclusion;
- broad glob that pulls QA packs;
- copied test fixtures.

Verify:

- production pack appears exactly once;
- QA-only pack does not appear;
- removal/rename does not leave stale duplicate content.

---

# 4. Declared read capabilities

Every typed condition must be supported by declared pack reads.

Check:

- stats;
- resources;
- inventory;
- item capabilities;
- calendar;
- careers;
- quests;
- relationships;
- world facts;
- Meta where permitted.

Reject undeclared private-domain reads.

---

# 5. Declared write capabilities

Every effect must be supported by declared writes.

Check:

- stats/resources;
- Energy;
- inventory;
- career progression;
- quest progression;
- relationship progression;
- world facts;
- housing;
- next-day effects.

Reject writes outside declared package authority.

---

# 6. No cross-domain private-state reads

A content pack should consume public boundaries, not implementation internals.

Preferred boundaries:

- typed facts;
- typed stage/counter/choice;
- item capability;
- ActivityResult;
- Night trigger;
- ending/meta unlock.

Reject content that reaches into another subsystem's private transient state without an explicit contract.

---

# 7. Conditions are authoritative

All conditions must be current target condition types.

Reject:

- raw string expressions;
- arbitrary save-path predicates;
- legacy-only flags for new production content when typed state exists;
- guessed thresholds with no Product authority.

If a threshold is OPEN:

- leave content blocked;
- or use a clearly test-only fixture outside production.

---

# 8. Effects are authoritative

Effects must use current target effect contracts.

Reject:

- direct Meta mutation from ordinary content;
- duplicate owner writes;
- ad hoc state paths;
- effects that encode another subsystem's private state.

A cross-system result should use the public provider/consumer contract.

---

# 9. Locked-rule drift check

Before merge, list every locked invariant the pack can affect.

Examples:

- Lumber Hard Work;
- Palace 10/10 ordinary Hard Work;
- School costs;
- Night study rules;
- Secret Debt hidden-career exclusion;
- presentation timing independence.

Reject accidental rule changes hidden in content data.

---

# 10. No unresolved Product choice encoded

Search every new numeric/string constant for authority.

Potential risks:

- threshold;
- price;
- wage;
- debt;
- penalty;
- chance;
- item source;
- consume policy;
- NPC identity;
- route identity;
- ending reward.

If authority is absent, classify:

**HUMAN_DECISION_BLOCKED**

Do not merge the guessed constant into production.

---

# 11. Repeatable-content semantics

For repeatable actions/events:

Verify:

- repeatable action does not become one-shot accidentally;
- one-time milestones use explicit history/maxShows;
- cooldown semantics are intentional;
- repeat action effects occur once per command;
- reload does not repeat the command.

---

# 12. Event Resolver compatibility

For events:

Check:

- trigger type valid;
- reaction trigger references known IDs;
- priority class appropriate;
- numeric priority explicit where needed;
- blocking/optional delivery intentional;
- maxShows/cooldown behavior intentional;
- pending snapshot has valid choices.

Cross-system event should trigger without requiring an unrelated extra normal action if the design expects immediate reaction.

---

# 13. State-machine validity

For career/quest/relationship definitions:

Check:

- initial stage exists;
- stage IDs unique;
- transitions unique;
- from/to stages valid;
- all stages reachable unless explicitly supported otherwise;
- transition conditions/effects validate;
- no nested illegal transition behavior.

---

# 14. Item capability validity

For item-gated content:

Check:

- item definition exists;
- capability declaration exists;
- pack declares capability read;
- natural acquisition source exists if package claims reachability;
- remove/consume behavior explicit if used;
- route/action visibility deterministic across reload.

Seeded inventory proves mechanics only.

---

# 15. School content validity

For School-driven content:

Check:

- course/track identity known;
- paid/Night progress owners not mixed;
- School public result provider explicitly authored;
- no synthetic career-owned “School action” used as production shortcut;
- threshold/milestone has authority.

---

# 16. Night content validity

For Night content:

Check:

- intercept point valid;
- lodging suppression rules coherent;
- forced/voluntary priority clear;
- consumesNight intentional;
- next-day effects explicit;
- pending scene survives reload;
- day advances once.

Reject a Night event that can double-charge lodging or double-apply effects after reload.

---

# 17. Activity content validity

For Activity pack:

Check:

- activity ID/definition version;
- adapter;
- entry cost;
- options/routes;
- conditions;
- one-shot options;
- internal resource rules;
- success/escape/failure results;
- external ActivityResult consumers;
- save/resume.

Reject stale pre-option assumptions for new option-aware content.

---

# 18. Ending content validity

For endings:

Check:

- eligibility conditions authoritative;
- eligible state separate from commit;
- exact Meta reward ID valid;
- commit is reward-free;
- completion applies once;
- repeated completion/reload idempotent;
- Palace contribution classification explicit.

Hidden career ending must not count toward Palace unless Product authority changes the lock.

---

# 19. Presentation coverage

Every meaningful production content node should have:

- semantic presentation ID or valid derived slot;
- valid media/fallback;
- alt text where meaningful;
- missing-media-safe behavior.

Reject:

- gameplay dependency on filename;
- missing fallback that makes mechanics unusable;
- frame/timing gameplay coupling.

Use:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`.

---

# 20. Fallback graph validity

Presentation fallback graph must have:

- known target IDs;
- no cycles;
- deterministic order;
- safe final fallback.

Asset reuse is allowed.

Semantic identity collision is not.

---

# 21. Save/reload stability

For every stateful content pack, define at least one checkpoint.

Examples:

- pending milestone;
- after paid action;
- selected route;
- pending Night event;
- committed ending.

Assert:

- same authoritative state after reload;
- no duplicate effect;
- no reroll where pending selection already committed;
- no duplicate item/money/Energy/reward.

---

# 22. Stale-save policy

If content IDs/versioning can change persisted state:

Document behavior for:

- removed event;
- removed option;
- changed Activity version;
- renamed relationship stage;
- removed ending.

Use:

- explicit migration;
- or explicit incompatibility/rejection.

Do not silently reinterpret stale transactions.

---

# 23. Negative-path coverage

Every pack needs at least one invalid/unavailable path.

Examples:

- missing capability;
- insufficient money;
- wrong stage;
- condition false;
- duplicate option;
- blocked Night;
- unknown stale ID.

Failed operation must be atomic.

---

# 24. Natural reachability

If package claims product completion, prove the player can reach it naturally.

Direct test setup may be used for:

- isolated validator tests;
- threshold compression;
- corruption tests.

But it must be labeled.

Do not count:

- seeded item;
- injected worldFact;
- synthetic provider;
- direct ending pre-state

as natural reachability.

---

# 25. Content depth matches package claim

Do not call a package “full career” if it contains only:

- one shift;
- one event;
- one ending.

Match the package claim to actual authored depth.

Possible valid labels:

- production skeleton;
- first milestone slice;
- full career package;
- relationship package;
- content-depth extension.

QA verifies the claimed scope, not an inflated label.

---

# 26. Legacy content separation

If legacy prototype content with similar IDs exists:

- identify it;
- ensure target UI uses target content;
- preserve save compatibility where required;
- do not merge legacy counters into typed progression implicitly.

Legacy content is not evidence of target package completion.

---

# 27. Fixture separation

QA fixtures must live in fixture/test ownership and remain excluded from shipped build unless intentionally promoted.

Before production merge:

- search fixture IDs;
- search synthetic labels;
- inspect production build input.

A fixture-only pack in `dist/content.json` is a blocker.

---

# 28. Build/dist check

After build verify:

- pack serialized once;
- all referenced definitions included;
- no unknown references;
- media paths valid;
- no QA-only content leaked.

Record exact built SHA.

---

# 29. Targeted tests

A content pack should include tests proportional to its claim.

Career full package normally needs:

- shift;
- season;
- milestone;
- relationship or explicit N/A;
- School/item/Activity/Night hook where designed;
- endings;
- presentation;
- save/reload.

A smaller package may test fewer domains but must state its boundary.

---

# 30. Full check

Require exact integration SHA evidence:

- typecheck;
- validate;
- build;
- full tests.

Use:

`FULL_GAME_PACKAGE_CI_EVIDENCE_TEMPLATE_v1.md`.

Current inherited floor after PR27:

**221/221**

Future packages should add coverage rather than weaken existing floor contracts.

---

# 31. Product-scope preservation

After integrating a package, whole-project docs must still preserve all major surfaces.

Use:

`PRODUCT_SCOPE_OMISSION_SENTINEL_MATRIX_v1.md`.

A new career package must not accidentally imply other careers were dropped.

---

# 32. Final content-pack disposition

Choose one:

## HUMAN_DECISION_BLOCKED

A required Product choice is unresolved.

## AUTHORING_INCOMPLETE

The intended package depth is not yet authored.

## AUTHORED_NOT_INTEGRATED

Production-target content exists but is not merged.

## INTEGRATION_BLOCKED

Ownership/runtime/validation conflict exists.

## INTEGRATED_AND_TESTED

Merged, naturally reachable where required, save/reload stable, presentation valid, full check green.

## OPTIONAL_PRESENTATION_POLISH

Core content integrated; only non-blocking visual polish remains.

---

# Compact reviewer checklist

Before accepting a content pack, answer YES/NO/N/A:

```text
[ ] authority identified
[ ] IDs unique
[ ] pack inclusion explicit
[ ] read capabilities declared
[ ] write capabilities declared
[ ] no private cross-domain reads
[ ] conditions/effects authoritative
[ ] no locked-rule drift
[ ] no OPEN Product choice guessed
[ ] state machines valid
[ ] cross-system boundaries explicit
[ ] presentation/fallback valid
[ ] save/reload tested
[ ] negative path tested
[ ] natural reachability proven or accelerator labeled
[ ] fixture content excluded
[ ] dist build correct
[ ] targeted tests green
[ ] full check green on exact SHA
[ ] full product scope still preserved
```

No production runtime/UI/content file was modified by Chat 4.
