# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — COMPLETE ENDING ATLAS v9**
Owner: Chat 5

Previous packet frozen:
`chat5/housing-tier-value-decision-v8@6e8f095339a4a426cee5e3facb801f71ce6b1b82`

Disposition of v8:
- `READY_FOR_LEADER_PRODUCT_DECISION`;
- do not edit that frozen branch/head further;
- housing Product decision remains separate from this task.

## New assignment

Create a **complete successor Ending Atlas for the user**.

This is a research/Product-inventory task. Do **not** implement runtime, UI or content. Do not silently lock open mechanics/rewards.

Read current authority first:
- `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`;
- all 10 `CAREER_*_DRAFT_v0.md` files;
- `PALACE_HIDDEN_CAREER_DRAFT_v0.md`;
- `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`;
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`;
- `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`;
- `COMPLEX_ENDING_META_REWARD_CATALOG_v0.md`;
- current executable `content/definitions.json`;
- current presentation ending inventories;
- current Leader checkpoint/blocker index.

Critical rule:
older draft/reward docs are **not authority when they conflict with D1-D34**. Identify stale/conflicting proposals explicitly instead of copying them.

## Deliverables

Produce:

1. `mindy-successor/docs/tasks/CHAT5_COMPLETE_ENDING_ATLAS_v9.md`
2. `mindy-successor/research/successor_ending_atlas_v1.csv`

The Markdown must be written so the user can read it directly in Russian without needing internal project knowledge.

## Scope — exhaustive, not sampled

Inventory every ending/outcome family that is:
- currently executable;
- locked target scope;
- present in an active career/hidden-route design draft;
- or explicitly required by Product architecture but not yet named.

Cover at minimum:

### Global/current executable endings
Inventory all current executable ending IDs from `definitions.json`, including legacy/global ones such as Guild/Scholar/Tavern/Lumber where still present.

### All 10 ordinary professions

For each profession list every designed family, not only Hard Work:

- Lumber:
  Hard Work / Forewoman / Forest Compact;
- Satyr Maid:
  Hard Work / House Power / Favourite-Partner-Personal Network / Boundary Mastery;
- Undead Farm:
  Hard Work / Research Farmer / Farm Successor / External Anomaly;
- Tavern:
  Hard Work / Innkeeper / Information Broker / Sanctuary;
- Hunter:
  Hard Work / Master Hunter / Warden / Legend;
- Guard:
  Hard Work / Officer / Reform / Network-Corruption / Major Case;
- Merchant:
  Hard Work / Merchant House / Speculator-Smuggler / Patron of Routes;
- Artist/Geisha:
  Hard Work / Master Artist / Patron Network / Court Invitation;
- Assassin:
  Hard Work / Ghost / Handler Takeover / Refusal-Turncoat;
- Prostitute:
  Hard Work / Independent House / Elite Clientele / Network-Protection.

If current authority/drafts contain additional distinct families, include them and explain why they are distinct.

### Secret Debt

At minimum:
- Paid Freedom;
- Bound Life / hidden Hard Work analogue;
- Takeover / owner-control.

Use D19, D30, D32 as authority.

### Palace

At minimum:
- Service Life;
- Court Power;
- Inner Truth / World Route;
- True Ending — Return Home.

Use D18, D23, D24, D29 as authority.

### Activity / relationship / School / global families

Identify:
- any currently executable global/education ending;
- any explicitly required standalone Activity ending family;
- relationship-specific ending families that are actually defined;
- families that Product architecture says must exist but whose exact identity is still open.

Do **not** invent names merely to fill the atlas. Mark such rows `REQUIRED_BUT_UNDEFINED`.

## For every ending/family, answer the same questions

Each row/section must include:

1. **Название / stable ID**
   - exact runtime ID if it exists;
   - otherwise current design family name;
   - do not invent a fake stable ID.

2. **Категория**
   - ordinary career / Secret Debt / Palace / Activity / relationship / global / education.

3. **Authority status**
   one of:
   - `LOCKED`;
   - `IMPLEMENTED_LOCKED`;
   - `IMPLEMENTED_LEGACY`;
   - `DESIGN_DRAFT`;
   - `REQUIRED_BUT_UNDEFINED`;
   - `STALE_CONFLICTING_PROPOSAL`.

4. **Как открыть eligibility**
   Explain the actual route in player language:
   - work-count requirement;
   - career stage/facts;
   - School track/lesson requirement;
   - Night/relationship requirement;
   - Activity/item requirement;
   - stat threshold;
   - calendar/meta gate;
   - whether multiple endings may remain eligible simultaneously.

   Use exact numbers only where current authority provides them.
   If a number is open, write `OPEN`, not a guess.

5. **Как завершить**
   Separate eligibility from explicit ending commit/completion.
   D16 is mandatory: eligibility is generally non-terminal until explicit commit unless a current executable legacy ending demonstrably differs.

6. **Что происходит в этой жизни**
   Describe the ending's in-run resolution/result at the level currently specified.
   Do not invent final lore.

7. **Что она даёт навсегда / в New Start+**
   Separate:
   - permanent ownership/unlock;
   - selectable Hard Work package;
   - Keystone;
   - Specialist;
   - automatic knowledge/content;
   - no reward yet defined.

8. **Точная Meta-награда**
   State exact mechanics only if locked.
   Examples:
   - ordinary Hard Work: permanent early access + selectable profession package under D21-D23;
   - exact +5 mapping is OPEN unless already authoritative;
   - Secret Debt D30/D32 Keystones must use exact locked numbers;
   - Palace True: optional cap 100->200 Specialist, values not multiplied.

9. **Что ещё не решено**
   List exact open Product values/content for that ending.

10. **Implementation status**
    - exact current runtime ID exists?;
    - eligibility implemented?;
    - ending completion implemented?;
    - Meta reward implemented?;
    - presentation binding exists?;
    - focused/full CI evidence if known.

## Special audits required

### A. Count reconciliation

Give four separate counts:
- current executable ending IDs;
- designed ordinary-career outcome families;
- locked Secret Debt + Palace families;
- additional required-but-undefined Activity/relationship/global families.

Explain why these counts are not the same thing.

### B. Hard Work matrix

For all 10 ordinary professions show:
- exact Hard Work threshold = 50;
- permanent early-access reward;
- package breadth under D22 (first five one +5, later five two +5);
- exact package stat mapping if known, otherwise OPEN;
- Lust package placement/magnitude status;
- Palace contribution yes/no.

### C. Conflict/staleness audit

Audit `COMPLEX_ENDING_META_REWARD_CATALOG_v0.md` and career drafts against current locks.

Flag especially anything that would now violate:
- D23 Palace 10/10 permanent + 10/10 active sole entry gate;
- D27/D28 Keystone + Specialist architecture;
- D30/D32 Secret Debt exact rewards;
- D24 cap-only 200 semantics;
- D25 no original Plus Mode;
- D16 eligibility != auto-ending.

Do not present stale proposals as current rewards.

### D. Player-facing route summaries

For every ending family write a compact plain-Russian route:

`Начни -> сделай X -> открой Y -> выполни Z -> концовка становится доступна -> явно подтверди`.

Where route details are still open, show the known pieces and visibly mark the missing link.

### E. "What should exist in 1.0" summary

End the document with:
- what is already executable today;
- what still has to be produced for intended 1.0;
- which ending families are blocked only by content;
- which are blocked by Product decisions;
- which are blocked by runtime/system implementation.

## CSV schema

At minimum columns:

`domain,career_or_route,family_name,runtime_id,authority_status,eligibility_summary,exact_numeric_requirements,commit_model,current_run_result,permanent_reward,reward_class,implementation_status,presentation_status,open_questions,source_refs`

One row per distinct ending family/runtime ending identity. Avoid duplicate aliases; if one runtime ID maps to an old/global alias, explain it.

## Quality bar

This atlas is meant to answer the user's question:
**"Что даёт каждая концовка и как её получить?"**

It must therefore be readable without opening other docs.

No runtime/UI changes.
No full CI.
Freeze exact SHA and report:
`READY_FOR_LEADER_PRODUCT_REVIEW`.
