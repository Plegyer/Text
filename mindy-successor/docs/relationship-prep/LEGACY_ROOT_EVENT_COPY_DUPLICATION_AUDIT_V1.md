# Legacy Root-Event Copy Duplication Audit v1

Date: 2026-09-27
Status: PRESENTATION-ONLY COPY AUDIT
Scope: items 62–65.

## Result

No exact duplicate full RU or EN player-facing line exists across the authored legacy root-event banks.

Most copy is already differentiated by location, character and purpose. The remaining near-overlap is concentrated in short choice labels, where generic verbs naturally recur.

## Strongest near-overlap

### `base.workday/steady` ↔ `gopher.tavern-routine/finish`

Current:
- RU: «Спокойно закончить смену» / «Закончить смену»
- EN: “Finish the shift calmly” / “Finish the shift”

Recommended text-only differentiation:
- `base.workday.choice.steady.label`: **RU:** «Закрыть лавку без спешки» / **EN:** “Close the shop without rushing”
- `gopher.tavern-routine.choice.finish.label`: **RU:** «Завершить смену в таверне» / **EN:** “Finish the tavern shift”

Semantics and choice IDs remain unchanged.

### `base.bran/friendly` ↔ `gopher.landlord/tea`

Current labels both use thanking language.

Recommended:
- Bran: **RU:** «Поблагодарить за доставку» / **EN:** “Thank him for the delivery”
- Silan: keep **RU:** «Поблагодарить за помощь» / **EN:** “Thank him for the help”

This keeps the same social intent while making the action context explicit.

### Generic English “take” labels

`base.order.choice.accept.label` = “Take the order” and `gopher.hunt-intro.choice.learn.label` = “Take the briefing” share a generic verb but do not describe the same action.

Optional refinement:
- keep “Take the order” for `base.order`;
- use “Complete the briefing” for `gopher.hunt-intro`.

No RU change is necessary for this pair.

## Low-risk repeated structures

The following patterns recur but are not meaningful duplicates:
- “return / come back” in quest and document-resolution choices;
- “help / agree” in cooperative choices;
- “stay / keep” in refusal or defer choices;
- short outcome phrases beginning with «Теперь…» / “You can now…”.

They refer to different exact event identities and remain clear in context.

## Character-specific differentiation already present

- Orwin/base: workshop bureaucracy, potions, shop routine.
- Bran/base: courier awkwardness and tea invitation.
- Marek/gopher: tavern rules, festival document, dry humor.
- Bron/gopher: lumber-crew instruction.
- Ren/gopher: tracking and field briefing.
- Silan/gopher: housing agreement and practical guidance.
- Tik/stage: workbench banter, practice and optional flirtation.

No broad rewrite is recommended.

## Fixture relationship

Item 67 intentionally preserves the approved item 62–65 text as the integration fixture. The refinements above are optional Lead copy edits during selective integration; if adopted, RU and EN must be changed together under the same existing localization keys.

## Invariants

Copy differentiation must not change:
- event, variant or choice IDs;
- conditions, flags, metrics or effects;
- event priority/cooldown/repeat rules;
- RNG or Save state;
- media identity;
- route ownership.
