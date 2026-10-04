# Chat 5 — D47 Hard Work Bonus Mapping Producer v13

Status: **PRODUCER CANDIDATE**

Base: `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`  
Accepted Product authority: D47 in `USER_DECISIONS_LOCKED_v1.md`  
Source mapping packet: `chat5/hard-work-bonus-mapping-decision-v12@b2a44983f1aae88888623f096b093a6e21354293`

## Implementation

The existing ordinary Hard Work / New Start+ package architecture is retained. No parallel reward/loadout system is introduced.

The production package catalog now contains exactly:

- Lumber -> Strength +5;
- Satyr Maid -> Charm +5;
- Undead Farm -> Magic +5;
- Tavern -> Wits +5;
- Hunter -> Dexterity +5;
- Guard -> Endurance +5 + Manners +5;
- Merchant -> Reason +5 + Sociability +5;
- Artist/Geisha -> Creativity +5 + Grooming +5;
- Assassin -> Dexterity +5 + Wits +5;
- Prostitute -> Sexuality +5 + Charm +5 + separate Lust +5.

The generic package validator now enforces the locked D47 breadth: first five careers have exactly one +5 progression-stat component and later five have exactly two.

The already-existing `lustBonus` field is used for Prostitute's separate +5 Lust component. Lust remains outside the 12 progression-stat component count.

## Preserved semantics

- The selectable unit remains the profession package.
- Any earned subset may be activated; no one-slot restriction is introduced.
- Package effects apply once when character creation is finished.
- Save/reload preserves the selected/applied snapshot and cannot reapply the bonus.
- D23 continues to count ten active ordinary package identities.
- D24 cap-200 changes only the cap; every package component remains exactly +5 and clips at the effective cap.
- Ordinary Hard Work packages consume no Keystone or Specialist slots.
- The retired automatic +3/+3 direction remains absent.
- The retired Merchant +600 starting-money direction remains absent.
- No advanced-ending, Secret Debt, Palace, wage, School, Activity, Night, or Strong Meta reward rule is changed.

## Focused acceptance coverage

`tests/hard-work-bonus-mapping-v13.test.ts` covers the exact mapping, all-12-stat coverage, 75 progression points across all ten packages, separate Lust +5, arbitrary subset selection, D46 base Lust 5 -> Prostitute-active Lust 10, atomic multi-component application, reload/idempotence, cap clipping, D23 package identity, no Strong Meta slot consumption, and absence of legacy automatic/starting-money behavior.

Existing package-catalog, New Start+ presentation/UI, D24, D23, Strong Meta, Secret Debt and advanced-ending regression tests are intended to be included in focused producer QA. Full CI remains Chat 2 assembly-owned.
