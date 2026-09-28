# Ordinary Night Result Copy RU+EN v2

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Choice labels

### `nightChoice.night.sleep.label`
RU: Спать  
EN: Sleep

### `nightChoice.lumber.foreman.night.label`
RU: Поговорить с бригадиром  
EN: Talk with the Foreman

## Sleep result

The current `night.sleep` choice has no dedicated result event/body.

No result key is authored for it in this wave.

## Foreman Night follow-up result

### `event.lumber-night.foreman-professional.title`
RU: Разговор после смены  
EN: After-shift conversation

### `event.lumber-night.foreman-professional.variant.default.text`
RU: После работы вы задерживаетесь ненадолго и спокойно обсуждаете дела артели. Это добровольное продолжение рабочего знакомства занимает вечер, но не превращает его в ещё одну дневную смену.  
EN: After work, you stay a little longer and calmly talk through crew business. This voluntary continuation of the working acquaintance takes the evening, but it does not turn into another daytime shift.

### `event.lumber-night.foreman-professional.choice.continue.label`
RU: Продолжить по-деловому  
EN: Continue professionally

### `event.lumber-night.foreman-professional.choice.continue.text`
RU: Сохранить разговор в рамках профессионального доверия.  
EN: Keep the conversation within the bounds of professional trust.

## Parity / behavior

The copy states only what current mechanics already do:
- voluntary Night choice;
- professional relationship;
- evening consumed by NightFlow;
- no additional daytime action;
- no romance promise;
- no universal next-day Energy penalty.

No new outcome, reward, relationship stage, fact or counter is authored here.
