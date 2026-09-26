# Forest Production Authoring Matrix v1

Status: non-lore-specific production authoring matrix for the first Forest Product Acceptance slice.

## Locked structural requirements

Routes:
- logging road;
- hunter trail;
- old boundary path.

Challenge families:
- navigation;
- physical obstacle;
- interpretation / ritual anomaly.

Activity entry remains 2 daytime Energy. Internal Activity actions use Activity-owned resources, not repeated daytime Energy.

## Route matrix

| Authoring route key | Authoritative context | Primary challenge family | Secondary family allowed | Capability seam | Final authored IDs |
| --- | --- | --- | --- | --- | --- |
| `logging-road` | logging road | physical obstacle | navigation | `cut_heavy_wood` may open an alternate obstacle approach | OPEN |
| `hunter-trail` | hunter trail | navigation | physical obstacle | `cross_rough_route` may open a shortcut/safe bypass; exact route binding remains OPEN until authored | OPEN |
| `old-boundary-path` | old boundary path | interpretation / ritual anomaly | navigation | entry requires `enter_old_boundary`; `preserve_specimen` may affect an anomaly/sample option without fixing exact route binding | OPEN |

The authoring keys above are fixture/matrix identities, not final runtime IDs.

## Challenge-family matrix

### Navigation

Must present a route/information choice rather than a pure stat bump.
Possible approaches may use Wits/Reason, Hunter/knowledge facts, or a navigation capability.
Exact checks, text and threshold numbers remain OPEN.

### Physical obstacle

Must present at least one obstacle with multiple approaches.
Authoritative stat space includes Strength, Endurance and Dexterity.
Item-capability alternatives include `cross_rough_route` and `cut_heavy_wood` where authored.
No combat requirement is introduced by this matrix.

### Interpretation / ritual anomaly

Must not be reducible to brute force.
Authoritative approach space includes Reason, Magic, a School Arcana public fact, or a specific sample/tool capability.
`preserve_specimen` can change extraction/action-space when a rare sample is present.
Exact anomaly lore and School threshold remain OPEN.

## Minimum first-slice coverage

The authored production slice must provide:
1. all three route contexts;
2. all three challenge families;
3. at least one capability-gated route or challenge option;
4. at least four stats with meaningful approaches across the slice;
5. at least three meaningful item capabilities across the Activity slice;
6. deterministic save/resume before or after encounters;
7. success distinct from escape;
8. a season-driven topology/option difference.

## Seasonal topology matrix

| Season | Locked topology/option requirement | Final affected route/encounter IDs |
| --- | --- | --- |
| spring | water/mud changes route access; some short paths are closed; magical sprouts/traces may appear | OPEN |
| summer | distant routes are more available; fire risk/event pool may appear | OPEN |
| autumn | animal migration enriches Hunter trail; industrial pressure is high | OPEN |
| winter | some paths cost more endurance/become dangerous; a frozen passage may open an alternative route | OPEN |

Season must change topology/options, not only art.

## Capability placement rules

- `enter_old_boundary` belongs to the old-boundary route gate.
- `cut_heavy_wood` belongs to a physical-obstacle alternative and fits the logging-road context.
- `cross_rough_route` belongs to a physical-obstacle shortcut/safe-bypass seam; exact route binding is not locked.
- `preserve_specimen` belongs to a sample/extraction action-space seam; exact route/encounter binding and consume policy are OPEN.

None of these capabilities may be implemented as a percentage-only bonus.

## Result contract that must survive deeper authoring

Do not replace current result identities:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Success continues through exact A5 `activityResult` and the existing Lumber return listener.

Deeper route/challenge content must preserve save/resume determinism and must not reroll resolved encounters on reload.

## Explicit OPEN authoring

Do not invent in this matrix:
- final runtime route IDs;
- final challenge/encounter IDs;
- NPC identity;
- exact lore;
- loot tables;
- camp implementation;
- exact resource numbers;
- item acquisition source;
- item consume/retain rules;
- School/Arcana thresholds.

## Hard Work firewall

Forest depth is independent from Hard Work.
Hard Work remains only `completed_shifts >= 50`, reward `hardWork:lumber`.
