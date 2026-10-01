# Chat 3 Content Queue v13 — Forest Authored Depth

Status: **ACTIVE / START ON NEW STACKED BRANCH**
Owner: Chat 3 / Forest + Poverty Content Worker
Queue: C3-133..144
Base: frozen Forest product-slice PR #162 exact head `86e6af0d4743a4b42bd23eec1f8ba89ab0f401f9`

Do not move PR #162. Create a new branch, e.g. `chat3/forest-authored-depth-v13`.

Goal: now that the first Forest product mechanics/routes/items exist, raise the **live authored depth** instead of creating more preparation-only manifests.

### C3-133 — live depth inventory
Count player-reachable live variants by route, challenge family, season, item/capability and result. Identify thin production identities only.

### C3-134 — Logging Road depth
Bring Logging Road to a meaningful repeatable pool using existing mechanics/IDs. Add live RU/EN variants across seasons and at least two challenge contexts.

### C3-135 — Hunter Trail depth
Add live Hunter Trail variants covering clue/navigation, physical traversal and at least two seasons. No new route engine.

### C3-136 — Old Boundary depth
Add capability-gated Old Boundary variants with interpretation/ritual flavour and explicit item/capability feedback. Keep natural-access rules from v12 unchanged.

### C3-137 — physical obstacle pool
Expand physical-obstacle authored outcomes so Strength/Endurance/Dexterity/capability solutions do not collapse to one repeated text result.

### C3-138 — interpretation/ritual pool
Expand Wits/Reason/Magic/capability authored outcomes without inventing final Forest cosmology.

### C3-139 — seasonal topology feedback
For every season, make the already-mechanical route/challenge availability changes visible in live copy/result feedback. Text must explain consequences without exposing raw hidden thresholds.

### C3-140 — equipment-specific feedback
Add live success/failure/alternate text for Rope Kit, Preservation Kit, Reinforced Axe and Old Boundary capability use. No new item mechanics.

### C3-141 — city-preparation acknowledgement
Add live Forest entry/return acknowledgement for existing career clue, School/knowledge and equipment preparation facts.

### C3-142 — cross-system aftermath content
Using existing exact facts only, add player-facing aftermath variants for the live Lumber/Forest feedback seam and any already-approved external consumer. Do not create School mechanics or new career state.

### C3-143 — deterministic repetition regression
Long-run tests must show live route/challenge copy rotates meaningfully under deterministic selection, while save/reload preserves pending identity and no mechanics drift occurs.

### C3-144 — candidate freeze
Require exact-head full CI green; freeze one focused candidate for Chat 4.

No Secret Debt state, ending framework, shared runtime or unrelated UI changes.
