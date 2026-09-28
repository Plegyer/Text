# Project-Owned GIF Provenance Ledger v1

Scope:
future candidates from items 333–335.

Provenance class for every entry:
**PROJECT_OWNED_LOCAL_SVG_SOURCE**.

No external image/video/GIF source is used.
No candidate below is claimed to have exported GIF bytes yet.

## job/lumber/shift/spring/default

Static fallback:
`assets/presentation/career-lumber-shift-spring.svg`.

### lumber-spring-loop-a

Future GIF path:
`assets/gif/careers/lumber/spring-loop-a.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`lumber-spring-work-loop-a`.

Ordered project-owned source frames:
- `assets/presentation-frames/lumber-spring-work-loop-a-frame-01.svg`
- `assets/presentation-frames/lumber-spring-work-loop-a-frame-02.svg`
- `assets/presentation-frames/lumber-spring-work-loop-a-frame-03.svg`
- `assets/presentation-frames/lumber-spring-work-loop-a-frame-04.svg`

### lumber-spring-loop-b

Future GIF path:
`assets/gif/careers/lumber/spring-loop-b.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`lumber-spring-work-loop-b`.

Ordered project-owned source frames:
- `assets/presentation-frames/lumber-spring-work-loop-b-frame-01.svg`
- `assets/presentation-frames/lumber-spring-work-loop-b-frame-02.svg`
- `assets/presentation-frames/lumber-spring-work-loop-b-frame-03.svg`
- `assets/presentation-frames/lumber-spring-work-loop-b-frame-04.svg`

### lumber-spring-loop-c

Future GIF path:
`assets/gif/careers/lumber/spring-loop-c.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`lumber-spring-work-loop-c`.

Ordered project-owned source frames:
- `assets/presentation-frames/lumber-spring-work-loop-c-frame-01.svg`
- `assets/presentation-frames/lumber-spring-work-loop-c-frame-02.svg`
- `assets/presentation-frames/lumber-spring-work-loop-c-frame-03.svg`
- `assets/presentation-frames/lumber-spring-work-loop-c-frame-04.svg`

## job/guard/shift/summer/default

Static fallback:
`assets/presentation/career-guard-shift-summer.svg`.

### guard-summer-loop-a

Future GIF path:
`assets/gif/careers/guard/summer-loop-a.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`guard-summer-watch-loop-a`.

Ordered project-owned source frames:
- `assets/presentation-frames/guard-summer-watch-loop-a-frame-01.svg`
- `assets/presentation-frames/guard-summer-watch-loop-a-frame-02.svg`
- `assets/presentation-frames/guard-summer-watch-loop-a-frame-03.svg`
- `assets/presentation-frames/guard-summer-watch-loop-a-frame-04.svg`

### guard-summer-loop-b

Future GIF path:
`assets/gif/careers/guard/summer-loop-b.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`guard-summer-watch-loop-b`.

Ordered project-owned source frames:
- `assets/presentation-frames/guard-summer-watch-loop-b-frame-01.svg`
- `assets/presentation-frames/guard-summer-watch-loop-b-frame-02.svg`
- `assets/presentation-frames/guard-summer-watch-loop-b-frame-03.svg`
- `assets/presentation-frames/guard-summer-watch-loop-b-frame-04.svg`

### guard-summer-loop-c

Future GIF path:
`assets/gif/careers/guard/summer-loop-c.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`guard-summer-watch-loop-c`.

Ordered project-owned source frames:
- `assets/presentation-frames/guard-summer-watch-loop-c-frame-01.svg`
- `assets/presentation-frames/guard-summer-watch-loop-c-frame-02.svg`
- `assets/presentation-frames/guard-summer-watch-loop-c-frame-03.svg`
- `assets/presentation-frames/guard-summer-watch-loop-c-frame-04.svg`

## school/literacy-and-numbers/lesson/default

Static fallback:
`assets/presentation/school-course-literacy-and-numbers.svg`.

### school-literacy-loop-a

Future GIF path:
`assets/gif/school/literacy-and-numbers/lesson-loop-a.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`school-literacy-study-loop-a`.

Ordered project-owned source frames:
- `assets/presentation-frames/school-literacy-study-loop-a-frame-01.svg`
- `assets/presentation-frames/school-literacy-study-loop-a-frame-02.svg`
- `assets/presentation-frames/school-literacy-study-loop-a-frame-03.svg`
- `assets/presentation-frames/school-literacy-study-loop-a-frame-04.svg`

### school-literacy-loop-b

Future GIF path:
`assets/gif/school/literacy-and-numbers/lesson-loop-b.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`school-literacy-study-loop-b`.

Ordered project-owned source frames:
- `assets/presentation-frames/school-literacy-study-loop-b-frame-01.svg`
- `assets/presentation-frames/school-literacy-study-loop-b-frame-02.svg`
- `assets/presentation-frames/school-literacy-study-loop-b-frame-03.svg`
- `assets/presentation-frames/school-literacy-study-loop-b-frame-04.svg`

### school-literacy-loop-c

Future GIF path:
`assets/gif/school/literacy-and-numbers/lesson-loop-c.gif` — **NOT_YET_EXPORTED**.

Source sequence:
`school-literacy-study-loop-c`.

Ordered project-owned source frames:
- `assets/presentation-frames/school-literacy-study-loop-c-frame-01.svg`
- `assets/presentation-frames/school-literacy-study-loop-c-frame-02.svg`
- `assets/presentation-frames/school-literacy-study-loop-c-frame-03.svg`
- `assets/presentation-frames/school-literacy-study-loop-c-frame-04.svg`

## Provenance requirements after real export

For every exported candidate, record:
- candidate key;
- semantic presentation ID;
- exact four source frame paths;
- source frame Git blob/SHA values on the export head;
- exporter script revision;
- package-lock revision;
- exact `sharp`/`gifenc` versions;
- Node/platform;
- output GIF SHA-256;
- byte size;
- dimensions;
- frame count/timing;
- loop count.

## External provenance policy

Forbidden:
- downloaded GIFs;
- stock animation;
- remote URLs;
- external image references in SVG;
- unknown/TBD provenance.

Any candidate with non-project-owned provenance requires a separate explicit review and is outside this ledger.

## Gameplay boundary

Provenance metadata must not contain or drive:
- reward/effect;
- eligibility;
- gameplay RNG;
- Save state;
- outcome selection.

## Current status

Future candidates documented:
**9**.

Project-owned SVG frame sources:
**36**.

Actual GIF bytes:
**0**.

External provenance:
**0**.
