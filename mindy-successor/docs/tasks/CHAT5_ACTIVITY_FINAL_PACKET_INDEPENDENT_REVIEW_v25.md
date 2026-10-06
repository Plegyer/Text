# Chat 5 — Activity Final Packet Independent Review v25

Status: **REVIEW COMPLETE — READY WITH REQUIRED ASSEMBLY GUARDS**  
Owner: Chat 5  
Branch: `chat5/cross-system-independent-review-bundle-v25`

Scope: independent research/review only. No production runtime changes. No full CI.

## Sources reviewed

- final Activity assembly packet:
  `chat3/activity-final-assembly-packet-v28@742661162991108d22138eec495657b0dcdece0f`
- D38 reward producer:
  `chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`
- D38 authored tag mapping:
  `chat3/activity-d38-authored-tag-mapping-v27@3ab2800a7d586b5e37600c3ff11d1129ff823df0`
- cumulative Activity preflight:
  `chat3/activity-cumulative-assembly-preflight-v24@e21a6f923c6dae27efbbd0aa81e3dead59d00b38`
- D38 reward implementation preflight:
  `chat3/activity-d38-reward-implementation-preflight-v25@1024d8a657f0514f894042936e615364940f5e26`
- four-region D36 baseline:
  `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

## Overall verdict

The v28 packet is structurally sound and correctly treats v26 as a Strong Meta helper/registry producer rather than a wholesale Activity engine source.

The v27 mapping is also internally consistent with v26:

- Atlas: exactly four authored 1-FT survey/discovery options;
- Field Archive: exactly three existing secure-eligible results, with Forest intentionally absent;
- Contact Network: exactly three existing authored contact options, with Forest intentionally absent;
- no synthetic four-region symmetry is required;
- normal authored availability remains intact;
- Specialist use is only the additional behavior.

No Product contradiction was found.

However, two assembly guards are missing strongly enough that Chat 2 should treat them as required acceptance work, not optional polish.

---

## Finding A1 — Field Archive derived-fact durability must be transactional

Severity: **high assembly risk; not a Product conflict**

v28 correctly identifies that Field Archive needs a real carried-result durability seam because the v15 Activity engine immediately publishes extraction result facts.

The selected secure-eligible facts are:

- `activity.trade-corridor.result.sample-secured`
- `activity.anomalous-reach.result.sample-secured`
- `activity.restricted-sites.result.evidence-secured`

The packet says an unsecured secure-eligible carried result must be discarded on later escape/failure, while a Field Archive-secured result survives.

That rule is necessary but incomplete if implemented only as removal of the original result fact at finalization.

### Independent source check

The Anomalous and Restricted production packs contain live reactive events triggered by the secure-eligible result facts before Activity finalization.

Anomalous Reach reacts to:

`worldFactAdded(activity.anomalous-reach.result.sample-secured)`

and, when the other authored requirements pass, may write:

`activity.anomalous-reach.result.research-grade`

Restricted Sites similarly reacts to:

`worldFactAdded(activity.restricted-sites.result.evidence-secured)`

and may write:

`activity.restricted-sites.result.research-grade`

Those research-grade facts are intentionally **not** Field Archive secure-eligible results.

Therefore this sequence is possible unless assembly explicitly prevents it:

1. acquire secure-eligible result;
2. immediate worldFact reaction publishes research-grade derived fact;
3. later Activity escape/failure occurs;
4. unsecured source result is removed;
5. derived research-grade fact remains.

That leaves a durable derived progression fact whose source result was supposed to have been lost.

This would weaken the intended "secure or risk finds" distinction and could make a later Preservation path easier than the durability model intends.

### Required assembly treatment

Chat 2 must preserve one of these equivalent semantics:

**Preferred: deferred durable projection**
- register the secure-eligible extraction inside the active Activity carried-results envelope;
- do not publish downstream durable result/research-grade reactions until the result becomes durable at successful finalization or is explicitly Archive-secured.

**Acceptable: dependency-aware rollback**
- if current engine constraints require temporary result facts during the entry, then on escape/failure of an unsecured result remove both:
  - the source secure-eligible result fact;
  - any derived fact/event-state whose only legal support was that transient result.

The first approach is safer because it avoids reverse-migration of arbitrary reactions.

### Required focused test

Add an explicit regression covering both Anomalous and Restricted:

- acquire secure-eligible result;
- satisfy the mini-game side required for research-grade;
- do not Archive-secure it;
- fail/escape;
- source result absent after finalization;
- research-grade derived fact also absent;
- repeat with Archive-secured result;
- both durable source result and legal research-grade projection survive.

Do not solve this by tagging `result.research-grade` as Archive-eligible. v27 explicitly forbids that.

---

## Finding A2 — v27 tag mapping needs executable 4/3/3 assertions on the assembled catalog

Severity: **medium assembly risk**

The v27 branch is research-only.

Its worker-authored commit changes exactly:

`mindy-successor/docs/tasks/CHAT3_ACTIVITY_D38_AUTHORED_TAG_MAPPING_v27.md`

It does not itself modify production definitions or add an executable mapping test.

v28 correctly says Chat 2 must apply the tags during semantic assembly, but its listed focused bundle contains no dedicated v27 mapping-suite file.

A Strong Meta test can be fully green while one authored option/result was simply never tagged.

### Required assembled-catalog assertions

Chat 2 must add executable assertions, either to the v26 focused suite or a new mapping test, proving the final catalog contains exactly:

#### Atlas — 4

`activity-survey-discovery`

on:

- `forest.challenge.logging-navigation`
- `trade.challenge.market-read-flow`
- `anomaly.challenge.echo-survey`
- `restricted.challenge.service-survey`

and nowhere else.

Each must retain authored normal FT cost exactly 1.

#### Field Archive — 3

`activity-secure-eligible`

on results:

- `activity.trade-corridor.result.sample-secured`
- `activity.anomalous-reach.result.sample-secured`
- `activity.restricted-sites.result.evidence-secured`

Forest must have none.

No research-grade fact, marker, success fact, or generic inventory identity may carry this tag.

#### Contact Network — 3

`activity-network-introduction`

on:

- `trade.challenge.market-supplier-contact`
- `anomaly.challenge.rift-keeper-contact`
- `restricted.challenge.handler-handoff`

Forest must have none.

The three existing post-return Network marker events remain untagged.

### Baseline availability assertion

For all three Contact options:

- their original normal route availability works without Contact Network;
- normal on-route use consumes no Specialist charge;
- only lateral exposure consumes the per-region Contact Network use.

This is important because an implementation that simply gates the tagged option on Specialist ownership would be a regression while still appearing mechanically functional.

---

## Confirmed clean areas

### D38 ownership/lifecycle

v26 correctly uses canonical Strong Meta ownership:

- Pathfinder -> Surveyor's Atlas;
- Preservation -> Field Archive;
- Network -> Contact Network.

All are `kind:'strongMeta'`, not generic unlocks.

Focused v22 independent QA already proved the frozen v26 producer executable-green at 79/79 across its selected bundles.

### Slot model

All three are normal Specialists.

Global capacity remains:

`STRONG_META_SPECIALIST_CAPACITY = 2`

No Activity-only slot exists.

### Same-life firewall

Existing ending transaction semantics are correct:

`eligible -> explicit commit -> completeEnding -> permanent ownership`

The reward does not enter the earning life's immutable snapshot.

### Atlas mapping

The four selected options are valid survey/discovery candidates and carry authored FT cost 1.

No need to alter:

- Activity entry Energy = 2;
- baseline Field Time = 6;
- region unlocks;
- route unlocks;
- capability gates.

### Contact Network conditions

The three authored options retain meaningful non-route gates.

Independent inspection confirms:

- Trade keeps Supplier relationship accepted/resolved requirements;
- Anomalous keeps season + item/School prep + Keeper accepted/resolved requirements;
- Restricted keeps Handler accepted/resolved requirements.

The lateral rule can therefore preserve these conditions while bypassing only current route alignment.

### Camp / Secret Debt

v28 preserves the correct direction:

- D38 run-local use persists through Camp;
- Camp does not refresh Specialist charges;
- Secret Debt forced Night remains higher priority;
- D51 stays outside Activity reward logic.

### Palace firewall

No D38 reward grants D23 qualification, Palace access, duty progress, Prince readiness, or Return Home state.

---

## Strong Meta version note

v28 correctly contains a stop condition for a future assembly base whose Strong Meta registry has already advanced beyond v3.

This will matter because the queue places Palace before Activity, and Palace D39 has its own registry additions.

Chat 2 must not transplant v26's literal `strong-meta-v4` or v26 cardinality guards wholesale after Palace assembly.

The combined D38/D39 registry behavior is audited separately in:

`CHAT5_D38_D39_STRONG_META_COLLISION_AUDIT_v27.md`

---

## Required Task A handoff rules

Chat 2 may use v28 as the primary Activity packet provided it adds these two guards:

1. Field Archive durability must include dependent derived facts, especially Anomalous/Restricted research-grade reactions.
2. The exact v27 4/3/3 authored mapping must be asserted executable on the assembled catalog.

No Leader/Product decision is required for either correction because both preserve already accepted D38 semantics.

## Disposition

**READY_FOR_CHAT2_PREFLIGHT WITH REQUIRED ASSEMBLY GUARDS**

Do not report Activity cumulative ready if either guard is absent.
