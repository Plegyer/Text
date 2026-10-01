# Chat 3 — Forest Authored Depth v13 Inventory

Base: frozen PR #162 exact head `86e6af0d4743a4b42bd23eec1f8ba89ab0f401f9`.

## C3-133 live depth inventory

At the frozen base, Forest mechanics are live but authored outcome depth is thin:

| Surface | Live base depth | Thin identity |
| --- | ---: | --- |
| route entry narrative | 3 route texts | one text per route; Hunter combines both live seasons |
| challenge outcome narrative | 0 dedicated texts | every challenge returns to the route paragraph |
| physical solution feedback | 0 dedicated texts | stat and capability solutions share the same visible state |
| interpretation/ritual feedback | 0 dedicated texts | Magic / Reason / School all collapse to one route paragraph |
| equipment-use feedback inside Activity | 0 dedicated texts | capability only changes availability |
| terminal result event | 1 variant per outcome | success / escape / failure each repeat one text |
| Lumber Forest return | 1 variant | city preparation is not acknowledged in copy |

The v13 implementation intentionally does **not** add gameplay IDs or a second Activity engine. Existing `ActivityEnvelope.checkpoint`, `routeId`, `lastRoll`, persisted Activity RNG, calendar season, stats, facts and item capabilities are enough for a presentation-only authored selector.

## Targeted live pools

v13 adds:
- 14 seasonal/route narrative variants (Logging 8, Hunter 4, Old Boundary 2);
- 46 challenge/solution narrative variants across navigation, physical obstacle, extraction and interpretation/ritual;
- 8 entry-preparation variants covering career survey, School notes, equipment and combined preparation;
- 8 specialized terminal variants plus four seasonal variants per outcome, while retaining each existing default;
- 6 Lumber-return acknowledgement variants on the existing event.

Selection is deterministic from persisted Activity state. No text selection changes progress, endurance, Energy, inventory, facts, item consumption, route gates or result effects.
