# Chat 6 — Palace Selective Integration Manifest v6

Status: **READY FOR CHAT2 / LEADER SELECTIVE INTEGRATION**
Owner: Chat 6 / Palace Producer
Branch: `chat6/palace-integration-manifest-v6`
Exact branch base: `176d879f01edea725a331ffe7fb2fb17fb316889`

Source heads:
- Palace v4 local contracts: `302c5cd636b2389edd05de2b4e50d5df8f88133d`
- Palace v5 authored RU/EN: `c7b26032af9347af59c590de187abd7d44795050`
- Chat 4 Hard Work shared infra prep: `50ede59ad96bd8059fcc15dca1ffdffc910563ab`
- Chat 4 production package catalog: `54d87ad3db0fb1846ea2500153e34424c900f89f`

Machine-readable companion:
`content/palace-integration-manifest-v6.fixture.json`.

This branch is a manifest only. It does not bind Palace content live.

---

## 1. Current-main integration context

Current main already contains the repaired Assassin complete-career assembly.

That removes the old unpublished-Assassin dependency from Palace planning.

Current main still has the pre-D23 Palace implementation:

- `engine.ts::palaceAvailable(meta)` checks permanent Hard Work 10/10 only;
- `ensurePalaceUnlock(meta)` projects that result into `meta.unlocks['palace']`;
- old automatic Hard Work +3/+3 and Merchant +600 behavior still exists;
- progression stat storage/clamp is still 0..100;
- no live Palace pack exists in `content/packs`.

Chat 4's isolated shared prep already defines the future correct D23 helper:

```ts
palaceNewStartQualified({
  earnedHardWork,
  activePackages
})
```

Palace v6 consumes that shared result. It must not reimplement package selection or package mapping.

---

# 2. Integration principle

Do **not** cherry-pick Palace v4 or v5 wholesale.

Use them as selective source heads.

The production merge has three ownership layers:

### Shared D21-D24 layer

Owned by shared integration / Chat 4 / Chat 2 as assigned:

- permanent Hard Work ledger;
- New Start+ package selection;
- run-local active package snapshot;
- package application;
- D23 qualification;
- Save migration;
- dynamic stat cap 100/200;
- New Start+ and cap UI.

### Palace-local layer

Owned by Palace:

- Day-1 invitation content;
- `palace.access-granted`;
- entry/orientation;
- generic relationships;
- voluntary Palace Night;
- optional legacy-item reactions;
- D18 fixed 91+ stat subgate;
- Palace-specific RU/EN copy.

### Deferred layer

Not authorized by v6:

- Prince confrontation mechanics / victory signal implementation;
- final Palace career stage topology;
- Palace shift/stage threshold design;
- full True Ending binding;
- final cap-200 reward ID / UI identity.

---

# 3. Exact source disposition

## 3.1 From v4 `src/core/palaceSafePrep.ts`

### Keep conceptually

- `PALACE_ACCESS_FACT = 'palace.access-granted'`;
- Day-1 invitation contract:
  - `creationCompleted`;
  - elapsed Day 0 / calendar Day 1;
  - `critical_progression`;
  - blocking;
  - latched;
  - one show;
  - no RNG;
  - no stat gate;
  - no item gate;
- fixed D18 threshold `91`;
- cap 100 -> 200 semantics;
- four relationship identities;
- voluntary Night ownership boundary;
- optional shipped legacy-capability inventory.

### Do not integrate once shared D23 exists

Do not carry these v4 helpers into production as a second authority:

- `palaceRunGate()`;
- `normalizeEarnedActiveHardWorkPackages()`.

The shared Hard Work layer already owns:

- earned-package validation;
- active-package validation;
- all-ten-active qualification.

There must be one D23 authority.

## 3.2 From v5 authored fixture

v5 is the canonical RU/EN source for:

- invitation;
- reveal;
- entry;
- orientation;
- patron;
- rival;
- official contact;
- optional romance;
- Night work review;
- Night social conversation;
- legacy-item reactions;
- True Ending 91+ readiness wording;
- cap-200 wording.

Do not infer runtime mechanics from fixture ordering beyond what this manifest explicitly binds.

---

# 4. Shared D23 seam required before live Palace bind

The Palace integration requires one condition-readable run-local predicate at the `creationCompleted` resolver boundary.

Semantic definition:

```text
D23 qualified for this life =
  permanent ordinary Hard Work 10/10
  AND
  current-run active ordinary Hard Work packages 10/10
```

The shared layer should calculate this through:

```ts
palaceNewStartQualified({
  earnedHardWork: meta.hardWorkProgress,
  activePackages: run.character.creation.activeHardWorkPackages
})
```

The exact shared schema/condition identity is **not** invented by Chat 6.

This manifest names the injected content condition:

`D23_QUALIFIED_CONDITION`.

Before Palace live binding, integration must replace that placeholder with the actual shared seam.

Critical timing requirement:

The predicate must be valid before:

```text
finishCreation
  -> packages applied/frozen
  -> creation complete
  -> creationCompleted resolver boundary
```

Otherwise Day-1 invitation delivery can race against package finalization.

---

# 5. Day-1 invitation — exact selective bind

Create a new Palace-owned pack:

`content/packs/palace-entry.json`

No change to `build.mjs` or `validate.ts` is needed; both automatically discover every `content/packs/*.json`.

## 5.1 `palace.invitation.day1-arrival`

Source: v5.

Runtime contract:

- reaction trigger: `creationCompleted`;
- condition: `D23_QUALIFIED_CONDITION`;
- priority class: `critical_progression`;
- blocking: true;
- delivery: `latched`;
- chance: none;
- maxShows: 1.

The event must not contain:

- stat conditions;
- item conditions;
- random chance;
- `metaUnlock:palace` as the sole gate.

The `open` choice chains into the reveal scene.

## 5.2 `palace.invitation.reveal`

Source: v5.

Use a latched continuation from the arrival choice.

The `accept` choice performs exactly one Palace access write:

```json
{
  "kind": "addWorldFact",
  "fact": "palace.access-granted"
}
```

No item is granted as an entry requirement.

## 5.3 `palace.entry.gates`

Trigger from:

```text
worldFactAdded palace.access-granted
```

Latched blocking continuation.

The scene is presentation / transition only.
It must not add another access test.

## 5.4 Orientation chain

Continue using v5:

- `palace.orientation.first-day`;
- `palace.orientation.handoff`.

Chain by `choiceResolved`, not by Palace career stage.

This makes the entire first-day flow independent of 3-vs-6 progression.

---

# 6. Palace-local access state

Production local state:

```text
worldFact: palace.access-granted
```

Properties:

- run-local;
- not Meta;
- absent before invitation acceptance;
- written only by the valid D23 invitation flow;
- reset naturally with the run;
- never granted by an item;
- never granted by a stat threshold;
- never granted by a random event;
- never granted by Secret Debt.

Do not use `meta.unlocks['palace']` as run access authority after D23 integration.

Permanent 10/10 may remain meaningful as permanent history, but it is insufficient for access in a life.

---

# 7. Relationships — selective integration without career topology

Add only four relationship machines to `content/definitions.json`:

- `palace.professional-patron`;
- `palace.rival`;
- `palace.official-contact`;
- `palace.optional-romance`.

Use the v4 relationship skeletons as structural source.

Do not add a Palace career machine in this integration step.

Create:

`content/packs/palace-relationships.json`.

Global requirement for every live relationship event:

```json
{
  "kind": "worldFact",
  "fact": "palace.access-granted",
  "present": true
}
```

No relationship event may remove that fact.

## 7.1 Professional patron

Authored source:

- `palace.relationship.patron.intro`;
- `palace.relationship.patron.trust`;
- `palace.relationship.patron.conflict`.

Required behavior:

- intro establishes professional route;
- trust stays professional;
- `clarify` continues;
- `decline` continues without access/work loss;
- `step-away` closes only patronage.

## 7.2 Rival

Authored source:

- intro;
- cooperation;
- conflict.

Required behavior:

- cooperation and parallel-work choices are both valid;
- conflict can resolve without personal hostility;
- `disengage` closes only the relationship route.

## 7.3 Official / servant contact

Authored source:

- intro;
- practical help;
- boundary.

Required behavior:

- practical help does not create authority the heroine does not have;
- refusal preserves professional contact or safely closes personal favors;
- Palace access remains unchanged.

## 7.4 Optional romance

Authored source:

- `palace.relationship.romance.invitation`;
- `palace.relationship.romance.mode`.

Hard invariants:

- never required for access;
- never required for Palace career completion;
- never required for any ending;
- decline must terminate or safely close the personal route without losing Palace access.

### Local v4/v5 reconciliation

v4's romance skeleton reaches `route-resolved` from `mode-open`.

v5 adds refusal/professional choices at the initial invitation.

Production binding therefore needs one **relationship-local** direct refusal-safe terminal path from the invitation state.

This is permitted because it changes only the optional relationship machine.
It must not create or imply a Palace career stage.

## 7.5 Activation timing

Do not bind professional relationship intros to an invented Palace stage.

They may consume a future topology-neutral Palace work/context signal.

Until such a signal exists, machine definitions and copy may be integrated while the initiating events remain unregistered/untriggered.

The romance invitation additionally requires a topology-neutral familiarity signal; it must not fire automatically merely because Day-1 access exists.

---

# 8. Voluntary Palace Night

Add two Night choices to `content/definitions.json`:

- `palace.night.work-review`;
- `palace.night.social-conversation`.

Base condition for both:

```json
{
  "kind": "worldFact",
  "fact": "palace.access-granted",
  "present": true
}
```

Create:

`content/packs/palace-night.json`.

Each scene:

- reaction trigger: `nightChoiceCompleted`;
- intercept: `after_choice`;
- consumesNight: true;
- suppressVoluntaryMenu: true;
- forced: false;
- no forced-night ownership.

No Secret Debt file change is required.

If a separate system owns forced Night and suppresses the voluntary menu, Palace Night must simply be unavailable.

This preserves D19 precedence without coupling Palace to Secret Debt IDs.

---

# 9. Optional legacy-item reactions

Use v5's ten shipped capability reactions:

- `artist_formal_presence`;
- `artist_handle_invitation`;
- `official_guard_access`;
- `guard_sealed_pass`;
- `merchant_verify_manifest`;
- `merchant_handle_samples`;
- `access_guest_rooms_staff`;
- `cross_rough_route`;
- `preserve_specimen`;
- `prostitute_handle_evidence`.

All ten are present in shipped current-main item definitions.

Integration policy:

**variant-or-choice only**.

Do not create a standalone event whose existence grants Palace access.

Preferred placements:

- invitation handling -> invitation/reveal variant;
- formal presence -> entry/orientation variant;
- Guard access/pass -> entry/orientation variant;
- Merchant manifest/samples -> orientation handoff;
- staff-room access -> orientation;
- rough-route experience -> handoff/logistics scene;
- preservation -> handoff/material scene;
- evidence handling -> later eligible relationship/evidence-reading variant.

Every such read occurs after the underlying Palace scene is already eligible.

Therefore:

```text
item capability may change response
!=
item capability may create Palace eligibility
```

---

# 10. D18 fixed 91+ integration

No shared schema change is required for this subgate.

The current condition system already supports `stat + gte`.

The future True Ending definition must include one condition for every progression stat:

```text
strength >= 91
endurance >= 91
dexterity >= 91
reason >= 91
magic >= 91
creativity >= 91
wits >= 91
charm >= 91
sociability >= 91
manners >= 91
grooming >= 91
sexuality >= 91
```

Lust is excluded.

Important:

A cap-200 life does **not** change this to 181.

The D18 subgate remains raw `>= 91`.

The full True Ending must remain unbound until the authorized Prince victory signal exists.

No temporary Prince fact is introduced by v6.

---

# 11. Cap-200 copy integration

Runtime cap ownership belongs to shared D24 integration.

Palace supplies wording only until the final shared option/reward ID is known.

Canonical English:

> The maximum of each of the 12 progression stats becomes 200 instead of 100.

Canonical Russian:

> Максимум каждой из 12 характеристик развития становится 200 вместо 100.

Additional required meaning:

- current values are not multiplied;
- starting bonuses are not multiplied;
- the 10 manual allocation points are not multiplied;
- Lust is unaffected.

Forbidden production meaning:

- “stats double”;
- “values double”;
- Russian equivalents implying the twelve current values are doubled.

Do not bind this text to a guessed reward ID.

---

# 12. Localization merge

v5 is canonical RU/EN source.

Target shared file:

`content/localization.json`.

Use key-level insertion only.

Do not replace the file wholesale.

Suggested namespaces:

- `event.palace.*`;
- `relationship.palace.*`;
- `nightChoice.palace.*`;
- future shared cap-option key only after its ID is authoritative.

Pack fallback text should remain usable in RU if localization loading fails.

EN must be complete for every player-facing Palace event and choice.

---

# 13. Presentation / media

First selective Palace integration is text-only.

Do not modify:

- `content/presentation.json`;
- `src/core/presentation.ts`;
- Palace media assets.

Current presentation helper's `jobIds` does not include Palace.

That is not a blocker because v6 does not yet add Palace work action/media topology.

Presentation changes belong to the later career bind after topology is authorized.

---

# 14. Shared-file collision map

## `src/core/schema.ts` — VERY HIGH collision

Shared D21-D24 integration needs to modify:

- creation state for active packages;
- save schema/migration;
- stat storage range for 200.

Palace selective bind should not touch it.

## `src/core/engine.ts` — VERY HIGH collision

Shared integration touches:

- `freshSave`;
- old `applyHardWorkStartingBonuses`;
- `finishCreation`;
- `setMetric`;
- `parseSave`;
- inherited career availability;
- stale `palaceAvailable`;
- `ensurePalaceUnlock`.

Do not create a Palace fork of engine logic.

The Palace content layer should consume the shared condition at event eligibility.

## `content/definitions.json` — HIGH collision

Palace additions allowed in this step:

- four relationship machines;
- two Night choices.

Do not add:

- Palace career stages;
- Palace shift action;
- full True Ending.

Apply surgical JSON edits after rebasing onto integration head.

## `content/localization.json` — HIGH collision

Append only Palace keys.
Do not wholesale-copy v5 fixture into it.

## `src/ui/app.ts` — shared UI collision

No Palace-specific changes are needed for:

- generic events;
- event choices;
- relationship labels;
- Night choices.

Shared New Start+/cap UI work will change this file independently.

Do not mix Palace content UI into that shared patch.

## `src/core/content.ts` — no Palace change

Existing typed loader already supports:

- relationships;
- world facts;
- Night choices;
- item-capability conditions;
- reaction events.

## `scripts/build.mjs` / `scripts/validate.ts` — no Palace change

Both auto-discover `content/packs/*.json`.

## `content/presentation.json` — no first-bind change

Keep text-only.

---

# 15. Existing tests that collide with D23 shared integration

These current-main tests contain stale pre-D23 assumptions.

## `hard-work-palace-meta-smoke.test.ts`

Currently asserts:

```text
permanent 10/10 -> Palace
```

Shared D23 integration must change it to:

```text
permanent 10/10
+ current-run active package 10/10
-> Day-1 Palace qualification
```

Secret Debt must still fail substitution.

## `palace-derived-unlock.test.ts`

Currently treats permanent `meta.unlocks['palace']` as sufficient authority.

Retire or rewrite this semantics.

Permanent 10/10 history is not enough for current-run access.

## `ordinary-hard-work-meta-production.test.ts`

Owned by shared D21-D22 migration.

Its automatic +3/+3 and Merchant +600 expectations are stale.

Palace must not edit it.

## `ending-meta.test.ts`

Also contains old automatic starting reward and permanent 10/10 -> Palace assumptions.

Update in the shared Hard Work integration patch, not the Palace content patch.

---

# 16. New Palace acceptance test groups

After the shared seam exists, add focused Palace tests rather than expanding unrelated career files.

Recommended files:

- `tests/palace-day1-integration.test.ts`;
- `tests/palace-access-persistence.test.ts`;
- `tests/palace-relationships-integration.test.ts`;
- `tests/palace-night-integration.test.ts`;
- `tests/palace-legacy-items-integration.test.ts`;
- `tests/palace-true-ending-stat-subgate.test.ts`;
- `tests/palace-localization-integration.test.ts`.

The machine-readable manifest defines A01-A37.

---

# 17. Acceptance matrix summary

## D23 / invitation

- 9/10 permanent: no invitation.
- 10/10 permanent + zero active: no invitation.
- 10/10 permanent + 9 active: no invitation.
- 10/10 permanent + all 10 active: qualified.
- Secret Debt/duplicates never substitute.
- invitation is exactly Day 1 / `creationCompleted`.
- invitation uses no RNG.
- invitation cannot be lost to a blocking-scene collision.
- queue/pending state survives reload.
- invitation occurs at most once.

## Access

- `palace.access-granted` absent before acceptance.
- present after acceptance.
- run-local only.
- items/stats/random events cannot create it.

## Orientation / relationships

- orientation does not require Palace career stages.
- all relationship routes require access.
- patron/rival/contact refusal never removes access.
- romance remains entirely optional.

## Night

- unavailable before access.
- voluntary after access.
- consumes one ordinary Night choice.
- does not override a separate forced-Night owner.

## Legacy items

- all ten capability IDs remain shipped.
- they only affect variants/choices.
- they never grant entry.

## D18

- 90 fails.
- 91 passes.
- all 12 required.
- Lust excluded.
- cap 200 does not change threshold to 181.

## D24 copy

- RU/EN says maximum becomes 200 instead of 100.
- no wording claims current stat values double.

## Migration

- an old active life receives no retroactive Day-1 invitation.
- the next valid New Start+ can qualify normally.

## Regression

- ordinary careers remain unchanged by Palace content integration.
- Assassin natural acceptance remains green.
- pack IDs remain unique.
- RU/EN parity remains complete.

## Final end-to-end acceptance

After shared D21-D23 integration:

1. naturally earn all ten ordinary Hard Work achievements;
2. start a new New Start+ life;
3. select all ten ordinary Hard Work packages;
4. finish creation;
5. receive exactly one Palace invitation on Day 1;
6. accept it;
7. verify `palace.access-granted`.

This final acceptance no longer depends on an unpublished Assassin producer branch because Assassin is now merged on current main.

---

# 18. Integration order

Use this order to reduce conflict:

1. Land/rebase shared D21-D24 integration first.
2. Confirm the exact condition-readable D23 seam.
3. Rewrite stale shared Hard Work/Palace tests.
4. Add Palace-local stat/access helper subset from v4 — **not** the duplicate D23 gate.
5. Add four relationship definitions and two Night choices surgically.
6. Add `palace-entry.json`.
7. Add Palace relationship/Night packs.
8. Add legacy-item variants.
9. Merge v5 RU/EN into localization by Palace namespace.
10. Add focused Palace integration tests.
11. Run focused/static checks.
12. Hand to Chat 2 for the sole full-CI integration pass when authorized.
13. Run the natural ten-life -> all-ten-active -> Day-1 invitation acceptance.
14. Do not bind full True Ending until Prince victory signal is authorized.

---

# 19. Explicit non-goals

v6 does not choose or imply:

- whether Prince confrontation is career fact vs quest;
- any Prince name/lore;
- confrontation actions/checks;
- 3-stage vs 6-stage Palace progression;
- shift thresholds;
- Palace final work/action IDs;
- cap-200 reward ID;
- final Palace media.

Those remain outside this manifest.

---

# 20. Handoff

v6 is ready as an exact selective-integration guide once the shared D23 seam exists.

No production shared file was changed.
No Palace live pack was added.
No PR was opened.
No full CI was requested.

Freeze exact SHA and report:

`READY_FOR_CHAT2_OR_LEADER`
