# Chat 5 — D41 Full-Suite Failure Triage v14

Status: **READY FOR CHAT 2 REPAIR**

Scope: triage only. No runtime implementation, no Chat 2 branch mutation, no full CI.

## Evidence and authority

Full-suite failure under triage:

- Chat 2 head: `836639de6ae9d654e168f50a8c5e1896b1347d91`
- GitHub Actions run: `37201061717`
- job: `111432669441`
- validate: **PASS** — 84 packs / 357 events / 39 actions / 43 endings
- build: **PASS**
- test summary: **1081 total / 1059 pass / 22 fail / 0 skipped**

D41 authority:

- Product packet: `CHAT5_ORDINARY_COMPLEX_ENDINGS_TRANCHE_A_v10.md@95c0f06449e0a62241e5286c8a95050c82346956`
- frozen producer: `chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`
- Strong Meta integration seam: `CHAT5_D41_SPECIALIST_INTEGRATION_SEAM_v11.md`

Relevant locked invariants:

- D16: eligibility is non-terminal; explicit commit remains mandatory.
- D34: Lumber stages are newcomer -> accepted-hand @1 -> trusted-worker @8 -> veteran @20. Forewoman/Forest require at least trusted-worker; Hard Work remains exactly 50 shifts.
- D41 Forest Compact requires the successful Forest return plus the validated preserved specimen, materialized in the career facts `forest-specimen-catalogued`, `forest-truth-known`, and `forest-problem-resolved`. The preserved specimen is validated, **not consumed**, in the frozen producer.
- D41 adds Satyr Maid Personal Network, three canonical Tavern endings, and three canonical Hunter endings.
- D41 retires live Tavern IDs `tavern-stay`, `tavern-court`, and `tavern-guild`; completed legacy rows migrate to Innkeeper / Information Broker / Sanctuary respectively.
- `tavern-court` never grants Palace.
- Hunter Warden Signs and Legend Contracts are automatic knowledge/content consumers and consume no Specialist slot.
- Warden Signs may add exactly one conditional Forest conservation choice per run; its marker fact is usage bookkeeping only and must not set ending readiness, resources, capabilities, or Activity shortcuts.
- Information Broker's Forest confirmation must be a legitimate successful Forest result; the D41 Tavern return consumer additionally requires `lumber.forest.truth-known`.

## Classification summary

| Class | Count | Meaning |
| --- | ---: | --- |
| A | **18** | stale pre-D41 freeze, negative assertion, or accelerator/setup expectation |
| B | **4** | retired legacy Tavern presentation/ending/reward identity |
| C | **0** | real D41 integration regression requiring runtime/seam behavior repair |

No failure in run `37201061717` is evidence that a D41 runtime contract itself is wrong. Two B-class failures are nevertheless real production **presentation-manifest hygiene** work: the integrity tests are correct and the stale manifest rows should change.

---

# Failure-by-failure triage

## 1. #86 — `chat3-content-depth-v4.test.ts`
**Test:** “C3-31 Forest audit matches current route and terminal result identities”  
**Class:** **A — stale pre-D41 freeze/negative expectation**

**Observed failure:** historical audit expects success-event choices to be exactly `['return']`; current event also contains `warden-conservation-route`.

**D41 authority:** `knowledge.hunter.warden-signs` must expose one authored conservation branch per run after Forest is normally unlocked. Frozen producer implements it as a conditional choice on `forest-result-content-v1.success`, guarded by the Meta unlock and an unused marker fact.

**Change target:** **test/fixture**, not production.

**Smallest safe repair:** keep the historical v4 audit for the original `return` choice, but either:
1. filter the explicitly authorized `warden-conservation-route` extension before comparing the old fixture; or
2. extend the audit fixture with that one D41 choice and its exact conditions/effect.

Do not loosen the assertion to arbitrary extra choices.

**Preserved safety purpose:** Forest route/result identity remains stable; the D41 exception is narrow and cannot mutate resources, capabilities, entry cost, Field Time, or ending facts.

**Coupling:** Hunter Warden automatic reward; Forest only. No Palace, Secret Debt, Strong Meta slot, or D16 coupling.

---

## 2. #132 — `chat3-hunter-live-authored-v16.test.ts`
**Test:** “C3-170..179 authored layer has zero Hunter producer-mechanics drift”  
**Class:** **A — stale pre-D41 mechanics freeze**

**Observed failure:** the pre-D41 Hunter projection does not contain the new Meta-read capability / `knowledge.hunter.legend-contracts` condition and other D41 additions.

**D41 authority:** Hunter now has Master Hunter, Warden, Legend and their exact D41 reward consumers. Legend Contracts is an automatic knowledge unlock, and the inherited legend variant is explicitly gated by that unlock while preserving normal clues/capability/Activity requirements.

**Change target:** **test baseline fixture**, not runtime.

**Smallest safe repair:** patch the frozen Hunter mechanics baseline only for the authorized D41 delta:
- the three D41 endings;
- the Legend Contracts Meta read and `hunter.routes.legend-contract-variant`;
- any exact D41 capability metadata needed by that event.

Keep the rest of the old projection exact rather than regenerating the whole baseline blindly.

**Preserved safety purpose:** protects Hunter wages, ordinary shift mechanics, clue producers, relationship behavior, Secret Debt isolation, and Activity costs from unrelated drift.

**Coupling:** Hunter + D41 automatic knowledge; Strong Meta only in the sense that automatic knowledge must remain outside Specialist capacity. No Palace/Secret Debt change.

---

## 3. #143 — `chat3-hunter-live-authored-v16.test.ts`
**Test:** “C3-169..179 authored layer adds no Secret Debt state or new public Hunter ending”  
**Class:** **A — stale negative expectation**

**Observed failure:** test expects Hunter endings to be only `ending.hunter.hard-work`; actual also has Master Hunter, Warden, Legend.

**D41 authority:** exactly these three public advanced Hunter endings are required:
- `ending.hunter.master-hunter`
- `ending.hunter.warden`
- `ending.hunter.legend`

**Change target:** **test**.

**Smallest safe repair:** split the old assertion:
- continue asserting no Secret Debt/lender/slave state in the Hunter authored layer;
- assert the exact four-ending set: Hard Work + the three D41 endings.

**Preserved safety purpose:** retains the Secret Debt firewall while no longer treating locked D41 endings as drift.

**Coupling:** Hunter, D16 explicit commit, D38 Activity-ending separation. No Palace substitution.

---

## 4. #184 — `chat3-production-promotion-no-mechanics-v11.test.ts`
**Test:** “C3-117 frozen v11 Forest contracts remain present under the intentional v12 extension”  
**Class:** **A — stale Forest no-effects freeze**

**Observed failure:** line asserting every Forest-result choice has `effects.length===0` is false because Warden Signs adds a usage-marker effect.

**D41 authority:** the one Warden conservation choice may write only `reward.hunter.warden-signs.used`; it must not set ending facts, resources, item/capability ownership, costs, or route completion.

**Change target:** **test**.

**Smallest safe repair:** assert:
- original return choices still have zero effects;
- the only allowed non-empty effect is the conditional Warden choice's single `addWorldFact reward.hunter.warden-signs.used`;
- no other choice effect kinds are introduced.

**Preserved safety purpose:** stronger than the old blanket zero-effects test: it explicitly proves the reward cannot become a gameplay shortcut.

**Coupling:** Forest + Hunter Warden. No Strong Meta slot / Palace / Secret Debt coupling.

---

## 5. #189 — `chat3-production-promotion-parity-v11.test.ts`
**Test:** “C3-112 frozen default aftermath remains present under intentional v13 result depth”  
**Class:** **A — stale Forest no-effects freeze**

**Observed failure:** `forest-result-content-v1.success` violates the old assertion that every result choice has no effects.

**D41 authority:** same Warden Signs exception as #184.

**Change target:** **test**.

**Smallest safe repair:** keep all default-variant/localization parity assertions unchanged; replace only the blanket no-effects condition with the exact Warden marker exception.

**Preserved safety purpose:** preserves default aftermath and localization parity while proving D41 reward effects remain narrowly bounded.

**Coupling:** Forest/Hunter only.

---

## 6. #197 — `chat3-starter-poverty-collision-v1.test.ts`
**Test:** “C3 starter-career collision guard accepts approved Satyr and Undead runtime contracts”  
**Class:** **A — stale ending roster expectation**

**Observed failure:** expected Satyr ending list omits `ending.satyr-maid.personal-network`.

**D41 authority:** Personal Network is the required new third Satyr advanced outcome alongside House Power and Boundary Mastery; Hard Work remains separate.

**Change target:** **test fixture / expected set**.

**Smallest safe repair:** add exactly `ending.satyr-maid.personal-network` to the Satyr expected ending set. Do not loosen to “contains” without an exact set check.

**Preserved safety purpose:** still catches accidental starter-career/poverty collisions and unexpected extra endings.

**Coupling:** Satyr consent semantics: Personal Network requires voluntary Night acceptance and explicit request acceptance; it must not weaken Boundary Mastery refusal semantics. No Secret Debt/Palace coupling.

---

## 7. #204 — `chat3-tavern-live-authored-v15.test.ts`
**Test:** “C3-158..167 has zero producer-mechanics drift”  
**Class:** **A — stale pre-D41 Tavern mechanics baseline**

**Observed failure:** old projection expects legacy Tavern contracts (including old visit-based behavior); current definitions use modern Hard Work and canonical D41 endings/consumers.

**D41 authority:** Tavern live outcomes are:
- `ending.tavern.hard-work`
- `ending.tavern.innkeeper`
- `ending.tavern.information-broker`
- `ending.tavern.sanctuary`

D41 also tightens the legitimate Forest-result confirmation seam and adds Broker Index authored consumers.

**Change target:** **test baseline fixture**, not production runtime.

**Smallest safe repair:** patch the Tavern mechanics baseline only for explicitly authorized D41 deltas:
- canonical ending IDs/gates/rewards;
- retirement of `tavern-stay/court/guild`;
- the `lumber.forest.truth-known` confirmation condition;
- D41 broker-index consumer metadata;
- request-choice recording added by D41 where represented.

Retain exact comparison for ordinary shift wage/seasonal mechanics and unrelated Tavern content.

**Preserved safety purpose:** continues to detect unapproved Tavern mechanics drift while allowing the Product-locked tranche.

**Coupling:** Tavern; D16; Secret Debt and Palace firewalls must stay unchanged; Information Broker must never imply Palace.

---

## 8. #210 — `chat3-tavern-live-authored-v15.test.ts`
**Test:** “C3-166 Forest return uses exact Activity result and ledger-backed authored variant”  
**Class:** **A — stale synthetic trigger setup**

**Observed failure:** direct `activityResult` injection leaves pending `forest-result-content-v1.success` instead of `tavern.activity.forest-return`.

**D41 authority:** the Tavern Information Broker confirmation consumer now additionally requires world fact `lumber.forest.truth-known`. The test manually emits the reaction trigger but does not create the successful Activity's world-fact evidence.

**Change target:** **test setup**, not production.

**Smallest safe repair:** before the synthetic reaction, add the exact `lumber.forest.truth-known` world fact, or preferably run the legitimate Forest success path. If the generic Forest result presentation is pending first, settle that blocking result and then assert the Tavern return consumer.

Do **not** remove the new world-fact condition from production.

**Preserved safety purpose:** a fabricated reaction token cannot confirm a Tavern rumour without the real successful Forest evidence.

**Coupling:** Tavern Information Broker + Forest. No Palace shortcut; Activity success remains mandatory.

---

## 9. #211 — `chat3-tavern-live-authored-v15.test.ts`
**Test:** “C3-167 crisis/outcome copy preserves ending IDs and rewards”  
**Class:** **B — retired legacy Tavern identities/rewards**

**Observed failure:** test expects `tavern-stay -> host`, then court/mediator legacy contracts.

**D41 authority:** live IDs/rewards are:
- Innkeeper -> `specialist.tavern.house-ledger`
- Information Broker -> `knowledge.tavern.broker-index`
- Sanctuary -> `specialist.tavern.safehouse-network`

Legacy IDs are migration input only; `host`, `court`, `mediator` are retired.

**Change target:** **test**.

**Smallest safe repair:** assert the exact canonical D41 ending/reward map and assert that `tavern-stay`, `tavern-court`, `tavern-guild` are absent from live definitions. Leave legacy conversion checks to migration tests.

**Preserved safety purpose:** explicitly protects against reintroducing broad legacy rewards and the old court/Palace shortcut.

**Coupling:** Tavern legacy migration, Strong Meta Specialist ownership, Palace D23 firewall.

---

## 10. #283 — `forest-bilingual-production.test.ts`
**Test:** “Forest bilingual production pack preserves exact activityResult boundaries and has no mechanical choice effects”  
**Class:** **A — stale blanket no-effects assertion**

**Observed failure:** Warden conservation choice carries the one allowed usage-marker effect.

**D41 authority:** identical to #184/#189.

**Change target:** **test**.

**Smallest safe repair:** preserve all Activity result boundary assertions and bilingual checks; permit exactly the Warden conditional choice with exactly one marker-world-fact effect. Assert every other choice remains mechanics-free.

**Preserved safety purpose:** ensures presentation/content choices do not silently grant resources, capabilities, or progression.

**Coupling:** Forest/Hunter Warden only.

---

## 11. #313 — `gopher.test.ts`
**Test:** “all three tavern endings reachable; branch choice excludes opposite route; NG+ benefit”  
**Class:** **B — retired legacy Tavern ending/reward test**

**Observed failure:** test still drives `tavern-stay`, `tavern-guild`, `tavern-court` and expects `host/mediator/court`.

**D41 authority:** those are no longer live endings. Only *completed* historical rows migrate to canonical D41 endings; incomplete legacy eligibility/commit does not auto-upgrade.

**Change target:** **test**, not production.

**Smallest safe repair:** remove/replace this obsolete live-ending subtest with one of:
- a migration-focused assertion for completed legacy rows; or
- canonical D41 Tavern ending coverage using the modern runtime.

Do not make legacy gopher choices produce the retired endings again.

**Preserved safety purpose:** keeps backwards compatibility where Product authorized it, without resurrecting legacy progression or Palace coupling.

**Coupling:** Tavern legacy migration; `tavern-court` must never grant Palace.

---

## 12. #372 — `hunter-presentation-v15-c2-158-166.test.ts`
**Test:** “C2-164 late Hunter route events are route presentation, not invented ending cards”  
**Class:** **A — stale negative presentation expectation**

**Observed failure:** test expects only Hunter Hard Work and no Master/Warden/Legend ending slots.

**D41 authority:** Master Hunter, Warden, Legend are now real canonical endings and therefore require real ending presentation surfaces.

**Change target:** **test**.

**Smallest safe repair:** keep assertions that route events/states use route presentation IDs, but change ending assertions to exact:
- Hard Work
- Master Hunter
- Warden
- Legend

and require the three D41 ending slots to exist rather than be undefined.

**Preserved safety purpose:** still prevents route-stage events from masquerading as ending cards; now distinguishes actual ending IDs from route events correctly.

**Coupling:** Hunter presentation + D16 ending identity. No D38 collapse.

---

## 13. #376 — `hunter-production-presentation-reachability-c2-167.test.ts`
**Test:** “C2-167 every Hunter stage relationship item state Activity and ending override has live runtime backing”  
**Class:** **A — stale Hunter ending set**

**Observed failure:** expected ending backing excludes the three D41 Hunter endings.

**D41 authority:** same exact four Hunter ending identities as #143/#372.

**Change target:** **test expected set / reachability matrix**.

**Smallest safe repair:** add the three canonical D41 ending IDs and their already-published presentation slots to the exact live-backing set. Keep all existing anti-orphan checks.

**Preserved safety purpose:** presentation overrides must still have real runtime backing; this repair strengthens the test against invented IDs.

**Coupling:** Hunter presentation/D16.

---

## 14. #411 — `lumber-ending-commitment.test.ts`
**Test:** “Lumber ending eligibility stays playable until explicit commit and completes through RunResult flow”  
**Class:** **A — stale D34 accelerator state**

**Observed failure:** committing Hard Work immediately after the accelerated 50th shift throws “finish current scene/night/Activity”.

**Root cause:** test seeds `accepted-hand` with 49 completed shifts. Under D34 that state is internally behind the 8/20 stage milestones. The next shift legitimately opens the blocking `lumber.career-trusted-worker` milestone scene.

**D41/D34 authority:** Hard Work is still 50 shifts, but D34 career milestones remain live blocking progression content. D16 never requires bypassing a pending scene.

**Change target:** **test accelerator**, not engine.

**Smallest safe repair:** when directly accelerating to 49 shifts, seed a stage consistent with that count (`veteran`), or explicitly settle the trusted-worker/veteran milestone scenes before attempting commit.

**Preserved safety purpose:** retains D16 explicit commit and the global invariant that ending commit cannot jump over blocking content.

**Coupling:** Lumber D34 + D16. Not a Forest requirement and not Strong Meta.

---

## 15. #552 — `presentation-full-roster-a11y-c2-117.test.ts`
**Test:** “C2-117 eligible Hard Work ending exposes focusable control and bilingual presentation state”  
**Class:** **A — stale D34 accelerator/UI state**

**Observed failure:** expected enabled Hard Work button is disabled.

**Root cause:** same inconsistent `accepted-hand + 49 shifts` setup as #411 leaves a blocking Lumber stage milestone pending after the shift; UI correctly disables ending commitment while another blocking scene owns interaction.

**Change target:** **test setup**.

**Smallest safe repair:** seed `veteran` for the 49-shift accelerator or settle Lumber milestone scenes before opening the ending panel.

**Preserved safety purpose:** accessibility test still proves an actually actionable eligible ending is keyboard-focusable, while respecting blocking-scene ownership.

**Coupling:** D34/D16/UI only.

---

## 16. #556 — `presentation-keyboard-focus-v9.test.ts`
**Test:** “ending controls expose a visible name, disable unavailable endings and enable an eligible existing ending”  
**Class:** **A — stale D34 accelerator/UI state**

**Observed failure:** same enabled-button expectation fails because the test created a pending D34 milestone.

**Change target:** **test setup**.

**Smallest safe repair:** same as #552: use a coherent `veteran + 49` accelerator or settle stage milestones before UI assertions.

**Preserved safety purpose:** disabled controls remain disabled for real blocking reasons; eligible and actionable controls remain focusable.

**Coupling:** D34/D16/UI.

---

## 17. #598 — `presentation-source-integrity-v9.test.ts`
**Test:** “every source inventory reference points to a live semantic or media identity”  
**Class:** **B — retired legacy presentation identity**

**Observed failure:** manifest still references dead semantic `ending/tavern-court` (and analogous legacy Tavern rows).

**D41 authority:** live semantic IDs are:
- `ending/tavern/innkeeper`
- `ending/tavern/information-broker`
- `ending/tavern/sanctuary`

The old three IDs are migration-only and must not remain live presentation inventory.

**Change target:** **production presentation manifest**, not the integrity test.

**Smallest safe repair:** in `content/presentation-drafts/presentation-hardening-v9-manifest-v1.json`, remove the three legacy semantic inventory rows. Bind the three canonical D41 ending semantic IDs to the same current approved neutral Tavern result asset already used by `activeExact` (`assets/presentation/career-tavern-result.svg`), unless a later presentation authority provides dedicated art. Recompute the manifest's integrity counts accordingly.

Do not weaken `presentation-source-integrity-v9.test.ts`.

**Preserved safety purpose:** source inventory contains no dead semantic references, and Information Broker does not inherit old court/Palace imagery.

**Coupling:** Tavern presentation + Palace firewall.

---

## 18. #599 — `presentation-source-integrity-v9.test.ts`
**Test:** “every selected exact semantic binding is represented exactly once in the source inventory”  
**Class:** **B — canonical Tavern presentation identities missing from source inventory**

**Observed failure:** `ending/tavern/innkeeper` is in `reachability.activeExact` but absent from `sourceIntegrity.uniqueProjectOwnedSources`; same manifest mismatch affects the D41 Tavern replacement set.

**D41 authority:** canonical Tavern ending presentation slots are live and must be represented exactly once.

**Change target:** **same production presentation manifest as #598**.

**Smallest safe repair:** one manifest repair should resolve both #598 and #599:
- remove source-inventory semantic refs for court/guild/stay;
- add Innkeeper/Information Broker/Sanctuary to the neutral Tavern result asset row;
- update counts.

**Preserved safety purpose:** one-to-one exact semantic source accounting remains intact; no dead or missing identities.

**Coupling:** Tavern presentation; Information Broker remains visually neutral and non-Palace.

---

## 19. #629 — `product-acceptance-shipped-v1.test.ts`
**Test:** “PA21-PA26 accelerator: two Lumber endings may be eligible...”  
**Class:** **A — pre-D41 Forest accelerator missing new exact gates**

**Observed failure:** expected `ending.lumber.forest` eligibility is absent.

**Root cause:** test seeds:
- `stage:'accepted-hand'`
- 49 shifts
- only `forest-truth-known` and `forest-problem-resolved`

D41 Forest additionally requires:
- at least trusted-worker / >=8 shifts; and
- `forest-specimen-catalogued`.

**D41 authority:** Forest Compact's exact career-fact trio is `forest-specimen-catalogued + forest-truth-known + forest-problem-resolved`, and D34 stage gate is mandatory. Hard Work remains independently eligible at 50.

**Change target:** **test accelerator**.

**Smallest safe repair:** make the synthetic accelerated state coherent:
- stage `veteran` (or trusted-worker);
- include `forest-specimen-catalogued`;
- preserve the existing truth/problem facts.

Then keep the assertion that Hard Work and Forest may coexist as eligible under D16.

**Preserved safety purpose:** proves co-eligibility without bypassing the specimen or D34 stage gate.

**Coupling:** Forest + D34 + D16. No Strong Meta/Palace.

---

## 20. #672 — `qa-minimal-rc-acceptance-gate-v2.test.ts`
**Test:** “minimal RC one-Save path proves School, Night, natural Forest and Hard Work exactly once”  
**Class:** **A — stale direct counter accelerator after a natural D41 Forest path**

**Observed failure:** Forest is not eligible after the test rewrites completed shifts to 49 and performs one shift.

**Root cause:** natural Forest return already goes through the D41 specimen-validation continuation, but the later accelerator leaves the Lumber career stage behind at an older stage. D34 does not derive stage automatically from an externally rewritten counter; stage transitions are authored milestones.

**Change target:** **test accelerator**.

**Smallest safe repair:** before the 49->50 Hard Work acceleration, set the career stage consistently to `veteran` (or naturally settle the 8/20 milestones). Add an explicit assertion that the natural return produced `forest-specimen-catalogued` alongside truth/problem facts.

Do not remove the Forest stage condition.

**Preserved safety purpose:** the one-save test continues to verify natural School/Night/Activity state while respecting D34 and D16.

**Coupling:** Forest + D34/D16; specimen validated, not consumed.

---

## 21. #673 — `qa-one-save-state-drift-sentinel-v2.test.ts`
**Test:** “final one-Save drift sentinel v2 preserves PR24 state across School, Night, Forest, ending and New Run”  
**Class:** **A — same stale Lumber counter/stage accelerator**

**Observed failure:** same missing Forest eligibility after an artificial 49->50 transition.

**Change target:** **test accelerator**.

**Smallest safe repair:** keep the one-save state-drift checks, but make the accelerated career state D34-coherent (`veteran` at 49), and explicitly retain/assert `forest-specimen-catalogued`.

**Preserved safety purpose:** prevents save/reload state drift without silently bypassing new route gates.

**Coupling:** Forest/D34/D16.

---

## 22. #683 — `release-candidate-shipped-e2e.test.ts`
**Test:** “release-candidate shipped E2E keeps one Save coherent across Lumber, School, Night, Forest and Hard Work”  
**Class:** **A — same stale Lumber counter/stage accelerator**

**Observed failure:** Forest eligibility absent immediately after accelerated 50th shift.

**D41 authority:** natural Forest route evidence remains valid, but D34 stage is a separate typed gate and cannot be inferred from direct mutation of `completed_shifts`.

**Change target:** **test accelerator**.

**Smallest safe repair:** seed `veteran` together with the 49-shift accelerator, or settle stage milestones before the final shift; explicitly verify `forest-specimen-catalogued` survives reload. Keep Hard Work/Forest co-eligibility and explicit commit assertions.

**Preserved safety purpose:** release-candidate E2E remains representative of a valid typed state rather than an impossible stage/counter combination.

**Coupling:** Forest/D34/D16.

---

# Repair batches for Chat 2

## Batch 1 — pure stale-test updates (A)

These should require **no production behavior change**:

- `chat3-content-depth-v4.test.ts`
- `chat3-hunter-live-authored-v16.test.ts`
- `chat3-production-promotion-no-mechanics-v11.test.ts`
- `chat3-production-promotion-parity-v11.test.ts`
- `chat3-starter-poverty-collision-v1.test.ts`
- `chat3-tavern-live-authored-v15.test.ts` baseline + legitimate Forest world-fact setup
- `forest-bilingual-production.test.ts`
- `hunter-presentation-v15-c2-158-166.test.ts`
- `hunter-production-presentation-reachability-c2-167.test.ts`
- `lumber-ending-commitment.test.ts`
- `presentation-full-roster-a11y-c2-117.test.ts`
- `presentation-keyboard-focus-v9.test.ts`
- `product-acceptance-shipped-v1.test.ts`
- `qa-minimal-rc-acceptance-gate-v2.test.ts`
- `qa-one-save-state-drift-sentinel-v2.test.ts`
- `release-candidate-shipped-e2e.test.ts`

Important: do not “fix” the Lumber failures by weakening the D34 stage gate or removing `forest-specimen-catalogued`.

## Batch 2 — retired Tavern live tests (B)

Update/remove live expectations for old IDs:

- `chat3-tavern-live-authored-v15.test.ts` legacy reward assertions
- `gopher.test.ts` legacy three-ending live behavior

Completed legacy migration remains covered through migration tests; do not resurrect old live endings.

## Batch 3 — presentation manifest hygiene (B)

Repair:
`content/presentation-drafts/presentation-hardening-v9-manifest-v1.json`

The integrity tests themselves should **not** be weakened.

Required end state:

- no `ending/tavern-stay`
- no `ending/tavern-court`
- no `ending/tavern-guild`
- exactly one source-inventory reference each for:
  - `ending/tavern/innkeeper`
  - `ending/tavern/information-broker`
  - `ending/tavern/sanctuary`
- Information Broker remains on neutral Tavern imagery; no court/Palace implication.

---

# Explicit non-repairs

Do **not** repair #1180 by:

- removing D41 Hunter endings;
- removing Satyr Personal Network;
- restoring Tavern legacy ending IDs or `host/court/mediator`;
- removing the Warden Signs Forest choice;
- making Warden Signs consume a Specialist slot;
- removing `lumber.forest.truth-known` from the Tavern confirmation seam;
- removing `forest-specimen-catalogued` from Forest Compact;
- consuming the preserved Forest specimen;
- weakening Lumber trusted-worker/veteran stage semantics;
- allowing ending commit while a blocking scene owns interaction;
- mapping Information Broker or legacy `tavern-court` to Palace;
- changing Secret Debt behavior;
- changing D23 Palace qualification.

## Conclusion

Run `37201061717` is a **repairable full-suite expectation/legacy-manifest failure set**, not evidence of a new D41 runtime regression:

- **18 A**
- **4 B**
- **0 C**

Chat 2 can repair the test/manifest surface without reopening D41 production mechanics.

**READY_FOR_CHAT2_REPAIR**
