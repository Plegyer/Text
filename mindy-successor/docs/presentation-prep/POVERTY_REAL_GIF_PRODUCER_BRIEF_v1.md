# Poverty Real-GIF Producer Brief v1

Status: **PRODUCER-READY REQUEST / ORDINARY POVERTY ONLY**

Secret Debt is explicitly excluded.

Current real GIF inventory: **0**.

## Smallest batch that completes one production pool

Target semantic identity:

`location/town/event/poverty-pressure-production-cold-rain/default`

Current static fallback:

`assets/stage-outside.svg`

Requested real GIF files:

| Target filename | Candidate key | Loop brief — EN / RU | Reuse compatibility | Acceptance notes |
| --- | --- | --- | --- | --- |
| `assets/gif/poverty/cold-rain-01.gif` | `poverty-cold-rain-01` | Exterior rain loop: character shelters briefly under a neutral overhang while rain crosses the frame; reset without showing a consequence. / Уличный цикл дождя: героиня ненадолго укрывается под нейтральным навесом, дождь проходит через кадр; возврат без показа последствия. | May be reused only by poverty identities where rain/shelter is context-correct. / Reuse только там, где дождь и укрытие соответствуют контексту. | Must not imply money loss, stat loss, rescue, or a changed event outcome. |
| `assets/gif/poverty/cold-rain-02.gif` | `poverty-cold-rain-02` | Wet-street movement loop: cautious steps through rain and puddles, then neutral reset. / Цикл движения по мокрой улице: осторожные шаги под дождём и через лужи, затем нейтральный возврат. | Could serve another exterior rain-pressure identity only after explicit semantic reuse review. / Возможен reuse для другого уличного дождевого pressure-события только после semantic review. | No fall, injury, theft, help, reward, or branching cue. |
| `assets/gif/poverty/cold-rain-03.gif` | `poverty-cold-rain-03` | Cold-rain waiting loop: character warms hands or adjusts outer clothing while rain continues; loop ends where it began. / Цикл ожидания под холодным дождём: героиня согревает руки или поправляет верхнюю одежду, дождь продолжается; конец совпадает с началом. | Safe only for contexts where cold/rain pressure is already the authored event identity. / Безопасен только там, где холод и дождь уже входят в authored event identity. | No readable text and no visual encoding of a mechanical penalty. |

## RU + EN invariant

The same three locale-neutral GIF files serve both locales.

Do not bake into the image:
- Russian or English text;
- numeric penalties;
- prices;
- event choice labels;
- hidden mechanics.

RU/EN alt text is added at integration time through locale-neutral localization keys.

Suggested alt meaning:

- RU: «Героиня пережидает холодный дождь на городской улице.»
- EN: “The heroine waits through cold rain on a city street.”

Candidate-specific alt may describe the exact visible motion, but must not claim hidden effects.

## Why this identity is first

`poverty-pressure-production.cold-rain` is:
- already shipped ordinary-poverty production;
- repeatable enough to benefit from visual variation;
- semantically narrow enough to brief without inventing new gameplay;
- backed by a real static exterior fallback;
- independent from Secret Debt.

Supplying all three requested real GIFs can create one complete minimum-size PR42 pool immediately after preflight/localization/integration checks.

## Production acceptance

This pool remains blocked until:
1. all three files physically exist under prototype `assets/`;
2. GIF signatures validate;
3. RU and EN alt keys exist;
4. candidate keys are unique;
5. static fallback `assets/stage-outside.svg` remains;
6. semantic ID resolves on current main;
7. animations-off stays static;
8. media selection cannot alter the authored pressure event or its mechanics.

No placeholder filename in this brief counts as a shipped asset before the corresponding repository blob exists.
