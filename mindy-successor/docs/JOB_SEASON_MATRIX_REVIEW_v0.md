# Successor Job Season Matrix Review v0

Дата: 2026-09-25.

Статус: **BALANCE REVIEW** для `SUCCESSOR_JOB_SEASON_MATRIX_v0.csv`.

Матрица уже проверяет принятую структуру seasonal stat packages, но exact numbers ещё не locked.

## Annual net drift per four representative seasonal shifts

| Job | Основной положительный drift | Основной отрицательный drift | Review |
|---|---|---|---|
| Lumber | Strength +3, Endurance +3, Dexterity +1 | Grooming -3, Manners -1, Sociability -1 | читаемый physical specialization |
| Satyr Maid | Grooming +3, Charm +3, Sociability +2, Sexuality +2 | Strength -3, Endurance -2, Dexterity -1 | хорошо проверяет service/social build |
| Undead Farm | Strength +2, Magic +2, Endurance/Dexterity/Reason/Creativity +1 | Grooming -3, Charm -1 | хороший physical-magical bridge |
| Tavern | Sociability +3, Charm/Wits +2 | Strength -2, Dexterity -2, Endurance -1 | strong social/info specialization |
| Hunter | Dexterity +3, Endurance +3, Wits +2 | Grooming -3, social losses | coherent field specialization |
| Guard | Strength/Manners +2, several +1 | Grooming -2, Wits/Creativity -1 | balanced institutional build |
| Artist/Geisha | Grooming +4, Creativity +3, Charm/Manners +2 | Strength -4, Endurance -3 | **too physically punitive; tune before lock** |
| Assassin | Dexterity +3, Wits +3 | Charm -2, several -1 | coherent covert specialization |
| Merchant | Wits +3, Reason/Charm +2 | Strength -2, Endurance -2 | coherent economic/social build |
| Prostitute | Sexuality +3, Charm +3, Sociability +2 | Strength -3, Dexterity -1 | workable, but check long-run physical decay |

## Coverage result

После расширения matrix:
- Magic растёт не только на Farm, но также через Hunter/Artist seasonal contexts;
- Creativity растёт через Artist, Satyr Maid seasonal work и Farm experimentation;
- Grooming имеет сильные positive anchors Satyr Maid / Artist и negative anchors field/dirty jobs;
- Sexuality имеет job anchors Satyr Maid / Artist / Prostitute, плюс Secret Debt career;
- social axes больше не схлопнуты в одну характеристику.

## Main tuning risks

1. **Artist/Geisha physical decay** слишком сильный в текущей версии.
2. **Grooming volatility** должна быть заметной, но не заставлять игрока постоянно чинить stat.
3. **Prostitute Strength loss** проверить на 160-day specialist run, чтобы не получался абсурдный floor.
4. Farm/Lumber/Hunter могут слишком быстро уронить Grooming, если housing recovery слабая.
5. Satyr Maid/Artist могут слишком легко поддерживать Grooming без housing investment.

## Simulation required

Перед numeric lock прогнать:
- 20 / 50 / 80 shifts одной профессии;
- mixed two-career run;
- School-assisted correction;
- cheap lodging / normal lodging / street;
- 160-day specialist runs.

Metrics:
- stat floor hits;
- cap hits;
- annual net drift;
- number of School actions required to correct specialization;
- whether seasonal switching creates meaningful planning.

## Lock criterion

Exact seasonal numbers фиксируются только когда:
- ни один ordinary career не разрушает build за нормальный Hard Work path;
- specialization заметен;
- School полезна, но не обязательна как repair tax;
- Grooming остаётся полезной и изменчивой, но не микроменеджментом.
