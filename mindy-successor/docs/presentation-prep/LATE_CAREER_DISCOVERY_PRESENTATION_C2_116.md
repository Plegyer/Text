# C2-116 — Late-career discovery notification presentation

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

A presentation-only discovery notification now compares the seven late-career actions before and after an existing engine command by calling the existing `actionAvailable(...)` selector. It never computes or owns unlock criteria.

If one late career becomes available, the UI announces the localized career name through the existing status toast. If several become available in the same transition, one aggregate RU/EN notification lists them. The notification is ephemeral UI state only: it is not serialized, does not add a Save field, and does not alter progression, conditions, rewards or RNG.
