# Secret Debt Outcome-to-Meta Decision Boundary v1

Status: decision boundary between required Secret Debt ending structure and still-open Meta rewards.

This document does not select exact Meta rewards.

## Shared locked boundary

Secret Debt has three required outcome families:
- `paid_freedom`;
- `bound_life`;
- `takeover`.

All three use the generic ending transaction model already supplied by the project:

`eligible -> explicit commit -> completeEnding -> stable RunResult -> Meta exactly once`

Therefore:
- eligibility is not completion;
- commitment is explicit;
- Meta does not apply at eligibility time;
- Meta applies only after successful ending completion;
- reload/retry cannot duplicate completion, RunResult or Meta application.

Secret Debt is an additional hidden career, not one of the 10 ordinary professions.

No Secret Debt outcome contributes to Palace's 10/10 ordinary Hard Work prerequisite.

## `paid_freedom`

### Ending identity / outcome structure already required

Required mechanical identity:
- economy solution;
- heroine resolves/pays the debt;
- dependency/professional lock exits;
- ordinary careers return to their normal independent availability if the run continues under accepted ending semantics.

Exact debt amount/threshold remains balance-owned.

### Documented Meta family idea

Existing Secret Debt design describes the Meta reward as:
- economic-type / economy-oriented.

This is a qualitative reward-family direction only.

It does **not** lock:
- reward ID;
- numeric money bonus;
- starting resource amount;
- discount;
- debt immunity;
- shop rule;
- any other exact mechanic.

### Product decision still required

Product must choose the exact Meta reward identity/effect.

Acceptance after decision must prove:
- reward is attached to `paid_freedom` completion, not payoff eligibility;
- reward applies exactly once;
- reward survives New Run according to normal Meta rules;
- reward does not add ordinary Hard Work credit.

## `bound_life`

### Ending identity / outcome structure already required

Required mechanical identity:
- career/endurance fate;
- heroine remains in the dependency as a life outcome;
- it is not a generic failure screen;
- it requires substantial hidden-career progression and conscious commitment.

Exact career threshold/stage remains open.

### Documented Meta family idea

Existing design calls it a:
- Hard-Work analogue for the hidden career.

This means it is the tenure/endurance-style ending family **inside Secret Debt**.

It does **not** mean:
- reuse `hardWork:<ordinaryJob>`;
- add Secret Debt to `completedOrdinaryHardWork`;
- count toward Palace 10/10;
- copy Lumber's `completed_shifts >= 50` threshold;
- reuse an ordinary-career Meta reward.

### Product decision still required

Exact Meta reward ID/effect is OPEN.

Product may later choose a reward fitting the hidden-career fate, but this document provides no preference.

Acceptance after decision must prove:
- reward applies only after `bound_life` completion;
- reload/retry applies it once;
- Palace ordinary Hard Work count remains unchanged;
- no ordinary job receives false Hard Work credit.

## `takeover`

### Ending identity / outcome structure already required

Required mechanical identity:
- multi-system power solution;
- heroine eliminates/replaces the controlling owner/master and takes control;
- eligibility requires more than shifts alone;
- at least one external dependency category is required.

Exact build, item/fact/ally/School/Activity condition remains open.

### Documented Meta family idea

Existing design says the reward should be:
- substantially stronger or rule-changing relative to the simple tenure route.

This is qualitative intent, not an exact reward.

It does **not** lock:
- a specific perk;
- a specific starting stat;
- money amount;
- job unlock;
- debt-rule override;
- relationship privilege;
- Palace credit.

### Product decision still required

Exact reward ID/effect remains OPEN.

Acceptance after decision must prove:
- reward belongs only to completed `takeover`;
- reward applies once;
- any rule-changing effect is explicit and typed;
- reward cannot alter Palace 10/10 accounting unless a separate user lock changes that global rule.

## Palace prerequisite exclusion

Locked user rule:

`completedOrdinaryHardWork contains ALL 10 ordinary job IDs`

Secret Debt is outside that set.

Therefore:
| Secret Debt outcome | Adds ordinary Hard Work credit? | Counts toward Palace 10/10? |
| --- | --- | --- |
| `paid_freedom` | NO | NO |
| `bound_life` | NO | NO |
| `takeover` | NO | NO |

This remains true even if a future Secret Debt reward is powerful or is described as a Hard-Work analogue.

## Generic ending infrastructure already supplied

Future Secret Debt authoring should reuse existing ending lifecycle expectations:
- eligibility query;
- explicit ending commitment;
- stable committed ending ID/state;
- central completion;
- stable RunResult;
- Meta transaction exactly once;
- reload-safe completion;
- New Run Meta persistence.

A new Secret Debt Meta reward does not by itself justify a new ending transaction system.

Runtime work is only warranted if an accepted reward effect requires a genuinely missing Meta primitive.

## Save / RunResult acceptance

For every outcome:
1. reach eligibility from authoritative Secret Debt state;
2. save/reload while eligible and uncommitted;
3. commit exact ending once;
4. save/reload committed state;
5. complete ending;
6. verify one stable RunResult;
7. verify exact selected Meta reward once after Product defines it;
8. retry/reload completion without duplication;
9. start New Run and verify only the accepted Meta effect carries;
10. verify ordinary Palace Hard Work progress is unchanged.

## Decision matrix

| Outcome | Structure | Documented reward-family idea | Exact reward | Palace ordinary-Hard-Work credit |
| --- | --- | --- | --- | --- |
| `paid_freedom` | economy solution | economy-oriented | PRODUCT DECISION REQUIRED | NONE |
| `bound_life` | hidden-career endurance/fate | Hard-Work analogue within Secret Debt | PRODUCT DECISION REQUIRED | NONE |
| `takeover` | multi-system power solution | stronger/rule-changing qualitative family | PRODUCT DECISION REQUIRED | NONE |

## What Product must decide later

For each outcome:
- canonical Meta reward ID;
- exact effect;
- whether effect is automatic knowledge/content vs selectable strong modifier under global Meta loadout rules;
- any balance magnitude;
- presentation/description.

Do not infer these from the qualitative family descriptions.

## Firewalls

Secret Debt Meta authoring must not change:
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact Lumber reward `hardWork:lumber`;
- Palace requirement of all 10 ordinary Hard Work endings;
- exact Lumber Forest `activityResult` continuation.
