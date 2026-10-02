# Ordinary Work Seasonal Negative-Stat Tradeoff Packet — Chat 3 v1

Status: **READY FOR LEADER DECISION — PROPOSAL ONLY / NO RUNTIME AUTHORITY**  
Owner: Chat 3  
Fresh-main base: `0f232f40157a56166403e31d259d88776b9b6d90`

## Authority

This packet implements the current Chat 3 pointer requirement to propose, but **not yet apply**, the ordinary-work negative-stat mapping.

Locked direction:
- work uses seasonal packages rather than universal fixed `+2/+2/-1`;
- work should not create giant pure stat growth;
- roughly two seasons out of four per ordinary profession should carry a negative tradeoff;
- Lust remains separate and is not an ordinary-work negative unless separately authorized;
- wages, career counters, Hard Work=50, career events and unlock gates must be preserved.

The exact negative-stat mapping remains Product-open until Leader 1 accepts or edits this packet.

## Current-production audit

On fresh main, the ten ordinary `*.shift` actions all cost 1 Energy.

Only Lumber currently has seasonal negative progression-stat effects:
- Spring: Grooming -1
- Summer: Grooming -1
- Summer: Manners -1
- Autumn: Endurance -1
- Winter: Sociability -1

Therefore current production is:
- Lumber: negative tradeoff in **4 / 4** seasons, with 5 negative effects total;
- other nine ordinary professions: negative tradeoff in **0 / 4** seasons.

All ten ordinary Hard Work endings currently use:
`completed_shifts >= 50`.

## Proposal rules

If this packet is accepted, implementation should follow these exact constraints:

1. Every ordinary profession has negative tradeoffs in exactly **2 of 4** seasons.
2. Every affected season has exactly **one `modifyStat ... delta: -1`** negative.
3. Lust is never used as an ordinary-work negative in this packet.
4. The negative stat must not be a current stat-based unlock requirement for that profession.
5. The negative stat must not be a current wage-weight stat for that profession.
6. A season must not both increase and decrease the same stat.
7. Existing positive seasonal effects remain unchanged.
8. Existing seasonal counters/items/non-stat effects remain unchanged.
9. Existing shift cost, wage coefficients, unlock conditions, career events and Hard Work conditions remain unchanged.
10. This packet does not authorize any new mechanic, stat, threshold, event or reward.

Rules 4–6 deliberately prevent a seasonal penalty from making the job self-lock, directly eroding its own salary inputs, or collapsing into a same-shift net-zero stat effect.

## Exact proposed mapping

| Profession | Negative season A | Negative season B | Profession/season rationale |
|---|---|---|---|
| Lumber | **Spring — Grooming -1** | **Winter — Sociability -1** | Spring mud/water already makes Grooming loss natural; winter logging is the clearest isolation tradeoff. This keeps two existing Lumber negatives while removing all-season punishment. |
| Satyr Maid | **Summer — Grooming -1** | **Autumn — Endurance -1** | Peak summer service/heat strains presentation upkeep; autumn festival/service pressure creates fatigue without touching Charm or Sexuality. |
| Undead Farm | **Spring — Grooming -1** | **Autumn — Sociability -1** | Spring mud/water degrades Grooming; harvest processing crowds out social time while preserving Endurance/Magic/Reason production identity. |
| Tavern | **Spring — Grooming -1** | **Summer — Endurance -1** | Reopened roads bring mud, repairs and turnover; maximum summer occupancy creates fatigue while Charm/Wits/Manners remain intact. |
| Hunter | **Spring — Grooming -1** | **Winter — Sociability -1** | Thaw routes are muddy and rough; winter field work is isolated. Dexterity/Endurance/Wits remain untouched. |
| Guard | **Summer — Grooming -1** | **Winter — Sociability -1** | Heat, crowds and fire duty strain presentation; winter patrol/closed-district duty reduces ordinary social life. Strength/Endurance/Manners/Reason remain intact. |
| Merchant | **Summer — Endurance -1** | **Winter — Strength -1** | Travel, perishables and festival preparation create fatigue; winter scarcity/route closure shifts work toward sedentary stock/account handling. |
| Artist / Geisha | **Summer — Endurance -1** | **Autumn — Reason -1** | Large evening receptions create fatigue; festival/competition intensity crowds out analytical study without penalizing performance/unlock axes. |
| Assassin | **Spring — Grooming -1** | **Winter — Sociability -1** | Spring observation/routes expose the worker to rough conditions; winter covert routines emphasize isolation. Dexterity/Wits/Reason/Manners remain intact. |
| Prostitute | **Summer — Grooming -1** | **Winter — Creativity -1** | High-demand summer heat raises presentation wear; winter regular-client routine narrows novelty without touching Sexuality/Charm/Manners/Endurance. |

## Lumber normalization

If accepted, Lumber changes from five negative effects across all four seasons to exactly two:

**Keep**
- Spring Grooming -1
- Winter Sociability -1

**Remove**
- Summer Grooming -1
- Summer Manners -1
- Autumn Endurance -1

All Lumber positive seasonal gains remain unchanged.

## Operation-safety audit

The proposal deliberately avoids each profession's current unlock and wage core.

| Profession | Current stat unlock core | Current wage-weight core | Proposed negative stats | Safety result |
|---|---|---|---|---|
| Lumber | none | Strength, Endurance | Grooming, Sociability | no unlock/wage collision |
| Satyr Maid | none | Charm, Sexuality | Grooming, Endurance | no unlock/wage collision |
| Undead Farm | none | Endurance, Magic, Reason | Grooming, Sociability | no unlock/wage collision |
| Tavern | Charm, Sociability | Charm, Wits, Manners | Grooming, Endurance | no unlock/wage collision |
| Hunter | Dexterity, Endurance, Wits | Dexterity, Endurance, Wits | Grooming, Sociability | no unlock/wage collision |
| Guard | Strength, Endurance, Manners | Endurance, Manners, Strength, Reason | Grooming, Sociability | no unlock/wage collision |
| Merchant | Wits, Reason, Sociability | Wits, Charm, Manners, Reason | Endurance, Strength | no unlock/wage collision |
| Artist / Geisha | Creativity, Manners, Grooming | Manners, Charm, Sexuality, Dexterity | Endurance, Reason | no unlock/wage collision |
| Assassin | Dexterity, Wits, Reason | Dexterity, Wits, Reason, Manners | Grooming, Sociability | no unlock/wage collision |
| Prostitute | Sexuality, Charm, Sociability | Sexuality, Charm, Manners, Endurance | Grooming, Creativity | no unlock/wage collision |

Because the proposed negatives never target a stat in the stat-based unlock condition, they cannot make a currently stat-unlocked job unavailable merely by performing that job.

Because they also avoid wage weights, the packet does not create an automatic “work lowers the stat that pays this same job” loop.

Starter professions have no stat unlock conditions; the same wage-core safety rule is still applied to them.

## Same-season collision audit

For all 20 proposed profession-season cells:
- the negative stat is not positively modified in that same current seasonal package;
- magnitude is exactly -1;
- no entry targets Lust.

Result: **20 / 20 clean**.

## Growth-shape impact

For the nine professions that currently have two positive `+1` stat effects per season:
- unaffected season: net progression-stat sum remains +2;
- tradeoff season: proposed net becomes +1;
- across four representative shifts, raw summed stat movement changes from +8 to +6.

This is intentionally a modest correction rather than a universal `+2/+2/-1` replacement.

Lumber already has a distinct seasonal shape; the proposal normalizes its negatives to 2/4 seasons while preserving all positive effects.

This arithmetic is only a description of the proposed package shape, not a new balancing rule.

## Preservation contract for implementation

After Leader approval, the runtime patch should be limited to approved negative seasonal `modifyStat` entries in ordinary `*.shift` seasonal arrays.

The implementation must preserve exactly:
- each action's `cost`;
- each action's `wage`;
- each action's `conditions` / unlock gate;
- all positive `modifyStat` seasonal effects;
- all seasonal career counters;
- all seasonal item/resource effects;
- all career/event packs;
- all ten `ending.<career>.hard-work` conditions at `completed_shifts >= 50`;
- Lust behavior.

## Focused regression test plan after approval

No runtime regression is added in this proposal-only branch because production numbers are intentionally unchanged.

When Leader locks the map, add a focused test such as:
`tests/ordinary-work-seasonal-negative-tradeoffs.test.ts`

It should assert:

1. **Exact mapping**
   - the ten ordinary profession IDs are the expected roster;
   - each has exactly two seasons containing a negative `modifyStat`;
   - each approved profession/season/stat cell matches the locked map exactly;
   - every negative delta is exactly -1;
   - no ordinary-work negative uses Lust.

2. **No same-season cancellation**
   - no seasonal package contains a positive and negative `modifyStat` for the same stat.

3. **Unlock safety**
   - collect all stat IDs used by each action's current unlock condition;
   - assert neither approved negative stat intersects that set.

4. **Wage safety**
   - collect all current wage-weight stat IDs;
   - assert neither approved negative stat intersects that set.

5. **Positive/non-stat preservation**
   - compare approved post-change seasonal packages against the current-main baseline after filtering only negative `modifyStat` effects;
   - positive `modifyStat`, career-counter, item and other effects must be identical.

6. **Action contract preservation**
   - `cost`, `wage` and `conditions` for all ten ordinary shift actions must be identical to the accepted baseline.

7. **Hard Work preservation**
   - all ten ordinary Hard Work endings remain exactly `careerCounter completed_shifts >= 50`;
   - rewards/meta rewards remain unchanged by this packet.

8. **Lumber normalization**
   - Lumber has only Spring Grooming -1 and Winter Sociability -1;
   - the three superseded Lumber negatives are absent.

Focused profession regressions that snapshot seasonal packages should then be updated only where their expected seasonal arrays changed.

No producer full CI should be used for that authoring loop; Chat 2 retains executable integration QA ownership.

## Decision requested from Leader 1

Please approve or edit:
1. the exact 20 profession/season/stat cells;
2. uniform magnitude `-1`;
3. the safety constraint that work negatives avoid the profession's current unlock and wage-weight stats.

Until that decision is recorded, **do not change production seasonal numbers**.
