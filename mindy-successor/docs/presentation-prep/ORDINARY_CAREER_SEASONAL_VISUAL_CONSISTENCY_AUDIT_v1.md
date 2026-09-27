# Ordinary Career Seasonal Visual Consistency Audit v1

Audit target: the 40 project-authored seasonal SVG files created by items 197–201.

Semantic baseline: current `main` `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`.

## Automated identity check

Git-tree audit on worker head after item 204:
- seasonal SVG files found: **40**;
- unique Git blob SHAs: **40**;
- exact byte duplicates: **0**.

Every file uses:
- `viewBox="0 0 1200 675"`;
- locale-neutral vector art;
- explicit `data-career`;
- explicit `data-season`;
- no embedded external media.

## Shared visual system

All 40 files intentionally share:
- 1200×675 stage composition;
- flat geometric vector construction;
- charcoal/dark-blue structural tones;
- warm central presentation light;
- a readable central worker silhouette;
- lower-frame grounding/shadow;
- no baked-in RU/EN text.

This common structure keeps the assets visually related to the existing project stage language.

The central silhouette is a deliberate system component, not a claim that career scenes are identical. Career recognizability comes from scene props/environment; seasonal differentiation comes from palette + environmental markers.

## Seasonal differentiation

### Spring

Consistent markers:
- muted green ground;
- fresh light-green vegetation;
- small pink blossom accents;
- softer warm daylight.

Assessment: **DISTINCT / readable**.

### Summer

Consistent markers:
- stronger amber daylight;
- explicit high sun;
- dense green vegetation;
- warmer ground.

Assessment: **DISTINCT / readable**.

### Autumn

Consistent markers:
- brown/russet palette;
- orange/gold fallen-leaf geometry;
- lower warm light.

Assessment: **DISTINCT / readable**.

### Winter

Consistent markers:
- cold blue/gray palette;
- snow dots;
- pale snow-ground overlay;
- reduced warm saturation.

Assessment: **DISTINCT / readable**.

No career has four byte-identical seasonal variants.

## Career recognizability

| Career | Distinctive visual motif | Seasonal set assessment |
| --- | --- | --- |
| Lumber | timber/log stack + axe/tool geometry | PASS |
| Satyr Maid | tavern table/service objects + tray | PASS |
| Undead Farm | farm supply crate + field-tool/scythe-like geometry | PASS |
| Tavern | service counter + vessels | PASS |
| Hunter | forest-track mark + bow geometry | PASS |
| Guard | city watch towers + spear/shield geometry | PASS |
| Merchant | market stall + goods | PASS |
| Artist/Geisha | performance-stage floor + fan/prop geometry | PASS |
| Assassin | rooftop/urban silhouette + neutral gear/blade geometry | PASS |
| Prostitute | non-explicit room/bed/vanity environment | PASS |

## Pairwise collision review

Potentially related legacy themes were deliberately separated by props:

- **Satyr Maid vs Tavern**: both are tavern-related, but Satyr Maid foregrounds table/tray service while Tavern foregrounds counter/vessels.
- **Undead Farm vs Hunter**: both can use outdoors/green tones, but Farm uses supply/agricultural props while Hunter uses trail/bow markers.
- **Guard vs Assassin**: both can use town geometry, but Guard uses open watch-post/tower and shield/spear cues while Assassin uses quieter rooftop/gear composition.
- **Artist/Geisha vs Prostitute**: both may use indoor/warm staging, but Artist/Geisha uses performance/fan geometry while Prostitute remains a non-explicit prepared-room composition.

No pair is flagged as visually indistinguishable at the authored SVG-structure level.

## Known limitation

This is a vector-source audit, not a screenshot/perceptual benchmark.

The files are intentionally compact symbolic stage fallbacks. They are not intended to replace the final richer GIF production pass.

Lead integration should still perform a renderer screenshot sanity check on representative spring/summer/autumn/winter samples after selective copy.

## Result

- style coherence: **PASS**;
- readable seasonal differentiation: **PASS**;
- career recognizability: **PASS**;
- exact duplicate files: **0**;
- visually indistinguishable seasonal sets flagged: **0**;
- gameplay/runtime coupling introduced: **0**.
