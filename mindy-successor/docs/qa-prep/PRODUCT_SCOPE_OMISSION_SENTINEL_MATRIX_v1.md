# Product Scope Omission Sentinel Matrix v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: durable QA sentinel against accidental product-scope narrowing.

## How to use this matrix

Apply this matrix whenever a document claims to summarize:

- the whole project;
- the full roadmap;
- the intended 1.0;
- all remaining work;
- all major systems;
- final handoff / recovery state.

A narrow subsystem document does not need to mention every row.

A whole-project document does.

If a whole-project summary omits a row below without explicitly declaring a scope change approved by Product authority, flag:

**SCOPE_OMISSION_RISK**

---

# Sentinel matrix

| Surface | Primary authority | Minimum evidence that scope is still preserved | Omission trigger |
|---|---|---|---|
| 10 ordinary careers | `JOB_ROSTER_RECONCILIATION_v1.md`, user vision | all 10 named or explicit pointer to authoritative roster | project-wide roadmap mentions only Lumber/starter slice |
| Palace | `USER_DECISIONS_LOCKED_v1.md`, `PALACE_HIDDEN_CAREER_DRAFT_v0.md` | 10/10 ordinary Hard Work unlock remains present | Palace absent from intended full-game progression |
| ordinary poverty | `USER_VISION_AND_ACCEPTANCE.md`, `ECONOMY_AND_POVERTY_DRAFT_v0.md` | zero-money playable life + street/cheap housing acknowledged | poverty reduced to rent payment only |
| Secret Debt / Slave | `USER_DECISIONS_LOCKED_v1.md`, `POVERTY_HIDDEN_CAREER_DRAFT_v0.md` | hidden debt route remains distinct from ordinary careers | hidden career silently removed or merged with Prostitute |
| School | `SCHOOL_SYSTEM_v2.md`, user vision | standalone education with progression/cross-system outputs | School described only as stat purchase |
| relationships | `RELATIONSHIP_SYSTEM_DRAFT_v0.md`, user vision | typed cross-system relationship layer remains planned | relationships reduced to romance flavor only |
| Night | `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`, user vision | lodging + forced/voluntary choices + consequences | Night described only as “sleep/end day” |
| items/capabilities | `ITEM_SYSTEM_DRAFT_v0.md`, user vision | at least item-driven action-space changes remain required | items reduced to passive stat boosts only |
| expedition Activity | `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`, user vision | meaningful second mode with progression/save/city feedback | Activity reduced to one short minigame |
| endings / Meta | `META_REWARD_PHILOSOPHY_v1.md`, ending contracts | eligibility/commit/completion + cross-run changes remain | endings become instant run termination only |
| GIF-first presentation | `GIF_CENTRAL_STAGE_CONTRACT_v1.md` | global central stage / semantic ID / fallback preserved | presentation discussed only for Lumber or tied to mechanics |

---

# 1. Ten ordinary careers

## Authority

`JOB_ROSTER_RECONCILIATION_v1.md`

Current ordinary roster:

1. Lumber
2. Satyr Maid
3. Undead Farm
4. Tavern
5. Hunter
6. Guard
7. Geisha / Artist
8. Assassin
9. Merchant
10. Prostitute

## Preservation evidence

A whole-project roadmap may preserve scope by either:

- naming all 10; or
- explicitly pointing to the authoritative roster and saying all 10 remain intended.

It does not need to restate every career detail.

## Omission sentinel

Flag if a document claiming full scope says things like:

- “remaining careers: Lumber only”;
- “the game has the starter career”;
- “future work is only School/Forest polish”

without explicitly superseding the roster.

---

# 2. Palace

## Authority

Locked user decision:

Palace unlock requires Hard Work on **all 10 ordinary professions**.

Secret Debt/hidden careers do not count.

## Preservation evidence

Full roadmap must retain:

- Palace as separate hidden/meta career;
- 10/10 ordinary Hard Work prerequisite;
- Palace own repeatable work/progression.

## Omission sentinel

Flag if:

- Palace disappears from intended 1.0;
- Palace is treated as an ending only;
- fewer ordinary careers are silently used for unlock;
- hidden Slave outcome substitutes for an ordinary Hard Work.

---

# 3. Ordinary poverty

## Authority

- `USER_VISION_AND_ACCEPTANCE.md`
- `ECONOMY_AND_POVERTY_DRAFT_v0.md`
- housing/night balance docs.

## Preservation evidence

Full project must still support:

- low/zero money continuation;
- street or cheap housing;
- alternative night/social content;
- recovery path;
- poverty as a life route rather than immediate failure.

## Omission sentinel

Flag if poverty is represented only as:

```text
cannot pay rent -> lose
```

or if Secret Debt becomes the only zero-money continuation.

---

# 4. Secret Debt / Slave hidden career

## Authority

- locked user decision D10;
- `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

## Preservation evidence

Must remain:

- secret;
- triggered through rare street-help route;
- delayed trap;
- blocks ordinary jobs after activation;
- forced Night layer;
- three outcome families;
- separate from voluntary Prostitute career.

## Omission sentinel

Flag if:

- hidden career removed from full intended build;
- merged with Prostitute;
- becomes ordinary public job;
- Palace unlock begins counting it.

---

# 5. School

## Authority

- user LIFE-06;
- `SCHOOL_SYSTEM_v2.md`.

## Preservation evidence

Full scope should preserve School as:

- paid courses;
- typed progression;
- milestones/public outputs;
- characters/presentation;
- time competition;
- career/item/Activity/relationship impact.

## Omission sentinel

Flag if a whole-project summary defines School only as:

```text
pay money -> +stats
```

or treats current eight-course runtime as complete authored School depth.

---

# 6. Relationships

## Authority

- LIFE-08 / LIFE-12;
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`;
- career drafts.

## Preservation evidence

Relationships must remain able to:

- begin from career/world context;
- continue through Night;
- use typed progression;
- influence external routes;
- support friendship/professional/rivalry/romance where appropriate;
- contribute to endings.

## Omission sentinel

Flag if relationships become:

- one affection number only;
- isolated romance scenes;
- mandatory romance for professional career progress.

---

# 7. Night

## Authority

- LIFE-07;
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
- housing/night balance.

## Preservation evidence

Night must preserve:

- lodging;
- forced events/intercepts;
- voluntary relationship choices;
- School Night study;
- poverty/street variants;
- next-day effects;
- one calendar advance.

## Omission sentinel

Flag if Night becomes only:

`sleep -> next day`

with no gameplay choices/consequences.

---

# 8. Items / capabilities

## Authority

- LIFE-11;
- `ITEM_SYSTEM_DRAFT_v0.md`.

## Preservation evidence

Full product must include meaningful item examples where item possession changes:

- route;
- action;
- method;
- access;
- result.

Current Old Boundary Token is one runtime example, not the entire future item system.

## Omission sentinel

Flag if future scope says items are only:

- +stat;
- +percentage reward;
- cosmetic inventory.

---

# 9. Expedition Activity

## Authority

- LIFE-10;
- large Activity product role;
- Night/Activity contract.

## Preservation evidence

Full game must retain a meaningful second mode with:

- own progression;
- internal resource;
- routes/challenges;
- items/equipment;
- seasons;
- NPC/quests;
- city feedback;
- save/resume;
- outcomes.

## Omission sentinel

Flag if Activity is reduced to:

- one action;
- one stat check;
- short disposable minigame;
- test adapter only.

Current Forest slice is infrastructure/content seed, not complete global Activity scope.

---

# 10. Endings / Meta

## Authority

- LIFE-13/14/15;
- `META_REWARD_PHILOSOPHY_v1.md`;
- ending/runtime contracts.

## Preservation evidence

Full scope must retain:

- multiple eligible endings;
- continued play while eligible;
- explicit commitment;
- central completion;
- Meta exactly once;
- meaningful New Run changes;
- 10-career Hard Work ladder;
- larger cross-run progression.

## Omission sentinel

Flag if future summaries imply:

- ending eligibility auto-ends run;
- Meta is cosmetic only;
- New Run changes only stats;
- Palace/metagoal removed.

---

# 11. GIF-first presentation

## Authority

`GIF_CENTRAL_STAGE_CONTRACT_v1.md`

## Preservation evidence

Whole product uses one presentation architecture across:

- careers;
- School;
- relationships;
- Night;
- poverty;
- Activity;
- endings.

Must preserve:

- semantic `presentationId`;
- GIF-first;
- fallback;
- animation off;
- no timing coupling.

## Omission sentinel

Flag if:

- a future subsystem invents separate timing-coupled animation mechanics;
- presentation identity returns to filenames;
- GIF-first is described as Lumber-specific only.

---

# Full-project document acceptance check

For any whole-project handoff, assert it contains either direct mention or explicit authority pointer for all rows:

```text
careers
Palace
poverty
Secret Debt
School
relationships
Night
items
Activity
endings/Meta
presentation
```

If one is absent:

1. check whether Product authority explicitly removed it;
2. if not, classify the omission as documentation/coordination drift;
3. do not silently rewrite product scope based on the narrower document.

---

# Current known narrowing-risk documents

## `CURRENT_PROJECT_HANDOFF_v1.md`

Historical recovery snapshot focused heavily on Lumber Product Acceptance.

Treat as stale if used for full roadmap.

## `PARALLEL_WORK_BOARD_v1.md`

Live/historical coordination board accumulated around current integration phases.

Do not treat its active queues as a complete product backlog.

## `RC_CLOSEOUT_STATUS_v1.md`

Current authority for the vertical RC status.

Not full-game roadmap authority.

## Subsystem packets

Lumber/School/Presentation packets are intentionally narrow.

They are not omission failures because they do not claim full-product scope.

---

# Sentinel update rule

When Product explicitly changes scope:

- update authoritative product source first;
- then update this matrix;
- record the superseded row/requirement.

Do not infer scope removal from absence in an implementation PR.

No production runtime/UI/content file was modified by Chat 4.
