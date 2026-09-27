# Generic World Natural-Path Inventory v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

All events below use current schema defaults `blocking=true` and `delivery.policy=live`. Therefore they resolve as blocking live scenes, not optional/latched/scheduled queued offers.

| Event | Shortest current path | Blocking / queued | Repeatability |
|---|---|---|---|
| `gopher.arrival` | Finish creation → use `arrival` while `story.arrived=false`. | blocking, live, not queued | one-shot |
| `base.arrival` | After arrival → use `work` while `alchemy.intro=false`. | blocking, live | one-shot |
| `base.bran` | Reach legacy `work>=2`, keep `bran.met=false`, then use `work` or `oddjob`. | blocking, live | one-shot |
| `base.invite` | Set `bran.met=true` through `base.bran/friendly` → use `visit` while `bran.declined=false`, `bran.date=false`. | blocking, live | one-shot |
| `base.order` | Reach legacy `work>=3`, keep `alchemy.order=false` → use `work`. | blocking, live | one-shot |
| `base.workday` | Set `alchemy.intro=true` → use `work` when no higher-priority eligible work event preempts it. | blocking, live | repeatable; cooldown 7, max 30 |
| `base.winter` | Be in winter → use `oddjob` or `forage`. | blocking, live | repeatable; cooldown 28, max 4 |
| `base.shelter` | Reach current street housing, exposed to legacy conditions as `housing=shelter` → use `rest`. | blocking, live | repeatable; cooldown 28, max 4 |
| `gopher.tavern-intro` | After arrival → first eligible `tavern` while `tavern.met=false`. | blocking, live | one-shot |
| `gopher.tavern-quest` | `tavern.met=true`, `visits(tavern)>=5`, `persuasion>=4`, `tavern.quest=false` → use `tavern`. | blocking, live | can repeat until `help`; cooldown 1, max 30 |
| `gopher.receipt` | Choose tavern quest `help`; satisfy current `forest-search` requirements including `perception>=3`; complete `forest-search`. | blocking, live | one-shot |
| `gopher.tavern-resolution` | With `forest.receipt=true`, `tavern.resolved=false` → use `tavern-talk`. | blocking, live | repeatable while unresolved; max 100 |
| `gopher.tavern-routine` | `tavern.met=true` → use `tavern` when no higher-priority tavern event preempts it. | blocking, live | repeatable; cooldown 4, max 200 |
| `gopher.woods-intro` | After arrival → use legacy `lumber` while `woods.met=false`. | blocking, live | one-shot |
| `stage.goblin` | Resolve woods intro → reach `visits(lumber)>=2` → use `lumber`. `lust>=6` enables `curious` and `flirt`. | blocking, live | repeatable; cooldown 2, max 100 |
| `gopher.hunt-intro` | After arrival → use legacy `hunt` while `hunt.met=false`. | blocking, live | one-shot |
| `gopher.landlord` | After arrival → use `landlord` while `satyr.met=false`. | blocking, live | one-shot |

## Existing exact choices

- `gopher.arrival`: `home`, `status`, `mystery`
- `base.arrival`: `introduce`
- `base.bran`: `friendly`
- `base.invite`: `yes`, `no`
- `base.order`: `accept`
- `base.workday`: `steady`
- `base.winter`: `help`, `pass`
- `base.shelter`: `tell`
- `gopher.tavern-intro`: `agree`
- `gopher.tavern-quest`: `help`, `later`
- `gopher.receipt`: `take`
- `gopher.tavern-resolution`: `guild`, `prince`, `wait`
- `gopher.tavern-routine`: `finish`
- `gopher.woods-intro`: `learn`
- `stage.goblin`: `spar`, conditional `flirt`, `work`
- `gopher.hunt-intro`: `learn`
- `gopher.landlord`: `tea`

## Test invariants

For RU↔EN renderer checks, hold constant:
- event ID;
- selected variant ID;
- allowed choice IDs;
- presentation/media identity;
- RNG state;
- flags, metrics, resources and progression;
- event history and repeat counters.

Locale switching must not resolve a choice or retrigger an event.

`gopher.receipt` remains only the current legacy/tutorial `forest-search` event. No new Forest route behavior is introduced.
