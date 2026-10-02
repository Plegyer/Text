# Assassin Advanced Endings — Leader Decision Packet v1

Status: **PROPOSAL / IMPLEMENTATION-READY AFTER LEADER APPROVAL / NO RUNTIME CHANGES IN THIS COMMIT**  
Owner: Chat 3  
Branch: `chat3/assassin-advanced-endings-decision-v1`  
Fresh-main base inspected and used: `e819ad1f373d785a13f7502f8b50342b825fbf7a`  
Decision target: Ghost, Turncoat, Handler Takeover, Refusal Chain.

## 0. Authority and hard boundaries

This packet was prepared from fresh `main`, `docs/USER_DECISIONS_LOCKED_v1.md`, `docs/tasks/CURRENT_CHAT3_TASK_POINTER.md`, the shipped Assassin packs/tests, and `CAREER_ASSASSIN_DRAFT_v0.md`.

Already-shipped facts that this packet preserves:

- Assassin Hard Work remains exactly `completed_shifts >= 50`.
- The only current public Assassin ending is `ending.assassin.hard-work`.
- Advanced route identities already exist as career stages/readiness, but there are no approved public advanced ending IDs or production Meta reward IDs.
- Ending eligibility is non-terminal. The player must explicitly accept/commit an ending through the existing ending flow.
- No Morality stat, global crime/fallout meter, generic network framework, black-market framework, Palace bypass, Secret Debt coupling, or School gate is introduced.
- Tavern/Merchant/Guard are read-only cross-system inputs to Assassin-local facts.
- No full CI is requested by this packet.

This packet deliberately does **not** assign stable public ending IDs or stable reward IDs. Player-facing RU/EN identities and reward roles below are approval candidates only.

## 1. Shipped Assassin building blocks

The current career machine already provides:

`runner -> operative -> trusted-blade -> veteran | ghost | turncoat | handler-takeover | refusal-chain -> outcome-ready`.

The current shipped readiness inputs are:

- `ghost-ready`: Trusted Blade + successful Assassin infiltration return + contract method `stealth` + `assassin_concealed_entry`.
- `turncoat-ready`: Trusted Blade + contract resolution `abort` or `redirect` + `assassin_handle_evidence`.
- `handler-takeover-ready`: Trusted Blade + `handler-utility-ready` + `assassin_handle_evidence` + at least one of `tavern-intel-known`, `merchant-route-known`, `guard-pressure-known`.
- `refusal-chain-evidence`: Trusted Blade + at least one deliberate refusal signal from contract method `refusal`, contract resolution `abort`, or handler conflict response `declined`.
- `refusal-chain-ready` exists as a required career-transition fact but is intentionally not produced today.

Relevant shipped item/relationship/activity facts are already local and sufficient:

- Concealed Toolset -> capability `assassin_concealed_entry`.
- Evidence Case -> capability `assassin_handle_evidence`.
- Handler decline -> relationship choice `conflict-response=declined` and relationship fact `refusal-respected`.
- Handler cooperation + accepted utility -> career fact `handler-utility-ready`.
- Closed major contract -> career fact `contract-cycle-complete`.
- Successful `assassin.infiltration` -> career fact `infiltration-returned`.

## 2. Common architecture after approval

Readiness, specialization choice, ending eligibility, and ending commitment must remain four separate layers.

1. **Readiness** remains Assassin-local and non-terminal.
2. **Specialization choice** remains an explicit player choice. When an advanced branch is chosen, future implementation should persist one Assassin-local route identity fact so the chosen identity survives the later generic `outcome-ready` stage:
   - `advanced-route-ghost-selected`
   - `advanced-route-turncoat-selected`
   - `advanced-route-handler-takeover-selected`
   - `advanced-route-refusal-chain-selected`
3. **Ending eligibility** is published only after the corresponding selected-route fact is present. Readiness alone must never publish an advanced ending.
4. **Ending commitment** uses the existing explicit ending action: the player opens the endings/Legacy surface and presses **Accept fate / Принять судьбу**. Only that `accept` command ends the life and applies Meta reward(s).

The generic `outcome-ready` stage must not be used by itself to identify which advanced route was chosen, because all current advanced branches converge there.

Before explicit ending acceptance, current Assassin play remains available: ordinary `assassin.shift`, Assassin Night review, School capability reactions, and the Assassin Activity remain governed by their existing conditions. No advanced eligibility should auto-quit the profession or lock other careers. When an ending is explicitly accepted, the existing ending flow ends the current life normally.

Hard Work stays independent. If the player reaches 50 Assassin shifts and also completes one approved advanced route, Hard Work and that selected advanced ending may both be eligible at the same time before the player commits one of them.

## 3. Ghost

### Player-facing identity

- EN: **Ghost**
- RU: **Призрак**

No stable public ending ID is assigned by this packet.

### Natural acquisition path

Reach Trusted Blade through the existing four-season breadth, complete the authored major contract with `method=stealth`, possess the Concealed Toolset capability, close the contract, obtain `infiltration-qualified`, complete the shipped Assassin infiltration Activity successfully, and record `infiltration-returned`. The existing producer can then record `ghost-ready`. The player explicitly chooses the Ghost specialization.

### Existing shipped inputs

- career stage `trusted-blade`
- career facts `contract-cycle-complete`, `infiltration-qualified`, `infiltration-returned`, `ghost-ready`
- quest choice `assassin.contract / method=stealth`
- item capability `assassin_concealed_entry`
- Activity `assassin.infiltration`

### Exact proposed eligibility

Readiness stays exactly as shipped:

```
careerStage(assassin) == trusted-blade
AND careerFact(assassin, infiltration-returned)
AND questChoice(assassin.contract, method) == stealth
AND itemCapability(assassin_concealed_entry)
AND NOT careerFact(assassin, ghost-ready)
```

After the player selects Ghost, add `advanced-route-ghost-selected`.

The future advanced Ghost ending is eligible iff:

```
careerFact(assassin, ghost-ready)
AND careerFact(assassin, advanced-route-ghost-selected)
```

No completed-shift threshold is added.

### Separate explicit ending action

Selecting **Take Ghost** chooses the career specialization only. It must not end the run. The ending is committed later only through the existing **Accept fate / Принять судьбу** action.

### Current-career consequence

Before ending acceptance, ordinary Assassin work remains available and the player may continue the run. The major contract remains closed; Activity/Night/School behavior remains as shipped. No Palace or other-career state is changed.

### Meta reward candidate

**Ghost Step / Шаг призрака**.

Reward role: narrow strong rule modifier. When selected for a future life, only `assassin.infiltration` entry cost is reduced from 2 Energy to 1 Energy. It does not discount Forest/Hunter/other Activities, does not change ordinary Assassin shift cost, and does not bypass Assassin unlock conditions.

Because the general strong-modifier loadout budget is still globally open, approval of this reward should approve the effect; activation remains subject to the eventual Meta-loadout rules.

### Focused implementation tests

- Natural Trusted Blade -> stealth contract -> Concealed Toolset -> successful infiltration path produces `ghost-ready`.
- `ghost-ready` without `advanced-route-ghost-selected` does not make the ending eligible.
- Selecting Ghost makes the advanced ending eligible but leaves run status active and `assassin.shift` available.
- Only the explicit ending `accept` command ends the life and grants the approved reward.
- Ghost Step affects only Assassin infiltration entry Energy and is idempotent across save/reload.

## 4. Turncoat

### Player-facing identity

- EN: **Turncoat**
- RU: **Перебежчица**

No stable public ending ID is assigned by this packet.

### Natural acquisition path

Reach Trusted Blade, resolve the major contract with `abort` or `redirect`, close it, take/retain the Evidence Case so `assassin_handle_evidence` is present, then allow the existing `turncoat-ready` producer to record readiness. The player explicitly chooses Turncoat.

### Existing shipped inputs

- career stage `trusted-blade`
- quest resolution `abort` or `redirect`
- item capability `assassin_handle_evidence`
- career fact `turncoat-ready`
- existing contract lifecycle and evidence-case item flow

### Exact proposed eligibility

Readiness stays exactly as shipped:

```
careerStage(assassin) == trusted-blade
AND (
  questChoice(assassin.contract, resolution) == abort
  OR questChoice(assassin.contract, resolution) == redirect
)
AND itemCapability(assassin_handle_evidence)
AND NOT careerFact(assassin, turncoat-ready)
```

After the player selects Turncoat, add `advanced-route-turncoat-selected`.

The future advanced Turncoat ending is eligible iff:

```
careerFact(assassin, turncoat-ready)
AND careerFact(assassin, advanced-route-turncoat-selected)
```

No Morality, crime, Guard reputation, Palace, or shift-count condition is added.

### Separate explicit ending action

**Take Turncoat** is only the specialization choice. Ending commitment is later and separate through **Accept fate / Принять судьбу**.

### Current-career consequence

Before ending acceptance, ordinary Assassin work remains available. The contract is already closed, and no global wanted/crime state is created. Existing handler relationship state remains whatever the player authored through that chain; Turncoat does not silently rewrite it.

### Meta reward candidate

**False Identity / Ложная личность**.

Reward role: automatic authored-content unlock, not a global disguise subsystem. In future compatible Assassin/Guard content, `metaUnlock(False Identity)` may expose one additional alias-based legal/covert resolution choice. First implementation must not unlock Palace, alter Guard globally, or create a universal law/crime bypass.

### Focused implementation tests

- `abort` + Evidence Case and `redirect` + Evidence Case each naturally produce `turncoat-ready`.
- `execute` does not produce Turncoat readiness.
- Turncoat readiness without explicit Turncoat selection does not publish the ending.
- Turncoat selection keeps the run active until explicit ending acceptance.
- False Identity only exposes authored choices carrying its explicit Meta condition and does not unlock Palace or mutate Guard career state.

## 5. Handler Takeover

### Player-facing identity

- EN: **Handler Takeover**
- RU: **Новый куратор**

No stable public ending ID is assigned by this packet.

### Natural acquisition path

Reach Trusted Blade. Progress the existing handler relationship through professional trust and conflict, choose `cooperate`, then accept the later utility handoff so `handler-utility-ready` is recorded. Close the major contract and possess the Evidence Case. Separately obtain at least one already-shipped Assassin-local outside-context fact from Tavern, Merchant, or Guard. The existing producer can then record `handler-takeover-ready`. The player explicitly chooses Handler Takeover.

### Existing shipped inputs

- career stage `trusted-blade`
- career fact `handler-utility-ready`
- item capability `assassin_handle_evidence`
- at least one of:
  - `tavern-intel-known`
  - `merchant-route-known`
  - `guard-pressure-known`
- career fact `handler-takeover-ready`
- handler relationship cooperation/utility chain

### Exact proposed eligibility

Readiness stays exactly as shipped:

```
careerStage(assassin) == trusted-blade
AND careerFact(assassin, handler-utility-ready)
AND itemCapability(assassin_handle_evidence)
AND (
  careerFact(assassin, tavern-intel-known)
  OR careerFact(assassin, merchant-route-known)
  OR careerFact(assassin, guard-pressure-known)
)
AND NOT careerFact(assassin, handler-takeover-ready)
```

After the player selects Handler Takeover, add `advanced-route-handler-takeover-selected`.

The future advanced Handler Takeover ending is eligible iff:

```
careerFact(assassin, handler-takeover-ready)
AND careerFact(assassin, advanced-route-handler-takeover-selected)
```

No Palace contact is required. One shipped Tavern/Merchant/Guard input is sufficient; requiring all three would turn this into cross-career grind and is not proposed.

### Separate explicit ending action

**Take Handler Takeover** chooses the career identity only. Ending commitment remains the separate **Accept fate / Принять судьбу** action.

### Current-career consequence

The heroine becomes the Assassin-side coordinator in career identity, but ordinary Assassin work stays usable until ending acceptance. No generic network state is created and no other career is written. The existing handler relationship remains route-resolved according to its own authored choices.

### Meta reward candidate

**Network Income / Доход сети**.

Reward role: selectable strong economic modifier for future lives. Candidate tuning for Leader/Balance decision: **+3 money once at StartDay per calendar day while the modifier is active**, with no retroactive catch-up and no effect after the run ends. It is not an Assassin wage multiplier and does not alter other profession wage formulas.

If Leader approves the reward role but not the `+3` tuning, the numeric amount remains a Balance follow-up because exact global economy is still open.

### Focused implementation tests

- Handler cooperation alone is insufficient; accepted utility, Evidence Case, and one shipped outside-context fact are all required.
- Each of Tavern/Merchant/Guard local facts independently satisfies the one-of condition.
- No Assassin event writes Tavern/Merchant/Guard career state.
- Handler Takeover readiness without explicit selection does not publish the ending.
- Network Income, if approved, applies exactly once per StartDay, never multiplies wages, and is idempotent across save/reload.

## 6. Refusal Chain

### Player-facing identity

- EN: **Refusal Chain**
- RU: **Цепь отказов**

No stable public ending ID is assigned by this packet.

### Natural acquisition path

Reach Trusted Blade. Make a deliberate refusal inside the major contract and a separate deliberate refusal in the handler relationship.

Recommended natural order is:

1. progress the handler relationship and choose `conflict-response=declined`, which produces `refusal-respected`;
2. in the major contract, choose `method=refusal`, or choose another method and later `resolution=abort`;
3. allow the existing `refusal-chain-evidence` producer to record evidence;
4. the new Product-approved readiness producer records `refusal-chain-ready`;
5. the player explicitly chooses Refusal Chain.

The design does **not** require the Evidence Case, an arbitrary number of refused contracts, a number of shifts, or elapsed days.

### Existing shipped inputs

- career stage `trusted-blade`
- career fact `refusal-chain-evidence`
- contract choice:
  - `method=refusal`, or
  - `resolution=abort`
- handler relationship fact `refusal-respected` (from `conflict-response=declined`)
- existing transition `branch-refusal-chain`, already gated by `refusal-chain-ready`

### Exact proposed `refusal-chain-ready` rule

Publish `refusal-chain-ready` only when:

```
careerStage(assassin) == trusted-blade
AND careerFact(assassin, refusal-chain-evidence)
AND (
  questChoice(assassin.contract, method) == refusal
  OR questChoice(assassin.contract, resolution) == abort
)
AND relationshipFact(assassin.handler, refusal-respected)
AND NOT careerFact(assassin, refusal-chain-ready)
```

This is the architectural answer to the open blocker.

Why this rule:

- it requires **two qualitatively different authored refusals**, one contract-side and one relationship-side;
- it turns the existing evidence fact into readiness instead of replacing it;
- it is deterministic and save-stable;
- it has no numeric threshold, timer, completed-shift dependency, hidden Morality score, or global crime/network state;
- `redirect` by itself remains Turncoat material, not Refusal Chain;
- handler decline by itself is not enough to call one act a “chain.”

The future readiness producer should react to the relevant durable changes on both sides (at minimum `careerFactAdded: refusal-chain-evidence` and the handler refusal transition/fact) so either acquisition order can be evaluated. It must remain Assassin-owned.

After the player selects Refusal Chain, add `advanced-route-refusal-chain-selected`.

The future advanced Refusal Chain ending is eligible iff:

```
careerFact(assassin, refusal-chain-ready)
AND careerFact(assassin, advanced-route-refusal-chain-selected)
```

### Separate explicit ending action

**Take Refusal Chain** chooses the career route only. The player may keep playing. Ending commitment remains the separate **Accept fate / Принять судьбу** action.

### Current-career consequence

The handler route is declined/resolved, but ordinary Assassin work remains available as independent covert practice until the player accepts an ending. No profession-domain lock is added. No other career, School, Secret Debt, or Palace state changes.

### Meta reward candidate

**False Identity / Ложная личность**, shared with Turncoat.

The shared reward is intentional: both routes teach the heroine to preserve an alternate identity and exit/redirect authored covert situations, but they reach that knowledge through different career choices. Completing both endings may record both ending completions, while the Meta unlock itself remains idempotent and is granted only once.

If Product wants distinct rewards later, that is a separate reward-splitting decision; it is not required to implement the route correctly.

### Focused implementation tests

- Contract refusal alone records evidence but does not produce `refusal-chain-ready`.
- Handler decline alone records/qualifies refusal evidence but does not produce `refusal-chain-ready`.
- Contract-side refusal + `refusal-respected` produces `refusal-chain-ready` with no `careerCounter`, `completed_shifts`, calendar, or timer condition.
- Both input orders are evaluated: handler decline first then contract refusal, and contract refusal first then handler decline, provided the player has not already committed a competing specialization.
- `redirect` without `method=refusal` does not satisfy Refusal Chain readiness.
- Refusal Chain selection makes only the Refusal Chain advanced ending eligible; readiness alone is non-terminal.
- Ordinary Assassin work remains available after Refusal Chain eligibility and before explicit ending acceptance.

## 7. Route-selection collision requirement for implementation

The shipped repair intentionally preserves this ordering:

`turncoat-ready (73) -> refusal-evidence (71) -> choose-practice (58)`.

When Refusal Chain becomes approved, its new readiness producer should resolve after evidence has been recorded and before any specialization picker can consume the branch. A suitable Assassin-local priority is **70**, with triggers on the durable refusal inputs above.

However, a player who has already explicitly selected a competing specialization has made a route choice; later readiness must not rewrite that choice. The implementation therefore needs one focused invariant:

> Before an advanced specialization has been selected, all readiness producers triggered by the current reaction cascade must settle before a specialization picker is shown. After a specialization has been selected, no later readiness fact auto-switches the career.

If the implementation keeps the current two picker events, tests must prove this invariant. Consolidating them into one Assassin-only picker is acceptable, but not required by this Product decision.

## 8. Required future static/firewall tests

When/if Leader approves implementation, add static tests that keep these boundaries explicit:

- public advanced ending definitions appear only after approval and use route-selected facts, not readiness alone;
- exactly one Assassin-local selected-route fact is set by an explicit specialization choice;
- no advanced route changes Hard Work=50;
- no advanced route writes Palace, Secret Debt, School, Guard/Tavern/Merchant career state, Morality, crime, black-market, or generic network state;
- no advanced eligibility auto-ends the run;
- existing generic ending acceptance remains the only terminal step;
- advanced Meta rewards are idempotent;
- Hard Work and one selected advanced Assassin ending can coexist as eligible endings before commitment.

## 9. Leader decisions requested

Approve, adjust, or reject the following Product choices:

1. Ghost eligibility remains the shipped `ghost-ready` contract/Activity/item formula; player-facing identity **Ghost / Призрак**; reward candidate **Ghost Step / Шаг призрака**.
2. Turncoat eligibility remains the shipped `turncoat-ready` abort/redirect + Evidence Case formula; identity **Turncoat / Перебежчица**; reward candidate **False Identity / Ложная личность**.
3. Handler Takeover eligibility remains the shipped utility + evidence + one outside-context formula; identity **Handler Takeover / Новый куратор**; reward candidate **Network Income / Доход сети**, candidate tuning `+3/day` while selected.
4. Refusal Chain readiness uses the exact two-domain qualitative rule in section 6; identity **Refusal Chain / Цепь отказов**; reward candidate shares **False Identity / Ложная личность** with Turncoat.
5. Advanced route selection must persist a route-selected Assassin fact before the generic `outcome-ready` convergence.
6. No public advanced ending ID or stable Meta reward ID is created until these decisions are approved.

Disposition: **READY_FOR_LEADER_DECISION**.
