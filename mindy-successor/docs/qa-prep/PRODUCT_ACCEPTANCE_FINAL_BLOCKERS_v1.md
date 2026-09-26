# Product Acceptance Final Blockers v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: merged main `9b427d75dc22021cd3373aa7dd3521782e54152d`  
PR20: merged

## Status definitions

- **PASS_CANDIDATE** — the required production runtime/content path is now shipped and has meaningful automated evidence. This is not a declaration that the full Product Acceptance run has been executed end-to-end.
- **NEEDS_LIVE_EVIDENCE** — the required pieces are shipped, but the exact integrated Product Acceptance checkpoint still needs the live/post-merge execution sequence.
- **BLOCKED_BY_OPEN_AUTHORING** — the Product Acceptance spec requires authored product content/rules that remain intentionally undefined or absent.
- **BLOCKED_BY_RUNTIME** — the required shared mechanic/API/action-space capability does not exist yet; fixture injection is not an acceptable substitute.

A row is not promoted merely because an isolated fixture exists.

## Post-PR20 baseline

PR20 merged as:

`9b427d75dc22021cd3373aa7dd3521782e54152d`

The merge record states that its merge-ref `npm run check` passed:

- typecheck;
- validate;
- build;
- **187/187 tests**.

Production now ships:

- target `lumber.shift`;
- typed career `lumber`;
- typed relationship `lumber.foreman`;
- eight paid School courses through `schoolLesson`;
- typed School `lessons_completed` / `night_study_sessions`;
- production NightFlow lodgings and choices;
- `lumber.forest` Activity;
- target Lumber endings;
- semantic presentation persistence;
- target Lumber/School/Night/Activity UI routes.

The remaining Product Acceptance blockers are therefore narrower than the pre-activation list.

---

## PA00–PA26 final blocker matrix

| PA | Status | Post-merge basis / blocker |
|---|---|---|
| PA00 | **BLOCKED_BY_OPEN_AUTHORING** | Fresh save/startup is shipped, but Product Acceptance requires visible Day-1 alternatives Lumber + Satyr Maid + Undead Farm. Production definitions currently expose target Lumber only; there are no Satyr Maid or Undead Farm actions/careers. |
| PA01 | **PASS_CANDIDATE** | Character creation/finish boundary is existing production core/UI behavior with regression coverage; activation did not replace it. |
| PA02 | **NEEDS_LIVE_EVIDENCE** | Lumber target route is player-reachable through `lumber.shift`, which initializes typed career progression and first milestone. There is no distinct zero-cost “select career” command; the live smoke must confirm that entering via the first paid shift is accepted as the integrated PA02 context-entry interpretation. |
| PA03 | **BLOCKED_BY_OPEN_AUTHORING** | `lumber.shift` costs exactly 1 Energy and has seasonal stat packages, but the production definition has no wage and no money-gain effect. The execution plan requires ordinary Work money delta/wage `W` to apply once. Current resolved `W` is effectively zero because no wage is authored. |
| PA04 | **PASS_CANDIDATE** | Production shift has explicit spring/summer/autumn/winter scenes and seasonal stat packages; repeatable action mechanics and semantic seasonal presentation IDs are shipped. |
| PA05 | **PASS_CANDIDATE** | `lumber.career-first-shift` is in the production Lumber pack, reacts to the real target shift and is persisted through Resolver/presentation contracts. |
| PA06 | **PASS_CANDIDATE** | `lumber.foreman-notice`, typed relationship `lumber.foreman` and the professional non-romance route are shipped. Reactive choices cost no extra daytime Energy. |
| PA07 | **BLOCKED_BY_OPEN_AUTHORING** | Paid School now has track state, semantic presentation and `lessons_completed`, but Product Acceptance requires at least one authored School milestone/public fact that affects Lumber/Foreman. No milestone/certificate threshold/public fact is authored in the accepted School model. |
| PA08 | **BLOCKED_BY_OPEN_AUTHORING** | Production Lumber cross-pack contains listener `lumber-cross.school-management-return` for `lumber.school.management-ready`, but the authoritative eight-course School runtime does not publish that fact. The management/certificate/public-fact threshold remains intentionally OPEN; synthetic `school.lumber-management` is correctly absent from production. |
| PA09 | **BLOCKED_BY_RUNTIME** | Meaningful route item/capability is not a production inventory mechanic. `old_boundary_token -> enter_old_boundary` remains a QA adapter concept; no shared item-capability resolver/acquisition path exists in production. |
| PA10 | **PASS_CANDIDATE** | Explicit `endDay` NightFlow is shipped in engine and UI; production lodgings/Night choices validate in the merged catalog. |
| PA11 | **PASS_CANDIDATE** | Production `lodging.normal` and payment-commit NightFlow exist. Exactly-once lodging mechanics already have NightFlow regression coverage; final product checkpoint remains part of post-merge smoke. |
| PA12 | **PASS_CANDIDATE** | Production `lumber.foreman.night` and event `lumber-night.foreman-professional` are shipped and UI-visible when eligible; professional route condition is typed. |
| PA13 | **PASS_CANDIDATE** | Night completion/calendar/next-day modifier lifecycle is shipped and covered by NightFlow tests. Typed School Night-study was included in the 187/187 merge gate. |
| PA14 | **BLOCKED_BY_RUNTIME** | `lumber.forest`, 2-Energy entry and Activity UI are shipped, but its production entry condition requires `lumber.capability.enter-old-boundary`. No legitimate production item/capability acquisition path can currently satisfy that condition. |
| PA15 | **NEEDS_LIVE_EVIDENCE** | A5 active-Activity save/reload mechanics and production Activity UI are present, but the ordered player flow cannot yet reach the Activity legitimately because PA14 is blocked. Must be demonstrated after the capability path exists or from an explicitly prepared valid production state. |
| PA16 | **BLOCKED_BY_OPEN_AUTHORING** | Production Forest remains `counter.v1` with progress/endurance and success threshold. Product Acceptance requires 3 route contexts, 3 challenge families and a season difference; these product-depth definitions are absent. |
| PA17 | **BLOCKED_BY_RUNTIME** | Activity command API still exposes only `advance` / `escape`. No item-dependent Activity action is added by inventory/capability state, so the required action-space change cannot be exercised. |
| PA18 | **NEEDS_LIVE_EVIDENCE** | Production success result `lumber.forest.success` and reactive event `lumber-cross.activity-forest-return` are shipped. A5/result→Resolver mechanics exist, but the full product path is upstream-blocked by PA14 and must be demonstrated from a legitimate production entry. |
| PA19 | **PASS_CANDIDATE** | Production Activity includes distinct `lumber.forest.escape`; A5 separates success/escape/failure and does not emit success-only continuation for escape. |
| PA20 | **PASS_CANDIDATE** | Production Forest return event applies typed Lumber continuation facts and is reactive/zero-extra-Energy. Existing A5/cross-system tests cover this boundary. |
| PA21 | **NEEDS_LIVE_EVIDENCE** | Production Hard Work and complex Forest/Forewoman endings exist and can be independently eligible; branch fixtures prove simultaneous eligibility. Full production acceptance still needs a shipped-path state proving at least two target endings eligible together, without relying solely on fixture injection. |
| PA22 | **PASS_CANDIDATE** | A6 keeps eligibility separate from commitment; target `lumber.shift` remains usable while endings are merely eligible, subject to normal flow/Energy guards. |
| PA23 | **PASS_CANDIDATE** | Explicit `commitEnding` boundary is shipped; commitment does not apply Meta reward. Semantic ending ID `ending/lumber/hard-work` is stable. |
| PA24 | **PASS_CANDIDATE** | Explicit central completion creates one RunResult and transitions to terminal state; A6 exactly-once result identity remains active after PR20. |
| PA25 | **PASS_CANDIDATE** | Production Hard Work reward is exactly `hardWork:lumber`; transaction proof and reload idempotency are A6 contracts. Merge-gated tests remain green. |
| PA26 | **PASS_CANDIDATE** | `newLife` preserves Meta; Hard Work `lumber` changes next-run starting Strength/Endurance through the existing Meta rule. The post-merge smoke must make the visible difference explicit in the UI/save capture. |

---

# Detailed open blockers

## A. Day-1 career breadth — PA00

Required by Product Acceptance:

- Lumber;
- Satyr Maid;
- Undead Farm.

Current production target career set:

- Lumber only.

This is not a runtime limitation. It is missing product authoring/integration for the two visible limited-depth alternatives.

**Owner class: OPEN AUTHORING.**

---

## B. Lumber shift economy — PA03

Production `lumber.shift` currently has:

```json
"cost":{"money":0,"energy":1}
```

plus typed career and seasonal stat effects.

It has no:

- `wage`;
- positive money effect.

The Product Acceptance execution plan explicitly requires:

`money changes by exactly W; wage applies once`.

A zero value is not currently represented as an authored wage; there is simply no wage transaction.

Before PA03 can pass the written execution plan, product authoring/integration must either:

1. define the intended Lumber wage using the supported wage/effect model, or
2. explicitly revise the acceptance contract to state that this target shift intentionally pays zero.

QA must not invent the wage.

**Owner class: OPEN AUTHORING.**

---

## C. School milestone/public fact — PA07/PA08

PR20 correctly activates:

- eight course packages;
- track IDs;
- `lessons_completed`;
- `night_study_sessions`;
- semantic School presentation;
- same-boundary Resolver ordering.

It intentionally does **not** invent:

- certificate thresholds;
- milestone thresholds;
- teacher canon;
- management certificate;
- Lumber-facing public fact threshold.

The Lumber cross-pack listens for:

`lumber.school.management-ready`.

No authoritative School transaction currently emits that world fact.

Therefore the required:

```text
School lesson
-> School-owned milestone/public fact
-> immediate Lumber/Foreman continuation
```

is not a complete product path.

The old synthetic fixture action must remain excluded.

**Owner class: OPEN AUTHORING.**

---

## D. Meaningful item/capability — PA09/PA14/PA17

The Product Acceptance requirement is stronger than a world-fact gate.

It requires:

- meaningful item acquisition;
- inventory/capability state;
- capability explained in UI;
- item changes available Activity action.

Current production has no:

- `old_boundary_token` typed item;
- item capability registry/resolver;
- player-facing acquisition path;
- Activity item action.

Forest entry checks a world fact that the production flow cannot legitimately obtain.

The QA fixture adapter remains useful for architecture testing, but cannot convert these rows to PASS.

**Owner class: RUNTIME + later product authoring.**
For row classification, PA09/14/17 are marked **BLOCKED_BY_RUNTIME** because the shared capability/action-space primitive itself is absent.

---

## E. Forest product depth — PA16

Current production Activity:

- adapter: `counter.v1`;
- internal progress;
- endurance;
- success threshold;
- escape/failure.

Required Product Acceptance depth:

- 3 route contexts;
- 3 challenge families;
- season difference;
- item-dependent action;
- save/resume.

The current adapter proves A5 mechanics, not the requested product variety.

No QA threshold should be fabricated.

**Owner class: OPEN AUTHORING** for route/challenge/season content, with PA17 runtime capability separate.

---

# Rows requiring live evidence despite shipped mechanics

## PA02

The first target Work action currently doubles as practical career entry and the first ordinary shift. The acceptance smoke must confirm this integrated UX interpretation is acceptable and that PA03 can still be exercised as the next ordinary shift.

## PA15 / PA18

The production Activity and result→Resolver seams are real, but a legitimate player entry is currently blocked by the missing item/capability path.

Once that prerequisite exists, these checkpoints need the real shipped save/reload sequence.

## PA21

Simultaneous ending eligibility has strong isolated behavior evidence but still needs production-path proof after the upstream product blockers are resolved.

---

# Merge status is not Product Acceptance completion

The PR20 merge record is strong architecture/integration evidence:

`npm run check: 187/187`.

It means activation itself passed its merge gate.

It does **not** close the product gate requirements that were intentionally left open:

- career breadth;
- Lumber wage contract;
- School authored milestone/public fact;
- meaningful item/capability;
- Forest 3×3 depth/item action;
- live end-to-end evidence for the remaining integrated checkpoints.

---

# Current aggregate

Counts by row status:

- **PASS_CANDIDATE:** 16
- **NEEDS_LIVE_EVIDENCE:** 4
- **BLOCKED_BY_OPEN_AUTHORING:** 4
- **BLOCKED_BY_RUNTIME:** 3

The product slice is therefore **not yet fully passable end-to-end**, despite the successful PR20 activation merge.

No production file was modified by Chat 4.
