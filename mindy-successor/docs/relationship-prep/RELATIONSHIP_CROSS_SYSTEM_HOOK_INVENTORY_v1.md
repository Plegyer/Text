# Relationship Cross-System Hook Inventory v1

Date: 2026-09-27  
Status: **CURRENT-CONTRACT HOOK MAP / AUTHORING BOUNDARY**  
Scope: typed Relationships + ordinary voluntary Night

This inventory maps cross-system hooks that the current main contracts/runtime can legally express. It does not create new public facts, NPCs, transitions, item semantics, School outcomes, Activity results, or relationship endings.

Classification:

- **SHIPPED_EXACT** — exact identity already exists in root-loaded current-main gameplay.
- **SAFE_AUTHORED_PROPOSAL** — current primitives can represent the hook without runtime work, but no canonical relationship content is selected.
- **PRODUCT_BLOCKED** — a draft or consumer shape exists, but the required public identity/semantics are unresolved and must not be promoted to production.

## Career fact / counter / stage

### SHIPPED_EXACT

Current Foreman entry is already driven by a typed career boundary:

- career: `lumber`
- career stage: `accepted-hand`
- relationship: `lumber.foreman`
- relationship transition: `notice-work`
- root event: `lumber.foreman-notice`
- reaction boundary: `careerTransition(lumber)`

The career's first recognized shift increments `completed_shifts`, advances the Lumber career to `accepted-hand`, and then the relationship event opens reactively. The relationship scene itself does not consume another daytime Energy.

### SAFE_AUTHORED_PROPOSAL

Current schema/runtime can legally use:

- `careerStage`
- `careerShifts`
- `careerCounter`
- `careerFact`
- `careerChoice`

and react to:

- `careerCounterChanged`
- `careerTransition`
- `careerFactAdded`.

This supports relationship copy that reacts to ordinary work history or an approved career fact without a generic “socialize” action.

### PRODUCT_BLOCKED

Do not invent new career facts such as “trusted by supervisor”, “saved client”, or “handled crisis” as production identities merely to feed a relationship. A new career-owned public fact must be authored by the owning career package and accepted before a relationship pack consumes it.

Lumber Hard Work is explicitly not a relationship hook: it remains only `completed_shifts >= 50`.

## Stat threshold

### SHIPPED_EXACT

No root-loaded relationship event currently uses a stat threshold. There is therefore no exact shipped “Foreman Charm gate” or equivalent identity to reuse.

### SAFE_AUTHORED_PROPOSAL

The condition language already supports `stat(statId, op, value)`, and Resolver reaction facts already include `statChanged(stat)`. A future relationship milestone can therefore be triggered when an approved stat threshold becomes true, regardless of whether the stat was raised by Work, School, Activity, or another legal source.

Safe authoring shape:

`statChanged(charm) -> relationship event conditions re-check -> 0-Energy milestone`.

The exact stat and threshold remain content decisions.

### PRODUCT_BLOCKED

No threshold in a design example may be copied into production as canon without Product/content approval. A School lesson raising a stat does not automatically establish a relationship prerequisite.

## School / world fact

### SHIPPED_EXACT

The root-loaded `lumber-cross.school-management-return` event already reads exact world fact:

`lumber.school.management-ready`

and additionally requires:

`relationshipStage(lumber.foreman, route-professional)`.

When eligible, it writes Lumber career facts `management-school-ready` and `forewoman-problem-resolved`.

This establishes that the current runtime can legally connect a public world fact and relationship stage.

### PRODUCT_BLOCKED

The upstream School management/accounting provider, milestone type, threshold, publication identity/rule, and final public result remain Product-open. Therefore `lumber.school.management-ready` must not be treated as evidence of a fully authored natural School path or copied as a generic relationship fact.

School-private counters such as `lessons_completed` and `night_study_sessions` must not be read directly by relationship content. Any future School->Relationship hook must consume an approved public result/world fact.

### SAFE_AUTHORED_PROPOSAL

Once a School public result is formally approved and published, a relationship event may:

- react to `worldFactAdded`;
- condition on `worldFact`;
- remain relationship-owned for stage/fact/choice effects.

No runtime extension is needed for that shape.

## Item / capability

### SHIPPED_EXACT

Current item definitions include these exact capability-bearing identities:

- `reinforced_axe` -> `cut_heavy_wood`
- `rope_kit` -> `cross_rough_route`
- `field_preservation_kit` -> `preserve_specimen`
- `old_boundary_token` -> `enter_old_boundary`

The condition language already supports `itemCount` and `itemCapability`.

### SAFE_AUTHORED_PROPOSAL

An approved relationship scene can condition on possession of an existing item/capability without copying the item's internal implementation. Examples of legal shape include showing a practical-help dialogue when the player possesses an appropriate tool, or allowing a contact to acknowledge an approved capability.

The relationship event must not silently consume or transfer the item unless its own approved effects explicitly do so.

### PRODUCT_BLOCKED

`old_boundary_token` exists technically, but its acquisition source and retain/consume/turn-in semantics remain Product-open. Relationship content must not decide those semantics.

Likewise, no relationship may invent a new item capability in prose and treat it as shipped gameplay.

## Activity result

### SHIPPED_EXACT

Current Lumber Forest production uses the exact typed reaction trigger:

- activity: `lumber.forest`
- outcome: `success`
- result: `lumber.forest.success`

The root `lumber-cross.activity-forest-return` event consumes that exact `activityResult` and continues Lumber career content. Success also publishes current world fact `lumber.forest.truth-known`.

This identity is locked and must not be renamed or generalized.

### SAFE_AUTHORED_PROPOSAL

The Resolver can already trigger relationship content directly from an approved `activityResult`, or indirectly from a public world fact produced by Activity. A future relationship reaction can therefore be 0-Energy after Activity has already paid its own entry cost.

### PRODUCT_BLOCKED

Do not add a new Foreman relationship reaction that assigns meaning to unresolved Hunter trail, Old Boundary, or deeper Forest authoring. Chat 5 also does not own Forest content. Existing exact Forest results may be referenced only where their currently authoritative semantics are sufficient.

## Housing

### SHIPPED_EXACT

Current root housing contexts are:

- `normal`
- `cheap`
- `street`

and the condition language supports `housingTier`.

Current School Night study already demonstrates a shipped housing gate: its choices allow `normal` or `cheap` and exclude `street`.

The shipped `lumber.foreman.night` relationship choice currently has **no housing condition**.

### SAFE_AUTHORED_PROPOSAL

A relationship Night may use `housingTier` to:

- permit a private scene in normal housing;
- substitute a public/common-space scene in cheap lodging;
- offer a public walk on street;
- mark a specific privacy-required scene unavailable.

This changes availability/presentation through explicit content conditions, not daytime Energy.

### PRODUCT_BLOCKED

The exact Foreman privacy rule is not selected. Do not silently decide that street always blocks the Foreman Night, or that cheap lodging always permits it. Housing balance numbers also remain open.

## Season

### SHIPPED_EXACT

The runtime has `calendarSeason`/season conditions, and current Lumber work already ships seasonal scene/stat variants. No root-loaded relationship event currently changes relationship mechanics by season.

### SAFE_AUTHORED_PROPOSAL

Relationship events may use season to select:

- setting/flavor;
- availability window;
- an approved seasonal request;
- public-vs-indoor presentation.

A safe immediate use is presentation flavor only, as in the Foreman content bank, with the same relationship state and effects.

### PRODUCT_BLOCKED

No seasonal relationship threshold, festival identity, or route branch is canon merely because the runtime supports season conditions. Concrete recurring events/competitions remain separate Product authoring.

## Night count

### SHIPPED_EXACT

The current voluntary choice `lumber.foreman.night` increments the relationship-owned counter:

`relationship[lumber.foreman].counters.night_meetings`

by exactly 1.

The runtime can emit `relationshipCounterChanged` and evaluate `relationshipCounter`.

No root-loaded event currently advances a new Foreman stage at a specific `night_meetings` threshold.

### SAFE_AUTHORED_PROPOSAL

A future effect-free or approved milestone can react to `relationshipCounterChanged(lumber.foreman, night_meetings)` and require an approved counter threshold. The resulting dialogue normally remains 0 daytime Energy because the Night slot already supplied the interaction opportunity.

### PRODUCT_BLOCKED

The exact number of Foreman meetings required for deeper trust/personal content is Product-open. This inventory does not choose 1, 3, 5, or any other threshold.

## Relationship-owned hooks

Current relationship domain itself already supports:

- `relationshipStage`
- `relationshipCounter`
- `relationshipFact`
- `relationshipChoice`

with reactions:

- `relationshipCounterChanged`
- `relationshipTransition`
- `relationshipFactAdded`.

Current exact Foreman-owned identities are:

- stages `unknown`, `professional`, `route-professional`;
- choice `route=professional`;
- counter `night_meetings`;
- fact `night-followup-complete`.

Deeper draft stages such as trusted/personal/close/rival are not current production identities.

## Summary matrix

| Hook family | Current exact relationship-facing identity | Safe authored use now | Product-blocked boundary |
|---|---|---|---|
| Career | `lumber.accepted-hand -> lumber.foreman` | react to approved career stage/counter/fact | new career facts/thresholds |
| Stat | none in shipped relationship content | typed stat threshold + `statChanged` | exact stat/threshold |
| School/world fact | `lumber.school.management-ready` consumer shape exists | consume approved public world fact | School provider/result semantics |
| Item/capability | current capability catalog exists | condition on approved item/capability | Old Boundary semantics/new item identities |
| Activity result | exact `lumber.forest.success` exists | react to authoritative Activity result/public fact | Hunter/deeper Forest semantics |
| Housing | `normal/cheap/street`; Foreman has no gate | explicit privacy/public variant conditions | exact Foreman privacy policy |
| Season | runtime + Lumber seasonal work exists | presentation flavor / approved seasonal availability | new festival/route mechanics |
| Night count | `lumber.foreman.night_meetings` increments | reactive 0-Energy milestone after approved threshold | exact threshold/deeper stage |

## No-regression rules

Cross-system relationship authoring must never:

- read another subsystem's private progress when a public boundary is required;
- invent a Product-open public fact and call it shipped;
- charge an extra relationship Energy cost for a reactive milestone;
- infer a universal next-day Energy penalty from Night interaction;
- alter Lumber Hard Work from `completed_shifts >= 50`;
- alter the exact Forest `activityResult`;
- duplicate identities per locale;
- make media selection change gameplay.
