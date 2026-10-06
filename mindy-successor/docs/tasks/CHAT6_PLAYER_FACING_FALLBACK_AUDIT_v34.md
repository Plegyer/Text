# Chat 6 — Player-Facing Fallback / Raw-Key Audit v34

Status: **AUDIT COMPLETE — 1 P1 ASSEMBLY DEPENDENCY, 0 P0, 0 P2**  
Owner: Chat 6  
Branch: `chat6/release-localization-bundle-v33`

Scope: static audit only. No runtime, mechanics, localization, or presentation mutation. No full CI.

Primary assembly authority:

- v32 packet: `chat6/final-localization-assembly-packet-v32@6613e597379191e7eee15116ed27d1a15f895d5d`
- v33 machine-readable manifest: `CHAT6_FINAL_LOCALIZATION_PRESENTATION_MANIFEST_v33.json`

## Severity rubric

- **P0** — player-facing localization/presentation is unusable or a live route is blocked.
- **P1** — release-relevant risk that can expose wrong/fallback copy on a valid live route unless the documented assembly dependency is preserved.
- **P2** — non-blocking localized polish/fallback weakness with no route or semantic loss.

## Resolver behavior

Frozen runtime localization helper blob audited:

`src/core/localization.ts@00136148315f783dbba3b6ff905a1fab3ca11c83`

The resolver order is:

1. requested locale;
2. RU entry;
3. caller fallback;
4. key only if the fallback is nullish.

The UI wrapper supplies an empty-string default fallback, so normal `tr(key)` calls do **not** expose raw localization keys. A missing assembled key can instead degrade to RU, a caller-authored fallback, or an empty string. The release risk is therefore fallback-language / missing-copy behavior rather than literal raw-key leakage.

## Family audit

| Family | Accepted localization surface | Static result | Player-facing fallback assessment |
|---|---:|---|---|
| Ordinary endings | 40 endings × title/description/epilogue = **120** keys from `b355f08650cc1cdbb0d08e07529382c1afb0605c` | **120/120 RU+EN present** | Clean if the accepted ended-screen epilogue seam is assembled. Legacy title/description rendering uses localized keys with definition fallback. |
| Secret Debt endings | 3 endings × 3 fields = **9** keys from `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae` | **9/9 RU+EN present** | Clean if the generic ended-screen epilogue seam is assembled. No Secret Debt-specific fallback workaround exists or is needed. |
| D42 Night | **110** required event/night/media/UI keys from `9281d3880d01c54f352effa5e372ad5393cc3eaa` | **110/110 RU+EN present** | Clean. Event title/body/continue copy has localized Night fallbacks; all 12 media alt/caption pairs are present. |
| Activity endings | 3 endings × 3 fields = **9** ending keys, plus 3 alt/caption pairs from `4449ca46ad6580ca5f36adf140e9e1e14a007b64` | **all required RU+EN present** | Copy is complete. The accepted v17 runtime seam is the only release-relevant dependency; see P1 below. |
| Palace endings | 4 endings × 3 fields = **12** ending keys from `64922de3b6aab606f9b2932853e6bbd686766b6a` | **12/12 RU+EN present** | Copy is complete. Palace v19 is a non-cumulative overlay and must inherit the accepted generic ended-screen epilogue seam rather than its branch-local older app snapshot. |
| Generic ending screen | `ui.run.endingCompleted`, `ui.run.endingAccepted`, `ui.run.endingCommitted`, `ui.run.timeExpired`, `ui.run.fatesAndNextLife` | **5/5 RU+EN present** | Heading/buttons are clean. Completed-ending body depends on the accepted v17 localized-epilogue consumer. |
| Generic Night room/rest | `media.stage.room.{alt,caption}`, `media.base.town.{alt,caption}` | **4/4 RU+EN present**; caption exactly equals paired alt in both locales | Clean after v29 is assembled. v23 `night/rent-room/default` and `night/rest/default` therefore do not rely on unlocalized media caption fallback. |

## P1 finding — accepted ended-screen epilogue seam is a required cross-producer assembly dependency

The release bundle contains complete bilingual epilogues, but the localized completed-ending consumer lives in the accepted Activity v17 runtime seam.

Accepted Activity v17 app blob:

`src/ui/app.ts@02afa7a9b32720c6e391c0a07974d662e77f8ea0`

On an already-ended run it resolves:

`ending.<stable-ending-id>.epilogue`

through the localization bundle and uses the definition epilogue only as fallback.

The fresh v33 recovery seed app blob:

`src/ui/app.ts@149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`

is an older non-cumulative snapshot and still renders the last journal line on the completed-ending screen. Palace v19 likewise carries an older branch-local app snapshot. If either snapshot is copied wholesale during assembly, EN players can receive authored fallback/journal text instead of the accepted localized epilogue, and final ordinary / Secret Debt / Activity / Palace epilogues cease to be reliably player-facing.

Classification: **P1**.

Disposition: no Chat 6 runtime edit is authorized or needed here. Preserve the accepted v17 seam during Chat 2 selective assembly. This is the same gate already encoded by v32 stop condition 13 and v33 phase-4 dependency. If the seam is absent in the runnable integration checkout, **stop preflight** rather than accepting fallback behavior.

## Raw-key findings

- **P0:** none.
- Literal raw localization-key leakage on the audited paths: **none found**.
- D42 Night media caption gaps: **none**.
- Generic room/rest caption gaps after v29: **none**.
- Missing RU/EN ending fields in the accepted source blobs: **none**.
- **P2:** none.

## Final disposition

The accepted localization content itself is complete for every requested live family. The only release-relevant fallback risk is compositional: the localized ended-screen epilogue consumer must survive selective assembly across non-cumulative producer snapshots.

**v34 AUDIT COMPLETE**
