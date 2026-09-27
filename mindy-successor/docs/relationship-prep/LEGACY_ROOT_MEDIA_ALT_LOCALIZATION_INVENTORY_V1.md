# Legacy Root Media-Alt Localization Inventory v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

Scope: current media identities actually referenced by the events covered in items 62–65.

## Inventory

| Media ID | Stable localization key | Current root | Proposed RU | Proposed EN |
|---|---|---|---|---|
| `base.workshop` | `media.base.workshop.alt` | ROOT_RU_EN | Условная иллюстрация алхимической лавки. | A stylized illustration of the alchemy workshop. |
| `base.town` | `media.base.town.alt` | MISSING | Условная иллюстрация фэнтезийного города. | A stylized illustration of the fantasy town. |
| `gopher.arrival.default` | `media.gopher.arrival.default.alt` | MISSING | Городская сцена с белым сусликом и открытым люком. | A town scene with a white gopher and an open hatch. |
| `gopher.tavern-intro.default` | `media.gopher.tavern-intro.default.alt` | MISSING | Сцена таверны для первой рабочей встречи с Мареком. | A tavern scene for the first work encounter with Marek. |
| `gopher.tavern-quest.default` | `media.gopher.tavern-quest.default.alt` | MISSING | Сцена таверны для разговора о пропавшей накладной. | A tavern scene for the conversation about the missing delivery note. |
| `gopher.receipt.default` | `media.gopher.receipt.default.alt` | MISSING | Лесная сцена, связанная с найденной накладной. | A forest scene associated with the recovered delivery note. |
| `gopher.tavern-resolution.default` | `media.gopher.tavern-resolution.default.alt` | MISSING | Сцена таверны для решения судьбы найденного документа. | A tavern scene for deciding what to do with the recovered document. |
| `gopher.tavern-routine.spring` | `media.gopher.tavern-routine.spring.alt` | MISSING | Весенняя сцена обычной смены в таверне. | A spring scene from an ordinary tavern shift. |
| `gopher.tavern-routine.summer` | `media.gopher.tavern-routine.summer.alt` | MISSING | Летняя сцена обычной смены в таверне. | A summer scene from an ordinary tavern shift. |
| `gopher.tavern-routine.autumn` | `media.gopher.tavern-routine.autumn.alt` | MISSING | Осенняя сцена обычной смены в таверне. | An autumn scene from an ordinary tavern shift. |
| `gopher.tavern-routine.winter` | `media.gopher.tavern-routine.winter.alt` | MISSING | Зимняя сцена обычной смены в таверне. | A winter scene from an ordinary tavern shift. |
| `gopher.tavern-routine.default` | `media.gopher.tavern-routine.default.alt` | MISSING | Обычная рабочая сцена в таверне. | An ordinary work scene in the tavern. |
| `gopher.woods-intro.default` | `media.gopher.woods-intro.default.alt` | MISSING | Рабочая сцена лесной артели для знакомства с Бронном. | A lumber-crew work scene for the introduction to Bron. |
| `gopher.hunt-intro.default` | `media.gopher.hunt-intro.default.alt` | MISSING | Лесная сцена для вводного инструктажа следопыта Рена. | A forest scene for tracker Ren’s introductory briefing. |
| `gopher.landlord.default` | `media.gopher.landlord.default.alt` | MISSING | Комната для вводного разговора с домовладельцем Силаном. | A room scene for the introductory conversation with landlord Silan. |
| `stage.goblin` | `media.stage.goblin.alt` | MISSING | Рабочая сцена с взрослым гоблином-плотником Тиком у верстака. | A work scene with the adult goblin carpenter Tik by the workbench. |

## Asset boundary

This inventory does not create, rename, replace or move media files. Existing media IDs and `src` paths remain authoritative.

The proposed alt strings describe the current event context without requiring a different image. Locale changes alt text only.

## Collision policy

- `media.base.workshop.alt` must remain exact-identical to the current root RU+EN entry.
- All other proposed keys are additive at the audited baseline.
- Any collision introduced after the baseline must be reconciled as exact-identical or reviewed by Lead before root merge.
