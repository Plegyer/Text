# Generic After-School Text Inventory v1

Task: C5-61
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Fixture: `content/school-generic-after-school-inventory-v1.fixture.json`

The only safe generic paid-lesson reaction identity is `actionCompleted: school`.

Current production already has two localized generic consumers of that same fact:
- `school-life-content-v1.after-paid-lesson` at priority 0;
- `school-lesson-content-v1.after-school` at priority 1.

Generic copy may mention a paid lesson, reflection, notes, already-applied tuition/Energy and returning to the day. It must not name a specific course or teacher, infer identity from stat deltas, or publish a milestone/career result.

Because two equivalent generic consumers already exist, any future integration should select or sequence an existing surface rather than add a third duplicate. `selectedRuntimeConsumerId` remains null.
