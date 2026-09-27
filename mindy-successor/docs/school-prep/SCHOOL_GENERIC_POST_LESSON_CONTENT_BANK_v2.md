# School Generic Post-Lesson Content Bank v2

Status: CONTENT_DRAFT for the currently reachable generic post-paid-lesson route.

Routing:
- safe current trigger: `actionCompleted:school`;
- exact course identity is unavailable;
- therefore these scenes assert no teacher name, course name, track, stat package, tuition amount, or course-specific outcome.

All scenes are presentation-only.

## Quiet wrap-up

### Variant 01 — Notes in Order
The lesson ends with a few minutes to put notes, tools, and thoughts back in order. Nothing new is added; the value is in deciding what deserves to be remembered.

### Variant 02 — One Useful Point
Before leaving, you reduce the session to one useful point you could explain without the rest of the classroom around you.

### Variant 03 — The Question Left Over
Most of the lesson settles. One question does not. You write it down rather than forcing an answer just because the class is over.

### Variant 04 — Clear the Workspace
The room slowly returns to neutral: chairs straightened, materials gathered, the last unfinished thought tucked away for another day.

## Peer context

### Variant 05 — Compare Notes
A nearby student compares one line of notes with yours. You each caught something the other missed, and neither version needs to become the official one.

### Variant 06 — Small Correction
Someone quietly points out a minor misunderstanding before you leave. The correction is useful precisely because it does not become a public performance.

### Variant 07 — Shared Confusion
Two students discover they were confused by the same part of the lesson for different reasons. The comparison makes the problem easier to name.

### Variant 08 — Useful Question
A classmate asks a question that makes the whole session seem more organized in retrospect. You keep the question even if the answer still needs work.

## Effort / fatigue

### Variant 09 — Enough for Today
You could keep pushing, but the lesson has already given you enough to process. Stopping now feels more useful than blurring the last clear idea.

### Variant 10 — Slow Exit
The work leaves you mentally tired rather than dramatically changed. You take a slower route out and let the details settle.

### Variant 11 — Better Than It Felt
A session that felt awkward in the moment looks more coherent once it is over. Some progress is easier to recognize from the doorway.

### Variant 12 — Keep the Pace
You resist the urge to turn one completed lesson into a plan for everything at once. There will be another day for the next piece.

## School-life texture

### Variant 13 — The Hallway
The hallway outside is noisier than the classroom. Students split toward work, errands, lodging, and other obligations, carrying the lesson back into ordinary life.

### Variant 14 — End of the Board
Someone erases the last marks from the board. The room is ready for the next class before you are entirely done thinking about this one.

### Variant 15 — Borrowed Pencil
A small borrowed tool changes hands on the way out with a brief thank-you. School feels less like an isolated transaction and more like a place people repeatedly pass through.

### Variant 16 — Tomorrow’s Reminder
You leave yourself one short reminder for later: not a new goal, just the part of today’s lesson most likely to disappear if you do not write it down.

## Production rules

These variants may be used only where the runtime knows that:
- a paid School lesson just completed;
- the exact course is not known to the presentation event.

They must not mention:
- a specific teacher;
- a specific course/track;
- exact tuition;
- exact stat gain;
- exact School counter value;
- milestone/certificate/project/exam completion;
- management/accounting result;
- Arcana/Forest result.

## Mechanics guard

The post-lesson presentation must not:
- charge money;
- spend Energy;
- change stats;
- change Lust;
- increment `lessons_completed`;
- increment `night_study_sessions`;
- publish world facts;
- change relationship/career state.

The paid transaction is already complete before this content appears.

## Save / reload

Once a generic post-lesson event is materialized:
- its selected variant must persist across reload;
- resolving the scene must not replay the School lesson;
- the scene may be optional/non-blocking under the current content system;
- duplicate materialization in the same reaction epoch must remain prevented by normal Resolver rules.
