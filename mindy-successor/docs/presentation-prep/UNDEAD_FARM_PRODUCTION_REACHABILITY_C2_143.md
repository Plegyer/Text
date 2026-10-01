# C2-143 — Undead Farm production presentation reachability

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Frozen runtime base: Chat 1 PR #178 exact head `b75e73c0f5e37b19277cb25cf0321587f6444ab4`

The finalization branch is built directly on the frozen C1D-109..120 Undead Farm runtime. Preparation-only reservation loops for Undead event and ending presentation IDs have been removed: those slots now exist only because the live production catalog contains the corresponding events/endings.

The C2-143 regression proves every Undead override published in production `content/presentation.json` is backed by a real frozen-runtime identity:
- seasonal/default shift and result surfaces are backed by `undead-farm.shift`;
- eight stage surfaces are backed by the live typed career stages;
- career/production/Night/School/Activity/crisis events are live catalog events with exact `undead-farm` source-domain mapping;
- Farm Keeper events are live relationship-domain events with exact `undead-farm.keeper` mapping;
- four resource feedback IDs are present in real action/event conditions/effects;
- all three ending IDs are live production endings.

A real `undead-farm.shift` from a normal started save is executed and the runtime writes the exact first-milestone presentation ID into pending state. The same test file verifies animation-off resolution selects exact static fallback for every published Undead override and that synthetic missing GIF paths still leave the exact project-owned static candidate reachable through the existing media-error cycling behavior.

No gameplay, Save/RNG, career/relationship state, School/NightFlow, Activity mechanics, ending conditions/rewards, or Meta authority is changed.
