# LEADER 1 CHECKPOINT — 2026-10-03 post-D38

Status: **CURRENT RECOVERY CHECKPOINT**

Main at checkpoint creation:
`0a2223573dbd8242d232e30ca727ca4b1cd34a2e`
`Leader: move Chat 5 to early complex ending decisions`

## D38 accepted

Source:
`chat3/activity-ending-family-v9@37079bea92a0fa442035de310d8d21fb0b435d53`

Locks:
- Activity ending family = 3 separate ending IDs:
  - `ending.activity.pathfinder`
  - `ending.activity.preservation`
  - `ending.activity.network`
- common D36 baseline remains 3/4 anchors + 2 mini-game families + 1 meaningful extraction + 1 contact thread;
- Pathfinder additionally requires 2 Pathfinder anchors + Tracking success;
- Preservation requires 2 Preservation anchors + Pattern/Ritual success + 1 research-grade secured result;
- Network requires 2 Network anchors + Infiltration/Suspicion success + 1 network-capable contact;
- all three are explicit D16 commits;
- all three rewards are selectable Specialists:
  - `specialist.activity.surveyors-atlas`
  - `specialist.activity.field-archive`
  - `specialist.activity.contact-network`
- D28 0..2 Specialists remains binding;
- no reward reduces 2-Energy Activity entry or bypasses D23/Secret Debt.

Authority commit:
`20553cff531dcbc328df8b786829b7409e5d521f`

## Chat 5 Ending Atlas v9 disposition

Frozen:
`chat5/complete-ending-atlas-v9@7ff509343b7e41bd1790fc339023b46a6fcfa70d`

Disposition:
**ACCEPTED AS RESEARCH INVENTORY SNAPSHOT ONLY — NOT FINAL CURRENT ATLAS**

Reasons:
- baseline predates D36/D37/D38;
- Activity is still represented as one undefined family, now obsolete;
- Palace D23 consumer is now integrated on main;
- canonical count must be refreshed after D38;
- several rows misattribute Hard Work +5 mapping OPEN to D35 (housing). The mapping remains OPEN, attribution is wrong.

Do not present v9 to the user as the final current answer without refresh.

## Major ending gap identified

There are 30 advanced ordinary-career outcome families outside the 10 Hard Work endings.

Exact final gates/rewards are still OPEN for many.

Parallel Product work split:

### Chat 5 tranche A — 14 endings
Branch:
`chat5/ordinary-complex-endings-tranche-a-v10`

Covers:
- Lumber: Forewoman, Forest Compact
- Satyr Maid: House Power, Personal Network, Boundary Mastery
- Undead Farm: Research Farmer, Farm Successor, External Anomaly
- Tavern: Innkeeper, Information Broker, Sanctuary
- Hunter: Master Hunter, Warden, Legend

Pointer commit:
`0a2223573dbd8242d232e30ca727ca4b1cd34a2e`

### Chat 3 tranche B — 16 endings
Branch:
`chat3/ordinary-complex-endings-tranche-b-v10`

Covers:
- Guard: Officer, Reform, Network/Corruption, Major Case
- Merchant: Merchant House, Speculator/Smuggler, Patron of Routes
- Artist/Geisha: Master Artist, Patron Network, Court Invitation
- Assassin: Ghost, Handler Takeover, Refusal/Turncoat
- Prostitute: Independent House, Elite Clientele, Network/Protection

Pointer commit:
`6087a1022811e14c1e85befd9f2953236e227f8e`
(branch created from the later combined pointer base)

Both packets must define exact:
- eligibility;
- route facts;
- optional vs mandatory School/Night/Activity/items;
- explicit commit;
- permanent reward;
- D27/D28 reward class;
- exact mechanics/caps;
- legacy cleanup;
- implementation blockers.

No production/full CI.

## Current blocker index

Refreshed after D38:
`2b548912908e9b1fb12d5c66c3d25e0c7a0dee64`

## Recovery rule

On rollover:
1. requery fresh main;
2. requery real heads of Chats 2–6;
3. treat Chat 5 Atlas v9 as snapshot only;
4. do not refresh final Atlas until tranche A + tranche B + Palace non-True rewards are resolved enough to make refresh worthwhile;
5. Chat 2 remains sole full-CI lane;
6. Leader remains sole merge authority.
