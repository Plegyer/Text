# School UI Copy RU+EN v2

Status: polished bilingual player-facing copy for currently safe School UI surfaces.
Rule: Russian is source authoring; English is the full second locale. Numeric mechanics remain shared and unchanged.

## School panel

Localization key: `ui.school.title`

RU:
**Школа**

EN:
**School**

Localization key: `ui.school.help`

RU:
Восемь оплачиваемых курсов. Успешный урок списывает стоимость курса и 1 единицу текущей Energy одним действием.

EN:
Eight paid courses are available. A successful lesson charges the course tuition and 1 current-day Energy in one transaction.

## Tuition / Energy line

Localization key: `ui.school.tuitionEnergy`

RU:
**Стоимость: {tuition} монет · Энергия сегодня: {energy}**

EN:
**Tuition: {tuition} coins · Energy today: {energy}**

Values:
- `{tuition}` comes from the shared course definition;
- `{energy}` comes from the shared course definition;
- localized text must never hardcode a different numeric value.

## Paid lesson button

Localization key: `ui.school.lessonButton`

RU:
**Учиться**

EN:
**Study**

The button selects the same locale-neutral `school.course.*` identity in both languages.

## Night-study entry / context

Localization key: `ui.school.nightStudyButton`

RU:
**Учиться ночью**

EN:
**Study at night**

Localization key: `ui.school.nightStudyContext`

RU:
Ночная учёба не требует оплаты или текущей Energy. Выбранная поддерживаемая характеристика получает +2, а Energy следующего дня уменьшается на 1.

EN:
Night study costs no tuition or current-day Energy. The selected supported stat gains +2, and next-day Energy is reduced by 1.

Mechanics remain:
- tuition 0;
- current-day Energy cost 0;
- selected supported stat +2;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`.

## Generic post-lesson shell

Localization key: `school.generic.after_school.title`

RU:
**После урока**

EN:
**After the School lesson**

Localization key: `school.generic.after_school.choice.continue.label`

RU:
**Продолжить**

EN:
**Continue**

Localization key: `school.generic.after_school.choice.continue.text`

RU:
Вернуться к остатку дня после школьной сцены.

EN:
Return to the rest of the day after the School scene.

This shell is course-neutral and must not name a teacher or exact course when routed only through `actionCompleted:school`.

## Generic post-lesson fallback context

Localization key: `school.media.generic.classroom.caption`

RU:
Урок уже завершён; сцена показывает спокойное послесловие без новых игровых эффектов.

EN:
The lesson is already complete; the scene shows a quiet aftermath with no new gameplay effects.

## Disabled-state copy guidance

When the School UI later localizes disabled reasons, wording may differ but gameplay eligibility must remain identical.

Recommended terminology:

RU:
- Недостаточно монет.
- Недостаточно текущей Energy.
- Сначала завершите текущую сцену.
- Во время NightFlow новый оплачиваемый урок недоступен.
- Во время Activity новый оплачиваемый урок недоступен.

EN:
- Not enough coins.
- Not enough current-day Energy.
- Finish the current scene first.
- A new paid lesson is unavailable during NightFlow.
- A new paid lesson is unavailable during an Activity.

These are wording recommendations only; they do not add or change eligibility rules.

## Course-name source

Use the deterministic course keys from `SCHOOL_LOCALIZATION_KEY_INVENTORY_v1.md`:
- `school.course.literacy_and_numbers.label`
- `school.course.arcana.label`
- `school.course.rhetoric_and_social.label`
- `school.course.etiquette_and_presentation.label`
- `school.course.field_craft.label`
- `school.course.physical_training.label`
- `school.course.arts_and_performance.label`
- `school.course.body_confidence.label`

Descriptions use the matching `.description` keys.

## Language invariants

Switching RU/EN must not change:
- selected course ID;
- tuition;
- Energy;
- stat effects;
- Lust;
- School progress;
- Night mechanics;
- event/variant identity;
- save-state identity;
- public-result behavior.

Only player-facing presentation text changes.
