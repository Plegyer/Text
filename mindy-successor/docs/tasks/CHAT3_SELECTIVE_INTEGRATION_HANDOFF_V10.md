# Chat 3 Selective Integration Handoff v10

Status: C3-106 content handoff cleanup.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `6afc01061646bc52cec824863bf89e8ad8c309d0`.

Fixture: `prior-work/astra/prototype-m3.2/content/chat3-selective-integration-handoff-v10.fixture.json`.

Forest continuity v5 and Forest aftermath v5 remain preparation-only. They use exact current route/result/event identities, but an approved shared presentation/content selector is still required before those source strings can become player-facing. Current production Forest copy remains fallback.

Ordinary-poverty continuity v5 is consumer-ready through the existing `povertyPendingLocalizationKey(eventId, variantId, showCount)` seam. Selective integration may publish chosen RU/EN keys and append exact event/variant mappings without adding a new gameplay capability.

Small-job post-choice prose remains mixed: the four single-variant event results are identity-safe, while `market-closing` and `late-shade` under `poverty-street-production-v2.helpful-summer-shade` remain preparation-only because the result renderer only sees `eventId + choiceId`.

Secret Debt remains independent from ordinary poverty, and all exact Secret Debt Product values remain open.

C3-97 duplicate audit output was cleaned up; no stale alias is introduced by this handoff. No production runtime/UI/localization/presentation/pack file is modified.
