# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — RESTRICTED SITES PRODUCTION v15**
Owner: Chat 3

Accepted frozen producer candidate:
`chat3/anomalous-reach-production-v14@266f1de7cc9afdccff36d8360771a059d9d19e65`

Leader disposition:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**.

Do not mutate frozen Forest v12 / Trade Corridor v13 / Anomalous Reach v14 heads.

## New assignment

Build D36 Region 4 — **Restricted Sites** — and complete the four-region Large Activity production baseline.

New branch:
`chat3/restricted-sites-production-v15`

Base:
`266f1de7cc9afdccff36d8360771a059d9d19e65`

No full CI.

## Production target

Restricted Sites is the late/high-risk region.

Implement:
- >=3 route contexts;
- >=1 shortcut;
- >=1 capability/fact-gated route;
- >=1 season-sensitive edge;
- >=1 explicit information/risk decision;
- >=2 meaningful equipment/capability hooks;
- Field Time via shared D36 runtime;
- continue / detour / escape;
- success / failure / escape;
- deterministic save/reload;
- city prep -> Activity feedback;
- Activity -> city/career/contact feedback;
- no universal Activity XP;
- no Palace substitution.

## Specialized mini-game

Restricted Sites owns the first production instance of:
**Infiltration / Suspicion**.

Implement bounded typed state with:
- multiple choices;
- visible/typed suspicion state;
- deterministic transitions;
- save/reload;
- success / failure / abort;
- no generic combat;
- no single raw-stat pass;
- no auto-complete of regional anchor.

Do not duplicate Tracking or Pattern/Ritual logic.

## D38 completion seams

This is the fourth region, so verify all D38 common-baseline infrastructure across the full four-region set:
- anchors across >=3/4 regions;
- >=2 mini-game families;
- meaningful extraction;
- contact thread;
- Pathfinder / Preservation / Network classifications;
- research-grade secured-result candidates.

Do not auto-grant any D38 ending.
Eligibility must still be exact and explicit-commit driven.

## Firewalls

Preserve:
- entry cost = 2 Energy;
- D23 Palace sole gate;
- Secret Debt Activity availability while bound;
- Night/camp ownership;
- Forest/Trade/Anomalous behavior;
- no Activity item/capability opens Palace or cancels forced Debt Night.

## Focused QA

No full CI.

Minimum:
- typecheck;
- validate;
- build;
- v12/v13/v14 regressions;
- Restricted Sites route coverage;
- Infiltration/Suspicion success/failure/abort;
- save/reload mid-mini-game;
- suspicion bounds/idempotence;
- season/capability gates;
- all four region definitions coexist;
- D38 non-premature/positive eligibility matrix;
- 2-Energy entry;
- Palace/Debt/Night firewalls.

Deliver:
`mindy-successor/docs/tasks/CHAT3_RESTRICTED_SITES_PRODUCTION_v15.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
