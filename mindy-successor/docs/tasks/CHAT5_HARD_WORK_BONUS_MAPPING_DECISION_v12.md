# Chat 5 — Hard Work Bonus Mapping Decision v12

Status: **PRODUCT CANDIDATE — READY FOR PRODUCT LOCK**

Owner: Chat 5  
Scope: D21 / D22 ordinary Hard Work New Start+ bonus mapping only.  
Runtime implementation: **OUT OF SCOPE**.

## 1. Authority preserved

This packet closes only the still-open profession -> starting-bonus mapping under locked D21/D22.

It does **not** reopen:

- exactly 10 ordinary professions;
- first five ordinary professions each providing exactly **one +5 progression-stat bonus**;
- later five ordinary professions each providing exactly **two separate +5 progression-stat bonuses**;
- New Start+ allowing any earned subset of profession packages to be active;
- no one-slot restriction for ordinary Hard Work packages;
- at least one Hard Work package including a Lust bonus of at least +3;
- D23 requiring permanent ordinary Hard Work 10/10 **and** current-life active package 10/10 for the Day-1 Palace invitation;
- D24 cap-200 changing only the cap, never multiplying Hard Work bonuses;
- the old automatic +3/+3 model and Merchant +600 model remaining superseded.

Lust remains the separate content axis from D1 / `TARGET_STAT_SYSTEM_v1.md`. Therefore a Lust component is **not** one of the progression-stat slots required by D22.

## 2. Exact locked mapping candidate

| Ordinary profession | Progression-stat bonus 1 | Progression-stat bonus 2 | Separate Lust component |
| --- | --- | --- | --- |
| Lumber | **Strength +5** | — | — |
| Satyr Maid | **Charm +5** | — | — |
| Undead Farm | **Magic +5** | — | — |
| Tavern | **Wits +5** | — | — |
| Hunter | **Dexterity +5** | — | — |
| Guard | **Endurance +5** | **Manners +5** | — |
| Merchant | **Reason +5** | **Sociability +5** | — |
| Artist/Geisha | **Creativity +5** | **Grooming +5** | — |
| Assassin | **Dexterity +5** | **Wits +5** | — |
| Prostitute | **Sexuality +5** | **Charm +5** | **Lust +5** |

Canonical runtime stat IDs for a later producer:

- Strength -> `strength`
- Endurance -> `endurance`
- Dexterity -> `dexterity`
- Reason -> `reason`
- Magic -> `magic`
- Creativity -> `creativity`
- Wits -> `wits`
- Charm -> `charm`
- Sociability -> `sociability`
- Manners -> `manners`
- Grooming -> `grooming`
- Sexuality -> `sexuality`
- Lust remains the separate `lustBonus` axis, not a progression-stat entry.

No new package ID namespace is introduced by this Product decision. The existing ordinary-career package identity remains the profession/career identity used by the D21-D23 Hard Work layer.

## 3. Profession rationale

### Lumber -> Strength +5

Strength is the cleanest single mastery inheritance for Lumber.

Current ordinary Lumber production already makes Strength its dominant wage input and repeatedly trains it across the work year. A Strength inheritance reads immediately as accumulated physical work craft without turning the bonus into Energy, Endurance recovery, an Activity capability, or a career-stage shortcut.

### Satyr Maid -> Charm +5

Charm is the clearest single service-facing mastery axis for Satyr Maid.

It is a primary wage input and is repeatedly reinforced by ordinary seasonal service. Choosing Charm rather than Sexuality keeps the first-five single-bonus package broad enough to support social/service builds while leaving Sexuality to a profession where it is the unmistakable central professional axis.

This bonus never means consent and never substitutes for Night/relationship choices.

### Undead Farm -> Magic +5

Magic differentiates Undead Farm from the other physical starter careers.

The career already treats Magic as a co-primary wage/stat axis and uses it to express the anomalous-farm identity. Using Endurance instead would make the inheritance read mostly as generic labor stamina and would duplicate Guard's clearer long-term endurance identity.

### Tavern -> Wits +5

Wits captures Tavern's practical information-routing and house-management identity.

It is a primary wage input, receives repeated ordinary work growth, and supports the authored distinction between a useful house node and merely being socially charming. Tavern therefore does not duplicate Satyr Maid's Charm inheritance.

This is not an Information Broker shortcut and writes no D41 route facts.

### Hunter -> Dexterity +5

Dexterity is Hunter's strongest signature field-work axis.

It is the highest-weight wage stat, appears in the normal unlock build, and is repeatedly trained by ordinary Hunter work. It represents tracking, handling and field precision without granting an Activity capability, preserved specimen, rough-route access, or any D41 Hunter ending condition.

### Guard -> Endurance +5 and Manners +5

Guard has two equally important ordinary-profession identities: sustained duty and disciplined public authority.

Endurance represents patrol/workload persistence. Manners represents procedure, formal conduct and controlled public interaction rather than raw intimidation. Both are already central to Guard wage/gate/seasonal identity.

The pair deliberately avoids making Guard a double physical package such as Strength + Endurance; that would narrow a profession whose authored identity explicitly includes records, disputes and professional restraint.

### Merchant -> Reason +5 and Sociability +5

Merchant mastery is split between sound trade judgment and durable commercial relationships.

Reason represents appraisal, records, comparison and disciplined decisions. Sociability represents supplier/buyer networks and repeated-contact trade rather than generic personal charm.

Wits is intentionally not used here even though it is important to Merchant work: Wits already has strong inheritance representation through Tavern and Assassin. Reason + Sociability preserves Merchant identity while improving roster-wide balance.

The old Merchant +600 starting-money legacy remains retired.

### Artist/Geisha -> Creativity +5 and Grooming +5

These are the two most profession-defining preparation axes for Artist/Geisha.

Creativity expresses authored artistic production and performance design. Grooming expresses deliberate professional presentation and preserves the full-system role of the Grooming progression stat rather than collapsing the profession into Charm/Manners alone.

Neither bonus implies intimacy, romance, patronage, court access or a Palace route.

### Assassin -> Dexterity +5 and Wits +5

Assassin mastery is precision plus practical improvisation.

Dexterity is the dominant execution/surveillance axis; Wits represents timing, route reading, fallback planning and bounded covert problem solving. Both are already core ordinary-career gate/wage/growth axes.

The overlap with Hunter on Dexterity and Tavern on Wits is intentional: those are genuinely shared competencies across otherwise distinct professions, and the overlap is limited.

### Prostitute -> Sexuality +5 and Charm +5; Lust +5 separately

Sexuality and Charm are the two clearest ordinary professional-skill inheritances for this career.

Sexuality represents professional bodily confidence/presentation. Charm represents client-facing communication and social control of the professional interaction. Both are established wage/gate axes.

The additional **Lust +5** is the D22-required Lust placement. It is separate because Lust is not one of the 12 progression stats. +5 is chosen rather than the minimum +3 so the package uses one consistent visible Hard Work magnitude and remains meaningful against deliberately slower Lust growth.

Lust, Sexuality and Charm never imply consent, never auto-select Night content, and never weaken refusal/back-out semantics.

## 4. Roster-wide balance result

With all ten profession packages active, the progression-stat inheritance is:

| Axis | Total inherited bonus |
| --- | ---: |
| Strength | +5 |
| Endurance | +5 |
| Dexterity | +10 |
| Reason | +5 |
| Magic | +5 |
| Creativity | +5 |
| Wits | +10 |
| Charm | +10 |
| Sociability | +5 |
| Manners | +5 |
| Grooming | +5 |
| Sexuality | +5 |
| Lust | +5 separate |

This gives all **12 progression stats** at least one Hard Work inheritance path and gives Lust one explicit path.

There are exactly three unavoidable progression-stat repeats across the 15 D22 progression bonuses:

- Dexterity: Hunter + Assassin;
- Wits: Tavern + Assassin;
- Charm: Satyr Maid + Prostitute.

Those repeats are preferred over leaving a progression stat completely absent from the Hard Work inheritance layer. They also occur on competencies that are genuinely shared by the paired careers rather than on arbitrary filler mappings.

Total all-ten-active inheritance:

- **75 progression-stat points** across the 15 exact +5 bonuses;
- **+5 Lust** as a separate content-axis component.

## 5. Selection semantics

The selectable unit remains the **profession Hard Work package**, matching D23's ten-package gate.

Therefore:

- activating Lumber activates its Strength +5;
- activating Guard activates both Endurance +5 and Manners +5;
- activating Prostitute activates Sexuality +5, Charm +5 and its separate Lust +5;
- the individual components inside one profession package are not separate loadout slots;
- the player may activate none, some, or all earned profession packages;
- ordinary Hard Work packages remain outside Keystone/Specialist capacity.

D23 remains exact:

`permanent ordinary Hard Work 10/10 + current-life active profession packages 10/10 -> Day-1 Palace invitation`.

No individual stat value, no particular bonus component, and no Lust value substitutes for that ten-package condition.

## 6. Explicit non-effects

This mapping does not:

- change any Hard Work requirement from 50 shifts;
- change D26 one same-career shift/day;
- change ordinary wages, seasonal packages, unlock gates or School;
- create money/Energy/item/capability rewards;
- restore Merchant +600;
- restore automatic legacy +3/+3 packages;
- create a Keystone or Specialist;
- alter advanced-ending eligibility or rewards;
- alter Secret Debt;
- grant Palace access except through the already-locked D23 all-ten-active package rule;
- multiply bonuses under D24 cap-200;
- make Lust or Sexuality imply consent.

## 7. Future runtime acceptance contract

A later runtime producer should be able to assert exactly:

1. first five package definitions have exactly one progression `+5`;
2. later five package definitions have exactly two distinct progression `+5` entries;
3. only Prostitute carries the D47 Lust component, exactly `+5`;
4. all 12 progression-stat IDs appear at least once across the ten definitions;
5. no profession package contains the same progression stat twice;
6. arbitrary earned subsets remain selectable;
7. selecting a later-five package applies both of its progression components atomically;
8. selecting Prostitute applies both progression components plus Lust +5 atomically;
9. all-ten selection still satisfies D23 by package identity, not by counting individual bonus components;
10. cap clipping uses the existing creation rules; no overflow is converted into another stat, money or Lust;
11. old automatic +3/+3 and Merchant +600 behavior remains absent;
12. save/reload preserves the resolved current-life active package selection and does not reapply creation bonuses.

## 8. Product decision

**Recommended lock:**

- Lumber -> Strength +5
- Satyr Maid -> Charm +5
- Undead Farm -> Magic +5
- Tavern -> Wits +5
- Hunter -> Dexterity +5
- Guard -> Endurance +5, Manners +5
- Merchant -> Reason +5, Sociability +5
- Artist/Geisha -> Creativity +5, Grooming +5
- Assassin -> Dexterity +5, Wits +5
- Prostitute -> Sexuality +5, Charm +5, plus separate Lust +5

This closes the remaining D22 mapping question without changing D21-D23 breadth, selection architecture, Palace qualification, Strong Meta, advanced endings, Secret Debt or economy.
