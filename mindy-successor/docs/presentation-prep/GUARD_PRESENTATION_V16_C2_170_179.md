# Guard Presentation v16 — C2-170 through C2-179

Status: COMPLETE ON FROZEN RUNTIME
Owner: Chat 2 / Presentation & Media
Final branch: `chat2/guard-presentation-v16-final`
Frozen runtime base: `89030816f07be16ab5071ebb9af859fc3c756115`

## Delivered presentation surface

Published Guard presentation slots: **63**.

Breakdown:
- ordinary result + Spring/Summer/Autumn/Winter: 5;
- existing Hard Work ending: 1;
- career stages: 9;
- `guard.partner` stages: 5;
- access items: 2;
- qualitative runtime-backed status surfaces: 15;
- exact frozen Guard events: 26.

All slots use project-owned static fallback media. No Guard GIF/video is invented.

### C2-170
Ordinary seasonal 1-Energy `guard.shift` retains project-owned seasonal SVGs. Generic result copy explicitly describes duty/access and does not imply a combat/use-of-force subsystem.

### C2-171
All nine frozen career stages have stable semantic IDs:
`job/guard/stage/<stage>`.
Late-route stages/readiness are professional status, not ending cards.

### C2-172
All five `guard.partner` stages have stable semantic IDs:
`relationship/guard-partner/stage/<stage>`.
Pending relationship scenes expose professional intro/trust/conflict/cooperation/rivalry/refusal/case-support states. Refusal presentation explicitly preserves ordinary Guard duty.

### C2-173
Five city-duty events and qualitative evidence/status surfaces are presentation-backed. No Morality stat or corruption currency is created.

### C2-174
Only live poverty and Tavern seams are represented:
- `guard.city.poverty-response`;
- `guard.cross.tavern-receipt`;
- qualitative `poverty-response-recorded` and `tavern-evidence-known`.
No Secret Debt, Merchant, Palace, Assassin or Prostitute Guard presentation ID is published.

### C2-175
`guard_badge` and `guard_sealed_pass` have access-only presentation surfaces. Copy does not claim immunity or combat bonuses.

### C2-176
Guard School event set remains empty because frozen runtime has no live `guard.school.*` consumer. Null thresholds remain untouched.

### C2-177
Market-gate crisis and Veteran/Officer/Reform/Network/Major Case readiness are presented as decisions/readiness only. No complex ending IDs are added.

### C2-178
Only existing `ending.guard.hard-work` is published for Guard.

### C2-179
Every Guard override has:
- RU/EN alt text;
- RU/EN caption parity;
- static fallback;
- animation-off safety;
- keyboard/focus semantics for stage/partner/item/status UI;
- no locale/media Save or gameplay RNG mutation.

## Hunter collision audit

The exact frozen Guard runtime base predates final Hunter presentation integration, so Hunter cannot be executed inside this sibling branch. A namespace collision audit against current integrated Hunter presentation found:
- Guard slots: 63;
- Hunter/Expedition slots: 64;
- exact slot-ID overlap: **0**.

The Guard changes are additive under Guard-specific namespaces and do not delete or rewrite Tavern/Satyr/Undead/Forest presentation consumers. Hunter preservation must still be rechecked by Lead/QA when this focused sibling delta is applied to the current integrated main.
