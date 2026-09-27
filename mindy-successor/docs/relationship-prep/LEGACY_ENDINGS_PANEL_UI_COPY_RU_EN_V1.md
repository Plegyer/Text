# Legacy / Endings Panel UI Copy RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: shared endings / legacy panel shell only.

## Panel heading

Stable key: `ui.panel.legacy`  
RU: Судьбы  
EN: Fates

Current root already contains this exact RU+EN key for the dock label and it can be reused for the panel heading.

## `ui.legacy.help`
RU: Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие.  
EN: Reaching a fate does not end the life. Accepting it grants its legacy.

Current fallback seam:
`Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие.`

## `ui.legacy.acceptButton`
RU: Принять судьбу  
EN: Accept fate

## `ui.legacy.inheritanceTitle`
RU: Наследие  
EN: Legacy

## `ui.legacy.emptyInheritance`
RU: Ещё впереди  
EN: Still ahead

## `ui.legacy.nextLifeButton`
RU: Следующая жизнь  
EN: Next life

## Boundary

Shell text only. Do not alter:
- ending IDs;
- ending conditions;
- acceptance mechanics;
- meta unlocks;
- completed-ending state;
- legacy rewards;
- restart/new-life Save semantics.
