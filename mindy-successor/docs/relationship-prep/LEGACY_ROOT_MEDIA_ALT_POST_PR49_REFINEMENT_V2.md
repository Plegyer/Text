# Legacy Root Media-Alt Post-PR49 Refinement v2

Date: 2026-09-27
Owner: Chat 5
Exact current-main baseline: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`

## Re-audit result

PR47/48/49 shipped/refined project-owned static presentation media for several other domains, but the covered legacy root events still have no dedicated presentation-slot override in current `presentation.json`.

Relevant current slot overrides found for these legacy IDs: **0**.

Therefore the current event presentation resolver still starts from each event variant's exact pack media identity below. Alt text must describe the actual current asset, not narrative objects that the generic asset does not visibly contain.

## Final alt refinements

| Media ID | Current asset path | Decision | Final RU alt | Final EN alt |
|---|---|---|---|---|
| `base.workshop` | `assets/workshop.svg` | KEEP | Условная иллюстрация алхимической лавки. | A stylized illustration of the alchemy workshop. |
| `base.town` | `assets/town.svg` | KEEP | Условная иллюстрация фэнтезийного города. | A stylized illustration of the fantasy town. |
| `gopher.arrival.default` | `assets/stage-town.svg` | REFINE | Городская улица с домами и путешественницей на фоне закатного неба. | A town street with buildings and a traveler beneath an evening sky. |
| `gopher.tavern-intro.default` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.tavern-quest.default` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.receipt.default` | `assets/stage-forest.svg` | REFINE | Лесная тропа среди деревьев с героиней у дороги. | A forest path among trees with the heroine beside the trail. |
| `gopher.tavern-resolution.default` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.tavern-routine.spring` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.tavern-routine.summer` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.tavern-routine.autumn` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.tavern-routine.winter` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.tavern-routine.default` | `assets/stage-tavern.svg` | REFINE | Интерьер таверны с длинным столом, тёплым окном и героиней. | A tavern interior with a long table, a warmly lit window, and the heroine. |
| `gopher.woods-intro.default` | `assets/stage-lumber.svg` | REFINE | Лесная рабочая площадка с верстаком, брёвнами и героиней у пилы. | A forest worksite with a bench, logs, and the heroine by a saw. |
| `gopher.hunt-intro.default` | `assets/stage-forest.svg` | REFINE | Лесная тропа среди деревьев с героиней у дороги. | A forest path among trees with the heroine beside the trail. |
| `gopher.landlord.default` | `assets/stage-room.svg` | REFINE | Тёплая деревянная комната с кроватью и лампой. | A warm wooden room with a bed and a lamp. |
| `stage.goblin` | `assets/stage-goblin.svg` | REFINE | Лесная рабочая сцена с героиней и гоблином. | A forest work scene with the heroine and a goblin. |

## Why refinement is needed

The item-66 draft sometimes described event-specific narrative details that are not present in the actual generic asset:

- `gopher.arrival.default`: current `stage-town.svg` shows a town street and heroine, not a visible white gopher or open hatch.
- tavern quest/resolution media: current `stage-tavern.svg` shows a generic tavern interior, not a visible delivery note, Marek, or festival decision.
- all seasonal `gopher.tavern-routine.*` identities currently point to the same `stage-tavern.svg`; the image itself contains no reliable spring/summer/autumn/winter cue, so season-specific alt wording is misleading.
- `gopher.receipt.default` and `gopher.hunt-intro.default` use the same generic forest scene; no document or Ren is visibly encoded.
- `gopher.woods-intro.default` shows a lumber worksite and heroine; Bron is not visibly identifiable.
- `gopher.landlord.default` shows a room interior without a visible landlord.
- `stage.goblin` visibly includes a goblin, so the refined alt can safely name the creature while staying scene-descriptive.

## Stable key mapping

Each final alt remains under:

`media.<mediaId>.alt`

No key, media ID or asset path changes.

## Integration policy

- `media.base.workshop.alt`: keep exact current root RU+EN.
- `media.base.town.alt`: keep the item-66 wording; additive at this baseline.
- all other listed keys: use the refined text above rather than the older item-66 narrative-overfit wording.
- if Lead later installs a dedicated event-specific presentation asset for one of these identities, re-audit alt against that actual asset before reuse.

## Locked boundary

Text-only alt refinement. No asset creation/rename, presentation selection, RNG, Save, event, trigger, effect or route changes.
