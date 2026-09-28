# Forest Route Static Accessibility Review v1

Scope:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Localization source:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-static-localization-v4.json`.

Goal:
keep RU+EN alt/caption concise, descriptive, locale-consistent and non-spoilery.

## Logging road

Alt key:

`presentation.static.forest.route.logging-road.alt`

RU:
`Широкая лесовозная дорога с колеями, срезанными ветками и обычными следами лесных работ.`

EN:
`A broad logging road with wheel ruts, cut branches, and ordinary signs of forest work.`

Review:
- clearly identifies broad road;
- names visible route-specific cues;
- does not imply success/failure;
- does not expose reward/effect;
- does not over-describe character state;
- suitable as image alt text.

Caption key:

`presentation.static.forest.route.logging-road.caption`

RU:
`Лесовозная дорога проходит через рабочую часть леса.`

EN:
`The logging road runs through the worked part of the forest.`

Review:
- shorter than alt;
- route-specific;
- no gameplay spoiler.

Status:
**ACCEPTABLE**.

## Old boundary

Alt key:

`presentation.static.forest.route.old-boundary.alt`

RU:
`Узкая старая межевая тропа проходит между выветренными камнями и старыми отметинами.`

EN:
`A narrow old boundary path runs between weathered stones and old markings.`

Review:
- communicates narrow path + old boundary markers;
- avoids language suggesting a constructed entrance;
- avoids hidden condition/item/result language;
- suitable as image alt text.

Caption key:

`presentation.static.forest.route.old-boundary.caption`

RU:
`Старая межевая тропа идёт вдоль линии камней.`

EN:
`The old boundary path follows a line of stones.`

Review:
- concise;
- visually grounded;
- no gameplay spoiler.

Status:
**ACCEPTABLE**.

## Locale parity

Both locale pairs preserve the same visible facts.

No locale version adds:
- route eligibility;
- item requirement;
- Hunter identity;
- challenge implication;
- reward/result;
- success/failure.

## Key grammar

Accepted normalized keys:

- `presentation.static.forest.route.logging-road.alt`
- `presentation.static.forest.route.logging-road.caption`
- `presentation.static.forest.route.old-boundary.alt`
- `presentation.static.forest.route.old-boundary.caption`

This extends the current shared key family:

`presentation.static.forest.route.default.alt|caption`.

## Result

Logging road:
**ACCESSIBILITY READY**.

Old boundary:
**ACCESSIBILITY READY**.

Wording changes required before selective integration:
**NO**.
