# Chat 4 — D46 + D47 + Legacy Current-Main Conflict Map v36

Status: **CURRENT-MAIN CONFLICT MAP COMPLETE — SELECTIVE COMPOSITION REQUIRED**  
Owner: Chat 4  
Branch: `chat4/career-preassembly-acceptance-bundle-v35`

## Audit base

Observed current production control-plane head:

`main@18166dbec95483f85df2d56adb59a2bf7bba26fb`

This file maps the current post-D42 architecture only. It does **not** predict the exact contents of the later Chat 2 assembly base.

Current relevant file identities:

- `src/core/engine.ts@e8b979355e6ebacad7ae62dce36d625687613152`
- `src/core/schema.ts@d2a3fcd2ae638352f41149c5a78e56d7ab773042`
- `src/core/content.ts@60751fa4f179fdc7068abd4252bf45d4870c514d`
- `src/core/hardWorkMeta.ts@5c9440874c0fdb61589d15de768416be04aaf606`
- `src/core/hardWorkPackageCatalog.ts@d5392a2801ebb301c70af1ffbff13eed03ca02e7`
- `src/core/strongMeta.ts@89a0a3783f52a54195c6a3d3ee6d7358305fc406`
- `src/core/palace.ts@b5b3d4a5ab006a2694b1a2b3f336e71ea55d63ec`
- `src/ui/app.ts@149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`
- `content/definitions.json@311b2fec271a274e61c34fad9645d5bff13f4993`
- `content/hard-work-package-catalog-v1.fixture.json@c52e936d8c581e0ddebfbbc761c05ee9c8370157`
- `content/localization.json@9281d3880d01c54f352effa5e372ad5393cc3eaa`
- `content/presentation.json@e800d2b16f2bc868273e39d45718dcd0c7fe74a5`

Chat 2 must re-fetch these paths on the actual assembly base. Any changed blob SHA means the exact conflict must be re-evaluated before applying producer deltas.

---

## 1. Current-main facts that matter

### Save/runtime architecture already present

Current main is schema **6** and already contains:

- Strong Meta persistent ownership;
- Strong Meta creation snapshot/runtime;
- `activeHardWorkPackages`;
- `hardWorkPackagesApplied`;
- RunResult transaction proof;
- D40 selected-route repair;
- D41 retired identity migration;
- D42 NightFlow;
- generic Activity envelope/save validation;
- D23 Palace qualification helper integrated into creation.

This architecture is newer than the historical producer bases and is the primary reason full-file replacement is forbidden.

### Current economy is still pre-D46

`freshSave()` currently creates:

- money = 600;
- Energy = 3;
- Lust = **1**.

Current ordinary shift definitions still use:

- Lumber base = **13**;
- the nine target ordinary `*.shift` actions = **15**.

The engine still computes an action wage inline from `base + weighted stats` with no D46 ordinary cap helper.

Therefore D46 is a real semantic delta on the current base.

### Current Hard Work catalog is still pre-D47

Current package fixture still contains old mappings, including examples:

- Satyr Maid -> Grooming +5;
- Tavern -> Sociability +5;
- Merchant -> Wits +5, Reason +5;
- Prostitute -> Sexuality +5, Charm +5, Lust +3.

Therefore the exact D47 map has not landed and must be composed.

### Current lumber legacy surface is still live

Current definitions contain:

- live `lumber-stay`;
- canonical modern Lumber endings:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`.

Current total ending definitions = **43**.

Current canonical ordinary ending set = **40**.

Current presentation still contains a live:

`ending/lumber-stay`

slot.

Current `energyMax()` still gives +1 through:

`meta.unlocks.includes('vitality')`

rather than normalized `activeLegacyPerks`.

Therefore lumber retirement is also a real semantic delta.

---

## 2. engine.ts conflict map

### Current owners

Current `engine.ts` owns, in one shared file:

- fresh construction;
- Strong Meta runtime;
- Hard Work package application;
- D23 creation qualification;
- action wage payment;
- ending transaction/reward application;
- Activity entry/result;
- D42 NightFlow;
- schema migration/parse;
- D40/D41 repair;
- profile merge;
- Energy max.

### D46 insertions

D46 needs to change only the relevant semantics:

- `freshSave().character.lust`: 1 -> 5;
- ordinary `*.shift` wage calculation -> D46 helper/cap 120;
- preserve pre-shift wage inputs;
- keep non-ordinary wage handling outside that helper.

### Lumber retirement insertions

Retirement needs:

- historical evidence normalization before final live-reference validation;
- Energy source changed from direct live `vitality` ownership to normalized legacy-perk ownership;
- current/profile merge dedupe retained;
- historical RunResult/transaction handling kept idempotent.

### Stable semantic conflict

`engine.ts` is **manual semantic composition only**.

Forbidden historical replacement would erase or regress:

- Strong Meta snapshot/runtime;
- current D40/D41 migration;
- D42 NightFlow;
- Activity envelope behavior;
- current creation/package lifecycle;
- later Secret Debt/D51/Palace/Activity integration if present on the actual base.

### Exact-base checks Chat 2 must redo

Immediately before applying the tranche, inspect:

- current `freshSave`;
- current `energyMax`;
- current ordinary wage seam;
- current `finishCreation`;
- current `parseSave`;
- current profile merge;
- current start-day Energy logic;
- current bound/ordinary work hooks.

If Secret Debt/D51 or fuller Palace/Activity code has landed, compose around those exact owners rather than the state documented here.

---

## 3. schema.ts / content.ts conflict map

### Current schema owners

Current `schema.ts` already defines:

- schemaVersion 6;
- Strong Meta state/snapshot/runtime;
- `activeHardWorkPackages`;
- `hardWorkPackagesApplied`;
- `activeLegacyPerks`;
- NightFlow;
- Activity envelope;
- ordinary Hard Work career identity enum;
- MetaReward variants.

It also still recognizes historical `vitality` in the legacy unlock enum.

### Stable requirement

Lumber retirement removes **live acquisition/use**, not the ability to understand historical save evidence.

Do not make old saves unparsable merely to remove live `vitality`.

No schema-version bump is authorized solely by D46/D47/legacy retirement if schema6 can represent the normalized state.

### content.ts

Current `content.ts` is typed-capability validation infrastructure and also validates Activity references and ending reward uniqueness.

D46/D47 do not require a new content capability domain.

Lumber retirement must not weaken reference validation globally to allow the retired ID. Historical compatibility belongs in save migration/normalization, not in a broad validator bypass.

### Exact-base checks

If later Secret Debt, Palace, or Activity work extends condition/effect/meta reward schemas or typed capabilities, preserve those additions. Re-run `npm run validate` after composition rather than importing historical `schema.ts` / `content.ts`.

---

## 4. hardWorkMeta / Strong Meta conflict map

### Current Hard Work lifecycle

Current engine flow resolves:

1. Strong Meta snapshot;
2. effective progression-stat cap;
3. selected Hard Work packages under that cap;
4. package applied/frozen state;
5. creation complete;
6. Palace D23 qualification.

This ordering is already compatible with D47 and must remain exact.

### D47 ownership

D47 changes:

- package content map;
- validator breadth expectations.

D47 does **not** change:

- permanent ownership location;
- selection lifecycle;
- application timing;
- replay guard;
- D23 identity count;
- Strong Meta capacities.

### Current Strong Meta owners

`strongMeta.ts` owns:

- Keystone/Specialist registry;
- capacities;
- selection;
- run snapshot;
- effective stat cap;
- start-day Energy bonuses;
- Earned Reserve Match;
- Work Rhythm;
- Network Retainer.

D47 and legacy lumber remain outside that registry.

### Stable conflict rules

Required separation:

`meta.hardWorkProgress != meta.strongMeta.ownership.ownedRewardIds != meta.activeLegacyPerks`

Preserve:

- Keystone capacity = 1;
- Specialist capacity = 2;
- D24 cap-200 as Strong Meta-owned cap effect;
- D47 package amount remains +5 regardless of cap;
- legacy lumber +1 Energy is not a Strong Meta reward.

### Expected interaction

D47 stats may increase later ordinary wages naturally.

D46 new ordinary wage must be the input seen by Earned Reserve Match.

This numeric change is expected and must not be “corrected” back to old wage values.

---

## 5. definitions.json conflict map

Current main contains:

- 39 actions;
- 43 endings;
- exactly 40 canonical ordinary endings;
- live `lumber-stay`;
- D40/D41 canonical advanced endings;
- three current 2-Energy Activities;
- no `secret-debt.*` action;
- no full Palace action surface.

### D46 edits

Change only the ten ordinary `<career>.shift` wage bases:

- Lumber -> 35;
- all other nine -> 37.

Preserve all existing wage stat weights.

### Lumber retirement edits

Remove only obsolete live `lumber-stay`.

Do not remove/rename:

- `ending.lumber.hard-work`;
- `ending.lumber.forewoman`;
- `ending.lumber.forest`;
- any other canonical D40/D41 ending.

### Total-count warning

On current main, removal of one obsolete ending changes total 43 -> 42.

That **42 is not a future invariant** if another accepted tranche adds/removes unrelated endings before Chat 2 assembles this work.

The stable invariant is:

- exactly 40 canonical ordinary-career endings;
- live `lumber-stay` absent;
- all unrelated accepted ending families preserved.

---

## 6. localization / presentation / app conflict map

### Current state

Current presentation includes a live `ending/lumber-stay` slot and current UI renders live catalog endings generically.

D42 and many ordinary-career presentation/localization rows already exist.

### Required retirement behavior

Selective composition must:

- remove live `ending/lumber-stay` presentation/source binding;
- remove live-only lumber-stay localization where appropriate;
- preserve/add historical compatibility copy;
- keep historical UI non-interactive;
- reuse neutral Lumber result imagery for historical display;
- preserve every unrelated localization/presentation key.

### Stable risk

Never wholesale-copy v17 `localization.json`, `presentation.json`, or `app.ts` over the current base.

Those are shared release surfaces with D42 and later tranches.

### Exact-base checks

If Secret Debt/Palace/Activity UI or presentation has landed by assembly time, verify that no key/slot/import/helper from those tranches disappears in the retirement diff.

---

## 7. save / migration conflict map

### Current chain to preserve

Current `parseSave` includes:

- schema1 -> 2 -> 3 -> 4 -> 5 -> 6 migration;
- old completed creation settlement;
- Strong Meta v5 -> schema6 settlement;
- D41 retired Tavern normalization;
- D40 selected-route repair;
- transaction proof validation;
- current profile merge;
- NightFlow validation;
- Activity envelope validation.

### D46 migration rule

Fresh Lust 5 belongs only to a newly constructed life.

Existing valid stored Lust wins through every migration path.

### D47 migration rule

Already complete historical creation must not receive the new package map retroactively.

The existing `hardWorkPackagesApplied` settlement guard remains authoritative.

### Lumber migration rule

Recognize historical evidence:

- completed `lumber-stay`;
- old `vitality`;
- existing normalized `legacy.lumber-stay.vitality`;
- combinations/duplicates of those.

Normalize to one legacy perk and strip live `vitality` ownership without fabricating:

- a modern ending;
- `hardWork:lumber`;
- Strong Meta ownership;
- new reward replay.

Historical result identity and existing transaction proof must remain stable.

### Important validator ordering

Retired lumber normalization must happen before final unknown-ending validation would reject a historical `lumber-stay` reference.

Do not globally weaken ending validation.

---

## 8. Secret Debt ownership boundary

### Current-main fact

At this v36 audit base, current `definitions.json` has no `secret-debt.*` action. Secret Debt+D51 is therefore an exact-base **future check**, not a current file-content assumption.

### Stable semantic boundary

Regardless of future implementation placement:

- Secret Debt hidden work is not ordinary Hard Work;
- hidden-work Energy cost remains its own authority;
- hidden wage cap remains 140, not 120;
- no hidden shift increments ordinary `completed_shifts`;
- no hidden shift grants `hardWork:<career>`;
- bound ordinary career lock preserves progress;
- Earned Reserve Match must stay suppressed while bound;
- D51 Street/bound-Night provenance logic is not a global Energy floor;
- legacy lumber +1 is unrelated Energy, not a D51 tag.

### Chat 2 exact-base redo

If Secret Debt/D51 has landed before career assembly, inspect its:

- hidden-work wage path;
- domain-lock hook;
- start-day Energy/provenance code;
- forced-Night interception;
- schema/content additions;
- tests.

Stop if D46/legacy composition would route any of these through ordinary seams.

---

## 9. Palace ownership boundary

### Current-main fact

Current main already has the D23 Palace qualification helper and calls it after package application at creation completion, but has no full Palace action surface in definitions.

### Stable semantic boundary

Preserve D23 exactly as ordinary package identity logic:

- permanent 10/10 ordinary Hard Work careers;
- active 10/10 ordinary packages.

Not credits:

- 15 D47 stat components;
- Prostitute Lust;
- legacy lumber;
- Strong Meta;
- Secret Debt;
- Activity.

D24 owns cap 200; D47 only clips +5 to the already-resolved effective cap.

Palace work/wage must remain outside D46 ordinary shift wage cap.

### Chat 2 exact-base redo

If full Palace has landed, inspect the exact Palace wage/action paths and verify none use the ordinary D46 helper unless Product authority explicitly says they are ordinary shifts.

---

## 10. Activity ownership boundary

### Current-main fact

Current main already has Activity runtime/envelope and these current definitions with exact entry cost 2:

- `lumber.forest`;
- `hunter.expedition`;
- `assassin.infiltration`.

So Activity isolation is partly a present conflict, not only a future one.

### Stable semantic boundary

D46/D47/legacy must not:

- change Activity entry Energy cost;
- turn legacy +1 Energy into Field Time;
- replay Activity entry Energy on reload;
- make Camp refresh daily Energy;
- grant Activity/D38 proof from ordinary packages;
- grant ordinary Hard Work proof from Activity.

A character with legacy +1 may simply have more legitimate daily Energy available. That is expected.

### Exact-base redo

If later Activity Network/D38/Camp work has landed, include its exact current tests and state fields in the post-assembly gate.

---

## 11. Current-vs-future conflict classification

| Area | Current conflict already observable | Exact future-base recheck required |
| --- | --- | --- |
| fresh Lust | yes: 1 -> 5 | yes |
| money/Energy base | already 600/3; preserve | yes |
| ordinary wage bases | yes: 13/15 -> 35/37 | yes |
| ordinary cap helper | absent now; add | yes |
| D47 package map | old map live now | yes |
| Strong Meta | current owner present | yes, preserve later registry changes |
| live lumber-stay | present now | yes |
| direct vitality Energy | present now | yes |
| schema6 | present now | yes, never downgrade |
| D42 NightFlow | present now | yes |
| D23 Palace qualification | present now | yes |
| full Palace content | not present now | conditional future check |
| Activity envelope + 3 activities | present now | yes |
| later Activity Camp/D38 | not assumed | conditional future check |
| Secret Debt/D51 | not present in current definitions | conditional future check |
| localization/presentation shared surfaces | present and heavily shared | yes |

---

## 12. Hard stops

Stop selective assembly if:

- a producer file would replace a newer shared owner wholesale;
- actual base file SHA differs and is not re-inspected;
- schema6 state is lost;
- D42 NightFlow fields/validation disappear;
- Strong Meta snapshot/runtime/capacity changes unintentionally;
- D47 package lifecycle moves out of creation;
- live vitality remains the final Energy source after retirement;
- legacy evidence can stack more than +1 Energy;
- retirement requires weakening global ending validation;
- current/future Secret Debt wage becomes ordinary-capped;
- current/future Palace wage becomes ordinary-capped;
- Activity entry/Field Time semantics change;
- any canonical ordinary ending disappears;
- any newer localization/presentation/UI owner is overwritten.

## Disposition

The current-main conflict map has no Product contradiction. It confirms that this tranche is mechanically compatible only through key-level/manual semantic composition.

The exact current architecture gives Chat 2 concrete seams to inspect, while Secret Debt/full Palace/later Activity remain explicitly future-base checks rather than assumptions.

**v36 COMPLETE — CONTINUE TO v37**
