# Chat 3 — Anomalous Reach Production v14

Status: **IMPLEMENTATION CANDIDATE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/anomalous-reach-production-v14`  
Exact base: `chat3/trade-corridor-production-v13@d176dea7c640d34e12dbb3abf94c9b7895fd43bb`  
Implementation head before this documentation commit: `6266f6b3b868cac449ce51827f23476e47e157e4`

> Final frozen SHA is reported after this document commit. A commit cannot safely self-embed its own cryptographic SHA.

## Scope

v14 adds D36 Region 3 — **Anomalous Reach** — as a real playable mid/late Activity region.

It intentionally reuses the accepted shared Activity runtime from Forest v12 / Trade Corridor v13.

No new:

- Activity XP;
- combat subsystem;
- Night/calendar subsystem;
- generic magic-combat adapter;
- relationship machine;
- inventory subsystem;
- mini-game family beyond the accepted D36 families.

Shared files remain exact against frozen v13:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`

Forest and Trade production definitions/packs remain unchanged.

## Executable Activity

Stable Activity ID:

`anomalous.reach`

Core contract:

- entry Energy: **2**
- Field Time: **6**
- internal Endurance: **8**
- ordinary Continue Endurance cost: **2**
- success progress: **6**
- failure floor: **0**
- resume: allowed
- time policy: same-day
- failure policy: exit to day
- adapter: existing `counter.v1`

Typed results:

- `anomalous.reach.success`
- `anomalous.reach.escape`
- `anomalous.reach.failure`

Successful regional result publishes:

`activity.anomalous-reach.anchor-secured`

## Mid/late entry identity

Entry requires:

1. **Year 2 or later**;
2. at least one real preparation/clue source:
   - one Arcana paid lesson;
   - one Arcana Night Study session;
   - Undead Farm `school-research-ready`;
   - a `preserved_farm_sample` capability;
   - Forest Frontier anchor;
   - Trade Corridor anchor.

This keeps Anomalous Reach distinct from early Forest/Trade while allowing multiple preparation paths.

## Route contexts

### Echo Ridge

Stable route:

`anomaly.route.echo-ridge`

Open once the region itself is entered.

Primary identity:

- observation;
- Reason/Literacy interpretation;
- first production Pattern/Ritual Circuit;
- stabilized-fold shortcut.

### Preserved Basin

Stable route:

`anomaly.route.preserved-basin`

Requires at least one:

- preserved Farm sample capability;
- Farm `sample-preserved`;
- Farm `school-research-ready`.

Relevant equipment/capability hooks:

- `preserved_farm_sample`
- `preserve_specimen`
- `merchant_handle_samples`

Produced D38 seams:

- `activity.anomalous-reach.result.sample-secured`
- `activity.anomalous-reach.mark.preservation`

### Old Boundary Rift

Stable route:

`anomaly.route.old-boundary-rift`

Season edge:

- autumn;
- winter.

Access requires one:

- `enter_old_boundary`;
- Arcana paid lessons >=3;
- Arcana Night Study sessions >=3.

Every Rift-specific option repeats both the season and access gates. This prevents the v12 generic option model from opening a closed route through a route-specific challenge button.

Relevant preparation:

- Old Boundary Token;
- advanced Arcana;
- Undead Farm research readiness;
- accepted Farm Keeper request.

## Pattern / Ritual Circuit

Stable mini-game family instance:

`anomaly.pattern-ritual-circuit`

This is the first production implementation of D36 **Pattern / Ritual Circuit**.

It is not Tracking Triangulation and does not use either Tracking game ID.

State shape:

- `start -> observed`
- `observed -> aligned`
- `aligned -> terminal`

Player decisions include:

- observe without touching;
- trace symmetry through Reason/Literacy;
- Arcana inversion with an explicit risk tradeoff;
- resolve the aligned circuit;
- force an unresolved circuit;
- abort.

Terminal outcomes:

- success;
- failure;
- abort.

Successful mini-game fact:

`anomalous.reach.ritual-circuit-resolved`

Stable D38 mini-game seam:

`activity.anomalous-reach.minigame.pattern-ritual-complete`

Failure fact:

`anomalous.reach.ritual-circuit-fractured`

Mini-game success does **not** auto-complete the regional Activity.

## Information / risk decision

Stable option:

`anomaly.ritual.arcana-inversion`

Requires stronger research preparation:

- Farm `school-research-ready`; or
- Arcana paid lessons >=2; or
- Arcana Night Study sessions >=2.

Exact tradeoff:

- +1 regional progress;
- -2 internal Endurance;
- -1 Field Time.

This is an information-backed tactical decision rather than a single binary stat check.

A second risk decision exists on Old Boundary Rift:

`anomaly.challenge.rift-risk`

Exact tradeoff:

- +2 progress;
- -3 Endurance;
- -1 Field Time.

It requires prior research information.

## Shortcut

Stable option:

`anomaly.shortcut.stabilized-fold`

Requires successful Pattern/Ritual Circuit.

Effect:

- +3 regional progress;
- -1 Field Time;
- publishes Pathfinder marker:

`activity.anomalous-reach.mark.pathfinder`

A prepared Echo Ridge path can resolve the anchor in one six-segment entry:

`route -> observe -> align -> resolve -> shortcut -> continue`

Thus the region remains well inside the <=3 successful-entry D36 pacing target.

## City preparation -> Activity

v14 reuses existing shipped systems.

School:

- Arcana;
- Literacy & Numbers.

Undead Farm:

- `school-research-ready`;
- `sample-preserved`;
- preserved Farm specimen production.

Existing item capabilities:

- `preserved_farm_sample`;
- `preserve_specimen`;
- `merchant_handle_samples`;
- `enter_old_boundary`.

No new item definition was needed.

## Activity -> city / career / School / contact

New pack:

`content/packs/anomalous-reach-production.json`

### City

Successful return may publish:

`anomalous.reach.city-return-recorded`

### Undead Farm

If the Farm career state exists, the return can publish:

`anomalous-reach-returned`

This is additive and does not auto-select an advanced Farm ending.

### School

Existing Arcana participation can publish:

`anomalous.reach.school-reflection-recorded`

This does not:

- add a lesson;
- change School counters;
- grant stats;
- change tuition;
- create a certificate.

### Keeper contact / Network

Existing relationship:

`undead-farm.keeper`

Rift contact requires:

- Keeper `request-resolved`;
- request response = accepted.

Field contact seam:

`activity.anomalous-reach.contact-thread-open`

After a successful regional return, the player may explicitly share it with the Keeper.

That publishes:

- relationship fact:
  `anomalous-reach-return-shared`
- D38 Network marker:
  `activity.anomalous-reach.mark.network`

Network classification therefore requires a real existing contact thread; it is not granted by route traversal alone.

## Preservation / research-grade seams

Secured sample result:

`activity.anomalous-reach.result.sample-secured`

Preservation marker:

`activity.anomalous-reach.mark.preservation`

Research-grade result candidate requires all of:

- secured Anomalous Reach regional anchor;
- secured sample;
- completed Pattern/Ritual Circuit.

Then the feedback pack may publish:

`activity.anomalous-reach.result.research-grade`

No D38 ending is implemented or auto-committed by v14.

## D38 boundary after Region 3

After v14 the project has production candidates for:

1. Forest Frontier;
2. Trade Corridor;
3. Anomalous Reach.

This means the future D38 common 3/4 anchor baseline can now become structurally satisfiable.

However, on v14:

- no `ending.activity.*` definition exists;
- no current ending consumes any `activity.anomalous-reach.*` marker;
- no marker auto-commits an ending.

v14 therefore provides the required typed seams without implementing the final standalone Activity ending producer.

## UI

Anomalous Reach is added to Explore beside:

- Forest Frontier;
- Trade Corridor;
- Hunter Expedition.

The accepted generic Activity checkpoint/readout from v12/v13 is reused.

No dedicated final art or lore naming is locked here.

## Compatibility

Exact machine comparison against frozen v13 confirms unchanged:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- `lumber.forest` definition
- `trade.corridor` definition
- Forest production feedback pack
- Trade production feedback pack

v14 is additive content/UI/test work only.

## Palace / Night / Secret Debt boundaries

Anomalous Reach production content does not read or write:

- `palace.access-granted`;
- `palace.d23-qualified`;
- Secret Debt state;
- lender state;
- NightFlow state;
- universal Activity XP.

Entry cost remains exactly 2 global Energy.

No Activity item/capability becomes a Palace substitute.

## Focused tests

Added:

`tests/anomalous-reach-production-v14.test.ts`

Coverage includes:

- exact region config;
- Year-2 plus preparation entry gate;
- Explore playability;
- 2-Energy entry exactly once;
- Field Time save/reload;
- Pattern/Ritual staged state;
- mid-mini-game deterministic reload;
- mini-game success / failure / abort;
- no mini-game auto-completion;
- Arcana information/risk tradeoff;
- Preserved Basin anti-bypass gating;
- preservation/sample capability hooks;
- Old Boundary Rift season gating;
- Old Boundary Rift access anti-bypass gating;
- Keeper contact;
- Network marker;
- Undead Farm feedback;
- Arcana feedback with unchanged lesson count;
- research-grade result candidate;
- Forest v12 compatibility;
- Trade v13 compatibility;
- no Activity ending implementation;
- Palace / Secret Debt / NightFlow / Activity-XP firewalls.

## Machine audits performed through GitHub connector

### Typed content audit

Result:

- **111 / 111 PASS**
- **0 failures**

Checks include:

- event namespace;
- fallback variants;
- free event exits;
- known Activity/result references;
- declared career reads/writes;
- declared relationship reads/writes;
- declared School-track reads;
- declared worldFact reads/writes;
- known item capabilities;
- Pattern/Ritual start transition;
- success / failure / abort terminals;
- unique route option/result identities;
- Basin gate parity;
- Rift season parity;
- Rift access parity.

### D36 / compatibility preflight

Result:

- **47 / 47 PASS**
- **0 failures**

Checks include:

- exact Forest preservation;
- exact Trade preservation;
- shared runtime preservation;
- three route contexts;
- Year-2 identity;
- shortcut;
- information/risk choice;
- equipment/capability hooks;
- Field Time;
- 2-Energy entry;
- Pattern/Ritual distinction from Tracking;
- D38 marker seams;
- city/career/School/contact feedback;
- current ending firewall;
- Palace / Secret Debt / Night firewalls.

## Executable QA status

No full CI was initiated.

The GitHub connector available to Chat 3 does not provide a shell/command runner for this private branch.

Therefore v14 does **not** claim execution of:

- `npm run typecheck`;
- `npm run validate`;
- `npm run build`;
- Node test runner;
- Forest v12 executable regressions;
- Trade Corridor v13 executable regressions.

Those focused commands remain the Chat 2 assembly gate.

No PR/full-CI budget was consumed by Chat 3.

## Remaining D36 regional seam

After v14 the missing intended 1.0 region is:

**Restricted Sites Network**

That later region owns production Infiltration/Suspicion.

v14 does not implement that family and does not create universal combat.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
