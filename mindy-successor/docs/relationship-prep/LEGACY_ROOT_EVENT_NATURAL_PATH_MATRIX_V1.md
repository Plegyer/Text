# Legacy Root-Event Natural-Path Matrix v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

All covered events use the event-schema default `blocking: true`. Once selected, the pending scene must be resolved through one of its currently eligible choice IDs before ordinary flow continues.

No new trigger behavior is proposed here.

| Event | Shortest current production path / prerequisites | Choices | Repeat status |
|---|---|---|---|
| `gopher.arrival` | Complete character creation, then use current `arrival` action while `story.arrived=false`. | `home`, `status`, `mystery` | one-shot, `maxShows=1` |
| `base.arrival` | After arrival flow, use legacy `work` while `alchemy.intro=false`. | `introduce` | one-shot |
| `base.bran` | Reach legacy `work >= 2`, keep `bran.met=false`, then complete `work` or `oddjob`. | `friendly` | one-shot |
| `base.invite` | Resolve `base.bran/friendly` so `bran.met=true`, then use `visit` while `bran.declined=false` and `bran.date=false`. | `yes`, `no` | one-shot |
| `base.order` | Reach legacy `work >= 3`, keep `alchemy.order=false`, then complete `work`. | `accept` | one-shot |
| `base.workday` | Resolve `base.arrival/introduce` so `alchemy.intro=true`, then complete `work` when higher-priority eligible one-shots do not take the same reaction. | `steady` | repeatable, `cooldownDays=7`, `maxShows=30`; variant cooldown still applies |
| `base.winter` | Be in winter, then complete `oddjob` or `forage`. | `help`, `pass` | repeatable, `cooldownDays=28`, `maxShows=4` |
| `base.shelter` | Reach current street housing; legacy compatibility exposes it as `housing=shelter`. Complete `rest`. | `tell` | repeatable, `cooldownDays=28`, `maxShows=4` |
| `gopher.tavern-intro` | After `story.arrived=true`, complete the first eligible legacy `tavern` action while `tavern.met=false`. | `agree` | one-shot |
| `gopher.tavern-quest` | Resolve tavern intro, accumulate `visits(tavern) >= 5`, have `persuasion >= 4`, keep `tavern.quest=false`, then use `tavern`. | `help`, `later` | repeatable until accepted; `cooldownDays=1`, `maxShows=30`; `help` sets `tavern.quest=true` |
| `gopher.receipt` | Accept `gopher.tavern-quest/help`; satisfy current `forest-search` action requirements including `perception >= 3`; complete `forest-search`, which sets `forest.receipt=true`. | `take` | one-shot |
| `gopher.tavern-resolution` | With `forest.receipt=true` and `tavern.resolved=false`, use current `tavern-talk`. | `guild`, `prince`, `wait` | can recur while unresolved; `maxShows=100`; `guild` or `prince` resolves, `wait` does not |
| `gopher.tavern-routine` | Resolve tavern intro so `tavern.met=true`, then use `tavern` when no higher-priority eligible tavern event takes the reaction. | `finish` | repeatable, `cooldownDays=4`, `maxShows=200`; season selects spring/summer/autumn/winter, with default fallback |
| `gopher.woods-intro` | After `story.arrived=true`, complete legacy `lumber` while `woods.met=false`. | `learn` | one-shot |
| `stage.goblin` | Resolve `gopher.woods-intro/learn`, reach `visits(lumber) >= 2`, then complete `lumber`. `lust >= 6` makes `curious` and `flirt` eligible; otherwise `default` remains valid. | `spar`, conditional `flirt`, `work` | repeatable, `cooldownDays=2`, `maxShows=100` |
| `gopher.hunt-intro` | After `story.arrived=true`, complete legacy `hunt` while `hunt.met=false`. | `learn` | one-shot |
| `gopher.landlord` | After `story.arrived=true`, use `landlord` while `satyr.met=false`. | `tea` | one-shot |

## Blocking / queued behavior

These events are blocking by the schema default. They are not optional-offer events.

If another pending scene already exists, resolver processing remains blocked by that existing pending scene. Priority and current eligibility can cause a different blocking event on the same trigger to be selected first; this matrix does not change that ordering.

## Locale invariants for Lead UI tests

For each natural path:

1. Reach the event using current production actions and prerequisites.
2. Snapshot pending `eventId`, `variantId`, `presentationId`, allowed choice IDs, RNG and gameplay Save.
3. Render RU.
4. Switch to EN without resolving the choice.
5. Assert the same pending event/variant/presentation/media and the same allowed choice IDs.
6. Resolve one exact existing choice.
7. Assert its effects occur exactly once and are identical regardless of locale.

Current renderer already localizes generic event title, variant body and choice labels through stable `event.*` keys when those keys exist. Media alt resolves through stable `media.<mediaId>.alt` when the candidate exposes the media identity.

## Ownership boundary

`gopher.receipt` documents the existing legacy/tutorial `forest-search` path only. This matrix does not alter Chat3-owned Forest Activity route/result semantics.

No School, poverty, Foreman or Secret Debt path is covered here.
