# NightFlow Player-Language Terminology Audit v1

Status: player-facing terminology audit on exact post-PR50 current UI.

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Scope:
Night/lodging wording only. Runtime IDs and mechanics remain unchanged.

## Internal or mixed-language terms still visible

| Current visible wording | Problem | RU player-facing replacement | EN replacement | Identity/mechanic kept unchanged |
| --- | --- | --- | --- | --- |
| `Night` eyebrow | raw English in RU UI | `Ночь` | `Night` | same Night screen |
| `Один добровольный Night choice. Daytime Energy не расходуется.` | implementation/mixed language | `Выберите одно добровольное ночное занятие. Дневная Энергия при этом не расходуется.` | `Choose one voluntary night activity. This does not spend daytime Energy.` | same `VoluntaryNightChoice` phase |
| `Ночной слот` | UI/implementation jargon | `Ночное занятие` | `Night activity` | same night-choice ID |
| `Ночная последовательность` | mechanical wording | `Ход ночи` | `Night sequence` | same runtime phase flow |
| raw `night.phase` value in generic fallback | exposes runtime identity | map to localized presentation title/body | map to localized presentation title/body | enum value remains unchanged in Save |
| `NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.` | exposes internal subsystem name and mixed language | `Ночь проходит в три этапа: ночлег, одно добровольное занятие и переход к следующему дню.` | `The night has three stages: lodging, one voluntary activity, and moving to the next day.` | same NightFlow order |
| `Начать NightFlow` | exposes subsystem name | `Начать ночь` | `Start the night` | same `endDay` command |
| `checkpoint` in Activity status | internal save term; adjacent but not Night-specific | future shared UI wording should use player-language state or omit | same principle in EN | Activity checkpoint identity remains unchanged |
| `route:` in Activity status | raw state label | future localized route presentation should replace technical display | same principle in EN | route state remains unchanged |

## Night phase IDs that must never be translated in state

Keep exact runtime identities:
- `PreLodgingForcedCheck`;
- `LodgingResolution`;
- `PostLodgingForcedCheck`;
- `VoluntaryNightChoice`;
- `NightEventResolution`.

Player-facing localization must wrap these states rather than rename them.

## Lodging terms

Prefer:
- RU `ночлег`;
- EN `lodging`.

Do not surface internal hybrid wording such as:
- `lodging` inside RU prose;
- `housingTier`;
- `lodgingPaymentCommitted`.

Player-facing consequence copy may say:
- RU: `Плата за ночлег списывается один раз.`
- EN: `The lodging cost is charged once.`

The underlying one-time payment commit remains a runtime rule.

## Energy terminology

Use the named stat consistently:
- RU: `Энергия`;
- EN: `Energy`.

Avoid:
- mixed `Daytime Energy` inside RU sentences;
- lowercase `энергия` when it is clearly the stat label.

Safe formatter:
- RU: `Энергия завтра: {delta}`;
- EN: `Energy tomorrow: {delta}`.

## Choice terminology

Use:
- RU: `ночное занятие`;
- EN: `night activity`.

Avoid generic `slot` language in player-facing text.

School may continue to use domain-specific `ночная учёба` / `night study` through School-owned localization.

Foreman may continue to use its own named choice label.

## Generic fallback rule

If a raw runtime phase reaches a generic fallback screen:
- do not print the enum as the primary player-facing explanation;
- show a localized generic title;
- preserve the raw phase only for diagnostics/developer surfaces if needed.

## Mechanics firewall

Terminology cleanup must not change:
- phase order;
- intercept behavior;
- lodging payment logic;
- voluntary choice count;
- School/Foreman eligibility;
- next-day effects;
- commands;
- Save schema.

## Final disposition

The 20-key shared Night/lodging patch already contains the recommended player-language replacements for the principal NightFlow wording debt.

Lead-owned UI consumption should apply those strings around the unchanged runtime identities.
