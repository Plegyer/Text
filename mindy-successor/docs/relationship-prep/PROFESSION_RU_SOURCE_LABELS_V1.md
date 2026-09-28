# Profession RU Source Labels v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `54131488c65302f81b3001abaaa345d21f0281e2`

| Career ID | Final RU label | Final RU description |
|---|---|---|
| `lumber` | Лесоруб | Работа в лесной артели: заготовка, распил и обычные хозяйственные задачи. |
| `satyr-maid` | Служанка у сатиров | Работа в баре сатиров: обслуживание гостей и порядок в зале. |
| `undead-farm` | Работница фермы нежити | Работа помощницей на ферме нежити: хозяйство, учёт и уход за участком. |
| `tavern` | Работница таверны | Обычная работа в таверне: зал, гости и повседневные поручения. |
| `hunter` | Охотница | Местная охотничья работа вне большой экспедиции. |
| `guard` | Стражница | Городская служба стражи: патрули и обычные дежурства. |
| `merchant` | Торговка | Рыночная работа: оценка, доставка и переговоры. |
| `artist-geisha` | Дом искусств | Работа в Доме искусств: репетиции, выступления и общение с гостями. |
| `assassin` | Тайная работа | Скрытая работа: наблюдение, доставка, подготовка маршрутов и зачистка следов. |
| `prostitute` | Независимая профессиональная работа | Добровольная работа с клиентами, где героиня сохраняет выбор и личные границы. |

## Copy rules

- Exact current 10 ordinary career IDs only.
- Labels describe the profession/career identity, not an individual shift.
- `assassin` copy remains non-graphic and focused on ordinary covert work already represented by current content.
- `prostitute` copy remains non-explicit, voluntary and professional.
- `hunter` remains ordinary local work and does not merge with Forest/Old Boundary expedition semantics.
- `lumber` copy does not add relationship, Forest or Hard Work conditions.

## Palace boundary

No Palace profession is authored here. `palace` is a meta unlock, not a career ID.

## Stable keys

For each exact career:
- `profession.<careerId>.label`
- `profession.<careerId>.description`

## Boundary

Presentation copy only. No wages, requirements, counters, stages, progression, Hard Work, Save or RNG changes.
