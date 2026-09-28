# Ending localization source QA v1

Status: COMPLETE / GREEN_TEXT_SOURCE

Current production main:
`54131488c65302f81b3001abaaa345d21f0281e2`
(post-PR59).

Reviewed Chat 5 items:
`133–139`.

Primary fixture:
`content/ending-localization-v1.fixture.json`.

Blob:
`a0d437777fc0b1991713e61bbb5cf34fa061f2fa`.

## Exact current ending set

Current definitions contain exactly 9 endings:

1. `guild-life`
2. `scholar-life`
3. `tavern-stay`
4. `tavern-guild`
5. `tavern-court`
6. `lumber-stay`
7. `ending.lumber.hard-work`
8. `ending.lumber.forewoman`
9. `ending.lumber.forest`.

The source contains title + description for all 9:
`18` localization keys.

Missing current ending ID:
`0`.

Extra/invented ending ID:
`0`.

## Stable key form

For each exact ending:
- `ending.<endingId>.title`;
- `ending.<endingId>.description`.

Because three current IDs themselves begin with `ending.`, their exact keys correctly become:
- `ending.ending.lumber.hard-work.*`;
- `ending.ending.lumber.forewoman.*`;
- `ending.ending.lumber.forest.*`.

Do not normalize or rename the underlying ending IDs to remove the double prefix.

## RU+EN completeness

Source key count:
`18`.

Missing RU:
`0`.

Missing EN:
`0`.

Current post-PR59 root collision:
`0`.

Therefore all 18 remain additive on current main.

The later Chat5 production-v2 fixture confirms the same 18-key additive result on exact post-PR59 main.

## Current exact conditions

### guild-life
- metric work >= 5;
- metric organization >= 6;
- flag alchemy.delivered = true.

### scholar-life
- flag school.exam = true.

### tavern-stay
- visits tavern >= 18.

### tavern-guild
- flag tavern.guild = true.

### tavern-court
- flag tavern.prince = true.

### lumber-stay
- visits lumber >= 24.

### ending.lumber.hard-work
Exactly:
`careerCounter(lumber, completed_shifts) >= 50`.

No School, Foreman, Forest, season or other prerequisite.

### ending.lumber.forewoman
Exact current conditions:
- career fact `management-school-ready` present;
- career fact `forewoman-problem-resolved` present;
- relationship `lumber.foreman` stage `route-professional`.

### ending.lumber.forest
Exact current conditions:
- career fact `forest-truth-known` present;
- career fact `forest-problem-resolved` present.

The text source does not modify these condition objects.

## Reward/meta identity

Current reward IDs remain gameplay-owned.

Important locked identity:
- Hard Work reward: `lumber.hardwork.compat`;
- meta reward: `hardWork:lumber`.

The localization source contains no reward/metaReward field.

No source string can grant or alter a reward.

## Consumer state

Current Legacy panel still renders raw:
- `e.title`;
- `e.description`.

Approved future lookup:
- `tr('ending.' + e.id + '.title', e.title)`;
- `tr('ending.' + e.id + '.description', e.description)`.

Current inactive-run screen does not directly consume the ending title/description pair; it shows the generic ending-state heading plus latest Journal text.

## Requirement display

Ending requirements remain rendered through the current typed-condition `explain(c)` path.

Ending localization title/description must not replace:
- condition objects;
- eligibility checks;
- comparison values;
- availableEndings.

Some semantic IDs remain visible in requirement text where no semantic-name layer exists. That is separate label debt.

## Natural-path matrix

Item 139 records for all nine exact endings:
- expected RU title/description;
- expected EN title/description;
- same current eligibility identity;
- same reward ID;
- same meta reward identity;
- same shared acceptance button.

Locale switching must not affect button availability.

## Presentation-only payload

The fixture explicitly excludes:
- conditions;
- rewards;
- metaRewards;
- epilogues;
- gameplay fields.

No Save or RNG field is present.

## Verdict

`GREEN_TEXT_SOURCE`.

All 9 exact current endings have complete bilingual title/description source with no ending-ID, condition, reward or Meta drift.
