# Chat3 post-PR45 text and Forest route QA v1

Status: COMPLETE / MIXED_SELECTIVE_SOURCE

Reviewed Chat 3 items:
`185–208`
on `chat3/lumber-production-proof-next`.

Current worker head during audit:
`bd4b3937be70fac30760352fab3c44c9d6f6087b`.

## Poverty copyedit

Initial item-185 delta:
- 36 existing localization keys;
- text-only;
- no new key IDs;
- no gameplay fields;
- Secret Debt excluded.

Production-readiness refinement then excludes three context-sensitive replacements.

Final item-198 delta:
- 33 existing current keys;
- missing RU: 0;
- missing EN: 0;
- no additions/deletions/renames;
- no gameplay IDs/mechanics.

Classification:
`SAFE_TEXT_PATCH`
subject to fresh integration-head collision check and exact-head CI.

## Shared Night/lodging text

Final item-202 fixture:
- 20 RU+EN presentation strings;
- missing RU: 0;
- missing EN: 0;
- text only.

Classification:
`SHARED_UI_REQUIRED`.

It must not alter:
- NightFlow phases;
- lodging IDs/costs;
- housing values;
- Energy deltas;
- Save.

Lead must wire the existing hardcoded Night/lodging surfaces to localization with fallback.

## Forest current gameplay identity

Authoritative current routes remain:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Persisted route-state values remain:
- `logging-road`;
- `old-boundary`.

Old Boundary gate remains:
`itemCapability(enter_old_boundary)`.

Exact Forest results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Hard Work remains only:
`completed_shifts >= 50`
with reward:
`hardWork:lumber`.

## Route presentation sources

Chat 3 prepares presentation-only route IDs:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Important:
these are not current-main presentation slots yet.

Current UI still uses:
`activity/forest/route/default`.

Therefore route-specific text/media sources are:
`SAFE_PRESENTATION_SOURCE / SHARED_PRESENTATION_WIRING_REQUIRED`.

They must not be root-activated until Lead ships a route-state -> presentationId seam.

## Route natural-path/test evidence

Worker tests are authored to protect:
- exact route option IDs;
- exact Activity ID;
- RNG/Save invariance;
- exact result identities;
- exact activityResult continuation;
- no Hunter route;
- no token semantic changes;
- Hard Work lock.

These are valuable selective test sources but not current-main CI evidence.

## Product-open isolation

Still unresolved:
- Hunter route;
- Old Boundary token acquisition/consume/retain/turn-in;
- challenge thresholds/rewards;
- School Arcana public provider/result;
- seasonal mechanical topology;
- deeper lore outcomes.

No Chat 3 text source approves those mechanics.

## Compatibility issue: route altKey naming

Item-206 media fixture currently uses localization keys such as:
`presentation.activity/forest/route/logging-road.alt`.

Lead's new optional presentation `altKey` schema accepts:
`^[a-z0-9][a-z0-9._-]*$`

and therefore does **not** accept `/` characters.

If item-206 keys are consumed through the Lead altKey field, they must first be renamed to a schema-compatible locale-neutral convention, for example:
`presentation.activity.forest.route.logging-road.alt`.

This is presentation-key normalization only; it must not rename gameplay or presentation IDs.

Classification for item 206 as currently written:
`NEEDS_ALTKEY_NORMALIZATION_BEFORE_LEAD_ALTKEY_INTEGRATION`.

## Verdict

- poverty final 33-key delta: `SAFE_TEXT_PATCH`;
- shared Night/lodging 20-key fixture: `SHARED_UI_REQUIRED`;
- Forest route prose/tests: `SAFE_PRESENTATION_SOURCE`;
- route-specific production binding: `SHARED_PRESENTATION_WIRING_REQUIRED`;
- route media altKey fixture: `NEEDS_KEY_NORMALIZATION`;
- Hunter/Old Boundary deeper mechanics: `PRODUCT_OPEN`.

No gameplay approval is granted by this QA.
