# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — HARD WORK PRODUCTION PACKAGE CATALOG + NEW START+ PRESENTATION PREP**
Owner: Chat 4

Completed infra prep:
`chat4/hard-work-meta-infra-prep-v1@50ede59ad96bd8059fcc15dca1ffdffc910563ab`

## Assignment

Create fresh branch:
`chat4/hard-work-package-catalog-v1`
from current main `426ec9146716e1246d6b7bfdd4a570ef2fcb0a54`.

Promote the previously prepared concrete mapping into a production **catalog/fixture + focused tests**, but do not integrate shared engine/schema yet:

- Lumber: Strength +5
- Satyr Maid: Grooming +5
- Undead Farm: Magic +5
- Tavern: Sociability +5
- Hunter: Dexterity +5
- Guard: Endurance +5, Manners +5
- Merchant: Wits +5, Reason +5
- Artist/Geisha: Creativity +5, Grooming +5
- Assassin: Dexterity +5, Wits +5
- Prostitute/Professional: Sexuality +5, Charm +5, plus separate Lust +3

Rules:
- first five exactly one +5 progression-stat effect;
- later five exactly two +5 progression-stat effects in this catalog;
- Lust is separate and +3 satisfies the locked minimum magnitude;
- no old automatic +3/+3 or Merchant +600 behavior in the catalog;
- package activation remains arbitrary subset none/some/all;
- package selection is whole-package, not individual effects.

Also prepare RU/EN New Start+ package titles/descriptions and accessible selected/unselected copy as an unbound fixture/presentation source.

Use the isolated `hardWorkMeta.ts` validator/tests where possible; do not wire shared engine/schema/UI yet.
No full CI.
Freeze exact SHA and report READY_FOR_CHAT2_OR_LEADER.
