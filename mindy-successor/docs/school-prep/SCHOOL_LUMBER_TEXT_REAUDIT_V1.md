# Lumber School Text Re-Audit v1

Task: C5-38
Baseline: `main@8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`
Fixture: `content/school-lumber-text-reaudit-v1.fixture.json`

Current Lumber integration is materially deeper than the original School handoff baseline: career stages, Foreman relationship copy, endings, presentation accessibility text, and the Forest Activity return now have RU/EN localization on current main.

The School-facing architecture is still intentionally split.

## Management path

Existing School content remains sufficient:
- Literacy & Numbers;
- Mara Fen;
- prepared ledger/budget/handoff/milestone-neutral scenes.

Existing downstream transport remains:
- `lumber.school.management-ready`;
- `lumber-cross.school-management-return`.

Still open:
- School provider/milestone identity;
- threshold, if any;
- School publisher event/timing;
- whether the current transport key remains canonical.

A content-only localization gap remains in the current management-return event itself: its pack title/variant/choice text is still embedded English copy with no corresponding RU/EN root-localization entries. Chat 5 records the gap but does not edit production localization in this audit.

## Arcana / Forest path

Existing School content remains sufficient:
- Arcana;
- Ilyra Venn;
- prepared observation/hypothesis/field-record scenes.

Current Lumber/Forest production now localizes the post-Activity return event. That does not create a School result. `lumber.forest.truth-known` is still Activity-owned.

The remaining gap is not missing prose in the Arcana lessons; it is the absence of an approved direct School-to-Forest public result/consumer. Any reactive transfer copy must stay unattached until that consumer exists.

## No-course-gap result

No new curriculum or teacher identity is justified. Current gaps are:
1. one management-return localization surface;
2. unresolved management producer semantics;
3. unresolved Arcana direct-consumer semantics.

This re-audit changes no runtime, root localization, threshold, public fact, Forest route, Save state, or career mechanics.
