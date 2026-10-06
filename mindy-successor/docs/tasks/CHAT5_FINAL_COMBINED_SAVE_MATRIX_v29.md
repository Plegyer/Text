# Chat 5 — Final Combined Save / Reload Matrix v29

Status: **MATRIX COMPLETE — READY FOR FINAL RELEASE IMPLEMENTATION**  
Owner: Chat 5  
Branch: `chat5/final-migration-release-review-v28`

Scope: research / release-acceptance matrix only.

No production runtime changes.  
No full CI.

## Purpose

Provide one authoritative save/reload matrix for the fully assembled 1.0 candidate after:

1. D42;
2. Secret Debt v12 + D51;
3. Palace + D39;
4. Activity + Camp + D38;
5. D46 + D47;
6. lumber-stay retirement;
7. localization/presentation closure.

This matrix incorporates:

- the original Chat 4 v21 23-case closure;
- all missing late-work cases identified by Chat 5 v28;
- mixed states that only exist after multiple queued tranches coexist.

Recommended final executable suite name:

`tests/final-save-migration-closure-v29.test.ts`

If Chat 2 keeps the older filename `final-save-migration-closure-v21.test.ts`, update the contents to this matrix rather than maintaining two overlapping final closure suites.

---

# 1. Global invariants for every row

Unless a row explicitly says otherwise:

- global Save schema remains the one final public schema;
- no reload rerolls RNG;
- no committed money/Energy/calendar/reward effect is applied twice;
- no current-run Strong Meta snapshot is rebuilt from latest permanent preferences;
- no missing late runtime field infers ownership/progress;
- stable IDs survive parse/serialize;
- parse -> serialize -> parse is semantically idempotent;
- profile merge affects permanent Meta only, never the active run snapshot/runtime;
- ending completion remains exactly once.

---

# 2. Final 36-case matrix

| # | Case | Fixture / checkpoint | Required result |
|---:|---|---|---|
| **1** | Schema ladder to one final shape | genuine schema 1/2/3/4/5 + pre-late schema6 fixtures | all supported saves reach one final schema; journal/pending/RNG survive; late fields default deterministically; parse twice is stable |
| **2** | Old ended run missing modern result proof | ended+committed historical save without current RunResult/transaction proof | synthesize deterministic compatibility proof exactly once; no reward replay |
| **3** | Base Strong Meta protected profile merge | old permanent Meta + newer current profile | ownership/knowledge union; current preferences win; current active snapshot/runtime unchanged |
| **4** | D40 selected-route repair | legacy route stages / generic readiness / overlapping selected facts | only exact historical route evidence repairs matching selection; generic readiness does not choose route |
| **5** | D41 retired Tavern canonicalization | completed / eligible-only / committed-unfinished old Tavern IDs | completed maps once to canonical D41 ID; eligible-only retired; unfinished commit reopens active; reward ownership dedupes |
| **6** | Lumber-stay / vitality normalization | historical completion, raw vitality, normalized perk, duplicate evidence | no live modern lumber-stay; one normalized legacy perk max; +1 daily Energy exactly once; historical result identity preserved |
| **7** | NightFlow phase reload | before lodging, after payment, forced pending event, voluntary choice, queued next-day modifier, post-calendar | no duplicate payment/event/calendar/modifier; selected choice/intercept survives |
| **8** | Pre-Secret-Debt neutral default | legitimate schema6 save missing Secret Debt | inserts exact neutral unseen state only; no inference from money/Lust/Street/debt-like facts |
| **9** | Secret Debt lender/trap timeline | before roll, pending encounter, post +2000, day9, trap day10 | lender roll not rerolled; +2000 once; bound activation exactly day+10; no retroactive prior-Night penalty |
| **10** | Bound forced Night + D51 queue | bound Night with normal/cheap/Street lodging and reload before start-day processing | forced Night retains priority; Street/bound provenance survives; queue clears once; calendar once |
| **11** | D51 provenance pair + unrelated penalty | base Energy 3/4 with Street+bound, each alone, both + unrelated -1 | compatibility floor applies only to locked pair; unrelated -1 may reduce to 1; no global floor 2 |
| **12** | Secret Debt hidden work / repayment / Takeover / endings | 49/50, 74/75 shifts, post-20000 repayment, post-Takeover, ending commit/complete | shift/wage/control/reward each exactly once; ordinary careers remain locked while bound |
| **13** | Old Palace access with no Rich6 ledger | legitimate typed access, missing `run.progression.palace` | preserve access, add neutral ledger, infer no duty count/stage |
| **14** | Ambiguous Palace progression-complete | progress-complete fact without exact duty ledger | documented exact migration or explicit incompatibility; never fabricate 15 duties |
| **15** | Prince confrontation phase persistence | 12x91 ready, phases 1-4, back-out, post-success | readiness != defeat; exact phase resumes; failure no defeat; success once; Return Home still explicit |
| **16** | Activity entry / route / option checkpoint | post 2-Energy entry, route selected, option resolved, pre-result | entry cost once; route/checkpoint/RNG/options persist; incompatible adapter/version rejects |
| **17** | Legacy Activity Field Time / mini-game defaults | pre-field-time envelope, missing miniGames/suspicion | conservative historical FT fallback only; miniGames empty; suspicion 0; no replay |
| **18** | Old Camp-neutral migration | both Camp fields absent vs partial/incompatible Camp fields | true old envelope gets exact neutral Camp v1; partial/incompatible rejects |
| **19** | Camp atomic two-night boundary | chosen, calendar_advanced, field_day_ready, night1/night2, attempted night3 | calendar and FT refresh once/night; no Energy refresh; two-night cap persists; third rejects |
| **20** | Bound Secret Debt + Activity/Camp mixed state | active Activity reaches Camp boundary while already bound, including Street case | forced before-lodging Debt Night preempts Camp before Camp calendar commit; Activity handoff terminates once; D51 consequence survives |
| **21** | D38 ending eligibility/commit/completion | Pathfinder/Preservation/Network eligible, committed, completed | eligibility non-terminal; reward only on completion; canonical Strong Meta ownership once; current snapshot unchanged |
| **22** | D46/D47 existing-life preservation | stored Lust 1/17, fresh post-D46 run, pre-D47 old life, selected D47 subset | stored old Lust unchanged; fresh =5; no retroactive package bonuses; selected packages apply atomically once |
| **23** | Save-neutral content/presentation overlays | same serialized save before/after final content overlays | mechanics state identical; only content reference validation differs where intended |
| **24** | Old schema6 missing D38 runtime | no `activityD38` field | default all three D38 collections empty; infer no use/ownership |
| **25** | Old schema6 missing D39 runtime | no Steady/Formal fields | default empty bound careers/protection map/relationship uses; infer no use/ownership |
| **26** | Source Method knowledge lifecycle | Inner Truth eligible -> committed -> completed -> same life -> next life | grant knowledge once only on completion; no same-life automatic knowledge; next life contains it; no slot |
| **27** | Old standalone Strong Meta v4 snapshot after combined registry | one active D38-v4 snapshot and one active D39-v4 snapshot | both parse under combined source; preserve old snapshot registryVersion/effects/selection; new lives use current combined registry |
| **28** | D38 + D39 selected together | Atlas + Steady Practice, and Archive + Formal Introduction | exactly two Specialists resolve; both runtime families persist; third Specialist rejected |
| **29** | Mixed profile merge: D38 + D39 + knowledge | current owns Archive+Formal, imported owns Atlas+Steady+Source Method | ownership union; knowledge union; current preference preserved; no imported auto-selection; no run-local state merge |
| **30** | Field Archive transient source + derived research-grade | Anomalous/Restricted source result acquired, save, then success/failure with and without secure | reload does not duplicate reaction; unsecure failure loses unsupported source + derived durability; secure path preserves legal durable projection |
| **31** | Contact Network normal route vs lateral | same tagged option used normally and laterally with save before/after commit | normal route consumes no Specialist use; lateral consumes one regional use only after success; no phantom/replayed charge |
| **32** | Atlas free-use commit boundary | eligible tagged 1-FT survey, save before action commit, save after commit | before commit still free/unused; after commit region recorded once; replay costs normal 1; Camp refresh does not reset use |
| **33** | Steady Practice bind + protection boundary | career shift7 -> shift8, seasonal -1 on shift8, uses #1-#3, fourth loss | shift8 binds first, then may consume protection #1; reload never double-binds/refunds; fourth loss applies |
| **34** | Formal Introduction transition atomicity | available authored transition, failed attempt, successful commit, reload, repeated same relationship | failed use consumes nothing; successful transition + use recorded once; reload cannot repeat; same relationship blocked |
| **35** | Palace non-True ending rewards exactly once | Service Life, Court Power, Inner Truth each at eligible/commit/complete/reload | exact D39 reward/knowledge only on complete; exact RunResult applied ID; same-life snapshot unchanged; later activation only |
| **36** | Retired Tavern localization compatibility after D41 migration | historical tavern-stay/guild/court save loaded under final localization cleanup | canonical ending mapping still resolves; compatibility rows remain bilingual; removed live presentation rows do not break historical load |

---

# 3. Required mixed-state fixtures

The final suite must include real fixtures that combine systems rather than testing every domain only in isolation.

## Mixed fixture A — D38 + D39 active together

Permanent profile owns:

- Surveyor's Atlas;
- Field Archive;
- Steady Practice;
- Formal Introduction.

Preferred selection:

- Atlas;
- Steady Practice.

Resolved run snapshot contains exactly those two.

Run-local state at save:

- Atlas has used `trade.corridor`;
- Steady Practice has bound `merchant`;
- one Merchant seasonal protection used.

Reload must preserve both states exactly.

Attempt to select a third Specialist for the same life must fail through normal capacity validation.

---

## Mixed fixture B — Archive + Formal Introduction

Selected:

- Field Archive;
- Formal Introduction.

Activity state:

- Restricted Sites entered;
- evidence carried;
- Archive secure already committed.

Ordinary-career state:

- Merchant legally unlocked;
- >=1 completed shift;
- one Formal Introduction relationship already consumed.

Reload must preserve:

- secured Activity result;
- Formal use list;
- neither state may be zeroed by defaulting the other subsystem.

---

## Mixed fixture C — Secret Debt bound + Activity/Camp

State:

- active multi-day Activity with Camp available;
- Secret Debt already bound;
- next boundary reaches before-lodging;
- Street provenance may also be active.

Required:

- forced Debt Night preempts Camp;
- no Camp calendar commit first;
- no city voluntary Night;
- bound/Street next-day tags persist;
- start-day processing happens once;
- D51 pair logic remains provenance-gated.

---

## Mixed fixture D — Palace progress + later Secret Debt binding

Start from a run that legitimately already has:

- `palace.access-granted`;
- non-zero Palace duty ledger;
- current Palace stage.

Then Secret Debt becomes bound later.

Required after save/reload:

- Palace access remains;
- Palace progress remains;
- daytime Palace actions remain available if Energy permits;
- ten ordinary careers remain bound-locked;
- forced Secret Debt Night remains absolute;
- debt state cannot erase/fabricate Palace duty history;
- Palace cannot repay or clear Debt.

This fixture is required because neutral pre-Palace migration tests do not prove preservation after **later** binding.

---

## Mixed fixture E — legacy lumber compatibility + modern Meta

Historical profile contains both:

- old `lumber-stay` / `vitality` evidence;
- modern Strong Meta ownership.

Required:

- one `legacy.lumber-stay.vitality` perk only;
- base Energy contribution +1 exactly once;
- Strong Meta ownership unchanged;
- no Specialist/Keystone slot consumed by legacy perk;
- no ordinary Hard Work package fabricated;
- duplicate old evidence does not stack.

If Work Rhythm or another legal Energy modifier is selected, legacy +1 remains additive under its own rule rather than being folded into that reward.

---

## Mixed fixture F — old Strong Meta snapshot under newer permanent Meta

Persist an active run created before later registry additions.

Then load with a current profile that owns additional D38/D39 rewards and Source Method.

Required:

- active snapshot remains exactly its saved selection/effects;
- imported/current permanent ownership may be richer;
- no newly owned Specialist appears active;
- no new Source Method automatic knowledge appears in the old active run unless it was already in that saved snapshot;
- next life resolves from current permanent Meta.

---

## Mixed fixture G — profile merge conflict

Current profile:

- owns Field Archive;
- owns Formal Introduction;
- prefers those two;
- has current run runtime use.

Imported profile:

- owns Atlas;
- owns Steady Practice;
- has Source Method;
- prefers Atlas + Steady.

Required:

- ownership union all four;
- Source Method union once;
- current preference remains Archive + Formal;
- current run runtime usage unchanged;
- imported run-local usage ignored.

---

## Mixed fixture H — ending transaction across reward kinds

Across successive lives complete:

1. Activity Pathfinder -> strongMeta Atlas;
2. Palace Inner Truth -> knowledge Source Method;
3. Palace Return Home -> strongMeta cap-200;
4. a repeated already-completed ending.

Required ledger:

- each first completion records its exact applied MetaReward ID;
- repeat completion produces no duplicate ownership/knowledge/transaction;
- generic unlocks do not duplicate any canonical reward.

---

# 4. Old Strong Meta snapshot matrix

The combined registry must explicitly test historical local-registry identity.

## D38 standalone v4 snapshot

Snapshot may contain:

- Atlas / Archive / Contact Network resolved effect.

After combined registry update:

- old `registryVersion='strong-meta-v4'` remains saved as-is;
- effect object parses under the combined resolved-reward union;
- no D39 reward is injected.

## D39 standalone v4 snapshot

Snapshot may contain:

- Steady Practice or Formal Introduction;
- Source Method in automaticKnowledgeIds.

After combined registry update:

- old v4 label remains as snapshot history;
- no D38 reward is injected;
- automatic knowledge preserved.

## New combined snapshot

Expected combined registry contents:

- 25 reward IDs;
- 22 Specialists;
- 3 Keystones;
- global Specialist capacity 2.

If no other registry revision intervenes, combined registry naturally advances beyond standalone v4.

Do not compare active snapshot registryVersion for equality to the current source constant.

---

# 5. Exactly-once checkpoints that require save-before/save-after pairs

The final suite must save on both sides of each boundary below.

## Money

- Secret Debt +2000 acceptance;
- lodging payment;
- ordinary shift wage;
- hidden-work wage;
- 20000 repayment;
- Reserve Match payment;
- Network Retainer payment.

## Energy

- Activity entry cost 2;
- D51 queued penalties;
- Work Rhythm start-day bonus;
- legacy lumber +1 daily Energy;
- unrelated post-D51 penalty.

## Calendar

- normal Night;
- forced Debt Night;
- Camp night 1;
- Camp night 2.

## Activity D38

- Atlas use commit;
- carried-result registration;
- Archive secure commit;
- Contact lateral-use commit.

## Palace D39

- Steady career bind;
- Steady protection consume;
- Formal transition/use;
- Source Method completion grant.

## Ending transactions

- ordinary canonical ending;
- Secret Debt ending;
- Activity ending;
- Palace non-True ending;
- Return Home;
- historical lumber compatibility proof.

---

# 6. Invalid-state rejection matrix

Final parser/runtime validation should reject rather than repair these states.

- partial Camp state with only version or state;
- unsupported Camp version;
- incompatible Activity adapter/definition version;
- D38 runtime use without matching snapshot reward;
- duplicate D38 region/result usage;
- D39 Steady state without reward;
- Steady protection map entry for unbound career;
- Formal use state without reward;
- >2 selected Specialists;
- Source Method in preferred Specialist/Keystone selection;
- ambiguous Palace progression-complete without accepted duty proof;
- duplicate/contradictory ending transaction identity;
- impossible partial Secret Debt state if typed state invariants fail.

Do not auto-heal invalid states by fabricating progress.

---

# 7. Content-reference compatibility checks

These are not schema migrations but belong in the final reload matrix because saves carry stable IDs that must still resolve.

Required after final localization/presentation closure:

- D41 historical Tavern IDs canonicalize to live D41 endings;
- retired lumber historical ID remains historical-only;
- pending D42 Night IDs still resolve;
- pending Secret Debt event IDs still resolve;
- pending Palace Prince quest/scene IDs still resolve;
- active Activity route/option IDs still resolve;
- three Activity ending IDs still resolve;
- four Palace ending IDs still resolve;
- compatibility localization rows for retired Tavern remain;
- removed retired presentation rows are not required for live mechanics.

The final loader should reject a truly missing mechanical stable ID, not silently substitute a nearby route.

---

# 8. Desktop persistence extension

The unit/integration matrix above is necessary but not sufficient for 1.0 release.

The existing Windows release checklist adds storage-level evidence.

For the final release candidate also verify:

- primary save survives installed-app relaunch;
- backup recovery works when primary is corrupted;
- both corrupt -> load stops safely without overwriting source corruption;
- rapid consecutive saves do not leave accepted partial JSON;
- installer update preserves compatible user save;
- one mixed-state fixture from this matrix survives installed-app close/reopen.

Recommended installed mixed-state fixture:

D38 + D39 selected together with one used runtime state in each family.

---

# 9. Acceptance rule

A final candidate is save-closure-ready only if:

1. all 36 semantic cases are represented;
2. all requested mixed fixtures A-H are covered either directly or by equivalent stronger fixture;
3. invalid states reject deterministically;
4. no reward/payment/calendar effect replays;
5. all stable content IDs required by saved state resolve;
6. desktop persistence smoke passes on the actual packaged candidate.

Do not accept "all isolated producer tests green" as a substitute for this combined matrix.

---

# 10. Disposition

This matrix supersedes the old **23-case count**, but not the semantics of its 23 original rows.

The final release closure target is:

**36 top-level semantic save/reload cases + mixed-state fixtures A-H + desktop persistence smoke.**

Key mixed-risk areas:

- D38 + D39 selected simultaneously;
- bound Secret Debt + Activity/Camp;
- Palace progress followed by later Debt binding;
- old Strong Meta snapshots under a newer combined registry;
- legacy lumber compatibility with modern Meta;
- protected profile merge;
- exactly-once rewards across strongMeta and knowledge kinds.

**READY_FOR_FINAL RELEASE SAVE/RELOAD IMPLEMENTATION**
