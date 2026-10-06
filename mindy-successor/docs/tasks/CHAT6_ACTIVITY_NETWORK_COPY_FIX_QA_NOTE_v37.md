# Chat 6 — Activity Network Copy Fix QA Note v37

Status: **READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 6  
Branch: `chat6/activity-network-copy-fix-v36`

Scope: QA / assembly note for the v36 localization-only Activity Network epilogue correction.

No runtime change.  
No mechanics change.  
No reward or gate change.  
No presentation change.  
No full CI.

## Frozen authority

Route mechanics authority:

`chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`

Accepted final Activity content source before this correction:

- localization blob: `4449ca46ad6580ca5f36adf140e9e1e14a007b64`
- Activity v17 branch: `chat3/activity-ending-content-presentation-v17`

The contradiction corrected here was identified by Chat 6 v35:

`CHAT6_FINAL_COPY_CONSISTENCY_AUDIT_v35.md`

## Frozen v36 producer

Exact producer commit:

`2f8f291a7e03bcf1677d6f51feaec28fe98e29ba`

Producer files:

1. modified  
   `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`
2. added  
   `mindy-successor/prior-work/astra/prototype-m3.2/tests/activity-network-copy-fix-v36.test.ts`

Final localization blob:

`d631544c96c724375ac48d3c563dd1c1865bb5b5`

Focused test blob:

`48742368940c2d9410ffd9e8a655018a37a26832`

Definitions blob remains unchanged:

`942f9b514f1e512e9bfa08a9e2eda580bcaac872`

## Exact production diff

Compared with accepted Activity v17 localization blob
`4449ca46ad6580ca5f36adf140e9e1e14a007b64`:

- localization entry count before: **3245**
- localization entry count after: **3245**
- added localization keys: **0**
- removed localization keys: **0**
- changed localization keys: **1**

The only changed key is:

`ending.ending.activity.network.epilogue`

Previous RU:

`У этой сети нет штаба, печати и списка членов. Есть условные фразы, надёжные адреса, люди, которые знают, кому передать записку, и достаточно доверия, чтобы однажды ответить на неё. Ни один контакт не открывает все двери, но вместе они превращают четыре разрозненных направления в пространство, где у вас почти всегда есть с кем начать разговор.`

Previous EN:

`The network has no headquarters, seal, or membership roll. It has agreed phrases, reliable addresses, people who know where to pass a note, and enough trust for someone to answer it. No contact opens every door, but together they turn four disconnected directions into a world where you almost always know who to speak to first.`

Final authoritative RU:

`Контакты связывают разрозненные направления в единое рабочее пространство.`

Final authoritative EN:

`The contacts tie disconnected routes into one practical working network.`

The correction removes the unconditional four-direction claim while preserving the intended semantic: previously separate routes/areas become a practical contact network.

## Mechanics preservation

Static comparison against frozen v16-r1 confirms the current `ending.activity.network` mechanics are unchanged for:

- stable ending ID;
- full condition tree;
- reward ID;
- `metaRewards`.

The focused v36 test fingerprints exactly those mechanics fields and expects the frozen fingerprint:

`9a43cd11`

It also asserts:

- exact bilingual corrected epilogue;
- no RU `четыре` claim;
- no EN `four` claim;
- reward remains `specialist.activity.contact-network`;
- unlock ownership remains unchanged.

## QA status

Static Git-backed verification: **PASS**.

Verified:

- exact one-key localization delta;
- exact target RU/EN values;
- localization count unchanged;
- definitions blob unchanged;
- v36 producer diff limited to localization + focused test;
- no runtime/presentation file changed.

The focused executable test was authored but not run from this connector-only lane.

Full CI was not run, per task instruction.

## Chat 2 assembly guidance

Apply v36 only after or together with the accepted Activity v17 localization layer.

For `ending.ending.activity.network.epilogue`:

1. if absent, add the v36 final value;
2. if equal to the v17 predecessor value, replace it with the v36 final value;
3. if already equal to the v36 final value, no-op;
4. if any other value is present, **STOP** for conflict review.

Do not copy `localization.json` wholesale.

Do not take any v36 runtime, mechanics, presentation, reward, or gate change; none exists.

Add the focused v36 test to the runnable Chat 2 checkout and include it in focused Activity/localization QA.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
