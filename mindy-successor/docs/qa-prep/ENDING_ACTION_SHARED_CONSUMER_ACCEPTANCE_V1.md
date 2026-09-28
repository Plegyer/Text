# Ending/action shared consumer acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_SATISFIED_BY_PR61

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Current Legacy consumer now renders localized ending title/description from stable ending ID while eligibility continues to use the unchanged ending condition objects and `availableEndings`.

Current ordinary result consumer priority:
1. recognized School course -> School-specific localized result;
2. event-choice outcomeRef -> event localized title/body;
3. current action -> `action.<actionId>.label`;
4. exactly-one-default-scene action -> `action.<actionId>.scene.default.text`;
5. stored fallback otherwise.

Locale must not modify:
- ending/action/scene IDs;
- eligibility;
- accepted ending;
- reward/metaReward identity;
- action effects/deltas;
- action count;
- presentationId/media;
- Journal refs;
- RNG;
- serialized gameplay Save.

Lumber Hard Work remains only:
`completed_shifts >= 50`
with meta reward:
`hardWork:lumber`.

School and event-choice ownership must keep priority over ordinary-action lookup.

Multi-scene career actions must not guess scene identity from prose or assume a default scene.

Ordinary action Journal rows remain a separate limitation because stable ordinary-action Journal refs are not shipped.

PR61 accepted head:
`a7b16eca18ccba37719fc84432c1fe1a9b275bf5`.

Exact run #121:
369/369 PASS, validator 17/46/35/9.

Merged main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Post-merge run #122:
369/369 PASS, same validator counts.

Direct renderer PASS:
- ordinary action result localizes RU↔EN without changing Save;
- ending cards localize RU↔EN without changing eligibility or Save.

Verdict:
`ACCEPTANCE_CONTRACT_SATISFIED_BY_PR61`.
