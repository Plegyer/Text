# Journal Panel UI Copy RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: Journal shell only.

## Panel heading

Stable key: `ui.panel.journal`  
RU: Дневник  
EN: Journal

Current root already contains this exact RU+EN key for the dock label. The panel heading can reuse it.

## `ui.journal.empty`
RU: Пока записей нет.  
EN: No entries yet.

Current main has no explicit empty-state sentence; this is optional shell copy for the existing empty list seam.

## Outcome-localization boundary

This item does **not** localize existing journal entry payloads.

Current journal rows render stored `run.journal` strings directly. Locale-neutral post-choice localization remains governed by:
- `LEGACY_JOURNAL_OUTCOME_PRESENTATION_CONTRACT_V1.md`
- item-80 stable event/choice identity contract.

Do not rewrite stored journal prose merely because locale changes.

## Boundary

Shell text only. No journal Save representation, event history, choice effects, RNG, event identity or gameplay state changes.
