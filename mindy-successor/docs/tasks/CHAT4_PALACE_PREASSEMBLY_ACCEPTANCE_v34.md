# Chat 4 — Palace Preassembly Acceptance v34

Status: **PREASSEMBLY HANDOFF COMPLETE — READY FOR CHAT 2 SELECTIVE ASSEMBLY**  
Owner: Chat 4  
Branch: `chat4/palace-exact-head-qa-bundle-v32`

## Purpose

This packet combines the new Chat 4 exact-head QA with the already accepted Palace producer/review packets and defines the exact source set, mandatory assembly repairs, merge-only risks, and stop conditions for Chat 2.

This is a **preassembly** acceptance, not a release-green declaration.

No full CI was run by Chat 4.

---

## 1. Current production ordering

Current observed production control-plane head at final v34 read:

`main@3a83ebaf1c81e4032efbf8a6f8a75bd6f6fd5db0`

The current main history shows:

- D42 closure is already recorded;
- Secret Debt + D51 is still the active Chat 2 tranche;
- no later main commit records that tranche as closed/merged.

Therefore:

**do not use `3a83ebaf...` as a frozen Palace assembly base.**

Chat 2 must finish/close Secret Debt+D51 first, then re-query actual `main` and freeze that then-current SHA as the Palace assembly base.

This preserves the v21 and Chat3 v33-v35 ordering rule.

---

## 2. Exact accepted input set

### Palace mechanics / Prince narrative source

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Chat 4 branch/head guard:

**IDENTICAL**

Chat 4 QA:

`CHAT4_PALACE_V18_EXACT_HEAD_QA_v32.md`

Disposition:

**accepted as selective assembly source with mandatory v32 repairs; not exact-head executable-green.**

### Palace final prose / localization / presentation source

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Chat 4 branch/head guard:

**IDENTICAL**

Chat 4 QA:

`CHAT4_PALACE_V19_PROSE_MEDIA_EXACT_HEAD_QA_v33.md`

Disposition:

**accepted for the v19 prose/media scope.**

Independent Chat 4 checks confirm:

- no v18 -> v19 mechanics drift;
- critical RU/EN parity;
- 19/19 Palace presentation mappings;
- only existing neutral fallback assets;
- D48 fallback correctness;
- D49 reveal/lore boundaries.

v19 inherits the v18 executable catalog blocker and therefore is not independently executable-green until the assembly repair is applied.

### D39 Strong Meta / reward runtime producer

Producer handoff:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Frozen executable implementation head:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Accepted independent exact-head QA:

`chat5/qa-palace-d39-reward-v24@ebf148ab2a12536c5f7d3bab8df4a9e8db8309b6`

Accepted QA evidence:

- workflow run `37458982676`
- job `112253482681`
- exact SHA guard PASS
- production firewall PASS
- `npm ci` PASS
- typecheck PASS
- validate PASS
- build PASS
- D39 / Strong Meta / save-load: 41/41 PASS
- D23 / Secret Debt isolation: 18/18 PASS
- focused total: **59/59 PASS**

Disposition:

**accepted executable source.**

### Palace cumulative assembly refresh

`chat5/palace-cumulative-assembly-refresh-v21@604481c4078929f106b21bb812a9d367eaa8e11c`

Disposition:

**accepted as the selective-assembly procedure / shared-file firewall.**

### Independent Palace review / save matrix / post-assembly gate

`chat3/palace-independent-release-review-v33@d816b9226c1d71834a7459b865eb5dcfd3e14d45`

Contains:

- `CHAT3_PALACE_FINAL_PACKET_INDEPENDENT_REVIEW_v33.md`
- `CHAT3_PALACE_SAVE_RELOAD_MATRIX_v34.md`
- `CHAT3_PALACE_POST_ASSEMBLY_QA_CHECKLIST_v35.md`

Disposition:

**accepted as independent review authority and final focused-gate definition.**

The independent review finds the mechanics coherent but identifies two live-content wiring gaps that remain release blockers.

---

## 3. New Chat 4 exact-head evidence

Chat 4 QA workflow:

`Chat4 Palace v32-v34 exact-head QA`

Evidence run:

`37465180151`

QA workflow head:

`998f8cadaff5e550d59dfa4ce6182056592739e4`

v18 job:

`112274304146`

v19 job:

`112274304057`

Both jobs proved their requested frozen checkout SHA exactly.

Both:

- `npm ci` PASS;
- `npm run build` PASS.

Both also independently exposed the same inherited Palace catalog blocker before focused behavior could execute.

No producer branch was changed.

---

## 4. Mandatory assembly repair A — outcome-ready typed read capabilities

Frozen v18/v19 `content/packs/palace-outcome-finalize.json` reads each outcome-ready fact in an existing `present:false` condition, but does not declare those facts in `capabilities.reads.worldFacts`.

The exact validation error starts at:

`palace.outcome.service-life-ready`

The existing pack also reads the analogous Court Power and Inner Truth ready facts.

When selectively assembling this pack, Chat 2 must add these three existing facts to its read capability declaration:

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

This is a validation-metadata repair for already-authored reads. It must not change:

- event conditions;
- effects;
- route readiness semantics;
- cadence/economy;
- ending eligibility;
- Prince mechanics;
- reward semantics.

After this repair, rerun validation and every Palace focused suite. Do not claim the historical exact heads themselves became green.

---

## 5. Mandatory assembly repair B — historical test typing

The exact v18/v19 heads do not pass repository `npm run typecheck` because their Palace tests contain strict-TypeScript errors:

- implicit-`any` callbacks;
- inferred `{}` access to `variants`;
- optional catalog `quests` / `careers` access without narrowing.

Observed files include:

- `tests/palace-rich6-runtime-v15.test.ts`
- `tests/palace-prince-narrative-producer-v18.test.ts`
- `tests/palace-final-prose-media-v19.test.ts`

Chat 2 must port/adapt these tests to the actual assembled typed catalog surface. This is test-harness/type hygiene, not Product authority.

Stop if fixing the typings requires changing accepted gameplay semantics.

---

## 6. Exact D39 reward bindings Chat 2 must apply

The frozen v19 Palace endings still need the v20 D39 bindings composed into the assembled definitions.

Required exact bindings:

### Service Life

`ending.palace.service-life`

-> strongMeta:

`palace.service-life.steady-practice`

### Court Power

`ending.palace.court-power`

-> strongMeta:

`palace.court-power.formal-introduction`

### Inner Truth

`ending.palace.inner-truth`

-> knowledge:

`palace.inner-truth.source-method`

### Return Home

`ending.palace.return-home`

-> strongMeta:

`palace.true.cap-200`

Do not use generic `unlock`.

Permanent grant boundary remains `completeEnding`.

Same-life run snapshot must remain unchanged.

---

## 7. Two unresolved live-content blockers from independent review

### P1-A — Formal Introduction consumer

The D39 runtime is accepted, but the frozen Palace stack does not contain an accepted exact ordinary-professional event + relationship transition using both:

- `strongMetaFormalIntroductionAvailable`
- `useStrongMetaFormalIntroduction`

Chat 2 must not auto-tag all relationships and must not guess a target.

If no accepted mapping/authoring is available on the assembly base, stop the Palace release gate and escalate the missing content mapping.

### P1-B — Source Method consumer

The D39 knowledge runtime is accepted, but the frozen Palace stack does not contain an accepted live information-only consumer for:

`palace.inner-truth.source-method`

Any accepted consumer must be an already-legal scene and may expose only information/provenance/cross-check content. It must not alter resources, stats, counters, stages, or ending eligibility, and must not reveal D49-reserved macro truth.

Chat 2 must not invent macro-lore to close this gap.

If no accepted consumer exists, stop the Palace release gate.

---

## 8. Shared-file merge-only risks

Do not wholesale copy historical Palace shared owners over the actual post-D51 base.

Highest-risk semantic composition files:

- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`
- `src/core/content.ts`
- `src/core/strongMeta.ts`
- `content/definitions.json`
- `content/localization.json`
- `content/presentation.json`

Special rules:

- extend the current `src/core/palace.ts`; never blindly replace D23;
- preserve all current Secret Debt / D51 / Night behavior;
- preserve current Strong Meta union and capacity 2;
- Source Method must remain automatic knowledge, not a Keystone/Specialist slot;
- merge only v19 Palace localization keys;
- merge exactly the 19 v19 Palace presentation slots;
- keep `stage-town.svg` / `stage-room.svg` neutral fallbacks unless dedicated D48 assets actually exist;
- do not make historical registry totals green by deleting newer accepted reward IDs.

---

## 9. Save / reload acceptance firewall

The assembled branch must execute the Chat3 v34 matrix, including at minimum:

- D23 invitation pending reload;
- access acceptance and new-life reset;
- duty count/stage/milestone persistence;
- no Energy/wage/count replay;
- no duty 16 after reload;
- same-day duty/support locks persisted;
- all three prep facts coexist;
- multiple non-True eligibilities survive reload;
- exact 12x91 Prince readiness;
- confrontation phase 1/2/3/4 persistence;
- failure reset and retry;
- defeat fact exactly once;
- defeated-but-uncommitted Return Home;
- committed-before-`completeEnding` reload;
- permanent reward replay protection;
- same-life reward remains inactive;
- next-life Specialist / automatic knowledge activation;
- D39 runtime counters persist;
- old schema6 missing D39 fields -> empty defaults;
- protected profile merge does not auto-select an imported Palace Specialist;
- Palace progress survives legitimate Secret Debt binding;
- forced Night remains ahead of any voluntary Palace Night;
- D51 modifier/provenance remains exactly once;
- Palace duty spends from final current-day Energy.

Any replay, ghost runtime acceptance, forced-Night suppression, or schema6 fork is a stop.

---

## 10. D43 / D45 / D48 / D49 acceptance firewall

### D43

Preserve:

- structural duty cost = 1 Energy;
- max one structural duty/day;
- support max one/day, cost 1, pay 0;
- exactly 15 duties;
- wage formula:
  `35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`;
- wage min 35, max 55;
- no duty 16.

### D45

Preserve exact IDs:

- `palace.prince-confrontation`
- `palace.confront-prince`
- `palace.prince-defeated`

Readiness remains Palace access + Outcome Ready + progression complete + all 12 progression stats >=91.

Lust is irrelevant.

No hidden School/Activity/item/relationship/romance/Strong-Meta gate.

Confrontation remains deterministic, zero money, zero Energy, four phases, retryable, and non-combat.

Defeat does not commit Return Home.

### D48

Missing dedicated Palace art is not a blocker while the authorized neutral fallback assets exist.

Never reference an absent dedicated asset path.

### D49

Preserve reveal ladder:

- duty 12 = authenticated anomaly only;
- duty 15 = first canonical Concordance / Threshold Archive / Threshold naming;
- original displacement cause remains unresolved;
- successor world remains real/intact;
- Prince remains a human institutional Custodian, not a deity/avatar/combat boss.

---

## 11. Chat 2 execution order

1. Finish and close Secret Debt+D51.
2. Re-query actual production `main`; freeze that exact SHA as Palace assembly base.
3. Create the Palace assembly branch from that exact base.
4. Selectively compose v18 mechanics; apply the narrow outcome-ready capability-read repair.
5. Selectively compose v19 Palace prose/localization/19 presentation slots.
6. Selectively compose v20 D39 runtime/schema/Strong Meta changes.
7. Apply the four exact Palace reward bindings.
8. Port/adapt Palace tests so the assembled branch passes strict typecheck without semantic drift.
9. Resolve only accepted live Formal Introduction and Source Method consumer mappings; if none are authorized, stop the release gate rather than inventing them.
10. Run `npm ci`, typecheck, validate, build.
11. Run the full Chat3 v35 focused Palace / D39 / save-reload / Secret Debt+D51 / presentation adjacency roster.
12. Only after every focused stop condition is green may Chat 2 run its normal full-CI gate.

---

## 12. Hard stop conditions for Chat 2

Stop assembly/release progression if any of the following occurs:

- Secret Debt+D51 is not closed before Palace base selection;
- the Palace base is guessed instead of re-read from actual main;
- historical shared files overwrite newer D42/Secret Debt/D51/Strong Meta work;
- the three outcome-ready typed reads remain undeclared;
- typecheck remains red after test adaptation;
- validate remains red;
- any focused Palace test remains red after the capability repair;
- D23 becomes a permanent unlock or qualifies below 10/10;
- second structural duty can run same day;
- duty/support transaction replays after reload;
- duty 16 becomes possible;
- wage/cost formula drifts;
- Prince gains RNG/combat/extra numeric/hidden gates;
- failure writes Prince defeat;
- Prince defeat auto-commits Return Home;
- a Palace ending remains `metaRewards: []`;
- any Palace reward is a generic `unlock`;
- a D39 reward activates in the earning life;
- Specialist capacity changes from 2;
- Source Method consumes a Strong Meta slot;
- Formal Introduction live consumer count remains zero at release gate;
- Source Method live consumer count remains zero at release gate;
- Palace suppresses forced Night;
- D51 provenance or Energy semantics change;
- schema6 is downgraded/forked;
- missing dedicated D48 art is treated as mechanics failure;
- an absent media path is referenced;
- Threshold is canonically named before duty 15;
- original displacement cause is invented;
- successor world becomes unreal/dream/simulation/collapses.

---

## 13. Final preassembly disposition

The Palace source stack is now fully enumerated and independently reviewed.

The new Chat 4 exact-head QA found two concrete historical producer defects that must be repaired during selective assembly:

1. missing outcome-ready typed read capability declarations;
2. strict-TypeScript errors in the historical Palace tests.

Neither requires reopening D23/D43/D45/D48/D49 Product decisions.

The D39 runtime has independent executable-green evidence.

The v19 prose/media layer passes its exact content-scope audit and does not alter mechanics.

The independent Chat3 review adds two separate live-content release blockers: Formal Introduction and Source Method need accepted authored consumers before Palace may be called release-ready.

Accordingly, this packet is **ready to hand to Chat 2 for selective assembly after Secret Debt+D51 closes and actual main is re-queried**. It is not permission to bypass the listed post-assembly stop conditions or to call Palace release-green before the focused gate succeeds.

**v34 COMPLETE**

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ASSEMBLY**
