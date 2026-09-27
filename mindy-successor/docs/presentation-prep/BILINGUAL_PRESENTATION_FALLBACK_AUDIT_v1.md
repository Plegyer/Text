# Bilingual Presentation Fallback Audit v1

Scope:
representative current-main presentation surfaces across careers, School and ordinary poverty after the RU+EN Product rule.

Current-state principle:
- current main player-facing production text is still largely monolingual/mixed;
- Chat 2 now has bilingual authoring material for representative surfaces;
- no localization runtime seam is assumed;
- gameplay remains locale-neutral.

## Status legend

- **MAIN_RU_PRESENT** — current main already has Russian player-facing text for the audited field.
- **MAIN_EN_PRESENT** — current main already has English player-facing text for the audited field.
- **WORKER_RU_EN_READY** — reviewed Chat 2 authoring contains both RU and EN for the representative presentation field.
- **PARTIAL_AUTHORING** — bilingual producer context/alt exists, but full production text migration is not yet complete.
- **LOCALIZATION_SEAM_REQUIRED** — data exists but runtime cannot yet select RU vs EN.
- **ALT_DEBT** — current production mapping does not yet expose bilingual alt.
- **CAPTION_DEBT** — current production mapping does not yet expose bilingual caption/text keys.

## Career audit

| Surface | Current-main text state | RU authoring | EN authoring | Safe fallback | Localization debt | Gameplay locale dependency |
| --- | --- | --- | --- | --- | --- | --- |
| `job/lumber/shift/spring/default` | production scene text currently EN; legacy Lumber UI also contains RU elsewhere | WORKER_RU_EN_READY for presentation context/alt | WORKER_RU_EN_READY | `assets/stage-lumber.svg` | full production string-key migration + caption wiring | NONE |
| `job/satyr-maid/shift/spring/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY for context/alt | WORKER_RU_EN_READY | `assets/stage-tavern.svg` | action label/description + scene text still need catalog localization | NONE |
| `job/guard/shift/spring/default` | MAIN_EN_PRESENT | PARTIAL_AUTHORING via bilingual producer batch | PARTIAL_AUTHORING | `assets/stage-town.svg` | full scene/caption/alt migration | NONE |
| `job/merchant/shift/spring/default` | MAIN_EN_PRESENT | PARTIAL_AUTHORING | PARTIAL_AUTHORING | `assets/stage-town.svg` | full scene/caption/alt migration | NONE |

### Career fallback conclusion

Current static media is safe for all audited career surfaces.

What is missing is localization metadata, not a gameplay fallback.

If RU is requested before localization infrastructure exists:
- do not create a second RU gameplay action;
- current shipped text remains the only runtime value;
- after the localization seam, RU source should become the preferred RU value and EN remain the EN value.

## School audit

| Surface | Current-main text state | RU authoring | EN authoring | Safe fallback | Localization debt | Gameplay locale dependency |
| --- | --- | --- | --- | --- | --- | --- |
| `school/arcana/lesson/default` | paid lesson production content is currently mostly EN/mixed legacy | WORKER_RU_EN_READY for representative context/alt | WORKER_RU_EN_READY | `assets/stage-school.svg` | full paid-lesson text key migration | NONE |
| `location/town/event/school-lesson-content-v1-after-school/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY in bilingual producer batch | WORKER_RU_EN_READY | `assets/stage-school.svg` | event title/variant/choice keys need runtime localization | NONE |
| `location/town/event/school-life-content-v1-after-paid-lesson/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY | WORKER_RU_EN_READY | `assets/stage-school.svg` | localized event fields not wired | NONE |
| `location/town/event/school-life-content-v1-after-night-study/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY | WORKER_RU_EN_READY | `assets/stage-school.svg` | localized event fields + alt not wired | NONE |

### School safe-Russian fallback

Worker authoring now supplies RU context/fallback examples for the representative School surfaces.

Until runtime localization exists, those values are not active production fallback.

After the seam:
1. requested RU -> RU source;
2. missing RU temporarily -> EN;
3. static `stage-school.svg` remains shared;
4. exact School/Night gameplay identity stays unchanged.

### Staged teacher libraries

Teacher-specific current media libraries have authored EN names/alt on main.

They still need:
- approved RU display names;
- RU role labels;
- RU teacher-specific alt;
- EN review under the same localization keys.

They remain STAGED where course-specific routing is not safe.

## Ordinary poverty audit

| Surface | Current-main text state | RU authoring | EN authoring | Safe fallback | Localization debt | Gameplay locale dependency |
| --- | --- | --- | --- | --- | --- | --- |
| `location/town/event/poverty-street-production-helpful-summer/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY | WORKER_RU_EN_READY | `assets/stage-outside.svg` | full event title/variant/choice localization keys | NONE |
| `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY | WORKER_RU_EN_READY | `assets/stage-room.svg` | full event title/variant/choice localization keys | NONE |
| `location/town/event/poverty-recovery-production-short-cleanup/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY for producer context/alt | WORKER_RU_EN_READY | `assets/stage-outside.svg` | full choice/result wording localization | NONE |
| `location/town/event/poverty-pressure-production-cold-rain/default` | MAIN_EN_PRESENT | WORKER_RU_EN_READY | WORKER_RU_EN_READY | `assets/stage-outside.svg` | full event/choice localization + bilingual alt wiring | NONE |

### Poverty safe-Russian fallback

Worker authoring supplies RU source text for representative presentation contexts.

Current main still does not resolve locale-specific presentation data.

After localization seam:
- RU missing -> EN temporary fallback;
- EN missing -> RU temporary fallback;
- neither locale may alter event/variant/choice identity.

## Alt/caption debt

### Current production debt

Current presentation runtime/media objects use one `alt:string`.

They do not currently expose:
- `alt.ru`;
- `alt.en`;
- locale-keyed caption;
- locale-keyed fallback text.

Therefore all current player-facing media mappings require a localization migration even where one monolingual alt already exists.

### Worker authoring coverage

Bilingual examples now exist in:
- `bilingual-multi-gif-authoring-v1.json`;
- `BILINGUAL_GIF_PRODUCER_BATCH_TEN_CAREERS_v1.md`;
- `BILINGUAL_GIF_PRODUCER_BATCH_SCHOOL_POVERTY_v1.md`.

This is authoring evidence, not active runtime support.

## No gameplay dependency on locale

Audited career/School/poverty surfaces use locale-neutral:
- action IDs;
- event IDs;
- variant IDs;
- choice IDs;
- presentation IDs;
- candidate keys;
- media paths;
- effects/rewards;
- save identity.

No audited mechanic requires a locale value.

## Fallback acceptance target

For every production presentation surface:

### RU request
1. RU localized field;
2. EN temporary migration fallback;
3. neutral technical/text fallback if both missing;
4. shared static media remains usable.

### EN request
1. EN localized field;
2. RU temporary migration fallback;
3. neutral technical/text fallback if both missing;
4. shared static media remains usable.

Locale failure must never:
- reject gameplay;
- change outcome;
- reroll media candidate;
- replay effects.

## Audit conclusion

The audited current-main surfaces are **mechanically safe but localization-incomplete**.

Primary gaps:
- localization resolver;
- stable localization keys in production data;
- RU source migration for existing EN content;
- bilingual alt/caption wiring.

No gameplay or Save-state redesign is required.
