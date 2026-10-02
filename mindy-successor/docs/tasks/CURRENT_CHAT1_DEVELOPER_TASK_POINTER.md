# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: **MERCHANT RUNTIME v15 ACTIVE**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-157..168
Target branch: `chat1/merchant-complete-v15`

Guard is shipped. Frozen Guard runtime PR #208 and all Guard integration branches remain immutable history.

Authoritative queue:
- `TASK_CHAT1_DEVELOPER_QUEUE_v15.md`

Start rule:
- Lead creates `chat1/merchant-complete-v15` from the same Merchant activation commit that publishes this pointer;
- Git/current main is authority if coordination text later drifts;
- begin **C1D-157 immediately**, then continue C1D-158..168 without waiting between safe queue items;
- freeze one focused exact-head Merchant runtime PR at C1D-168 for Chat 4 QA.

Preserve existing Merchant invariants:
- `merchant.shift` remains ordinary 1-Energy paid work;
- unlock remains Wits 20 + Reason 20 + Sociability 15 OR Year 2;
- preserve shipped wage/seasonal packages;
- preserve `ending.merchant.hard-work`, `merchant.hardwork.compat`, and `hardWork:merchant`.

Do not introduce a global price engine, inventory-capacity rewrite, new credit/debt subsystem, Merchant-owned Secret Debt, generic illegal-goods law, or Palace rules without existing authority.
