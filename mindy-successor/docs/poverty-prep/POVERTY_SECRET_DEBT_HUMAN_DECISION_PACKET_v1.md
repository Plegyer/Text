# Poverty / Secret Debt Human-Decision Packet v1

Status: only decisions that genuinely require human/Product input before the affected production behavior can be finalized.

This packet does not recommend or select answers.

## Decision 1 — exact normal-room price

Already fixed around it:
- normal room is paid baseline housing;
- street remains zero-money fallback;
- cheap lodging is cheaper than normal;
- lodging payment is atomic and reload-safe.

Authority candidate:
- `HOUSING_AND_NIGHT_BALANCE_v1.md` currently uses `2 WU/night` as a simulation-supported candidate.

Acceptable answer shape:
- one non-negative nightly price in the project's accepted currency scale;
- must remain above cheap lodging if the directed hierarchy is preserved.

Downstream:
- production lodging definition;
- poverty balance data;
- housing simulations;
- lodging acceptance tests.

Can implementation proceed partially without it?
**YES** — use parameterized balance data; do not hard-lock the candidate.

## Decision 2 — exact cheap-lodging price

Already fixed:
- paid but cheaper than normal room;
- distinct Night/privacy/content tradeoff;
- not a failure state.

Authority candidate:
- current balance candidate `1 WU/night`.

Acceptable answer shape:
- one non-negative price lower than approved normal-room price.

Downstream:
- cheap lodging definition;
- economy simulations;
- housing choice tests.

Partial implementation?
**YES** — structure/content can proceed with parameter.

## Decision 3 — street and cheap-lodging penalties

Already fixed:
- street worsens next-day context but must not create inevitable spiral;
- current street is zero-money fallback;
- cheap lodging may have weaker/smaller pressure than street;
- penalties apply through Night/next-day mechanics exactly once.

Authority candidates:
- current housing candidate: street next-day Energy `-1`, Grooming `-1`;
- cheap exact penalty remains open.

Acceptable answer shape:
- Energy/stat/condition modifiers using existing accepted stats/conditions;
- optional housing-specific event pressure instead of universal stat penalty where desired;
- magnitudes must preserve anti-softlock.

Downstream:
- lodging definitions;
- next-day modifier data;
- simulations;
- Night regression tests;
- presentation explanations.

Partial implementation?
**YES** — housing contexts/event shells can ship with parameterized values; final acceptance needs approved balance.

## Decision 4 — lender encounter probability

Already fixed:
- Secret Debt offer is street-only, hidden/exceptional and at most one opportunity per run;
- refusal closes it for the run;
- ordinary poverty does not require it.

Authority range:
- design draft suggests approximately `10–20%` for the eligible one-time check.

Acceptable answer shape:
- probability within the accepted Product range or an explicit revised Product value/rule;
- may include season/context weighting only if explicitly authored.

Downstream:
- lender event content;
- RNG/event definition;
- discoverability simulations;
- one-off encounter tests.

Partial implementation?
**YES** — one-off state/eligibility and deterministic tests can be built before final chance; production balance cannot close.

## Decision 5 — immediate principal / benefit

Already fixed:
- acceptance grants immediate economic benefit exactly once;
- benefit is tempting relative to poverty pressure;
- it creates delayed obligation.

Authority placeholder:
- approximately `2000` money in current draft.

Acceptable answer shape:
- one approved money amount in current economy scale.

Downstream:
- acceptance transaction;
- economy balance;
- Secret Debt simulations;
- acceptance tests.

Partial implementation?
**YES** with parameterized amount.

## Decision 6 — delayed debt amount

Already fixed:
- future obligation materially exceeds immediate help;
- economic `paid_freedom` outcome uses authoritative debt state;
- exact payment occurs once.

Authority placeholder:
- approximately `20000` in current draft.

Acceptable answer shape:
- one approved debt amount or explicitly authored formula supported by the economy model.

Downstream:
- Secret Debt state/content;
- paid_freedom eligibility/payment;
- simulations;
- ending tests.

Partial implementation?
**YES** for persistence/state machine; `paid_freedom` final acceptance remains blocked.

## Decision 7 — delayed activation interval

Already fixed:
- acceptance does not bind immediately;
- activation occurs later at a persisted deterministic calendar boundary;
- reload cannot change the boundary.

Authority placeholder:
- current draft describes roughly `day +10`.

Acceptable answer shape:
- positive whole-game-day interval, or an explicitly accepted calendar rule;
- must fit within run/calendar behavior.

Downstream:
- delayed-activation content/config;
- persistence implementation selected by Lead;
- calendar tests;
- balance simulations.

Partial implementation?
**YES** — persistence seam can be implemented with configurable interval; final balance test waits.

## Decision 8 — School availability while bound

Already fixed:
- ordinary jobs are blocked while bound;
- that professional lock does not automatically include School.

Acceptable answer shape:
- `AVAILABLE`;
- `BLOCKED`;
- `CONDITIONAL` with explicit authoritative condition.

Downstream:
- School action availability/content;
- Secret Debt gating;
- Night study if separately affected;
- cross-system QA.

Partial implementation?
**YES** — ordinary-career blocking can proceed; do not extend it to School.

## Decision 9 — Activity / Forest availability while bound

Already fixed:
- ordinary-job block does not decide Activity;
- existing Activity save/resume/result contracts must remain unchanged.

Acceptable answer shape:
- `AVAILABLE`;
- `BLOCKED`;
- `CONDITIONAL` with explicit authoritative condition.

Downstream:
- Activity entry availability;
- Secret Debt content;
- coexistence tests.

Partial implementation?
**YES** — Secret Debt state/job lock can proceed; leave Activity untouched.

## Decision 10 — forced-Night intercept point

Already fixed:
- mandatory Secret Debt Night exists while bound;
- it suppresses incompatible voluntary Night freedom;
- daytime hidden work and Night obligation are separate;
- Night advances calendar once.

Current-compatible answer shapes:
- `before_lodging`;
- `after_lodging`;
- `after_choice`.

Downstream:
- Secret Debt forced event definition;
- lodging/payment semantics;
- Night tests;
- presentation sequence.

Partial implementation?
**YES** — forced event content family/state can be prepared; production sequencing cannot close until selected.

## Decision 11 — forced-Night lodging-payment behavior

Already fixed:
- current NightFlow supports explicit suppression policy;
- payment behavior must not be accidental handler ordering.

Acceptable answer shape:
- lodging selection/payment retained;
- lodging payment suppressed under the selected forced intercept;
- conditional by accepted context if explicitly defined.

Downstream:
- Night event policy;
- economy balance;
- housing tests.

Partial implementation?
**YES**, but exact production forced policy remains blocked.

## Decision 12 — forced-Night exact next-day penalty

Already fixed:
- forced Night may impose negative next-day pressure;
- applies exactly once;
- modifier composition must be explicit.

Acceptable answer shape:
- Energy delta and/or accepted stat/condition modifier;
- balance magnitude remains within existing modifier representation unless Product chooses a new behavior.

Downstream:
- forced Night content;
- next-day modifiers;
- simulations;
- Night QA.

Partial implementation?
**YES** with symbolic/configured parameter.

## Decision 13 — next-day modifier composition

Already fixed:
- street/cheap lodging and forced Night may both contribute next-day effects;
- each committed source applies once.

Acceptable answer shape:
- additive;
- capped additive;
- priority/replacement rule;
- another explicit deterministic rule supported or deliberately extended by runtime.

Downstream:
- Night modifier finalization;
- balance simulations;
- housing + forced Night integration tests.

Partial implementation?
**PARTIAL** — independent sources can exist; combined production behavior needs the decision.

## Decision 14 — `paid_freedom` exact eligibility

Already fixed:
- economy solution;
- debt/dependency exit;
- not a hidden shift threshold;
- uses authoritative debt/economic state.

Acceptable answer shape:
- exact payoff requirement based on approved debt amount and any explicit choice/fact.

Downstream:
- ending definition;
- debt transaction;
- tests/simulations.

Partial implementation?
**YES** — outcome skeleton and transaction plumbing can proceed; final ending condition cannot.

## Decision 15 — `bound_life` exact eligibility

Already fixed:
- career/endurance fate;
- substantial hidden-career progression;
- conscious commitment;
- not generic failure;
- no Palace ordinary Hard Work credit.

Acceptable answer shape:
- approved career stage/counter/milestone/choice combination;
- no requirement to mirror ordinary 50-shift Hard Work.

Downstream:
- career stages;
- ending definition;
- milestones/tests.

Partial implementation?
**YES** — career/outcome shell can proceed.

## Decision 16 — `takeover` exact eligibility

Already fixed:
- multi-system power solution;
- more than shifts;
- build/route choice plus at least one external dependency category.

Acceptable answer shape:
- approved career progress/build condition;
- explicit external dependency: item, relationship/ally, School public result, Activity result, or another accepted typed/public condition.

Downstream:
- Secret Debt content;
- selected external subsystem;
- ending definition;
- integration tests.

Partial implementation?
**YES** for outcome shell; actual route remains blocked.

## Decision 17 — `paid_freedom` Meta reward

Already fixed:
- Meta applies only after ending completion exactly once;
- qualitative family idea is economy-oriented;
- no Palace ordinary Hard Work credit.

Acceptable answer shape:
- exact canonical Meta reward ID/effect compatible with global Meta rules;
- new primitive only if explicitly required by selected effect.

Downstream:
- ending Meta definition;
- RunResult/New Run QA;
- presentation.

Partial implementation?
**YES** — ending can be authored without final Meta only if production package explicitly keeps reward unresolved; final acceptance cannot.

## Decision 18 — `bound_life` Meta reward

Already fixed:
- hidden-career Hard-Work analogue only in narrative/mechanical family;
- never ordinary `hardWork:<career>` credit;
- no Palace credit.

Acceptable answer shape:
- exact non-ordinary Meta reward ID/effect.

Downstream:
- ending/Meta definitions;
- New Run tests;
- presentation.

Partial implementation?
**YES**, same boundary as above.

## Decision 19 — `takeover` Meta reward

Already fixed:
- qualitative intent: stronger/rule-changing family;
- no exact effect locked;
- no Palace credit.

Acceptable answer shape:
- exact canonical Meta effect under global loadout/strong-modifier rules;
- if effect needs a new Meta primitive, authorize that bounded extension explicitly.

Downstream:
- Meta schema/runtime only if necessary;
- ending definition;
- New Run/loadout tests;
- presentation.

Partial implementation?
**YES** for outcome content; final Meta/ending acceptance remains blocked.

## Decision 20 — `bound_life` same-run continuation, if supported

Already fixed:
- while active and bound before terminal completion, ordinary jobs remain blocked;
- common ending completion produces RunResult/New Run.

Acceptable answer shape:
- no same-run continuation beyond ending completion;
- or explicitly defined continuation policy including whether professional lock persists.

Downstream:
- ending flow only if same-run continuation exists;
- job availability tests.

Partial implementation?
**YES** — default common terminal ending flow needs no extra policy; only a new continuation feature requires this answer.

## Summary

Implementation can proceed substantially on:
- ordinary housing/street structure;
- one-off encounter state;
- delayed persistence seam;
- Secret Debt career state;
- ordinary-career blocking;
- forced-Night host plumbing;
- outcome shells.

Production acceptance remains blocked where exact Product/balance answers above determine observable behavior.

Do not convert current candidate numbers or QA values into final decisions without explicit approval.
