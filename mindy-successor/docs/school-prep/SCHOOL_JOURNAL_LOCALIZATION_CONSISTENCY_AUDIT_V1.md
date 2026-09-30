# School Journal / Localization Consistency Audit v1

Task: C5-68
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Fixture: `content/school-journal-localization-consistency-audit-v1.fixture.json`

Current course labels have complete root RU/EN localization, but two presentation captions use different RU course names:
- Literacy & Numbers canonical: **Грамотность и счёт**; current presentation caption: **Грамота и числа**.
- Etiquette & Presentation canonical: **Этикет и самопрезентация**; current presentation caption: **Этикет и подача**.

The paid-lesson runtime journal is not localization-backed. It writes an English template using the English `SchoolCourse.label` and pushes a null journal localization reference.

The paid-lesson `lastAction` also stores an English title/text fallback, while a localized UI result key exists separately.

RU School mechanics strings currently mix `Energy` and `Энергия`, and use both `Оплата` and `Стоимость` for tuition-related wording.

This task records the inconsistencies only. It does not modify runtime, journal schema, root localization or presentation assets.
