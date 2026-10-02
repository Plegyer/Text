# CURRENT CHAT2 TASK POINTER

Status: **ARTIST/GEISHA PRESENTATION v18 ACTIVE**
Owner: Chat 2 / Presentation & Media Worker
Queue: C2-193..204
Target branch: `chat2/artist-geisha-presentation-v18`

Frozen Merchant presentation history remains immutable:
- PR #227
- exact head `77becbeb8ce139ce4326df018af779fd741d70af`
- C4-165 PASS-WITH-NOTES
- do not move that head.

Authoritative queue:
- `TASK_CHAT2_PRESENTATION_QUEUE_v18.md`

Start rule:
- Lead creates `chat2/artist-geisha-presentation-v18` from the same Artist/Geisha activation commit that publishes this pointer;
- begin **C2-193 immediately** and continue every safe prep item through C2-203;
- C2-204 final binding/rebuild/freeze waits only for the exact frozen Artist/Geisha runtime from Chat 1;
- presentation/media/accessibility only; no gameplay/economy/Save/School/NightFlow/ending ownership changes.
