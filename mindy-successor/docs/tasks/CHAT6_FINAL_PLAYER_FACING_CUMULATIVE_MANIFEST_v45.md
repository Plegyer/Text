# Chat 6 — Final Player-Facing Cumulative Manifest v45

Status: **COMPLETE — INPUT TO v46/v47**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-cumulative-v45`  
Date: 2026-10-06

This is the cumulative merge-by-key / merge-by-slot / patch-by-hunk manifest for all accepted Chat 6 player-facing layers named by the v45 task. It is a composition contract only. No runtime, mechanics, save schema, reward semantics, or presentation routing is changed by v45.

## 1. Accepted authorities

| Layer | Frozen producer / authority | Frozen data source |
|---|---|---|
| v29 generic captions | `e9f0805068a8144a3b3cebaf07803b7090732bfd` | localization `75df2ed68b5cbf0a451e33d81e060ee5a3360d10` |
| v31 retired Tavern cleanup | `b37551d567d8017dbc25b87d66034af3e9c7a812` | localization `d95d3e16b64d60e246f5923e2d0fc7840ddc8c04` |
| v32 cumulative localization/presentation packet | task seed `43eac0d3b1fdbcbd3ac080e3f70466410b6625a1`; packet blob `7e04fdc8c768a879a0eb4eba1a35f7052072a075` | source matrix below |
| v36 Activity Network copy correction | `2f8f291a7e03bcf1677d6f51feaec28fe98e29ba` | localization `d631544c96c724375ac48d3c563dd1c1865bb5b5` |
| v40 player-facing localization repair | `2eca98265ed91f1fd3c62a2d2d2be9504feab075` | localization `4626e55203cda0d841a04eaf781db7879781138c` |
| v42/v43 Strong Meta selector + modal ARIA | implementation head `fac645878ebd726f50fd1364ac72414796755a2d` | app blob `43a3fdcd7a3a4cabb2ab84777feb9bb826cbdeb7`; localization `bb8143eb836ca7be3a841ad6aeac8a106f751e28` |

v32 frozen source matrix retained verbatim by authority:

- v26 localization `b355f08650cc1cdbb0d08e07529382c1afb0605c`, predecessor `65568847f09df4997fffc6facb7dc7907a10c872`
- v27 localization `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`, predecessor `65568847f09df4997fffc6facb7dc7907a10c872`
- D42 localization `9281d3880d01c54f352effa5e372ad5393cc3eaa`, predecessor `65568847f09df4997fffc6facb7dc7907a10c872`
- Activity v17 localization `4449ca46ad6580ca5f36adf140e9e1e14a007b64`, predecessor `c68f8eed960371c987f1ec79a6f219b6a5ffc8b5`
- Palace v19 localization `64922de3b6aab606f9b2932853e6bbd686766b6a`, predecessor `7f7d976fc686a599abe3917018925ba0b85e1885`
- D42 presentation `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`, predecessor `2adff5582cb9cf9c755b952c35fafb7e0ae6702b`
- Activity presentation `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`, predecessor `83ce718fd324552b687342cd34707d62da8572fd`
- Palace presentation `02c9a19eee0366131f793ed9e141b33a93f213b3`, predecessor `83ce718fd324552b687342cd34707d62da8572fd`
- global presentation v23 `defe52fe665831a7194e4b7d0df99ae28588207c`, predecessor `83ce718fd324552b687342cd34707d62da8572fd`

## 2. Cumulative accounting

Machine comparison of the frozen blobs gives:

- v32 localization: 295 upsert operations = 214 adds + 81 replacements, plus 12 deletes;
- v36: 1 later final-value replacement of a key already introduced by Activity v17;
- v40: 21 additive localization keys;
- v42/v43: 14 additive localization keys;
- cumulative unique localization upsert targets: **330**;
- cumulative localization operation count including the v36 later override: **331**;
- cumulative localization deletes: **12**;
- cumulative presentation slot additions: **127**;
- cumulative presentation slot replacements/deletes: **0**.

Cross-layer mutating-key collision analysis found exactly one intentional overlap:

`ending.ending.activity.network.epilogue`: Activity v17 -> v36 final override.

No other localization mutating-key overlap exists among v26, v27, D42, Activity v17, Palace v19, v29, v31, v36, v40, and v42/v43. The accepted presentation layers have no target-slot collision.

## 3. Exact localization manifest

### v26 ordinary-ending closure
Source: `b355f08650cc1cdbb0d08e07529382c1afb0605c`  
Predecessor: `65568847f09df4997fffc6facb7dc7907a10c872`  
Operations: 70 add, 9 replace, 6 delete.

**ADD**
- `ending.ending.artist-geisha.court-invitation.description`
- `ending.ending.artist-geisha.court-invitation.epilogue`
- `ending.ending.artist-geisha.court-invitation.title`
- `ending.ending.artist-geisha.hard-work.epilogue`
- `ending.ending.artist-geisha.master-artist.description`
- `ending.ending.artist-geisha.master-artist.epilogue`
- `ending.ending.artist-geisha.master-artist.title`
- `ending.ending.artist-geisha.patron-network.description`
- `ending.ending.artist-geisha.patron-network.epilogue`
- `ending.ending.artist-geisha.patron-network.title`
- `ending.ending.assassin.ghost.description`
- `ending.ending.assassin.ghost.epilogue`
- `ending.ending.assassin.ghost.title`
- `ending.ending.assassin.handler-takeover.description`
- `ending.ending.assassin.handler-takeover.epilogue`
- `ending.ending.assassin.handler-takeover.title`
- `ending.ending.assassin.hard-work.epilogue`
- `ending.ending.assassin.refusal-turncoat.description`
- `ending.ending.assassin.refusal-turncoat.epilogue`
- `ending.ending.assassin.refusal-turncoat.title`
- `ending.ending.guard.hard-work.epilogue`
- `ending.ending.guard.major-case.description`
- `ending.ending.guard.major-case.epilogue`
- `ending.ending.guard.major-case.title`
- `ending.ending.guard.network.description`
- `ending.ending.guard.network.epilogue`
- `ending.ending.guard.network.title`
- `ending.ending.guard.officer.description`
- `ending.ending.guard.officer.epilogue`
- `ending.ending.guard.officer.title`
- `ending.ending.guard.reform.description`
- `ending.ending.guard.reform.epilogue`
- `ending.ending.guard.reform.title`
- `ending.ending.hunter.hard-work.epilogue`
- `ending.ending.hunter.legend.epilogue`
- `ending.ending.hunter.master-hunter.epilogue`
- `ending.ending.hunter.warden.epilogue`
- `ending.ending.lumber.forest.epilogue`
- `ending.ending.lumber.forewoman.epilogue`
- `ending.ending.lumber.hard-work.epilogue`
- `ending.ending.merchant.hard-work.epilogue`
- `ending.ending.merchant.house.description`
- `ending.ending.merchant.house.epilogue`
- `ending.ending.merchant.house.title`
- `ending.ending.merchant.patron-of-routes.description`
- `ending.ending.merchant.patron-of-routes.epilogue`
- `ending.ending.merchant.patron-of-routes.title`
- `ending.ending.merchant.speculator-smuggler.description`
- `ending.ending.merchant.speculator-smuggler.epilogue`
- `ending.ending.merchant.speculator-smuggler.title`
- `ending.ending.prostitute.elite-clientele.description`
- `ending.ending.prostitute.elite-clientele.epilogue`
- `ending.ending.prostitute.elite-clientele.title`
- `ending.ending.prostitute.hard-work.epilogue`
- `ending.ending.prostitute.independent-house.description`
- `ending.ending.prostitute.independent-house.epilogue`
- `ending.ending.prostitute.independent-house.title`
- `ending.ending.prostitute.network-protection.description`
- `ending.ending.prostitute.network-protection.epilogue`
- `ending.ending.prostitute.network-protection.title`
- `ending.ending.satyr-maid.hard-work.epilogue`
- `ending.ending.satyr-maid.personal-network.epilogue`
- `ending.ending.tavern.hard-work.epilogue`
- `ending.ending.tavern.information-broker.epilogue`
- `ending.ending.tavern.innkeeper.epilogue`
- `ending.ending.tavern.sanctuary.epilogue`
- `ending.ending.undead-farm.external-anomaly.epilogue`
- `ending.ending.undead-farm.hard-work.epilogue`
- `ending.guild-life.epilogue`
- `ending.scholar-life.epilogue`

**REPLACE**
- `event.merchant.career.choose-route.choice.speculator-smuggler.text`
- `event.merchant.career.choose-route.choice.veteran.text`
- `event.merchant.items.appraisal-scales.choice.defer.text`
- `event.merchant.items.manifest-case.choice.defer.text`
- `event.merchant.items.sample-kit.choice.defer.text`
- `event.merchant.relationship.trust.choice.continue.text`
- `event.merchant.routes.house-ready.choice.record.text`
- `event.merchant.routes.patron-ready.choice.record.text`
- `event.merchant.routes.speculator-ready.choice.record.text`

**DELETE**
- `ending.artist-geisha.hard-work.description`
- `ending.artist-geisha.hard-work.epilogue`
- `ending.artist-geisha.hard-work.title`
- `ending.merchant.hard-work.description`
- `ending.merchant.hard-work.epilogue`
- `ending.merchant.hard-work.title`


### v27 Secret Debt ending localization
Source: `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`  
Predecessor: `65568847f09df4997fffc6facb7dc7907a10c872`  
Operations: 9 add, 0 replace, 0 delete.

**ADD**
- `ending.ending.secret-debt.bound-life.description`
- `ending.ending.secret-debt.bound-life.epilogue`
- `ending.ending.secret-debt.bound-life.title`
- `ending.ending.secret-debt.paid-freedom.description`
- `ending.ending.secret-debt.paid-freedom.epilogue`
- `ending.ending.secret-debt.paid-freedom.title`
- `ending.ending.secret-debt.takeover.description`
- `ending.ending.secret-debt.takeover.epilogue`
- `ending.ending.secret-debt.takeover.title`

**REPLACE**
- none

**DELETE**
- none


### D42 Night localization
Source: `9281d3880d01c54f352effa5e372ad5393cc3eaa`  
Predecessor: `65568847f09df4997fffc6facb7dc7907a10c872`  
Operations: 110 add, 0 replace, 0 delete.

**ADD**
- `event.assassin.night.handler-contact.choice.continue.label`
- `event.assassin.night.handler-contact.choice.continue.text`
- `event.assassin.night.handler-contact.title`
- `event.assassin.night.handler-contact.variant.default.text`
- `event.guard.night.case-debrief.choice.continue.label`
- `event.guard.night.case-debrief.choice.continue.text`
- `event.guard.night.case-debrief.title`
- `event.guard.night.case-debrief.variant.default.text`
- `event.guard.night.partner.choice.continue.label`
- `event.guard.night.partner.choice.continue.text`
- `event.guard.night.partner.title`
- `event.guard.night.partner.variant.default.text`
- `event.hunter.night.field-debrief.choice.continue.label`
- `event.hunter.night.field-debrief.choice.continue.text`
- `event.hunter.night.field-debrief.title`
- `event.hunter.night.field-debrief.variant.default.text`
- `event.hunter.night.senior-guide.choice.continue.label`
- `event.hunter.night.senior-guide.choice.continue.text`
- `event.hunter.night.senior-guide.title`
- `event.hunter.night.senior-guide.variant.default.text`
- `event.lumber.night.foreman-social.choice.continue.label`
- `event.lumber.night.foreman-social.choice.continue.text`
- `event.lumber.night.foreman-social.title`
- `event.lumber.night.foreman-social.variant.default.text`
- `event.merchant.night.ledger-plan.choice.continue.label`
- `event.merchant.night.ledger-plan.choice.continue.text`
- `event.merchant.night.ledger-plan.title`
- `event.merchant.night.ledger-plan.variant.default.text`
- `event.merchant.night.supplier.choice.continue.label`
- `event.merchant.night.supplier.choice.continue.text`
- `event.merchant.night.supplier.title`
- `event.merchant.night.supplier.variant.default.text`
- `event.prostitute.night.client-private.choice.continue.label`
- `event.prostitute.night.client-private.choice.continue.text`
- `event.prostitute.night.client-private.title`
- `event.prostitute.night.client-private.variant.default.text`
- `event.prostitute.night.personal-continuation.choice.continue.label`
- `event.prostitute.night.personal-continuation.choice.continue.text`
- `event.prostitute.night.personal-continuation.title`
- `event.prostitute.night.personal-continuation.variant.default.text`
- `event.satyr-maid.night.recurring-guest-private.choice.continue.label`
- `event.satyr-maid.night.recurring-guest-private.choice.continue.text`
- `event.satyr-maid.night.recurring-guest-private.title`
- `event.satyr-maid.night.recurring-guest-private.variant.default.text`
- `event.tavern.night.traveler-private.choice.continue.label`
- `event.tavern.night.traveler-private.choice.continue.text`
- `event.tavern.night.traveler-private.title`
- `event.tavern.night.traveler-private.variant.default.text`
- `night.assassin.handler-contact.aria`
- `night.assassin.handler-contact.body`
- `night.assassin.handler-contact.label`
- `night.guard.case-debrief.aria`
- `night.guard.case-debrief.body`
- `night.guard.case-debrief.label`
- `night.guard.partner.aria`
- `night.guard.partner.body`
- `night.guard.partner.label`
- `night.hunter.field-debrief.aria`
- `night.hunter.field-debrief.body`
- `night.hunter.field-debrief.label`
- `night.hunter.senior-guide.aria`
- `night.hunter.senior-guide.body`
- `night.hunter.senior-guide.label`
- `night.lumber.foreman-social.aria`
- `night.lumber.foreman-social.body`
- `night.lumber.foreman-social.label`
- `night.merchant.ledger-plan.aria`
- `night.merchant.ledger-plan.body`
- `night.merchant.ledger-plan.label`
- `night.merchant.supplier.aria`
- `night.merchant.supplier.body`
- `night.merchant.supplier.label`
- `night.prostitute.client-private.aria`
- `night.prostitute.client-private.body`
- `night.prostitute.client-private.label`
- `night.prostitute.personal-continuation.aria`
- `night.prostitute.personal-continuation.body`
- `night.prostitute.personal-continuation.label`
- `night.satyr-maid.recurring-guest-private.aria`
- `night.satyr-maid.recurring-guest-private.body`
- `night.satyr-maid.recurring-guest-private.label`
- `night.tavern.traveler-private.aria`
- `night.tavern.traveler-private.body`
- `night.tavern.traveler-private.label`
- `presentation.static.assassin.night.handler-contact.alt`
- `presentation.static.assassin.night.handler-contact.caption`
- `presentation.static.guard.night.case-debrief.alt`
- `presentation.static.guard.night.case-debrief.caption`
- `presentation.static.guard.night.partner.alt`
- `presentation.static.guard.night.partner.caption`
- `presentation.static.hunter.night.field-debrief.alt`
- `presentation.static.hunter.night.field-debrief.caption`
- `presentation.static.hunter.night.senior-guide.alt`
- `presentation.static.hunter.night.senior-guide.caption`
- `presentation.static.lumber.night.foreman-social.alt`
- `presentation.static.lumber.night.foreman-social.caption`
- `presentation.static.merchant.night.ledger-plan.alt`
- `presentation.static.merchant.night.ledger-plan.caption`
- `presentation.static.merchant.night.supplier.alt`
- `presentation.static.merchant.night.supplier.caption`
- `presentation.static.prostitute.night.client-private.alt`
- `presentation.static.prostitute.night.client-private.caption`
- `presentation.static.prostitute.night.personal-continuation.alt`
- `presentation.static.prostitute.night.personal-continuation.caption`
- `presentation.static.satyr-maid.night.recurring-guest-private.alt`
- `presentation.static.satyr-maid.night.recurring-guest-private.caption`
- `presentation.static.tavern.night.traveler-private.alt`
- `presentation.static.tavern.night.traveler-private.caption`
- `ui.night.sequence.finish`
- `ui.night.sequence.finishText`

**REPLACE**
- none

**DELETE**
- none


### Activity v17 localization overlay
Source: `4449ca46ad6580ca5f36adf140e9e1e14a007b64`  
Predecessor: `c68f8eed960371c987f1ec79a6f219b6a5ffc8b5`  
Operations: 9 add, 9 replace, 0 delete.

**ADD**
- `ending.ending.activity.network.epilogue`
- `ending.ending.activity.pathfinder.epilogue`
- `ending.ending.activity.preservation.epilogue`
- `presentation.static.activity-ending-network.alt`
- `presentation.static.activity-ending-network.caption`
- `presentation.static.activity-ending-pathfinder.alt`
- `presentation.static.activity-ending-pathfinder.caption`
- `presentation.static.activity-ending-preservation.alt`
- `presentation.static.activity-ending-preservation.caption`

**REPLACE**
- `ending.ending.activity.network.description`
- `ending.ending.activity.network.title`
- `ending.ending.activity.pathfinder.description`
- `ending.ending.activity.pathfinder.title`
- `ending.ending.activity.preservation.description`
- `ending.ending.activity.preservation.title`
- `specialist.activity.contact-network.description`
- `specialist.activity.field-archive.description`
- `specialist.activity.surveyors-atlas.description`

**DELETE**
- none


### v36 Activity Network final-value correction
Source: `d631544c96c724375ac48d3c563dd1c1865bb5b5`  
Predecessor: `4449ca46ad6580ca5f36adf140e9e1e14a007b64`  
Operation: **REPLACE** one already-manifested Activity key.

- `ending.ending.activity.network.epilogue`
  - RU: `Контакты связывают разрозненные направления в единое рабочее пространство.`
  - EN: `The contacts tie disconnected routes into one practical working network.`

No add/delete operation is contributed by v36.

### Palace v19 localization overlay
Source: `64922de3b6aab606f9b2932853e6bbd686766b6a`  
Predecessor: `7f7d976fc686a599abe3917018925ba0b85e1885`  
Operations: 14 add, 63 replace, 0 delete.

**ADD**
- `ending.ending.palace.court-power.epilogue`
- `ending.ending.palace.inner-truth.epilogue`
- `ending.ending.palace.return-home.epilogue`
- `ending.ending.palace.service-life.epilogue`
- `presentation.static.palace.archive.alt`
- `presentation.static.palace.archive.caption`
- `presentation.static.palace.custodian.alt`
- `presentation.static.palace.custodian.caption`
- `presentation.static.palace.invitation.alt`
- `presentation.static.palace.invitation.caption`
- `presentation.static.palace.return-home.alt`
- `presentation.static.palace.return-home.caption`
- `presentation.static.palace.service.alt`
- `presentation.static.palace.service.caption`

**REPLACE**
- `action.palace.confront-prince.description`
- `action.palace.confront-prince.scene.default.text`
- `ending.ending.palace.court-power.description`
- `ending.ending.palace.court-power.title`
- `ending.ending.palace.inner-truth.description`
- `ending.ending.palace.return-home.description`
- `ending.ending.palace.service-life.description`
- `event.palace.invitation.day1-arrival.choice.open.label`
- `event.palace.invitation.day1-arrival.choice.open.text`
- `event.palace.invitation.day1-arrival.title`
- `event.palace.invitation.day1-arrival.variant.default.text`
- `event.palace.invitation.reveal.choice.accept.text`
- `event.palace.invitation.reveal.title`
- `event.palace.invitation.reveal.variant.default.text`
- `event.palace.outcome-finalize.court-power.choice.finalize.label`
- `event.palace.outcome-finalize.court-power.choice.finalize.text`
- `event.palace.outcome-finalize.court-power.title`
- `event.palace.outcome-finalize.court-power.variant.default.text`
- `event.palace.outcome-finalize.inner-truth.choice.finalize.label`
- `event.palace.outcome-finalize.inner-truth.choice.finalize.text`
- `event.palace.outcome-finalize.inner-truth.title`
- `event.palace.outcome-finalize.inner-truth.variant.default.text`
- `event.palace.outcome-finalize.service-life.choice.finalize.label`
- `event.palace.outcome-finalize.service-life.choice.finalize.text`
- `event.palace.outcome-finalize.service-life.title`
- `event.palace.outcome-finalize.service-life.variant.default.text`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.not-yet.text`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.separate-record-from-claim.label`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.separate-record-from-claim.text`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.unsupported-conclusion.label`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.unsupported-conclusion.text`
- `event.palace.prince-confrontation.phase-01-audit-record.variant.default.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.choice.accept-exclusive-veto.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.choice.authority-is-not-proof.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.choice.not-yet.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.variant.default.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.declare-world-unreal.label`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.declare-world-unreal.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.leave-without-erasing.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.not-yet.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.variant.default.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.invent-original-cause.label`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.invent-original-cause.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.not-yet.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.present-origin-trace.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.variant.default.text`
- `event.palace.progression.milestone-02-working-rhythm.choice.continue.text`
- `event.palace.progression.milestone-02-working-rhythm.title`
- `event.palace.progression.milestone-02-working-rhythm.variant.default.text`
- `event.palace.progression.milestone-05-trusted-service.choice.continue.text`
- `event.palace.progression.milestone-05-trusted-service.title`
- `event.palace.progression.milestone-05-trusted-service.variant.default.text`
- `event.palace.progression.milestone-08-palace-network.choice.continue.text`
- `event.palace.progression.milestone-08-palace-network.title`
- `event.palace.progression.milestone-08-palace-network.variant.default.text`
- `event.palace.progression.milestone-12-crossroads.choice.continue.text`
- `event.palace.progression.milestone-12-crossroads.title`
- `event.palace.progression.milestone-12-crossroads.variant.default.text`
- `event.palace.progression.milestone-15-outcome-ready.choice.continue.text`
- `event.palace.progression.milestone-15-outcome-ready.title`
- `event.palace.progression.milestone-15-outcome-ready.variant.default.text`
- `ui.palace.confrontation.complete`
- `ui.palace.returnHome.explicitCommit`

**DELETE**
- none


### v29 generic caption closure
Source: `75df2ed68b5cbf0a451e33d81e060ee5a3360d10`  
Predecessor: `65568847f09df4997fffc6facb7dc7907a10c872`  
Operations: 2 add, 0 replace, 0 delete.

**ADD**
- `media.base.town.caption`
- `media.stage.room.caption`

**REPLACE**
- none

**DELETE**
- none


### v40 player-facing localization repair
Source: `4626e55203cda0d841a04eaf781db7879781138c`  
Predecessor: `9281d3880d01c54f352effa5e372ad5393cc3eaa`  
Operations: 21 add, 0 replace, 0 delete.

**ADD**
- `ui.activity.fieldTimeLabel`
- `ui.activity.miniGameLabel`
- `ui.activity.suspicionLabel`
- `ui.condition.schoolCounter`
- `unlock.knowledge.hunter.legend-contracts.label`
- `unlock.knowledge.hunter.warden-signs.label`
- `unlock.knowledge.tavern.broker-index.label`
- `unlock.knowledge.undead-farm.anomaly-catalog.label`
- `unlock.satyr-maid.clear-terms.label`
- `unlock.secret-debt.bound-life.work-rhythm.label`
- `unlock.secret-debt.paid-freedom.earned-reserve-match.label`
- `unlock.secret-debt.takeover.network-retainer.label`
- `unlock.unlock.artist.court-context.label`
- `unlock.unlock.artist.master-repertoire.label`
- `unlock.unlock.assassin.refusal-protocol.label`
- `unlock.unlock.guard.casebook-index.label`
- `unlock.unlock.guard.command-briefing.label`
- `unlock.unlock.guard.reform-practice.label`
- `unlock.unlock.merchant.house-supplier.label`
- `unlock.unlock.merchant.patron-destinations.label`
- `unlock.unlock.prostitute.elite-protocol.label`

**REPLACE**
- none

**DELETE**
- none


### v42/v43 Strong Meta + modal accessibility localization
Source: `bb8143eb836ca7be3a841ad6aeac8a106f751e28`  
Predecessor: `9281d3880d01c54f352effa5e372ad5393cc3eaa`  
Operations: 14 add, 0 replace, 0 delete.

**ADD**
- `ui.menu.catalogInspector`
- `ui.strongMeta.automaticKnowledgeNote`
- `ui.strongMeta.available`
- `ui.strongMeta.help`
- `ui.strongMeta.keystoneCapacity`
- `ui.strongMeta.keystoneTitle`
- `ui.strongMeta.noneKeystones`
- `ui.strongMeta.noneSpecialists`
- `ui.strongMeta.remove`
- `ui.strongMeta.select`
- `ui.strongMeta.selected`
- `ui.strongMeta.specialistCapacity`
- `ui.strongMeta.specialistTitle`
- `ui.strongMeta.title`

**REPLACE**
- none

**DELETE**
- none


### Final deletion fence
The final cumulative delete set is exactly 12 rows: the six v26 disconnected single-prefix Merchant/Artist Hard Work rows plus the six v31 retired Tavern presentation-localization rows. No later accepted layer targets any of these rows.

- `ending.artist-geisha.hard-work.description`
- `ending.artist-geisha.hard-work.epilogue`
- `ending.artist-geisha.hard-work.title`
- `ending.merchant.hard-work.description`
- `ending.merchant.hard-work.epilogue`
- `ending.merchant.hard-work.title`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`

## 4. Exact presentation-slot manifest

### D42 Night presentation slots
Source: `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`  
Predecessor: `2adff5582cb9cf9c755b952c35fafb7e0ae6702b`  
Operations: 12 add, 0 replace, 0 delete.

**ADD**
- `night/guard/guard-night-case-debrief`
- `night/hunter/hunter-night-field-debrief`
- `night/merchant/merchant-night-ledger-plan`
- `night/prostitute/prostitute-night-client-private`
- `night/satyr-maid/satyr-maid-night-recurring-guest-private`
- `night/tavern/tavern-night-traveler-private`
- `relationship/assassin-handler/assassin-night-handler-contact/default`
- `relationship/guard-partner/guard-night-partner/default`
- `relationship/hunter-senior-guide/hunter-night-senior-guide/default`
- `relationship/lumber-foreman/lumber-night-foreman-social/default`
- `relationship/merchant-supplier/merchant-night-supplier/default`
- `relationship/prostitute-recurring-client/prostitute-night-personal-continuation/default`

**REPLACE**
- none

**DELETE**
- none


### Activity v17 ending presentation slots
Source: `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`  
Predecessor: `83ce718fd324552b687342cd34707d62da8572fd`  
Operations: 3 add, 0 replace, 0 delete.

**ADD**
- `ending/activity/network`
- `ending/activity/pathfinder`
- `ending/activity/preservation`

**REPLACE**
- none

**DELETE**
- none


### Palace v19 presentation slots
Source: `02c9a19eee0366131f793ed9e141b33a93f213b3`  
Predecessor: `83ce718fd324552b687342cd34707d62da8572fd`  
Operations: 19 add, 0 replace, 0 delete.

**ADD**
- `ending/palace/court-power`
- `ending/palace/inner-truth`
- `ending/palace/return-home`
- `ending/palace/service-life`
- `job/palace/event/palace-invitation-day1-arrival/default`
- `job/palace/event/palace-invitation-reveal/default`
- `job/palace/event/palace-outcome-finalize-court-power/default`
- `job/palace/event/palace-outcome-finalize-inner-truth/default`
- `job/palace/event/palace-outcome-finalize-service-life/default`
- `job/palace/event/palace-prince-confrontation-phase-01-audit-record/default`
- `job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default`
- `job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default`
- `job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default`
- `job/palace/event/palace-progression-milestone-02-working-rhythm/default`
- `job/palace/event/palace-progression-milestone-05-trusted-service/default`
- `job/palace/event/palace-progression-milestone-08-palace-network/default`
- `job/palace/event/palace-progression-milestone-12-crossroads/default`
- `job/palace/event/palace-progression-milestone-15-outcome-ready/default`
- `location/town/palace/confront-prince/default`

**REPLACE**
- none

**DELETE**
- none


### global presentation v23 slots
Source: `defe52fe665831a7194e4b7d0df99ae28588207c`  
Predecessor: `83ce718fd324552b687342cd34707d62da8572fd`  
Operations: 93 add, 0 replace, 0 delete.

**ADD**
- `activity/forest/route/hunter-trail`
- `activity/infiltration/return/escape`
- `activity/infiltration/return/failure`
- `activity/infiltration/return/success`
- `activity/infiltration/route/concealed-route`
- `activity/infiltration/route/default`
- `activity/infiltration/route/disguise-route`
- `activity/infiltration/route/local-route`
- `activity/infiltration/route/sealed-route`
- `job/assassin/event/assassin-activity-infiltration-return/default`
- `job/assassin/event/assassin-career-first-shift/default`
- `job/assassin/event/assassin-career-season-autumn/default`
- `job/assassin/event/assassin-career-season-spring/default`
- `job/assassin/event/assassin-career-season-summer/default`
- `job/assassin/event/assassin-career-season-winter/default`
- `job/assassin/event/assassin-career-seasonal-breadth/default`
- `job/assassin/event/assassin-career-trusted-blade/default`
- `job/assassin/event/assassin-career-veteran-ready/default`
- `job/assassin/event/assassin-contract-close/default`
- `job/assassin/event/assassin-contract-fallout/default`
- `job/assassin/event/assassin-contract-intel/default`
- `job/assassin/event/assassin-contract-method/default`
- `job/assassin/event/assassin-contract-offer/default`
- `job/assassin/event/assassin-contract-prep/default`
- `job/assassin/event/assassin-contract-resolve/default`
- `job/assassin/event/assassin-cross-guard-pressure/default`
- `job/assassin/event/assassin-cross-merchant-route/default`
- `job/assassin/event/assassin-cross-tavern-rumour/default`
- `job/assassin/event/assassin-items-concealed-toolset/default`
- `job/assassin/event/assassin-items-disguise-kit/default`
- `job/assassin/event/assassin-items-evidence-case/default`
- `job/assassin/event/assassin-items-sealed-pass/default`
- `job/assassin/event/assassin-relationship-conflict-open/default`
- `job/assassin/event/assassin-relationship-conflict-resolve/default`
- `job/assassin/event/assassin-relationship-intro/default`
- `job/assassin/event/assassin-relationship-trust/default`
- `job/assassin/event/assassin-relationship-utility/default`
- `job/assassin/event/assassin-routes-choose-network/default`
- `job/assassin/event/assassin-routes-choose-practice/default`
- `job/assassin/event/assassin-routes-ghost-ready/default`
- `job/assassin/event/assassin-routes-handler-takeover-ready/default`
- `job/assassin/event/assassin-routes-infiltration-qualified/default`
- `job/assassin/event/assassin-routes-outcome-ready/default`
- `job/assassin/event/assassin-routes-refusal-evidence/default`
- `job/assassin/event/assassin-routes-turncoat-ready/default`
- `job/assassin/event/assassin-school-etiquette/default`
- `job/assassin/event/assassin-school-field/default`
- `job/assassin/event/assassin-school-literacy/default`
- `job/assassin/event/assassin-school-physical/default`
- `job/assassin/event/assassin-school-rhetoric/default`
- `job/guard/shift/autumn/cargo-check/default`
- `job/guard/shift/autumn/market-records/default`
- `job/guard/shift/spring/property-dispute/default`
- `job/guard/shift/spring/road-reopen/default`
- `job/guard/shift/summer/festival/default`
- `job/guard/shift/summer/market-crowd/default`
- `job/guard/shift/winter/closed-quarter/default`
- `job/guard/shift/winter/lodging-pressure/default`
- `job/hunter/shift/autumn/migration/default`
- `job/hunter/shift/autumn/trophy-handoff/default`
- `job/hunter/shift/spring/edge-scout/default`
- `job/hunter/shift/spring/melt-tracks/default`
- `job/hunter/shift/spring/trap-check/default`
- `job/hunter/shift/summer/edge-predator/default`
- `job/hunter/shift/summer/training/default`
- `job/hunter/shift/winter/route-limits/default`
- `job/satyr-maid/shift/autumn/closing-reset/default`
- `job/satyr-maid/shift/autumn/queue-control/default`
- `job/satyr-maid/shift/spring/arrival-rush/default`
- `job/satyr-maid/shift/spring/table-reset/default`
- `job/satyr-maid/shift/summer/refill-rush/default`
- `job/satyr-maid/shift/summer/split-order/default`
- `job/satyr-maid/shift/winter/familiar-order/default`
- `job/satyr-maid/shift/winter/hearth-round/default`
- `job/tavern/shift/autumn/orders/default`
- `job/tavern/shift/autumn/rumours/default`
- `job/tavern/shift/spring/rooms/default`
- `job/tavern/shift/spring/supplies/default`
- `job/tavern/shift/summer/deliveries/default`
- `job/tavern/shift/summer/occupancy/default`
- `job/tavern/shift/winter/house-node/default`
- `job/tavern/shift/winter/shelter/default`
- `job/undead-farm/shift/autumn/contract-sort/default`
- `job/undead-farm/shift/autumn/reserve/default`
- `job/undead-farm/shift/spring/process-check/default`
- `job/undead-farm/shift/spring/wet-beds/default`
- `job/undead-farm/shift/summer/overgrowth/default`
- `job/undead-farm/shift/summer/production-run/default`
- `job/undead-farm/shift/winter/analysis-bench/default`
- `job/undead-farm/shift/winter/specimen-check/default`
- `location/town/repay/default`
- `night/rent-room/default`
- `night/rest/default`

**REPLACE**
- none

**DELETE**
- none


All 127 presentation mutations are ADD operations. Any non-identical existing target slot is a conflict, not a replacement candidate.

## 5. v42/v43 exact UI hunk manifest

The accepted UI source is implementation head `fac645878ebd726f50fd1364ac72414796755a2d`. The base `src/ui/app.ts` blob was `149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`; the accepted v42/v43 app blob is `43a3fdcd7a3a4cabb2ab84777feb9bb826cbdeb7`.

Apply only these semantic hunks to the future assembled `src/ui/app.ts`:

1. **ADD import** from `../core/strongMeta.ts` for `STRONG_META_KEYSTONE_CAPACITY`, `STRONG_META_SPECIALIST_CAPACITY`, `strongMetaRegistry`, and `StrongRewardDefinition`.
2. **ADD helpers** `strongMetaFallbackLabel`, `strongMetaRewardLabel`, and `panelAccessibleName`.
3. **REPLACE perform-navigation allowlist** so `setStrongMetaKeystone` and `setStrongMetaSpecialist` are treated like creation-time in-place commands.
4. **ADD** `strongMetaNewStartHTML()`.
5. **REPLACE creation markup seam** so `strongMetaNewStartHTML()` is rendered immediately after `hardWorkNewStartHTML()`.
6. **REPLACE generic dialog accessible name** from raw `aria-label="${esc(panel)}"` to `aria-label="${esc(panelAccessibleName(panel))}"`.
7. **ADD handlers** for `[data-strong-meta-keystone]` and `[data-strong-meta-specialist]`.

Do not replace `src/ui/app.ts` wholesale. All non-listed UI/runtime behavior must be retained from the assembled target.

## 6. Focused test-file add manifest

Bring these accepted producer tests into the runnable final assembly if not already present:

- `tests/global-caption-closure-producer-v29.test.ts`
- `tests/retired-tavern-localization-cleanup-v31.test.ts`
- `tests/activity-network-copy-fix-v36.test.ts`
- `tests/final-player-facing-localization-v40.test.ts`
- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`

These are additive test assets. Existing tests are retained; none is replaced or deleted by this packet.

## 7. Exact RETAIN manifest

The v31 deletion fence must **retain** these nine bilingual migration compatibility rows:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`
- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

The D41 mapping must remain unchanged:

- `tavern-stay -> ending.tavern.innkeeper`
- `tavern-guild -> ending.tavern.sanctuary`
- `tavern-court -> ending.tavern.information-broker`

The cumulative packet also RETAINS, without mutation:

- `src/core/engine.ts`, `src/core/strongMeta.ts`, `src/core/schema.ts`, persistence schema, reward ownership/class/capacity semantics;
- Activity v16-r1 mechanics authority `3cf69d7cb3df1a58d68908159d0acc14736435c4`;
- Palace v18 mechanics/content authority `67f948d185883d8e706dad522e5010bff8e2bd48`;
- D42 runtime/content authority;
- all localization keys and presentation slots not explicitly listed in this manifest;
- all `app.ts` behavior outside the seven accepted v42/v43 semantic hunks.

Strong Meta-specific invariants to retain: max 1 Keystone, max 2 Specialists, `palace.true.cap-200` remains a Specialist, Source Method/inherited knowledge remains automatic and non-selectable, Hard Work remains outside Strong Meta slots, owned rewards do not auto-select, and current-run snapshot resolution remains owned by `finishCreation`.

## 8. No-whole-file rule

Never use producer snapshots as whole-file replacements for:

- `content/localization.json`
- `content/presentation.json`
- `src/ui/app.ts`
- `content/definitions.json`
- Palace packs
- Activity/D42 runtime files

The frozen snapshots come from non-cumulative branches. The only valid composition is by exact key, exact slot, and exact semantic UI hunk as declared above.

**v45 COMPLETE**
