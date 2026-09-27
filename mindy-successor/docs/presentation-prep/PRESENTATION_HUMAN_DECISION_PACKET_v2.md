# Presentation Human-Decision Packet v2

Purpose: consolidate only visual/presentation choices that genuinely need human input before media production.

This packet does **not** ask humans to re-decide mechanics already fixed by semantic presentation contracts.

## Already fixed — no human decision needed

Do not reopen:
- semantic slash presentation IDs;
- gameplay-owned save identity;
- static/text fallback requirement;
- animations-off mechanics invariance;
- no GIF timing/frame coupling to gameplay;
- replacement keyed by semantic presentationId;
- rollback restoring safe fallback;
- media reuse remaining separate from gameplay identity.

Human input is only needed for visual scope, asset specificity and optional polish.

---

## Decision 1 — GIF/art priority by system

Human choice:
Which systems should receive dedicated dynamic/static production first after currently ready Lumber media?

Candidate systems include:
- remaining careers;
- School;
- poverty / Secret Debt;
- Forest;
- Palace;
- endings / Meta.

This packet does not rank them.

### Can proceed without this decision
- gameplay/content authoring;
- semantic ID authoring for approved content;
- fallback registration;
- reuse-group planning;
- placeholder/static implementation;
- QA of existing presentation contracts.

### Blocked without this decision
Only scheduling of optional dedicated media production across competing systems.

---

## Decision 2 — dedicated asset vs reuse for authored routes/events

Human choice:
For an already-authored semantic scene, should it receive:
- a dedicated GIF/static asset; or
- an approved reusable media asset?

Use this only after semantic identity exists.

### Can proceed without this decision
- content implementation;
- semantic presentation ID;
- safe static/text fallback;
- save/reload;
- animations-off;
- placeholder media.

### Blocked without this decision
Only final media specificity for that scene.

---

## Decision 3 — career-specific visual depth

Human choice:
For each authored career, decide whether production needs:
- one reusable work loop;
- stage-specific variants;
- milestone-specific assets;
- relationship/Night-specific assets;
- ending-specific assets.

No career is automatically required to have every category.

### Can proceed without this decision
- career mechanics/content;
- semantic identity assignment as content lands;
- fallback-safe implementation;
- cross-system QA.

### Blocked without this decision
Commissioning the final number/scope of unique career assets.

---

## Decision 4 — School teacher/presenter visual identities

Human choice after content identity exists:
Should paid lessons / milestones visibly use:
- distinct teachers;
- shared teachers;
- generic presenter roles;
- narrator/environment-only presentation;
- another approved content model?

No option is preferred here.

### Can proceed without this decision
- all eight paid lesson mechanics;
- current lesson semantic IDs;
- blocking School scene;
- School static fallback;
- public-result content authoring;
- School QA.

### Blocked without this decision
Teacher-specific character art, teacher-specific GIFs, and any brief that visually depends on teacher identity.

---

## Decision 5 — poverty / Secret Debt media specificity

Human choice after authored scene identities exist:
Which scenes deserve dedicated media versus shared lodging/street/hidden-work assets?

Possible authored categories:
- normal room;
- cheap lodging;
- street sleep;
- ordinary street events;
- lender offer;
- delayed activation;
- hidden work;
- forced Night;
- hidden-career outcomes.

### Can proceed without this decision
- poverty/Secret Debt gameplay authoring;
- semantic IDs once authored;
- town/static/text fallback;
- save/reload and Night ownership QA.

### Blocked without this decision
Final media differentiation across poverty and Secret Debt surfaces.

---

## Decision 6 — Forest route/challenge visual specialization

Human choice after route/challenge content is authored:
Which authored Forest units receive:
- dedicated route visuals;
- dedicated challenge visuals;
- seasonal variants;
- generic shared Forest presentation?

### Can proceed without this decision
- generic `activity/forest/route/default`;
- success/escape/failure result presentation;
- gameplay route/challenge authoring;
- static Forest fallback;
- option-state save/reload.

### Blocked without this decision
Only dedicated route/challenge/season asset production.

---

## Decision 7 — Palace visual scope

Human choice after Palace role/assignment content is authoritative:
Which Palace scenes deserve unique:
- court/service media;
- assignment media;
- relationship/event media;
- ending/Meta reveal media?

### Can proceed without this decision
- Palace gameplay/content authoring;
- semantic-ID planning after identities stabilize;
- fallback-first implementation.

### Blocked without this decision
Final Palace media batch scope.

---

## Decision 8 — ending polish priority

Human choice:
Which authored endings should receive:
- dedicated static art;
- dedicated GIF;
- shared epilogue media;
- text/static fallback only?

### Can proceed without this decision
- ending mechanics;
- ending semantic IDs;
- ending commit/completion save behavior;
- New Run transition;
- town/static/text fallback.

### Blocked without this decision
Only dedicated ending polish.

---

## Decision 9 — optional animation scope

Human choice:
For a scene with valid static/text presentation, is animation desirable at all?

Possible answer per semantic ID/reuse group:
- animated primary;
- static only;
- reuse existing animation;
- defer.

### Can proceed without this decision
Everything required for playable implementation and technical QA.

### Blocked without this decision
Only animation production.

---

## Decision 10 — reuse-group replacement scope

Human choice when a shared asset is approved:
Should later replacement of that asset:
- update every semantic mapping in the reuse group; or
- allow per-slot override divergence?

### Can proceed without this decision
- initial shared media use;
- semantic identity;
- static fallback;
- gameplay implementation.

### Blocked without this decision
Final operator behavior for shared replacement packages.

---

## Decision record format

For each actual decision, record:

```text
decisionId=<stable human-decision key>
system=<career|school|poverty|activity|palace|ending|meta>
semanticIds=<known IDs or CONTENT_ID_PENDING>
decision=<dedicated|reuse|static-only|animated|defer|other approved choice>
contentAuthority=<approved authoring reference>
assetPriority=<human-assigned scheduling value or UNSET>
canProceedWithout=<list>
blockedUntilDecision=<list>
reviewer=<human/Product owner>
```

## Decision discipline

Do not ask a human to choose:
- gameplay thresholds;
- action availability;
- save identity;
- animation timing mechanics;
- fallback behavior;
- semantic-ID syntax;
- whether missing GIF should block gameplay.

Those are already fixed by the presentation contract.

## Summary

Human decisions should control:
- **what visual media gets produced**;
- **how specific that media is**;
- **which systems receive optional polish first**.

They should not control or reopen the mechanical separation between presentation and gameplay.
