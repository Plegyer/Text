# Chat 3 — Restricted Sites Production v15

Status: **IMPLEMENTATION CANDIDATE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/restricted-sites-production-v15`  
Exact base: `chat3/anomalous-reach-production-v14@266f1de7cc9afdccff36d8360771a059d9d19e65`  
Implementation head before this documentation commit: `13f67618bbe63e2e089381aaf605adef173f94e9`

> Final frozen SHA is reported after this document commit.

## Scope

v15 adds D36 Region 4 — **Restricted Sites** — and completes the four-region Large Activity production baseline.

The region is intentionally late/high-risk and reuses the accepted D36 Activity runtime.

Stable Activity ID:

`restricted.sites`

No universal Activity XP, combat subsystem, Palace substitute, new calendar, or second Activity engine was added.

## Narrow shared runtime extension

Restricted Sites is the first production **Infiltration / Suspicion** region.

The existing generic mini-game shell was extended narrowly with optional typed suspicion state.

### Transition fields

Optional:

- `suspicionDelta`
- `minSuspicion`
- `maxSuspicion`

### Persisted mini-game state

New field:

`suspicion: 0..100`

Default:

`0`

This default preserves old active saves whose Forest/Trade/Anomalous mini-game state predates v15.

### Runtime behavior

- suspicion is deterministic;
- every delta is clamped to `0..100`;
- transitions may be gated by current suspicion bounds;
- repeated Activity options remain prevented by the existing resolved-option contract;
- malformed `minSuspicion > maxSuspicion` definitions are rejected by catalog validation;
- current suspicion is visible in the Activity UI while the mini-game is active.

Forest Tracking and Anomalous Pattern/Ritual definitions do not declare any suspicion metadata, so their authored behavior is unchanged.

## Restricted Sites core contract

- entry Energy: **2**
- Field Time: **6**
- internal Endurance: **10**
- ordinary Continue Endurance cost: **3**
- regional success progress: **6**
- failure floor: **0**
- resume: allowed
- time policy: same-day
- failure policy: exit to day
- adapter: existing `counter.v1`

Typed regional results:

- `restricted.sites.success`
- `restricted.sites.escape`
- `restricted.sites.failure`

Successful regional anchor:

`activity.restricted-sites.anchor-secured`

## Late-region entry identity

Entry requires:

1. **Year 3 or later**;
2. at least one real preparation source:
   - Assassin `infiltration-qualified`;
   - Concealed Toolset;
   - Assassin Sealed Pass;
   - Context Disguise Kit;
   - official Guard access;
   - Trade Corridor anchor;
   - Anomalous Reach anchor.

This keeps Restricted Sites later than Forest / Trade Corridor / Anomalous Reach while preserving multiple legal prep paths.

## Route contexts

### Service Ring

Stable route:

`restricted.route.service-ring`

This is the open route once the region is legally unlocked.

It owns the production Infiltration / Suspicion detour and can use:

- Assassin local intel;
- existing Handler utility;
- Concealed Toolset;
- Context Disguise Kit;
- Evidence Case.

### Sealed Annex

Stable route:

`restricted.route.sealed-annex`

Season edge:

- autumn;
- winter.

Access requires one of:

- `assassin_sealed_access`;
- `official_guard_access`;
- `guard_sealed_pass`.

Every Sealed Annex route-specific option repeats both season and access gates to prevent route-option bypass.

Meaningful hooks include:

- Assassin Sealed Pass;
- Guard badge / official access;
- Guard Sealed Pass;
- Evidence Case.

### Context Wing

Stable route:

`restricted.route.context-wing`

Access requires:

- Context Disguise Kit; or
- Etiquette & Presentation paid lessons >=2; or
- corresponding Night Study sessions >=2.

All Context Wing route-specific options repeat this access gate.

The route contains an explicit information-backed risk decision using existing Assassin-local Tavern / Merchant / Guard / Handler intel.

## Infiltration / Suspicion

Stable mini-game instance:

`restricted.infiltration-suspicion`

This is distinct from:

- Forest / Trade Tracking Triangulation;
- Anomalous Reach Pattern / Ritual Circuit.

State path:

- `start -> approach`
- `approach -> inside`
- `inside -> terminal`

### Observation

`restricted.detour.infiltration-observe`

- costs 1 Field Time;
- starts suspicion at +10.

### Approach choices

Prepared timing intel:

`restricted.infiltration.intel-window`

- requires existing Assassin local intel / Handler utility;
- suspicion -10.

Prepared disguise:

`restricted.infiltration.disguise-window`

- requires Context Disguise Kit;
- suspicion -5.

Raw timing:

`restricted.infiltration.raw-window`

- no information requirement;
- suspicion +25;
- Endurance -1.

Abort:

`restricted.infiltration.abort`

- mini-game outcome = abort;
- zero extra Field Time.

### Inside outcomes

Clean handoff:

`restricted.infiltration.clean-handoff`

- legal only at suspicion <=25;
- +2 regional progress;
- successful Infiltration/Suspicion result.

Evidence extraction:

`restricted.infiltration.secure-evidence`

- requires Evidence Case;
- legal at suspicion <=45;
- +2 regional progress;
- suspicion +15;
- publishes meaningful extraction and Preservation seams.

Compromised route:

`restricted.infiltration.compromised`

- legal at suspicion >=26;
- mini-game outcome = failure;
- high delta intentionally exercises the runtime clamp and resolves at suspicion 100.

Mini-game success never auto-completes the regional anchor.

## Pathfinder shortcut

Stable option:

`restricted.shortcut.clean-route`

Requires a successful infiltration-cleared state.

Effects:

- +3 regional progress;
- -1 Field Time;
- publishes:

`activity.restricted-sites.mark.pathfinder`

A prepared Service Ring success cadence can resolve the regional anchor in one six-segment entry:

`route -> observe -> prepared approach -> infiltration success -> shortcut -> continue`

This remains well inside D36's <=3 successful-entry regional pacing target.

## Meaningful extraction / Preservation

Stable extracted evidence:

`activity.restricted-sites.result.evidence-secured`

Preservation marker:

`activity.restricted-sites.mark.preservation`

Produced by:

- Evidence Case during Infiltration/Suspicion; or
- authored evidence handling on Sealed Annex / Context Wing.

No global evidence economy was introduced.

## City preparation -> Activity

Restricted Sites reuses shipped systems.

Assassin equipment:

- `assassin_concealed_toolset`
  -> `assassin_concealed_entry`
- `assassin_sealed_pass`
  -> `assassin_sealed_access`
- `assassin_disguise_kit`
  -> `assassin_context_disguise`
- `assassin_evidence_case`
  -> `assassin_handle_evidence`

Guard preparation:

- `official_guard_access`
- `guard_sealed_pass`

Existing Assassin-local information:

- `tavern-intel-known`
- `merchant-route-known`
- `guard-pressure-known`
- `handler-utility-ready`

No new item definition was needed.

## Activity -> city / career / contact

New pack:

`content/packs/restricted-sites-production.json`

### City

Successful return can publish:

`restricted.sites.city-return-recorded`

### Assassin career

If Assassin career state exists:

`restricted-sites-returned`

This does not select an Assassin advanced branch or ending.

### Handler contact / Network

Existing relationship:

`assassin.handler`

The field contact option requires an already accepted Handler utility thread.

Stable contact seam:

`activity.restricted-sites.contact-thread-open`

After regional success the player may explicitly share the return.

That publishes:

- relationship fact:
  `restricted-sites-return-shared`
- Network marker:
  `activity.restricted-sites.mark.network`

Network classification therefore requires a real network-capable relationship thread.

## Research-grade secured result

Research-grade candidate requires all of:

- Restricted Sites regional anchor;
- secured evidence;
- successful Infiltration / Suspicion.

Then the feedback pack can publish:

`activity.restricted-sites.result.research-grade`

No D38 ending is granted or committed.

## D38 four-region completion seams

After v15 the four intended 1.0 region candidates exist:

1. Forest Frontier
2. Trade Corridor
3. Anomalous Reach
4. Restricted Sites

Available specialized families now include:

- Tracking Triangulation
- Pattern / Ritual Circuit
- Infiltration / Suspicion

Across the four regions the production content now exposes typed facts sufficient to represent the locked D38 common baseline:

- >=3/4 regional anchors;
- >=2 mini-game families;
- meaningful extraction;
- a resolved contact/network thread;
- Pathfinder classifications;
- Preservation classifications;
- Network classifications;
- research-grade secured-result candidates.

The focused v15 suite contains explicit positive and negative readiness matrices for:

- Pathfinder;
- Preservation;
- Network.

It verifies representative fact sets can satisfy the locked D38 requirements and that removing a required anchor/classification/research result makes the corresponding readiness false.

### Explicit-commit boundary

v15 does **not** add:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

and no current ending condition consumes `activity.restricted-sites.*`.

Therefore the region supplies production seams but does not auto-grant or auto-commit any D38 ending.

## Compatibility

Exact static comparison against frozen v14 confirms the following Activity definitions remain byte-for-JSON unchanged:

- `lumber.forest`
- `trade.corridor`
- `anomalous.reach`
- `assassin.infiltration`

The legacy career-local `assassin.infiltration` remains:

- separate from Restricted Sites;
- unlimited by Field Time;
- on its existing result IDs.

The only shared runtime change is optional suspicion support in the already accepted mini-game shell.

## UI

Explore now lists:

- Forest Frontier
- Trade Corridor
- Anomalous Reach
- Restricted Sites
- Hunter Expedition

Activity UI now:

- shows active mini-game suspicion;
- resolves authored route labels generically instead of using a Forest-only route ID fallback.

## Firewalls

Restricted Sites content does not read or write:

- `palace.access-granted`
- `palace.d23-qualified`
- Secret Debt state
- lender state
- NightFlow state
- universal Activity XP

No Activity capability is a Palace substitute.

Entry remains exactly 2 Energy.

Nothing in v15 cancels or suppresses Secret Debt forced Night.

## Focused QA

Added:

`tests/restricted-sites-production-v15.test.ts`

Coverage includes:

- exact Restricted Sites config;
- Year-3 + preparation gate;
- 2-Energy entry exactly once;
- Field Time;
- deterministic save/reload;
- visible suspicion;
- Infiltration success;
- Infiltration failure;
- Infiltration abort;
- suspicion threshold-dependent option availability;
- suspicion clamp to 100;
- old save state without suspicion -> default 0;
- regional success / failure / escape separation;
- Sealed Annex season/access anti-bypass;
- Context Wing access anti-bypass;
- explicit information/risk decision;
- meaningful evidence extraction;
- Pathfinder / Preservation / Network;
- Handler contact;
- research-grade result;
- all four region definitions coexisting;
- D38 positive/negative readiness matrix;
- legacy Assassin infiltration compatibility;
- Palace / Secret Debt / NightFlow / Activity-XP firewalls.

## Machine audits performed through GitHub connector

### Typed content audit

Result:

- **127 / 127 PASS**
- **0 failures**

The audit checks:

- event namespace;
- fallback variants;
- free exits;
- known Activity/result references;
- typed career/relationship/worldFact declarations;
- known item capabilities;
- mini-game start and all terminal outcomes;
- meaningful positive/negative suspicion deltas;
- min/max suspicion transition gates;
- Sealed Annex gate parity;
- Context Wing gate parity.

### Production / compatibility preflight

Result:

- **53 / 53 PASS**
- **0 failures**

The audit verifies:

- exact previous Activity definitions;
- one additive region;
- Year-3 identity;
- three routes;
- season edge;
- capability hooks;
- Field Time;
- 2-Energy entry;
- high-risk Endurance profile;
- Infiltration / Suspicion distinctness;
- D38 marker seams;
- shared suspicion schema/engine/validator/UI;
- city/career/contact feedback;
- no current Activity ending implementation;
- Palace / Debt / Night firewalls.

## Executable QA status

No full CI was initiated.

The GitHub connector available to Chat 3 does not provide a shell/command runner for this private branch.

Therefore v15 does **not** claim execution of:

- `npm run typecheck`
- `npm run validate`
- `npm run build`
- Node test runner
- v12 executable regressions
- v13 executable regressions
- v14 executable regressions

Those focused commands remain the Chat 2 assembly gate.

No PR or full-CI budget was consumed by Chat 3.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
