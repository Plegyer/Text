# Product Acceptance Execution Plan v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Target: first Lumber vertical Product Acceptance Slice  
Normative source: `docs/PRODUCT_ACCEPTANCE_SLICE_v0.md`

## Purpose

This is an executable sequence for the first product-level Lumber acceptance pass after A5/A6 and the product content are integrated. It is intentionally more specific than a design checklist: each step states what to do, what state must change, what must not change, and where a save/reload comparison is required.

The plan does not invent future content prices, wages, stage IDs or thresholds. Resolve those from the integrated catalog at test start and record them as constants:

- `M0 = 600` starting money.
- `Emax = 3` base fresh-day Energy.
- `W = resolved ordinary Lumber shift money delta`.
- `S = resolved School money cost`.
- `L = resolved normal-room lodging cost`.
- `F = 2` Forest Activity daily-Energy entry cost.

Where a content value is not locked numerically, the assertion is exact against the loaded definition, not against an invented number.

## Test fixture discipline

Run this twice:

1. a normal player-flow pass from a fresh run, advancing naturally until the required Lumber milestone;
2. a deterministic acceleration pass from a generated acceptance fixture positioned immediately before expensive repetition thresholds.

The accelerated fixture may set already-earned typed state only. It must not bypass the command/effect/resolver path being accepted, and it must validate through the normal save parser before use.

At every checkpoint compare the normalized serialized save, not compatibility façade properties.

## Execution sequence

| Step | Player operation | Required state assertion | Energy / money / calendar assertion | Resolver / presentation assertion | Save/reload action |
|---|---|---|---|---|---|
| 0 | Load integrated catalog and record IDs/cost definitions used by this run | Lumber, Satyr Maid and Undead Farm are visible Day-1 career alternatives; no hidden test IDs are needed for the product flow | `money=M0`, `Energy=Emax`, elapsed day 0 | Central media stage exists; day/season/year, money and Energy are visible | Save `PA00-fresh`; reload must deep-equal normalized state |
| 1 | Finish character creation | 12 progression stats + separate Lust remain valid; creation becomes complete | No gameplay Energy or money cost; day remains 0 | DayHub becomes usable | Optional reload sanity check |
| 2 | Select/enter Lumber career context | Lumber is the selected/introduced career through typed career state | No Energy cost unless the integrated definition explicitly models a paid/energy action; any reactive intro is 0 Energy | If intro is blocking, incompatible DayHub commands are blocked until choice resolution | Save after introduction if a pending scene exists |
| 3 | Execute one ordinary Lumber shift | Shift/counter increments once; seasonal stat package applies once; wage applies once | Energy decreases by exactly 1; money changes by exactly `W`; day does not advance | Ordinary-shift media is shown on central stage and deltas are understandable | Save `PA03-after-shift`; reload must not repeat cost, wage or stat effects |
| 4 | Execute a repeatable/seasonal Lumber variant | Variant corresponds to current 10-day season and does not duplicate one-time milestone reward | Each real shift costs exactly 1 Energy; reactive scene itself costs 0 | Presentation variant may differ without changing mechanical package | Reload once with the result screen open; media/variant remains stable |
| 5 | Reach the configured Lumber milestone through normal shifts (or the pre-milestone fixture, then one real shift) | Career transition/milestone happens once; Foreman relationship becomes introduced/available through typed state | Triggering Work costs 1; milestone/relationship reaction costs 0 additional Energy | Milestone scene appears immediately through Resolver; no extra Work command is required just to notice the earned gate | Save pending milestone scene; reload must preserve event/variant/choices |
| 6 | Resolve milestone and Foreman opening | Career and relationship facts/stages reflect the chosen professional route; romance must not be required | No additional daytime Energy for reactive choices | Relationship media is shown; incompatible actions remain blocked while scene is pending | Save/reload after relationship introduction |
| 7 | Take the required School lesson | School track/progress changes; a milestone/public fact is produced and affects Lumber or Foreman progression | Energy decreases by exactly 1; money decreases by exactly `S`; day does not advance | School must not be only `pay -> +stat`: teacher/presentation + progress + public fact are observable | Save `PA07-school-result` before resolving any newly pending reactive scene |
| 8 | Let Resolver process the School result | Earned Lumber/relationship continuation appears without visiting Work again | No Work Energy and no extra School charge | Direct cross-system reaction is blocking/visible according to definition; no manual “refresh” action | Reload pending continuation; RNG/variant/choices must not change |
| 9 | Resolve continuation and obtain the meaningful item | Inventory/capability state gains the defined item/capability exactly once | No duplicate charge/reward on scene resolution | Inventory UI explains the capability, not only a numeric bonus | Save/reload and verify capability remains available |
| 10 | End the day | NightFlow enters its persisted first stable phase | No calendar advance yet; no lodging charge before its configured phase | If a forced event is eligible, its intercept policy must be honored deterministically | Optional checkpoint before lodging |
| 11 | Choose normal lodging | Lodging selection/payment is committed once | Money becomes previous money minus `L`; current day still unchanged | If an after-lodging event is pending, it appears after payment | **Mandatory checkpoint:** save `PA11-paid-lodging`, reload, assert no second payment |
| 12 | Choose the optional Foreman night meeting when eligible | Relationship state/facts change through relationship domain; professional route remains valid without romance | Meeting consumes the Night slot, not daytime Energy | Relationship night media is shown; any blocking scene resumes the same NightFlow | Save pending relationship scene if present; reload it |
| 13 | Finish the night | Next-day modifiers apply once; NightFlow clears | Calendar advances exactly once; fresh-day Energy is base 3 plus declared next-day modifier; no second lodging charge | StartDay Resolver may run only after finalized night state | Save `PA13-next-day`; reload state equality |
| 14 | Enter Forest Activity | `ActivityEnvelope` exists with activity ID, definition version and checkpoint/internal state | Daily Energy decreases by exactly `F=2` once; money changes only if the Activity definition explicitly declares a money cost; day does not advance on entry | Activity media/context is visible | **Mandatory checkpoint:** save `PA14-inside-activity` before first internal challenge |
| 15 | Reload inside Forest Activity | Same Activity ID/version/checkpoint/internal resource/RNG are restored | Daily Energy is exactly the post-entry value; the 2-Energy entry cost is not charged again | Same route context/presentation resumes | Deep-compare pre-close and post-reload normalized Activity envelope |
| 16 | Traverse the Forest’s route/challenge sequence | Acceptance run observes 3 route contexts, 3 challenge families, separate internal resource and the configured season difference | Internal actions reduce only Activity-owned resource unless explicitly specified; they do **not** repeatedly consume daily Energy | Media can vary by route/season without mutating mechanics | Save at one additional internal checkpoint and resume |
| 17 | Use the obtained item capability | A new Activity action/option becomes available because of the item/capability | Item use follows its declared consumption rule; no implicit daily-Energy charge | This must be an action-space change, not only a percentage/stat bonus | Reload before use once; availability remains deterministic |
| 18 | Exit Forest successfully | Activity envelope closes through declared success result; typed result/Quest/World fact is emitted exactly once | No second 2-Energy charge on exit; day remains current day | Resolver immediately triggers Lumber continuation from the result fact without an extra shift | Save pending post-Activity Lumber scene; reload it |
| 19 | In a separate branch of the same deterministic fixture, exercise Forest escape | Escape result is distinct from success and closes/resumes according to declared policy | No duplicate entry cost | Resolver sees the declared escape result/fact; success-only rewards are absent | Save/reload once around escape |
| 20 | Resolve post-Activity Lumber continuation | Career/relationship/world state advances exactly once | Reactive continuation costs 0 daily Energy unless explicitly defined otherwise | No “go work once more to notice result” behavior | Save after continuation |
| 21 | Reach a state where at least two Lumber endings are eligible | Lumber Hard Work and one complex Lumber branch are both registered eligible in the same state | Eligibility costs nothing and does not advance calendar | UI lists eligibility separately from commitment; normal play remains available | **Mandatory checkpoint:** save `PA21-eligible-not-committed`, reload |
| 22 | Perform one ordinary permitted action while endings are eligible | Run remains active; chosen action resolves normally | Its declared cost applies once | Eligibility must not auto-end or award Meta | Reload after action if it can trigger a scene |
| 23 | Commit one ending explicitly | Ending state becomes committed; normal progression is suppressed as specified | Commitment itself does not duplicate earlier action costs | Ending media appears at the proper stage | **Mandatory checkpoint:** save `PA23-committed-before-completion`, reload |
| 24 | Execute central completion | Exactly one stable `RunResult` is produced; run reaches completed terminal state | No unrelated Energy/lodging/calendar mutation | Ending presentation is shown; incompatible normal actions remain unavailable | Save immediately before and after completion; retry/reload cannot create a second result |
| 25 | Apply/observe Meta reward | Reward proof records the RunResult as applied exactly once | No duplicate currency/resource/unlock on repeated load or click | Reward is visible and attributable to the chosen ending | **Mandatory checkpoint:** save `PA25-reward-before-new-run`, reload twice and assert identical Meta |
| 26 | Start New Run | Run-owned domains reset; protected Meta remains | Fresh run returns to starting calendar/Energy/money policy except explicit Meta rule modifiers | At least one visible option/rule/contact/item availability differs because of Meta | Save/reload new run and verify the difference persists |

## Global invariants to assert after every step

- Serialized state validates against the current schema and current catalog.
- No duplicate authoritative money/Energy/calendar/stat owner appears.
- Pending blocking scene prevents incompatible commands.
- A failed command leaves caller state unchanged.
- Resolver output is deterministic for identical state/RNG/command.
- A reload never recharges a cost already committed.
- Daily Energy is consumed only by explicit daytime actions and the one-time Activity entry contract; Activity-internal resources stay inside the Activity envelope.
- Relationship/career reactive scenes are 0 daily Energy unless their explicit action definition says otherwise.
- Ending eligibility and ending commitment remain separate.
- Presentation overrides cannot alter mechanics IDs, conditions or effects.

## Media / GIF fallback checks inside the same run

At the ordinary shift, milestone, relationship, Activity and ending presentation points, record the resolved media ID and source. Run each point once with the shipped asset and once with an acceptance-only missing optional asset reference/override that passes the presentation source-format rule but points to a nonexistent packaged file.

Expected behavior:

- GIFs use the image path and must fall back to the visible missing-art state rather than break the scene or command flow.
- Missing optional media must not change mechanics, state transition, reward or available choices.
- A scene with no resolved media IDs must show the generic central-stage placeholder.
- Video fallback must also be verified at product acceptance. Current A4-era UI source contains an image/GIF `onerror` fallback but no focused automated regression test was found for missing GIF/video assets; do not mark this product requirement passed until exercised.

## Evidence capture

For each mandatory save checkpoint, archive:

- pre-command normalized save;
- post-command normalized save;
- post-reload normalized save;
- Resolver trace when a reaction is expected;
- visible HUD snapshot for money/Energy/calendar;
- media ID/source and fallback result;
- command/result log with the expected content-definition cost.

The final Product Acceptance result is pass/fail per requirement, not an overall subjective score.
