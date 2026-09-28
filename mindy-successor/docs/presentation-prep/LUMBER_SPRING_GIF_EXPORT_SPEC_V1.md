# Lumber Spring GIF Export Spec v1

Semantic presentation ID:

`job/lumber/shift/spring/default`

Static/reduced-motion fallback:

`assets/presentation/career-lumber-shift-spring.svg`

Source sequences:
- `lumber-spring-work-loop-a`;
- `lumber-spring-work-loop-b`;
- `lumber-spring-work-loop-c`.

These three source sequences are intended to become the first complete 3-candidate production pool after exporter approval.

## Common raster target

Output dimensions:
**640 × 360 px**.

Source frame dimensions/viewBox:
**1200 × 675 / 16:9**.

Resize:
exact 16:9 fill with no crop.

Color:
- sRGB;
- maximum 256 GIF palette colors;
- no baked-in text;
- opaque background for the first production batch unless transparent output is explicitly tested.

Loop:
**infinite**.

GIF playback must not control gameplay duration.

## Candidate A

Sequence:
`lumber-spring-work-loop-a`.

Future candidate key:
`lumber-spring-loop-a`.

Output path:
`assets/gif/careers/lumber/spring-loop-a.gif`.

Frames:
4.

Source loop duration:
2400 ms.

Target per-frame delays:
- frame 1: 600 ms;
- frame 2: 600 ms;
- frame 3: 600 ms;
- frame 4: 600 ms.

## Candidate B

Sequence:
`lumber-spring-work-loop-b`.

Future candidate key:
`lumber-spring-loop-b`.

Output path:
`assets/gif/careers/lumber/spring-loop-b.gif`.

Frames:
4.

Source loop duration:
2200 ms.

Target per-frame delays:
- frame 1: 550 ms;
- frame 2: 550 ms;
- frame 3: 550 ms;
- frame 4: 550 ms.

## Candidate C

Sequence:
`lumber-spring-work-loop-c`.

Future candidate key:
`lumber-spring-loop-c`.

Output path:
`assets/gif/careers/lumber/spring-loop-c.gif`.

Frames:
4.

Source loop duration:
2600 ms.

Target per-frame delays:
- frame 1: 650 ms;
- frame 2: 650 ms;
- frame 3: 650 ms;
- frame 4: 650 ms.

## File-size target

Preferred:
**<= 2 MB per candidate**.

Pool preferred total:
**<= 6 MB**.

Optimization required before activation:
**> 5 MB for any one candidate**.

Hard review:
**> 12 MB after reasonable optimization**.

## Candidate semantics

All three candidates must depict the same already-selected ordinary spring Lumber shift.

Candidate selection must not change:
- job outcome;
- reward;
- Energy;
- eligibility;
- relationship state;
- Save state.

Candidate keys are locale-neutral.

RU/EN localization applies only to alt/caption presentation text.

## Acceptance after export

Each output must pass:
- GIF87a/GIF89a signature validation;
- exact 640×360 dimensions;
- 4-frame count;
- expected loop duration within GIF centisecond rounding;
- infinite loop flag;
- file-size budget;
- build copy into `dist/assets/gif/...`;
- PR42 3-candidate pool validation;
- deterministic locale-independent selection;
- static fallback preservation;
- no gameplay RNG/Save mutation.
