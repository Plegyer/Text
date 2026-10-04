# Chat 5 — Final Ending ID / Migration Audit v15

Status: **READY FOR LEADER REVIEW**

Scope: research/audit only. No runtime changes, no Chat 2 assembly mutation, no full CI.

## Sources of truth inspected

- current task pointer on `main@96eb5d09139055140e231689ea6a3ffeb536e757`;
- D40 merged authority: Leader merge `209e2f6dae5ae3c34c0803410d640b67022cc899`;
- D40 frozen green assembly: `9f16458df1dd2232afe205e3f05920618f6007aa`;
- D41 Product authority: `CHAT5_ORDINARY_COMPLEX_ENDINGS_TRANCHE_A_v10.md@95c0f06449e0a62241e5286c8a95050c82346956`;
- D41 frozen producer: `chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`;
- combined D40+D41 Chat 2 snapshot: `836639de6ae9d654e168f50a8c5e1896b1347d91`;
- current Chat 2 repair branch `chat2/assembly-d41-tranche-a-current-main-20261004-v1` for latest live-definition/source-inventory spot checks;
- D41 full-suite triage: `chat5/d41-full-suite-triage-v14@06fd08196d9eabdc1b4f6e3a360794cd64d1e80c`.

The combined D40+D41 snapshot contains **43 total ending definitions**:
- **40 canonical ordinary-career endings**;
- `guild-life`;
- `scholar-life`;
- `lumber-stay`.

The first two extra IDs are generic prototype endings outside the ordinary-career 40-surface. `lumber-stay` is a separate legacy closure item discussed below.

---

# 1. Canonical 1.0 ordinary-career ending surface

Expected total: **40**.

Audit result: **PASS — exactly 40 canonical `ending.<career>.*` IDs exist on the combined D40+D41 snapshot, with no duplicate ID.**

Composition:
- 10 Hard Work;
- 14 D41 advanced;
- 16 D40 advanced.

## 1.1 Hard Work — 10

| Career | Stable ending ID | Reward transaction |
| --- | --- | --- |
| Lumber | `ending.lumber.hard-work` | `hardWork:lumber` |
| Satyr Maid | `ending.satyr-maid.hard-work` | `hardWork:satyr-maid` |
| Undead Farm | `ending.undead-farm.hard-work` | `hardWork:undead-farm` |
| Tavern | `ending.tavern.hard-work` | `hardWork:tavern` |
| Hunter | `ending.hunter.hard-work` | `hardWork:hunter` |
| Guard | `ending.guard.hard-work` | `hardWork:guard` |
| Merchant | `ending.merchant.hard-work` | `hardWork:merchant` |
| Artist/Geisha | `ending.artist-geisha.hard-work` | `hardWork:artist-geisha` |
| Assassin | `ending.assassin.hard-work` | `hardWork:assassin` |
| Prostitute | `ending.prostitute.hard-work` | `hardWork:prostitute` |

All ten use the typed `hardWork` Meta reward kind. No Hard Work ending is an alias of an advanced ending.

## 1.2 D41 Tranche A — 14

| Career | Stable ending ID | Reward | Class |
| --- | --- | --- | --- |
| Lumber | `ending.lumber.forewoman` | `specialist.lumber.forewoman-ledger` | Specialist |
| Lumber | `ending.lumber.forest` | `specialist.lumber.forest-compact-route` | Specialist |
| Satyr Maid | `ending.satyr-maid.house-power` | `specialist.satyr-maid.house-ledger` | Specialist |
| Satyr Maid | `ending.satyr-maid.personal-network` | `specialist.satyr-maid.guest-network` | Specialist |
| Satyr Maid | `ending.satyr-maid.boundary-mastery` | `satyr-maid.clear-terms` | automatic content |
| Undead Farm | `ending.undead-farm.research-farmer` | `specialist.undead-farm.field-preservation` | Specialist |
| Undead Farm | `ending.undead-farm.successor` | `specialist.undead-farm.supplier-account` | Specialist |
| Undead Farm | `ending.undead-farm.external-anomaly` | `knowledge.undead-farm.anomaly-catalog` | automatic knowledge |
| Tavern | `ending.tavern.innkeeper` | `specialist.tavern.house-ledger` | Specialist |
| Tavern | `ending.tavern.information-broker` | `knowledge.tavern.broker-index` | automatic knowledge |
| Tavern | `ending.tavern.sanctuary` | `specialist.tavern.safehouse-network` | Specialist |
| Hunter | `ending.hunter.master-hunter` | `specialist.hunter.master-kit` | Specialist |
| Hunter | `ending.hunter.warden` | `knowledge.hunter.warden-signs` | automatic knowledge |
| Hunter | `ending.hunter.legend` | `knowledge.hunter.legend-contracts` | automatic knowledge |

D41 reward count:
- 9 Specialists;
- 5 automatic knowledge/content rewards.

All nine Specialists are registered in the single canonical Strong Meta registry and share normal Specialist capacity. Automatic knowledge/content remains outside Specialist capacity.

## 1.3 D40 Tranche B — 16

| Career | Stable ending ID | Reward | Class |
| --- | --- | --- | --- |
| Guard | `ending.guard.officer` | `unlock.guard.command-briefing` | automatic |
| Guard | `ending.guard.reform` | `unlock.guard.reform-practice` | automatic |
| Guard | `ending.guard.network` | `specialist.guard.institutional-favors` | Specialist |
| Guard | `ending.guard.major-case` | `unlock.guard.casebook-index` | automatic |
| Merchant | `ending.merchant.house` | `unlock.merchant.house-supplier` | automatic |
| Merchant | `ending.merchant.speculator-smuggler` | `specialist.merchant.risk-ledger` | Specialist |
| Merchant | `ending.merchant.patron-of-routes` | `unlock.merchant.patron-destinations` | automatic |
| Artist/Geisha | `ending.artist-geisha.master-artist` | `unlock.artist.master-repertoire` | automatic |
| Artist/Geisha | `ending.artist-geisha.patron-network` | `specialist.artist.salon-introductions` | Specialist |
| Artist/Geisha | `ending.artist-geisha.court-invitation` | `unlock.artist.court-context` | automatic |
| Assassin | `ending.assassin.ghost` | `specialist.assassin.ghost-routes` | Specialist |
| Assassin | `ending.assassin.handler-takeover` | `specialist.assassin.contract-ledger` | Specialist |
| Assassin | `ending.assassin.refusal-turncoat` | `unlock.assassin.refusal-protocol` | automatic |
| Prostitute | `ending.prostitute.independent-house` | `specialist.prostitute.housebook` | Specialist |
| Prostitute | `ending.prostitute.elite-clientele` | `unlock.prostitute.elite-protocol` | automatic |
| Prostitute | `ending.prostitute.network-protection` | `specialist.prostitute.mutual-aid-roster` | Specialist |

D40 reward count:
- 7 Specialists;
- 9 automatic unlocks.

D40 introduced these IDs as canonical; there is no D40 old-ending alias table. Its save repair is limited to reconstructing an unambiguous selected-route fact from an already persisted advanced career stage. It does not rename ending IDs.

---

# 2. Duplicate semantic identity audit

## Canonical 40

**PASS.**

- 40 IDs, 40 unique strings.
- Hard Work is a distinct route family from all advanced endings.
- D40 selected-route facts isolate its advanced outcomes.
- D41 route contracts isolate its advanced outcomes.
- no canonical advanced ID is reused by another career;
- no D40 reward ID collides with a D41 reward ID;
- each Hard Work reward transaction is career-specific.

## Generic prototype endings

`guild-life` and `scholar-life` are outside the ordinary-career canonical set and do not collide with a canonical `ending.<career>.*` ID.

## Legacy `lumber-stay`

**OPEN — Leader identity-closure decision required.**

Current combined/current Chat 2 catalog still contains live:

`lumber-stay`

with:
- title: “Бригадир поневоле”;
- gate: 24 legacy `lumber` visits;
- reward: `vitality`;
- epilogue: staying to lead the Lumber crew.

It is not in the expected 40 canonical ordinary-career IDs and it is semantically close to the modern Lumber leadership family.

Frozen D41 authority explicitly says **do not map `lumber-stay` / `vitality` to Forewoman**. It also must not map to Forest Compact.

Therefore the safe policy is **not** to invent a canonical alias.

Before 1.0 Leader must explicitly choose one of two policies:

1. **legacy-exempt policy** — keep `lumber-stay` intentionally live as a noncanonical prototype ending and explicitly document that the “40 ordinary-career endings” count excludes it; or
2. **retire-new-eligibility policy** — remove/disable new `lumber-stay` eligibility while preserving historical completion identity/reward compatibility under a dedicated legacy rule.

If retired, historical `lumber-stay` must remain historical; it must **not** canonicalize to Forewoman or Forest. A save migration rule is required before deleting its catalog identity from ended in-progress legacy saves.

Until Leader records that disposition, the strict statement “the live ordinary-career surface is exactly 40” is not fully closed.

---

# 3. Retired D41 Tavern identities and migration

Exact legacy ending map:

| Legacy ending | Canonical completed ending |
| --- | --- |
| `tavern-stay` | `ending.tavern.innkeeper` |
| `tavern-guild` | `ending.tavern.sanctuary` |
| `tavern-court` | `ending.tavern.information-broker` |

**PASS in runtime migration.**

## Completed old ending

On load:
- `meta.completedEndings` is canonicalized and deduplicated;
- an ended run whose historical `RunResult.endingId` is a retired Tavern ID receives the canonical D41 ending ID;
- `run.endings.committed` is canonicalized to the same current ID;
- automatic knowledge reward ownership is backfilled where applicable;
- Specialist ownership is granted through the single Strong Meta ownership API;
- the existing historical transaction proof is preserved instead of creating a second completion.

This is idempotent on repeated load.

## Uncompleted old ending

**PASS.**

- retired Tavern IDs are removed from `run.endings.eligible`;
- an uncompleted retired committed ending is reset to `committed = null`;
- stale result is cleared;
- `ending_committed` returns to `active`;
- it is **not** upgraded into free D41 eligibility.

This correctly prevents an old pre-D41 Tavern branch from bypassing the new D41 gates.

## Retired legacy reward IDs

Retired from active unlocks:
- `host`;
- `mediator`;
- `court`;
- `satyr-maid.house-credit`.

`satyr-maid.house-credit` remains only as a migration signal for ownership of `specialist.satyr-maid.house-ledger`, including the old-profile case where a matching completion row is absent.

---

# 4. Palace and Secret Debt identity firewalls

**PASS.**

- `tavern-court` canonicalizes only to Information Broker.
- Information Broker grants `knowledge.tavern.broker-index`, not Palace access.
- retired `court` unlock is removed.
- `unlock.artist.court-context` from D40 Artist Court Invitation is a context/content reward and is explicitly tested not to qualify a Palace run.
- Palace remains D23-qualified through its own permanent/current-life package contract.
- ordinary Prostitute D40 endings remain separate from Secret Debt forced-route semantics.
- D41 advanced rewards do not alter Secret Debt discovery/debt/forced Night/exit.

No legacy ordinary ending ID is allowed to imply Palace.

---

# 5. D16 / ending commit identity

**PASS.**

The engine separates three states:
- eligible;
- committed;
- completed `RunResult`.

`register` only adds an eligible ending. It does not commit it.

`commitEnding`:
- requires the exact ending ID to already be eligible;
- rejects selection while a blocking scene, Night, or Activity owns interaction;
- stores the exact ID in `run.endings.committed`;
- does not grant the reward.

`completeEnding`:
- requires a previously committed ending;
- finds that exact catalog ID;
- performs the completion transaction;
- only then writes completion/rewards.

D40 explicitly tests overlapping eligible route facts while preserving explicit choice.
D41 explicitly tests simultaneous eligible advanced Hunter endings while preserving explicit choice.

**No advanced ending auto-commits.**

---

# 6. RunResult and transaction identity

**PASS.**

Current transaction identity is derived from:

`run.id + endingId`

with the run number included in the public transaction/result prefix.

The engine produces:
- `transactionId = tx.<runsStarted>.<stable hash>`;
- `resultId = rr.<runsStarted>.<stable hash>`.

The `RunResult` stores:
- exact canonical ending ID;
- transaction ID;
- result ID;
- completion day;
- first-completion flag;
- exact applied Meta reward IDs.

Exactly-once protections:
- applied transaction IDs are kept in `meta.appliedResultTransactions`;
- repeating completion on the same ended run is idempotent;
- reward ownership is granted only on first canonical completion;
- Strong Meta ownership itself deduplicates reward IDs.

For historical completed Tavern migrations, preserving the old transaction proof while rewriting the semantic ending identity is correct: migration must not synthesize a second completion transaction.

---

# 7. Save/load idempotence

**PASS for the canonical 40 and D41 Tavern migration.**

Evidence:
- D41 completed legacy migration is tested through a second `parseSave` and remains unchanged;
- D40 route-fact repair uses additive unique semantics and does not change an already-canonical ending ID;
- completed-endings and unlock lists deduplicate;
- Strong Meta ownership grants deduplicate;
- applied result transactions deduplicate;
- eligible canonical advanced endings survive ordinary save/load without becoming committed;
- committed/completed identity is validated against the stored `RunResult`.

The unresolved `lumber-stay` disposition is the only identity-policy gap: if Leader chooses retirement, a dedicated historical-save policy must be authored before removing the definition.

---

# 8. Presentation identity audit

## Semantic presentation IDs

**PASS for canonical identity generation.**

Every live catalog ending automatically receives:

`presentationIdForEnding(endingId)`

so all 40 canonical endings have stable semantic surfaces of the form:

`ending/<career>/<ending>`

Examples:
- `ending/lumber/forest`;
- `ending/tavern/information-broker`;
- `ending/merchant/speculator-smuggler`;
- `ending/prostitute/network-protection`.

The generic ending loop generates slots only from live catalog definitions, preventing reserved/non-live IDs from appearing merely because Presentation mentioned them.

D40 career presentation tests additionally prove its advanced ending semantic slots resolve through current catalog/fallback media rather than requiring invented ending IDs.

D41 has explicit stable presentation surfaces for all 14 canonical endings on the combined candidate.

## Source-inventory integrity

**KNOWN OPEN REPAIR — not a D41 runtime regression.**

Current Chat 2 repair branch still has stale source-inventory semantic rows:
- `ending/tavern-stay`;
- `ending/tavern-guild`;
- `ending/tavern-court`.

At the same time the active exact presentation set correctly names:
- `ending/tavern/innkeeper`;
- `ending/tavern/sanctuary`;
- `ending/tavern/information-broker`.

This is exactly the Class-B issue identified by D41 triage v14.

Required repair remains:
- remove the three dead legacy Tavern semantic rows from `presentation-hardening-v9-manifest-v1.json`;
- add exactly one source-inventory reference for each canonical Tavern D41 ending;
- keep Information Broker on neutral Tavern imagery;
- recompute integrity counts;
- do **not** weaken the integrity tests.

Until Chat 2 lands that manifest repair, the criterion **“no dead legacy semantic rows” is FAIL/PENDING**, even though the runtime ending identity is correct.

## `lumber-stay` presentation

Because `lumber-stay` is still a live catalog ending, its legacy presentation identity is also still live. Its presentation row cannot be called dead until Leader decides the ending's 1.0 policy.

If Leader retires `lumber-stay`, its live presentation/source row must be retired in the same identity change; historical save compatibility must not be implemented by leaving a second playable Lumber leadership ending.

---

# 9. Localization identity

No ending identity rewrite is performed through localization.

The presentation system exposes each live ending's `title`, `description`, and `epilogue` as ending-owned text fields, and presentation IDs derive from the mechanical ending ID rather than localized copy.

Therefore:
- changing RU/EN wording cannot change mechanical identity;
- aliases are never inferred from title/lore similarity;
- Tavern legacy canonicalization occurs in save migration, not localization;
- D40/D41 ending IDs remain stable even if final lore/media polish changes.

Final bilingual/media polish is compatible with the later global presentation mapping pass and does not require reopening the 40-ID mechanical set.

---

# 10. Reward ownership audit summary

Across the canonical 40:

- **10 Hard Work** typed progression rewards;
- **16 advanced Specialists**:
  - 9 D41;
  - 7 D40;
- **14 advanced automatic knowledge/content unlocks**:
  - 5 D41;
  - 9 D40.

Total advanced endings: **30 = 16 Specialist + 14 automatic**.

All advanced reward IDs are route-specific and no canonical advanced ending silently falls back to a generic legacy reward.

Specialist ownership uses the one Strong Meta registry.
Automatic content rewards use normal Meta unlock ownership.
Hard Work progression uses its own typed Hard Work progression path.

These three ownership classes do not alias one another.

---

# 11. 1.0 closure checklist

| Requirement | Audit |
| --- | --- |
| exact 10 Hard Work stable IDs | **PASS** |
| exact 14 D41 stable IDs | **PASS** |
| exact 16 D40 stable IDs | **PASS** |
| canonical ordinary total = 40 | **PASS as canonical set** |
| no duplicate canonical ID | **PASS** |
| no duplicate canonical reward ownership | **PASS** |
| D41 Tavern completed legacy canonicalization | **PASS** |
| D41 Tavern uncompleted eligibility/commit cleanup | **PASS** |
| no Tavern legacy -> Palace implication | **PASS** |
| D40 ending alias migration needed | **NO — none exists** |
| RunResult exact ending identity | **PASS** |
| transaction exactly-once | **PASS** |
| no advanced auto-commit | **PASS** |
| save/load idempotence | **PASS** |
| canonical presentation semantic surface | **PASS** |
| no dead legacy presentation/source rows | **PENDING CHAT 2 REPAIR** |
| strict live ordinary-career surface contains only the canonical 40 | **OPEN: `lumber-stay` disposition required** |

---

# 12. Leader decisions / actions

## Required before final 1.0 identity freeze

### A. Close `lumber-stay` policy

Record explicitly whether `lumber-stay` is:
- an intentional legacy-exempt live prototype ending outside the canonical ordinary 40; or
- retired for new play.

If retired:
- do not map it to Forewoman;
- do not map it to Forest Compact;
- do not silently convert `vitality` into a D41 reward;
- preserve completed historical identity/reward through an explicit legacy save policy;
- clear uncompleted live eligibility/commit safely;
- remove its live presentation/source identity consistently.

### B. Finish known Tavern presentation inventory repair

Chat 2 already owns this repair from D41 triage v14:
- delete dead legacy Tavern semantic rows;
- bind canonical Innkeeper / Sanctuary / Information Broker rows exactly once.

No runtime change is indicated by this audit.

---

# 13. Final conclusion

The **canonical mechanical 1.0 ordinary-career ending set is coherent and exactly 40 IDs**:
10 Hard Work + 14 D41 + 16 D40.

D41 Tavern migration, reward ownership, RunResult identity, explicit D16 commit semantics, Palace separation, and save/load idempotence are sound on the combined candidate.

There are **two remaining identity-closure items**, neither requiring Chat 5 runtime implementation:

1. known Chat 2 presentation-manifest cleanup for retired Tavern semantic rows;
2. Leader disposition of the still-live legacy `lumber-stay` / `vitality` route relative to the strict 40-ending 1.0 surface.

**READY_FOR_LEADER_REVIEW**
