# Post-PR49 Legacy Root Localization Rebase Audit v2

Date: 2026-09-27
Owner: Chat 5
Prepared source: `content/legacy-root-event-localization-v1.fixture.json`
Exact current-main baseline: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe` — Merge pull request #49 from Plegyer/lead/non-career-static-media-v1

No root localization file is modified by this audit.

## Classification summary

| Classification | Count |
|---|---:|
| ADDITIVE | 108 |
| IDENTICAL | 1 |
| CONFLICT | 0 |
| SUPERSEDED | 0 |
| **Total prepared keys** | **109** |

## ADDITIVE

Every key below is absent from the exact current root localization and remains a safe additive candidate, subject to Lead selective integration:

- `event.base.arrival.title`
- `event.base.arrival.variant.welcome.text`
- `event.base.arrival.choice.introduce.label`
- `event.base.arrival.choice.introduce.text`
- `event.base.bran.title`
- `event.base.bran.variant.delivery.text`
- `event.base.bran.choice.friendly.label`
- `event.base.bran.choice.friendly.text`
- `event.base.invite.title`
- `event.base.invite.variant.tea.text`
- `event.base.invite.choice.yes.label`
- `event.base.invite.choice.yes.text`
- `event.base.invite.choice.no.label`
- `event.base.invite.choice.no.text`
- `event.base.shelter.title`
- `event.base.shelter.variant.bunks.text`
- `event.base.shelter.choice.tell.label`
- `event.base.shelter.choice.tell.text`
- `event.base.order.title`
- `event.base.order.variant.order.text`
- `event.base.order.choice.accept.label`
- `event.base.order.choice.accept.text`
- `event.base.workday.title`
- `event.base.workday.variant.labels.text`
- `event.base.workday.variant.cat.text`
- `event.base.workday.variant.dust.text`
- `event.base.workday.choice.steady.label`
- `event.base.workday.choice.steady.text`
- `event.base.winter.title`
- `event.base.winter.variant.snow.text`
- `event.base.winter.choice.help.label`
- `event.base.winter.choice.help.text`
- `event.base.winter.choice.pass.label`
- `event.base.winter.choice.pass.text`
- `event.gopher.arrival.title`
- `event.gopher.arrival.variant.default.text`
- `event.gopher.arrival.choice.home.label`
- `event.gopher.arrival.choice.home.text`
- `event.gopher.arrival.choice.status.label`
- `event.gopher.arrival.choice.status.text`
- `event.gopher.arrival.choice.mystery.label`
- `event.gopher.arrival.choice.mystery.text`
- `event.gopher.tavern-intro.title`
- `event.gopher.tavern-intro.variant.default.text`
- `event.gopher.tavern-intro.choice.agree.label`
- `event.gopher.tavern-intro.choice.agree.text`
- `event.gopher.tavern-quest.title`
- `event.gopher.tavern-quest.variant.default.text`
- `event.gopher.tavern-quest.choice.help.label`
- `event.gopher.tavern-quest.choice.help.text`
- `event.gopher.tavern-quest.choice.later.label`
- `event.gopher.tavern-quest.choice.later.text`
- `event.gopher.receipt.title`
- `event.gopher.receipt.variant.default.text`
- `event.gopher.receipt.choice.take.label`
- `event.gopher.receipt.choice.take.text`
- `event.gopher.tavern-resolution.title`
- `event.gopher.tavern-resolution.variant.default.text`
- `event.gopher.tavern-resolution.choice.guild.label`
- `event.gopher.tavern-resolution.choice.guild.text`
- `event.gopher.tavern-resolution.choice.prince.label`
- `event.gopher.tavern-resolution.choice.prince.text`
- `event.gopher.tavern-resolution.choice.wait.label`
- `event.gopher.tavern-resolution.choice.wait.text`
- `event.gopher.tavern-routine.title`
- `event.gopher.tavern-routine.variant.spring.text`
- `event.gopher.tavern-routine.variant.summer.text`
- `event.gopher.tavern-routine.variant.autumn.text`
- `event.gopher.tavern-routine.variant.winter.text`
- `event.gopher.tavern-routine.variant.default.text`
- `event.gopher.tavern-routine.choice.finish.label`
- `event.gopher.tavern-routine.choice.finish.text`
- `event.gopher.woods-intro.title`
- `event.gopher.woods-intro.variant.default.text`
- `event.gopher.woods-intro.choice.learn.label`
- `event.gopher.woods-intro.choice.learn.text`
- `event.gopher.hunt-intro.title`
- `event.gopher.hunt-intro.variant.default.text`
- `event.gopher.hunt-intro.choice.learn.label`
- `event.gopher.hunt-intro.choice.learn.text`
- `event.gopher.landlord.title`
- `event.gopher.landlord.variant.default.text`
- `event.gopher.landlord.choice.tea.label`
- `event.gopher.landlord.choice.tea.text`
- `event.stage.goblin.title`
- `event.stage.goblin.variant.curious.text`
- `event.stage.goblin.variant.default.text`
- `event.stage.goblin.choice.spar.label`
- `event.stage.goblin.choice.spar.text`
- `event.stage.goblin.choice.flirt.label`
- `event.stage.goblin.choice.flirt.text`
- `event.stage.goblin.choice.work.label`
- `event.stage.goblin.choice.work.text`
- `media.base.town.alt`
- `media.gopher.arrival.default.alt`
- `media.gopher.tavern-intro.default.alt`
- `media.gopher.tavern-quest.default.alt`
- `media.gopher.receipt.default.alt`
- `media.gopher.tavern-resolution.default.alt`
- `media.gopher.tavern-routine.spring.alt`
- `media.gopher.tavern-routine.summer.alt`
- `media.gopher.tavern-routine.autumn.alt`
- `media.gopher.tavern-routine.winter.alt`
- `media.gopher.tavern-routine.default.alt`
- `media.gopher.woods-intro.default.alt`
- `media.gopher.hunt-intro.default.alt`
- `media.gopher.landlord.default.alt`
- `media.stage.goblin.alt`

## IDENTICAL

The following prepared key already exists in current root with exact RU+EN value identity:

- `media.base.workshop.alt`

## CONFLICT

- none

## SUPERSEDED

- none

No prepared item-67 key is superseded by a newer exact semantic key in current root at this baseline.

## Rebase conclusions

- PR47/48/49 did not introduce root event-text collisions for the prepared legacy generic-world keys.
- The prepared event title, variant, choice-label and choice-outcome keys remain additive.
- `media.base.workshop.alt` remains exact-identical.
- The other prepared legacy media-alt keys remain additive, but their wording must still be re-audited against the actual current visual assets before production merge; item 81 performs that content review.
- No current event/variant/choice identity in item 67 disappeared or changed at this baseline.
- No root localization edits are made here.

## Locked boundaries

No School, poverty, Foreman, Forest-result, Secret Debt, trigger/effect/reward, RNG, Save or media-path ownership changes.
