# Forest / Poverty Coexistence Audit v1

Status: compatibility audit between intended ordinary poverty / Secret Debt rules and current Lumber Forest Activity contracts.

This audit identifies sequencing questions only. It does not modify locked Lumber behavior.

## Locked Lumber / Activity contracts

Must remain unchanged:
- `lumber.forest` entry costs exactly 2 daytime Energy;
- Forest uses persisted Activity state and supports save/resume according to its Activity contract;
- terminal outcomes remain `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`;
- successful Forest continuation is exact `activityResult(lumber.forest, success, lumber.forest.success)`;
- Lumber Hard Work eligibility remains ONLY `completed_shifts >= 50`;
- exact reward remains `hardWork:lumber`.

Ordinary poverty and Secret Debt must adapt around those contracts.

## 1. Forest 2-Energy entry vs poverty economy

Compatibility:
**COMPATIBLE**.

Forest entry consumes daytime Energy before NightFlow.

Poverty/housing affects:
- money available for lodging/School/items;
- Night option availability;
- accepted next-day modifiers.

Poverty/housing must not retroactively change the 2-Energy Forest entry transaction.

Implication:
- a poor player may choose Activity instead of ordinary actions;
- the anti-softlock guarantee still requires some reachable income path on other available days/actions;
- entering Forest must not itself force Secret Debt or bypass normal Night rules.

Open balance question:
- whether a low-money Activity-focused life is economically sustainable is simulation/balance work, not an Activity contract change.

## 2. Street / cheap lodging recovery after Forest

Compatibility:
**COMPATIBLE**.

After the same-day Forest Activity has resolved and Night begins:
- normal room, cheap lodging or street fallback may be offered according to money/context;
- cheap/street options may apply their accepted Night restrictions/next-day modifiers;
- lodging payment and next-day penalties must remain exactly once.

Street fallback remains essential for anti-softlock:
- a player who spent resources on Activity must still be able to reach the next day at zero money;
- Secret Debt offer is not required for that transition.

Sequencing question:
- if Forest success opens a reactive Lumber continuation before NightFlow, that continuation must resolve according to the existing Resolver ordering before/around EndDay as already defined; poverty must not inject a generic shortcut past exact A5.

## 3. Active Activity save/resume vs Night

Compatibility:
**REQUIRES ORDERING DISCIPLINE, NOT A NEW LUMBER RULE**.

Current Activity persistence must survive reload without:
- rerolling route/options;
- duplicating entry cost;
- losing selected route;
- replacing legacy optionModelVersion 0 behavior.

Poverty Night choices must not mutate or discard active Activity state.

Sequencing questions for future integration:
1. Is `EndDay` permitted while a resumable Activity is still active?
2. If yes for a future multi-day Activity, which Night/housing context owns the overnight boundary?
3. If no for current same-day Forest, what UI/domain guard prevents NightFlow until Activity resolves/escapes/fails?

For current `lumber.forest` same-day behavior, do not invent overnight Forest camping from poverty rules.

## 4. Secret Debt street encounter vs active Activity

Compatibility:
**COMPATIBLE WITH NIGHT-ONLY TRIGGER**.

Secret lender eligibility begins only at street-sleep Night context.

Therefore:
- it must not fire during daytime Forest resolution;
- it must not be used as an Activity random encounter;
- it must not affect Forest route RNG/state;
- it must not replace `activityResult` continuation.

Save/reload must preserve both systems independently:
- Activity resolution/checkpoint state;
- one-time Secret Debt encounter state.

## 5. Secret Debt forced Night while bound

Compatibility:
**SUPPORTED BY TARGET NIGHT CONTRACT; PRODUCT POLICY STILL OPEN**.

Bound Secret Debt requires a forced Night obligation.

NightFlow already supports forced hooks:
- before lodging;
- after lodging;
- after choice;
with explicit suppression flags.

Still unresolved:
- exact Secret Debt intercept point;
- whether lodging payment is suppressed;
- exact next-day penalty;
- whether any housing-specific forced-night variants exist.

Those choices must be authored explicitly.

They must not be inferred from Lumber Night behavior.

## 6. Forced Night vs Forest completion day

Potential sequence:
`daytime -> Forest -> exact Forest result/continuation -> EndDay -> Secret Debt forced Night (if bound/eligible)`

Compatibility requirement:
- Forest success and Lumber continuation commit first according to the Resolver;
- Secret Debt forced Night then operates in NightFlow;
- it cannot rewrite Forest outcome or Lumber career facts;
- it cannot consume daytime Energy for the already-resolved Forest entry;
- CalendarAdvance still happens exactly once.

Sequencing question:
- whether a forced Secret Debt Night can occur on the same day as Forest participation is not prohibited by current contracts, but exact content availability while bound is a Product decision because Activity availability during bound state is still OPEN.

## 7. Activity availability while Secret Debt is bound

Status:
**PRODUCT DECISION REQUIRED**.

Secret Debt draft explicitly fixes ordinary-job blocking but leaves School/Activity availability undecided.

Therefore do not implement either of these silently:
- `bound => Forest unavailable`;
- `bound => Forest always available`.

Once Product decides:
- availability must use an explicit authoritative condition;
- save/reload must preserve the same result;
- no change to Forest entry cost/result IDs/A5 is permitted.

## 8. Cheap/street next-day penalty vs forced Secret Debt Night penalty

Compatibility:
**REQUIRES MODIFIER COMPOSITION RULE**.

Both poverty lodging and Secret Debt forced Night may contribute next-day effects.

Current target Night architecture already supports `NextDayModifier` composition.

Future implementation must specify:
- whether modifiers stack, replace, cap or prioritize;
- which source IDs own each modifier;
- exactly-once application after reload.

This is a balance/Night integration decision.

It is not a reason to change Forest entry Energy or Lumber Work Energy.

## 9. Ordinary poverty recovery vs Secret Debt job lock

Before Secret Debt activation:
- ordinary starting-job anti-softlock recovery remains available;
- street/cheap lodging recovery remains available.

After `bound`:
- all ordinary jobs are blocked by Secret Debt domain rule;
- therefore the hidden career itself must provide a valid progress/exit path;
- ordinary poverty anti-softlock cannot rely on a blocked starting job during bound state.

This is consistent with the poverty safety invariant that the Secret Debt route has its own ways to progress/exit.

School/Activity alternatives while bound remain Product decisions.

## 10. Exact A5 protection

No poverty/Secret Debt integration may replace:

`activityResult(lumber.forest, success, lumber.forest.success)`

with:
- a generic `worldFact` trigger;
- debt-state trigger;
- housing-state trigger;
- direct career-fact injection.

Secret Debt may react to an accepted public Activity result in its own content later, but Lumber Forest continuation remains exact and independent.

## 11. Hard Work independence

Secret Debt state must never become a Lumber Hard Work prerequisite.

Hard Work remains:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`.

Likewise:
- street sleep count;
- cheap lodging usage;
- debt acceptance;
- debt activation;
- forced Night count;
- Secret Debt ending

must not change Lumber Hard Work eligibility.

## Sequencing questions requiring future answers

1. Is Forest/large Activity available while Secret Debt is `bound`?
2. Which forced-Night intercept point does Secret Debt use?
3. Does Secret Debt forced Night suppress lodging payment?
4. How do poverty lodging and forced-night next-day modifiers compose?
5. If a future Activity can remain active across EndDay, how is Night/housing represented without corrupting Activity state?

None of these questions requires changing current Lumber contracts.

## Audit conclusion

Ordinary poverty and Secret Debt can coexist with current Lumber/Forest architecture.

The integration pressure is concentrated in:
- Night ordering/modifier composition;
- Secret Debt domain persistence;
- Product choice for School/Activity availability while bound.

Current Forest entry cost, save/resume semantics, exact A5 continuation and Hard Work independence remain valid and must stay unchanged.
