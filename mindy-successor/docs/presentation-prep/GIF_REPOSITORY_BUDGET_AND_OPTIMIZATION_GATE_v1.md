# GIF Repository Budget and Optimization Gate v1

Status: **PRESENTATION PRODUCTION GUIDANCE**

Purpose: keep imported GIF media practical for repository size, build distribution, desktop rendering and repeated presentation use.

This document does not modify gameplay/runtime behavior.

## Guiding principle

A valid GIF must satisfy both:
1. semantic/provenance correctness;
2. practical distribution cost.

A technically valid 100+ MB GIF is still a bad default production asset for this project.

## Preferred source dimensions

Preferred production target:
- longest side: **640–960 px**;
- typical landscape target: **640×360 to 960×540**;
- portrait/character loops may use equivalent pixel area when composition requires it.

Review required:
- longest side above **1280 px**.

Avoid by default:
- 1920×1080 GIFs unless there is a documented reason and post-optimization result is still within file-size budget.

Why:
the central presentation window does not need source pixels comparable to full-screen video, and GIF scales poorly in size compared with modern video formats.

## Preferred loop duration

Preferred:
- **2–6 seconds**.

Acceptable with review:
- roughly **1–8 seconds** when a shorter/longer loop is semantically justified.

Avoid:
- long narrative sequences;
- loops whose duration implies gameplay timing;
- animations that require the player to wait for completion.

The runtime may loop continuously; gameplay duration must remain independent.

## Preferred frame rate

Preferred:
- **8–15 fps** for ordinary presentation loops.

Acceptable with review:
- up to roughly **20 fps** for motion that visibly suffers at lower rates.

Avoid by default:
- 24/30/60 fps GIF production unless there is a specific quality justification.

GIF frame-rate reduction is acceptable only when the loop still reads correctly and does not materially change the visible action.

## Repository file-size budget

Per production GIF:

Preferred:
- **≤ 2 MB**.

Acceptable with explicit review:
- **>2 MB and ≤5 MB**.

Optimization required before activation:
- **>5 MB**.

Default reject / exceptional approval only:
- **>12 MB** after reasonable non-destructive optimization.

These are repository-production gates, not runtime schema limits.

A source file discovered externally may exceed the budget during research. It is not production-ready until an allowed optimized derivative is created under compatible license terms and revalidated.

## Pool budget

For a 3-candidate minimum pool:

Preferred total:
- **≤ 6 MB**.

For a 5-candidate pool:

Preferred total:
- **≤ 10 MB**.

Review:
- any pool above **15 MB** total.

Rationale:
repeated career/poverty/School/Forest surfaces may accumulate many pools, so per-file discipline matters more than one isolated animation.

## Non-destructive optimization allowed

When the source license permits derivatives/optimization, acceptable operations include:
- lossless GIF optimization;
- palette cleanup that does not materially alter intended color/readability;
- removal of duplicate/redundant frames;
- reducing dimensions while preserving composition;
- lowering frame rate while preserving visible action;
- trimming dead time at loop start/end;
- optimizing disposal method;
- removing metadata that is not required for provenance, while provenance remains recorded separately in the project ledger.

Any optimized file becomes a new reviewed byte artifact and needs:
- new checksum;
- modification note;
- preflight;
- visual comparison;
- provenance/license retention.

## Changes requiring explicit visual review

Require producer/Lead review before production activation:
- cropping;
- reframing;
- color changes;
- background removal;
- frame interpolation;
- speed changes;
- compositing;
- object removal/addition;
- loop restructuring;
- transformations that may alter semantic meaning.

Optimization must not turn one semantic action into another.

## Licensing gate for optimization

Before modifying a sourced asset:
- confirm adaptation is permitted;
- CC0/public-domain/project-owned assets are preferred;
- CC BY is generally adaptation-compatible with attribution obligations;
- CC BY-SA requires ShareAlike compliance;
- CC BY-ND is not an autonomous optimization source because adapted redistribution is restricted;
- unclear/custom terms block modification.

Technical convenience never overrides license terms.

## Visual acceptance after optimization

The optimized GIF must still:
- preserve the intended loop action;
- preserve subject identity/composition;
- avoid new artifacts/flicker that materially reduce readability;
- reset cleanly;
- remain locale-neutral;
- not add text/watermarks;
- not disclose or imply gameplay mechanics/outcomes;
- remain distinct enough from other candidates to provide meaningful pool variation.

## Technical acceptance after optimization

Re-run:
1. repository path check;
2. GIF87a/GIF89a signature check;
3. dimensions/frame/duration inventory;
4. checksum;
5. candidate-key uniqueness;
6. static fallback check;
7. build copy verification;
8. exact-head tests/CI.

## Current discovery implications

Item 180 found `Rain 2.gif` at approximately **9.28 MB**.

That is:
- technically usable as research input;
- above preferred and review bands;
- **optimization required** before production activation even if semantic approval were granted.

Satellite-weather GIFs in the 100+ MB range are far beyond this project's practical default and are not credible direct-import candidates.

## Production rule

Do not optimize solely to hit a number.

If an asset becomes semantically worse, visibly damaged, or license-incompatible during optimization, reject it and keep the static fallback instead.
