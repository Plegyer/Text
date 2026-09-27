# Next Integration Risk Gate v8

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Current main observed:
eaae5e5c59f40eb032943c048e99a26af9a688ba

Open Lead PRs at snapshot:
none.

## Classification vocabulary

- GREEN_TO_INTEGRATE
- NEEDS_CI
- PRODUCT_BLOCKED
- CONTENT_ONLY
- RUNTIME_GAP

Already merged work is recorded as a green baseline rather than as pending integration.

## 1. Ordinary poverty / PR37

Status:
GREEN_TO_INTEGRATE / ALREADY MERGED.

Evidence:
- PR37 merged;
- exact head 270/270 PASS;
- post-merge 270/270 PASS;
- six ordinary-poverty production packs are in root catalog;
- Secret Debt excluded;
- lodging base values unchanged;
- anti-softlock/reload coverage present.

Risk:
low for the shipped PR37 scope.

Remaining poverty work is content/localization expansion, not a blocker for the merged ordinary-poverty slice.

## 2. School authored production / PR38

Status:
GREEN_TO_INTEGRATE / ALREADY MERGED.

Evidence:
- PR38 merged;
- exact head 286/286 PASS;
- post-merge 286/286 PASS;
- three root authored School packs shipped;
- full exact-course libraries preserved in staging;
- no fake exact-course routing;
- no School mechanics drift.

Remaining School exact-course routing:
RUNTIME_GAP for exact paid-course public routing.

Remaining management/accounting and Arcana/Forest public-result semantics:
PRODUCT_BLOCKED.

RU+EN School migration is actively being authored on Chat5.

## 3. Work UI / PR39

Status:
GREEN_TO_INTEGRATE / ALREADY MERGED.

Evidence:
- exact head 287/287 PASS;
- post-merge 287/287 PASS;
- Work panel exposes exactly ten target ordinary career shifts;
- legacy tavern/hunt/guard are not Work buttons;
- PR39 changed UI/test only.

Risk:
low for target Work visibility.

## 4. Lumber target wage / PR40

Status:
GREEN_TO_INTEGRATE / ALREADY MERGED.

Final PR40 evidence:
- head 0d7dfeba5b1394b97e94096e70db280d41f3c8e6;
- merge c71898654ea8419799816d9642184c4dcf23b039;
- exact head 288/288 PASS;
- post-merge 288/288 PASS.

The wage is not invented.

It reuses the existing legacy/compatibility Lumber contract:
- base 13;
- Strength 0.5;
- Endurance 0.25.

Current 10-career target set now has wage definitions for all ten.

Risk:
closed for missing-wage parity.

Coverage gap:
only Lumber currently has direct UI money-delta smoke; other nine have UI availability + engine dispatch/definition evidence.

## 5. Multi-GIF runtime

Status:
RUNTIME_GAP.

Current main still supports:
- primary GIF override;
- static override;
- fallbackId;
- ordered resolved candidates;
- Animation Off;
- onerror advance.

Current main does NOT yet provide:
- explicit 3..5 GIF pool schema;
- deterministic occurrence-key selector;
- presentation-only pool weighting/rotation;
- same-occurrence deterministic selection plumbing.

Current UI still starts from:
candidates[mediaIndex]

and advances index on media failure.

Chat2 has already produced:
- runtime integration handoff;
- occurrence-key inventory;
- schema/test planning;
- multi-GIF manifests;
- bilingual presentation authoring work.

But worker planning is not shared-runtime implementation.

Next runtime PR must pass:
MULTI_GIF_IMPLEMENTATION_PR_REVIEW_TEMPLATE_v1.md

Risk:
shared presentation runtime change with compatibility/Save/RNG constraints.

## 6. Forest authored/result content

### Forest result reaction pack

Status:
NEEDS_CI.

Chat3 worker has:
- forest-result-content-v1.json;
- forest-result-content-v1.test.ts.

Static QA:
- exact success/escape/failure activityResult triggers: PASS;
- effect-free content reactions: PASS;
- no Lumber Hard Work dependency: PASS;
- reload/idempotency authored test: PASS;
- strict namespace: PASS;
- stage-forest fallback: PASS.

Integration risks:
- worker branch is long-lived/diverged;
- worker test uses stale old Forest entry fixture;
- current main entry is naturally open and old-boundary is now option capability-gated;
- fresh-main test adaptation required;
- RU+EN localization migration required before production inclusion.

Classification:
NEEDS_CI, not PRODUCT_BLOCKED for the three result reaction identities.

### Deeper Forest routes

Hunter-trail unlock source and Old Boundary Token source/policy remain:
PRODUCT_BLOCKED.

Route/challenge/season narrative depth:
CONTENT_ONLY until selectively integrated.

## 7. Secret Debt

Status:
CONTENT_ONLY + PRODUCT_BLOCKED.

Chat3 authored wave has:
- lender offer bank;
- delayed activation bank;
- hidden-career work bank;
- forced-Night bank;
- paid_freedom;
- bound_life;
- takeover;
- machine-readable authored fixture;
- handoff.

The fixture is explicitly:
CONTENT_DRAFT_NOT_PRODUCTION

and:
productionCatalogIncluded = false.

Still Product-open:
- encounter probability;
- principal/debt values;
- activation delay;
- hidden-career wage/cost/stats/stages;
- School while bound;
- Activity while bound;
- forced-Night/lodging policy;
- outcome eligibility;
- Meta rewards.

Runtime state ownership/gating is not shipped.

Current main has no Secret Debt production pack/state.

Do not integrate the fixture into root catalog as mechanics.

Current RU+EN rule also requires localization migration before production conversion.

## 8. Bilingual RU+EN product lock

Current main now contains the direct Product decision:
- Russian source authoring;
- full English second locale;
- one gameplay/content identity;
- locale changes presentation/text only;
- no locale-specific mechanics/RNG/save identity.

Status for authoring:
GREEN_TO_INTEGRATE as authority.

Status for existing older English-only worker content:
CONTENT_ONLY until RU+EN migration/review.

Status for runtime localization implementation:
future integration seam must be reviewed independently; do not duplicate gameplay events per locale.

Active worker state at recent snapshot:
- Chat2 bilingual presentation wave progressing;
- Chat5 bilingual School wave progressing;
- Chat3 bilingual Forest/Secret Debt wave assigned.

## 9. Palace / Hard Work dependency

Current Meta runtime has the 10 ordinary-career Palace prerequisite rule.

But:
- only Lumber target Hard Work is authored;
- nine ordinary target Hard Work contracts remain missing;
- Palace production career/content remains absent.

Status:
PRODUCT_BLOCKED + CONTENT_ONLY.

Do not count Secret Debt outcomes.

## 10. Current next-integration matrix

| Stream | Classification | Main risk |
|---|---|---|
| PR37 poverty | GREEN_TO_INTEGRATE / merged | none in merged scope |
| PR38 School authored production | GREEN_TO_INTEGRATE / merged | exact-course routing still separate |
| PR39 Work UI | GREEN_TO_INTEGRATE / merged | per-career UI transaction depth |
| PR40 Lumber wage | GREEN_TO_INTEGRATE / merged | closed |
| multi-GIF runtime | RUNTIME_GAP | schema/selector/RNG/Save compatibility |
| Forest result pack | NEEDS_CI | stale worker fixture + RU/EN migration |
| Forest deeper route decisions | PRODUCT_BLOCKED | hunter/token source rules |
| Forest narrative depth | CONTENT_ONLY | selective integration/localization |
| Secret Debt authored content | CONTENT_ONLY | not production mechanics |
| Secret Debt mechanics | PRODUCT_BLOCKED | economy/gating/Night/outcomes |
| bilingual worker authoring | CONTENT_ONLY | selective integration/runtime locale seam |
| Palace/full 10 Hard Work | PRODUCT_BLOCKED | nine Hard Work contracts + Palace content |

## 11. Merge-risk order by change class

Low mechanical risk:
- docs/authoring inventories;
- bilingual text banks;
- presentation planning.

Moderate:
- production content packs using existing triggers;
- Forest result reactions after fresh-main adaptation.

High:
- multi-GIF shared presentation runtime;
- exact School course-routing public trigger;
- Secret Debt state/gating/Night mechanics.

Every non-doc integration still requires exact-head current-main CI.

## 12. Locked firewalls

Preserve:
- Lumber Hard Work = completed_shifts >= 50 only;
- hardWork:lumber;
- all ten ordinary Hard Work for Palace;
- Secret Debt contributes zero ordinary Hard Work;
- School paid vs Night progress ownership;
- Forest exact activityResult boundaries;
- locale never changes mechanics/RNG/save identity;
- media never drives gameplay effects/timing.

## Gate conclusion

Current merged production baseline through PR40:
GREEN.

Immediate content candidates:
CONTENT_ONLY / selective integration.

Forest result reaction pack:
NEEDS_CI + current-main adaptation + RU/EN migration.

Multi-GIF:
RUNTIME_GAP.

Secret Debt mechanics and selected Forest/Palace decisions:
PRODUCT_BLOCKED.

No production runtime/UI/content file was modified by Chat 4.
