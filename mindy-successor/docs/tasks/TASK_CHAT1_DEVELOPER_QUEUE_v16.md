# Chat 1 Developer Queue v16 — Artist/Geisha Complete Career Runtime

Status: **ACTIVE PREP / NEXT ORDINARY CAREER**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-169..180
Target: **Artist/Geisha Complete Career Runtime**

Merchant runtime PR #226 is frozen and QA-accepted at `88422257f618c7182dd6d1f3eca7596c9972eb0a`. Do not move or reuse that head.

Start branch:
- `chat1/artist-geisha-complete-v16`
- branch from the exact Artist/Geisha activation commit published by Lead with this queue.

Existing shipped authority to preserve:
- action `artist-geisha.shift`;
- ordinary Work cost = 1 Energy;
- unlock = Creativity 35 + Manners 25 + Grooming 30 OR Year 3;
- current wage formula and all four current seasonal scene/stat packages;
- existing public Hard Work ending `ending.artist-geisha.hard-work`;
- reward `artist-geisha.hardwork.compat`;
- Meta `hardWork:artist-geisha`.

Design authority:
- `../CAREER_GEISHA_ARTIST_DRAFT_v0.md`;
- `../NEW_GAME_SPEC_v1.md`;
- existing Artist-Geisha School prep/reactive fixtures and docs.

Global boundaries:
- Artist House must remain distinct from Satyr Maid and voluntary Prostitute careers;
- final fantasy framing/name, exact art disciplines, contest subsystem, NPC identities, salary retuning, exact School thresholds and new complex ending IDs remain OPEN unless existing Git authority resolves them;
- do not bypass Palace 10/10 Hard Work unlock;
- Court Invitation may prepare a future contact/readiness seam but is not Palace access;
- no new curriculum, universal reputation meter, global patron system, generic contest engine or NightFlow rewrite without authority.

### C1D-169 — publish Artist/Geisha runtime contract
Inventory exact shipped identities and define only the typed career stages/transitions/counters/facts, one recurring professional relationship, narrow item/capability seams, seasonal/festival event identities, School-ready facts and late-route readiness that current authority supports. Keep unresolved thresholds/numbers/complex ending IDs explicitly null/open.

### C1D-170 — preserve ordinary work and seasonal identity
Bind current `artist-geisha.shift` into progression without changing 1-Energy cost, unlock, wage or shipped four-season effects. Add only Artist-local counters/facts needed for breadth.

### C1D-171 — career state machine
Implement Novice -> Performer -> Recognized Artist and distinct Veteran / Master Artist / Patron Network / Court Invitation readiness paths, then outcome-ready. Readiness may coexist and must not force commitment.

### C1D-172 — seasonal performance/festival windows
Use the calendar for real Artist-local opportunity windows and deterministic pending scenes. Do not build a global contest/festival subsystem.

### C1D-173 — recurring professional relationship
Implement one complete role-only professional relationship from an authorized archetype such as senior artist/mentor or rival. Include trust, conflict, refusal-safe continuation and later utility. Romance is optional and not required for ordinary progression or Hard Work.

### C1D-174 — School authority
Map only the five prepared existing tracks: Arts & Performance, Etiquette & Presentation, Rhetoric & Social, Body Confidence, Literacy & Numbers. No specialized history/music/dance/craft curriculum. Numeric thresholds/public facts remain null unless this runtime contract can justify and publish an exact consumer without inventing School producer authority.

### C1D-175 — items/capabilities
Implement only narrow Artist-owned capabilities justified by live content, such as formal-performance presence, costume/instrument access or invitation/token handling. Do not turn items into universal status, Palace access or inventory rewrite.

### C1D-176 — night/time competition
Expose only Artist-local night opportunities through existing typed Night machinery where exact authority exists. Rehearsal/salon/patron/coworker opportunities must compete with existing night study rather than rewrite NightFlow.

### C1D-177 — shipped cross-system seams
Use only real shipped identities from Satyr Maid, Tavern, Merchant if and when Merchant becomes accepted integration authority, Guard and existing Activity/School surfaces. Do not fabricate Assassin, Prostitute or Palace gameplay dependencies.

### C1D-178 — advanced readiness boundaries
Keep Master Artist, Patron Network and Court Invitation mechanically distinct. Court Invitation may write Artist-local readiness/contact evidence but must never satisfy Palace unlock by itself.

### C1D-179 — persistence / Hard Work / natural acceptance
Regress pending save/reload, deterministic seasonal scheduling, relationship refusal safety, 50 real Artist-Geisha shifts -> `ending.artist-geisha.hard-work`, continued ordinary work, at least one advanced readiness path, no premature Meta mutation, and correct explicit completion/New Life persistence/reset.

### C1D-180 — full gate and freeze
Run full exact-head repository CI, freeze one focused Artist/Geisha runtime PR for Chat 4 QA, and record exact head/run/base/file delta. After freeze, do not move the head except for a concrete QA/required-CI blocker or explicit Lead request.
