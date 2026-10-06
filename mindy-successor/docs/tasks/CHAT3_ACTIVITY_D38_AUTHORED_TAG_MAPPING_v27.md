# Chat 3 — Activity D38 Authored Tag Mapping v27

Status: **RESEARCH COMPLETE — READY FOR ACTIVITY ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/activity-d38-authored-tag-mapping-v27`

## Goal

Map existing accepted Activity content to the three D38 authored tags required by the accepted v26 reward producer:

- Surveyor's Atlas:
  `activity-survey-discovery`
- Field Archive:
  `activity-secure-eligible`
- Expedition Contact Network:
  `activity-network-introduction`

No new scenes are authored here.

No production tags are added here.

No runtime is modified here.

No full CI is run.

---

# 1. Accepted source anchors

Four-region Activity mechanics/content:

`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Accepted Forest pack repair:

`chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`

D38 reward producer:

`chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`

Primary authored option/result source:

`mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Forest post-return source:

`mindy-successor/prior-work/astra/prototype-m3.2/content/packs/forest-frontier-production.json@efde0a38bf71a8946194402a9fc47abb168f2aff`

Other post-return sources:

- `content/packs/trade-corridor-production.json@ab378d...`
- `content/packs/anomalous-reach-production.json@ab378d...`
- `content/packs/restricted-sites-production.json@ab378d...`

---

# 2. Assembly interpretation

Tags are **additive authored metadata**.

They must never remove existing baseline availability.

This matters most for Contact Network.

An existing tagged option must continue to work normally on its authored route for a player without Contact Network.

When the option is not normally available only because the current Activity route differs, Contact Network may expose that same authored option laterally if:

1. the region was already normally unlocked/entered;
2. all original non-route conditions still pass;
3. the option carries `activity-network-introduction`;
4. the region has not consumed its Contact Network use.

A normal baseline use on the option's own route must not consume the Specialist use.

Only the additional lateral use consumes it.

This preserves all accepted baseline D36/D38 reachability.

---

# 3. Surveyor's Atlas mapping

Tag:

`activity-survey-discovery`

## Mapping rule

Use one unambiguous existing survey/navigation action per region.

All four candidates:

- cost exactly 1 Field Time;
- already belong to a legal route;
- preserve their original stat/career/item/School gates;
- create no contact-thread, ending marker, result item, mini-game completion, or route shortcut fact;
- do not alter entry Energy;
- do not alter the baseline Field Time budget.

Do **not** tag route selectors themselves.

Do **not** tag mini-game completion actions.

Do **not** tag contact-opening detours.

## Forest Frontier

Source:

`content/definitions.json@ab378d...`

Stable option:

`forest.challenge.logging-navigation`

Label:

`Read the work marks`

Category:

`navigation`

Normal Field Time cost:

`1`

Original gate remains:

- Reason >=3;
  OR
- Lumber career fact `forest-route-surveyed`.

Route:

`logging-road`

Normal effect:

- +1 Activity progress;
- no authored world-fact side effect.

### Why it matches

This is an authored route-reading/navigation action.

It is the safest Forest survey/discovery target because it does not:

- open the Forest contact thread;
- complete Tracking Triangulation;
- add Pathfinder/Preservation/Network markers;
- create a result;
- bypass Old Boundary capability.

### Rejected Forest near-matches

Do not tag:

`forest.route.logging-road`

Reason:
route selection itself is not the survey action.

Do not tag:

`forest.detour.tracking-observe`

Reason:
it writes `forest.frontier.contact-thread-open` and begins the Tracking Triangulation sequence; making it the Atlas target would mix the survey reward with Network/minigame progression.

Do not tag:

`forest.tracking.complete`

Reason:
it completes the Tracking Triangulation authored chain.

## Trade Corridor

Source:

`content/definitions.json@ab378d...`

Stable option:

`trade.challenge.market-read-flow`

Label:

`Read the load flow`

Category:

`navigation`

Normal Field Time cost:

`1`

Original gate remains:

- Wits >=3;
  OR
- item capability `merchant_appraise_goods`.

Route:

`market-road`

Normal effect:

- +1 Activity progress;
- no world-fact side effect.

### Why it matches

It is direct route observation/navigation and reveals no additional contact/result/ending state.

### Rejected Trade near-matches

Do not tag:

`trade.route.market-road`
`trade.route.caravan-spur`
`trade.route.customs-lane`

Reason:
route selection is not itself the survey/discovery action.

Do not tag:

`trade.detour.tracking-observe`

Reason:
it writes `trade.corridor.route-signals-seen` and belongs to the Tracking Triangulation detour. The canonical Atlas mapping should not consume or alter the mini-game's authored observation chain.

Do not tag:

`trade.tracking.complete`

Reason:
it completes the mini-game family.

## Anomalous Reach

Source:

`content/definitions.json@ab378d...`

Stable option:

`anomaly.challenge.echo-survey`

Label:

`Survey the repeating marks`

Category:

`interpretation`

Normal Field Time cost:

`1`

Original gate remains any one of:

- Reason >=4;
- Literacy & Numbers paid lessons >=1;
- Arcana paid lessons >=1.

Route:

`echo-ridge`

Normal effect:

- +1 Activity progress;
- no world-fact side effect.

### Why it matches

This option is explicitly authored as a survey.

It does not resolve the Pattern/Ritual Circuit or publish a path marker/result.

### Rejected Anomalous near-matches

Do not tag:

`anomaly.detour.ritual-observe`

Reason:
it writes `anomalous.reach.pattern-observed` and is the first state transition of the Pattern/Ritual mini-game.

Do not tag:

`anomaly.ritual.resolve`

Reason:
it completes the mini-game family.

Do not tag:

`anomaly.challenge.rift-boundary-read`

Reason:
it writes route-specific anomaly state and sits behind the Old Boundary/Arcana route-prep seam; `echo-survey` is the narrower canonical survey target.

## Restricted Sites Network

Source:

`content/definitions.json@ab378d...`

Stable option:

`restricted.challenge.service-survey`

Label:

`Survey the service handoffs`

Category:

`observation`

Normal Field Time cost:

`1`

Original gate remains any one of:

- Wits >=5;
- item capability `assassin_concealed_entry`;
- one of:
  - Assassin fact `tavern-intel-known`;
  - `merchant-route-known`;
  - `guard-pressure-known`;
  - `handler-utility-ready`.

Route:

`service-ring`

Normal effect:

- +1 Activity progress;
- no world-fact side effect.

### Why it matches

This is explicitly authored as a service-route survey.

It does not:

- change Suspicion;
- complete Infiltration/Suspicion;
- create evidence;
- open the Handler thread;
- add a Pathfinder marker.

### Rejected Restricted near-matches

Do not tag:

`restricted.detour.infiltration-observe`

Reason:
it writes `restricted.sites.infiltration-observed` and begins the Infiltration/Suspicion chain.

Do not tag:

`restricted.infiltration.clean-handoff`

Reason:
it publishes the mini-game completion fact.

---

# 4. Field Archive mapping

Tag:

`activity-secure-eligible`

## Mapping rule

Tag the **carried result identity**, not:

- the Preservation marker;
- the Activity success result;
- a generic inventory item;
- a research-grade derived fact;
- every extraction-category option.

A result becomes carried only after one of its existing producer options succeeds normally.

All original option conditions remain authoritative.

Field Archive never creates the result.

## Forest Frontier

### No safe existing candidate

Do **not** create a Forest secure-eligible result.

Existing Forest extraction options:

- `forest.challenge.logging-preserve-sample`
- `forest.challenge.hunter-preserve-sample`
- `forest.challenge.boundary-preserve-sample`

only publish:

`activity.forest-frontier.mark.preservation`

They do not publish a distinct carried-result ID.

The generic success result:

`lumber.forest.success`

adds item:

`forest_preserved_specimen`

for successful completion generally, not specifically as the result of one authored extraction action.

Using that item as Field Archive input would broaden the reward to generic inventory and violate v25/v26.

Therefore:

**Forest Frontier: NO SAFE EXISTING `activity-secure-eligible` candidate.**

This is allowed. D38 caps are maxima, not a requirement that every region expose all three Specialist mechanics.

## Trade Corridor

Source:

`content/definitions.json@ab378d...`

Stable carried-result ID:

`activity.trade-corridor.result.sample-secured`

Producer option:

`trade.challenge.customs-secure-sample`

Label:

`Secure a cargo sample`

Original gates remain:

- one of:
  - `merchant_verify_manifest`;
  - `official_guard_access`;
  - `guard_sealed_pass`;
- AND item capability:
  `merchant_handle_samples`.

Route:

`customs-lane`

### Why it matches

The option explicitly secures a sample.

The result is already a typed D38 extraction fact.

Tagging the carried result does not bypass:

- Customs access;
- sample-handling capability;
- region entry;
- Activity success/failure mechanics.

Proposed tag target:

`activity.trade-corridor.result.sample-secured`

## Anomalous Reach

Source:

`content/definitions.json@ab378d...`

Stable carried-result ID:

`activity.anomalous-reach.result.sample-secured`

Existing producer option A:

`anomaly.challenge.basin-field-preserve`

Label:

`Preserve an anomalous residue`

Producer A gates remain:

- Preserved Basin preparation through one of:
  - `preserved_farm_sample`;
  - Undead Farm `sample-preserved`;
  - Undead Farm `school-research-ready`;
- AND `preserve_specimen`.

Existing producer option B:

`anomaly.challenge.basin-merchant-secure`

Label:

`Seal a field aliquot in the Merchant sample kit`

Producer B gates remain:

- same Preserved Basin preparation;
- AND `merchant_handle_samples`.

Route:

`preserved-basin`

### Why it matches

Both existing actions explicitly acquire the same typed sample result.

The tag belongs to the carried result ID, so either legal acquisition path may create the same secure-eligible carried result.

No capability or Farm/School preparation is waived.

Proposed tag target:

`activity.anomalous-reach.result.sample-secured`

## Restricted Sites Network

Source:

`content/definitions.json@ab378d...`

Stable carried-result ID:

`activity.restricted-sites.result.evidence-secured`

Existing producer A:

`restricted.infiltration.secure-evidence`

Gate remains:

`assassin_handle_evidence`

and the action still runs through the authored Infiltration/Suspicion route/state.

Existing producer B:

`restricted.challenge.annex-evidence`

Gates remain:

- Autumn or Winter;
- one of:
  - `assassin_sealed_access`;
  - `official_guard_access`;
  - `guard_sealed_pass`;
- AND `assassin_handle_evidence`.

Existing producer C:

`restricted.challenge.context-evidence`

Gates remain:

- one of:
  - `assassin_context_disguise`;
  - Etiquette & Presentation lessons >=2;
  - Etiquette & Presentation Night Study >=2;
- AND `assassin_handle_evidence`.

### Why it matches

All three legal paths explicitly acquire the same typed evidence result.

The carried-result tag does not waive:
- evidence handling;
- route prep;
- season;
- School preparation;
- region entry.

Proposed tag target:

`activity.restricted-sites.result.evidence-secured`

---

# 5. Field Archive targets that must stay untagged

Do not tag:

- `activity.*.mark.preservation`
- `activity.*.result.research-grade`
- `*.success`
- `forest_preserved_specimen`
- arbitrary inventory
- generic Activity accumulated rewards

Reason:

Field Archive protects a legally acquired carried field result.

Preservation markers and research-grade facts are derived progression signals, not carried results.

---

# 6. Contact Network mapping

Tag:

`activity-network-introduction`

## Critical assembly rule

The following options already exist in baseline Activity.

Tagging them must **not** make them Specialist-only.

Normal authored availability remains unchanged.

Contact Network uses the tag only to allow the same authored option as a **lateral route option when route alignment is the only missing Activity-routing requirement**.

The caller must still prove:

- region already normally entered;
- every original option condition passes;
- reward selected;
- region use not already consumed.

If an option is used normally on its own route:

- execute baseline behavior;
- do not consume Contact Network use.

If exposed laterally by Contact Network:

- execute the same authored option;
- then consume the region's one Contact Network use.

This is the narrow implementation that gives the Specialist real value without removing or duplicating baseline content.

## Forest Frontier

### No safe existing candidate

Forest has no Activity option that directly carries the accepted companion relationship gate.

The two thread-opening options are:

`forest.route.hunter-trail`

and:

`forest.detour.tracking-observe`

Both write:

`forest.frontier.contact-thread-open`

but neither checks the relationship:

`hunter.senior-guide`

The accepted relationship gate exists only later in:

`forest-frontier.production.companion-return`

Source:

`content/packs/forest-frontier-production.json@efde0a38...`

That event requires:

- Forest anchor;
- `forest.frontier.contact-thread-open`;
- relationship fact
  `hunter.senior-guide.companion-response-resolved`;
- relationship choice
  `companion-response = accepted`.

Its `share` choice publishes:

`activity.forest-frontier.mark.network`.

The post-return event is not an in-Activity lateral option.

Tagging either Forest thread-opening route/detour as a network introduction would conflate Contact Network with route selection or Tracking Triangulation before the actual relationship gate.

Therefore:

**Forest Frontier: NO SAFE EXISTING `activity-network-introduction` candidate.**

Do not synthesize a generic Forest introduction.

## Trade Corridor

Source:

`content/definitions.json@ab378d...`

Stable option:

`trade.challenge.market-supplier-contact`

Label:

`Check the route with the supplier contact`

Category:

`contact`

Route:

`market-road`

Normal Field Time cost:

`1`

Original relationship gates remain:

- `merchant.supplier`
  choice `utility-response = accepted`;
- relationship fact
  `utility-response-resolved`.

Normal effect:

`trade.corridor.contact-thread-open`

### Why it matches

This is already an authored contact route.

Contact Network may expose it laterally from another Trade route only when the existing Supplier relationship has already reached the accepted utility state.

It does not create or advance that relationship.

The accepted post-return event:

`trade-corridor.production.supplier-network`

still requires:

- Trade anchor;
- contact thread open;
- accepted/resolved Supplier relationship.

Only its normal `share` choice adds:

`activity.trade-corridor.mark.network`.

Therefore the Specialist does not auto-grant the D38 Network marker.

Proposed tag:

`trade.challenge.market-supplier-contact`

### Rejected duplicate

Do not additionally tag:

`trade.challenge.customs-supplier-contact`

Reason:

both options use the same Supplier relationship and open the same contact thread.

D38 authorizes one introduction per region/run.

Using the Market option as the canonical tagged lateral route avoids duplicate same-region introduction surfaces.

## Anomalous Reach

Source:

`content/definitions.json@ab378d...`

Stable option:

`anomaly.challenge.rift-keeper-contact`

Label:

`Use the Keeper's anomaly comparison`

Category:

`contact`

Route:

`old-boundary-rift`

Normal Field Time cost:

`1`

Original gates remain:

- Autumn or Winter;
- one of:
  - `enter_old_boundary`;
  - Arcana lessons >=3;
  - Arcana Night Study >=3;
- relationship fact:
  `undead-farm.keeper.request-resolved`;
- relationship choice:
  `request-response = accepted`.

Normal effects:

- `anomalous.reach.contact-thread-open`
- `activity.anomalous-reach.contact-thread-open`

### Why it matches

This is an existing authored Keeper contact option with explicit relationship and preparation gates.

Lateral exposure cannot:

- open Anomalous Reach before Year 2;
- bypass its normal region-entry prep;
- create the Keeper relationship;
- skip accepted request state;
- bypass season/Old Boundary/Arcana preparation.

The post-return event:

`anomalous-reach.production.keeper-network`

still requires the anchor, contact-thread fact, and accepted Keeper relationship before its `share` choice adds:

`activity.anomalous-reach.mark.network`.

Proposed tag:

`anomaly.challenge.rift-keeper-contact`

## Restricted Sites Network

Source:

`content/definitions.json@ab378d...`

Stable option:

`restricted.challenge.handler-handoff`

Label:

`Use the Handler's professional handoff`

Category:

`contact`

Route:

`service-ring`

Normal Field Time cost:

`1`

Original relationship gates remain:

- `assassin.handler.utility-response-resolved`;
- relationship choice
  `utility-response = accepted`.

Normal effects:

- `restricted.sites.contact-thread-open`
- `activity.restricted-sites.contact-thread-open`

### Why it matches

This is already an authored professional contact handoff.

The lateral Specialist path still requires normal Restricted Sites entry first.

Normal region entry remains:

- Year >=3;
- AND one accepted preparation:
  - Assassin infiltration-qualified;
  - concealed entry;
  - sealed access;
  - context disguise;
  - official Guard access;
  - Trade anchor;
  - Anomalous anchor.

The Handler option still requires the accepted/resolved Handler relationship.

The post-return event:

`restricted-sites.production.handler-network`

still requires anchor + contact thread + accepted Handler relationship before its `share` choice publishes:

`activity.restricted-sites.mark.network`.

Proposed tag:

`restricted.challenge.handler-handoff`

---

# 7. Region-entry firewall

Contact Network never replaces Activity entry conditions.

## Forest

Entry Energy remains exactly 2.

No separate region condition exists.

## Trade

Entry Energy remains exactly 2.

No separate region condition exists.

## Anomalous

Entry still requires:

- Year >=2;
- AND one of:
  - Arcana lesson;
  - Arcana Night Study;
  - Farm school-research-ready;
  - preserved Farm sample capability;
  - Forest anchor;
  - Trade anchor.

## Restricted

Entry still requires:

- Year >=3;
- AND one of:
  - Assassin infiltration-qualified;
  - Assassin concealed entry;
  - Assassin sealed access;
  - Assassin context disguise;
  - official Guard access;
  - Trade anchor;
  - Anomalous anchor.

No D38 tag changes these conditions.

---

# 8. Exact final mapping table

## Surveyor's Atlas

| Region | Stable option ID | Tag |
| --- | --- | --- |
| Forest Frontier | `forest.challenge.logging-navigation` | `activity-survey-discovery` |
| Trade Corridor | `trade.challenge.market-read-flow` | `activity-survey-discovery` |
| Anomalous Reach | `anomaly.challenge.echo-survey` | `activity-survey-discovery` |
| Restricted Sites | `restricted.challenge.service-survey` | `activity-survey-discovery` |

All four:
- normal FT cost =1;
- tag only after normal eligibility;
- Atlas changes only effective FT cost to 0 once/region/run.

## Field Archive

| Region | Stable carried-result ID | Tag |
| --- | --- | --- |
| Forest Frontier | **none** | no safe existing candidate |
| Trade Corridor | `activity.trade-corridor.result.sample-secured` | `activity-secure-eligible` |
| Anomalous Reach | `activity.anomalous-reach.result.sample-secured` | `activity-secure-eligible` |
| Restricted Sites | `activity.restricted-sites.result.evidence-secured` | `activity-secure-eligible` |

## Contact Network

| Region | Stable option ID | Tag |
| --- | --- | --- |
| Forest Frontier | **none** | no safe existing candidate |
| Trade Corridor | `trade.challenge.market-supplier-contact` | `activity-network-introduction` |
| Anomalous Reach | `anomaly.challenge.rift-keeper-contact` | `activity-network-introduction` |
| Restricted Sites | `restricted.challenge.handler-handoff` | `activity-network-introduction` |

---

# 9. Baseline Network marker events stay untagged

Do not use D38 Specialist tags on the post-return marker events:

- `forest-frontier.production.companion-return`
- `trade-corridor.production.supplier-network`
- `anomalous-reach.production.keeper-network`
- `restricted-sites.production.handler-network`

These events are baseline D38 ending-content machinery.

They remain available to players without Contact Network.

They are the authoritative relationship-gated route from contact-thread facts to regional Network markers.

Contact Network never directly publishes:

`activity.*.mark.network`.

---

# 10. Baseline Preservation markers stay untagged

Do not attach `activity-secure-eligible` to:

- `activity.forest-frontier.mark.preservation`
- `activity.trade-corridor.mark.preservation`
- `activity.anomalous-reach.mark.preservation`
- `activity.restricted-sites.mark.preservation`

Those are ending path markers.

Field Archive secures carried results, not ending markers.

---

# 11. Baseline Pathfinder markers stay untagged

Do not attach `activity-survey-discovery` to Pathfinder shortcut options merely because they are route-related.

Specifically keep untagged:

- `forest.shortcut.triangulated-line`
- `trade.shortcut.tracked-turn`
- `anomaly.shortcut.stabilized-fold`
- `restricted.shortcut.clean-route`
- `restricted.shortcut.annex-service-door`

These options publish Pathfinder markers or consume already-completed mini-game/preparation state.

Atlas must not make a Pathfinder marker action free merely by tag inference.

---

# 12. Chat 2 wiring rules

When applying these mappings to the cumulative Activity branch:

## Atlas

1. add `activity-survey-discovery` only to the four tabled options;
2. keep all current option conditions;
3. calculate effective FT cost only after eligibility;
4. consume Atlas use only after successful option commit;
5. do not change progressDelta/effects;
6. do not add tags to route selectors/shortcuts/mini-game completion.

## Archive

1. add secure-eligible metadata to the three tabled carried-result identities;
2. register carried result only after one of its existing producer options succeeds;
3. keep every producer condition;
4. on normal success retain normal result;
5. on escape/failure keep only if Archive actually secured it;
6. do not preserve generic inventory;
7. do not synthesize a Forest result.

## Contact Network

1. add the tag only to the three tabled contact options;
2. preserve normal baseline route availability;
3. if option is normally legal on current route, run baseline path and do not consume Specialist use;
4. only when current route differs may Contact Network attempt lateral exposure;
5. lateral exposure requires:
   - selected Contact Network;
   - normal region entry already completed;
   - every original option condition passing;
   - unused region charge;
6. after successful lateral commit, record that region used;
7. do not alter relationship facts/choices except the option's existing effects;
8. do not directly grant Network marker.

---

# 13. Required focused mapping QA during assembly

Add assertions that:

## Atlas

- exactly four authored options carry `activity-survey-discovery`;
- all four have normal FT cost exactly 1;
- none is category `route`, `shortcut`, `contact`, or a mini-game completion;
- original conditions are unchanged;
- no Atlas-tagged option publishes an ending marker/result/contact thread.

## Archive

- exactly three carried-result IDs are secure-eligible;
- Forest has none;
- every secure-eligible result has at least one existing legal producer;
- all listed producer capability/season/prep gates remain;
- no research-grade fact is secure-eligible;
- no inventory item is secure-eligible.

## Contact Network

- exactly three options carry `activity-network-introduction`;
- Forest has none;
- each tagged option is an existing contact option;
- Trade requires accepted/resolved Supplier relationship;
- Anomalous requires accepted/resolved Keeper relationship plus its existing season/prep gate;
- Restricted requires accepted/resolved Handler relationship;
- normal route use remains available without the Specialist;
- lateral use requires the Specialist;
- lateral use cannot happen before normal region entry;
- post-return network marker events remain unchanged.

---

# 14. No-safe-candidate summary

Two intentional holes remain:

1. Forest Field Archive:
   no distinct existing carried-result identity exists.

2. Forest Contact Network:
   no in-Activity option directly owns the accepted Senior Guide relationship gate.

These are not blockers.

v25/v26 explicitly allow:

- no secure-eligible result where authored content does not opt in;
- no synthetic Contact Network option where authored introduction does not exist.

Do not invent Forest content to force four-region symmetry.

The reward caps remain:

- max four Atlas uses;
- max four Archive uses;
- max four Contact Network uses;

but authored content may expose fewer usable regions.

---

# 15. Disposition

This mapping is complete and safe for selective Activity assembly.

It introduces no new scenes, no new region access, no capability bypass, no relationship bypass, no new ending facts, and no runtime behavior.

## Final mapping

- Atlas: 4 existing options
- Archive: 3 existing result IDs; Forest none
- Contact Network: 3 existing contact options; Forest none

**READY_FOR_ACTIVITY_ASSEMBLY**
