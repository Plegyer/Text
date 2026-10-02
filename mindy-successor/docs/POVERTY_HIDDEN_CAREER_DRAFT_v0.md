# Secret Debt / Slave Career — design draft v0

Дата: 2026-09-25.

Статус: **USER-DIRECTED DESIGN DRAFT**.

Основание:
- LIFE-05 / LIFE-07 / LIFE-12 / LIFE-14 из `USER_VISION_AND_ACCEPTANCE.md`;
- последнее прямое решение пользователя: ветка должна быть **секретной**, запускаться через редкое одноразовое событие помощи во время ночёвки на улице и только позже раскрывать настоящую цену;
- пользователь зафиксировал три обязательных outcome families: выплата долга, жизнь в зависимости по типу «Упорного труда», убийство рабовладельца и занятие его места.

## Current-authority override — 2026-10-02

The prior non-numeric firewall is superseded by the user's direct Product decisions recorded in
`USER_DECISIONS_LOCKED_v1.md` D19-D20.

Locked baseline:
- lender chance on each eligible unseen street night: **20%**;
- refusal closes the encounter for the current life;
- immediate accepted help: **2000**;
- activation: **10 days** after acceptance;
- activated debt: **20000**;
- activation domain-locks all 10 ordinary professions until exit while preserving their stored progress;
- School remains available;
- Activity remains available, but must not be an easy repeatable 20000-money farm;
- hidden daytime work is paid profession work and Lust contributes positively to wage scaling;
- every bound night is forced and gives next-day Energy **-1**;
- repayment is a single explicit all-at-once 20000 action;
- hidden Hard Work baseline is **50 daytime shifts**, excluded from Palace 10/10;
- owner-kill/control route requires career progress + stat build + high Lust + **10 paid School lessons** and a separate explicit player action;
- Body Confidence School gives voluntary **Lust +2** per paid lesson.

Still balance-owned:
- exact per-shift Strength / Endurance / Sexuality gains;
- exact hidden-work wage coefficients;
- exact stat and high-Lust thresholds for owner-kill/control;
- exact ending Meta rewards.

Any older line in this draft that calls 20% / 2000 / 10 days / 20000 / -1 Energy / 50 shifts merely historical or OPEN is stale.

---

## 1. Основная идея

Это не обычная poverty-система и не видимая игроку профессия.

Игрок может прожить весь run и вообще не увидеть эту ветку.

Она начинается как редкое событие помощи во время ночёвки на улице:

```text
ночёвка на улице
-> одноразовая проверка редкого события
-> появляется "добряк"
-> предлагает крупную немедленную помощь
-> игрок принимает или отказывается
```

Если игрок отказывается, событие больше не повторяется.

Если принимает, он получает немедленную выгоду и скрытый отложенный долг.

Система должна ощущаться как находка/секрет, а не как обязательная часть poverty tutorial.

## 2. Trigger

Current non-numeric concept boundary:

- event belongs to the hidden poverty/Secret Debt route;
- occurrence policy must remain rare/hidden rather than mandatory poverty progression;
- repeatability policy, trigger probability and exact eligibility remain OPEN unless separately locked;
- immediate offer amount is OPEN;
- player can accept or refuse.

Do not recover numeric values from historical drafts.

### Формулировка предложения

По прямому решению пользователя NPC **не предупреждает о подвохе** и не намекает на будущую зависимость.

Смысл предложения простой:

> «Вернёшь позже».

Игрок знает только, что деньги нужно будет когда-нибудь вернуть.

Не раскрываются заранее:
- exact activation delay;
- exact future debt amount;
- скрытая профессия;
- блокировка остальных профессий;
- ночные обязательства;
- возможные endings.

Секретность и резкий контраст между небольшой помощью сейчас и настоящей ценой позже — часть задуманного эффекта ветки.

## 3. Delayed trap

После принятия помощи создаётся отложенное обязательство:

```text
loanAcceptedAtDay = currentDay
activationDay = currentDay + ACTIVATION_DELAY_OPEN
principalReceived = OFFER_AMOUNT_OPEN
futureDebt = DEBT_AMOUNT_OPEN
```

После отдельного, пока OPEN activation delay появляется требование по пока OPEN debt amount.

Точный механизм роста суммы может быть нарративным/контрактным; он не обязан моделировать реалистичные банковские проценты.

Важно именно игровое соотношение:
- помощь сейчас очень привлекательна для бедной героини;
- после delayed activation долг должен создавать реальное давление, но точная сумма/задержка пока OPEN;
- это открывает скрытую карьеру.

## 4. Скрытая профессия "Рабыня"

После активации долга:

- появляется скрытая работа `slave`;
- она становится доступной в обычное дневное время как полноценная профессия;
- **все остальные обычные профессии блокируются**;
- текущая career progression других jobs сохраняется в state, но не может продвигаться, пока блокировка активна;
- школа/дополнительные активности/прочие действия требуют отдельного design decision и не считаются автоматически заблокированными, если пользователь позже не решит иначе.

Таким образом ветка временно заменяет профессиональную жизнь героини.

Она не входит в обычные 10 jobs и не показывается до скрытого trigger.

## 5. Работа как полноценная career

Работа "Рабыня" строится по тем же принципам глубины, что и обычные профессии:

```text
repeatable shift
+ career stages
+ stat gates
+ external conditions
+ relationship/story events
+ multiple endings
+ meta rewards
```

Это не просто кнопка "отработать долг".

У неё должны быть:
- обычные смены;
- стаж;
- реактивные карьерные сцены;
- собственные персонажи;
- как минимум три разные ending families;
- внешние условия для сложных веток;
- сезонные/контекстные варианты;
- отдельная ночная составляющая зависимости.

## 6. Stat gains

Прямое решение пользователя для обычной смены этой профессии:

- растёт **Сила**;
- растёт **Выносливость**;
- растёт **Сексуальность**.

Поскольку финальный stat catalog ещё не зафиксирован, слово **Сексуальность** здесь считается пользовательским design axis.

Не заменять его автоматически на `Похоть` без отдельного решения.

Если в финальном stat catalog Сексуальность и Похоть окажутся одной характеристикой, это будет отдельное design lock/migration decision.

Конкретный размер gains пока OPEN.

## 7. Блокировка других профессий

После activation:

```text
JobAvailability(otherJob) = false
JobAvailability(slave) = true
```

Причина — не UI hide, а domain rule.

Это важно:
- нельзя обойти зависимость через другой экран;
- save/load не должен временно разблокировать старые jobs;
- Event Resolver не должен запускать normal career progression заблокированных профессий;
- их прежний progress не стирается.

После выхода из зависимости блокировка снимается.

## 8. Ночная обязанность

Помимо дневной скрытой профессии, зависимость имеет обязательную ночную секс-работу.

Она:
- перехватывает normal night flow;
- блокирует обычные voluntary night choices;
- даёт отрицательный NextDay Energy modifier;
- может продвигать отдельные counters/events этой career;
- не заменяет дневную смену и не считается той же самой action.

То есть зависимость давит на героиню с двух сторон:
- днём доступна только новая работа среди профессий;
- ночью часть свободы тоже потеряна.

Это делает route реально отличающимся от обычной работы.

Точная величина Energy penalty OPEN.

## 9. State model

```text
SecretDebtState
  encounter:
    unseen
    offered
    refused
    accepted
    consumed

  loanAcceptedDay?
  activationDay?
  principalReceived
  debtCurrent

  career:
    inactive
    bound
    resolved

  shifts
  nightWorkCount
  careerStage
  counters
  choices
  facts
  outcomeEligible[]
```

`encounter = refused/accepted` гарантирует одноразовость.

Не реализовывать это набором generic boolean flags.

## 10. Outcome family A — Paid Freedom

`paid_freedom`

Героиня собирает деньги и выплачивает требуемый долг.

Ветка проверяет экономическую игру.

После выплаты:
- professional lock снимается;
- обычные jobs снова доступны;
- ending становится eligible по общему ending flow;
- игрок может либо принять судьбу, либо продолжить run, если итоговый design это допускает.

Meta reward — экономического типа, exact reward OPEN.

## 11. Outcome family B — Bound Life / Hard Work analogue

`bound_life`

Героиня не выходит из зависимости и проходит её карьеру достаточно далеко, чтобы получить полноценную жизненную судьбу.

Это не failure screen.

Она становится аналогом «Упорного труда»:
- достаточный стаж;
- career milestone;
- сознательный commitment к этой жизни.

Exact meta reward OPEN.

OPEN: засчитывается ли эта hidden ending в общий Hard Work progress для открытия 11-й профессии.

## 12. Outcome family C — Takeover

`takeover`

Героиня убивает рабовладельца и занимает его место.

Это сложная ветка, которая должна требовать больше, чем просто shifts.

Минимальная форма:
- достаточный career progress;
- определённый build;
- осознанный route choice;
- хотя бы одно внешнее условие: предмет, союзник, школа, relationship или большая Activity.

После completion:
- хозяин устранён;
- героиня получает контроль над системой/заведением;
- это отдельная сильная ending family.

Meta reward должен быть существенно более сильным или rule-changing по сравнению с простой стажевой веткой. Exact reward OPEN.

## 13. Почему три endings должны различаться

Нельзя делать:

```text
20 shifts -> paid
40 shifts -> bound
60 shifts -> takeover
```

Нужно:

- `paid_freedom` — economy solution;
- `bound_life` — endurance/career solution;
- `takeover` — multi-system power solution.

Один и тот же secret trap превращается в три разных способа прожить жизнь.

## 14. Acceptance

Минимальный продуктовый сценарий:

1. Героиня ночует на улице.
2. Редкое событие может появиться только один раз.
3. Игрок получает предложение около 2000.
4. При отказе route закрывается для текущего run.
5. При принятии деньги выдаются сразу.
6. Следующие 9 дней normal job life продолжается.
7. На 10-й день активируется требование около 20000.
8. Появляется скрытая профессия "Рабыня".
9. Остальные профессии становятся недоступны, но их progress не стирается.
10. Рабочие смены развивают Силу + Выносливость + Сексуальность и собственную career.
11. Ночь имеет обязательную работу и next-day Energy penalty.
12. Save/load до и после activation не меняет срок, долг, RNG outcome и одноразовость encounter.
13. Все три outcome families достижимы разными механическими путями.
14. После освобождения professional lock снимается.
15. Meta reward выдаётся только после ending completion.

## 15. Открыто

- точный шанс внутри 10–20%;
- точная сумма помощи около 2000;
- точный долг около 20000;
- показывать ли игроку дату возврата сразу;
- точная формулировка предупреждения;
- размер next-day Energy penalty;
- остаются ли доступны школа и большая Activity после activation;
- конкретные career stages;
- exact stat gain numbers;
- является ли Сексуальность отдельным stat от Похоти;
- exact conditions и meta rewards endings;
- считается ли `bound_life` Hard Work progress;
- дополнительные secret outcomes.
