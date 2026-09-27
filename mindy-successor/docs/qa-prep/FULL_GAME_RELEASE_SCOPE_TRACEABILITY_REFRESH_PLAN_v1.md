# Full-Game Release-Scope Traceability Refresh Plan v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance

## Purpose

Define how project traceability should be refreshed as production packages land, without converting design drafts into locks or mistaking runtime readiness for authored product completion.

The refresh process applies to:

- careers;
- Palace;
- poverty / Secret Debt;
- School;
- relationships;
- Night;
- items/capabilities;
- Activity;
- endings/Meta;
- presentation.

---

# Traceability row model

Every requirement row should record these fields separately:

```text
Requirement ID / surface:
Authoritative source:
Requirement text:
Current implementation evidence:
Authored-content evidence:
Presentation evidence:
Save/reload evidence:
Natural reachability:
Remaining Product decision:
Release inclusion status:
Notes / superseded evidence:
```

Do not collapse these fields into one PASS/FAIL if they answer different questions.

---

# 1. Authoritative source

Each row must name the current authority.

Allowed authority classes:

- user decision / locked doc;
- target product contract;
- accepted career/system design;
- accepted production content decision.

Historical prototype behavior may be cited as reference, not authority.

If a draft is still explicitly draft/open:

record:

`DESIGN_INPUT / NOT LOCKED`

rather than turning it into a release requirement automatically.

---

# 2. Current implementation evidence

Record only what current merged main actually implements.

Evidence examples:

- source file;
- production definition ID;
- command;
- state owner;
- engine path;
- merged PR;
- executable test.

Classification examples:

- IMPLEMENTED_RUNTIME
- PARTIAL_RUNTIME
- LEGACY_ONLY
- NOT_IMPLEMENTED

Do not use a worker branch as merged implementation evidence.

---

# 3. Authored-content evidence

Separate content from generic runtime.

For a career row, authored evidence may include:

- repeatable action;
- career state machine;
- event pack;
- relationship;
- items/hooks;
- endings.

For School:

- provider/milestone;
- teacher/project/exam content;
- public result.

For poverty:

- street events;
- lender;
- debt state;
- hidden career;
- outcomes.

For Activity:

- route;
- challenge;
- item interaction;
- seasonal variation;
- NPC/quest.

Classify:

- CONTENT_NOT_AUTHORED
- CONTENT_AUTHORED_NOT_INTEGRATED
- CONTENT_INTEGRATED

---

# 4. Presentation evidence

Record presentation separately.

Possible evidence:

- semantic presentation ID;
- slot registration;
- shipped GIF;
- static fallback;
- text fallback;
- editor override;
- pending save identity.

Classification:

- PRESENTATION_GREEN
- FALLBACK_GREEN_POLISH_OPEN
- PRESENTATION_NOT_AUTHORED
- PRESENTATION_BLOCKED_BY_CONTENT_IDENTITY

A missing final GIF should not mark gameplay incomplete when valid fallback is accepted.

---

# 5. Save/reload evidence

Each stateful requirement should name at least one reload checkpoint.

Examples:

- paid action committed;
- pending scene;
- active Activity;
- Night after lodging;
- delayed debt activation;
- ending committed;
- completed RunResult.

Classify:

- RELOAD_EXECUTABLE_GREEN
- RELOAD_EXPECTATION_DOCUMENTED
- RELOAD_NOT_COVERED
- RELOAD_BLOCKED

---

# 6. Natural reachability

This field prevents false closure.

Use:

- NATURAL_REACHABLE
- ACCELERATOR_ONLY
- FIXTURE_ONLY
- NOT_REACHABLE
- N/A

Examples:

## Hard Work

49 -> real 50th shift may still prove the threshold transition, but the 49 setup must be labeled acceleration.

## Old Boundary Token

Seeded inventory proves runtime only until a real acquisition path exists.

## Secret Debt

Direct active-debt state is fixture evidence until street -> lender -> accept -> delay -> activation exists.

---

# 7. Remaining Product decision

For each row, explicitly record whether a human decision remains.

Examples:

- exact threshold;
- provider;
- item source;
- consumption policy;
- route identity;
- NPC;
- reward;
- balance value.

Use:

- NONE
- HUMAN_DECISION_REQUIRED
- BALANCE_OPEN
- CONTENT_IDENTITY_OPEN

Do not let implementation evidence erase this field.

---

# 8. Release inclusion status

Separate intended product scope from current release inclusion.

Suggested values:

- CURRENT_RC
- NEXT_PRODUCTION_WAVE
- INTENDED_1_0
- POST_RELEASE_POLISH
- HISTORICAL_ONLY

A feature may remain part of intended 1.0 even if not in the current vertical RC.

This prevents Lumber-focused release documents from narrowing the full product.

---

# 9. Careers traceability

Maintain rows for all 10 ordinary careers.

For each career trace at least:

- repeatable work;
- season;
- career state;
- relationship;
- School hook;
- item hook;
- Activity hook;
- Night hook;
- endings;
- presentation;
- save/reload.

Do not mark a career complete because a legacy action exists.

Starter and remaining-career matrices can feed this refresh but are not themselves final locks.

---

# 10. Palace traceability

Trace:

- 10/10 ordinary Hard Work prerequisite;
- hidden careers excluded;
- availability/discovery;
- repeatable Palace work;
- career state;
- School/item/relationship/Activity hooks;
- outcomes;
- Meta;
- presentation;
- save/reload.

The unlock rule is locked even if exact Palace content remains open.

---

# 11. Ordinary poverty traceability

Trace separately:

- housing ladder;
- zero-money anti-softlock;
- street sleep;
- street event pool;
- recovery path;
- Night restrictions;
- relationship/economy effects;
- optional poverty outcomes.

Do not combine Secret Debt into every poverty row.

---

# 12. Secret Debt traceability

Trace:

- lender eligibility;
- one-time encounter;
- accept/refuse;
- delayed activation;
- debt state;
- ordinary-job lock;
- forced Night obligation;
- hidden career progression;
- Paid Freedom;
- Bound Life;
- Takeover;
- Palace exclusion;
- save/reload.

Open balance numbers remain separate decisions.

---

# 13. School traceability

Trace:

- eight paid courses;
- typed progress;
- Night study;
- blocking scenes;
- teacher/content depth;
- management/accounting public result;
- Arcana/Forest public result if retained;
- projects/exams/certificates where selected;
- career/item/Activity effects;
- presentation;
- reload.

Current green base mechanics should not be downgraded because richer authoring remains open.

---

# 14. Relationship traceability

Trace:

- typed relationship state;
- entry source;
- professional/friendship/romance/rivalry options where relevant;
- Night interaction;
- career/Activity/School effects;
- ending contribution;
- save/reload;
- presentation.

Avoid a universal romance-only interpretation.

---

# 15. Night traceability

Trace:

- endDay;
- lodging;
- forced intercepts;
- voluntary choices;
- relationship Night;
- School Night;
- poverty street Night;
- Secret Debt forced Night;
- next-day modifiers;
- calendar advance;
- reload.

---

# 16. Items/capabilities traceability

Trace:

- item definition;
- acquisition;
- capability;
- action-space change;
- use/consume policy;
- cross-system effect;
- save/reload.

Separate:

`capability runtime green`

from:

`natural acquisition authored`.

---

# 17. Activity traceability

Trace:

- entry;
- internal resource;
- routes;
- challenge families;
- season;
- items/equipment;
- NPC/quest;
- save/resume;
- success/escape/failure;
- external result;
- presentation.

Current Forest slice covers only a subset.

---

# 18. Endings / Meta traceability

Trace:

- eligibility;
- simultaneous eligibility;
- continued play;
- explicit commitment;
- completion;
- RunResult;
- Meta reward;
- New Run effect;
- Palace contribution if ordinary Hard Work;
- presentation;
- reload.

Every career's endings should have separate rows.

---

# 19. Presentation traceability

Presentation rows should cover all major systems.

Record:

- semantic identity;
- shipped/fallback asset;
- animation-off;
- missing-media behavior;
- save identity;
- editor replacement.

Do not make media existence the sole gameplay implementation evidence.

---

# 20. Refresh trigger

Refresh traceability after any of:

- production career package merge;
- new School milestone/provider merge;
- poverty/Secret Debt production merge;
- Activity content-depth merge;
- Palace implementation;
- major item acquisition path;
- new ending/Meta catalog;
- scope change;
- locked Product decision.

Do not rewrite traceability for docs-only speculation.

---

# 21. Evidence supersession rule

When new evidence replaces old:

keep the historical row/evidence source but mark:

- SUPERSEDED;
- superseded by which PR/test/doc;
- why.

Example:

PR21 accelerator evidence may be superseded by PR22 natural logging-road evidence.

Do not delete provenance.

---

# 22. Traceability QA review

Before release-scope update, review for:

- missing major surfaces;
- stale branch-only evidence;
- fixture-only natural reachability claims;
- draft treated as lock;
- old test count/status;
- presentation-only implementation claims;
- Product decision silently guessed.

Use:

- `PRODUCT_SCOPE_OMISSION_SENTINEL_MATRIX_v1.md`
- `CONTENT_AUTHORING_ACCEPTANCE_FRAMEWORK_v1.md`

---

# Compact row template

```text
ID:
Surface:
Authority:
Requirement:
Runtime:
Content:
Presentation:
Save/reload:
Reachability:
Human decision:
Release inclusion:
Evidence:
Superseded evidence:
Notes:
```

This format should replace ambiguous single-column “done/not done” reporting for complex product surfaces.

No production runtime/UI/content file was modified by Chat 4.
