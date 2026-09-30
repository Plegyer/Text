# Tavern Ending Production Binding Package v1

Status: C2-62 COMPLETE
Owner: Chat 2 / Presentation & Media

The three existing Tavern ending semantic IDs are already active on current main after the accepted C2-60 wave:

- `ending/tavern-stay` -> `assets/presentation/tavern-ending-stay.svg`
- `ending/tavern-guild` -> `assets/presentation/tavern-ending-guild.svg`
- `ending/tavern-court` -> `assets/presentation/tavern-ending-court.svg`

Each binding:
- uses the existing gameplay-derived ending semantic ID;
- is an exact static image override in `content/presentation.json`;
- uses the accepted `presentation.static.ending.*.alt` namespace;
- has a paired RU/EN caption key;
- retains registry fallback to `location/town/default`.

Production mutation required by C2-62: **0**.

No ending condition, reward, commitment rule, RunResult identity or Save field is changed. The package is recorded in the queue-v7 binding manifest for later regression.
