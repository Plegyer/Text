# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE / PRINCE NARRATIVE AUTHORITY v17**
Owner: Chat 6

Completed and frozen:

Palace rich-six runtime producer:
`chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

Palace player-facing UI producer:
`chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`

Leader disposition for v16:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**.

Do not mutate v15 or v16.

## New assignment

Close the final major Palace Product/content blocker:
**the canonical Palace mystery, Prince role, reveal structure, confrontation meaning, and ending epilogues**.

New branch:
`chat6/palace-prince-narrative-authority-v17`

This is a Product/content decision packet only.

No production runtime.
No UI changes.
No full CI.

## Authority that MUST NOT change

Preserve exactly:

- D23 sole Palace entry:
  permanent ordinary 10/10 + active ordinary 10/10;
- deterministic Day-1 invitation after qualification;
- run-local invitation/access;
- no permanent Palace unlock;
- D29 six stages:
  1. Entered Service
  2. Working Rhythm
  3. Trusted Service
  4. Palace Network
  5. Crossroads
  6. Outcome Ready
- duty milestones 2 / 5 / 8 / 12 / 15;
- 15 structural duties;
- D43 one structural duty/day, support envelope and economy;
- non-True routes:
  - Service Life
  - Court Power
  - Inner Truth
- route prep stays non-exclusive before explicit commit;
- D39 permanent rewards unchanged;
- True Return Home:
  - Palace progression complete;
  - all 12 progression stats >=91;
  - Lust excluded;
  - Prince confrontation defeated/completed;
  - explicit Return Home;
- D16 eligibility is non-terminal until explicit commit;
- Palace Night never beats Secret Debt forced Night;
- no mandatory romance;
- no item / Night / Activity / ordinary-career hook may become a hidden Palace progression gate.

## Required Product decision

Design the final narrative authority that explains the Palace without changing its mechanics.

Compare at least **3 coherent narrative models** before choosing one.

Each model must answer:

1. What the Palace actually is in the successor world.
2. Why a person with all ten ordinary Hard Work careers becomes interesting to it.
3. Why the invitation is deterministic once D23 is met.
4. Who/what the Prince is.
5. What the Prince wants from the player.
6. Why the Palace needs 15 duties / six stages before final outcomes.
7. What the duties are gradually teaching/revealing.
8. What `palace.progression-complete` means in-world.
9. What is hidden behind the Inner Truth route.
10. What Court Power actually controls.
11. What Service Life is choosing to preserve.
12. What the Prince confrontation tests.
13. What “defeating” the Prince means:
    - physical defeat,
    - social/political defeat,
    - metaphysical rejection,
    - proof/reconstruction,
    - or another exact authored form.
14. Why all 12 stats >=91 matter narratively for True Return Home.
15. Why Lust is irrelevant to the True stat gate.
16. What Return Home means and why it is distinct from the three non-True endings.

## Reveal architecture

Give an exact reveal ladder mapped to:

- invitation / first entry;
- duty 2;
- duty 5;
- duty 8;
- duty 12;
- duty 15 / Outcome Ready;
- each route-finalize scene;
- Prince confrontation;
- Return Home.

For every beat define:

- what the player may learn;
- what remains hidden;
- who delivers the information;
- whether it is fact, claim, evidence, or interpretation;
- whether the knowledge persists automatically to later lives;
- spoiler-safe UI summary;
- RU/EN terminology candidates.

Do not front-load the mystery.

## Canon / epistemic discipline

Separate clearly:

- objective world facts;
- Palace institutional claims;
- Prince claims;
- character interpretations;
- player-inferred conclusions.

Do not make mutually contradictory claims all canon simultaneously.

If ambiguity is intentionally preserved, say exactly:
- which question remains ambiguous;
- what evidence exists for each interpretation;
- which gameplay outcome does NOT depend on resolving it.

## Prince confrontation

Specify an implementation-ready confrontation structure without writing final prose.

It must:
- require Palace progression complete;
- preserve the all-12 >=91 True gate;
- not use Lust;
- not be a generic combat stat check;
- not require romance;
- not require optional Palace Night;
- not require an Activity item;
- be deterministic/reload-safe;
- have explicit success/failure/back-out semantics;
- not auto-commit Return Home.

Define:
- stable proposed confrontation ID;
- 3–5 player-facing phases;
- what each phase tests;
- exact fail/back-out state;
- whether retry is allowed and under what conditions;
- what durable fact marks Prince defeated/completed.

Do NOT invent numerical thresholds beyond the already locked 12×91 gate unless absolutely necessary; prefer the existing Palace progression facts.

## Ending epilogue authority

For each:

### Service Life
Define:
- what the player chooses;
- what changes in the current life;
- relationship to Palace institution;
- what is explicitly NOT claimed;
- 3–5 epilogue beats.

### Court Power
Same.

### Inner Truth
Same.

### True Return Home
Same, plus:
- what “home” means;
- what the player carries conceptually, not as new unapproved mechanical reward;
- what happens to Palace/Prince from the player's perspective;
- whether the world is rewritten, escaped, reconciled, or left behind.

Do not alter D39/D24 reward mechanics.

## Cross-system echoes

Define OPTIONAL, non-gating narrative echoes from:

- Secret Debt;
- Large Activity;
- School;
- ordinary career advanced endings;
- Night/relationships.

Each echo must be presentation-only or use already-authorized facts.
No echo may substitute for Palace progression or True eligibility.

## Tone constraints

The Palace should feel:
- materially connected to the life-sim systems already played;
- like culmination, not a disconnected second game;
- strange/mysterious without becoming arbitrary;
- capable of supporting Service, Power, Truth and Return Home as genuinely different choices.

Avoid:
- “it was all a dream”;
- pure simulation twist that invalidates prior lives;
- generic chosen-one prophecy;
- unexplained godhood;
- lore that makes the ten ordinary careers irrelevant after D23;
- compulsory romance/sexual revelation;
- Lust-as-moral-worth framing.

## Deliverables

Create:

1. `mindy-successor/docs/tasks/CHAT6_PALACE_PRINCE_NARRATIVE_AUTHORITY_v17.md`
2. `mindy-successor/research/palace_reveal_ladder_v1.csv`

The document must include:
- three compared narrative models;
- one exact recommendation;
- canonical fact/claim matrix;
- reveal ladder;
- Prince confrontation contract;
- four ending epilogue contracts;
- cross-system optional echoes;
- stable IDs/terms needed by later producer;
- exact items still OPEN, if any.

Finish with Russian summary table:

`Элемент | Канон | Когда раскрывается | Игровая функция | Что остаётся скрытым/необязательным`

Then:

`READY_FOR_LEADER_PRODUCT_DECISION`

Freeze exact SHA.

Do not merge main.
