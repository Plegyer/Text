# Profession EN Parity Review v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
RU source: `PROFESSION_RU_SOURCE_LABELS_V1.md`

| Career ID | RU label | Final EN label | RU description | Final EN description |
|---|---|---|---|---|
| `lumber` | Лесоруб | Lumber Worker | Работа в лесной артели: заготовка, распил и обычные хозяйственные задачи. | Work with the lumber crew on logging, sawing, and ordinary worksite tasks. |
| `satyr-maid` | Служанка у сатиров | Satyr Maid | Работа в баре сатиров: обслуживание гостей и порядок в зале. | Work at the satyr bar, serving guests and keeping the room in order. |
| `undead-farm` | Работница фермы нежити | Undead Farm Worker | Работа помощницей на ферме нежити: хозяйство, учёт и уход за участком. | Work as a helper on the undead farm, handling chores, records, and upkeep. |
| `tavern` | Работница таверны | Tavern Worker | Обычная работа в таверне: зал, гости и повседневные поручения. | Ordinary tavern work involving the common room, guests, and everyday errands. |
| `hunter` | Охотница | Hunter | Местная охотничья работа вне большой экспедиции. | Local hunting work outside the large expedition layer. |
| `guard` | Стражница | Guard | Городская служба стражи: патрули и обычные дежурства. | City guard work: patrols and ordinary duty shifts. |
| `merchant` | Торговка | Merchant | Рыночная работа: оценка, доставка и переговоры. | Market work involving appraisal, delivery, and negotiation. |
| `artist-geisha` | Дом искусств | Artist House | Работа в Доме искусств: репетиции, выступления и общение с гостями. | Work at the Artist House through rehearsals, performances, and guest-facing duties. |
| `assassin` | Тайная работа | Covert Work | Скрытая работа: наблюдение, доставка, подготовка маршрутов и зачистка следов. | Covert work involving surveillance, delivery, route preparation, and cleanup. |
| `prostitute` | Независимая профессиональная работа | Independent Professional Work | Добровольная работа с клиентами, где героиня сохраняет выбор и личные границы. | Voluntary client-facing work in which the heroine keeps agency and personal boundaries. |

## Parity checks

All 10 entries preserve the RU source meaning without adding:
- wages;
- requirements;
- relationship gates;
- Hard Work thresholds;
- Forest/School semantics;
- explicit sexual content;
- violent mission semantics.

## Naming notes

- `Lumber Worker` is the profession name, separate from the existing action label `Lumber shift`.
- `Covert Work` keeps the current non-graphic ordinary-work presentation for career ID `assassin`.
- `Independent Professional Work` keeps the current voluntary/professional framing for career ID `prostitute`.
- `Artist House` is retained as the established place/profession-facing identity for `artist-geisha`.

## Palace boundary

No `Palace` profession is introduced. Palace remains a separate meta unlock.

## Boundary

Translation only. No career IDs, action IDs, mechanics, progression, Save or RNG changes.
