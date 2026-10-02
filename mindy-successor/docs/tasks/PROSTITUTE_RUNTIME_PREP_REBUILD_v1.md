# Voluntary Prostitute Runtime Prep v18 — C1D-204 Rebuild / Collision Ledger

Status: **SAFE PREP COMPLETE / NOT FROZEN / NOT QA-READY**

Activation checkpoint: `260e44daad22a6ab8eb879ee24f13b9ec2abf19b`  
Runtime/test prep head before this ledger: `b334d365d0bb9e551ecdf2a88b566b1619b6f13f`  
Observed current `main` during C1D-204: `25a29ed68408a2bb7b85de9997005b2a14c91469`

## Exact prep delta before ledger

Compare activation -> runtime/test prep head:
- 3 commits ahead / 0 behind;
- 12 changed files;
- additive: runtime contract, 6 Prostitute packs, 3 Prostitute tests;
- shared prototype edits: `content/definitions.json`, `src/core/schema.ts`.

This ledger is the thirteenth prep file.

## Collision inventory

Against observed current `main@25a29ed...` since activation:
- direct changed-file intersection: **none**.

Against known future integration layers:
- accepted Artist runtime #234 collides on:
  - `content/definitions.json`
  - `src/core/schema.ts`
- held Assassin runtime prep #242 collides on:
  - `content/definitions.json`
  - `src/core/schema.ts`
- Prostitute authored prep #243: no current changed-file intersection;
- Prostitute presentation prep #240: no current changed-file intersection;
- Prostitute School prep #239: no current changed-file intersection.

Therefore this prep branch must **not** be merged wholesale as a final production candidate.

## Exact future rebuild rule

When Lead publishes the exact future shipped baseline after Artist/Assassin sequencing:

1. re-query exact `main` and rebuild the final Prostitute candidate from that commit;
2. copy additive Prostitute-only contract/packs/tests only after checking for newly shipped Prostitute runtime IDs;
3. replay `content/definitions.json` semantically:
   - preserve all then-shipped Artist/Assassin/other career state;
   - preserve shipped `prostitute.shift` and `ending.prostitute.hard-work` byte/semantic invariants;
   - replace only the minimal pre-existing Prostitute baseline machine if still authorized;
   - add only the provisional `prostitute.client-flow`, `prostitute.recurring-client`, four narrow item definitions, and voluntary Night choice after collision review;
4. replay `src/core/schema.ts` by appending only the four authorized Prostitute item IDs to the then-current item enum; never replace the enum wholesale;
5. re-query Artist/Geisha production facts after Artist integration. The activation baseline exposes only `artist-geisha:novice`, so this prep correctly binds **no Artist cross-system fact**. Any future Artist seam must use an exact shipped post-integration fact and remain read-only;
6. re-audit Satyr Maid / Tavern / Guard / Merchant facts before retaining their read-only adapters;
7. keep adult-content routing authority-null unless a later runtime authority explicitly publishes the exact Lust threshold/router, consent-state semantics, explicit presentation gating and consumer IDs;
8. keep School producer thresholds/public facts null unless separate School authority exists;
9. re-run clean natural acceptance: Year-3 fallback, real shifts, deterministic client-flow pending reload, boundary/refusal path, recurring-client refusal safety, voluntary Night continuation, four seasonal contexts, 50 shifts -> Hard Work, no forced late-route commitment;
10. run the full required exact-head workflow. Only one **executed full SUCCESS** may support a later production freeze.

## Prep mechanics and boundaries

Implemented as safe prep:
- New Independent -> Known Professional -> Established;
- distinct Veteran / Independent House / Elite Clientele / Network Protection late readiness families;
- deterministic client lifecycle:
  `intake -> terms -> boundary/refusal -> work/result -> payment/admin -> close`;
- boundary/refusal is local to one client flow and does not create a universal persisted consent state;
- recurring-client relationship explicitly separates professional-only / friendship / romance and conflict resolution; recurring does not imply romance;
- optional `prostitute.night.client-followup` uses existing VoluntaryNightChoice with zero next-day Energy delta;
- no Prostitute pack uses forced `nightPolicy`;
- four narrow Prostitute-local capabilities: formal presence, private-room access, client token, evidence handling;
- exact shipped Satyr Maid / Tavern / Guard / Merchant facts are read-only inputs and write only Prostitute-local state;
- School remains capability-only with no producer threshold/public fact or live consumer gate.

Still open/null:
- exact Lust threshold/router;
- persisted consent-state mechanics;
- explicit presentation gating;
- workplace model;
- client-safety mechanics;
- exact income retune;
- legal context;
- exact relationship scope;
- new public complex ending IDs/rewards;
- Palace access.

Explicitly not introduced:
- Secret Debt owner/lock state;
- forced-night inheritance;
- automatic debt from ordinary Prostitute work;
- extra client-flow payment on top of shipped wage;
- universal reputation/status;
- generic patron/protection subsystem;
- Palace unlock/bypass;
- automatic romance;
- confidence/presentation treated as consent.

## Prep validation evidence

Static typed authority audit on `7bcab27de4b028b45fa2eea421da208f75971f80`:
- 6 Prostitute packs;
- 33 Prostitute events;
- 8 career stages / 7 transitions;
- 7 client-flow quest stages / 6 transitions;
- 6 recurring-client stages / 9 transitions;
- 4 narrow Prostitute item definitions;
- 1 optional voluntary Night choice;
- no typed capability/read/write/reaction mismatch found;
- no Prostitute pack `nightPolicy`, Lust threshold, School counter, debt write, housing write, money-resource write, or Energy write.

Required workflow on runtime/test prep head:
- `mindy-successor check` #1067 / id `36993825580`;
- result: **FAILURE before runner execution**;
- job `110795868216`;
- `steps=null`;
- validator/build/tests did not execute.

This is infrastructure evidence only, not a code verdict.

**No production freeze is claimed by this document.**
