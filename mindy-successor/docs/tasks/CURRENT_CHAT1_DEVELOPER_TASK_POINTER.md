# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: **ARTIST/GEISHA RUNTIME v16 ACTIVE**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-169..180
Target branch: `chat1/artist-geisha-complete-v16`

Frozen Merchant runtime history remains immutable:
- PR #226
- exact head `88422257f618c7182dd6d1f3eca7596c9972eb0a`
- C4-162 PASS-WITH-NOTES
- do not move that head.

Authoritative queue:
- `TASK_CHAT1_DEVELOPER_QUEUE_v16.md`

Start rule:
- Lead creates `chat1/artist-geisha-complete-v16` from the same Artist/Geisha activation commit that publishes this pointer;
- begin **C1D-169 immediately**, then continue C1D-170..180 without waiting between safe queue items;
- keep Merchant #226 frozen and untouched;
- freeze one focused exact-head Artist/Geisha runtime PR at C1D-180.

Preserve current Artist/Geisha ordinary-work invariants:
- `artist-geisha.shift` = 1 Energy;
- unlock = Creativity 35 + Manners 25 + Grooming 30 OR Year 3;
- current wage + seasonal packages;
- `ending.artist-geisha.hard-work`, `artist-geisha.hardwork.compat`, `hardWork:artist-geisha`.
