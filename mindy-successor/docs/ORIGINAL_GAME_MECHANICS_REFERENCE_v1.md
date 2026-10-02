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
- the following Stencyl data paths are embedded in the SWF:
  - `assets/data/game.mbs`
  - `assets/data/scenes.mbs`
  - `assets/data/resources.mbs`
  - `assets/data/behaviors.mbs`

Interpretation:
- the original game is packaged as a Stencyl Flash build;
- much of the game-specific data is stored in embedded binary MBS resources rather than readable top-level strings;
- balance extraction therefore requires unpacking/parsing the embedded Stencyl data and/or the generated ActionScript bytecode, not only a string scan.

## Evidence policy

Every future entry in this file must use one of these labels:

- **CONFIRMED** — directly extracted from this exact SWF/hash and mechanically verified.
- **INFERRED** — strongly indicated by original data/code but not yet fully traced through runtime behavior.
- **OPEN** — extraction target not yet resolved.

User-locked successor decisions always have priority over the original game. Original values are used as:
- a balance reference;
- a source for missing historical mechanics;
- evidence when current Product values are still OPEN.

Do not copy large original prose/content into the successor. Record only mechanical facts, small identifiers where necessary, numeric values, and concise behavior summaries.

## Current extraction targets

OPEN:
- original progression/stat model and starting values;
- work stat gains/losses;
- wages and wage scaling;
- Lust starting value, growth sources and caps;
- School effects/prices;
- hidden poverty/debt-like route, if present in this build;
- career thresholds/endings/meta-like carryover, if present;
- any values useful for current Secret Debt balance blockers.

## Current Product conflicts already resolved in favor of successor

Even if the original differs, these successor values remain authoritative:

- Secret Debt encounter: **20%** on each eligible unseen street night;
- acceptance money: **2000**;
- activation delay: **10 days**;
- debt: **20000**;
- forced bound Night: every night;
- next-day Energy penalty: **-1**;
- hidden Hard Work: **50 daytime shifts**;
- Takeover School requirement: **10 paid lessons**;
- Body Confidence School: **Lust +2**;
- Palace entry: permanent ordinary Hard Work 10/10 + all ten packages active -> automatic **Day-1 invitation**;
- Palace True reward: progression-stat cap **100 -> 200 only**, no value multiplication.

## Extraction log

### Pass 1 — container / SWF structure
CONFIRMED:
- valid compressed SWF;
- Stencyl runtime/data-path fingerprints present;
- 834 embedded binary data objects;
- 45 ActionScript bytecode units.

Result:
- no balance constants are promoted to authority yet;
- next pass must extract MBS payloads / behavior metadata and trace game-specific values before recording numbers.

