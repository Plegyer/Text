# C2-215 — Assassin RU/EN accessibility and static-safety preparation

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation & Media
Production advanced Assassin IDs: NONE

## Required prep properties

The shipped Assassin presentation must preserve:
- project-owned static media;
- non-empty RU alt;
- non-empty EN alt;
- non-empty RU caption;
- non-empty EN caption;
- deterministic semantic identity;
- animation-off static resolution;
- missing optional motion fallback to static;
- zero presentation mutation of Save state.

## Shipped scope

Current production Assassin presentation remains exactly six semantic surfaces:
- `job/assassin/result/default`
- `job/assassin/shift/spring/default`
- `job/assassin/shift/summer/default`
- `job/assassin/shift/autumn/default`
- `job/assassin/shift/winter/default`
- `ending/assassin/hard-work`

All six already have project-owned static media and RU/EN alt/caption pairs.

## Motion boundary

The current project-owned animation source manifest contains no Assassin-specific sequence.

Therefore:
- no Assassin GIF/video path is claimed;
- no placeholder animation path is added;
- animation-off always resolves to shipped static media;
- a missing optional future motion candidate must fall through to static media through the existing media error/fallback path.

## Keyboard and focus

C2-215 adds no new focusable Assassin-specific UI.

It preserves the current shared accessibility infrastructure:
- visible `:focus-visible` outline for buttons/controls;
- panel focus transfer to the close control;
- existing accessible button semantics;
- media failure fallback without trapping keyboard focus.

Any future Assassin stage/relationship/item/status UI must add keyboard-reachable semantics and accessible naming only after exact runtime identities exist.

## Save-neutral presentation

Presentation resolution is descriptive only.

The prep regression snapshots a representative Save before resolving Assassin presentation and verifies the serialized Save is unchanged afterward.

Locale and media selection do not create:
- contract facts;
- target state;
- method state;
- relationship state;
- item grants;
- Activity state;
- ending readiness.

## Future-ID accessibility rule

Every future contract/method/relationship/item/Activity/cross-system/advanced-ending surface remains:
- `PENDING_RUNTIME_ID`

No accessibility key should silently legitimize a gameplay ID that runtime has not published.

When future runtime authority exists, final binding must require:
- exact runtime-backed semantic ID;
- RU/EN accessible naming;
- static fallback;
- deterministic identity;
- no Save mutation.

## Regression

`assassin-presentation-v19-prep-c2-205-215.test.ts` locks:
- exactly six shipped Assassin semantic surfaces;
- ordinary career remains only stage `runner`;
- only public ending remains `ending.assassin.hard-work`;
- RU/EN alt/caption parity;
- static source existence;
- deterministic animation-off resolution;
- Save-neutral presentation resolution;
- no relationship/Activity/Palace Assassin semantic binding;
- no Ghost / Handler Takeover / Turncoat ending binding;
- zero Assassin animation-source sequence;
- shared focus and missing-media fallback infrastructure.

## Firewall

C2-215 changes no gameplay condition/effect/reward, contract state, relationship state, item/capability behavior, Activity/NightFlow/School mechanics, Save/RNG, economy, ending eligibility/reward, Meta, Morality or Palace access.
