# Poverty Bilingual Presentation Inventory v1

Authority:
- PR #37 ordinary-poverty production is merged;
- this inventory covers current ordinary poverty only;
- Secret Debt remains a separate hidden-career/content stream.

Product localization rule:
- RU source authoring;
- EN full second locale;
- one gameplay event/variant identity;
- one semantic presentationId;
- locale changes text only.

## 1. Current production event surfaces

| Family | Gameplay event ID | Variant | Semantic presentationId | Current static fallback | RU+EN requirement |
| --- | --- | --- | --- | --- | --- |
| street/helpful | `poverty-street-production.helpful-summer` | `default` | `location/town/event/poverty-street-production-helpful-summer/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| street/neutral | `poverty-street-production.neutral-autumn` | `default` | `location/town/event/poverty-street-production-neutral-autumn/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| street/pressure | `poverty-street-production.pressure-winter` | `default` | `location/town/event/poverty-street-production-pressure-winter/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| cheap lodging | `poverty-cheap-production.shared-quiet-autumn` | `default` | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | assets/stage-room.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| recovery/help | `poverty-recovery-production.small-coin-help` | `default` | `location/town/event/poverty-recovery-production-small-coin-help/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| recovery/help | `poverty-recovery-production.short-cleanup` | `default` | `location/town/event/poverty-recovery-production-short-cleanup/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| recovery/help | `poverty-recovery-production.herb-bundle` | `default` | `location/town/event/poverty-recovery-production-herb-bundle/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| pressure/bad-luck | `poverty-pressure-production.cold-rain` | `default` | `location/town/event/poverty-pressure-production-cold-rain/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| pressure/bad-luck | `poverty-pressure-production.noisy-loading` | `default` | `location/town/event/poverty-pressure-production-noisy-loading/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |
| pressure/bad-luck | `poverty-pressure-production.muddy-splash` | `default` | `location/town/event/poverty-pressure-production-muddy-splash/default` | assets/stage-outside.svg | title/text/choices RU+EN; pool alt RU+EN; fallback alt RU+EN |


Total current production event+variant surfaces: **10**.

## 2. Player-facing text fields requiring RU + EN

For every current poverty event:
- event title;
- variant scene text;
- choice label;
- choice explanatory text;
- presentation caption if added;
- text fallback;
- GIF/image alt;
- static fallback alt.

Do not localize or duplicate:
- event ID;
- variant ID;
- choice ID;
- effect kind;
- resource/stat/item ID;
- cooldown/max-show logic;
- semantic presentationId;
- media path;
- candidate stable key.

## 3. Street content

Current production street families:
- helpful summer;
- neutral autumn;
- pressure winter.

Each event already owns its gameplay meaning and choices.

RU/EN text must preserve the same:
- offered choice set;
- outcome uncertainty/certainty;
- neutral/helpful/pressure meaning.

Translation must not create a different gameplay interpretation.

Example policy:
if RU source describes an optional paid errand, EN must also clearly remain optional and must not imply that payment has already been accepted.

## 4. Cheap lodging

Current production event:

`poverty-cheap-production.shared-quiet-autumn`

Semantic presentationId:

`location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

Required RU+EN:
- title;
- shared-room scene text;
- continue/settle choice text;
- 3–5 candidate alt if a pool is added;
- static room fallback alt.

Media file remains shared:
`assets/stage-room.svg`.

## 5. Recovery / help

Current production events:
- `poverty-recovery-production.small-coin-help`;
- `poverty-recovery-production.short-cleanup`;
- `poverty-recovery-production.herb-bundle`.

Required localization must preserve:
- optionality;
- ordinary-help framing;
- whether a choice grants money/item;
- whether declining has no extra effect.

Do not put reward amounts or item grants into media alt unless visibly necessary; gameplay text/choice semantics remain authoritative.

## 6. Pressure / bad-luck

Current production events:
- `poverty-pressure-production.cold-rain`;
- `poverty-pressure-production.noisy-loading`;
- `poverty-pressure-production.muddy-splash`.

RU/EN must preserve:
- safe option wording;
- risky/less comfortable option wording;
- whether a next-day penalty exists;
- no stronger or weaker promise in one locale.

Alt text should describe visible rain/carts/mud/context, not hidden Energy/grooming modifiers.

## 7. Multi-GIF pool localization

Each of the 10 semantic surfaces may receive 3–5 GIF candidates.

Every candidate needs:
- one locale-neutral stable key;
- one locale-neutral media path;
- `alt.ru`;
- `alt.en`.

If captions are used:
- `caption.ru`;
- `caption.en`.

Candidate selection must be identical for RU and EN for the same occurrence.

Locale does not participate in the selector seed.

## 8. Static fallback localization

Current fallback families:
- street/recovery/pressure -> `assets/stage-outside.svg`;
- cheap lodging -> `assets/stage-room.svg`.

Do not duplicate static files by locale.

Instead localize the semantic mapping:
- fallback alt RU;
- fallback alt EN;
- text fallback RU;
- text fallback EN.

## 9. Shared rest / street-sleep boundary

Current generic rest action/presentation remains broader than a dedicated street-sleep semantic identity.

If player-facing rest/lodging text is shown there, it also requires RU + EN.

Do not create a new locale-specific street-sleep ID.

If Product later authors a dedicated street-sleep semantic identity, it receives one shared identity plus RU/EN presentation text.

## 10. Secret Debt firewall

This inventory does **not** authorize or localize as production authority:
- lender offer;
- debt activation;
- hidden Slave career work;
- forced Secret Debt Night;
- Secret Debt outcomes.

Those remain STAGED until their authored content is explicitly integrated.

When they become authoritative:
- use one shared gameplay identity;
- one shared presentationId;
- RU source + EN localization;
- shared media pool with RU/EN alt.

## 11. Migration status

PR37 content contains player-facing English production text.

Under the new Product rule:
- do not rewrite PR37 blindly in this worker branch;
- inventory it for reviewed RU-source localization;
- preserve current English as material for EN review;
- keep all gameplay IDs/effects unchanged.

## 12. Acceptance

Ordinary-poverty bilingual presentation is complete when:
1. all 10 production event surfaces have RU + EN player-facing text;
2. every choice label/text has RU + EN;
3. every pool candidate has RU + EN alt;
4. static/text fallbacks have RU + EN;
5. locale switch does not change event/variant/choice state;
6. locale switch does not reroll the selected GIF;
7. Secret Debt remains separate unless explicitly authored.
