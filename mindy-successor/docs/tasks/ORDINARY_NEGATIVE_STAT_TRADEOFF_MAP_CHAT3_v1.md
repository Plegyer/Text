# Ordinary Seasonal Negative-Stat Tradeoff Map — Chat 3 v1

Status: **PROPOSAL FOR LEADER REVIEW — NO RUNTIME AUTHORITY YET**  
Owner: Chat 3  
Base: `fe59b931c8f432c8aa6b66c4fc1a699195616065`

## Problem observed on current production main

Current `definitions.json` has seasonal negative progression-stat effects only for Lumber.

Lumber currently has negative effects in all four seasons:
- Spring: Grooming -1
- Summer: Grooming -1 and Manners -1
- Autumn: Endurance -1
- Winter: Sociability -1

The other nine ordinary professions have no seasonal negative stat tradeoff.

Current Product direction in `CURRENT_CHAT3_TASK_POINTER.md` / `USER_DECISIONS_LOCKED_v1.md` is approximately two negative-tradeoff seasons out of four per ordinary profession, rather than every season.

## Mapping rules used for this proposal

This is a review packet, not implementation authority.

1. Exactly **2 of 4 seasons** carry a negative stat tradeoff for each ordinary profession.
2. Each affected season gets exactly **one progression-stat `-1`**.
3. Lust is excluded; it remains a separate content axis.
4. A proposed negative stat is not one of that profession's current wage-weight stats.
5. A proposed negative stat is not used in that profession's current unlock condition.
6. A season never gives `+1` and `-1` to the same stat in the same shift package.
7. Existing positive seasonal gains, item outputs, counters, Energy cost, wage formulas, and unlock gates remain untouched by this proposal.
8. No runtime change should be made until Leader 1 explicitly approves or edits this map.

Rules 4–6 are safety constraints to avoid accidental self-locking, direct wage feedback loops, or a no-op/net-zero seasonal package.

## Exact proposed map

| Ordinary profession | Negative season 1 | Negative season 2 | Short rationale |
|---|---|---|---|
| Lumber | **Spring — Grooming -1** | **Winter — Sociability -1** | Spring mud/water already supports Grooming loss; winter logging is the clearest isolation tradeoff. Keeps two existing Lumber negatives and removes all-season punishment. |
| Satyr Maid | **Summer — Grooming -1** | **Autumn — Endurance -1** | Summer peak flow/heat strains presentation; autumn festival/service pressure creates fatigue without touching Charm/Sexuality wage axes. |
| Undead Farm | **Spring — Grooming -1** | **Autumn — Sociability -1** | Spring mud/water is a direct Grooming cost; harvest crunch narrows social time while preserving Endurance/Magic/Reason production axes. |
| Tavern | **Spring — Grooming -1** | **Summer — Endurance -1** | Reopened roads bring mud/repair turnover; maximum summer occupancy creates physical fatigue while leaving Charm/Wits/Manners intact. |
| Hunter | **Spring — Grooming -1** | **Winter — Sociability -1** | Thaw/mud degrades Grooming; winter route work is the strongest isolation season. Core Dexterity/Endurance/Wits remain untouched. |
| Guard | **Summer — Grooming -1** | **Autumn — Creativity -1** | Heat/crowd/fire duty strains Grooming; autumn report/market duty is rigid and procedural, trading against creative practice without touching Guard core stats. |
| Merchant | **Summer — Endurance -1** | **Winter — Strength -1** | Travel/perishables/festival prep create fatigue; winter scarcity/route closure shifts work toward sedentary stock/account handling. Core Wits/Charm/Manners/Reason and unlock Sociability remain untouched. |
| Artist / Geisha | **Summer — Endurance -1** | **Autumn — Reason -1** | Large evening receptions create fatigue; festival/competition intensity crowds out analytical study without penalizing performance/unlock axes. |
| Assassin | **Spring — Grooming -1** | **Winter — Sociability -1** | Spring field observation/routes bring rough conditions; winter covert routines emphasize isolation. Dexterity/Wits/Reason/Manners remain untouched. |
| Prostitute | **Summer — Grooming -1** | **Winter — Creativity -1** | High-demand summer heat strains presentation upkeep; winter regular-client routine narrows novelty. Sexuality/Charm/Manners/Endurance and unlock Sociability remain untouched. |

## Lumber normalization if this map is approved

Current Lumber negative effects would change from five negative effects across all four seasons to two:

- **keep** Spring Grooming -1;
- **remove** Summer Grooming -1;
- **remove** Summer Manners -1;
- **remove** Autumn Endurance -1;
- **keep** Winter Sociability -1.

No positive Lumber seasonal gains change under this proposal.

## Distribution audit

Affected-season count:
- every ordinary profession: **2 / 4**;
- total affected profession-seasons: **20 / 40**.

Proposed negative axes are deliberately not globally uniform. They are selected for career/season fit while avoiding each profession's current wage/unlock core.

No proposed entry:
- changes Lust;
- duplicates a positive stat in the same season;
- changes a wage coefficient;
- changes an unlock gate;
- introduces a new stat or global mechanic.

## Leader decisions requested

Leader 1 should approve or edit:
1. exact profession/season/stat cells above;
2. whether `-1` is the uniform magnitude for this packet;
3. whether the “do not hit current wage/unlock core stats” rule should remain a hard implementation constraint.

Only after that lock should runtime `definitions.json`, seasonal regressions, and authored copy be updated.
