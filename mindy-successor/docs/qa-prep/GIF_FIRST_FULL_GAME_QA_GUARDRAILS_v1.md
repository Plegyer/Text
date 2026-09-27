# GIF-First Full-Game QA Guardrails v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Authority:
- `GIF_CENTRAL_STAGE_CONTRACT_v1.md`
- `MEDIA_PRESENTATION_CONTRACT_v0.md`
- `PRESENTATION_RC_EVIDENCE_PACK_v1.md`

## Purpose

Extend the current green presentation contract from the Lumber/School release candidate to full-game production.

These are QA guardrails for every future career/system package.

Presentation may evolve visually.

Gameplay semantics must remain independent from animation timing/assets.

---

# 1. GIF is presentation only

## Locked invariant

A GIF may communicate:

- location;
- mood;
- action context;
- event staging;
- result;
- relationship beat;
- ending.

A GIF may not own:

- Energy spending;
- money changes;
- stat effects;
- event eligibility;
- route progression;
- success/failure;
- ending completion.

## QA rule

For every new presentation-backed mechanic, prove the same command/effect result with:

- GIF present;
- GIF missing but static fallback present;
- all media missing and text-only fallback used where allowed.

Mechanical Save output must remain equivalent except for presentation metadata.

---

# 2. Mechanics never wait for GIF

No future package may implement:

```text
wait for animation loop
-> apply effect
```

or:

```text
on GIF frame N
-> unlock choice
```

Gameplay transitions must be driven by:

- explicit player command;
- Resolver;
- deterministic state transition;
- authored condition/effect.

## QA sentinel

Search future UI/runtime changes for:

- media `ended` handlers dispatching mechanics;
- frame/timer callbacks applying gameplay effects;
- delays required before command availability;
- polling GIF playback state.

Any such dependency is a blocker.

---

# 3. Missing media is non-fatal

Fallback priority remains:

1. requested GIF;
2. static media for same semantic presentation;
3. parent/event/system fallback;
4. neutral location fallback;
5. text-only stage.

## QA expectations

Missing asset must not prevent:

- shift completion;
- School lesson;
- Night resolution;
- poverty/street continuation;
- Activity progress;
- ending commitment/completion;
- save/load.

Future production packages must include a fallback strategy even if final GIFs are not ready.

---

# 4. Animation Off is presentation-only

User disabling animation must not alter:

- available actions;
- chance/RNG;
- event selection;
- money/Energy;
- stats;
- route outcomes;
- relationship progression;
- Night effects;
- ending eligibility.

## QA contract

For representative package flows:

```text
animation ON
vs
animation OFF
```

compare normalized mechanical Save state after identical commands.

Only presentation/media selection may differ.

---

# 5. Semantic identity survives asset replacement

Gameplay-facing identity is:

`presentationId`

not:

- file path;
- filename;
- media hash;
- frame index.

Replacing:

`assets/foo.gif`

with:

`assets/bar.gif`

for the same semantic slot must not require a gameplay migration.

## Future test

Create Save with pending semantic ID.

Swap presentation override/media mapping.

Reload.

Assert:

- same event/variant/choice state;
- same `presentationId`;
- new asset may render;
- mechanics unchanged.

---

# 6. Save never stores frame/time

No Save may persist:

- GIF frame;
- animation elapsed milliseconds;
- loop count;
- playback time;
- decoder state.

Reload restarts presentation playback while preserving mechanical identity.

## QA sentinel

Schema search must find no media-playback state under authoritative Save.

A future cinematic implementation must remain outside mechanical Save unless separately approved.

---

# 7. Reused GIFs cannot merge gameplay identities

GIF reuse is expected.

Two distinct gameplay scenes may point to the same asset.

They must still retain distinct semantic IDs when gameplay/story identity differs.

Example:

```text
job/tavern/shift/autumn/default
relationship/tavern-owner/trust/default
```

may temporarily use one neutral tavern GIF.

They must not be collapsed into one gameplay identity merely because the file is shared.

## QA contract

For reused assets:

- distinct presentation IDs remain distinct;
- pending save preserves the correct semantic ID;
- editor override can replace one slot without silently replacing unrelated gameplay slots unless explicitly linked by fallback inheritance.

---

# 8. Career guardrails

Apply to all 10 ordinary careers and Palace.

Each future career package should define semantic families for at least:

- ordinary shift;
- meaningful career milestone;
- relationship beat where present;
- significant result;
- ending.

Recommended shape remains semantic, not filename-based.

Examples may follow:

```text
job/<career>/shift/<season>/default
job/<career>/event/<event>/default
job/<career>/result/default
ending/<career>/<ending>
```

Exact IDs must come from accepted package authoring.

## Career QA

At minimum prove:

- shift media swap does not add a second Energy cost;
- reactive milestone can replace Work presentation without replaying Work;
- season presentation follows persisted mechanical season;
- missing career GIF falls back safely;
- pending career scene reload keeps semantic identity.

---

# 9. Poverty / Secret Debt guardrails

Future poverty content may use distinct presentation identities for:

- cheap lodging;
- street sleep;
- lender encounter;
- delayed debt activation;
- hidden career work;
- forced Night obligation;
- Secret Debt endings.

## Critical rule

Presentation may not leak hidden mechanical state before the content intends to reveal it.

For example:

- a hidden lender route may use neutral street presentation until encounter selection;
- a secret debt activation should not be inferred solely from asset filename.

## QA

Assert:

- street media failure never blocks day advance;
- lender pending presentation survives reload;
- forced Night presentation failure never skips the obligation;
- asset replacement cannot re-trigger loan grant/debt activation.

---

# 10. School guardrails

Each course/track already has semantic lesson IDs.

Future School authoring may add:

- teacher scenes;
- milestone/project/exam scenes;
- certificates;
- public-result events.

## QA

Prove:

- lesson cost/progress commits before reactive presentation scene;
- missing teacher GIF does not repeat tuition;
- pending milestone reload retains exact semantic identity;
- replacing teacher art does not alter course/track progress;
- Night study remains mechanically identical with animation off.

Teacher identity/art depth may be authored later without changing School transaction semantics.

---

# 11. Relationship guardrails

Relationships across future careers may reuse location/media.

Semantic identity must remain relationship-specific.

## QA

For repeated relationship meetings:

- stage/counter/facts drive event identity;
- Night/Day context can change presentation without changing earned progression;
- missing media does not block choice resolution;
- choice effects happen once independently of animation.

No relationship advancement may be tied to GIF completion.

---

# 12. Night guardrails

Night presentation may cover:

- lodging;
- forced event;
- voluntary relationship meeting;
- School Night study;
- poverty street event;
- Secret Debt forced obligation;
- future camp context.

## QA

Every Night presentation swap must preserve:

- one lodging transaction;
- one selected Night choice;
- one calendar advance;
- one next-day modifier application.

Media reload/failure must not:

- repay lodging;
- reroll a pending forced event;
- duplicate relationship counter;
- advance the day twice.

---

# 13. Activity guardrails

Activity presentation may change by:

- route;
- challenge family;
- season;
- encounter;
- success/escape/failure.

## Mechanical separation

Internal Activity progress/RNG/endurance must not depend on:

- GIF length;
- asset load;
- frame/time.

## QA

For representative routes:

- select route with media unavailable;
- save/reload;
- progress challenge;
- replace asset;
- reach result.

Compare exact Activity state/output.

Reused route GIFs may not merge:

- route ID;
- challenge ID;
- result ID.

---

# 14. Endings / Meta guardrails

Ending presentation is especially important visually, but still cannot own completion.

Correct sequence:

```text
eligible
-> explicit commit command
-> ending presentation
-> explicit central completion
-> RunResult/Meta transaction
```

Do not implement:

```text
ending GIF finishes
-> award Meta
```

## QA

Assert:

- missing ending GIF does not block completion;
- commit remains reward-free;
- completion reward exactly once;
- reload restarts media but cannot duplicate RunResult/Meta;
- animation off still allows full ending completion.

---

# 15. Palace guardrails

Palace uses the same presentation architecture.

Meta unlock and Palace availability must not depend on loading/showing Palace assets.

Before Palace unlock:

- semantic content may remain undiscoverable according to product policy.

After unlock:

- missing Palace media must still allow career access where mechanically available.

Presentation cannot bypass the 10/10 ordinary Hard Work requirement.

---

# 16. Editor / replacement guardrails

Future full-game editor workflow should remain:

`presentationId-first`

with file selection/override.

It must not expose normal gameplay editing as manual source-path mutation.

## QA

For every new presentation family:

- slot discoverable by semantic ID;
- asset override validated;
- preview uses same central-stage aspect/fallback;
- invalid file does not mutate mechanics;
- removing override restores shipped fallback.

---

# 17. Cross-package collision guardrail

As the catalog grows, duplicate semantic IDs become a release risk.

Future package gate must reject:

- same `presentationId` accidentally owned by two unrelated semantic scenes;
- fallback cycles;
- unknown fallback references;
- incompatible slot type reuse where current schema distinguishes them.

Asset reuse itself is fine.

Identity collision is not.

---

# 18. Full-game presentation QA minimum

Every future production package should add at least:

1. semantic ID derivation/registration test;
2. fallback test;
3. missing-media nonfatal test;
4. animation-off mechanics-equivalence test;
5. pending save/reload identity test where package has pending scenes;
6. editor/override coverage if new slot family is introduced;
7. no timing-coupling assertion or code review sentinel.

---

# 19. Global no-regression list

Block any future change that introduces:

- gameplay effects from media callbacks;
- required GIF completion;
- frame/time fields in Save;
- filename-driven gameplay branching;
- asset replacement requiring game-state migration;
- missing media fatal to gameplay;
- Animation Off changing mechanics;
- reused GIF collapsing distinct semantic gameplay identities.

No production runtime/UI/content file was modified by Chat 4.
