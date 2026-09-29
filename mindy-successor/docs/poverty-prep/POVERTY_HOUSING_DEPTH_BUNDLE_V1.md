# Poverty Housing Depth Bundle v1

Status: C3-07 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.
Dependency candidate: PR #67 exact head `b6d1a451b9f729aa7e3534bf4a928961c7eee134`.
Fixture: `prior-work/astra/prototype-m3.2/content/poverty-housing-depth-v1.fixture.json`.

Secret Debt is out of scope.

## Why this is incremental

PR #67 already contains the validated ordinary-poverty depth candidate. C3-07 does not copy or rebuild it.

Within the current housing event families there are:
- 9 street event/variant pairs;
- 5 cheap/shared-room event/variant pairs;
- 14 total housing event/variant pairs.

PR #67 already supplies depth candidates for:
- 6 of 9 street pairs;
- all 5 of 5 shared-room pairs.

Its three housing core-fallback-only pairs are exactly:
- `poverty-street-production.neutral-autumn / default`;
- `poverty-street-production-v2.neutral-autumn-crossing / drizzle`;
- `poverty-street-production-v2.neutral-autumn-crossing / dry-arcade`.

C3-07 adds one presentation-depth candidate for each of those three existing pairs.

If Lead selectively consumes PR #67 plus C3-07, housing event depth becomes:
- street: 9/9 mapped;
- shared-room: 5/5 mapped;
- total housing event pairs: 14/14 mapped.

Core event text remains the fallback in every case.

## New street depth keys

### Neutral autumn / default

Existing gameplay identity:
- event `poverty-street-production.neutral-autumn`;
- variant `default`;
- presentation `location/town/event/poverty-street-production-neutral-autumn/default`.

New localization candidate:
`presentation.poverty.depth.poverty-street-production-neutral-autumn.default.a.text`.

RU:
`К вечеру камень под навесом высыхает первым. За закрытыми ставнями больше не слышно торговли; у стены остаётся только ровная полоса сухого места.`

EN:
`By evening, the stone beneath the awning dries first. There is no market noise behind the closed shutters now; only a narrow strip of dry ground remains along the wall.`

### Neutral autumn crossing / drizzle

Existing gameplay identity:
- event `poverty-street-production-v2.neutral-autumn-crossing`;
- variant `drizzle`;
- presentation `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`.

New localization candidate:
`presentation.poverty.depth.poverty-street-production-v2-neutral-autumn-crossing.drizzle.a.text`.

RU:
`Редкая морось собирает поздних прохожих под аркадой. Они проходят дальше один за другим, оставляя мокрые следы и ненадолго разделяя с тобой сухое место.`

EN:
`A light drizzle gathers late pedestrians beneath the arcade. They move on one by one, leaving wet footprints and briefly sharing the dry space with you.`

### Neutral autumn crossing / dry arcade

Existing gameplay identity:
- event `poverty-street-production-v2.neutral-autumn-crossing`;
- variant `dry-arcade`;
- presentation `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade`.

New localization candidate:
`presentation.poverty.depth.poverty-street-production-v2-neutral-autumn-crossing.dry-arcade.b.text`.

RU:
`Сегодня под аркадой сухо и непривычно тихо. Закрытые лавки не требуют ничего, шаги быстро стихают, и этот угол на время становится просто местом для отдыха.`

EN:
`Tonight the arcade is dry and unusually quiet. The closed shops ask nothing of you, footsteps fade quickly, and for a while the corner is simply a place to rest.`

## Shared-room depth

C3-07 does not duplicate the six shared-room depth strings already present in PR #67.

PR #67 already covers:
- `poverty-cheap-production.shared-quiet-autumn / default` with two candidates;
- `poverty-cheap-production-v2.shared-room-seasons / spring-window`;
- `... / summer-heat`;
- `... / winter-stove`;
- `... / shared-room`.

These remain the authoritative shared-room depth candidates for selective integration.

## NightFlow lodging identities

Current production lodging identities:
- `lodging.normal`;
- `lodging.cheap`;
- `lodging.street`.

C3-07 adds narrative candidates only for the two poverty-relevant choices:
- `lodging.street`;
- `lodging.cheap`.

New keys:
- `presentation.poverty.housing.lodging.street.context.text`;
- `presentation.poverty.housing.lodging.cheap.context.text`.

### Street lodging context

RU:
`Улица не требует платы за комнату, но это всё равно ночь без двери и крыши. К утру такой отдых оставляет меньше сил, даже если удаётся найти спокойный угол.`

EN:
`The street charges no room fee, but it is still a night without a door or roof. By morning, that kind of rest leaves less strength even when you find a quiet corner.`

The text mirrors the existing current-main street-lodging pressure without naming or changing a balance number.

### Cheap lodging context

RU:
`Дешёвая комната тесная и общая, зато здесь есть крыша, закрывающаяся дверь и сухое место на ночь. Цена и последствия остаются теми, что уже показывает выбор ночлега.`

EN:
`The cheap room is cramped and shared, but it offers a roof, a closing door, and a dry place for the night. Its price and consequences remain exactly what the lodging choice already shows.`

The text intentionally leaves price and effects authoritative to the existing lodging definition/UI.

## Lodging mechanics are unchanged

Current definitions remain authoritative. C3-07 does not modify:
- any `moneyCost`;
- any `nextDayEnergyDelta`;
- any lodging effect or next-day effect;
- housing assignment;
- eligibility;
- payment timing.

The ordinary-poverty street/cheap context events remain at the existing NightFlow `after_lodging` reaction boundary and keep their current `nightPolicy`.

C3-07 changes no:
- `suppressLodgingPayment`;
- `suppressVoluntaryMenu`;
- `consumesNight`;
- NightFlow phase;
- calendar advancement behavior.

## Existing cheap-lodging static localization

Current localization already contains:
- `presentation.static.poverty.cheap-lodging.alt`;
- `presentation.static.poverty.cheap-lodging.caption`.

On the audited current main, `content/presentation.json` has no dedicated cheap-lodging slot consuming those keys; LodgingResolution currently renders the generic `night/lodging/default` presentation.

Chat 3 does not add or reroute media/presentation slots. That remains shared presentation/integration territory and must not be confused with the new text-only lodging context candidates.

## Consumer seams

### Event depth

Use the same shared pending-scene presentation/localization seam already handed off for PR #67.

For the three newly mapped event/variant pairs, extend the PR #67 lookup with exactly the three keys in this bundle.

Selection must remain presentation-only and must preserve:
- gameplay variant selection;
- event-history semantics;
- core text fallback;
- Save identity;
- Journal identity;
- gameplay RNG.

Chat 3 does not implement the consumer.

### Lodging context

Current `src/ui/app.ts` LodgingResolution already iterates each lodging with:
- `lodging.id`;
- `lodging.moneyCost`;
- `lodging.nextDayEnergyDelta`.

An integration owner may optionally resolve a narrative context key from the lodging ID and display it beside the existing authoritative price/delta UI.

Safe fallback:
if the context localization key is absent, render the current lodging choice unchanged.

No lodging mechanic is gated by these strings.

## Collision check

The five C3-07 proposed keys are:
- absent from current main localization;
- absent from PR #67's 26-key depth fixture.

Therefore C3-07 is additive to both current main and the frozen PR #67 candidate.

## C3-07 disposition

Ready:
- three incremental street-depth RU/EN candidates;
- two lodging-context RU/EN candidates;
- exact current identity mappings;
- PR #67 dependency and no-duplication rule;
- shared consumer seams and fallbacks.

Dependency:
- event-depth selection is the same Chat 1 / Lead shared presentation consumer already required by PR #67;
- lodging-context display is optional shared UI work for Chat 1 / Lead.

No ordinary-poverty mechanics are changed.
