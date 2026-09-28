# Helpful Poverty Scene-Depth Bank v2

Status: refined presentation-only RU-source + full EN copy for exact current **helpful street** identities.

Current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

No event/variant/choice/mechanic ID is created.

## `poverty-street-production.helpful-summer` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`.

RU:
`Под навесом торговец убирает последние ящики от вечерней сырости. Ему нужна ещё одна пара рук всего на несколько минут.`

EN:
`Under the awning, a merchant is moving the last crates out of the evening damp. One extra pair of hands is needed for only a few minutes.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text`.

RU:
`У закрывающегося прилавка остался тяжёлый свёрнутый тент. Его нужно сложить и убрать, пока площадь окончательно не опустела.`

EN:
`A heavy rolled awning remains beside a closing stall. It needs folding and putting away before the square empties completely.`

## `poverty-street-production-v2.helpful-summer-shade` / `market-closing`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text`.

RU:
`Рынок уже закрывается: кто-то снимает верёвки с навеса и торопится сложить полотно до темноты. Короткая помощь здесь пришлась бы кстати.`

EN:
`The market is already closing: someone is untying an awning and hurrying to fold the canvas before dark. A little brief help would be useful here.`

## `poverty-street-production-v2.helpful-summer-shade` / `late-shade`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text`.

RU:
`Между закрытыми лавками ещё держится полоса тени. Рядом собирают складной навес, и вечерняя работа почти закончена.`

EN:
`A strip of shade still lingers between the closed stalls. Nearby, a folding awning is being packed away and the evening work is nearly finished.`

## Semantic constraints

The scene may communicate:
- short ordinary work;
- closing market;
- crates/awning/canvas;
- a small chance to help.

It must not promise:
- exact money gain;
- guaranteed recovery;
- career progress;
- relationship progress;
- hidden reward.

## Deterministic-use rule

These candidates are consumed only after the exact current gameplay event and variant are selected.

Selection follows:
`POVERTY_DEPTH_DETERMINISTIC_SELECTION_CONTRACT_V1.md`.

No gameplay RNG or Save write is allowed.

## Secret Debt exclusion

No:
- lender;
- debt bargain;
- forced labor;
- hidden career;
- delayed obligation.

These are ordinary-poverty helpful street scenes only.
