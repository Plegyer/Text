# Current Main Ordinary Night Content Inventory v1

Date: 2026-09-27
Status: Chat 5 current-main production audit
Scope: ordinary NightFlow surfaces and voluntary relationship Night only
Authority: current `main` at `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

Secret Debt / Slave forced-night content is explicitly out of scope here. This document records only the shared interception boundary needed to understand ordinary Night coexistence; it does not inventory, author, or change forced debt nights.

## SHIPPED

### Night lifecycle

The current target Night contract is a resumable flow rather than a single sleep command:

`EndDayRequested -> PreLodgingForcedCheck -> LodgingResolution -> PostLodgingForcedCheck -> VoluntaryNightChoice -> NightEventResolution -> NextDayModifiersFinalized -> CalendarAdvance -> StartDay`.

The runtime already preserves the important exactly-once boundaries:

- lodging payment is committed once;
- a voluntary choice is committed once;
- pending Night scenes survive save/reload;
- next-day modifiers are finalized before the next day starts;
- one completed Night advances the calendar once;
- daytime Energy is not charged merely for entering/resolving the voluntary Night menu.

### Root-loaded lodging surfaces

Current `content/definitions.json` ships three ordinary lodging definitions:

| ID | Housing context | Current root cost | Next-day Energy | Other next-day effect |
|---|---|---:|---:|---|
| `lodging.normal` | `normal` | 100 | 0 | none |
| `lodging.cheap` | `cheap` | 50 | 0 | none |
| `lodging.street` | `street` | 0 | -1 | Grooming -1 |

These are executable current-main values, not a Product lock on final economy numbers. `HOUSING_AND_NIGHT_BALANCE_v1.md` still treats exact economic tuning as candidate/open.

The UI exposes `LodgingResolution`, checks conditions and money, and then exposes the eligible voluntary Night choices. The current Night stage uses semantic presentation surfaces such as `night/lodging/default`, `night/choice/default`, and `night/default`.

### Voluntary relationship choice support

Current root definitions ship exactly one relationship-specific voluntary Night choice:

- choice ID: `lumber.foreman.night`
- player-facing fallback label: `Talk with the Foreman`
- condition: `relationshipStage(lumber.foreman, route-professional)`
- immediate effect: increment relationship-owned counter `night_meetings` by 1
- next-day effects: none
- next-day Energy delta: 0

This correctly follows the locked ordinary relationship-night model: the choice uses the Night slot, not daytime Energy, and has no universal next-day Energy penalty.

### Lumber Foreman Night event

Root-loaded `content/packs/lumber-night-production.json` ships:

- event `lumber-night.foreman-professional`;
- reaction trigger `nightChoiceCompleted(lumber.foreman.night)`;
- condition `relationshipStage=lumber.foreman.route-professional`;
- `nightPolicy.intercept = after_choice`;
- `suppressLodgingPayment = false`;
- `suppressVoluntaryMenu = true`;
- `consumesNight = true`;
- choice `continue`, which adds relationship fact `night-followup-complete`.

The event's semantic presentation identity is:

`relationship/lumber-foreman/lumber-night-foreman-professional/default`.

Its shipped media fallback is the static catalog media `relationship.lumber.foreman.night.professional` using `assets/stage-lumber.svg`.

### Night study boundary

Night study is a dependency boundary only for this workstream. Current root definitions include 24 School Night-study choices across the eight School courses/stat options.

Those choices:

- require `normal` or `cheap` housing;
- spend no current-day Energy;
- apply the selected stat gain and School-owned `night_study_sessions` counter;
- apply `nextDayEnergyDelta = -1`.

This is intentionally different from ordinary relationship Night. The School study penalty must not be generalized to Foreman or future voluntary relationship nights.

### Housing capability already available

The current condition language includes `housingTier`, and Night choices are already evaluated against ordinary conditions. Therefore an authored relationship Night can be gated by `normal`, `cheap`, or `street` context without adding a new relationship or Night runtime primitive.

The current shipped Foreman choice does **not** use a housing condition. Once the player has reached `route-professional`, its eligibility is currently independent of which shipped lodging was chosen.

### Forced-event interception boundary

The shared Night engine supports interception at:

- `before_lodging`;
- `after_lodging`;
- `after_choice`.

Night event policy can also specify whether to suppress lodging payment, suppress the voluntary menu, and consume the Night. This boundary is already sufficient for coexistence between ordinary voluntary content and separately owned forced content.

No Secret Debt event identity, trigger, balance value, penalty, or scene text is part of this inventory.

## STAGED

Nested target/acceptance material under `content/packs/lumber-target/` is not root-loaded by production `build.mjs`, which enumerates only top-level `content/packs/*.json`.

Relevant staged evidence includes:

- `content/packs/lumber-target/lumber-night-acceptance.pack.json`;
- `tests/lumber-night-acceptance.test.ts`.

The staged pack models the same `lumber-night.foreman-professional` behavior, but its media entry points at `assets/lumber/foreman-night-professional.gif`. That nested fixture is validation/staging evidence only. Its GIF path must not be called a shipped relationship asset.

The staged regression already proves useful contracts in isolation:

- relationship Night spends no daytime Energy;
- lodging is not charged twice across reload;
- pending Foreman Night reload does not duplicate `night_meetings`;
- the relationship fact is applied once;
- calendar advance occurs once after resolving the Night scene;
- Lumber Hard Work remains `completed_shifts >= 50`.

## PRODUCT_OPEN

Ordinary Night content depth remains much thinner than the shipped Night infrastructure. The following are authored/Product decisions, not runtime deficiencies:

- the broader ordinary relationship Night roster beyond `lumber.foreman`;
- which NPCs receive repeatable or milestone Night continuations;
- exact private/public variants by housing tier;
- whether the Foreman professional conversation should be unavailable on the street, replaced by a public walk, or remain universally available;
- cheap-lodging privacy substitutions;
- exact ordinary Night repeat/cooldown cadence;
- exact relationship counters or thresholds beyond the current `night_meetings` increment;
- final relationship-specific next-day consequences, if any; these must be explicit per scene rather than universal;
- final lodging/economy numbers;
- final relationship NPC names/identities and ending families;
- final media/GIF asset selection for relationship Night scenes.

The housing design candidate says normal lodging can support full private options, cheap lodging can reduce or replace private scenes, and street lodging should restrict ordinary private partner content. Current Foreman production does not yet encode that distinction. This is an authored content gap because `housingTier` conditions already exist.

## RUNTIME_GAP

No current-main evidence requires changes to the NightFlow engine for the ordinary relationship wave. The necessary lifecycle, housing condition, relationship counter/fact effects, reaction trigger, save/reload identity, and after-choice interception primitives are already present.

The shared presentation/localization layer does have bounded gaps relevant to authored ordinary Night content:

1. The voluntary Night-choice list currently renders `NightChoice.label` directly. It does not call a locale key resolver. Therefore the shipped `lumber.foreman.night` choice label stays the embedded English fallback even when RU is selected.
2. The generic voluntary-choice screen uses `night/choice/default`; there is no per-choice semantic presentation slot before selection. The subsequent Foreman event does have a relationship-specific semantic `presentationId`. A future Product requirement for distinct pre-selection media per Night option would need a shared presentation/UI extension owned by Lead.
3. Current relationship-specific Foreman Night title/body/choice/media-alt keys are absent from root `localization.json`. The generic pending-event renderer already knows how to resolve those keys, so this is chiefly localization content/integration debt rather than a Night engine gap.

Chat 5 should not modify those shared seams in this wave. Safe authored work can provide locale-neutral RU+EN keys/fixtures and relationship content for Lead to integrate selectively.

## Current ordinary Night production shape

The naturally reachable ordinary relationship path on current main is:

`Lumber professional relationship -> End Day -> choose lodging -> VoluntaryNightChoice -> lumber.foreman.night -> persisted Foreman event -> professional choice -> relationship fact -> exactly-once CalendarAdvance`.

The current housing choice can affect generic Night-study availability and street next-day penalties, but it does not yet alter Foreman Night availability.

The important separation is already executable:

- **relationship Night**: Night slot, 0 daytime Energy, current Foreman next-day Energy delta 0;
- **Night study**: Night slot, 0 daytime Energy, explicit next-day Energy -1;
- **street lodging**: housing consequence, explicit next-day Energy -1 and Grooming -1;
- **forced interception**: shared boundary only here; forced debt content remains out of scope.

## Locked no-regression boundaries

Any ordinary relationship Night content added after this inventory must preserve:

- voluntary relationship Night consumes the Night slot rather than daytime Energy;
- no universal next-day Energy penalty is inferred from relationship content;
- housing may gate availability/privacy through explicit content conditions;
- forced Secret Debt NightFlow remains separate;
- localization changes presentation only;
- relationship/gameplay IDs and Save identity remain locale-neutral;
- Lumber Hard Work remains only `completed_shifts >= 50`;
- exact Forest continuation remains the existing `activityResult`.
