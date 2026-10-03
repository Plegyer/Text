# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — SECRET DEBT FULL ROUTE PRODUCER v12**
Owner: Chat 4

Accepted Product authority:
`chat4/secret-debt-balance-decision-v11@fdef24962c751fa8d4d8595f64b7f00a0e4fff04`

Leader authority:
D44 now locks hidden-work progression, wage and Takeover thresholds.

Authority commit:
`main@fe00dea96892687ba26898a1f52d023e24d11dc7`

New branch:
`chat4/secret-debt-full-route-producer-v12`

## Assignment

Implement the full current-main Secret Debt route under D19/D30/D32/D44.

No full CI.

### Trigger / trap

Implement:
- unseen eligible street sleep -> exactly 20% lender encounter;
- refusal closes lender encounter for current life;
- acceptance grants +2000 exactly once;
- trap activates exactly 10 days later;
- debt becomes exactly 20000;
- bound state is typed and save/reload safe.

### While bound

Implement:
- all ten ordinary careers unavailable while bound;
- existing ordinary-career progress preserved;
- School remains available;
- Activity remains available;
- hidden daytime work available;
- forced Secret Debt Night every bound night;
- next-day Energy -1 exactly once;
- no housing or Meta modifier suppresses forced Night.

### Hidden work — D44 exact

Each committed shift:
- cost 1 Energy;
- Endurance +1;
- Sexuality +1;
- Lust +0;
- Summer Reason -1;
- Winter Sociability -1;
- no Spring/Autumn negative.

Exact wage:
`round(30 + min(110, 0.70 * Endurance + 0.60 * Sexuality + 0.35 * Lust))`

Wage uses pre-shift values.
Absolute cap 140.

### Exits

Paid Freedom:
- repay only if holding full 20000;
- one explicit action;
- no partial repayment;
- clears bound state;
- D30/D32 future-run ownership binding through Strong Meta seam.

Bound Life:
- exactly 50 hidden completed shifts;
- non-terminal eligibility until explicit D16 commit;
- future reward Work Rhythm per D30/D32.

Takeover:
requires all:
- hidden shifts >=75;
- Endurance >=75;
- Sexuality >=75;
- Wits >=35;
- Lust >=30;
- paid School lessons >=10;
- still bound;
- explicit authored Takeover action.

No threshold auto-commit.
Sexuality/Lust do not imply consent.

### Strong Meta integration

Strong Meta current-main assembly is owned by Chat 2 and may move independently.

Do not fork a duplicate registry.

Use exact D30/D32 IDs:
- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

If current branch lacks final assembled Strong Meta runtime, leave precise ownership/grant seams and focused fixtures for Chat 2.

### Palace interaction

Preserve D43:
if Palace access was legitimately opened before becoming bound:
- Palace daytime access stays;
- Palace progress stays;
- ordinary ten careers remain locked;
- forced Night still wins;
- next-day Energy -1 still applies.

Do not create Palace access from Secret Debt.

### Focused QA

No full CI.

At minimum:
- typecheck / validate / build;
- lender 20% deterministic RNG test;
- refusal closes route current life;
- +2000 exactly once;
- trap exactly +10 days;
- debt exactly 20000;
- ten ordinary careers locked while bound;
- School/Activity still available;
- hidden wage anchors 45 / 74 / 104 and cap 140;
- hidden stat package exact;
- seasonal negatives exact;
- forced Night every bound night;
- Energy -1 exactly once across reload;
- Street + bound penalty ordering;
- full-only repayment;
- Bound Life 49 fail / 50 eligible;
- Takeover 74 fail / 75 + all thresholds eligible;
- each Takeover threshold individually fails one below;
- no auto commit;
- consent/refusal unaffected;
- Palace already-open preservation;
- save/reload trap/bound/repayment/ending state;
- no duplicate reward grants.

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
