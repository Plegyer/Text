# Chat 6 — Final Player-Facing Localization Repair v40

Status: **PRODUCER COMPLETE — READY_FOR_LEADER_REVIEW**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-release-audit-v39`

v40 is the content-only repair generated from v39 findings.

No runtime change.  
No mechanics change.  
No routing change.  
No reward-ID/class/ownership change.  
No presentation-slot change.  
No full CI.

## Frozen producer

Exact producer SHA:

`2eca98265ed91f1fd3c62a2d2d2be9504feab075`

v39 baseline commit:

`a9e067a054d183a7d84deec195cbd523c4dba3f8`

Final localization blob:

`4626e55203cda0d841a04eaf781db7879781138c`

Focused test:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-player-facing-localization-v40.test.ts`

## Exact producer diff

Relative to the v39 audit commit, the producer changes exactly two files:

1. `content/localization.json`
2. `tests/final-player-facing-localization-v40.test.ts`

Localization structural delta relative to D42 predecessor blob
`9281d3880d01c54f352effa5e372ad5393cc3eaa`:

- added keys: **21**
- removed keys: **0**
- changed existing keys: **0**

## Four literal UI closure rows

`ui.condition.schoolCounter`

- RU: `Школа {track}: {counter} {comparison}`
- EN: `School {track}: {counter} {comparison}`

`ui.activity.fieldTimeLabel`

- RU: `Полевое время`
- EN: `Field time`

`ui.activity.miniGameLabel`

- RU: `Мини-игра`
- EN: `Mini-game`

`ui.activity.suspicionLabel`

- RU: `Подозрение`
- EN: `Suspicion`

## Seventeen permanent reward label rows

### D41 automatic knowledge/content

- `unlock.satyr-maid.clear-terms.label`
  - RU: `Чёткие условия`
  - EN: `Clear Terms`

- `unlock.knowledge.undead-farm.anomaly-catalog.label`
  - RU: `Каталог аномалий`
  - EN: `Anomaly Catalog`

- `unlock.knowledge.tavern.broker-index.label`
  - RU: `Справочник посредника`
  - EN: `Broker Index`

- `unlock.knowledge.hunter.warden-signs.label`
  - RU: `Знаки хранителя`
  - EN: `Warden Signs`

- `unlock.knowledge.hunter.legend-contracts.label`
  - RU: `Легендарные контракты`
  - EN: `Legend Contracts`

### D40 compatibility labels for the existing generic Legacy consumer

Stable D40 reward IDs are unchanged. Because the current generic Legacy consumer resolves
`unlock.${rewardId}.label`, the exact localization compatibility aliases are:

- `unlock.unlock.guard.command-briefing.label`
  - RU: `Командный инструктаж`
  - EN: `Command Briefing`

- `unlock.unlock.guard.reform-practice.label`
  - RU: `Практика реформ`
  - EN: `Reform Practice`

- `unlock.unlock.guard.casebook-index.label`
  - RU: `Указатель дел`
  - EN: `Casebook Index`

- `unlock.unlock.merchant.house-supplier.label`
  - RU: `Поставщик дома`
  - EN: `House Supplier`

- `unlock.unlock.merchant.patron-destinations.label`
  - RU: `Направления покровителя`
  - EN: `Patron Destinations`

- `unlock.unlock.artist.master-repertoire.label`
  - RU: `Репертуар мастера`
  - EN: `Master Repertoire`

- `unlock.unlock.artist.court-context.label`
  - RU: `Придворный контекст`
  - EN: `Court Context`

- `unlock.unlock.assassin.refusal-protocol.label`
  - RU: `Протокол отказа`
  - EN: `Refusal Protocol`

- `unlock.unlock.prostitute.elite-protocol.label`
  - RU: `Элитный протокол`
  - EN: `Elite Protocol`

These rows are labels only. They do not rename or migrate the stable D40 reward IDs.

### Secret Debt locked reward identities

- `unlock.secret-debt.paid-freedom.earned-reserve-match.label`
  - RU: `Паритет заработанного резерва`
  - EN: `Earned Reserve Match`

- `unlock.secret-debt.bound-life.work-rhythm.label`
  - RU: `Рабочий ритм`
  - EN: `Work Rhythm`

- `unlock.secret-debt.takeover.network-retainer.label`
  - RU: `Сетевой гонорар`
  - EN: `Network Retainer`

The EN identities are the locked D30/D32 reward identities. This producer changes labels only, not Keystone behavior.

## Focused test contract

The focused v40 test asserts:

- exactly the four audited literal UI rows with exact RU/EN values;
- all 17 audited permanent reward labels with exact RU/EN values;
- no audited reward label equals its raw localization key;
- D40 stable reward IDs remain input IDs and the double-prefix rows are only generic-consumer localization aliases;
- Secret Debt EN reward identities remain exactly:
  - Earned Reserve Match
  - Work Rhythm
  - Network Retainer

The test was authored but not executed from this connector-only producer lane.

## Assembly guidance

Apply v40 as a **21-key additive localization overlay** after the normal accepted localization prerequisites.

For each v40 key:

1. absent -> add the frozen v40 value;
2. already exactly equal -> no-op;
3. present with any different value -> **STOP** for content conflict review.

Do not replace `localization.json` wholesale.

v40 is independent of presentation slots and must not disturb:

- v29 generic captions;
- v31 retired Tavern deletion fence;
- v36 Activity Network epilogue;
- Activity prerequisite ownership labels.

## Runtime-only v39 findings remain open

v40 intentionally does not repair:

- missing Strong Meta player-facing selector;
- raw internal panel IDs used as dialog ARIA names;
- hardcoded Russian Catalog Inspector text;
- raw diagnostic payload appended to localized save/load error wrappers.

Those require Leader/runtime/UI routing.

**v40 PRODUCER COMPLETE**
