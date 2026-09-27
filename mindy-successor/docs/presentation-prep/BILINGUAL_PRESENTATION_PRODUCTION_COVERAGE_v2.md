# Bilingual Presentation Production Coverage v2

Audit point:
- PR #41 merged as `974d6e077ffc511e304a64aef32f2aab81167f41`;
- PR41 head `6890aaa85dbe5a545219e8200560d307dce8f35d`;
- exact-head `mindy-successor check`: **SUCCESS**;
- current PR41 localization bundle contains **56 keys**;
- current bundle has **0 missing EN values** among those 56 keys.

PR41 adds:
- RU/EN localization runtime;
- RU default / EN optional-with-RU-fallback schema;
- language switch UI;
- localized town/HUD shell;
- localized Work panel shell;
- localized labels/descriptions for all 10 ordinary career shift actions.

## Status legend

### SHIPPED_RU_EN
Active current-main runtime resolves both RU and EN for the audited presentation/UI surface.

### RU_FALLBACK
Current active UI/content remains Russian or legacy-text fallback for EN because that surface is not yet keyed/localized.

### STAGED_RU_EN
RU+EN authoring exists in reviewed worker artifacts, but it is not yet active current-main localization/runtime data.

### NOT_MIGRATED
No complete active or staged bilingual mapping exists for the audited player-facing surface.

---

# Coverage matrix

| Product surface | Status | Current-main evidence | Remaining work |
| --- | --- | --- | --- |
| Town title / town prompt | SHIPPED_RU_EN | `ui.town.*` keys in PR41 | none for current shell |
| Main panel labels | SHIPPED_RU_EN | `ui.panel.work/school/explore/sleep/stats/journal/bag/legacy` | inner-panel content still mixed |
| HUD day/year/Energy/coins/menu | SHIPPED_RU_EN | `ui.hud.*` keys | remaining labels elsewhere still mixed |
| Work panel title/button/energy/coins/income | SHIPPED_RU_EN | `ui.work.*` keys | none for current base shell |
| 10 ordinary career Work labels | SHIPPED_RU_EN | all `action.<career>.shift.label` keys | seasonal/result presentation strings still staged/not wired |
| 10 ordinary career Work descriptions | SHIPPED_RU_EN | all `action.<career>.shift.description` keys | seasonal/result presentation strings still staged/not wired |
| Career seasonal scene text | STAGED_RU_EN | Chat2 bilingual career authoring/bundles | integrate localization keys into presentation/content seam |
| Career result-shell text | STAGED_RU_EN | Chat2 ten-career localization bundle | wire to result presentation |
| School town-panel tile/subtitle | SHIPPED_RU_EN | `ui.panel.school`, `ui.town.school.subtitle` | inner School UI/content remains mixed |
| School course list / tuition / stat line | RU_FALLBACK | `schoolList()` still renders catalog labels + hardcoded RU money/Energy terms | add School UI/course localization keys |
| School paid lesson presentation text | STAGED_RU_EN | Chat2 School bilingual inventory/producer authoring | integrate through localization seam |
| Generic post-School hook | STAGED_RU_EN | Chat2 bilingual School producer batch | localize event title/variant/choice in production data |
| School-life post-paid hook | STAGED_RU_EN | Chat2 bilingual School producer batch | localize event title/variant/choice |
| Exact Night-study presentation hook | STAGED_RU_EN | Chat2 RU+EN Night-study card | integrate event text/alt |
| Teacher names/roles/media alt | STAGED_RU_EN | teacher content exists; Chat2 identifies RU+EN needs | approve RU display names + integrate exact routing/localization |
| Ordinary poverty event text | STAGED_RU_EN | PR37 identities + Chat2 poverty bilingual inventory | production event titles/variants/choices not yet localized |
| Poverty static/media alt | STAGED_RU_EN | Chat2 bilingual migration/producer fixtures | presentation alt seam still missing |
| Forest town-panel tile/subtitle | SHIPPED_RU_EN | `ui.panel.explore`, `ui.town.explore.subtitle` | deeper Forest UI/content not localized |
| Forest panel heading/help text | RU_FALLBACK | current `panelContent()` contains hardcoded RU Forest/explore text | add localization keys |
| Forest Activity scene/result text | NOT_MIGRATED | no complete RU+EN production mapping yet | author/localize after content identity/depth |
| Night town-panel tile/subtitle | SHIPPED_RU_EN | `ui.panel.sleep`, `ui.town.sleep.subtitle` | deeper Night flow UI/content remains RU |
| Night panel heading/flow copy | RU_FALLBACK | hardcoded RU `Ночь` / NightFlow explanatory copy | add localization keys |
| School Night-study presentation | STAGED_RU_EN | bilingual authoring ready | integrate presentation localization |
| Endings/Fates main panel tile | SHIPPED_RU_EN | `ui.panel.legacy` / town tile localization | actual ending content not localized |
| Ending titles/descriptions/epilogues | NOT_MIGRATED | current catalog values are mixed legacy/EN/RU | migrate real ending identities one by one |
| Lumber existing ending presentation shell | STAGED_RU_EN | inventory identifies Lumber Hard Work / Forewoman / Forest | full title/description/epilogue RU+EN still required |
| Multi-GIF candidate alt/captions | STAGED_RU_EN | Chat2 bilingual manifest + 120-entry career alt pack | Lead multi-GIF runtime + localized presentation alt seam |
| Multi-GIF selector | NOT_MIGRATED | no explicit pool/selector in current presentation runtime | implement bounded Lead-owned pool/selector |
| Static presentation media files | SHIPPED_RU_EN | media files themselves are locale-neutral | localize semantic alt, not duplicate assets |

---

# Town / HUD

## SHIPPED_RU_EN

PR41 actively localizes:
- language controls;
- Menu;
- town title/eyebrow;
- Energy/no-Energy prompt;
- panel names;
- panel subtitles;
- Work panel shell;
- result shell labels;
- HUD day/year/Energy/coins/menu.

These strings switch RU ↔ EN through the new localization runtime.

## Remaining RU fallback

Many deeper panel-specific strings in `app.ts` remain hardcoded RU.

Examples include:
- condition explanations;
- School internal panel text;
- Explore/Forest internal headings;
- Night internal headings;
- stats/journal/bag/legacy inner descriptions.

They are not yet full EN.

---

# 10-career Work panel

## SHIPPED_RU_EN

PR41 includes RU+EN:
- label;
- description

for:
- Lumber;
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

This is real current-main runtime coverage.

## STAGED_RU_EN

Still staged:
- seasonal presentation captions;
- seasonal alt;
- result/default text;
- multi-GIF candidate alt.

Ready worker authoring:
- `ten-career-localization-v1.json`;
- `TEN_CAREER_MEDIA_ALT_RU_EN_v1.md`;
- bilingual producer batches.

---

# School

## SHIPPED_RU_EN

The town-level School panel label/subtitle is localized.

## RU_FALLBACK

The current School inner UI still contains:
- catalog course labels;
- hardcoded RU currency/Energy wording;
- stat presentation through legacy labels.

## STAGED_RU_EN

Ready authoring exists for:
- eight paid lesson result surfaces;
- generic post-School hook;
- School-life after-paid hook;
- exact Night-study hook;
- media alt.

Teacher-specific names/roles remain staged pending approved RU display forms and safe course routing.

---

# Poverty

PR37 gameplay/content is production-authoritative.

Localization status:
**STAGED_RU_EN**.

Chat2 has RU+EN authoring for representative:
- street/helpful;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Production main still stores event player text directly in content packs rather than through the PR41 localization catalog.

Therefore:
- gameplay is shipped;
- bilingual presentation text is not yet shipped;
- static fallbacks remain safe.

---

# Forest

## SHIPPED_RU_EN

Town-level Explore/Outskirts tile is bilingual.

## RU_FALLBACK / NOT_MIGRATED

Forest/Activity deeper presentation remains mostly legacy/hardcoded/catalog text.

No complete RU+EN Forest Activity presentation package is ready in this wave.

Do not claim full Forest localization from the localized town tile.

---

# Night

## SHIPPED_RU_EN

Town-level Lodging/Sleep panel tile is bilingual.

## RU_FALLBACK

Night panel internal heading/copy remains hardcoded RU.

## STAGED_RU_EN

Exact School Night-study post-event presentation has RU+EN worker authoring.

General NightFlow still needs broader localization.

---

# Endings

## SHIPPED_RU_EN

Only the outer Fates panel/tile shell is localized.

## NOT_MIGRATED

Actual ending:
- titles;
- descriptions;
- epilogues;
- condition explanation text

are not fully migrated.

Existing Lumber ending identities are known, but complete localized content remains work.

No missing non-Lumber endings should be invented for localization.

---

# Multi-GIF alt / captions

## STAGED_RU_EN

Chat2 now has:
- bilingual multi-GIF authoring fixture;
- localization key convention;
- 10-career bilingual bundle;
- 120-entry RU+EN career alt pack;
- School/poverty bilingual producer cards;
- locale-switch contract tests.

## NOT_MIGRATED runtime capability

Current presentation runtime still lacks:
- explicit 3–5 GIF pool schema;
- deterministic selector;
- localized presentation alt/caption resolver integration.

PR41 localization runtime can become the text resolver for this layer, but the presentation pool still needs its own bounded implementation.

---

# PR41 fallback behavior

PR41 runtime behavior:

```text
requested locale value
-> RU value
-> provided legacy fallback
```

This means:
- missing EN is safely displayable through RU;
- missing EN is detectable through `missingEnglishKeys()`;
- no gameplay state is affected.

At the current main audit:
**all 56 shipped PR41 localization keys have EN values.**

---

# Coverage conclusion

### SHIPPED_RU_EN
- town shell;
- HUD shell;
- panel tiles/subtitles;
- Work panel shell;
- all 10 ordinary career base action labels/descriptions.

### RU_FALLBACK
- many deeper School/Forest/Night/general UI strings still hardcoded RU.

### STAGED_RU_EN
- career seasonal/result presentation;
- School reachable presentation hooks;
- PR37 ordinary poverty;
- School Night-study presentation;
- multi-GIF candidate alt/captions.

### NOT_MIGRATED
- full Forest Activity presentation;
- general NightFlow inner UI;
- ending content;
- multi-GIF runtime/selector.

PR41 establishes the localization seam without changing gameplay or Save identity. The next presentation work is mostly content migration and multi-GIF integration rather than a new localization architecture.
