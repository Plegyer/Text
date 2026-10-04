# Chat 6 — Ending Localization Closure Producer v26

Use accepted v25 audit as the exact repair map.

Base:
`main@f36de067ae2e82518360dbe045f71c700e200805`.

Scope is content/localization only:
- D40 16 endings: title + description + epilogue RU/EN;
- 10 Hard Work epilogues RU/EN;
- 10 missing D41 epilogues RU/EN;
- guild-life + scholar-life epilogues RU/EN;
- Merchant wrong-route/parity repairs from v25;
- live Merchant/Artist Hard Work namespace cleanup.

Do not change app.ts: Activity v17 already supplies the generic localized ending-screen consumer.
Do not touch D42, Secret Debt, Palace, Activity content, or lumber-stay.

No full CI.
Add focused localization coverage tests and final handoff.
