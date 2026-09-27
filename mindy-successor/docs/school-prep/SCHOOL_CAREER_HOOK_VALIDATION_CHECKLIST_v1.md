# School Career-Hook Validation Checklist v1

Status: reusable validation checklist for any future School-to-career authored hook.

Use this checklist after Product chooses a School provider/result and before marking a cross-career hook accepted.

## Ownership

- [ ] The private trigger/provider is owned by School.
- [ ] The downstream career does not read `lessons_completed`.
- [ ] The downstream career does not read `night_study_sessions`.
- [ ] The downstream career does not inspect School-private milestone/certificate/project state directly.
- [ ] The downstream career does not write School-private counters, stages, facts, certificates or choices.
- [ ] School does not directly mutate the career's private stage as a shortcut.

## Public boundary

- [ ] The cross-system result has one approved stable public identity.
- [ ] The result is explicitly declared in production content.
- [ ] The result is not a fixture-only ID.
- [ ] School commits the private result before publication.
- [ ] Publication occurs exactly once.
- [ ] Resolver sees the public result after authoritative School state commits.
- [ ] The career listener/condition consumes the public result only.
- [ ] Any listener ID and public result ID agree across production content and tests.

## Save / reload

- [ ] Reload before publication may still publish once later if eligibility remains valid.
- [ ] Reload after publication cannot duplicate the public result.
- [ ] Reload after publication cannot duplicate the public-result reaction.
- [ ] A pending downstream career scene survives reload deterministically.
- [ ] Resolving that downstream scene cannot re-publish the School result.
- [ ] Repeated eligibility checks after reload remain idempotent.

## Tuition / Energy / progress safety

- [ ] Career-hook evaluation does not charge School tuition.
- [ ] Career-hook evaluation does not spend paid School Energy.
- [ ] Downstream reaction does not recharge/re-spend School tuition or Energy.
- [ ] Paid lesson still increments only `lessons_completed`.
- [ ] Night study still increments only `night_study_sessions`.
- [ ] Career reaction increments neither School counter unless the player performs a new explicit School action.
- [ ] A reload/reaction cannot duplicate the original paid lesson stat package.
- [ ] A reload/reaction cannot duplicate Night-study +2 or next-day Energy -1.

## Hard Work independence

For Lumber and any shared Hard Work convention:

- [ ] School result is not added as a Hard Work prerequisite.
- [ ] School certificate is not added as a Hard Work prerequisite.
- [ ] Teacher/relationship state is not added as a Hard Work prerequisite.
- [ ] Lumber Hard Work remains `completed_shifts >= 50` only.
- [ ] School may open alternative Lumber content without altering Hard Work eligibility.

## Presentation identity

- [ ] Existing gameplay course ID is unchanged.
- [ ] Existing paid semantic presentation ID is unchanged.
- [ ] New milestone/result semantic presentation ID is explicitly declared.
- [ ] Presentation ID survives save/reload.
- [ ] Static/GIF/text fallback does not change the hook's mechanics.
- [ ] Missing media cannot cause a second publication or action replay.

## Career-owned follow-up

- [ ] After consuming the School public result, any career stage/counter/fact mutation is owned by that career.
- [ ] Career reaction uses an explicit event/transition/condition.
- [ ] Career result is deterministic from the same saved state.
- [ ] No hidden dependency on School-private implementation details remains.

## Content truthfulness

- [ ] Provider is approved by Product/authoring.
- [ ] Threshold/milestone type is approved.
- [ ] Exact threshold/value is approved where applicable.
- [ ] Teacher/certificate/project/exam content is not labeled shipped if still OPEN.
- [ ] QA accelerators are not used as proof of natural authored reachability.
- [ ] Direct worldFact injection is not used as proof that the School provider exists.

## Required regression evidence

For every career hook, add/extend tests for:
1. state immediately before School result;
2. authoritative School result transaction;
3. first public publication;
4. immediate career reaction;
5. reload before publication;
6. reload after publication;
7. reload with pending career scene;
8. downstream scene resolution;
9. no duplicate tuition/Energy/progress;
10. no private School counter leakage.

## Career-neutral rule

This checklist applies to:
- Lumber;
- Guard;
- Hunter;
- Merchant;
- Tavern;
- Farm;
- Artist/social careers;
- Palace;
- any future ordinary/hidden career.

A career with no authored School dependency must not receive one merely because this checklist exists.
