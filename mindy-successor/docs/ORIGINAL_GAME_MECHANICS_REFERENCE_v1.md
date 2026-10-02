# Original Simply Mindy — mechanics reference v1

Status: **ACTIVE EXTRACTION REFERENCE**
Authority level: **reference only; never overrides USER_DECISIONS_LOCKED_v1.md**
Source: user-supplied `Simply_Mindy_360(4)(3).swf`

## Source fingerprint

CONFIRMED from the supplied binary:

- SHA-256: `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`
- file size: **44,588,359 bytes**
- SWF signature: **CWS** (zlib-compressed)
- SWF version: **16**
- declared uncompressed SWF length: **69,649,287 bytes**
- top-level `DefineBinaryData` tags: **834**
- top-level `DoABC` ActionScript bytecode tags: **45**

These values identify the exact original build being mined. If another SWF is supplied later, do not silently combine findings across hashes.

## Engine / packaging

CONFIRMED directly from the decompressed SWF byte stream:

- the build contains Stencyl runtime identifiers;
- embedded data paths include:
  - `assets/data/game.mbs`
  - `assets/data/scenes.mbs`
  - `assets/data/resources.mbs`
  - `assets/data/behaviors.mbs`

Interpretation:
- the original is a Stencyl Flash build;
- much of the game-specific data lives in embedded MBS resources and generated ActionScript/Haxe bytecode;
- mechanical extraction therefore uses MBS parsing and bytecode tracing, not only string search.

## Evidence policy

- **CONFIRMED** — directly extracted from this exact SWF/hash and mechanically verified.
- **INFERRED** — strongly indicated but not fully traced.
- **OPEN** — extraction target not yet resolved.

User-locked successor decisions always have priority over the original game.

Do not copy large original prose/content into successor. Store compact mechanical facts, numeric values, identifiers needed for verification, and concise behavior summaries.

## Durable research index

The extracted knowledge is not kept only in chat context. Verified findings are stored under `mindy-successor/research/` and summarized in project docs.

Core references already present:

- `docs/ORIGINAL_CORE_FINDINGS.md` — high-level loop/stat/job/School/Night/Meta findings.
- `research/original_job_economy_verified.md` — exact 12-job wage formulas.
- `research/original_job_matrix.csv` — machine-readable job matrix.
- `research/original_job_seasons.csv` — machine-readable seasonal job effects.
- `research/original_jobs_verified.md` — verified profession mechanics.
- `research/original_school_verified.md` — exact ordinary School prices/effects/Stamina cost.
- `research/original_school_options.csv` — machine-readable School table.
- `research/original_metaprogression_verified.md` — selectable ending bonuses, early-job unlocks, Stamina/meta rule modifiers and hidden stat-cap route.
- `research/original_achievement_bonus_catalog.csv` — machine-readable achievement/meta reward catalog.
- `research/original_new_run_verified.md` and `research/original_reset_persistence_verified.md` — next-run/reset behavior.
- `research/original_night_events_model.md` and `research/original_night_transition_matrix.csv` — Night behavior.
- `research/original_ending_commit_flow_verified.md` — ending commit lifecycle.
- additional verified dungeon/combat/item/seasonal research remains in the same directory.

This file is the canonical entry point; detailed research files are the durable evidence layer.

## Confirmed balance facts already extracted

### Starting state

CONFIRMED from `game.mbs` global attributes:
- year 1;
- day 1;
- money 600;
- Stamina 3;
- main original progression-like stats start at 1;
- `fuckability` starts at 1;
- `statBoost` starts false.

The original stat names/model are not identical to successor's 12 progression stats + separate Lust.

### Job economy

CONFIRMED from gameplay bytecode:
- work income is not fixed;
- all 12 original jobs use `base random roll + weighted professional stats + Fuckability`;
- Fuckability contributes positively to income for all 12 original jobs;
- early/mid/late jobs have increasingly strong base ranges and/or more weighted stats.

Example original Prostitute formula:
`random(50,75) + 1.5×Charisma + 1.5×Sociability + Fuckability`.

This supports the successor decision that Lust can raise Secret Debt work income, but original absolute money values must be normalized to successor economy.

### Work tradeoffs

CONFIRMED:
- original jobs use seasonal stat packages;
- those packages commonly contain both positive and negative stat changes;
- original frequency is often harsher than successor's current Product direction.

Successor lock remains: roughly 2 seasons out of 4 per ordinary profession should carry a negative stat tradeoff, not necessarily all four.

### School

CONFIRMED from School bytecode:
- ordinary paid lessons cost money and exactly 1 Stamina;
- verified course prices run from 300 to 600;
- School packages can raise a Lust-like stat (`Fuckability`) by +1, +2, or +3 alongside other stats.

Exact verified examples are stored in `research/original_school_verified.md`.

This supports, but does not define, successor Body Confidence +2 Lust.

### Meta / New Game+

CONFIRMED:
- original has 66 selectable ending-bonus entries;
- earned bonuses can be enabled/disabled for the next run;
- multiple bonuses can be active together;
- original contains +5 single-stat rewards, +3/+3 dual-stat patterns, early profession unlocks, starting money, daily income, +1 daily Stamina, carry-over effects and rule-changing rewards;
- a hidden original route raises the stat cap from 100 to 200 via persistent `statBoost`.

This is historical evidence for successor's configurable New Start+ philosophy. It does not override D21-D24.

## Secret Debt status

OPEN / NOT FOUND AS DIRECT ORIGINAL EQUIVALENT:

No mechanically verified original hidden street-lender state machine matching successor Secret Debt has been found.

Therefore successor values remain user-authored Product authority:
- encounter 20%;
- acceptance +2000;
- 10-day activation;
- debt 20000;
- forced Night every bound night;
- next-day Energy -1;
- hidden Hard Work 50 shifts;
- Takeover requires 10 paid School lessons;
- Body Confidence +2 Lust.

Original mechanics may inform balancing only through neighboring systems such as work wages, School, action economy and Meta rewards.

## Palace conflict already resolved

Original hidden stat-cap mechanics do not redefine successor Palace.

Successor authority remains:
- permanent ordinary Hard Work 10/10;
- all ten earned packages active in that New Start+;
- deterministic Day-1 Palace invitation;
- True Ending raises only the 12 progression-stat cap from 100 to 200;
- it does **not** multiply current/start values, +5 packages or manual allocation points.

## Extraction log

### Pass 1 — SWF structure
CONFIRMED:
- valid compressed SWF;
- Stencyl packaging;
- 834 embedded binary objects;
- 45 ABC bytecode units.

### Pass 2 — mechanics
CONFIRMED and durably stored:
- original stat/start state;
- job seasonal packages;
- exact job wage formulas;
- ordinary School costs/effects;
- New Run/reset persistence;
- ending/meta reward structure;
- Night model;
- substantial dungeon/combat/item mechanics.

Further passes should extend existing `research/original_*.md/.csv` files rather than keeping findings only in chat or temporary extraction files.
