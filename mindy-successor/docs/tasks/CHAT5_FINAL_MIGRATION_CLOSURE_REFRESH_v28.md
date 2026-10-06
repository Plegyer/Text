# Chat 5 — Final Migration Closure Refresh v28

Status: **REFRESH COMPLETE — READY FOR FINAL CLOSURE ASSEMBLY**  
Owner: Chat 5  
Branch: `chat5/final-migration-release-review-v28`

Scope: research / review only.

No production runtime changes were made.  
No full CI was run.

## Purpose

Refresh the accepted final save/migration closure after the later 1.0 work that did not exist when Chat 4 v21 was written.

Primary prior closure:

`chat4/final-save-migration-closure-preflight-v21@1601be7b224f7b6687c4146c53d37499efb6a3f1`

Later accepted/frozen inputs reviewed:

- D42 merged and exact-main green;
- Secret Debt v12 + D51 final packet:
  `chat4/secret-debt-d51-final-assembly-packet-v26@98deaeb43ccc16c55151a2783e4997c7501aa3a7`
- Palace cumulative + D39:
  - Palace mechanics/prose v18/v19;
  - D39 producer:
    `chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`
  - cumulative refresh:
    `chat5/palace-cumulative-assembly-refresh-v21@604481c4078929f106b21bb812a9d367eaa8e11c`
- Activity cumulative + Camp + D38:
  `chat3/activity-final-assembly-packet-v28@742661162991108d22138eec495657b0dcdece0f`
- D46/D47 + lumber-stay retirement:
  `chat3/d46-d47-legacy-final-assembly-packet-v29@77259effc9cd626fefca1813d6e76f3ec5a9d299`
- final localization/presentation packet:
  `chat6/final-localization-assembly-packet-v32@6613e597379191e7eee15116ed27d1a15f895d5d`
- release localization audits v33-v35:
  `chat6/release-localization-bundle-v33@2ae39520ba95b4f12a7ebd13b06ae04d891db3a3`
- accepted Chat 5 D38/D39 collision audit:
  `chat5/cross-system-independent-review-bundle-v25@46389257b32b70a5831e21746a13f7b95c743c34`

---

# 1. Executive verdict

The old v21 23-case matrix remains valid as the **base migration matrix**.

No previously covered case should be removed.

However, v21 predates the final persisted/runtime implementation of:

- D38 Activity Strong Meta runtime;
- D39 Palace Strong Meta runtime;
- D39 Source Method automatic knowledge;
- combined D38 + D39 registry coexistence;
- the fact that both standalone D38 and D39 producers independently used the label `strong-meta-v4` for different registry contents;
- Field Archive carried-result durability;
- final D38 authored-tag mapping;
- retired Tavern localization cleanup after D41 migration compatibility was already established.

Therefore the statement in v21:

> no known missing save-state subsystem remains

is no longer sufficient as the final release claim.

The later producers do have persistence strategies, but the final closure suite must now prove their **combined migration behavior**.

---

# 2. Cases from v21 that remain authoritative

Keep all 23 v21 cases.

In particular, do not weaken:

- schema ladder / parse-twice idempotence;
- old ended RunResult compatibility;
- protected Strong Meta profile merge;
- D40 route repair;
- D41 legacy Tavern canonicalization;
- lumber-stay / vitality retirement;
- NightFlow atomic phases;
- neutral pre-Secret-Debt default;
- Secret Debt trap / forced Night / D51 provenance;
- Secret Debt hidden-work and ending transaction idempotence;
- Palace neutral ledger/defaulting;
- ambiguous Palace complete-without-ledger rejection;
- Prince phase persistence / explicit Return Home;
- Activity entry / route / checkpoint / RNG persistence;
- old Activity Field Time/mini-game migration;
- Camp neutral migration / partial-state rejection;
- Camp exactly-once boundary;
- Camp vs forced Secret Debt Night;
- D38 ending transaction exactly once;
- D46 stored-Lust preservation;
- D47 package snapshot exactly once;
- save-neutral localization/presentation layers.

Those 23 cases are still necessary.

---

# 3. New migration case M24 — D38 run-local Strong Meta defaults

v21 knew D38 ending identities but predates the final v26 run-local D38 implementation.

Final schema6 must support an old save missing:

`run.strongMetaRuntime.activityD38`

with deterministic default:

```text
surveyorsAtlasUsedRegionIds = []
fieldArchiveSecured = []
contactNetworkUsedRegionIds = []
```

Required:

- no D38 ownership inferred;
- no use inferred;
- current Strong Meta snapshot unchanged;
- no preference rewritten.

Reject ghost state when a D38 runtime collection is non-empty but the matching Specialist is absent from the immutable run snapshot.

---

# 4. New migration case M25 — D39 run-local Strong Meta defaults

v21 predates final D39 runtime.

Old schema6 save missing D39 runtime fields must default to:

```text
steadyPracticeBoundCareerIds = []
steadyPracticeProtectionsUsedByCareer = {}
formalIntroductionUsedRelationshipIds = []
```

Required:

- no D39 ownership inferred;
- no bound career inferred from shift counts;
- no protection-use inferred from seasonal history;
- no Formal Introduction use inferred from relationship stage;
- current run snapshot unchanged.

Reject non-empty D39 runtime if the matching Specialist is absent from the immutable snapshot.

---

# 5. New migration case M26 — Source Method permanent knowledge

D39 Inner Truth adds a new permanent knowledge path:

`palace.inner-truth.source-method`

This is not a Specialist or Keystone.

Migration / profile rules:

- permanent carrier:
  `meta.strongMeta.knowledge.inheritedKnowledgeIds`;
- current-life carrier:
  `run.strongMetaSnapshot.automaticKnowledgeIds`;
- no preferred-selection entry;
- no slot consumption.

Required reload checks:

1. old save missing Source Method remains without it;
2. completed Inner Truth transaction grants it once;
3. same-life snapshot does not gain it;
4. next life snapshot gains it automatically;
5. profile import unions/dedupes knowledge;
6. imported knowledge does not rewrite current run snapshot;
7. repeated completion/load does not duplicate the knowledge ID.

---

# 6. New migration case M27 — standalone v4 snapshot compatibility after D38+D39 union

This is the largest new cross-version case.

Both frozen producers independently forked `strong-meta-v3` and labeled their standalone registry:

`strong-meta-v4`

But:

- D38 standalone v4 = 23 rewards / 20 Specialists / 3 Keystones;
- D39 standalone v4 = 22 rewards / 19 Specialists / 3 Keystones.

Combined future registry = 25 rewards / 22 Specialists / 3 Keystones.

The final combined registry must therefore use a distinct later registry version on the actual assembly base.

If no other registry change intervenes, natural sequential composition is:

`strong-meta-v5`

Do not hard-code v5 if the real base has already advanced for another accepted reason.

## Required compatibility proof

A valid active run snapshot created under either standalone v4 source must load after the combined registry exists.

The loader must preserve the old snapshot's:

- `registryVersion`;
- selected IDs;
- resolved effect objects;
- Specialist capacity-at-start = 2;
- automatic knowledge IDs.

Do not rewrite an old active snapshot to the newest registry merely because the source registry has advanced.

New lives resolve against the combined registry.

---

# 7. New migration case M28 — mixed D38 + D39 selected snapshot

Final release must prove one immutable run snapshot can contain one D38 Specialist and one D39 Specialist at the same time.

Representative pairs:

- Surveyor's Atlas + Steady Practice;
- Field Archive + Formal Introduction.

Required:

- exactly two Specialists active;
- no third Specialist accepted;
- both resolved effects persist across save/reload;
- both runtime families persist independently;
- one family cannot erase/default the other during parse.

This case did not exist in v21.

---

# 8. New migration case M29 — combined profile merge across ownership + knowledge

Protected profile merge now has three distinct permanent collections that matter together:

- Strong Meta reward ownership;
- Source Method inherited knowledge;
- current profile preferred selection.

Representative case:

current profile:
- owns Field Archive + Formal Introduction;
- prefers Field Archive + Formal Introduction;
- has no Source Method.

imported profile:
- owns Atlas + Steady Practice;
- has Source Method;
- prefers Atlas + Steady Practice.

Required merged profile:

- owns all four rewards;
- contains Source Method once;
- preserves **current** preferred selection;
- does not auto-select imported rewards;
- does not merge any run-local D38 or D39 usage.

Current active run snapshot/runtime remain unchanged.

---

# 9. New migration case M30 — Field Archive source/derived durability

The final Activity review found a migration/reload-adjacent durability risk not represented in v21.

Secure-eligible source results include:

- `activity.anomalous-reach.result.sample-secured`;
- `activity.restricted-sites.result.evidence-secured`.

Those facts can trigger derived:

`activity.*.result.research-grade`

before final Activity outcome.

If an unsecured source result is later lost on escape/failure, a derived durable research-grade fact must not remain solely because the temporary source fact fired a reaction earlier.

## Required final behavior

At a save/reload boundary before finalization:

- carried source result persists as carried state;
- Archive-secured state persists separately;
- no duplicate result or reaction on reload.

On success:

- normal durable projection occurs once.

On escape/failure without Archive secure:

- source secure-eligible result is not durable;
- derived durability that depends only on that lost source is also absent.

With Archive secure:

- source survives;
- legal downstream projection may survive.

Do not solve this by tagging research-grade itself as Archive-eligible.

---

# 10. New migration case M31 — Contact Network normal-route vs lateral use

D38 Contact Network runtime is only consumed by **lateral** use.

The existing tagged contact option remains normally available on its authored route without the Specialist.

Required reload cases:

1. normal on-route use:
   - original option effects persist;
   - `contactNetworkUsedRegionIds` remains unchanged;
2. lateral use:
   - exact original option effects persist;
   - regional Specialist charge is recorded once after successful commit;
3. reload before successful commit:
   - no phantom charge;
4. reload after commit:
   - no second use.

This distinction is important because storing only "contact option happened" is insufficient to reconstruct whether the Specialist charge was consumed.

---

# 11. New migration case M32 — Atlas zero-cost commit boundary

Surveyor's Atlas changes effective Field Time cost from authored 1 to 0 once/region/run.

Required exactly-once boundary:

- option eligibility is checked first;
- free effective cost is calculated;
- normal option commit succeeds;
- only then is region recorded used.

Reload before commit:
- Atlas use remains available.

Reload after successful commit:
- regional use is recorded;
- repeating the same tagged survey costs normal 1 FT.

No Activity entry Energy change.

Camp Field Time refresh does not clear the Atlas used-region list.

---

# 12. New migration case M33 — Steady Practice bind/protection ordering

Steady Practice binds the first two ordinary careers when they reach exactly 8 completed shifts.

The shift reaching 8 may also carry a qualifying D31 seasonal -1 effect.

Required ordering:

1. commit the ordinary shift;
2. observe completed-shift count reaches 8;
3. bind career;
4. process that shift's D31 seasonal loss;
5. that loss may consume protection #1.

Save/reload checkpoints needed:

- immediately before shift 8;
- after bind but before seasonal effect commit if runtime exposes such an intermediate boundary;
- after first protection use;
- after third protection;
- fourth qualifying loss applies normally.

Reload must not bind the same career twice or refund protection usage.

---

# 13. New migration case M34 — Formal Introduction transition/use atomicity

Formal Introduction charge is consumed only after the authored relationship transition succeeds.

Required save/reload behavior:

- before transition: no use consumed;
- failed/unavailable transition: no use consumed;
- after successful transition: exact relationship ID recorded once;
- reload cannot apply transition or use twice;
- same relationship remains unavailable;
- max three distinct successful uses/run.

Do not reconstruct use from relationship stage alone.

---

# 14. New migration case M35 — Palace non-True ending reward transactions

v21 covered Palace Return Home transaction semantics but predates final D39 non-True rewards.

Final closure must explicitly test all three:

- Service Life -> Steady Practice;
- Court Power -> Formal Introduction;
- Inner Truth -> Source Method.

For each:

- eligibility grants nothing;
- commit grants nothing;
- completion grants exact permanent reward/knowledge once;
- RunResult records exact applied MetaReward ID;
- repeat completion/reload is idempotent;
- earning-life snapshot unchanged;
- activation occurs only in a later run.

---

# 15. New migration case M36 — retired Tavern localization compatibility stays save-compatible

Final localization cleanup removes retired presentation-only Tavern rows, but preserves migration compatibility rows and D41 mapping.

Required final compatibility surface:

- historical `tavern-stay` -> `ending.tavern.innkeeper`;
- historical `tavern-guild` -> `ending.tavern.sanctuary`;
- historical `tavern-court` -> `ending.tavern.information-broker`.

Compatibility localization rows must remain.

This does not require a Save schema field or schema bump.

It is a release validation case: loading a historical D41 save must still canonicalize mechanically while its compatibility-facing localized identity remains resolvable.

---

# 16. Save-neutral late content layers

The following remain mechanically save-neutral and should not introduce migrations:

- Palace v19 prose/media;
- final localization packet v32;
- global presentation v23;
- retired Tavern presentation-localization cleanup;
- release localization audit corrections that only change copy.

The accepted v34 audit adds one important assembly dependency:

the localized ended-screen epilogue consumer from Activity v17 must survive selective assembly.

If that consumer is lost, save data may still parse correctly but loaded/completed endings render stale fallback/journal text.

Treat that as release/UI closure, not Save migration.

The v35 Activity Network copy contradiction is likewise copy-only.

It must not be "fixed" by changing ending eligibility or stored route state.

---

# 17. Final schema doctrine after refresh

Keep one global public save epoch.

The late D38/D39 fields are all compatible with schema6 through deterministic defaults.

No late accepted producer independently requires a global schema bump.

Strong Meta registry version is a **local registry identity**, not the global Save schema version.

Therefore:

- global `schemaVersion` may remain 6 if final assembly chooses that contract;
- D38/D39 runtime defaults must be deterministic;
- old Strong Meta snapshots retain their own registryVersion;
- new lives use the current combined registry version.

Forbidden:

- silently changing the meaning of the same persisted field;
- replacing schema6 with a historical producer schema;
- reconstructing current-run selection from latest permanent preferences.

---

# 18. Updated closure count

The old matrix remains 23 base cases.

This refresh adds 13 explicit late-work cases:

- M24 D38 runtime defaults;
- M25 D39 runtime defaults;
- M26 Source Method knowledge;
- M27 standalone-v4 snapshot compatibility;
- M28 mixed D38+D39 snapshot;
- M29 combined profile merge;
- M30 Field Archive source/derived durability;
- M31 Contact normal-route vs lateral charge;
- M32 Atlas commit boundary;
- M33 Steady Practice ordering;
- M34 Formal Introduction atomicity;
- M35 three Palace non-True ending reward transactions;
- M36 retired Tavern localization/migration compatibility.

Final detailed release matrix should therefore cover **36 top-level semantic cases** unless Chat 2 combines equivalent cases without dropping assertions.

The canonical combined matrix is provided separately in:

`CHAT5_FINAL_COMBINED_SAVE_MATRIX_v29.md`

---

# 19. Stop conditions

Stop final closure if any of these occurs:

- D38 or D39 missing runtime fields cause legitimate old schema6 saves to reject instead of defaulting empty;
- defaults fabricate ownership/use;
- D38 or D39 ghost runtime is accepted without matching snapshot reward;
- combined Strong Meta registry overwrites an old active snapshot;
- standalone v4 snapshot cannot load after the combined registry version advances;
- Specialist capacity changes from 2;
- Source Method appears in Specialist/Keystone preference;
- profile merge overwrites current preference;
- run-local D38/D39 usage is profile-merged;
- Field Archive failure leaves unsupported derived research-grade durability;
- Contact Network normal-route use consumes a lateral charge;
- Atlas use is consumed before successful action commit;
- Steady Practice reload refunds or duplicates protection;
- Formal Introduction consumes a use on failed transition;
- D39 reward applies before `completeEnding`;
- D39 knowledge/reward duplicates after replay;
- retired Tavern cleanup breaks D41 historical ID canonicalization;
- localization/presentation copy changes are used to justify mechanical save migration.

---

# 20. Disposition

The v21 closure plan remains the correct base.

The missing late cases are now identified.

No new persistence subsystem is required.

The remaining work is to prove the **combined final schema/catalog** across the expanded 36-case matrix, with special attention to:

- D38 + D39 coexistence;
- old Strong Meta snapshots;
- automatic Source Method knowledge;
- carried-result durability;
- profile merge;
- exactly-once reward boundaries.

**READY_FOR_FINAL_CLOSURE ASSEMBLY**
