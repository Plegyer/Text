# Chat 2 Palace v18 Frozen Head v72

Status: **FROZEN FOR CHAT4 NARROW REPAIR**

Exact Chat2 head:

`ed76c89829541c955e4129d6e0114c0d2fe7e562`

Branch:

`chat2/assembly-palace-d39-d48-current-main-v68`

Leader1 static verification on this exact head:

- Palace v15 -> v16 -> v18 cumulative reconstruction is present.
- `src/core/palace.ts` matches v18 authority semantics.
- `src/core/schema.ts` contains only the accepted Palace state delta over current Stage1 schema; no Stage1 deletion.
- `src/core/engine.ts` contains the accepted v15 Palace runtime delta; Secret Debt/D51 markers are preserved and `assertPalaceProgressionState(s)` is present.
- `content/definitions.json` changes exactly 28 Palace stable IDs and zero non-Palace IDs.
- `content/localization.json` contains the exact 202-key Palace union; 0 non-Palace localization changes.
- Palace invitation is exact v18 authority.
- Palace outcome/progression/confrontation packs are exact v18 authority.
- `src/ui/palaceUi.ts` is exact v18 authority.
- `src/ui/app.ts` preserves current Secret Debt hidden-work UI and adds Palace UI semantically.
- Leader1 repaired one missed v18 UI hunk on top of Chat2 head:
  Palace actions now use accepted Palace-specific button labels, including `palace.confront-prince`.

Known unresolved historical defects intentionally left for Chat4:

1. `palace-outcome-finalize.json -> capabilities.reads.worldFacts` lacks exactly:
   - `palace.outcome.service-life-ready`
   - `palace.outcome.court-power-ready`
   - `palace.outcome.inner-truth-ready`
2. Historical Palace tests require strict-type adaptation only.

Do not layer Palace v19, D39, Strong Meta UI or D48 until Chat4 repair is complete.

Broad burn-down remains **4**.
