# Relationship Public-Hook Request Template v1

Status: reusable cross-system request form.

Fields:
- requesting relationship/event;
- producer subsystem;
- public hook type;
- exact locale-neutral hook ID;
- semantic meaning;
- producer moment;
- current Git status;
- consumer trigger/condition;
- repeat/idempotence expectation;
- Save/reload expectation;
- Product status;
- owner approval note.

Rules: consume only an approved public fact, career boundary, item capability, or exact Activity result. Do not depend on another subsystem's private progress and do not invent a public identity in relationship content. Activity requests must name activity, outcome, and exact result ID. Item requests should use an approved capability where that is the public contract. Presentation and locale do not change the hook.
