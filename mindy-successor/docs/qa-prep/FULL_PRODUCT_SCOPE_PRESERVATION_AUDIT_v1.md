# Full Product Scope Preservation Audit v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR27

## Purpose

Verify that the live project still preserves the full successor-game scope and has not accidentally collapsed into a Lumber-only release slice.

The current Lumber/School/Forest release candidate is a vertical proof and production foundation. It is not the complete game scope.

---

# Authoritative full-scope sources

Primary product authority:

- `USER_VISION_AND_ACCEPTANCE.md`
- `USER_DECISIONS_LOCKED_v1.md`
- `NEW_GAME_SPEC_v1.md`
- `JOB_ROSTER_RECONCILIATION_v1.md`
- `META_REWARD_PHILOSOPHY_v1.md`
- `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`
- `GIF_CENTRAL_STAGE_CONTRACT_v1.md`

System/detail authorities:

- `JOB_SYSTEM_MATRIX_v0.md`
- `SCHOOL_SYSTEM_v2.md`
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`
- `ITEM_SYSTEM_DRAFT_v0.md`
- `ECONOMY_AND_POVERTY_DRAFT_v0.md`
- `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`
- `PALACE_HIDDEN_CAREER_DRAFT_v0.md`

---

# 1. Ten ordinary careers are still explicitly preserved

`JOB_ROSTER_RECONCILIATION_v1.md` defines ten ordinary/public jobs:

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

The current production implementation is much narrower than this roster, but no authoritative product document removes the other nine careers.

The starter trio remains:

- Lumber
- Satyr Maid
- Undead Farm

Later ordinary jobs remain distinct product roles rather than aliases or optional flavor.

Classification:

**FULL SCOPE PRESERVED / PRODUCTION INCOMPLETE**

---

# 2. Palace remains a hidden meta career

The roster and Meta philosophy preserve Palace as a distinct hidden career after the ordinary-career ladder.

Locked long-term structure:

- all 10 ordinary Hard Work outcomes form the professional meta ladder;
- **10/10 Hard Work unlocks Palace**;
- Palace is not ordinary career #11;
- Palace has its own repeatable work and career progression;
- Palace may participate in the larger cross-run goal.

Current Lumber-only Hard Work implementation does not narrow this requirement.

Classification:

**PRESERVED / FUTURE PRODUCTION PACKAGE REQUIRED**

---

# 3. Ordinary poverty and housing remain a full system

The user vision explicitly requires poverty to produce a different playable life rather than only a rent failure.

The authority set preserves:

- housing/lodging pressure;
- low/zero-money continuation;
- street/poor-night alternatives;
- alternate income/social routes;
- recovery paths;
- cross-system consequences.

Current normal lodging and NightFlow are infrastructure, not the full poverty game.

Classification:

**PRESERVED / CONTENT + FUTURE SYSTEM PACKAGES REQUIRED**

---

# 4. Secret Debt / Slave hidden career remains separate

`JOB_ROSTER_RECONCILIATION_v1.md` explicitly preserves:

- an extra hidden Slave career;
- activation through a debt/loan trap;
- no occupation of an ordinary-career slot;
- no replacement of Palace;
- clear distinction from the voluntary Prostitute career.

The project must keep:

- ordinary poverty;
- Secret Debt route;
- voluntary Prostitute career

as separate concepts.

Current RC work does not close or remove this scope.

Classification:

**PRESERVED / FUTURE PRODUCTION PACKAGE REQUIRED**

---

# 5. School remains a standalone life system

`USER_VISION_AND_ACCEPTANCE.md` requires School to be more than stat purchase.

Current production already proves:

- eight paid courses;
- typed School progression;
- Night study;
- presentation;
- save/reload.

Full product scope still requires richer authored School life:

- teachers/presenters;
- milestones/projects/exams/certificates where selected;
- career/item/relationship consequences;
- public cross-system results.

Current Lumber-facing School gaps must not be interpreted as “School exists only to support Lumber”.

Classification:

**PRESERVED / BASE RUNTIME GREEN / AUTHORING DEPTH OPEN**

---

# 6. Typed relationships remain a cross-system product surface

The product vision requires relationships to intersect with:

- jobs;
- Night;
- School;
- Activity;
- external quests/items;
- endings.

Current Foreman relationship is one production proof.

It is not the sole intended relationship system.

Future careers must receive their own relationship packages where their designs require them.

Classification:

**PRESERVED / ONE CURRENT PRODUCTION EXAMPLE**

---

# 7. Night remains a full gameplay layer

Night is explicitly a gameplay choice layer, not merely a transition function.

Preserved scope includes:

- lodging;
- costs;
- forced/optional events;
- repeated relationship meetings;
- School Night study;
- next-day consequences;
- poverty interactions;
- potentially career-specific Night content.

Current normal lodging + Foreman Night proves the infrastructure only.

Classification:

**PRESERVED / BASE RUNTIME GREEN / CONTENT EXPANSION NEEDED**

---

# 8. Items/capabilities remain broad cross-system mechanics

`ITEM_SYSTEM_DRAFT_v0.md` requires items to alter action space rather than only add percentages.

Preserved sources/usages include:

- purchases;
- job rewards;
- School;
- relationships;
- Activity;
- seasonal events;
- barter;
- covert acquisition where authored.

Current Old Boundary Token is one concrete capability example.

The project still expects item-driven interactions across other careers and systems.

Classification:

**PRESERVED / GENERIC RUNTIME GREEN / CATALOG OPEN**

---

# 9. Expedition Activity remains a major second-mode product system

`LARGE_ACTIVITY_PRODUCT_ROLE_v0.md` explicitly rejects a trivial minigame.

Preserved requirements include:

- routes/regions;
- own internal resource;
- multiple challenge families;
- items/equipment;
- seasons;
- NPC/quests;
- city feedback loops;
- save/resume;
- success/escape/failure;
- contribution to jobs/relationships/endings/meta.

The current Forest logging-road/old-boundary slice is only the first Activity production slice.

Classification:

**PRESERVED / BASE RUNTIME GREEN / CONTENT DEPTH OPEN**

---

# 10. Endings and Meta remain a full-game progression structure

The vision and Meta philosophy preserve:

- simple Hard Work outcomes;
- complex career endings;
- secret/rare endings;
- visible cross-run rewards;
- substantial New Run changes;
- Palace unlock progression;
- broader long-term macro goal.

Current Lumber Hard Work is one member of the eventual 10-career Hard Work ladder.

Its exact rule remains locked only for Lumber:

`completed_shifts >= 50`

with reward:

`hardWork:lumber`.

Do not generalize Lumber's numeric threshold to every career automatically.

Classification:

**PRESERVED / LUMBER PROOF IMPLEMENTED / FULL CATALOG OPEN**

---

# 11. GIF-first central presentation remains full-game infrastructure

`GIF_CENTRAL_STAGE_CONTRACT_v1.md` is explicitly global.

The same central presentation contract applies to:

- careers;
- School;
- relationships;
- Night;
- Activity;
- poverty/hidden routes;
- endings.

Locked rules remain:

- one central media window;
- GIF primary;
- static/text fallback;
- gameplay never waits for GIF;
- save stores semantic identity, not frame/time;
- replacement assets do not alter mechanics.

Current Lumber/School coverage is not a scope limitation.

Classification:

**PRESERVED / GLOBAL PRESENTATION CONTRACT**

---

# Coordination / handoff narrowing risks

## `CURRENT_PROJECT_HANDOFF_v1.md`

Status:

**STALE / NARROWING RISK**

The durable handoff was written during the Lumber Product Acceptance closure phase.

Its active blocker sections are almost entirely about:

- Old Boundary Token;
- School -> Lumber result;
- Forest depth;
- Lumber PA rows.

That was correct for that integration phase, but if read as the whole product roadmap it can accidentally imply the project is a Lumber game.

It must be interpreted only as a historical Lead recovery snapshot.

Its own text says Git is authoritative and the file may become stale.

Use current full-scope product authority instead for roadmap scope.

## `PARALLEL_WORK_BOARD_v1.md`

Status:

**STALE COORDINATION SNAPSHOT / NARROWING RISK**

Large portions still describe the Product Acceptance phase and older worker branches.

It is useful as coordination history but is not the product-scope authority.

The board should not be used to infer that only Lumber, School and presentation remain in the project.

## `RC_CLOSEOUT_STATUS_v1.md`

Status:

**CURRENT FOR RC SLICE / NOT FULL-GAME SCOPE**

It correctly describes the current release-candidate vertical.

Its remaining-decision list is intentionally about the current vertical.

It must not be treated as the full game backlog.

## `RC_HUMAN_DECISIONS_REQUIRED_v1.md`

Status:

**CURRENT FOR CURRENT RC DECISIONS / NOT COMPLETE PRODUCT DECISION CATALOG**

It lists decisions blocking the present RC/PA slice.

It does not claim that all later-career or poverty decisions have already been made.

## Lumber subsystem packets

Status:

**SUBSYSTEM AUTHORITY ONLY**

They are authoritative for Lumber contracts, not the entire successor scope.

---

# Scope omission sentinels

A future handoff/roadmap should be considered suspicious if it omits all mention of any of these surfaces:

- 10 ordinary careers;
- Palace;
- ordinary poverty/housing;
- Secret Debt / Slave hidden career;
- School;
- relationships;
- Night;
- items/capabilities;
- large Activity;
- endings/Meta;
- GIF-first presentation.

Omission from a narrow subsystem document is fine.

Omission from a document claiming to summarize the whole project is not.

---

# Final disposition

| Product surface | Preserved in authority? | Current implementation state |
|---|---:|---|
| 10 ordinary careers | **YES** | Lumber production proof; others need packages |
| Palace 10/10 Hard Work unlock | **YES** | Meta architecture exists; career package future |
| ordinary poverty/housing | **YES** | partial Night/lodging infrastructure |
| Secret Debt / Slave | **YES** | design authority only |
| School | **YES** | base runtime/8 courses green; deeper authoring open |
| typed relationships | **YES** | Foreman production proof; broader catalog future |
| Night | **YES** | runtime green; broader content future |
| items/capabilities | **YES** | generic runtime green; catalog expansion future |
| expedition Activity | **YES** | Forest base slice; full depth open |
| endings/Meta | **YES** | runtime green; full career catalog future |
| GIF-first central presentation | **YES** | runtime green/global contract |

The live project scope is **not Lumber-only**.

The current RC is a vertical foundation for the larger successor design.

No production runtime/UI/content file was modified by Chat 4.
