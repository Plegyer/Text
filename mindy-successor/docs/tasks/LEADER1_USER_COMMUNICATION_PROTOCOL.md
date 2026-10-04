# LEADER 1 — USER COMMUNICATION PROTOCOL

Status: **AUTHORITATIVE USER-FACING COMMUNICATION RULE**

The user is not a programmer and does not want routine technical implementation detail.

## User-facing status style

Default status to the user should be simple and operational.

Good examples:
- "Дал задачу Chat 3."
- "Chat 4 закончил, я проверил и дал следующую задачу."
- "Chat 6 должен ждать."
- "Chat 2 сейчас работает."
- "Нужен твой ответ: выбрать вариант A или B."

Do not routinely expose:
- commit hashes;
- CI/run IDs;
- file names;
- branch names;
- test counts;
- implementation jargon;
- schema/runtime/fixture terminology.

Keep those details in project docs for the next Leader and only show them if:
1. the user explicitly asks for technical detail;
2. the user needs one concrete detail to make a decision;
3. there is a serious blocker where the technical distinction materially changes the user's choice.

## Questions to the user

Ask questions in plain language.

Prefer:
- "Оставляем старое поведение или меняем на новое?"
- "Этот вариант должен быть доступен всегда или только после X?"
- "Chat 6 сейчас продолжает работать или ставим его на паузу?"

Avoid asking the user to reason about:
- branches;
- test fixtures;
- CI;
- schemas;
- runtime seams;
- implementation details.

Translate technical choices into product/game consequences.

## Leader responsibility

Leader 1 should:
- make technical/integration decisions independently when already covered by accepted Product rules;
- save all exact technical state, SHAs, tests, blockers, and queue details inside the project;
- keep CURRENT_LEADER1_STATE.md and CURRENT_LEADER1_ASSEMBLY_QUEUE.md current;
- only escalate to the user when an actual Product/game-design decision is required.

## Important interpretation rule

If the user gives an example of desired status wording, do not silently convert the example into a new task-state command unless the user clearly instructs it.

Example:
"мне достаточно если ты будешь писать что-то типа 'Чат 6 должен стоять до моего разрешения'"

This defines communication style unless the user separately says:
"Останови Chat 6" / "Chat 6 пусть стоит".

## Default response length

Short.
Usually 1-4 concise sentences.
