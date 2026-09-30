# Lumber Ending Presentation Re-audit v1

Status: C2-39 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`

C2-39 explicitly re-audits the three target Lumber endings after the current-main integration state. It does not broaden into gameplay, ending eligibility, story, rewards, Save/RNG, or the separate legacy `lumber-stay` ending.

## Re-audit matrix

| Ending | Semantic ID | Exact static source | Registry fallback | RU/EN alt + caption | Result |
| --- | --- | --- | --- | --- | --- |
| Hard Work | `ending/lumber/hard-work` | `assets/presentation/career-lumber-result.svg` | `location/town/default` | complete | no repair needed |
| Forewoman | `ending/lumber/forewoman` | `assets/presentation/foreman-professional.svg` | `location/town/default` | complete | no repair needed |
| Forest | `ending/lumber/forest` | `assets/presentation/forest-return-success-v2.svg` | `location/town/default` | complete | no repair needed |

All three sources are project-owned local static SVGs already present on current main.

All three static overrides carry localized presentation alt keys whose RU/EN alt and caption pairs are present in `content/localization.json`.

The ending registry preserves the exact semantic IDs and supplies `location/town/default` as the safe fallback chain.

## Separate legacy ending

`lumber-stay` remains a current gameplay ending with semantic ID `ending/lumber-stay`, but it is not one of the three endings named by C2-39. Its missing bespoke override remains documented in the C2-37 inventory rather than being silently expanded into this task.

## Result

Target Lumber ending presentation gaps repaired by C2-39: **0**.

No production presentation file change is required for the three assigned target endings.
