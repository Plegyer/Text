# Meta Macro-Goal Draft v0

Дата: 2026-09-25.

Статус: **PRODUCT DESIGN DRAFT / STRUCTURAL PROPOSAL**.

Покрывает: LIFE-14, LIFE-15, LIFE-16.

Не фиксирует конкретную тайну мира или финальный сюжет.

## 1. Требование

Несколько жизней должны давать не только бонусы следующему run, но и движение к более крупному результату.

При этом:
- игра не становится линейным расследованием;
- ordinary careers остаются самостоятельными жизнями;
- macro-goal не копирует Simply Mindy Final Mode;
- игрок может долго игнорировать большую тайну.

## 2. Два слоя Meta

### Utility Meta
Меняет будущие runs:
- unlock profession;
- starting option;
- item/source;
- rule modifier;
- dialogue knowledge;
- alternate start.

### Knowledge / World Meta
Фиксирует то, что героиня/игрок узнал между жизнями:
- fragments;
- testimonies;
- symbols;
- institutional facts;
- routes/locations;
- contradictions.

Эти знания могут открывать новые choices без прямого stat bonus.

## 3. Knowledge fragments

Не использовать один progress bar `mystery = 73%`.

Лучше typed fragments с provenance:

```text
MetaKnowledge
  fragments: Set<KnowledgeId>
  constellations/crossLinks
  verifiedFacts?
```

Источники должны быть разнообразны:
- profession ending;
- School;
- relationship;
- Activity;
- Palace;
- poverty route;
- seasonal event.

Не каждый ending обязан давать fragment.

## 4. Cross-life recognition

Meta knowledge может менять новую жизнь:
- новая реплика при первом знакомстве;
- героиня узнаёт символ/место;
- новый route доступен раньше;
- NPC замечает странное знание;
- можно пропустить уже понятную ловушку;
- открывается alternate resolution.

Это сильнее простого +stat и хорошо поддерживает NG+.

## 5. Macro progression

Рабочая структура:

```text
independent lives
-> collect different kinds of achievements/knowledge
-> unlock Palace / other late access
-> connect previously separate facts
-> become eligible for a meta-level route
-> player chooses whether to pursue it
```

Нельзя требовать "пройти все 10 профессий" без отдельного решения.

## 6. Constellations

Чтобы не превращать систему в checklist, fragments могут образовывать смысловые группы.

Placeholder examples:
- происхождение мира;
- исчезновение женщин;
- роль власти/Дворца;
- природа переходов между жизнями;
- происхождение белого суслика/портала.

Это только категории для архитектуры. Конкретные ответы НЕ зафиксированы.

Meta route может требовать не N любых fragments, а комбинацию разных perspectives.

## 7. Palace relation

Palace — сильный convergence point, но не единственный источник истины.

Правило:
- Palace может дать доступ к закрытым данным/людям;
- без внешних fragments часть дворцовых выводов недоступна;
- внешние careers должны оставаться ценными.

Так meta goal мотивирует разнообразные жизни.

## 8. Ending and macro-goal separation

Профессиональная ending завершает конкретную жизнь.

Macro progress:
- может быть awarded вместе с RunResult;
- сохраняется отдельно;
- не отменяет ценность ending.

Финальный meta route может иметь собственный RunResult/ending family позднее.

## 9. No forced reset grind

Нельзя строить macro-goal так, чтобы игрок обязан был:
- намеренно завершать короткие бессодержательные runs;
- повторять одну и ту же ending ради progress;
- читать одинаковые сцены.

Считать уникальные meaningful achievements/facts.

## 10. Meta reward model compatibility

Документ совместим с будущим выбором:
- automatic rewards;
- selectable pre-run loadout;
- slots/budget.

Knowledge unlocks лучше делать постоянными, потому что "забывать уже раскрытый факт ради слота" нелогично.

Rule-changing perks могут быть selectable, если баланс этого потребует.

## 11. White rabbit / arrival mystery

Белый суслик и попадание в мир уже входят в пользовательский замысел.

Он естественный кандидат на один из macro threads, но этот draft НЕ решает:
- кто он;
- почему героиня переносится;
- является ли он союзником;
- является ли он причиной цикла.

Не заполнять этот пробел случайным lore при реализации.

## 12. Meta UI

Нужен способ видеть:
- какие endings получены;
- какие rule unlocks доступны;
- какие знания открыты;
- где есть связи между fragments.

UI не должен прямо показывать скрытые answers до discovery.

Возможная форма:
- дневник воспоминаний;
- доска/созвездие фактов;
- архив судеб.

Exact presentation OPEN.

## 13. Acceptance

LIFE-15 считается реально покрытой, когда playable build показывает:

1. Ending A даёт utility unlock.
2. Ending B из другой системы даёт knowledge fragment.
3. Новый run реагирует на fragment новой option/replique.
4. Комбинация нескольких уникальных facts открывает late opportunity.
5. Palace или другая late system использует эти facts.
6. Игрок может проигнорировать late route и прожить обычную ending.
7. Meta progress переживает save/import без отката.
8. Повтор той же ending не фармит бесконечно тот же progress.

## 14. Открыто

- конкретная глобальная тайна;
- финальный meta route;
- exact fragment catalog;
- сколько distinct lives нужно;
- является ли Palace обязательным для финального результата;
- форма финального окончания;
- визуальное представление MetaKnowledge.
