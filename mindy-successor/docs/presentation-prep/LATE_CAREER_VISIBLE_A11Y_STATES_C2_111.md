# C2-111 — Late-career visible/accessibility states

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

The seven non-Day-1 ordinary career rows now expose a presentation-only availability state derived from the existing `actionAvailable(...)` result:

- Tavern
- Hunter
- Guard
- Merchant
- Artist House
- Assassin
- Professional

Each row presents RU/EN `Locked` / `Unlocked` text plus an accessibility label. The action button exposes a localized unavailable reason when locked and an available aria label when unlocked. The branch does not decide unlock thresholds or persist discovery state; later discovery notification presentation consumes derived availability only.
