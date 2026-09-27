# Career Draft -> Presentation Intake Crosswalk v1

Purpose: make the handoff from career/content authoring to GIF/static production deterministic.

This crosswalk covers:
- 10 ordinary careers;
- Palace hidden/meta career;
- Secret Debt / Slave hidden career.

It identifies which authored content units must exist before Presentation can assign or finalize semantic IDs.

No missing content IDs are invented here.

## Required authoring units by career

For every career, Presentation needs the following authored units before final media binding.

### Repeatable work
Required:
- exact repeatable action/shift ID;
- exact result identity if results vary separately;
- meaningful authored variants such as season/stage only where they exist.

Presentation output after authoring:
- semantic work/shift presentation ID;
- result presentation ID where needed;
- reusable media group;
- static/text fallback.

### Milestones / career events
Required:
- exact event ID;
- exact variant ID;
- authored trigger meaning;
- authored choice/result context.

Presentation output:
- semantic event/variant presentation ID;
- event-specific or reused media mapping;
- fallback.

### Relationship / Night
Required:
- exact relationship event ID;
- exact Night event/variant ID;
- gameplay owner such as pendingScene / NightFlow;
- authored distinction between professional, social, forced or other context.

Presentation output:
- relationship/Night semantic identity;
- reusable relationship/Night media group;
- animations-off behavior.

### Endings
Required:
- exact ending ID;
- exact authored outcome family;
- commitment/completion identity.

Presentation output:
- `ending/<domain>/<ending>`-style semantic identity where consistent with final namespace;
- ending media/fallback;
- save identity owner.

### Optional Activity / item hooks
Required only when a dedicated visible scene exists:
- exact Activity result / continuation event ID;
- exact item/capability event identity;
- authored relationship between career and external system.

Presentation output:
- dedicated semantic identity for the visible scene;
- reuse/fallback mapping.

---

## Ordinary career 1 — Lumber

Current state:
- production semantic coverage already exists for shifts/results and several career/relationship/Night/ending surfaces.

Before additional presentation work is finalized, authors only need to provide any **new** exact:
- repeatable variant IDs;
- milestone/event IDs;
- relationship/Night IDs;
- ending IDs;
- Activity/item continuation IDs.

Presentation must not rename shipped Lumber IDs.

## Ordinary career 2 — Hunter

Draft exists, but final production content units are not fully authored.

Presentation waits for:
- repeatable hunter work/action IDs;
- result IDs where distinct;
- milestone/event IDs;
- recurring relationship/Night IDs;
- ending IDs;
- optional Forest/Activity/item hook IDs.

No final Hunter presentation namespace member should be guessed from the draft title alone.

## Ordinary career 3 — Tavern

Presentation waits for:
- repeatable tavern work/action IDs;
- guest/service result identities;
- milestone/event IDs;
- relationship/Night IDs;
- ending IDs;
- optional economy/item/Palace hook events.

Shared indoor-service GIFs may later be reused without sharing IDs.

## Ordinary career 4 — Guard

Presentation waits for:
- patrol/duty action IDs;
- result IDs;
- milestone/crisis IDs;
- relationship/Night IDs;
- ending IDs;
- optional Palace/Activity/item hook IDs.

A reusable patrol loop does not authorize a generic shared gameplay ID.

## Ordinary career 5 — Merchant

Presentation waits for:
- repeatable trade/logistics action IDs;
- distinct result identities;
- milestone/contract event IDs;
- relationship/Night IDs;
- ending IDs;
- optional poverty/School/item/career cross-hook IDs.

## Ordinary career 6 — Assassin

Presentation waits for:
- repeatable/contract action IDs;
- contract result IDs;
- milestone/event IDs;
- relationship/Night IDs;
- ending IDs;
- optional Palace/Activity/item hook IDs.

Stealth/preparation media may be reused, but event/contract semantics remain distinct.

## Ordinary career 7 — Prostitute

Presentation waits for:
- repeatable work/action IDs;
- distinct client/service result IDs;
- milestone/event IDs;
- relationship/Night IDs;
- ending IDs;
- optional poverty/School/item hooks.

No character identity or route content is inferred from the career label.

## Ordinary career 8 — Geisha / Artist

Presentation waits for:
- repeatable performance/work IDs;
- result IDs;
- milestone/performance event IDs;
- relationship/Night IDs;
- ending IDs;
- optional Palace/School/item hooks.

Performance media may be reused across authored semantic IDs.

## Ordinary career 9 — Satyr Maid

Presentation waits for:
- repeatable service/work IDs;
- result identities;
- milestone/event IDs;
- recurring guest/coworker/manager relationship IDs;
- voluntary Night IDs;
- ending IDs;
- optional School/item/poverty/Palace hook IDs.

Career draft depth does not equal production ID readiness.

## Ordinary career 10 — Undead Farm

Presentation waits for:
- repeatable farm/production action IDs;
- result/resource presentation identities where visible;
- anomaly/milestone event IDs;
- relationship/Night IDs;
- ending IDs;
- School/Merchant/Activity/item continuation IDs where dedicated scenes exist.

## Palace hidden/meta career

Presentation waits for:
- final Palace role/domain identity;
- repeatable assignment/work IDs;
- result IDs;
- court event/variant IDs;
- relationship/Night IDs;
- ending/outcome IDs;
- authored Meta/legacy-sensitive visible event IDs;
- optional item/School/Activity hook IDs.

Do not assign final Palace semantic IDs before the authoritative Palace gameplay/content domain is authored.

## Secret Debt / Slave hidden career

Presentation waits for exact authored IDs for:
- one-time lender offer;
- refusal/acceptance visible variants if distinct;
- delayed debt activation/reveal;
- hidden daytime work actions/results;
- forced Night obligation;
- career milestones/events;
- relationships where authored;
- paid_freedom;
- bound_life;
- takeover;
- optional item/School/Activity hooks.

Do not reuse ordinary street-sleep semantic identity for the lender offer or activation merely because the media setting may be shared.

## Intake readiness checklist

A career content unit is presentation-ready only when:
- [ ] source gameplay/content ID exists;
- [ ] source variant/outcome ID exists where applicable;
- [ ] owner subsystem is explicit;
- [ ] choices/effects are stable enough to brief presentation;
- [ ] save identity owner is known;
- [ ] unresolved Product decisions are either closed or explicitly listed;
- [ ] semantic presentation ID can be assigned without guessing;
- [ ] fallback meaning can be stated;
- [ ] reuse group can be selected without replacing gameplay identity.

## Handoff rule

Career authoring hands Presentation **content identity**, not filenames.

Presentation then supplies:
- semantic presentation identity;
- reusable media mapping;
- static/text fallback;
- animation-off behavior;
- replacement/rollback metadata.

This separation keeps GIF production from running ahead of unstable gameplay content.
