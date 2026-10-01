# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — FINALIZE TAVERN PRESENTATION**
Owner: Chat 2 / Presentation & Media Worker

Current draft:
- PR #183
- head `80f7e8c4e24863cbd478011681d6eb763e5d4c88`
- pre-runtime CI #657 SUCCESS
- C2-145..154 complete.

Dependency is now frozen:
- Tavern runtime PR #187
- exact head `38c58ccdaa1d357f189cd640053d0b2a8605b9b4`
- CI #682 SUCCESS
- C4-147 PASS-WITH-NOTES.

Do now:
1. create a clean finalization branch from exact runtime head `38c58cc...`;
2. transplant only C2-145..154 presentation delta;
3. remove preparation/reservation-only reachability;
4. C2-155 — prove real production reachability, animation-off and missing-GIF fallback;
5. C2-156 — full exact-head CI green and freeze one clean PR for Chat 4.

Do not change gameplay/runtime.
Do not keep waiting on #187.
