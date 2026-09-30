# Tavern Ending Presentation Coverage v1

Status: C2-38 COMPLETE / CURRENT-MAIN RESYNCED
Owner: Chat 2 / Presentation & Media
Baseline main: `699e0a5ffba4beba969c8e69cf1b0ec2a904a580`

The existing Tavern ending semantic IDs `ending/tavern-stay`, `ending/tavern-guild`, and `ending/tavern-court` remain current and still have no exact production override on the resynced main.

C2-38 supplies project-owned static sources `tavern-ending-stay.svg`, `tavern-ending-guild.svg`, and `tavern-ending-court.svg`. The cross-domain manifest binds those exact current semantic IDs to the prepared sources, records `location/town/default` as safe registry fallback, and carries RU/EN alt + caption metadata.

Per the current-main resync instruction, stale-branch edits to shared production presentation/localization files are not carried forward. C2-47 validates the prepared overrides as presentation-only patches against the current registry.
