# School Balance Simulation Scenario Template v1

Status: future balance-simulation template.
Rule: preserve locked School mechanics and leave all unresolved milestone/provider thresholds OPEN.

## Locked simulation inputs

Use current locked School mechanics unless a separate approved balance task changes them:
- eight paid courses;
- exact tuition values;
- exact paid stat packages;
- exactly 1 current-day Energy per paid lesson;
- no ordinary Lust mutation;
- Night tuition 0;
- Night current-day Energy 0;
- Night supported stat +2;
- Night next-day Energy -1;
- one Night slot;
- paid `lessons_completed +1`;
- Night `night_study_sessions +1`;
- no paid/Night counter cross-write.

Do not fill OPEN management/accounting, Arcana/Forest, certificate, project or exam thresholds in simulation data unless Product has approved them.

## Shared measurable outputs

Every scenario should capture:
- day reached;
- total money earned;
- total School tuition spent;
- paid School lesson count;
- Night-study count;
- current-day Energy spent on School;
- next-day Energy penalties from Night study;
- per-track lesson counts;
- per-track Night-study counts;
- final 12 progression stats;
- number of days where School was unaffordable;
- number of days where School was affordable but Energy-blocked;
- number of days where Night study was available/used;
- number of course switches;
- housing pressure;
- ending/career progress retained independently;
- save/reload checkpoints exercised;
- any candidate authored threshold reached, if a Product-approved threshold exists;
- any softlock or forced-grind observation.

## Scenario A — Fresh-run School access

Purpose:
- measure how quickly each paid course becomes realistically reachable from a new run.

Starting state:
- standard fresh-run resources;
- no pre-seeded School progress;
- no artificial public facts;
- no Meta assistance unless the baseline run includes it.

Runs:
- one run per course as first intended School purchase;
- optional mixed sample that delays School in favor of basic economy.

Measure:
- earliest natural affordable day;
- money remaining after first lesson;
- Energy remaining;
- whether the next day remains playable;
- time to a second lesson;
- any course whose tuition creates disproportionate early lockout.

Acceptance use:
- economy reachability only.
- Do not infer a milestone threshold from the time-to-course result.

## Scenario B — Work + School economy

Purpose:
- measure sustainable paid School attendance while maintaining ordinary career income.

Inputs:
- representative ordinary career income path;
- locked School tuition;
- one paid lesson per chosen School day.

Variants:
- low-income cadence;
- median-income cadence;
- higher-income cadence.

Measure:
- lessons per 10-day window;
- money floor;
- Energy floor;
- days sacrificed to income generation;
- whether School causes a dead-end economy state;
- whether career progress remains possible.

Acceptance:
- School should be a meaningful cost without creating an unavoidable softlock.
- Exact economy targets remain Product/balance decisions.

## Scenario C — Repeated single-track investment

Purpose:
- understand progression pace when the player repeatedly invests in one track.

Choose each track independently.

Measure:
- lessons required to reach representative stat bands;
- total tuition;
- total paid Energy;
- elapsed days;
- marginal effect of repeated package gains;
- interaction with any Product-approved milestone threshold.

Important:
- if no milestone threshold is approved, report progress only.
- Do not invent one for simulation convenience.

## Scenario D — Mixed-track build correction

Purpose:
- measure how School can correct or diversify an existing build.

Example simulation shapes:
- low Reason build adding Literacy & Numbers;
- low Magic build adding Arcana;
- social build adding Rhetoric/Etiquette;
- physical build adding Physical Training/Field Craft;
- performance build adding Arts & Performance;
- grooming/body build adding Body Confidence.

Measure:
- number of lessons to reach chosen stat target;
- money/Energy cost;
- opportunity cost vs single-track investment;
- whether course switching causes unexpected progression leakage;
- whether own-track counters remain isolated.

Target stat bands are simulation inputs, not Product locks.

## Scenario E — Night-study usage

Purpose:
- measure the trade between free tuition and next-day Energy penalty.

Variants:
- no Night study;
- occasional Night study;
- frequent Night study;
- Night study following a paid School day;
- Night study during low-money periods.

Measure:
- total +2 Night gains;
- next-day Energy lost;
- effect on next-day career/School availability;
- total Night-study sessions;
- paid lesson count;
- money conserved;
- any sequence that creates a practical softlock.

Locked:
- no tuition;
- no current-day Energy cost;
- next-day Energy -1;
- only supported stats;
- one Night slot.

## Scenario F — Poverty pressure

Purpose:
- measure School usability under low-money/housing pressure without changing Secret Debt or poverty mechanics.

Inputs:
- low money;
- variable lodging pressure;
- ordinary career income constraints.

Measure:
- days School is unaffordable;
- whether ordinary non-School actions remain available after a rejected lesson;
- time to recover enough money;
- frequency of Night study as substitute;
- next-day Energy pressure;
- whether housing and School combine into an accidental no-action state.

Do not create a School dependency for Secret Debt.

## Scenario G — Meta-assisted later life

Purpose:
- measure whether later-life Meta advantages make School trivially cheap or appropriately more accessible.

Inputs:
- approved Meta starting advantages only;
- no synthetic School milestone/public fact;
- standard locked School tuition/stat packages.

Measure:
- first lesson day;
- total School spend;
- lessons per season/window;
- opportunity cost relative to career progression;
- whether Meta benefit compresses School progression excessively;
- whether authored later-life School content remains reachable.

Meta must not automatically grant private School counters unless explicitly authored.

## Threshold sensitivity protocol

Use only after Product approves a threshold.

For each approved numeric threshold:
- simulate threshold -1;
- threshold exactly;
- threshold +1;
- natural path from zero progress;
- save/reload immediately before crossing;
- save/reload immediately after publication.

Report:
- time/cost to reach;
- publication exactly-once;
- downstream consumer response;
- any excessive grind;
- any accidental trivialization.

Never run this protocol with a guessed management/accounting or Arcana/Forest threshold and then treat the guessed number as authority.

## Simulation record template

- Scenario ID: OPEN
- Build/start state: OPEN
- Career/economy assumptions: OPEN
- Track(s): OPEN
- Locked School data version: OPEN
- Product-approved threshold(s): OPEN / NONE
- Random seed policy: OPEN
- Number of runs: OPEN
- Save/reload checkpoints: OPEN
- Measured outputs: OPEN
- Observed softlock risk: OPEN
- Balance concern: OPEN
- Recommended follow-up question: OPEN
- Runtime defect observed: OPEN
- Product decision required: OPEN

## Change classification after simulation

If a problem is found, classify it before changing anything:

- **BALANCE_DATA** — approved tuning of tuition/stat/threshold data;
- **CONTENT_AUTHORING** — missing milestone/copy/provider/consumer;
- **QA** — missing regression/coverage;
- **RUNTIME** — concrete missing primitive proven by failing integration test.

Do not turn an authoring decision into a runtime change by default.
