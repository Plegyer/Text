# Presentation Production Continuity Pack v7

Status: full-game production-authoring readiness handoff.

Technical presentation runtime remains GREEN at the PR27 floor. This pack moves presentation work from RC closeout into scalable content production.

## GIF-first product contract

Production presentation follows these invariants:

- stable semantic `presentationId` is the presentation identity;
- GIF is the preferred dynamic format when authored;
- static/text fallback remains valid and non-fatal;
- animation-off changes presentation only;
- mechanics never depend on GIF completion/frame/timing;
- save never stores animation frame/time/playback;
- media reuse may cross semantic IDs;
- semantic IDs must never collapse merely because media is reused;
- replacement/import is presentationId-driven, not manual source-path editing.

## Can be produced immediately

### Lumber
Existing production IDs are already stable.

Optional current targets may be authored now:
- seasonal Lumber shift GIFs;
- first-shift career milestone GIF;
- Foreman professional GIF;
- Foreman professional Night GIF.

Existing static fallback already makes these non-blocking.

### Existing reusable production media
Current town/Lumber/School/Forest static stages can continue supporting new implementation work while content is still being authored.

## Waits on content authoring

Do not finalize unique production GIF bindings yet for:
- Satyr Maid;
- Undead Farm;
- Hunter;
- Tavern;
- Guard;
- Merchant;
- Assassin;
- Prostitute;
- Geisha/Artist;
- ordinary poverty events;
- hunter trail;
- Forest challenge families;
- seasonal Forest topology;
- future career endings;
- School public-result scenes.

These need authored gameplay/content identities first.

## Waits on human/Product decisions

Do not finalize:
- School teacher-specific visuals;
- Secret Debt / Slave production media;
- Palace role/assignment media;
- Palace/Meta reveal media;
- Old Boundary context-specific visual treatment where unresolved Product policy materially affects authored context.

Human decisions define what content/media should exist; presentation engineering does not choose art direction.

## Exact item 61–65 files

### Item 61
- `docs/presentation-prep/FULL_ROSTER_GIF_COVERAGE_MAP_v1.md`
- `prior-work/astra/prototype-m3.2/content/full-roster-gif-coverage-map.fixture.json`

Purpose: all 10 ordinary careers + Palace + Secret Debt/Slave presentation readiness map.

### Item 62
- `docs/presentation-prep/POVERTY_SECRET_DEBT_PRESENTATION_FLOW_v1.md`
- `prior-work/astra/prototype-m3.2/content/poverty-secret-debt-presentation-flow.fixture.json`

Purpose: ordinary housing/poverty and hidden Secret Debt/Slave presentation boundaries.

### Item 63
- `docs/presentation-prep/GIF_REUSE_VARIANT_TAXONOMY_v1.md`

Purpose: minimize unique asset count without collapsing gameplay identity.

### Item 64
- `docs/presentation-prep/FULL_GAME_PRESENTATION_ID_AUTHORING_TEMPLATE_v1.md`

Purpose: standard fill-in template for future authored scenes.

### Item 65
- `docs/presentation-prep/GIF_PRODUCTION_DEPENDENCY_MATRIX_v1.md`
- `prior-work/astra/prototype-m3.2/content/gif-production-dependency-matrix.fixture.json`

Purpose: dependency/readiness ordering for full-game asset production.

## Production sequence

For any new authored content package:

1. finalize gameplay/content source identity;
2. assign collision-free semantic presentationId;
3. choose reuse group;
4. bind optional GIF target;
5. preserve static fallback;
6. preserve text fallback;
7. define animation-off behavior;
8. verify save identity owner;
9. preview/import;
10. save/reload smoke;
11. rollback smoke;
12. confirm zero gameplay mutation.

## No-runtime-change guardrails

Do not modify presentation runtime solely because:
- a career lacks final art;
- a GIF is missing;
- two scenes reuse one asset;
- content authoring is incomplete;
- a human has not chosen teacher/Palace/Secret Debt visual treatment.

A runtime change requires a demonstrated technical defect in the current semantic/fallback/save/animation contract.

## Current handoff state

**Technical presentation:** GREEN.

**Immediate asset production:** Lumber optional GIF set.

**Full-roster production:** content-first for most careers.

**Human-decision-dependent:** School teacher visuals, Secret Debt, Palace and some final content-specific treatments.

**Fallback safety:** sufficient for iterative implementation.

This pack is the bridge from technical RC closure to full-game presentation production.
