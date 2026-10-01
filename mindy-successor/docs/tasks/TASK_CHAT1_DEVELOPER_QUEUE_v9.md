# Chat 1 Developer Queue v9

Status: **ACTIVE ASSIGNED**
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12

Goal: close locked full-game runtime gaps. Do not spend this queue on status documents.

### C1D-85 — fresh-main production reset
Start from current main on a fresh branch. Inspect old Chat 1 PRs only to avoid duplicate changes.

### C1D-86 — seven late-career derived unlocks
Implement the locked `stat gate OR calendar fallback` availability from `EXECUTABLE_TZ_v1.md`:
- Tavern: Charm >=45 AND Sociability >=35; Year 2 fallback.
- Hunter: Dexterity >=25 AND Endurance >=20 AND Wits >=15; Year 2 fallback.
- Guard: Strength >=30 AND Endurance >=30 AND Manners >=20; Year 2 fallback.
- Merchant: Wits >=20 AND Reason >=20 AND Sociability >=15; Year 2 fallback.
- Artist/Geisha: Creativity >=35 AND Manners >=25 AND Grooming >=30; Year 3 fallback.
- Assassin: Dexterity >=30 AND Wits >=25 AND Reason >=20; Year 3 fallback.
- Prostitute: Sexuality >=55 AND Charm >=40 AND Sociability >=35; Year 3 fallback.
Keep availability derived; no redundant authoritative unlock booleans.

### C1D-87 — unlock command/UI parity
Add regressions proving Work UI and command dispatch agree before stat gate, after stat gate and at Year fallback for all seven careers.

### C1D-88 — ordinary Hard Work production endings
Add missing Hard Work ending definitions for the other nine ordinary careers using master-spec baseline `completed_shifts >= 50`. Preserve Lumber exactly.

### C1D-89 — all-ten Hard Work Meta
Wire/verify the master-spec automatic Hard Work rewards for all ten ordinary careers, exactly once, with duplicate completion non-stacking and New Run persistence.

### C1D-90 — Palace 10/10 derived unlock seam
Implement derived Palace-unlock exposure from unique Hard Work completion of all ten ordinary careers. Do not invent Palace content/lore.

### C1D-91 — ending lifecycle parity
Prove every ordinary Hard Work ending follows eligibility -> continued play -> explicit commit -> complete -> RunResult -> Meta exactly once.

### C1D-92 — 160-day unlock reachability
Add natural calendar regressions for Year-2 and Year-3 fallback boundaries.

### C1D-93 — migration/backward compatibility
Verify existing schema-4 saves derive new availability correctly without new unlock fields.

### C1D-94 — all-ten career availability smoke
Cover 3 Day-1 starters + 7 late careers, stat unlocking, calendar unlocking and save/reload.

### C1D-95 — Hard Work/Palace Meta smoke
Prove ten unique ordinary Hard Work completions expose Palace eligibility; duplicates and Secret Debt do not count.

### C1D-96 — candidate freeze
Open one focused PR with exact-head full repository CI green; freeze it for Chat 4 QA. Do not merge it yourself.

Technical evidence stays in Git. Personal chat output remains only `Задание выполнено` / `Задания выполнены`.
