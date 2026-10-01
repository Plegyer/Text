# Chat 3 — Tavern Live Authored Content v15 Inventory

C3-157 baseline: current `main` exact head `778494d2d2bcefdfa714630e01a0331c570d7d94`.

## Shipped Tavern surfaces

The current repository exposes two different Tavern surfaces that must not be conflated.

The legacy demo surface uses action `tavern`, action `tavern-talk`, and the production `gopher` pack. Its Tavern events are:
- `gopher.tavern-intro` — one default variant;
- `gopher.tavern-quest` — one default variant;
- `gopher.tavern-resolution` — one default variant;
- `gopher.tavern-routine` — spring/summer/autumn/winter/default variants.

That legacy chain writes old flags such as `tavern.met`, `tavern.quest`, `tavern.resolved`, `tavern.guild`, and `tavern.prince`. It feeds the legacy endings `tavern-stay`, `tavern-guild`, and `tavern-court`. C3-158..167 must not reuse those legacy flags as substitutes for the new C1D-121 typed Tavern runtime contract unless Chat 1 explicitly maps them.

The newer late-career skeleton uses `tavern.shift` and typed career `tavern`. On this baseline the career has only stage `new-hand` and no transitions. The shift costs 1 Energy, increments `tavern.completed_shifts`, uses the existing approved stat/year unlock, and keeps the current wage/seasonal tuning. It has only four generic authored scene stubs:
- `spring.default`: “Spring tavern shift: the season changes the ordinary work context.”;
- `summer.default`: generic demand/routes/crowds wording;
- `autumn.default`: generic seasonal-pressure wording;
- `winter.default`: generic scarcity/access/regular-client wording.

The spring scene currently has an empty condition list while the other three use `calendarSeason`. Chat 3 will not alter resolver mechanics or shift conditions; C1D-123 owns the runtime/variant contract and should determine the exact stable consumption surface.

The typed Hard Work ending `ending.tavern.hard-work` is live and preserves the shared ordinary-career 50-shift contract and reward identifier `hardWork:tavern`.

## Presentation already shipped

The late-career presentation manifest has exactly five Tavern job slots:
- `job/tavern/shift/spring/default`;
- `job/tavern/shift/summer/default`;
- `job/tavern/shift/autumn/default`;
- `job/tavern/shift/winter/default`;
- `job/tavern/result/default`.

All five have static assets and RU/EN alt/caption localization. Existing ending presentation also covers `tavern-stay`, `tavern-guild`, `tavern-court`, and `ending/tavern/hard-work`.

Presentation coverage therefore exists for the current skeleton, but authored semantic breadth does not: there are no shipped live presentation/content identities yet for rooms/confidentiality, rumor/evidence, the new role-based Tavern relationship chain, housing/poverty bridge, Activity return, or Innkeeper/Broker/Sanctuary solution families.

## Prep-only material that does not count as production

`school-tavern-preparation-v1.fixture.json` and the Tavern portion of `school-tavern-hunter-reactive-depth-v1.fixture.json` are explicitly `CONTENT_PREP_ONLY`. They contain useful bilingual copy for:
- Rhetoric & Social — guest conflict/information handling;
- Literacy & Numbers — tabs, stock notes, shift handoff;
- Etiquette & Presentation — high-status travelers/formal service;
- Arcana — strange objects/claims/rumours.

Those fixtures intentionally publish no career facts, thresholds, or runtime writes. C3-158..167 may reuse tone/subject matter, but live variants must consume the exact C1D-121/C1D-127 IDs once published.

## Exact production gaps for v15

C3-158 Spring: no live new-career authored variants for reopening roads, repairs, fresh travelers, or early caravans.

C3-159 Summer: no live new-career variants distinguishing high transit, room demand, expedition guests, or occupancy pressure.

C3-160 Autumn: no live new-career variants distinguishing trade peak, hunters, festival guests, or supply pressure.

C3-161 Winter: no live new-career variants for scarcity, stranded guests, or road crisis. No new prices/numbers should be invented by Chat 3.

C3-162 Rooms/confidentiality: no shipped new-career content currently consumes a staff room-access capability, guest-room fact, confidentiality choice, or corresponding relationship state.

C3-163 Rumour/information: the legacy receipt quest uses old flags, but there is no shipped typed new-career rumour/evidence/ledger authored flow. Chat 3 must not create a parallel information currency.

C3-164 Relationships: there is no shipped Tavern-specific role relationship in `definitions.relationships`. The only matching recurring-guest relationship today belongs to Satyr Maid and must not be repurposed. New authored copy must wait for the exact Tavern role ID/facts from C1D-121.

C3-165 Housing/poverty bridge: current Tavern content does not consume normal/cheap/street housing state through a Tavern-specific typed hook. Legacy room flavour and ordinary-poverty packs are separate systems. Chat 3 must not create universal free lodging or Secret Debt.

C3-166 Activity return: the legacy Gopher receipt path is not the new Tavern Activity-return seam. No stable new-career Activity-return ID/fact is published on this baseline.

C3-167 Outcome/crisis depth: the new typed Tavern career has no published Innkeeper/Broker/Sanctuary solution facts or outcome-ready stages on this baseline. Existing legacy endings and `ending.tavern.hard-work` must keep their IDs/reward contracts; authored outcome copy waits for Chat 1's mapping.

## Dependency boundary

C3-157 is complete on this baseline. C3-158..167 require the published Chat 1 C1D-121 runtime contract before live IDs can be authored safely. At the time of this inventory, no C1D-121 contract file, Tavern v12 branch, or Tavern v12 PR is visible through the repository connection.

Chat 3 will not invent competing stage, relationship, Night, School-hook, capability, Activity-return, crisis, or outcome IDs while that dependency is absent.
