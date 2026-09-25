# School System Draft v1

Дата: 2026-09-25.

Статус: **TARGET PRODUCT DRAFT**.

Основание:
- `TARGET_STAT_SYSTEM_v1.md`;
- `STAT_COVERAGE_MATRIX_v2.md`;
- LIFE-06;
- target architecture v1.

Главная цель: покрыть 12 progression stats без создания 12 однообразных кнопок "купи +stat".

## 1. School remains an independent system

Каждый учебный track имеет:
- преподавателя/контекст;
- repeatable lesson variants;
- progress;
- milestones;
- project/exam;
- public facts/certificates;
- career hooks;
- own relationship possibilities.

Base entry:
- 1 Energy;
- money cost.

Night study:
- отдельный способ progress;
- -1 next-day Energy;
- не заменяет все очные milestones.

## 2. Proposed 8 tracks

### S1 — Literacy & Numbers
Core:
- Reason.

Secondary:
- Wits;
- Manners for formal documents.

Uses:
- Merchant;
- Tavern;
- Guard;
- Farm;
- Palace;
- debt/evidence.

### S2 — Arcana
Core:
- Magic;
- Reason.

Secondary:
- Creativity in ritual projects.

Uses:
- Farm;
- Hunter anomaly routes;
- Activity;
- Palace;
- selected Guard/Assassin cases.

### S3 — Rhetoric & Negotiation
Core:
- Charm;
- Sociability.

Secondary:
- Wits.

Uses:
- Satyr Maid;
- Tavern;
- Merchant;
- Guard;
- Prostitute;
- relationships.

### S4 — Etiquette & Presentation
Core:
- Manners;
- Grooming.

Secondary:
- Charm.

Uses:
- Artist/Geisha;
- Palace;
- elite clients;
- high-status Tavern/Merchant/Prostitute routes.

This is the main formal school home for Grooming.

### S5 — Practical Craft & Field Skills
Core:
- Dexterity;
- Wits.

Secondary:
- Creativity.

Uses:
- Lumber;
- Hunter;
- Assassin;
- items;
- Activity.

### S6 — Physical Training
Core:
- Strength;
- Endurance.

Secondary:
- Dexterity depending lesson.

Uses:
- Lumber;
- Guard;
- Hunter;
- physical Activity.

### S7 — Arts & Performance
Core:
- Creativity;
- Charm.

Secondary:
- Dexterity;
- Sociability.

Uses:
- Artist;
- Satyr Maid festival routes;
- Palace ceremonies;
- seasonal competitions.

### S8 — Body Confidence & Professional Presentation
Core:
- Sexuality;
- Grooming.

Secondary:
- Manners or Charm depending lesson.

Uses:
- Satyr Maid;
- Prostitute;
- Artist;
- selected Palace/social routes.

This is not a generic "sex class"; presentation depends on tone and curriculum.

## 3. Lust is not taught as a normal stat

School does not sell Lust.

Lust changes through:
- choices;
- relationships;
- night events;
- route-specific content.

This preserves distinction:
skill/confidence != desire.

## 4. Grooming integration

Grooming can be improved by school without creating a special hygiene minigame.

Examples:
- presentation;
- clothing care;
- professional preparation;
- service standards.

Housing/night remains another source.

Dirty jobs can reduce Grooming seasonally, creating natural reason to spend time/resources on recovery or social preparation.

## 5. Lessons vs milestones

Repeatable lesson:
- small progress/stat package;
- 1 Energy + money.

Milestone:
- requires course progress;
- may require project/item/relationship;
- grants certificate/public fact;
- can trigger career event immediately through Resolver.

## 6. Multi-stat lessons

Not every lesson needs one stat.

Example:
`formal hosting`
- +Manners;
- +Grooming;
- smaller +Charm;
- costs more / requires prior stage.

Example:
`field improvisation`
- +Wits;
- +Dexterity;
- project item.

This keeps 12-stat model manageable.

## 7. Certificates/public facts

Examples:
- literate_accounting;
- arcana_foundation;
- formal_etiquette;
- field_craft;
- performance_training;
- body_presentation.

Careers read public facts, not internal school stage IDs.

## 8. Education endings

School should have at least several own outcomes, for example:
- broad scholar;
- specialist/master track;
- teacher/assistant/academy route;
- cross-system research ending.

Exact catalog OPEN.

## 9. Cost tiers

Use WU framework:

- ordinary lesson: ~1–2 WU;
- advanced lesson: ~2–5 WU;
- exam/project: larger one-time cost or item requirement.

Exact values after economy simulation.

## 10. Relationship hooks

Teachers/peers can be:
- mentor;
- rival;
- relationship;
- supplier/contact.

Not every teacher needs a full romance route.

## 11. Acceptance

School v1 succeeds if:
1. all 12 progression stats have reasonable access;
2. no 12-button stat shop;
3. Grooming has a logical education source;
4. Lust cannot be purchased;
5. certificate can progress career without another work shift;
6. at least one project uses item/Activity result;
7. night study competes with next-day Energy;
8. save/load preserves course/milestone/pending state.

## 12. Supersedes

This supersedes `SCHOOL_SYSTEM_DRAFT_v0.md` as target school design.
