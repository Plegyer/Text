# Chat 5 — D46 + D47 + Legacy Packet Independent Review v26

Status: **REVIEW COMPLETE — READY WITH BASE-RELATIVE COUNT CORRECTION**  
Owner: Chat 5  
Branch: `chat5/cross-system-independent-review-bundle-v25`

Scope: independent research/review only. No production runtime changes. No full CI.

## Sources reviewed

Final packet:

`chat3/d46-d47-legacy-final-assembly-packet-v29@77259effc9cd626fefca1813d6e76f3ec5a9d299`

Frozen producers:

- D46:
  `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47:
  `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- lumber-stay retirement:
  `chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

Accepted earlier assembly preflight:

`chat5/d46-d47-legacy-assembly-preflight-v18@bed3a78507715f885b60d5b3f7a9824fc44c8de9`

Leader queue confirms this tranche is assembled after:

1. Secret Debt + D51;
2. Palace;
3. Activity + Camp + D38.

That ordering matters to total ending/presentation counts.

---

## Overall verdict

The v29 composition order and frozen mechanical values are correct:

`actual current base -> D46 -> D47 -> legacy retirement`

No contradiction was found in the D46/D47/legacy mechanics themselves.

The canonical ordinary-career ending rule is also correct:

**exactly 40 live canonical ordinary-career endings**

with Lumber exactly:

- `ending.lumber.hard-work`
- `ending.lumber.forewoman`
- `ending.lumber.forest`

and historical `lumber-stay` excluded from that denominator.

One correction is required before Chat 2 uses v29 as an integration stop-condition packet:

**the absolute total-catalog count 42 and exact-static presentation count 8 are historical-baseline observations, not final assembly invariants.**

---

# Finding B1 — total ending count 42 is not portable to the queued final base

Severity: **high integration false-positive risk**

v29 accurately reports that on its observed historical catalog:

- before retirement: 43 total ending definitions;
- removing exactly one live `lumber-stay` would yield 42.

That was true for the observed source snapshot.

It is not a safe final Chat 2 invariant.

The Leader queue explicitly places D46+D47+legacy after Secret Debt, Palace, and Activity.

Those earlier tranches add their own non-ordinary ending families.

Therefore the final pre-retirement catalog on the actual D46 assembly base is expected to contain more ending definitions than the old observed 43.

A correct assembly could therefore fail v29 stop condition #19 if that condition is interpreted literally as:

`final catalog endings must equal 42`

### Correct replacement invariant

Freeze the actual Chat 2 base immediately before legacy retirement.

Let:

`N = live total ending definitions before removing lumber-stay`

After the retirement step:

- total live ending definitions must equal `N - 1`;
- the only removed live ending ID must be `lumber-stay`;
- all other ending IDs from the actual base must remain;
- canonical ordinary-career ending count must equal exactly **40**.

Do not hard-code 42 on the future assembled base.

### Canonical denominator

The absolute Product invariant is:

- 10 ordinary careers;
- exactly 40 canonical ordinary-career endings total.

Generic/non-ordinary endings are outside that denominator.

Examples already known to be outside the ordinary 40 include:

- `guild-life`;
- `scholar-life`;
- Secret Debt ending family;
- Palace ending family;
- Activity D38 ending family.

Their existence must not cause the ordinary count assertion to change.

---

# Finding B2 — exact-static presentation count 8 is also baseline-relative

Severity: **medium integration false-positive risk**

Legacy v17 correctly reduced the old exact-static ending presentation surface from 9 to 8 by retiring:

`ending/lumber-stay`

That absolute 8 count belongs to the old presentation snapshot.

By the time this tranche assembles, accepted Palace and Activity presentation content may already add ending presentation slots.

Therefore Chat 2 must not "fix" a higher final exact-static ending count back down to 8.

### Correct presentation invariant

On the actual pre-retirement assembly base:

1. capture the set of live ending presentation IDs;
2. retire exactly:
   `ending/lumber-stay`;
3. preserve every other current presentation ID;
4. preserve all current source-integrity mappings;
5. assert the post-retirement set equals the pre-retirement set minus exactly one retired ID.

The important invariant is not absolute count 8.

It is:

`ending/lumber-stay` absent, with no unrelated presentation loss.

The frozen legacy regression that changed stale 9 -> 8 remains valid as evidence for the old v17 source, but its absolute count must not override later assembled content.

---

# Confirmed D46 values

The v29 packet matches frozen D46.

## Fresh creation

- fresh Lust = **5**;
- starting money = **600**;
- base Energy = **3**.

Existing target-schema saves must not have stored Lust rewritten to 5.

## Ordinary wage bases

- Lumber = **35**;
- other nine ordinary careers = **37**.

Frozen wage stat factors remain unchanged.

## Ordinary wage formula

Only ordinary `<career>.shift` actions use the shared seam.

Required cap:

**120**

Inputs must be captured before the shift mutates relevant wage stats.

No ordinary cap leakage into:

- Secret Debt hidden work;
- Palace duties/support;
- generic hunt;
- other non-ordinary wage families.

D46 and legacy both modify `engine.ts`; both semantics must survive manual composition.

---

# Confirmed D47 mapping

v29 matches the frozen producer exactly.

| Career | Package |
| --- | --- |
| Lumber | Strength +5 |
| Satyr Maid | Charm +5 |
| Undead Farm | Magic +5 |
| Tavern | Wits +5 |
| Hunter | Dexterity +5 |
| Guard | Endurance +5, Manners +5 |
| Merchant | Reason +5, Sociability +5 |
| Artist/Geisha | Creativity +5, Grooming +5 |
| Assassin | Dexterity +5, Wits +5 |
| Prostitute | Sexuality +5, Charm +5, separate Lust +5 |

Global checks:

- first five packages: one progression-stat +5 each;
- later five: two progression-stat +5 each;
- total progression-stat bonus = 75;
- all 12 progression stats represented;
- only Prostitute has separate Lust bonus;
- whole profession package remains the selection unit.

D47 package ownership remains outside Strong Meta slots.

No one-package global slot is introduced.

### D46 dependency

D47 is correctly ordered after D46.

The Prostitute package must apply to fresh Lust 5:

`5 + 5 = 10`

Merchant package must never change money from 600.

---

# Confirmed legacy retirement semantics

The v29 packet matches frozen v17.

## Live catalog

Remove only the obsolete live ending:

`lumber-stay`

No new-play acquisition of:

`vitality`

## Historical compatibility

Stable identities remain:

- historical ending: `lumber-stay`;
- historical raw unlock input: `vitality`;
- normalized compatibility perk:
  `legacy.lumber-stay.vitality`.

Historical evidence yields exactly one compatibility perk.

Daily Energy contribution:

**+1 exactly once**

The perk consumes no:

- Strong Meta Keystone slot;
- Strong Meta Specialist slot;
- Hard Work package identity;
- D23 qualification identity.

### No Hard Work fabrication

Historical `lumber-stay` / `vitality` must never create:

- `hardWorkProgress`;
- ordinary Hard Work package ownership;
- package preference/activation;
- Forewoman;
- Forest;
- Hard Work ending completion.

### Historical RunResult

For already-completed historical saves preserve:

- ending ID;
- original RunResult when present;
- transaction ID;
- completion day;
- historical applied reward IDs as audit history.

Do not replay reward acquisition.

### Incomplete historical states

Eligible-only:

- remove obsolete eligibility;
- grant nothing.

Committed-but-unfinished:

- clear obsolete commitment/result state;
- return `ending_committed` run to active;
- preserve unrelated state;
- grant nothing unless independent completed/unlock evidence exists.

---

# Production overlap review

## D46 + D47

No direct production-file conflict.

D47 depends on D46 semantics and should be applied second.

## D46 + legacy

Direct overlaps:

- `content/definitions.json`
- `src/core/engine.ts`

Required treatment remains manual-preserve-both.

### definitions

Preserve:

- D46 ten ordinary wage-base edits;
- legacy removal of only `lumber-stay`;
- all current post-Activity/Post-Palace definitions.

### engine

Preserve:

- D46 fresh Lust and ordinary wage seam;
- current Secret Debt/D51 logic;
- current Palace logic;
- current Activity logic;
- legacy normalization/Energy/migration behavior.

Never replace current engine with either historical producer blob.

## D47 + legacy

No direct production-file overlap.

Semantic firewall remains mandatory:

historical legacy evidence cannot become Hard Work package evidence.

---

# Canonical 40-ending acceptance test

The final assembled test should compute ordinary-career membership by the ten canonical career namespaces and assert:

- count = 40;
- IDs unique = 40;
- no `lumber-stay`;
- Lumber set equals exactly:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`
- all ordinary endings that existed before the retirement step, except `lumber-stay`, remain.

Do not use total global ending count as the canonical-40 assertion.

The frozen `lumber-stay-retirement-v17.test.ts` already uses the correct ordinary-prefix count and does **not** hard-code global total 42.

That is the safer test model to preserve.

---

# Required updated stop conditions

Keep all v29 mechanical stop conditions, with these two substitutions.

## Replace global count stop

Do not stop merely because final global ending count is not 42.

Stop if:

- more or fewer than one live ending is removed by legacy retirement;
- the removed ID is not exactly `lumber-stay`;
- ordinary canonical count is not 40;
- any unrelated pre-existing ending disappears.

## Replace static-presentation count stop

Do not stop merely because final exact-static ending presentation count is not 8.

Stop if:

- `ending/lumber-stay` remains live;
- another current ending presentation/source mapping is removed;
- an unrelated later Palace/Activity/Secret Debt presentation is lost;
- retired Tavern/Lumber historical presentation is restored as a live route.

---

# Focused QA note

The v29 focused domains remain appropriate:

- D46 economy/lifecycle;
- D47 package mapping/creation/migration;
- legacy retirement/migration/RunResult;
- presentation source-integrity/parity.

Chat 2 should add a base-relative set-diff assertion around ending definitions and ending presentation slots.

This prevents stale absolute counts from masking accidental loss of newly assembled content.

---

# Final verdict

The D46, D47, and legacy mechanics in v29 are consistent with their frozen producers.

The exact composition order is correct.

The canonical **40 ordinary endings** rule is correct and remains absolute.

Required correction:

- treat `42 total endings` as an observed historical count only;
- treat `8 exact-static ending presentations` as an observed historical count only;
- on the real post-Activity base, assert set preservation minus exactly `lumber-stay`.

No Product decision is required.

## Disposition

**READY_FOR_CHAT2_PREFLIGHT WITH BASE-RELATIVE COUNT CORRECTION**
