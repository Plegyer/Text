# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: **MERCHANT RUNTIME v15 FROZEN / QA ACTIVE / STANDBY**
Owner: Chat 1 Developer / Integration Developer

Frozen Merchant runtime:
- PR #226
- exact head `88422257f618c7182dd6d1f3eca7596c9972eb0a`
- activation base `d7dad76d47d71144a5788f762cedd72d9fc95ae5`
- exact-head CI #898 / id `36977507786`: SUCCESS
- validator 60 packs / 222 events / 39 actions / 22 endings
- tests 866 / 866 pass
- C1D-157..168 complete
- do not move this head except for a concrete Chat 4 QA / required-CI blocker or explicit Lead request.

Chat 4 Merchant QA v17 starts with C4-162 on this exact head.

No new Chat 1 producer queue is active at this checkpoint. Do not start the next ordinary career before Merchant is shipped or Lead explicitly publishes a safe prep queue.
