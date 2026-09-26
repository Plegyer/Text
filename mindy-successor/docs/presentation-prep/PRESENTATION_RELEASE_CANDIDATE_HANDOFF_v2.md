# Presentation Release Candidate Handoff v2

Status: post-PR21 minimal integration map for Chat 2 presentation work.

Main baseline: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`.

Product Acceptance is still PARTIAL / NOT CLOSED, but the remaining gate blockers are gameplay/content authoring gaps rather than demonstrated presentation-runtime defects.

The authoritative exact-file classification is:

`prior-work/astra/prototype-m3.2/content/presentation-release-candidate-handoff.fixture.json`

## READY_TO_INTEGRATE_NOW

This class contains the smallest current presentation QA/contract surface with direct value on shipped main:

- semantic-ID drift protection;
- current/future asset integrity;
- PA visible checkpoint identity;
- fallback exhaustion and graph rejection;
- media path security;
- deterministic replacement ordering;
- accessibility metadata;
- single central-stage interaction ownership;
- shipped static fallback integrity;
- replacement-vs-shipped-catalog conflict preflight;
- post-PR21 presentation smoke.

These artifacts do not require runtime/UI changes and do not invent gameplay authoring.

## QA_EVIDENCE_ONLY

Keep as human/audit evidence rather than making each item a mandatory build dependency:

- release readiness summary;
- shipped-main delta map and machine-readable comparison;
- PA closure dependency audit.

These explain why historical pre-activation blockers should not be reopened and why PR21's remaining blockers are not current presentation blockers.

## FUTURE_GIF_ASSET_WORK

The replacement-bundle, drop-in regression, import/export and migration artifacts remain valuable for later media replacement productization.

They are not required to close today's static-backed presentation path. Planned GIF targets can remain absent because shipped static fallbacks are valid and semantic identity is media-independent.

## BLOCKED_BY_GAMEPLAY_AUTHORING

No Chat 2 presentation file is currently blocked in a way that should hold integration.

The PA closure dependency audit records the remaining gameplay/content blockers, including Old Boundary Token acquisition/use, School management/accounting public result, deeper Forest product depth, and item-driven Activity action-space behavior.

Presentation is either independent of those mechanics or ready to display authored results once they exist. Therefore this handoff class is intentionally empty.

## SUPERSEDED

Do not integrate duplicate historical layers when newer PR21-aware equivalents exist:

- integration handoff v1 -> superseded by v2;
- production smoke -> superseded by post-PR21 smoke;
- broad PA scenario matrix -> superseded by PA checkpoint matrix plus post-PR21 smoke;
- shipped closure inventory -> superseded by shipped-main delta and fallback asset integrity.

The files remain useful branch history but add redundant maintenance if integrated alongside the newer artifacts.

## Minimal Lead integration order

1. semantic drift + asset/path integrity;
2. fallback exhaustion + central-stage interaction;
3. PA checkpoints + post-PR21 smoke;
4. accessibility metadata;
5. replacement conflict/ordering safety.

QA evidence can be retained separately. Future GIF workflow contracts can wait until replacement assets or import/export product work is scheduled.

## Runtime recommendation

No shared presentation runtime/schema/UI change is recommended from current evidence.

If a new integrated test demonstrates a concrete presentation blocker, address that exact blocker against current main rather than reviving historical pre-PR20 assumptions.
