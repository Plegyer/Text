# Presentation PR22 Delta Audit v1

Current-main evidence reviewed against Product Acceptance closure PR #22.

## PR22 presentation impact

PR22 changes the **gameplay Activity option model**, not the central presentation runtime.

Shipped gameplay facts now are:

- Forest entry has no token capability condition.
- `forest.route.logging-road` is a normal, unconditional route option.
- `forest.route.old-boundary` is gated by typed item capability `enter_old_boundary`.
- new option-aware active Activity saves use `optionModelVersion = 1`, `routeId`, and `resolvedOptionIds`;
- pre-option active saves migrate to `optionModelVersion = 0` and preserve legacy immediate `advance` / `escape`;
- route option identity survives save/reload;
- item capability changes available Activity actions, not presentation mechanics.

## Semantic presentation classification

### Already shipped

The current presentation registry already provides:

- `activity/forest/route/default`;
- `activity/forest/return/success`;
- `activity/forest/return/escape`;
- `activity/forest/return/failure`.

All four are static-backed through the shipped Forest stage and remain valid after PR22.

PR22 does not invalidate the generic route slot. It remains the safe current presentation identity for legacy saves and for option-aware Activity states until more specific route/challenge slots are authored.

### Needs new route/option presentation families

The gameplay option model now exposes enough stable product meaning to define presentation **families** for:

- logging road;
- old boundary;
- hunter trail when authored;
- navigation challenge;
- physical obstacle;
- interpretation / ritual anomaly.

These are semantic families only. Final presentation IDs, event IDs, lore, variants, and media assets are not invented by this audit.

The family contract should fall back to `activity/forest/route/default`.

### Still OPEN content authoring

The following remain authoring gaps rather than presentation-runtime defects:

- Old Boundary Token acquisition source;
- Old Boundary retain/consume policy;
- hunter-trail gameplay route;
- full three-route depth;
- full three-challenge-family depth;
- season-specific Forest content/lore.

Presentation may prepare stable families and fallback rules, but cannot declare these gameplay rows closed.

## Save compatibility

Legacy `optionModelVersion = 0` Activity saves must keep their old action behavior and the generic Forest route presentation.

New `optionModelVersion = 1` saves may carry authored route state. Presentation derivation may become more specific later, but it must remain deterministic from saved gameplay identity and must never require animation frame/time state.

## Runtime recommendation

No shared presentation runtime/UI/catalog edit is requested here.

Current generic Forest route/result slots are sufficient for safe display. Route/challenge-specific presentation families can be introduced separately when their authoring is ready.
