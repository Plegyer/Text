# Shared Night/Lodging EN Parity Review v1

Status: text-only English parity review for the same 20 shared Night/lodging keys reviewed in item 200.

English should stay semantically aligned with the Russian source, use the existing `Energy` stat name consistently, and avoid implementation jargon in player-facing copy.

| Key | Status | Final EN |
| --- | --- | --- |
| `ui.night.eyebrow` | APPROVE | Night |
| `ui.night.lodging.prompt` | REVISE | Choose a place for tonight. The lodging cost is charged once. |
| `ui.night.nextDayEnergy` | REVISE | Energy tomorrow: {delta} |
| `ui.night.choice.title` | APPROVE | Evening |
| `ui.night.choice.prompt` | REVISE | Choose one voluntary night activity. This does not spend daytime Energy. |
| `ui.night.choice.slot` | REVISE | Night activity |
| `ui.night.choice.select` | APPROVE | Choose |
| `ui.night.sequence.title` | REVISE | Night sequence |
| `ui.night.panel.title` | APPROVE | Night |
| `ui.night.panel.description` | REVISE | The night has three stages: lodging, one voluntary activity, and moving to the next day. |
| `ui.night.panel.start` | APPROVE | Start the night |
| `ui.result.chooseLodging` | APPROVE | Choose lodging |
| `ui.town.lodgingToday` | APPROVE | Lodging today: {cost} {coins} |
| `lodging.lodging.normal.label` | APPROVE | Normal room |
| `lodging.lodging.cheap.label` | APPROVE | Cheap lodging |
| `lodging.lodging.street.label` | APPROVE | Street / no lodging |
| `housing.room.label` | APPROVE | Normal room |
| `housing.hostel.label` | APPROVE | Cheap lodging |
| `housing.shelter.label` | APPROVE | Street |
| `nightChoice.night.sleep.label` | APPROVE | Sleep |

The revisions mirror the RU source review:
- “charged once” states the visible lodging rule directly;
- “Night activity” replaces slot terminology;
- the generic Night description explains the three stages without exposing an internal runtime name;
- `Energy` remains the named stat.

Reuse existing keys `ui.panel.sleep`, `ui.town.sleep.subtitle`, `ui.town.noEnergyPrompt`, and `ui.work.coins` rather than introducing duplicates.

No NightFlow, lodging, Energy, housing, command, or save mechanics are changed.
