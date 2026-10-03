# Chat 3 stream-error recovery — 2026-10-03

Git is the source of truth.

Read:
1. `CURRENT_CHAT3_TASK_POINTER.md`
2. `USER_DECISIONS_LOCKED_v1.md`

Current task:
Trade Corridor Production v13.

Branch:
`chat3/trade-corridor-production-v13`

Latest known worker head before stream failure:
`dfdf3c0b53d5139a6c714d0bc3bf15afd5ace264`

Important: real production work already exists. Do NOT restart from branch base and do not redo Forest v12.

Recent implemented work includes:
- Trade Corridor production Activity;
- city career/contact feedback;
- Explore exposure;
- focused tests;
- route gate enforcement;
- typed city-return read;
- route-gate bypass regression coverage.

The final handoff doc was not yet committed when the stream failed.

Continue from the fresh branch head and complete CURRENT_CHAT3_TASK_POINTER.md:
- finish any remaining D36 Trade Corridor requirements;
- run focused only, no full CI;
- create `CHAT3_TRADE_CORRIDOR_PRODUCTION_v13.md`;
- document QA and remaining seams;
- freeze exact SHA;
- report READY_FOR_CHAT2_ASSEMBLY.

Do not merge main.
