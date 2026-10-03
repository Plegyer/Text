# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — NEW START+ HARD WORK UI CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / Integration + Assembly + Technical QA

Shared D21-D24 foundation:
- PR #264 merged;
- merge SHA: `de6f95c89cdb43fb853bc569745e822bb1f2636b`;
- branch full CI #1125: SUCCESS;
- exact-main CI #1126: SUCCESS.

Frozen producer to integrate:
`837156277f7329f0187b04442acb8d5258a2e189`

Producer dependency base:
`c085eda62dd39f71d3a4c75a6c31f4c72527039a`

Current assembly branch:
`chat2/assembly-hard-work-new-start-ui-20261003-v1`

Read first:
`mindy-successor/docs/tasks/LEADER_NEXT_INTEGRATION_RECON_2026-10-03.md`

## Reconstruction rule

Do not cherry-pick only the final producer commit. The frozen head is an **8-commit delta** from its dependency base.

Whole accepted producer delta:
- add `content/hard-work-new-start-presentation-v2.fixture.json`;
- modify `src/ui/app.ts`;
- add `src/ui/hardWorkNewStart.ts`;
- modify `src/ui/style.css`;
- add `tests/hard-work-newstart-presentation-v2.test.ts`;
- add `tests/hard-work-newstart-ui-v2.test.ts`.

Leader drift audit proved on current main:
- `app.ts` byte-identical to frozen producer base;
- `style.css` byte-identical to producer base;
- `hardWorkMeta.ts`, `hardWorkPackageCatalog.ts`, `schema.ts` byte-identical to producer base;
- the four added files do not exist on current main.

Therefore reconstruct the full frozen UI delta onto fresh current main; do not modify shared runtime semantics.

## Locked behavior

Preserve:
- only earned ordinary Hard Work packages shown;
- Secret Debt/non-ordinary IDs never appear as ordinary package cards;
- any earned subset selectable: none / some / all;
- no package slot limit;
- early profession access is permanent ownership and independent of package activation;
- package effects come only from centralized package catalog;
- Prostitute package includes its locked Lust component;
- Palace help = permanent ordinary 10/10 + current-life active 10/10;
- no permanent `meta.unlocks['palace']`;
- cap-200 wording = maximum becomes 200; current values do not multiply.

Do **not** add D27/D28 Keystone/Specialist UI in this assembly. That is a separate future strong-Meta surface.

## QA gate

Before any full CI:
1. typecheck;
2. build/validate;
3. frozen New Start+ presentation tests;
4. frozen New Start+ UI tests;
5. D21-D24 focused tests;
6. creation/schema-v5 migration tests;
7. Palace shared predicate smoke;
8. current UI smoke;
9. School D20 / seasonal / Assassin / Prostitute preservation.

Mine all focused failures first.

Only after focused green:
- open/update current-main assembly PR;
- consume Chat 2's one full-CI slot;
- if full CI green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Do not merge main.

Queued after this merge + exact-main green:
1. Palace D23 consumer frozen head `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`;
2. D31 seasonal target producer `79ff36c66947a1f1273ab0bde7a3c7f1b797a2a7`, unless Leader reorders.
