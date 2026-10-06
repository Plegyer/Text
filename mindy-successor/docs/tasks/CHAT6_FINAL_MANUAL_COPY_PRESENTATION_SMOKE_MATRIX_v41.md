# Chat 6 — Final Manual Copy / Presentation Smoke Matrix v41

Status: **COMPLETE — READY_FOR_LEADER_REVIEW**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-release-audit-v39`

Purpose: compact manual release gate for final player-facing copy, localization, and presentation after the accepted localization/presentation assembly.

This matrix does not change runtime, mechanics, routing, reward ownership, or presentation behavior.

No full CI is requested.

## Authorities

Use these accepted layers together; do not validate against one branch-local shared JSON snapshot in isolation:

- v33 final localization/presentation manifest:
  `CHAT6_FINAL_LOCALIZATION_PRESENTATION_MANIFEST_v33.json`
- v36 Activity Network correction:
  localization blob `d631544c96c724375ac48d3c563dd1c1865bb5b5`
- v40 final player-facing localization closure:
  localization blob `4626e55203cda0d841a04eaf781db7879781138c`
- accepted Activity v17 player-facing ended-screen consumer:
  app blob `02afa7a9b32720c6e391c0a07974d662e77f8ea0`
- D42 Night presentation/localization:
  localization `9281d3880d01c54f352effa5e372ad5393cc3eaa`
  presentation `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`

## Release-gate rule

For every row below:

- **PASS** only if the RU and EN observations match the expected localized surface;
- **STOP** if a raw localization key, raw internal ID, wrong-language fallback, empty required copy, retired live content, or contradictory status/button wording is visible;
- presentation accessibility PASS requires both meaningful alt and caption where the slot contract uses both;
- runtime/UI-only failures must be routed to Leader/UI; Chat 6 must not patch runtime in this bundle.

## A. Ending families

| Surface | Manual action | Required RU/EN result | Gate |
| --- | --- | --- | --- |
| Ordinary / D40-D41 endings | Open Legacy/Fates and inspect every live ordinary ending family, including Hard Work and authored branches | title + description localized; no raw ending IDs; no retired Tavern IDs | PASS/STOP |
| Generic `guild-life` | Reach/inspect the ending card and completed screen where applicable | bilingual title/description/epilogue; no fallback-only prose | PASS/STOP |
| Generic `scholar-life` | Reach/inspect the ending card and completed screen where applicable | bilingual title/description/epilogue; no fallback-only prose | PASS/STOP |
| Secret Debt — Paid Freedom | Inspect card, accept/complete, inspect reward ownership | bilingual ending prose; reward label is human-readable | PASS/STOP |
| Secret Debt — Bound Life | Inspect card, accept/complete, inspect reward ownership | bilingual ending prose; reward label is `Рабочий ритм` / `Work Rhythm` | PASS/STOP |
| Secret Debt — Takeover | Inspect card, accept/complete, inspect reward ownership | bilingual ending prose; reward label is `Сетевой гонорар` / `Network Retainer` | PASS/STOP |
| Activity — Pathfinder | Inspect card and completed screen | bilingual title/description/epilogue; Specialist reward label localized | PASS/STOP |
| Activity — Preservation | Inspect card and completed screen | bilingual title/description/epilogue; Specialist reward label localized | PASS/STOP |
| Activity — Network | Inspect card and completed screen | exact v36 epilogue below; no four-region overclaim | PASS/STOP |
| Palace — Service Life | Inspect card and completed screen | bilingual title/description/epilogue; voluntary-stay semantics preserved | PASS/STOP |
| Palace — Court Power | Inspect card and completed screen | bilingual title/description/epilogue; no automatic world-ending implication | PASS/STOP |
| Palace — Inner Truth | Inspect card and completed screen | bilingual title/description/epilogue; unknown original cause remains unknown | PASS/STOP |
| Palace — Return Home | Inspect card and completed screen | bilingual title/description/epilogue; successor-world continuity preserved | PASS/STOP |

### Activity Network exact final copy

RU:

`Контакты связывают разрозненные направления в единое рабочее пространство.`

EN:

`The contacts tie disconnected routes into one practical working network.`

Any predecessor epilogue that unconditionally says the network joins **four** directions is stale and is a **STOP**.

## B. Generic ending screen

Run at least one ordinary ending, one Secret Debt ending, one Activity ending, and one Palace ending through the completed-state screen.

Check:

- completed heading is localized;
- committed-but-not-completed heading is localized;
- expired/time-limit heading is localized;
- ending identity/title is localized;
- completed state uses localized ending epilogue, not an old journal-line-only fallback;
- `Fates and next life` control is localized;
- changing RU -> EN on the completed screen changes all localized text without changing the ending ID/result.

**STOP** if the final Activity/Palace/Secret Debt epilogue is missing even though its localization row exists.

## C. Night surfaces

| Surface | Manual action | Expected result |
| --- | --- | --- |
| Generic lodging | End day and enter Lodging Resolution | localized Night eyebrow, lodging prompt, lodging labels, costs and next-day energy copy |
| Generic voluntary choice | Continue after lodging | localized Evening title, prompt, option labels and select buttons |
| Night finish action | Complete a D42 authored Night scene | localized finish label + finish-result text; no generic RU fallback in EN |
| Lumber Night | Trigger foreman social | event title/body/continue + alt/caption bilingual |
| Hunter Night | Trigger field debrief and senior-guide Night scenes | event title/body/continue + alt/caption bilingual |
| Guard Night | Trigger case debrief and partner Night scenes | event title/body/continue + alt/caption bilingual |
| Merchant Night | Trigger ledger-plan and supplier Night scenes | event title/body/continue + alt/caption bilingual |
| Assassin Night | Trigger handler contact | event title/body/continue + alt/caption bilingual |
| Prostitute Night | Trigger personal continuation and client-private scenes | event title/body/continue + alt/caption bilingual |
| Satyr Maid Night | Trigger recurring-guest private scene | event title/body/continue + alt/caption bilingual |
| Tavern Night | Trigger traveler-private scene | event title/body/continue + alt/caption bilingual |
| Generic Night presentation | Exercise generic `night/rest/default` and `night/rent-room/default` paths | meaningful media alt/caption, no missing-art key/raw token |

## D. Activity

Perform one Activity run with field time and one run that reaches an active mini-game.

Required labels from v40:

- `ui.activity.fieldTimeLabel`
  - RU `Полевое время`
  - EN `Field time`
- `ui.activity.miniGameLabel`
  - RU `Мини-игра`
  - EN `Mini-game`
- `ui.activity.suspicionLabel`
  - RU `Подозрение`
  - EN `Suspicion`

Also verify:

- Activity eyebrow/progress/checkpoint/route labels change with locale;
- route/option labels are human-readable;
- no raw option IDs or localization keys appear;
- Activity ending completed screen uses localized epilogue;
- Activity Specialist ownership labels remain:
  - `Surveyor's Atlas`
  - `Field Archive Protocol`
  - `Expedition Contact Network`.

## E. School

Check the school panel, paid lesson result, Night Study, and at least one eligibility explanation using `schoolCounter`.

Required v40 condition row:

- RU: `Школа {track}: {counter} {comparison}`
- EN: `School {track}: {counter} {comparison}`

Verify:

- course label + description bilingual;
- tuition/energy wording bilingual and semantically identical;
- lesson and Night Study buttons bilingual;
- School counter condition is never Russian-only in EN;
- no raw course/stat IDs in normal player-facing cards.

## F. Secret Debt

For each Secret Debt route:

- inspect eligibility/ending card in RU and EN;
- complete route;
- inspect completed ending screen;
- inspect Legacy ownership list after completion.

Required human-readable reward labels:

- Paid Freedom:
  - RU `Паритет заработанного резерва`
  - EN `Earned Reserve Match`
- Bound Life:
  - RU `Рабочий ритм`
  - EN `Work Rhythm`
- Takeover:
  - RU `Сетевой гонорар`
  - EN `Network Retainer`

**STOP** on any raw `secret-debt.*` reward ID.

## G. Palace

Exercise:

- invitation arrival/reveal;
- progression milestones;
- prince confrontation phases;
- outcome-ready state;
- explicit Return Home commit;
- all four Palace ending cards/completed screens.

Check RU and EN independently.

No route mechanic, gate, or ending ownership should change while switching locale.

## H. Strong Meta / reward ownership

### Ownership list — content gate

Inspect Legacy ownership after earning representative D40/D41/Secret Debt rewards.

v40 must prevent these classes of raw IDs:

- `satyr-maid.clear-terms`
- `knowledge.*`
- D40 `unlock.*` stable reward IDs
- Secret Debt stable reward IDs

For D40 the current generic consumer intentionally resolves compatibility rows shaped as:

`unlock.unlock.<domain>.<reward>.label`

This is a localization compatibility alias only; the underlying stable reward ID must remain unchanged.

### Strong Meta selection — runtime gate

v39 found an open P1: engine commands and persisted preferred selection exist, but the accepted player-facing app inspected by Chat 6 has no Strong Meta Keystone/Specialist selector.

Manual release gate:

1. before a new life, verify there is a player-facing surface to choose 0..1 Keystone and 0..2 Specialists from owned rewards;
2. change selection and start a life;
3. reload and verify the preferred selection persists;
4. verify retired/unowned rewards cannot be selected.

If the selector is still absent, mark **STOP — P1 runtime/UI**, route to Leader/UI, and do not attempt a localization-only workaround.

## I. Save / load / migration

Test in both locales:

- export save;
- import valid save;
- reject >2 MB file;
- recover valid backup when primary save is broken;
- show no-healthy-backup message;
- load a D41 legacy Tavern completion and verify migration.

Expected:

- success/recovery/error wrapper copy is localized;
- migration does not revive retired Tavern endings;
- retained migration labels stay human-readable;
- technical diagnostic payload may still be raw on exceptional errors — known v39 P2, not a v40 content regression.

## J. Generic buttons and status labels

Sweep creation, town, work, school, explore, Night, ending, menu, save/load and result screens in RU and EN.

**STOP** if any player-facing normal-flow control shows:

- a localization key such as `ui.*`;
- a raw domain ID such as `ending.*`, `specialist.*`, `knowledge.*`, or `unlock.*`;
- Russian fallback while locale is EN;
- empty required button/status text;
- contradictory labels for the same state.

Known developer-adjacent v39 P2:

- Catalog Inspector button/heading is hardcoded Russian in the accepted inspected UI.

Do not silently count that as localized; record it separately.

## K. Presentation alt / captions

For each major surface family — town, School, work/careers, Night, Activity, ordinary endings, Secret Debt, Activity endings, Palace — inspect the resolved media element with a screen reader/accessibility tree where possible.

PASS requires:

- localized alt for current locale;
- localized caption when the slot contract has a caption key;
- no raw altKey/captionKey text;
- no empty required alt/caption;
- safe fallback media remains meaningful when dedicated media fails.

The v39 assembled audit found no RU/EN pair gap for live/non-retired slots.

### Retired Tavern presentation absence

The following retired slots may remain as dead registry residue but must never render:

- `ending/tavern-stay`
- `ending/tavern-guild`
- `ending/tavern-court`

Their retired six alt/caption localization rows are intentionally deleted.

If any of those slots becomes player-facing, mark **STOP** rather than restoring deleted copy.

## L. RU / EN switch parity

For one representative flow from every section above:

1. begin in RU;
2. note stable IDs/state;
3. switch to EN without restarting;
4. inspect copy and accessibility labels;
5. switch back to RU.

PASS requires:

- state/eligibility/rewards unchanged;
- visible copy and alt/caption change language;
- no mixed-language fallback;
- no duplicated/desynchronized choices;
- save/reload preserves state, not localized rendered strings.

## M. Raw-key / fallback sweep

Final manual sweep should specifically search visible text/accessibility names for:

- `ui.`
- `ending.`
- `unlock.`
- `specialist.`
- `knowledge.`
- `activity.`
- `relationship.`
- obvious enum/status tokens such as `locked`, `eligible`, `committed` when a localized status is expected.

### Known open runtime/UI P1 from v39

The generic modal currently uses raw internal `panel` as its ARIA label in the accepted inspected UI.

Examples include:

- `work`
- `school`
- `explore`
- `sleep`
- `stats`
- `journal`
- `bag`
- `legacy`
- `menu`

If still present in the release candidate, mark:

**STOP — P1 runtime/UI: localized panel accessible name missing.**

Chat 6 v40 intentionally does not change this consumer.

## Final sign-off block

Manual reviewer records:

- ending families: PASS / STOP
- Night: PASS / STOP
- Secret Debt: PASS / STOP
- Activity: PASS / STOP
- Palace: PASS / STOP
- School: PASS / STOP
- Strong Meta ownership: PASS / STOP
- Strong Meta selection: PASS / STOP
- save/load/migration: PASS / STOP
- generic ending screen: PASS / STOP
- generic buttons/status: PASS / STOP
- alt/captions: PASS / STOP
- RU/EN switch parity: PASS / STOP
- retired content absent: PASS / STOP
- raw keys/fallback labels absent: PASS / STOP

Known open runtime/UI findings from v39 must be explicitly resolved or accepted by Leader; they are not closed by the v40 localization producer.

**v41 MANUAL SMOKE MATRIX COMPLETE — READY_FOR_LEADER_REVIEW**
