# Next Production Integration Gate v10

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main 23a8798f77c42e84a7540d71fdffd69d9db9fbfd

## Current merged baseline

PR41 localization runtime:
GREEN / MERGED / 291/291.

PR42 deterministic multi-GIF runtime:
GREEN / MERGED / 295/295.

PR43 bilingual Forest result production:
GREEN / MERGED / 299/299 exact head and post merge.

Current open Lead PRs at the latest reviewed snapshot:
none.

## School localization delta

Status:
SELECTIVE_INTEGRATION_READY / NEEDS_CI.

Chat5 items 137–145 are present:
- 8-course RU+EN delta;
- generic reachable School localization;
- exact Night localization;
- School UI copy;
- multi-GIF staging;
- promotion checklist;
- natural-path smoke;
- coverage ledger;
- handoff.

Safe current integration scope:
- School panel/help/buttons;
- 8 paid course labels/descriptions;
- generic reachable post-lesson content;
- exact Night-study content.

Keep staged:
- teacher-specific exact-course paid-lesson presentation;
- repeatable exact-course lesson libraries.

Still Product-blocked:
- management/accounting result;
- Arcana/Forest result;
- certificates/projects/exams;
- teacher relationship route semantics;
- education endings/Meta.

Next requirement:
fresh-main selective copy + tests + exact-head CI.

## Ordinary poverty localization

Status:
NOT_READY / WORKER_QUEUE_ASSIGNED.

Gameplay ordinary poverty is already SHIPPED from PR37.

Localization runtime is SHIPPED from PR41.

Multi-GIF runtime is SHIPPED from PR42.

But Chat3 items 140–148 have only been assigned at the reviewed snapshot.

Missing:
- exact current-main localization delta;
- exact key map;
- polished RU+EN UI copy;
- PR42-compatible poverty pool staging patch;
- natural-path localization regression;
- selective integration handoff.

Do not count the older migration fixture as the new current-main integration delta.

## Forest

### Forest result bilingual slice

Status:
SHIPPED.

PR43 adds:
- root Forest result pack;
- RU+EN event/choice/media localization;
- stable event/media resolver path.

Exact result identities:
- success / lumber.forest.success;
- escape / lumber.forest.escape;
- failure / lumber.forest.failure.

### Remaining Forest content

Status:
CONTENT_OPEN + PRODUCT_BLOCKED at selected route semantics.

Content-open:
- deeper challenge/season/NPC/route presentation.

Product-blocked:
- hunter-trail unlock source;
- Old Boundary Token acquisition/policy.

Do not reopen shipped result identities while authoring deeper content.

## Real multi-GIF pools

Runtime:
SHIPPED through PR42.

Production adoption:
CONTENT/ASSET OPEN.

A production pool requires:
- 3–5 real repo GIF assets;
- no placeholders/external paths;
- unique stable keys;
- current semantic ID;
- static fallback;
- RU+EN alt coverage;
- locale/reload stable candidate;
- no gameplay drift.

Worker manifests with proposed paths remain staging until those paths resolve to real shipped assets.

## Secret Debt

Status:
AUTHORED_ONLY / PRODUCT_BLOCKED.

Authored content exists for:
- lender;
- delayed activation;
- hidden work;
- forced Night;
- three outcome families.

Not shipped:
- authoritative debt state;
- natural encounter;
- delayed activation mechanics;
- ordinary-career lock;
- forced Night mechanics;
- ending eligibility;
- Meta rewards.

Still open:
- probability;
- amount/debt;
- delay;
- hidden-career cost/wage/stages;
- School/Activity while bound;
- lodging/penalty composition;
- ending thresholds/rewards.

RU+EN migration can proceed without pretending mechanics are shipped.

## Career localization/media

Ten Work actions:
SHIPPED_RU_EN for the PR41 Work slice.

Ten Work wages:
SHIPPED after PR40.

Real per-career multi-GIF pools:
CONTENT/ASSET OPEN.

No career gameplay ID may be duplicated per locale.

## Current integration matrix

| Stream | Status |
|---|---|
| localization runtime | SHIPPED |
| multi-GIF runtime | SHIPPED |
| Forest result bilingual production | SHIPPED |
| School safe localization delta | SELECTIVE_INTEGRATION_READY / NEEDS_CI |
| School exact-course localization | STAGED_ROUTING_BLOCKED |
| poverty gameplay | SHIPPED |
| poverty current-main localization delta | NOT READY at snapshot |
| real GIF production pools | CONTENT/ASSET OPEN |
| Forest deeper content | CONTENT OPEN |
| hunter/token semantics | PRODUCT_BLOCKED |
| Secret Debt text | AUTHORED_ONLY |
| Secret Debt mechanics | PRODUCT_BLOCKED |

## Next safe technical actions

Without making Product decisions:
1. selectively integrate School safe localization delta on fresh main;
2. wait for/review Chat3 poverty 140–148 deliverables;
3. verify real GIF assets before enabling production pools;
4. continue Forest depth that does not depend on hunter/token open decisions;
5. keep Secret Debt mechanics out of production until Product behavior is supplied.

## Firewalls

Preserve:
- RU/EN one gameplay identity;
- locale never changes mechanics/RNG/save identity;
- multi-GIF candidate stable across locale/reload;
- Lumber Hard Work remains completed_shifts >= 50 only;
- hardWork:lumber unchanged;
- Palace remains all ten ordinary Hard Work;
- Secret Debt contributes no ordinary Hard Work;
- School paid/Night progress ownership unchanged;
- Forest exact ActivityResult boundaries unchanged.

No production runtime/UI/content file was modified by Chat 4.
