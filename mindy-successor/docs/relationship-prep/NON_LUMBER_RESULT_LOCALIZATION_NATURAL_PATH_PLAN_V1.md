# Non-Lumber Result Localization Natural-Path Plan v1

Date: 2026-09-27
Status: LEAD TEST PLAN / NO NEW HELPERS
Baseline: current main `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`

## Shared shortest path

After normal game creation/arrival state is complete and the player has at least 1 current-day Energy:

1. Open **Work**.
2. Select the ordinary career action.
3. Complete the existing action transaction.
4. Observe the ordinary result screen.
5. Switch RU ↔ EN on the same persisted result state.
6. Verify only title/body presentation changes.

All nine actions currently have no action-specific entry conditions and cost 1 Energy. No new runtime helper is required.

## Career paths and invariant checks

| Career | Action | Result presentationId | Extra first-shift mechanic to preserve |
|---|---|---|---|
| Satyr Maid | `satyr-maid.shift` | `job/satyr-maid/result/default` | `completed_shifts +1` and existing `first-shift` career transition |
| Undead Farm | `undead-farm.shift` | `job/undead-farm/result/default` | `completed_shifts +1` and existing `first-shift` career transition |
| Tavern | `tavern.shift` | `job/tavern/result/default` | `completed_shifts +1` |
| Hunter | `hunter.shift` | `job/hunter/result/default` | `completed_shifts +1` |
| Guard | `guard.shift` | `job/guard/result/default` | `completed_shifts +1` |
| Merchant | `merchant.shift` | `job/merchant/result/default` | `completed_shifts +1` |
| Artist/Geisha | `artist-geisha.shift` | `job/artist-geisha/result/default` | `completed_shifts +1` |
| Assassin | `assassin.shift` | `job/assassin/result/default` | `completed_shifts +1` |
| Prostitute | `prostitute.shift` | `job/prostitute/result/default` | `completed_shifts +1` |

Each action also preserves its current wage formula and current seasonal stat effects. Locale switching must not re-run the action.

## Per-season coverage

For each career, exercise the already-selected seasonal scene identity:

- `spring.default`
- `summer.default`
- `autumn.default`
- `winter.default`

Expected body key:

`action.<action-id>.result.<season>.default.text`

Expected title key:

`action.<action-id>.label`

The same stored result must keep the same semantic result presentationId in both locales.

## RU ↔ EN invariants

Before switching locale, snapshot:

- `run.flow.lastAction.id`;
- `run.flow.lastAction.presentationId`;
- `run.flow.lastAction.media`;
- `run.flow.lastAction.deltas`;
- `run.historyState.actionCounts`;
- current Energy and money;
- career progression state/counters/facts/choices;
- RNG state;
- serialized Save excluding presentation preference if locale is stored outside Save.

After RU → EN and EN → RU:

- title/body resolve to the requested locale;
- action ID is unchanged;
- result presentationId is unchanged;
- selected scene/media is unchanged;
- deltas are unchanged;
- actionCounts are unchanged;
- wage is not paid again;
- Energy is not charged again;
- career effects do not run again;
- RNG does not advance;
- Save gameplay state is unchanged.

## Special boundaries

Hunter natural-path coverage uses only ordinary `hunter.shift`; it does not enter Forest or another Activity.

Prostitute result copy remains non-explicit and the existing voluntary career mechanics remain unchanged.

Assassin natural-path coverage checks ordinary covert-work result presentation only and adds no new mechanic or reward.

## Test ownership

This plan defines expected natural paths and invariants only. It does not add test runtime helpers or shared UI changes; those remain Lead/QA-owned.
