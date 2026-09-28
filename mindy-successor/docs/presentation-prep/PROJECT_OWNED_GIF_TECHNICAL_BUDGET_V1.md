# Project-Owned GIF Technical Budget v1

Scope:
future project-owned presentation GIF candidates only.

This document defines technical budgets, not gameplay semantics.

## Preferred raster size

First-wave standard:
**640×360 px**.

Reason:
- exact 16:9 match to the authored 1200×675 SVG stage;
- sufficient for current presentation panel scale;
- materially smaller than full 1200×675 GIF output.

Allowed review range:
- minimum 320×180;
- preferred 640×360;
- maximum 960×540 without explicit Lead approval.

Do not export 1200×675 animated GIF by default.

## Frame count

Preferred:
**4 frames** per candidate.

Normal acceptable range:
**3–8 frames**.

Hard review:
>8 frames.

The project intentionally favors small symbolic loops rather than video-like GIFs.

## Loop duration

Preferred ordinary range:
**2.2–3.6 seconds**.

Normal acceptable range:
**2.0–4.0 seconds**.

Hard review:
- <1.5 seconds due to distracting/flicker risk;
- >5 seconds unless the motion concept clearly requires it.

Current normalized first-wave targets:
- Lumber spring: 2.4 s;
- Guard summer: 2.8 s;
- Tavern autumn: 2.6 s;
- School Literacy: 3.0 s;
- Poverty helpful summer: 2.4 s;
- Forest success return: 3.2 s;
- Foreman Night: 3.6 s;
- School Arcana: 3.0 s.

## Frame pacing

GIF stores centisecond delay.

Required:
- each frame delay divisible by 10 ms;
- no zero-delay frame;
- preferred uniform frame pacing for first-wave loops.

Preferred per-frame delay:
**500–900 ms** for 4-frame loops.

## Palette

Maximum:
**256 colors**.

Preferred:
- use the smallest palette that preserves project vector readability;
- first exporter implementation may use up to 256 colors globally across the sequence.

Dithering:
not required for first-wave flat/vector art.

## Per-file byte budget

Preferred:
**<= 2 MiB** per GIF.

Soft optimization threshold:
**> 2 MiB**.

Strong optimization/review threshold:
**> 5 MiB**.

Default hard rejection:
**> 8 MiB** per GIF unless Lead explicitly approves an exception.

The validator should default to a 5 MiB acceptance ceiling for normal candidates; an explicit higher limit may be used only during investigation/optimization.

## Per-pool byte budget

For a normal 3-candidate pool:

Preferred:
**<= 6 MiB total**.

Soft review:
**> 8 MiB total**.

Hard review:
**> 15 MiB total**.

For 5-candidate pools:

Preferred:
**<= 10 MiB total**.

Hard review:
**> 20 MiB total**.

These are repository/package-footprint budgets, not memory/runtime timing controls.

## Candidate-count budget

Production multi-GIF pool:
**3–5 real GIF candidates**.

1–2:
incomplete / not a production pool.

>5:
outside the current PR42 presentation contract.

## Loop count

Production presentation GIF:
**infinite loop**.

The animation loop never:
- advances gameplay;
- controls action duration;
- selects outcome;
- modifies Save state.

## Path budget

All production candidates:
`assets/gif/**/*.gif`.

No:
- external URL;
- data URL;
- temp path;
- staging/placeholder path;
- test-fixture path.

## Provenance budget

Every activated candidate must have:
- project-owned/generated-local provenance or explicitly reviewed source permission;
- SHA-256;
- semantic owner(s);
- candidate key;
- static fallback;
- introduced/activated commit records where the project ledger requires them.

Placeholder/test fixture bytes never count as production assets.

## Build/package behavior

Source GIF bytes are copied recursively by the existing assets build path into:
`dist/assets/gif/...`.

No runtime transcoding is expected.

## First-wave target summary

| Property | Target |
| --- | --- |
| dimensions | 640×360 |
| frames | 4 |
| loop | infinite |
| duration | 2.2–3.6 s |
| per-frame delay | 500–900 ms |
| palette | <=256 |
| preferred file size | <=2 MiB |
| normal validator ceiling | 5 MiB |
| hard default rejection | >8 MiB |
| production candidates/pool | 3–5 |
| preferred 3-candidate pool size | <=6 MiB |

## Acceptance principle

Optimize before increasing technical budgets.

A larger GIF is not a gameplay feature and does not justify weakening deterministic/static-fallback behavior.
