# Chat 1 Developer — queue v6 current-main integration ledger

Owner: Chat 1 Developer / Integration Developer
Queue: C1D-49..C1D-60
Starting current main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`
Branch: `chat1/c1d-v6-current-main`

## C1D-49 — post-v5 current-main consolidation inventory

### Actually merged before queue v6 start

Current main already contains:
- PR #97 / C1D v4 starter-trio availability and earlier shared integration;
- Chat 2 PR #88 and #98 presentation preparation/validation;
- Chat 5 PR #90 and #99 School preparation;
- Chat 3 PR #93 and #100 content preparation;
- all coordination updates through main `593f9936d72296557b36a0e0ca7d3c7bb780839c`.

### Frozen but not merged at queue-v6 start

PR #106 — C1D v5 current-main content consumer integration:
- exact frozen head `58779c2d1b37394d0d2a6c23ad759b67b88e38f6`;
- repository CI run #314 / id `36687680861`: SUCCESS;
- 456 tests / 456 pass / 0 fail;
- open, non-draft, mergeable;
- no Chat 4 QA acceptance or merge was present at this inventory checkpoint.

PR #106 contains runtime/root-localization changes that are therefore **not** current-main facts yet:
- generic multi-scene action-result localization consumer;
- 8 promoted Satyr Maid / Undead Farm scene strings;
- 16 promoted ordinary-poverty depth strings;
- append-only poverty selector additions;
- focused integration regressions.

Queue-v6 branch deliberately starts from current main and does not copy those frozen PR #106 deltas while QA/merge is pending.

### Still preparation-only / selector gaps on current main

- Chat 5 School depth text has no exact-course reactive presentation selector wired into shared runtime.
- Chat 5 career mappings keep thresholds/public producer facts open.
- Chat 3 Forest seasonal/result depth is fixture-local and declares no runtime selector.
- Chat 3 Satyr Maid v2 / Undead Farm v2 depth variants declare no runtime selector.
- Secret Debt Product values remain open.
- No new late-career unlock threshold values are approved.

## C1D-50 — career-unavailable reason contract audit

Current engine contract:
- `starterCareerIds = lumber, satyr-maid, undead-farm`;
- `actionAvailable()` first evaluates authored `action.conditions`;
- ordinary non-starter `.shift` actions are available only when they have at least one authored condition and all conditions pass;
- empty conditions do **not** mean unlocked for the seven late careers.

Current UI contract:
- `disabled(action)` correctly consumes `actionAvailable()`;
- requirement text is built only from failed authored `action.conditions`:
  `const miss = a.conditions.filter(c => !meets(c,...))`.

Concrete gap:
- every current late-career shift has `conditions=[]`;
- each button is correctly disabled by the starter-lock contract;
- `miss=[]`, so the player receives no reason text for this specific unavailable state.

Conclusion:
- the UI **cannot currently explain** locked-by-missing-authored-unlock-condition without a new generic reason surface;
- no numeric/stat/calendar/year threshold is needed to explain it;
- a safe future message can state only that the career has no authored unlock condition yet;
- C1D-50 itself does not choose or invent any unlock threshold.

C1D-51 will lock the engine behavior with test-only authored conditions, not production values.
