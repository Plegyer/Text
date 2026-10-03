# D41 Specialist integration seam — Chat 5 producer v11

Authority: `CHAT5_ORDINARY_COMPLEX_ENDINGS_TRANCHE_A_v10.md` at `95c0f06449e0a62241e5286c8a95050c82346956`.

Current-main base does not contain the frozen strong-Meta ownership/loadout runtime from `chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`. This producer therefore does **not** add a second registry, ownership array, loadout selector, snapshot, or per-run Specialist save state.

The executable integration contract is `src/core/advancedEndingsD41.ts`. `D41_SPECIALIST_BINDINGS` carries the exact nine Specialist reward IDs and their D41 caps/effects. D41 endings that award Specialists use `metaRewards: []` on this branch, so the legacy generic-unlock fallback cannot silently weaken them. Their `reward` field still carries the exact Specialist ID for presentation/contract inspection.

After strong-Meta assembly, Chat 2 must extend the **single** strong-Meta registry with those nine IDs as class `specialist`, wire each effect to the resolved New Start snapshot/loadout, and convert the corresponding ending rewards to the strong-Meta reward kind. For migrated or already-completed endings, call `d41PendingSpecialistRewardIds(meta.completedEndings)` and grant those IDs through the strong-Meta exactly-once ownership API. Do not create parallel ownership state.

Automatic D41 rewards already use the compatible Meta unlock mechanism: `satyr-maid.clear-terms`, `knowledge.undead-farm.anomaly-catalog`, `knowledge.tavern.broker-index`, `knowledge.hunter.warden-signs`, and `knowledge.hunter.legend-contracts`. `migrateD41MetaData` backfills these for compatible completed endings and retires `satyr-maid.house-credit`, `host`, `mediator`, and `court`.

Legacy Tavern completion migration is exact and idempotent: `tavern-stay -> ending.tavern.innkeeper`, `tavern-guild -> ending.tavern.sanctuary`, and `tavern-court -> ending.tavern.information-broker`. Old eligible/committed-but-uncompleted Tavern contracts are retired rather than upgraded into new eligibility. `tavern-court` never grants or implies Palace access; D23 remains solely the permanent ordinary 10/10 plus current-life active 10/10 gate.
