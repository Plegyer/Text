# Presentation Authoring Decision Matrix v1

This document lists only unresolved **human/content decisions**. It does not reopen green presentation runtime mechanics and does not choose an art direction.

## Already green — not decision work

The following are already technical/runtime contracts, not open authoring decisions:

- one central presentation stage;
- semantic slash presentation IDs;
- save/reload identity;
- static/text fallback;
- animation-off behavior;
- no frame/time/playback coupling to mechanics;
- PR22 Activity option-state compatibility;
- merged PR24/PR25 School blocking-scene ordering;
- current RC-safe fallback assets.

These should not be reopened without a demonstrated defect.

## Decision matrix

| Decision family | Human/content decision still required | Current safe state | Presentation constraint |
| --- | --- | --- | --- |
| Future Lumber seasonal GIFs | Which of spring/summer/autumn/winter, if any, should be authored first | all four use shipped Lumber static fallback | keep existing semantic IDs; GIF remains optional |
| Career milestone GIF | Whether/when to author accepted-hand animation | shipped Lumber static fallback | keep `job/lumber/event/lumber-career-first-shift/default` |
| Foreman presentation GIFs | Whether/when to author professional and professional-Night animation | shipped Lumber static fallback | keep existing relationship semantic IDs |
| Forest logging-road visuals | Whether route-specific art is desired beyond generic Forest route | generic Forest static route is safe | do not invent final variants/lore before content decision |
| Forest Old Boundary visuals | Final visual treatment after token acquisition/retain-consume product decisions are authored | generic Forest route is safe | presentation must not decide token mechanics |
| Forest hunter-trail visuals | Final visual treatment after hunter-trail gameplay identity is authored | generic Forest route is safe | do not invent unlock/clue/capability identity |
| Forest challenge visuals | Final visual treatment for navigation / physical obstacle / interpretation-ritual-anomaly | generic Forest route is safe | exact visual variants depend on authored challenge content |
| School teacher/content visuals | Whether paid lessons or blocking School scenes need more specific teacher/classroom art | School stage and workshop static assets are safe | preserve course/event semantic identity and blocking ownership |
| School management/accounting public-result visuals | Art/scene treatment after final provider + threshold/milestone is authored | generic School/town fallback is safe | no presentationId until gameplay/public-result identity is final |
| School Arcana/Forest public-result visuals | Whether retained scope needs unique visual treatment after provider/milestone is authored | generic School/Forest/town fallback is safe | do not invent product threshold or result identity |
| Ending polish | Whether Hard Work / Forewoman / Forest endings receive dedicated art/animation | semantic ending IDs fall back safely to town + text | dedicated ending media is optional for RC |

## Information needed before authoring

For any unresolved row, presentation needs the content owner to provide the relevant final product identity first, such as:

- final authored scene/event identity;
- final route/challenge identity;
- whether the experience should remain generic or receive a unique visual slot;
- accessibility text requirements;
- whether animation is desired at all.

Presentation does not need—and must not select—gameplay thresholds, item acquisition rules, reward rules, or unlock mechanics.

## No priority or art-direction decision here

This matrix intentionally does not decide:

- which visual style is preferred;
- which artist/theme/palette is preferred;
- whether animation is aesthetically better than static art;
- which optional GIF is “best”;
- which unresolved authored scene should be prioritized for product reasons.

Those remain human Product/Content decisions.
