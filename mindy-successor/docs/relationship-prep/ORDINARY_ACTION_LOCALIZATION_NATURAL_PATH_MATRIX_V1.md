# Ordinary Action Localization Natural-Path Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

## Representative paths

| Action | Natural path | Requirement surface | Result source | RU↔EN acceptance |
|---|---|---|---|---|
| `forage` | Arrive in town → Explore → Ordinary errands → Gather herbs | none | `action.forage.scene.default.text` | card label/description and result title/body change language only |
| `forest-search` | Accept current tavern quest → reach perception 3 → Explore → Ordinary errands → Check forest storehouse | flags + perception requirement | `action.forest-search.scene.default.text`; a blocking legacy event may follow | same action/condition state; Forest Activity result semantics unchanged |
| `oddjob` | Arrive → Explore → Ordinary errands → small odd job | none | `action.oddjob.scene.default.text` | same money/Energy effect and action count |
| `repay` | Have debt >=1 and enough money/Energy → Bag → repay | debt requirement | `action.repay.scene.default.text` | same debt delta/cost; only action/result presentation changes |
| `rent-room` | Clear old debt, not already in legacy room → Bag → return to room | debt=0 + NOT housing room | `action.rent-room.scene.default.text` | same housing transition/cost; lodging payment semantics unchanged |
| `arrival` | Finish creation → pre-arrival shell → Follow the gopher | story.arrived=false | `action.arrival.scene.default.text`, but current blocking arrival event may become the visible scene | same zero-Energy story action and same event reaction |
| `brew` | Exact catalog/legacy action path with herb available → choose recipe | item herb requirement | `action.brew.scene.default.text` plus raw recipe journal outcome | same recipe rule/yields; journal localization remains limited |
| `tavern-talk` | Obtain current legacy receipt → Explore → Ordinary errands → discuss with innkeeper | current story flags | `action.tavern-talk.scene.default.text`; resolution event may follow | same event trigger/choice IDs after action |

## Action-list acceptance

For direct current action cards (`forage`, `forest-search`, `oddjob`, `repay`, `rent-room`, `tavern-talk`):

1. Snapshot action ID, conditions, enabled/disabled state, costs, resources and Save.
2. Render RU.
3. Switch to EN.
4. Assert:
   - same card/action ID;
   - same enabled/disabled state;
   - same cost values;
   - same requirement truth values;
   - only label/description/requirement presentation changes.
5. Switch back to RU with no gameplay mutation.

## Requirement acceptance

Use representative unmet conditions:
- `forest-search`: perception <3;
- `repay`: debt <1;
- `rent-room`: debt !=0 or already in room;
- `brew`: no herb.

Locale switch must preserve the exact `Condition` objects and `meets()/eligible()` results.

## Result acceptance

From equivalent pre-action states under RU and EN:
1. execute the same exact action once;
2. assert same action ID;
3. assert same selected current scene identity;
4. assert same presentation ID/media;
5. assert same deltas/resources/flags/action counts;
6. assert same resolver/event reaction behavior;
7. render title/body from stable action/scene keys where a future result consumer is present.

Current main still renders raw `lastAction.title/text`; item 128 defines the expected localized presentation without changing Save.

## Brew recipe acceptance

Test:
- gentle with herb;
- fast with alchemy >=3;
- fast with scales;
- fast without mastery/scales.

Across locales:
- success/failure decision is identical;
- herb consumption and alchemy +1 are identical;
- tonic yield is identical;
- no additional RNG is consumed;
- recipe button labels are presentation-only.

## Journal acceptance

Do not expect already-stored ordinary action log rows to change language after locale switch. Current action logs have `journalRef=null`.

Event-choice rows created after an ordinary action may localize through their own stable event refs; that is a separate identity.

## Invariants

No locale-dependent changes to:
- action/scene IDs;
- costs;
- conditions;
- effects;
- action counts/slots;
- event resolver;
- NightFlow;
- Save;
- RNG.
