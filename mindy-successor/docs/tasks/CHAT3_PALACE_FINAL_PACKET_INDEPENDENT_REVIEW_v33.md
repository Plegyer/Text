# Chat 3 — Palace Final Packet Independent Review v33

Status: **INDEPENDENT REVIEW COMPLETE — TWO CONTENT-WIRING GAPS FOUND**  
Owner: Chat 3  
Branch: `chat3/palace-independent-release-review-v33`

## Reviewed frozen stack

- Palace cumulative mechanics / UI / D45 Prince narrative:
  `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`
- final Palace prose / localization / presentation:
  `chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`
- D39 reward runtime:
  `chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`
- D39 executable implementation:
  `b28b19628c0374c405cd32afedb0f16c105e2403`
- cumulative selective assembly refresh:
  `chat5/palace-cumulative-assembly-refresh-v21@604481c4078929f106b21bb812a9d367eaa8e11c`

Product authorities cross-checked:

- D43 — Palace daily cadence/economy;
- D45 — Concordance / Threshold Archive / Custodian / Return Home narrative;
- D48 — minimum Palace media package + allowed fallbacks;
- D49 — macro-mystery reveal timing and unresolved lore.

Research-time production:

`main@37cda3b92c2228e0388c4ce6da47b36e1d52e543`

At review time D42 is closed and Secret Debt+D51 is still the active Chat 2 tranche. Palace must therefore still be assembled only after Secret Debt+D51 is merged and exact-main is re-queried.

---

# 1. Overall verdict

The accepted Palace stack is mechanically coherent.

No contradiction was found between:

- D23 entry;
- D43 duty/support cadence and economy;
- D45 Prince confrontation;
- D48 fallbacks;
- D49 reveal/lore limits;
- D39 reward lifecycle;
- Strong Meta capacities;
- explicit ending commit semantics;
- Secret Debt forced-Night precedence.

However, two D39 reward surfaces are not fully wired to live authored content in the frozen stack.

## Finding P1-A — Formal Introduction has runtime but no live authored consumer

D39 Product authority requires an authored ordinary-career professional relationship scene to opt in.

v20 implements:

- `strongMetaFormalIntroductionAvailable`;
- `useStrongMetaFormalIntroduction`;
- max 3 successful uses/run;
- max once/relationship ID;
- ordinary-career legality + one-shift requirement;
- exclusion of Palace / Activity / Secret Debt relationships.

But v20 explicitly changes no relationship/content pack and states that no existing production relationship pack was tagged.

The exact-head QA firewall confirms the executable D39 delta is only:

- `src/core/content.ts`;
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/core/strongMeta.ts`;
- `src/ui/app.ts`;
- two tests.

No authored pack is present in that delta.

v18/v19 predate this condition/effect and therefore cannot contain a live D39 Formal Introduction consumer.

v21 says future content may opt in explicitly, but it names no exact relationship scene/transition.

### Disposition

**Missing wiring, not a mechanics contradiction.**

Before release, an accepted content mapping must name at least one exact ordinary-professional relationship event + transition that consumes this reward.

Chat 2 must not guess or auto-tag all relationships.

If no accepted authored mapping exists at Palace assembly time, keep the runtime but treat Formal Introduction as release-incomplete and stop the Palace release gate.

## Finding P1-B — Source Method has ownership/query runtime but no live authored information consumer

v20 correctly implements:

- permanent knowledge ID:
  `palace.inner-truth.source-method`;
- future-run automatic inheritance;
- `strongMetaKnowledge` typed condition;
- slot-free behavior;
- no same-life activation.

But v20 adds no authored content pack using `strongMetaKnowledge`.

v18/v19 also cannot contain this consumer because they predate the D39 typed condition.

v21 says Source Method may expose authored information/provenance/cross-check content only in already-legal scenes, but supplies no exact authored scene.

### Disposition

**Missing content consumer, not a runtime contradiction.**

At least one accepted authored information-only scene/choice should consume Source Method before claiming the reward is player-visible in 1.0.

The scene must:

- already be legally reachable without Source Method;
- add information/provenance/cross-check presentation only;
- not change resources/stats/counters/stages/ending eligibility;
- not reveal D49-reserved macro truth.

If no accepted consumer exists, do not invent one inside Chat 2 assembly.

---

# 2. Clean areas

## D23 entry

Clean.

Exact authority remains:

```text
10/10 permanent ordinary Hard Work identities
+ 10/10 active ordinary packages in current creation
-> deterministic Day-1 invitation
-> explicit accept
-> palace.access-granted
```

No permanent Palace unlock is restored.

No D39 reward substitutes for D23.

## D43 cadence/economy

Clean.

Structural duty:

- max 1/calendar day;
- cost 1 Energy;
- no daytime termination;
- max 15;
- no paid duty 16+.

Support:

- max 1/calendar day;
- cost 1 Energy;
- pays 0;
- no duty progression.

Structural wage:

`35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`

Range 35..55.

No conflict with ordinary-career D46 wage rules.

## D45 Prince route

Clean.

Stable IDs:

- quest `palace.prince-confrontation`;
- action `palace.confront-prince`;
- fact `palace.prince-defeated`.

Gate:

- Palace access;
- Outcome Ready;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- Lust excluded.

No item/School/Activity/relationship/romance/Strong-Meta gate.

Retry remains free and deterministic.

Success does not commit Return Home.

## D48 presentation/media

Clean.

v19 maps exactly 19 Palace presentation slots and uses only existing:

- `assets/stage-town.svg`;
- `assets/stage-room.svg`.

D48 dedicated assets remain optional release upgrades:

- palace-custodian-audience;
- palace-threshold-archive;
- palace-return-home-threshold;
- palace-service-interior.

Missing dedicated assets are not a blocker because D48 explicitly authorizes neutral fallbacks.

No missing media path should be introduced unless the actual asset exists.

## D49 lore

Clean.

Required reveal timing remains:

- before Palace: foreshadow methods only;
- duty 12: authenticated anomaly evidence;
- duty 15: first canonical naming of Concordance / Threshold Archive / Threshold;
- Prince confrontation: independent return case;
- Return Home: real crossing;
- original displacement cause remains unresolved;
- successor world remains real.

v19 prose remains inside these boundaries.

---

# 3. v18 -> v19 mechanical integrity

Repository compare:

`67f948d... -> 6cf1916...`

shows v19 modifies authored definitions text, localization, Palace packs and presentation, but no runtime TypeScript.

v19's own mechanical-normalization audit reports:

**mechanicsEqual = true**

for:

- definitions;
- invitation pack;
- progression pack;
- outcome-finalize pack;
- Prince confrontation pack.

Therefore v19 does not conflict with frozen v18 mechanics.

---

# 4. D39 exact reward binding review

v19 intentionally carries empty Palace `metaRewards` because the canonical reward owner was not yet integrated there.

v20/v21 correctly close that seam.

Required final bindings:

## Service Life

`ending.palace.service-life`

-> `palace.service-life.steady-practice`

kind: `strongMeta`

## Court Power

`ending.palace.court-power`

-> `palace.court-power.formal-introduction`

kind: `strongMeta`

## Inner Truth

`ending.palace.inner-truth`

-> `palace.inner-truth.source-method`

kind: `knowledge`

## Return Home

`ending.palace.return-home`

-> `palace.true.cap-200`

kind: `strongMeta`

No generic `unlock` binding is valid.

No Palace ending may remain with `metaRewards: []` in final assembled production.

---

# 5. D39 lifecycle review

Clean.

Permanent grant boundary remains:

```text
eligible
-> explicit commit
-> committed resolution
-> completeEnding
-> permanent ownership
-> RunResult transaction proof
```

Not granted at:

- prep;
- route finalize;
- eligibility;
- mere commit.

Newly earned rewards do not mutate the current run snapshot.

Future activation:

- Steady Practice: later-life explicit Specialist selection;
- Formal Introduction: later-life explicit Specialist selection;
- Source Method: later-life automatic knowledge;
- cap-200: later-life explicit Specialist selection.

Specialist capacity remains 2.

No extra Palace slot exists.

---

# 6. Steady Practice wiring review

Clean and executable.

Unlike the other two non-True rewards, Steady Practice is directly wired into ordinary seasonal shift processing.

Accepted behavior:

- first two distinct ordinary careers reaching shift 8 bind;
- three qualifying D31 seasonal -1 protections each;
- max six prevented points/run;
- non-D31 losses unaffected;
- no Secret Debt/Activity/Palace effect.

v20 focused QA covers this seam.

No additional authored content mapping is required for basic usability.

---

# 7. Formal Introduction wiring review

Runtime correctness is good.

The missing part is content opt-in.

Do not "fix" this by:

- automatically enabling every ordinary relationship;
- treating all first relationship transitions as eligible;
- allowing Palace relationships;
- allowing Activity contacts;
- allowing Secret Debt relationships;
- skipping the one-current-life-shift requirement.

Required release resolution is an explicit content map.

At minimum the map should record for each approved use:

```text
event/choice ID
ordinary career ID
relationship ID
exact first professional transition ID
capability reads/writes
why it is professional and not romantic
```

Without this, the selectable Specialist has no guaranteed live use.

---

# 8. Source Method wiring review

Runtime correctness is good.

The missing part is authored information content.

Do not "fix" this by granting:

- extra stats;
- free School;
- Activity Field Time;
- Activity result security;
- ending progress;
- Palace access;
- macro-lore truth.

Required release resolution is at least one explicit information-only consumer.

Its QA should prove baseline scene reachability is unchanged and only the optional information branch differs.

---

# 9. Secret Debt coexistence review

Clean at authority level.

If Palace access was legitimately opened before later binding:

- access persists;
- duty/support progress persists;
- daytime Palace actions remain legal if final Energy permits.

Still mandatory:

- ordinary careers locked while bound;
- forced Night owns the Night;
- Palace never clears debt;
- Palace never changes repayment;
- Palace never suppresses D51 provenance.

Palace action costs are paid after StartDay Energy finalization.

No Palace/D39 global Energy floor is allowed.

---

# 10. Save/schema composition review

v18 historical Palace runtime was authored on an older schema lineage.

v21 correctly requires semantic composition onto current schema6.

Final schema must union:

- current Strong Meta;
- D39 runtime defaults;
- Secret Debt;
- NightFlow/D42;
- Palace progression;
- current Activity state when present;
- existing ending transaction structures.

Do not copy historical v18/v15 schema migration bodies wholesale.

No Palace-only schema fork is justified.

---

# 11. Shared-file risk review

Highest-risk files:

- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/ui/app.ts`;
- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`.

Required disposition:

**manual semantic/key-level composition only.**

Direct-add candidates are limited to Palace-owned unique files/packs after collision checks.

---

# 12. Assembly-order review

Current queue is correct.

At research time:

1. D42 — closed;
2. Secret Debt+D51 — active in Chat 2;
3. Palace — next;
4. Activity;
5. D46+D47+legacy;
6. final closure.

Palace final assembly must not start from the current research-time main if Secret Debt+D51 is not yet closed.

Required base:

**actual post-Secret-Debt+D51 main at assembly time.**

---

# 13. Required release corrections before Palace can be called complete

## Required

1. compose v18 mechanics on actual post-D51 base;
2. merge v19 text/presentation selectively;
3. compose v20 D39 runtime/schema/Strong Meta changes;
4. apply exact four ending reward bindings;
5. provide accepted live Formal Introduction consumer mapping;
6. provide accepted live Source Method information consumer mapping;
7. run focused post-assembly Palace QA;
8. only then full CI in Chat 2.

## Not required

- new Palace engine subsystem;
- new schema version solely for Palace;
- third Specialist slot;
- dedicated Palace art before release;
- new Prince identity;
- new macro mystery answer;
- combat implementation.

---

# 14. Review severity summary

| Area | Result |
| --- | --- |
| D23 entry | CLEAN |
| D43 cadence/economy | CLEAN |
| D45 Prince/Return Home | CLEAN |
| D48 presentation fallback | CLEAN |
| D49 lore | CLEAN |
| v18/v19 mechanical compatibility | CLEAN |
| D39 reward lifecycle | CLEAN |
| Steady Practice runtime/use | CLEAN |
| Formal Introduction runtime | CLEAN |
| Formal Introduction live authored consumer | **MISSING WIRING** |
| Source Method runtime/ownership | CLEAN |
| Source Method live authored consumer | **MISSING WIRING** |
| Secret Debt forced-Night coexistence | CLEAN by authority |
| schema6 composition plan | CLEAN if selective |
| wholesale-copy safety | MUST PRESERVE v21 RULES |

---

# 15. Independent disposition

There is no reason to reopen Palace mechanics, D39 numbers, D43 cadence, D45 narrative, D48 fallback policy, or D49 lore.

There are exactly two identified release-facing gaps in this independent review:

1. no exact live authored Formal Introduction consumer in the frozen stack;
2. no exact live authored Source Method consumer in the frozen stack.

These should be closed by explicit content mapping/authoring, not by changing the accepted reward runtime.

**v33 COMPLETE — CONTINUE TO v34**
