# First Three Pool Export Plan v2

Semantic baseline:
`main@3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Exporter source:
`tools/export-project-owned-gif.mjs`.

Timing authority:
`docs/presentation-prep/ANIMATION_TIMING_NORMALIZATION_V1.md`.

All filenames/candidate keys below are intended production outputs **after** Lead approves and installs the proposed exporter dependencies.

## Pool 1 — Lumber spring

Semantic presentation ID:
`job/lumber/shift/spring/default`.

Static fallback:
`assets/presentation/career-lumber-shift-spring.svg`.

Normalized export loop:
2400 ms.

Per-frame delay:
600 ms.

Dimensions:
640×360.

Loop:
infinite.

| Candidate key | Source sequence | Intended GIF path |
| --- | --- | --- |
| `lumber-spring-loop-a` | `lumber-spring-work-loop-a` | `assets/gif/careers/lumber/spring-loop-a.gif` |
| `lumber-spring-loop-b` | `lumber-spring-work-loop-b` | `assets/gif/careers/lumber/spring-loop-b.gif` |
| `lumber-spring-loop-c` | `lumber-spring-work-loop-c` | `assets/gif/careers/lumber/spring-loop-c.gif` |

Example export invocation:

```bash
node tools/export-project-owned-gif.mjs \
  --presentation-id job/lumber/shift/spring/default \
  --sequence lumber-spring-work-loop-a \
  --output assets/gif/careers/lumber/spring-loop-a.gif
```

Repeat for B/C with the paths above.

## Pool 2 — Guard summer

Semantic presentation ID:
`job/guard/shift/summer/default`.

Static fallback:
`assets/presentation/career-guard-shift-summer.svg`.

Normalized export loop:
2800 ms.

Per-frame delay:
700 ms.

Dimensions:
640×360.

Loop:
infinite.

| Candidate key | Source sequence | Intended GIF path |
| --- | --- | --- |
| `guard-summer-loop-a` | `guard-summer-watch-loop-a` | `assets/gif/careers/guard/summer-loop-a.gif` |
| `guard-summer-loop-b` | `guard-summer-watch-loop-b` | `assets/gif/careers/guard/summer-loop-b.gif` |
| `guard-summer-loop-c` | `guard-summer-watch-loop-c` | `assets/gif/careers/guard/summer-loop-c.gif` |

## Pool 3 — Tavern autumn

Semantic presentation ID:
`job/tavern/shift/autumn/default`.

Static fallback:
`assets/presentation/career-tavern-shift-autumn.svg`.

Normalized export loop:
2600 ms.

Per-frame delay:
650 ms.

Dimensions:
640×360.

Loop:
infinite.

| Candidate key | Source sequence | Intended GIF path |
| --- | --- | --- |
| `tavern-autumn-loop-a` | `tavern-autumn-service-loop-a` | `assets/gif/careers/tavern/autumn-loop-a.gif` |
| `tavern-autumn-loop-b` | `tavern-autumn-service-loop-b` | `assets/gif/careers/tavern/autumn-loop-b.gif` |
| `tavern-autumn-loop-c` | `tavern-autumn-service-loop-c` | `assets/gif/careers/tavern/autumn-loop-c.gif` |

## Common export constraints

For all nine intended candidates:
- 4 ordered project-owned SVG source frames;
- 640×360 output;
- maximum palette 256 colors;
- infinite loop;
- fixed semantic ID before media selection;
- candidate key is locale-neutral;
- no gameplay RNG;
- no Save mutation;
- no outcome/reward/effect selection;
- static fallback remains active for animations-off/reduced-motion.

## Technical acceptance before pool activation

Each candidate must pass:
1. local-path validation;
2. GIF87a/GIF89a signature;
3. exact 640×360 dimensions;
4. 4 frames;
5. expected per-frame delay and total normalized duration;
6. infinite loop metadata;
7. file-size budget;
8. project-owned provenance;
9. build copy to `dist/assets/gif/`;
10. RU+EN alt/caption localization;
11. PR42 3-candidate pool validation;
12. deterministic candidate selection independent of locale;
13. exact-head CI.

## Current status

Source sequences:
**9 / 9 READY**.

Actual intended GIF files:
**0 / 9**.

Production pools:
**0 / 3**.

Exporter dependencies installed:
**NO**.
