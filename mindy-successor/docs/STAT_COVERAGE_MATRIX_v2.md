# Stat Coverage Matrix v2

Дата: 2026-09-25.

Статус: **TARGET DESIGN ANALYSIS**.

Основание:
- `TARGET_STAT_SYSTEM_v1.md`;
- все 10 ordinary career drafts;
- `SUCCESSOR_JOB_SEASON_MATRIX_v0.csv`;
- School/Activity/Palace design.

## 1. Target axes

Progression:
1. Strength
2. Endurance
3. Dexterity
4. Reason
5. Magic
6. Creativity
7. Wits
8. Charm
9. Sociability
10. Manners
11. Grooming
12. Sexuality

Separate:
13. Lust content axis.

## 2. Coverage by ordinary jobs

Legend:
- P = primary;
- S = secondary;
- G = gate/branch;
- V = seasonal/variant use;
- — = not central.

| Job | Str | End | Dex | Reason | Magic | Creativity | Wits | Charm | Sociability | Manners | Grooming | Sexuality |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lumber | P | P | S | G | G | — | S | S | S | G | V- | — |
| Satyr Maid | — | S | S | — | — | S | S | P | P | S | P | P |
| Undead Farm | S | P | S | P | P | S | S | G | — | — | V- | — |
| Tavern | — | S | S | S | G | S | P | P | P | S | S | G |
| Hunter | S | P | P | S | S/G | — | P | — | V | V- | V- | — |
| Guard | P | P | S | P/S | G | V | S/G | S | S | P | V- | — |
| Artist/Geisha | — | S | S | S | S/G | P | S | P | P | P | P | S |
| Assassin | S | S | P | S | G | — | P | G | V- | S | V- | — |
| Merchant | — | S | S | P | G | — | P | P | S/P | P | S | G |
| Prostitute | — | S | S | G | — | — | S | P | P | P | S | P |

Lust:
- global voluntary-content routing;
- especially visible in Satyr Maid / Prostitute / relationships / selected Palace routes;
- not job salary penalty.

## 3. Sources of growth

### Strength
Jobs:
- Lumber;
- Farm;
- Guard;
- Hunter seasonal.

School:
- physical training.

Activity:
- force/obstacle.

### Endurance
Jobs:
- Lumber;
- Farm;
- Hunter;
- Guard;
- selected Prostitute seasonal work.

School:
- conditioning.

Activity:
- survive/endure.

### Dexterity
Jobs:
- Hunter;
- Assassin;
- seasonal Lumber/Farm/Guard/Artist.

School:
- practical craft / movement.

Activity:
- precision/stealth.

### Reason
Jobs:
- Farm;
- Tavern;
- Guard;
- Artist;
- Assassin;
- Merchant.

School:
- literacy/theory/analysis.

Activity:
- analysis/puzzles.

### Magic
Jobs:
- Farm primary;
- Hunter selected seasons/routes;
- Artist ritual/court performance routes;
- Guard/Assassin/Merchant branch gates.

School:
- Arcana.

Activity:
- supernatural interaction.

Palace:
- ritual/archives.

This prevents Magic from being a one-job stat.

### Creativity
Jobs:
- Artist primary;
- Satyr Maid festival/performance seasons;
- Farm winter experimentation;
- selected Tavern/event variants.

School:
- arts/performance.

Activity:
- ritual/improvised creation.

Palace:
- ceremony/design.

### Wits
Jobs:
- Tavern;
- Hunter;
- Assassin;
- Merchant.

School:
- practical problem solving.

Activity:
- bypass/navigation.

Poverty:
- survival options.

### Charm
Jobs:
- Satyr Maid;
- Tavern;
- Artist;
- Merchant;
- Prostitute;
- selected Guard.

School:
- rhetoric.

Relationships:
- persuasion/personal influence.

### Sociability
Jobs:
- Satyr Maid;
- Tavern;
- Artist;
- Merchant;
- Prostitute.

School:
- group/social practice.

Relationships:
- groups/networks.

### Manners
Jobs:
- Guard;
- Artist;
- Merchant;
- Prostitute;
- Satyr Maid/Tavern secondary.

School:
- etiquette.

Palace:
- formal access.

### Grooming
Jobs:
- Satyr Maid primary;
- Artist primary;
- Tavern/Prostitute secondary;
- several dirty/field jobs reduce it seasonally.

Housing:
- room quality/self-care.

Street:
- losses.

School:
- presentation/self-care.

Relationships/Palace:
- status/presentation gates.

### Sexuality
Jobs:
- Satyr Maid;
- Prostitute;
- Artist secondary;
- Secret Debt career.

School:
- body confidence/performance.

Relationships:
- selected approaches.

Not equal to Lust.

## 4. Negative / volatility coverage

Not every stat should only climb.

Strongly volatile:
- Grooming;
- Sociability;
- Manners;
- Endurance in some specialist routines.

Moderately volatile:
- Strength;
- Dexterity;
- Charm;
- Wits.

Reason/Magic/Creativity can fall in specific seasonal/work contexts but should not be generic punishment for "non-academic" work.

## 5. Coverage requirement

Before final numeric lock:
- every progression stat needs at least 2 meaningful job sources OR 1 strong job + multiple non-job sources;
- every stat must appear in School or equivalent progression;
- every stat must have at least one Activity/Palace/relationship use;
- no stat exists solely for one ending.

Current matrix satisfies this structurally if School v1 and Activity are implemented as designed.

## 6. Grooming conclusion

No separate permanent Cleanliness/Grooming meter is needed.

Grooming itself is:
- progression state;
- high-volatility;
- seasonally affected;
- tied to housing/service/status.

Short-term dirty/wet/sick conditions remain optional named statuses.

## 7. Supersedes

This replaces `STAT_COVERAGE_MATRIX_v1.md` for target design.
