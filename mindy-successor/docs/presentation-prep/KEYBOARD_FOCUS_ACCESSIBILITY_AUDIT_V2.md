# Keyboard / Focus Accessibility Audit v2

Status: C2-87 COMPLETE
Owner: Chat 2 / Presentation & Media

The current-main Work, ending and School presentation controls were checked without changing gameplay availability.

## Work

- 3 starter-career controls remain enabled on the started state.
- 7 ordinary-career controls remain disabled by the existing availability contract.
- locked controls expose `aria-disabled=true`, `aria-describedby` and a visible reason.
- the stronger focusable locked-reason note remains prepared in frozen PR #136 and is not duplicated in this candidate.

## Endings

All nine existing ending controls have visible action names. Unavailable endings remain disabled. An existing eligible Lumber ending becomes enabled without changing eligibility logic.

## School

All eight course controls have visible action text and an adjacent course heading supplying course context. Existing tuition/Energy availability remains authoritative.

## Focus order

Opening each audited panel moves focus to the existing Close control before domain actions. Enabled Work controls accept focus; mechanically disabled Work controls do not.

No action availability, ending eligibility or School mechanic is modified.
