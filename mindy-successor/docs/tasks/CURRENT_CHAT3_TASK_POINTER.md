# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — SCHOOL BODY CONFIDENCE / VOLUNTARY LUST +2**
Owner: Chat 3
New branch: `chat3/school-body-confidence-lust-v1`
Base: fresh current main `6a6029df8e9c007227da0173eb499d59ba51648e`

Assassin producer head `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642` is frozen and already handed to Chat 2. Do not move that old branch.

## Assignment

Implement D20 as a narrow School-owned slice:

- existing `school.course.body_confidence` grants **Lust +2** per paid lesson;
- keep its current progression-stat gains and tuition/Energy rules intact;
- Lust remains separate from Sexuality;
- save/reload must not duplicate the effect;
- night study must not accidentally inherit the Lust gain unless Product separately authorizes it;
- update current School tests/fixtures/copy only where needed for the new authority;
- do not modify Secret Debt runtime or any profession runtime.

Own only the School files needed for this slice. Avoid `engine.ts` / Secret Debt files unless absolutely required; escalate if the current School API cannot express the effect cleanly.

No producer full CI. Run focused/static checks available to you, freeze exact SHA, report `READY_FOR_CHAT2`, and stop pushing.
