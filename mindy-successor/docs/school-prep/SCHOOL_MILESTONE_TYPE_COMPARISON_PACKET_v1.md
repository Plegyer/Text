# School Milestone Type Comparison Packet v1

Status: neutral comparison of authored School milestone forms already allowed by current project direction.

This packet compares implementation/content consequences. It does **not** select a winner for management/accounting or Arcana/Forest.

## Common invariant across all forms

Whichever form Product chooses:
- private eligibility remains School-owned;
- paid lesson mechanics remain unchanged;
- Night study remains separate from paid `lessons_completed`;
- any cross-system result publishes through a durable public boundary;
- publication is exactly once across reload;
- Lumber/Forest consumes public result only;
- no School condition becomes a Lumber Hard Work prerequisite.

## Form A — Lesson-count milestone

Shape:
- private provider: `lessons_completed >= N`;
- optional authored stat/other School conditions may accompany the count.

Content consequences:
- relatively light authoring;
- needs milestone title/copy/presentation;
- teacher participation optional.

Publication consequences:
- publication may occur in the authoritative School transaction that first crosses the threshold;
- requires an exactly-once publication proof.

Save/reload:
- save below threshold -> later crossing may publish once;
- save after threshold/publication -> no replay;
- repeated lessons after publication cannot emit again.

Management/accounting:
- valid shape if Product explicitly chooses it;
- exact track/provider and N remain OPEN.

Arcana/Forest:
- valid shape if Product explicitly chooses it;
- exact N and whether Night study contributes remain OPEN.

Downstream:
- management may feed the existing public-result Lumber listener;
- Arcana/Forest still needs an explicit Forest consumer/option if retained.

## Form B — Exam

Shape:
- explicit School-owned exam eligibility + pass/fail/completion result.

Content consequences:
- exam definition;
- eligibility copy;
- pass/fail result content;
- optional teacher/presenter scene;
- optional certificate linkage.

Publication consequences:
- cross-system result should publish from committed exam success, not from merely becoming exam-eligible.

Save/reload:
- in-progress/resolved exam state must be deterministic;
- exam cost, if authored, commits once;
- successful result/publication cannot replay.

Management/accounting:
- can make the public result depend on passing an authored management/accounting exam;
- exact exam identity and prerequisites remain OPEN.

Arcana/Forest:
- can make the public result depend on an Arcana exam;
- exact exam identity and prerequisites remain OPEN.

Downstream:
- consumers still receive only the durable public result.

## Form C — Project

Shape:
- explicit School-owned project with completion boundary.

Content consequences:
- project brief;
- entry conditions;
- completion conditions;
- authored project scene/result;
- optional teacher feedback.

Publication consequences:
- publish only after project completion commits.

Save/reload:
- project progress/completion must persist;
- no duplicated project reward/publication;
- any authored cost commits once.

Management/accounting:
- supports an applied bookkeeping/administration project if Product authors one;
- no such project is selected here.

Arcana/Forest:
- supports an Arcana/field interpretation project if Product authors one;
- no such project is selected here.

Downstream:
- management or Forest consumers still read only the published result.

## Form D — Certificate

Shape:
- School-owned certificate awarded after authored eligibility.

Content consequences:
- certificate canonical ID/name;
- award presentation;
- optional teacher/certifier;
- certificate effect, if any.

Publication consequences:
- the certificate itself may be the private provider while a durable public result is published separately;
- or Product may define the certificate as the explicit public-facing result if the data model supports that contract.

Save/reload:
- certificate award is exactly once;
- reload must not duplicate award or public publication.

Management/accounting:
- can expose a named management/accounting qualification;
- exact certificate and requirements remain OPEN.

Arcana/Forest:
- can expose a named Arcana qualification;
- exact certificate and requirements remain OPEN.

Downstream:
- ordinary careers must not read School-private certificate arrays directly unless Product explicitly promotes a typed public equivalent.

## Form E — Mixed authored gate

Shape:
- explicit conjunction of School-owned requirements, for example:
  - lesson count + stat;
  - project + exam;
  - milestone + certificate;
  - other approved combination.

Content consequences:
- highest authoring/QA burden;
- every component needs clear player communication;
- presentation should explain why the result became available.

Publication consequences:
- one durable result publishes only when the complete authoritative conjunction commits.

Save/reload:
- each private component persists independently;
- publication proof prevents duplicate cross-system result;
- partial progress cannot cause premature publication.

Management/accounting:
- valid if Product wants a richer professional qualification path;
- no combination is selected here.

Arcana/Forest:
- valid if Product wants School knowledge plus another authored condition;
- no combination is selected here.

Downstream:
- consumers still receive one public boundary instead of inspecting each private School component.

## Consequence matrix

| Form | Content load | Private state complexity | Publication point | Reload burden | Management consumer impact | Arcana/Forest consumer impact |
|---|---|---|---|---|---|---|
| lesson-count milestone | low-medium | low | threshold-crossing School transaction | low-medium | one public result | one public result + explicit Forest consumer |
| exam | medium-high | medium | committed exam success | medium-high | same listener boundary | same public boundary + Forest consumer |
| project | medium-high | medium | committed project completion | medium-high | same listener boundary | same public boundary + Forest consumer |
| certificate | medium | medium | committed award/publication | medium | same listener boundary | same public boundary + Forest consumer |
| mixed authored gate | high | high | completed conjunction | high | same listener boundary | same public boundary + Forest consumer |

## Management/accounting decision impact

Still OPEN:
- provider form;
- owning track;
- exact threshold/value;
- whether Night study contributes;
- public result identity/rule.

Existing downstream management listener remains a consumer, not a selector of the School form.

## Arcana/Forest decision impact

Still OPEN:
- provider form;
- exact threshold/value;
- whether Night study contributes;
- public result identity;
- direct Forest option/listener/unlock if retained.

Current Forest Activity/result behavior does not choose the School milestone form.

## Neutrality rule

The ordering A-E is descriptive only. It is not a ranking or recommendation.
