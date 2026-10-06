# Chat 4 — D39 Source Method Independent Review v39

Status: **SAFE EXISTING INFORMATION-ONLY CONSUMER IDENTIFIED**  
Owner: Chat 4  
Branch: `chat4/d39-consumer-independent-resolution-v38`

## Scope

Independent review of the missing live consumer for automatic knowledge:

`palace.inner-truth.source-method`

Research/review only. No production runtime was changed. No full CI was run.

## 1. Product/runtime boundary

Accepted D39 authority allows Source Method only in scenes that are already legally reachable.

The consumer may expose:

- source provenance;
- direct vs reported observation;
- an already-latent contradiction;
- uncertainty/risk context;
- comparison between already-obtained facts.

It may not directly change:

- money;
- Energy;
- stats;
- Lust;
- inventory;
- career/relationship/School counters;
- stages;
- Activity state;
- Palace duties;
- ending eligibility.

It may not reveal inaccessible scenes or D49-reserved macro truth.

The existing runtime already supplies typed condition:

`strongMetaKnowledge`

and reads Source Method from the frozen current-run automatic knowledge snapshot.

No new runtime mechanic is needed.

## 2. Candidate audit

Several existing authored information scenes were reviewed.

### Rejected as preferred consumer: Hunter clue scenes

Examples:

- `hunter.clues.forest-trail`;
- `hunter.clues.lumber-truth`;
- `hunter.clues.tavern-rumour`;
- `hunter.clues.farm-sample`.

Their prose is strongly provenance-oriented, but their choices write Hunter-local career facts. They are therefore not the safest exact consumer for an information-only D39 branch.

### Rejected as preferred consumer: Tavern rumour progression

`tavern.information.rumour-route`

is semantically excellent for source checking, but its normal `record-route` choice writes:

`tavern.rumour-route-open`.

A Source Method variant could be presentation-only, but the event is still part of a progression write seam. A cleaner zero-write event exists.

## 3. Preferred existing consumer

Pack:

`content/packs/tavern-information.json`

Existing event:

`tavern.information.broker-index-y1`

Existing choice:

`read-hint`

This is the safest available seam because its current authored contract is already explicitly information-only.

Current event conditions are:

- `metaUnlock knowledge.tavern.broker-index == present`;
- calendar year == 1;
- Tavern career fact `traveler-rumour-known == present`.

Current choice:

`read-hint`

has:

`effects: []`

Current copy explicitly says the hint changes no fact and completes no prerequisite.

Therefore Source Method can be added without changing event reachability or mechanical state.

## 4. Preferred mapping

Keep the event's existing outer conditions exactly unchanged.

Add one higher-specificity authored variant:

Suggested stable variant ID:

`source-method-crosscheck`

Condition:

```json
{
  "kind": "strongMetaKnowledge",
  "knowledge": "palace.inner-truth.source-method",
  "present": true
}
```

The existing event remains reachable only when its original Broker Index/year/rumour conditions are already satisfied.

The new variant should only add source-method framing such as:

- distinguish the traveler's reported statement from direct observation;
- identify the Broker Index note as a secondary source;
- require an independent route confirmation before treating the report as fact;
- state which uncertainty remains unresolved.

It must not add a new answer about the world.

## 5. Exact no-write rule

Do not add any effect to:

`tavern.information.broker-index-y1.read-hint`

It must remain:

`effects: []`

Do not add:

- career facts;
- relationship facts;
- counters;
- world facts;
- stats/resources;
- items;
- stage transitions;
- ending markers.

The Source Method difference is only the selected variant/copy.

## 6. Capability declaration

The pack currently reads Meta unlock state because it checks:

`knowledge.tavern.broker-index`.

When the Source Method variant is authored, add the typed read capability:

`strongMetaKnowledge`

to the pack's existing Meta read capability list.

No new write capability is needed.

## 7. Why Year 1 is preferred

There are four existing zero-write Broker Index events:

- `tavern.information.broker-index-y1`;
- `tavern.information.broker-index-y2`;
- `tavern.information.broker-index-y3`;
- `tavern.information.broker-index-y4`.

Only one live consumer is required to make Source Method player-visible.

Year 1 is preferred because:

- every new life starts before the later-year variants;
- it is the earliest clean zero-write seam;
- it proves the content contract without duplicating four variants;
- later-year expansion remains optional content breadth, not a release requirement.

## 8. Baseline reachability must remain identical

Without Source Method:

- event eligibility is unchanged;
- default variant remains selected;
- `read-hint` remains available;
- no route/progression behavior changes.

With Source Method:

- the same already-legal event appears;
- `source-method-crosscheck` wins over the zero-condition default variant by normal specificity ordering;
- the same zero-effect `read-hint` closes the event;
- no gameplay state is advanced by the knowledge.

Source Method must not make the event appear if the player lacks:

- the Broker Index unlock;
- year-1 timing;
- `traveler-rumour-known`.

## 9. D49 lore firewall

The preferred event is local ordinary-career route-information content.

The new Source Method variant must not name or establish new facts about:

- the Palace Concordance;
- the Threshold Archive;
- the inter-world Threshold;
- the Prince/Custodian;
- the heroine's original displacement cause;
- final macro-mystery truth.

The copy should stay at the level of:

**who reported this, what was directly observed, what independent confirmation is still needed.**

That is safely below the D49 reveal boundary.

## 10. Stable IDs

Preferred exact mapping:

```text
knowledge:
  palace.inner-truth.source-method

pack:
  tavern-information.json

event:
  tavern.information.broker-index-y1

variant:
  source-method-crosscheck

choice:
  read-hint
```

No existing stable ID needs to be renamed.

## 11. Expected implementation files

Minimum authored delta:

1. `content/packs/tavern-information.json`
   - add Source Method variant;
   - add typed Meta knowledge read capability.
2. current localization source, if the project requires explicit localized text entries for the new variant.
3. focused tests.

No engine/schema/Strong-Meta runtime change is required.

No new presentation slot is required because the existing event ID is reused.

## 12. Required focused tests

Retain:

- `tests/palace-d39-reward-producer-v20.test.ts`;
- `tests/chat3-tavern-live-authored-v15.test.ts`;
- `tests/tavern-natural-acceptance.test.ts`;
- `tests/tavern-runtime.test.ts`.

Add focused assertions that:

1. without Source Method, baseline event conditions and default variant remain unchanged;
2. with Source Method but without Broker Index unlock -> event remains unreachable;
3. with Source Method + Broker Index but wrong year -> event remains unreachable;
4. with Source Method + all baseline conditions -> event ID remains exactly `tavern.information.broker-index-y1`;
5. selected variant becomes exactly `source-method-crosscheck`;
6. `read-hint.effects` remains exactly empty;
7. resources/stats/Lust/inventory are unchanged;
8. career/relationship counters and stages are unchanged;
9. ending eligibility is unchanged;
10. Activity/Palace/Secret-Debt state is unchanged;
11. save/reload preserves the pending variant snapshot normally;
12. authored Source Method copy contains no D49 macro reveal.

At implementation time also run:

- `npm run typecheck`;
- `npm run validate`;
- `npm run build`.

Full CI remains outside this review bundle.

## 13. Reject conditions

Reject the mapping if implementation:

- adds any effect to `read-hint`;
- removes/replaces the Broker Index prerequisite;
- changes year/rumour gates;
- exposes the event solely because Source Method exists;
- creates a career/world fact from the cross-check;
- reveals macro-lore beyond already-authored Tavern information;
- creates a generic global information bonus.

## Disposition

A safe existing consumer exists.

Preferred Source Method mapping:

**`tavern.information.broker-index-y1` -> new `source-method-crosscheck` variant, same zero-effect `read-hint` choice.**

This is provenance/cross-check only, preserves every existing gate, and requires no new mechanic.

**v39 COMPLETE — CONTINUE TO v40**
