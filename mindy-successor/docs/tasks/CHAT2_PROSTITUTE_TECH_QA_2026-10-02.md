# Chat 2 — Prostitute Technical QA / Current-Main Assembly

Status: **STATIC TECHNICAL QA PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA
Repository: `Plegyer/Text`

## Exact authority

Producer PR #251:
- branch: `chat4/prostitute-complete-reset-v1`
- frozen producer head: `8f06e840adcb92a379bcff5179bae54b1c4062e5`
- producer base of final legacy run: `dba626448346ad54b33477e3d0649dfd4e87b9b7`
- producer head remains unchanged.

Assembly base:
- fresh current main: `4eaa6e7a75b41c896bddf000e5b9422d65027e47`

## Existing producer CI evidence

Workflow #1103 / run `37017857750`:
- exact producer head: `8f06e840adcb92a379bcff5179bae54b1c4062e5`
- self-hosted Windows/X64
- Full check: **SUCCESS**
- tests: **966 / 966 pass, 0 fail**

Per the CI-slot protocol, this producer run is not repeated.

## Current-main collision analysis

From producer base `dba626448346ad54b33477e3d0649dfd4e87b9b7` to current main `4eaa6e7a75b41c896bddf000e5b9422d65027e47`:
- drift files: 11
- overlap with candidate's 14 changed files: **0**
- current-main drift is workflow/coordination-only for this package.

PR #251 is not directly mergeable against current main, but the file-level analysis shows no semantic production collision. Therefore this assembly overlays the exact 14 producer blobs onto current main instead of rebasing or moving the frozen producer branch.

## Candidate technical QA

### Ordinary work authority preserved exactly

`prostitute.shift` is structurally identical to the producer base:
- cost remains 0 money / 1 Energy;
- unlock remains existing stat gate OR Year 3;
- wage remains the shipped wage formula;
- seasonal stat effects remain unchanged;
- the only action effect remains one `completed_shifts` increment.

### Hard Work / Meta preserved exactly

`ending.prostitute.hard-work` is structurally identical to the producer base:
- eligibility: `completed_shifts >= 50`;
- reward: `prostitute.hardwork.compat`;
- Meta reward: `hardWork:prostitute`;
- no new public Prostitute complex ending ID.

### Voluntary-career / Secret Debt firewall

Focused review of all six new Prostitute packs and definitions confirms:
- no `nightPolicy`;
- no forced-night interception;
- no `setHousing` or housing write capability;
- no money `modifyResource` effect;
- no Lust/debt router;
- no School counter/write or invented Prostitute School threshold;
- no Palace/meta unlock write;
- cross-system seams read shipped Satyr/Tavern/Guard/Merchant/housing context and write Prostitute-local state only;
- optional `prostitute.night.client-followup` has `nextDayEnergyDelta: 0` and no next-day stat effect;
- recurring-client conflict includes refusal-safe resolution and does not require romance.

### Shared-file preservation

`content/localization.json`:
- adds 177 Prostitute keys;
- modifies **0** pre-existing localization keys;
- adds no non-Prostitute key.

`content/presentation.json`:
- adds 34 Prostitute event slots;
- modifies **0** pre-existing presentation slots;
- adds no non-Prostitute slot.

`definitions.json`:
- expands only the Prostitute career;
- adds one Prostitute client-flow quest;
- adds one Prostitute recurring-client relationship;
- adds one voluntary Prostitute Night choice;
- adds four Prostitute item definitions;
- existing Artist career object is unchanged.

`src/core/schema.ts`:
- only extends the existing item ID enum with four Prostitute item IDs;
- no Save schema version/shape change, migration, RNG state change, NightFlow state change, or engine change.

### Executable producer evidence

Run #1103 explicitly passed focused tests for:
- voluntary Prostitute ownership firewall;
- School authority boundary;
- read-only cross-system seams;
- no Palace access/new complex ending;
- RU/EN live copy and static fallback;
- natural Year-3 path through four seasons and refusal-safe client flow;
- optional voluntary Night continuation;
- save/reload with no duplicate shift wage;
- exact shipped ordinary-work and Hard Work authority;
- shipped Artist and Secret Debt regressions.

## Assembly construction

This branch contains:
1. current main `4eaa6e7a75b41c896bddf000e5b9422d65027e47` as its parent;
2. the exact Git blobs for all 14 files changed by frozen producer head `8f06e840adcb92a379bcff5179bae54b1c4062e5`;
3. this QA evidence file only.

No producer file is hand-edited during assembly.

## Gate

Next step is exactly one automatic full CI run on the assembly PR, after CI slot #1105 is complete. If green, hand exact assembly SHA + CI evidence to Leader 1. Chat 2 must not merge main.
