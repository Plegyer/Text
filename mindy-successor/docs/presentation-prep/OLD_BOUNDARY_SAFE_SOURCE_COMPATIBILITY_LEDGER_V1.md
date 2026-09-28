# Old-Boundary Safe Source Compatibility Ledger v1

Current-main baseline checked during this queue:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Safe static source:
`prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary-safe-v1.svg`.

Existing safe route-static reference:
`prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary-v3.svg`.

Accessibility candidate:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-static-localization-v4.json`.

Exact semantic identity:
`activity/forest/route/old-boundary`.

## Static semantic compatibility

Both safe static sources describe the same narrow old boundary route using:
- weathered stones;
- moss/low vegetation;
- old markings;
- a narrow stony path / boundary line.

Neither safe source encodes:
- constructed entrance;
- token/key;
- Hunter identity;
- challenge;
- reward;
- success/failure;
- hidden result;
- magic cue.

`forest-route-old-boundary-safe-v1.svg` is therefore compatible with the existing route-static accessibility wording:

Alt RU:
`Узкая старая межевая тропа проходит между выветренными камнями и старыми отметинами.`

Alt EN:
`A narrow old boundary path runs between weathered stones and old markings.`

Caption RU:
`Старая межевая тропа идёт вдоль линии камней.`

Caption EN:
`The old boundary path follows a line of stones.`

No wording expansion is required for the corrected safe source.

## Animation source compatibility

### Sequence A
`forest-route-old-boundary-safe-loop-a`

Motion:
- soft light drift;
- small leaves;
- low mist.

Static meaning preserved:
**YES**.

### Sequence B
`forest-route-old-boundary-safe-loop-b`

Motion:
- low grass movement;
- minor old-mark shift caused by camera/ambient drift;
- small path drift.

Static meaning preserved:
**YES**.

### Sequence C
`forest-route-old-boundary-safe-loop-c`

Motion:
- subtle ambient light;
- small leaves;
- low mist drift.

Static meaning preserved:
**YES**.

## Source-frame constraints

All A/B/C sequences:
- exact semantic presentation ID:
  `activity/forest/route/old-boundary`;
- 4 ordered SVG frames;
- project-owned local source;
- no external resources/scripts;
- no gameplay/RNG/Save metadata;
- no route-result semantics;
- no locale-specific source duplication.

## Accessibility compatibility

The existing normalized keys remain appropriate:
- `presentation.static.forest.route.old-boundary.alt`;
- `presentation.static.forest.route.old-boundary.caption`.

Future GIF candidate alt/caption may reuse the same route-level visible facts while distinguishing only motion when needed.

Locale changes must not select a different source sequence.

## Product boundary

This ledger makes no inference about:
- route eligibility;
- route unlock state;
- Activity progress;
- item capability;
- Hunter/token mechanics;
- reward/effect;
- result resolution.

Those remain outside Chat 2 media ownership.

## Classification

| Source | Classification | Note |
| --- | --- | --- |
| `forest-route-old-boundary-safe-v1.svg` | **SAFE_STATIC_READY** | Corrected safe static source. |
| `forest-route-old-boundary-safe-loop-a` | **ANIMATION_SOURCE_READY** | Compatible with safe static semantics. |
| `forest-route-old-boundary-safe-loop-b` | **ANIMATION_SOURCE_READY** | Compatible and visually distinct from A. |
| `forest-route-old-boundary-safe-loop-c` | **ANIMATION_SOURCE_READY** | Compatible and visually distinct from A/B. |

Production GIF claim:
**NONE**.
