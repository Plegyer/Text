# C2-227 — Prostitute RU/EN accessibility and static-safety preparation

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Production future Prostitute IDs: NONE

## Required prep properties

The shipped voluntary Prostitute presentation must preserve:
- project-owned static media;
- non-empty RU alt;
- non-empty EN alt;
- non-empty RU caption;
- non-empty EN caption;
- deterministic semantic identity;
- animation-off static resolution;
- missing optional motion fallback to static;
- keyboard/focus accessibility;
- zero presentation mutation of Save state.

## Shipped scope

Current production presentation remains exactly six semantic surfaces:
- `job/prostitute/result/default`
- `job/prostitute/shift/spring/default`
- `job/prostitute/shift/summer/default`
- `job/prostitute/shift/autumn/default`
- `job/prostitute/shift/winter/default`
- `ending/prostitute/hard-work`

All six already have project-owned static media and RU/EN alt/caption pairs.

## Motion boundary

The current project-owned animation source manifest contains no Prostitute-specific or adult-only production sequence.

Therefore:
- no Prostitute GIF/video path is production-bound;
- no adult/intimacy motion path is production-bound;
- shopping-list filenames remain planning aids;
- animation-off always resolves to shipped static media;
- a missing optional future motion candidate must fall through to static media through the existing media error/fallback path.

## Adult-content accessibility boundary

Future adult/intimacy presentation requires exact adult-only runtime/content authority.

Accessibility text must:
- describe the visible adult professional context neutrally;
- avoid inferring romance from client familiarity;
- avoid treating confidence/presentation as consent;
- distinguish voluntary Prostitute content from Secret Debt forced context;
- remain tied to the exact future semantic consumer.

C2-227 does not add production accessibility keys for unbound adult/client/Night/route concepts.

## Keyboard and focus

C2-227 adds no new Prostitute-specific focusable UI.

It preserves the current shared infrastructure:
- visible `:focus-visible` outline for buttons/controls;
- focus transfer to panel close control;
- native button semantics;
- media-failure fallback without trapping keyboard focus.

Any future client/relationship/Night/route UI must add exact accessible naming only after the corresponding runtime identities exist.

## Save-neutral presentation

Presentation resolution is descriptive only.

The prep regression snapshots a representative Save before resolving all six shipped Prostitute presentation surfaces and verifies the serialized Save is unchanged afterward.

Locale/media resolution must not create:
- client state;
- relationship state;
- consent state;
- adult-routing state;
- Night state;
- item grants;
- route readiness;
- Secret Debt state;
- ending readiness.

## Future-ID accessibility rule

All future:
- adult/intimacy;
- client-flow;
- recurring-client / elite-client / relationship;
- Night;
- item/capability;
- School-reactive;
- late-route;
- advanced-ending
surfaces remain:
- `PENDING_RUNTIME_ID`

No accessibility key should legitimize a gameplay/presentation identity that runtime/content authority has not published.

## Regression

`prostitute-presentation-v20-prep-c2-217-227.test.ts` locks:
- exactly six shipped Prostitute semantic surfaces;
- ordinary career remains only stage `new-independent-worker`;
- only public Prostitute ending remains `ending.prostitute.hard-work`;
- RU/EN alt/caption parity;
- static source existence;
- deterministic animation-off resolution;
- Save-neutral presentation resolution;
- no relationship/Night/Activity/Palace Prostitute semantic binding;
- no Independent House / Elite Clientele / Network-Protection ending binding;
- zero Prostitute/adult animation-source sequence;
- shared focus and missing-media fallback infrastructure.

## Firewall

C2-227 changes no gameplay condition/effect/reward, career/client/relationship/consent state, adult router, item/capability behavior, NightFlow, School, Secret Debt, Save/RNG, economy, ending eligibility/reward, Meta or Palace access.
