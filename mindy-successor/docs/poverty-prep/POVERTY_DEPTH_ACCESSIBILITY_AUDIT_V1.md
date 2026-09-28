# Poverty Depth Accessibility Audit v1

Status: semantic/accessibility audit of current poverty static alt/caption text against shipped ordinary-poverty scenes and the v2 scene-depth banks.

Current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

No asset or localization value is changed by this audit.

## Audit criteria

A static alt/caption pair is:

- **COMPATIBLE** when it describes visible scene semantics without contradicting the current event/depth copy;
- **COMPATIBLE_BUT_META** when the visible semantics fit, but the text contains implementation/mechanics language that is weak accessibility prose;
- **MISMATCH** when it depicts or states a different semantic scene.

## Event-specific current static coverage

| Current static key family | Related current scene | Compatibility | Notes |
| --- | --- | --- | --- |
| `presentation.static.poverty-street-helpful-summer.*` | helpful summer street / crates / awning / brief help | **COMPATIBLE_BUT_META** | “without showing a reward” is implementation-facing. Visual semantics remain compatible with the refined helpful bank. |
| `presentation.static.poverty-street-neutral-autumn.*` | neutral autumn street | **COMPATIBLE** | Neutral modest-street description does not overstate the scene. |
| `presentation.static.poverty-street-pressure-winter.*` | winter cold/wind street pressure | **COMPATIBLE_BUT_META** | Snow/cold pressure is compatible; “without showing an exact penalty” is mechanics language. |
| `presentation.static.poverty-cheap-shared-quiet-autumn.*` | quiet cheap shared room | **COMPATIBLE** | Simple low-cost room fits the quiet/shared-space depth bank. |
| `presentation.static.poverty-recovery-small-coin-help.*` | small anonymous coin help | **COMPATIBLE_BUT_META** | Scene matches; “without showing an amount or changing the event outcome” is not ideal alt text. |
| `presentation.static.poverty-recovery-short-cleanup.*` | short closing cleanup | **COMPATIBLE** | Short ordinary cleanup is aligned with the refined recovery bank. |
| `presentation.static.poverty-recovery-herb-bundle.*` | ordinary herb bundle | **COMPATIBLE_BUT_META** | Herb bundle semantics fit; “without showing hidden effects” exposes implementation framing. |
| `presentation.static.poverty-pressure-cold-rain.*` | cold rain / shelter edge / doorway | **COMPATIBLE_BUT_META** | Rain semantics fit; “without showing an exact penalty” is mechanics language. |
| `presentation.static.poverty-pressure-noisy-loading.*` | early/noisy street loading | **COMPATIBLE_BUT_META** | Loading/noise semantics fit; “without changing the already selected event” is implementation-facing. |
| `presentation.static.poverty-pressure-muddy-splash.*` | puddle / cart / muddy clothes | **COMPATIBLE_BUT_META** | Mud/splash semantics fit; “without showing a mechanical penalty” is implementation-facing. |

Current event-specific semantic mismatch count:
**0**.

## Generic poverty fallback static

| Current generic key family | Compatibility | Notes |
| --- | --- | --- |
| `presentation.static.poverty.street.*` | **COMPATIBLE_BUT_META** | Generic modest-street visual is safe; caption “without changing outcome” is internal/mechanical phrasing. |
| `presentation.static.poverty.cheap-lodging.*` | **COMPATIBLE_BUT_META** | Generic cheap room is safe; caption describes content ownership rather than visible scene. |
| `presentation.static.poverty.recovery-help.*` | **COMPATIBLE_BUT_META** | Calm small-help visual is safe; “without showing reward” / “does not change event identity” is meta. |
| `presentation.static.poverty.pressure.*` | **COMPATIBLE_BUT_META** | Generic difficult street conditions are safe; caption refers to selected-event mechanics. |

The generic fallback assets remain semantically safe for depth copy because they are less specific than the text.

## Helpful depth-bank compatibility

Refined helpful text uses:
- closing stalls;
- crates;
- awning/canvas;
- short ordinary help.

Current helpful static is generic enough to accompany all four helpful depth keys.

It does not imply:
- a specific reward amount;
- job/career progress;
- lender/Secret Debt semantics.

## Pressure depth-bank compatibility

Refined pressure text uses:
- cold/wind;
- rain;
- street loading noise;
- cart splashes/mud.

The current four pressure static families match those semantic categories.

No current asset/alt pair introduces:
- terminal danger;
- forced labor;
- lender pressure;
- Secret Debt.

## Cheap/recovery depth-bank compatibility

Cheap lodging depth uses:
- cramped room;
- open window;
- heat;
- small stove;
- dry shared shelter.

Current cheap-room static is semantically broad enough for those variants.

Recovery depth uses:
- small coins/bread;
- short cleanup;
- common herb bundle.

Current three recovery static families align with those identities.

## Accessibility quality debt

The main issue is not semantic mismatch. It is **meta-mechanical language** inside several alt/caption strings.

Examples of wording to avoid in a future accessibility copy pass:
- “without showing a reward”;
- “without showing an exact penalty”;
- “without changing the event outcome”;
- “without showing hidden effects”;
- “does not change event identity”.

A future cleanup should describe only visible content.

This audit does not make that cleanup.

## Depth-key rule

The 26 `presentation.poverty.depth.*` keys are scene-body text, not alt text.

Do not reuse a scene-depth paragraph as image alt.

Alt/caption should remain:
- concise;
- visible-content focused;
- independent of gameplay effect.

## Media/gameplay firewall

Neither current static alt/caption nor future cleanup may:
- change event/variant selection;
- affect choices/effects;
- consume RNG;
- write Save;
- encode Secret Debt mechanics.

## Audit conclusion

Current poverty static assets are semantically compatible with the refined scene-depth banks.

There are **0 semantic mismatches**.

Accessibility debt is limited to meta-mechanical phrasing in several current alt/caption strings; that should be handled as a separate localization-only cleanup, not as an asset or gameplay change.
