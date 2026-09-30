# School Teacher Fallback Consistency v2

Status: C2-68 COMPLETE
Owner: Chat 2 / Presentation & Media

All eight current School teacher media identities remain valid static catalog media using the current School stage source.

C2-68 closes the locale fallback gap without creating teacher gameplay or semantic presentation IDs.

For each existing teacher media identity, production localization now includes:
- `media.<teacher-media-id>.alt` in RU and EN;
- `media.<teacher-media-id>.caption` in RU and EN.

The current renderer already resolves catalog media alt text through `media.<mediaId>.alt`, so Russian locale no longer has to fall back to the pack's English-only direct alt string when a teacher media surface is shown.

Teacher media identities covered: **8 / 8**.

Static source identities changed: **0**.

Teacher gameplay identities added: **0**.

School mechanics, lesson content, teacher prose ownership and Save state are unchanged.
