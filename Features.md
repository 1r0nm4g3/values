# Overview
River is an evidence‑informed personal productivity app that helps people clarify their values, set self‑concordant goals, build identity‑based habits, and execute via simple daily planning and limited work‑in‑progress. The system blends proven methods from behavioral psychology and expert practice (values clarification, self‑concordant goal setting, WOOP/implementation intentions, habit stacking, small‑wins tracking, and Kanban focus).

**Product principles**
- **Meaning before momentum:** Start with values; connect every goal/habit to a value.
- **Small wins compound:** Make the next action tiny and visible; celebrate micro‑progress.
- **Friction is the enemy:** Defaults, templates, auto‑populate, and one‑tap logging.
- **Focus beats frenzy:** Visualize work and limit WIP to finish more.
- **Reflect, refine, repeat:** Daily and periodic reviews keep the system adaptive.

---

# 1) Values Module
**Goal:** Help users surface, cluster, and define 5–7 core values, then draft a mission statement.

## 1.1 Values Priming Journal
**Workflow**
1. User sees 3 short prompts with autosave (can skip/return):  
   a) Strong memories → which values showed up?  
   b) A person you admire → which values do they live?  
   c) Recurring life situations → which values drive your reactions?
2. Optional positive‑frame "legacy" prompt (80th‑birthday/fulfilling‑life visualization).  
3. Provide 2–3 example answers per prompt and a 150–250 word guidance tip.

**Acceptance Criteria**
- Autosave per field; resume state preserved.  
- "Skip for now" moves user forward and adds a todo to revisit.  
- Examples and tips are toggleable inline.  
- Mobile friendly (multi‑step pager).

## 1.2 Value Bins (Card Sort)
**Workflow**
1. Batch 50–60 values into groups of 10 (reduce fatigue).  
2. Card UI with short definition + “learn more”.  
3. User drags each value into bins **1–4** (Least ⇢ Most like me).  
4. Supports search, randomize order, “Not sure”, and “Add my own”.

**Acceptance Criteria**
- Progress bar with estimated time remaining.  
- Can pause after any batch; state saved.  
- Keyboard support and accessible drag‑and‑drop.  
- Export of raw bin data available to later steps.

## 1.3 Cluster & Name
**Workflow**
1. Show top values from bins 3–4.  
2. User **drag‑and‑drops** values into **5–7 clusters**; can trash or merge clusters.  
3. Smart suggestions offer tentative clusters (user controlled).  
4. Each cluster is given a short name and emoji (optional).

**Acceptance Criteria**
- Enforce soft guardrails (warn if <5 or >7 clusters).  
- Undo/redo, merge/split operations supported.  
- All actions reversible; autosave after each.

## 1.4 Refine to Core Value
**Workflow**
For each cluster, user completes:  
- **Core value name** (free text).  
- **Definition in my words** (2–3 sentences).  
- **Life examples** (min 2).  
- **Cost of neglect** (1–2 sentences).  
- **Behaviors that live this value** (checklist of concrete actions).  
- Optional **Identity statement**: “I am the kind of person who…”.

**Acceptance Criteria**
- Provide editable templates and exemplars.  
- Enforce minimal completeness (definition + 1 example + 2 behaviors).  
- Autosave and per‑cluster completion indicator.

## 1.5 Rank & Mission Statement
**Workflow**
1. Rank the refined core values (drag list).  
2. Draft a mission statement with **templates** (fill‑in‑the‑blanks, examples).  
3. **Review & refine** page: readability hint, tone toggle (concise/inspiring/practical).  
4. Versioning (save, compare, restore).

**Acceptance Criteria**
- Rank persisted; mission statement stored with version history.  
- Exportable (PDF/Markdown).  
- Optional privacy lock for sensitive text.

---

# 2) Goals Module
**Goal:** Create self‑concordant, SMARTER goals with mental contrasting, immediate next actions, rewards, and scheduled reviews.

## 2.1 Vision Backcasting Journal
**Workflow**
1. Deathbed/legacy accomplishments → 30y → 10y → 5y → 2y → 6mo → 30d → 1wk.  
2. Nudge to phrase outcomes in **approach‑oriented**, positive terms.

**Acceptance Criteria**
- Collapsible timeline sections with examples.  
- Quick “Promote to Goal” button on shorter horizons.

## 2.2 Create Goal (SMARTER)
**Fields**
- **Domain** (Physical, Spiritual, Intellectual, Financial, Parental, Familial, Spousal, Vocational, Avocational, Other).  
- **Linked Value** (required).  
- **Time Horizon** (Short ≤90d, Medium ≤1y, Long >1y).  
- **SMARTER** composer: Specific, Measurable, Achievable/Actionable, Relevant (to value), Time‑bound, **Evaluate**, **Refine**.  
- **End criteria** / Definition of done.

**Acceptance Criteria**
- Can create from scratch or from a vision entry.  
- Inline completeness meter and preview of SMARTER statement.

## 2.3 Motivators
**Workflow**
- Enter motivators; tag each as **intrinsic** or **extrinsic**.  
- Rank top 3; show the linked value(s) to reinforce the “why”.

**Acceptance Criteria**
- At least one intrinsic motivator recommended (non‑blocking).  
- Motivators visible on goal detail header.

## 2.4 WOOP: Obstacles & Plans
**Workflow**
1. Visualize working on the goal for 60–90s.  
2. List **Obstacles** (internal/external).  
3. Create **If‑Then Plans** (Implementation Intentions).  
4. Mark critical plans as **auto‑remind** triggers.

**Acceptance Criteria**
- Structured “If [trigger], then I will [response]” editor.  
- Plans linked to reminders and habit suggestions.

## 2.5 Rewards & Milestones
**Workflow**
- Select a **completion reward** and 1–3 **milestone rewards** (healthy defaults).  
- Optional social celebration (share a win image or message).

**Acceptance Criteria**
- Rewards logged upon completion; celebration prompt offered.  
- Guardrails to avoid counter‑productive rewards (user can override).

## 2.6 Next 10‑Minute Action
**Workflow**
- One field: “What can you do in the next 10 minutes?”  
- One‑tap **Add to Today** (goes to Todo + Planner).

**Acceptance Criteria**
- Enforced brevity (≤140 chars); due today by default; snooze allowed.

## 2.7 Scheduled Reviews
**Workflow**
- Auto‑create review tasks: **Weekly** (short‑term), **Monthly** (medium), **Quarterly** (long).  
- Provide lightweight templates: Progress, Obstacles, Adjustments, Next focus.

**Acceptance Criteria**
- Reviews generate concise summaries and suggested next actions.  
- Missed review → gentle catch‑up flow.

---

# 3) Habits Module
**Goal:** Make consistent action easy using identity, cue design, and tiny starts.

## 3.1 Create Habit
**Fields**
- **Linked Goal** (required).  
- **Description**.  
- **Frequency** (daily, x/day, weekly, custom).  
- **Amount** (duration/quantity).  
- **Identity statement** ("I am a ___ person, so I ___").  
- **Cue**: When/Where **and/or** Habit Stack (After/Before <existing routine>).  
- **Tiny version** (the minimum viable action for tough days).

**Acceptance Criteria**
- Cue picker includes common anchors (wake, coffee, commute, lunch, teeth, bedtime).  
- Habit stack selector lists user’s existing routines.  
- Validation that tiny version ≤ 2 minutes.

## 3.2 Track & Celebrate
**Workflow**
- Due habits appear in **Today** with one‑tap check.  
- Show **streak**, completion rate, and “don’t break the chain” calendar.  
- Allow **skip/snooze** without breaking lifetime stats; mark partials.  
- Optional micro‑celebrations on completion.

**Acceptance Criteria**
- Offline‑tolerant logging; backfill up to 7 days.  
- Edit history with audit trail (user‑visible).

## 3.3 Smart Reminders
**Workflow**
- Reminder schedule derived from cues; quiet hours respected.  
- Nudge on missed cue: suggest tiny version or alternative slot.  
- Gentle relapse re‑entry after 3+ missed days.

**Acceptance Criteria**
- Per‑habit notification settings; digest option.  
- Snooze presets (15m, 1h, evening, tomorrow).

---

# 4) Todo List
**Goal:** Single place for action: habits due, Big 3, 10‑minute actions, and ad‑hoc tasks.

**Workflow**
- **Auto‑populate**: due habits, scheduled reviews, Big 3 (from Planner), next 10‑minute actions.  
- Users can add manual tasks, set priority, estimate, due, and tags.  
- **Focus mode** (one card at a time) and optional **timeboxing** (start timer).

**Acceptance Criteria**
- Clear source tag (Habit/Goal/Planner/Manual).  
- Drag to reorder; keyboard shortcuts.  
- Batch complete or reschedule.

---

# 5) Daily Planner
**Goal:** Keep daily effort aligned with goals and values.

## 5.1 Big 3
**Workflow**
- Choose **3 Most Important Tasks** (with goal/value tooltips).  
- Auto‑suggest from active goals/habits; warn on over‑capacity.  
- Optional timeboxing; blocks placed on calendar.

**Acceptance Criteria**
- Big 3 auto‑added to Today list.  
- Goal/value hover shows the “why”.  
- Capacity hint based on remaining calendar time.

## 5.2 End‑of‑Day Review
**Workflow**
- Prompts: **What went well?** **What didn’t?** **What did I learn?**  
- Celebrate a win; decide carry‑overs and next day seed task.

**Acceptance Criteria**
- Generates a daily summary; streak for consecutive reviews.  
- One‑tap carryover for unfinished Big 3.

## 5.3 Notes
**Workflow**
- Freeform notes with search, tags, and backlinks to goals/values.

**Acceptance Criteria**
- Inline images and file attachments supported.

---

# 6) Journal
**Goal:** Structured reflection cadence to realign goals and values.

**Workflow**
- Prompt library: weekly, monthly, quarterly, semi‑annual, annual.  
- Each prompt can link entries to goals/values; summaries roll up to reviews.

**Acceptance Criteria**
- Scheduling per prompt; reminders; archive/export options.

---

# 7) Kanban Projects
**Goal:** Visualize projects and **limit WIP** so more finishes.

**Workflow**
- Boards by domain or initiative with columns (Backlog → Next → In Progress → Done).  
- **WIP limits** on In Progress (configurable; default 2–3).  
- Cards link to goals and can surface **next action** and blocking obstacles.  
- Drag‑and‑drop; batch move; swimlanes for goals.

**Acceptance Criteria**
- Warn when WIP exceeded; suggest pausing or finishing first.  
- Card checklists with progress; convert checklist item → Habit or Todo.  
- Board ↔ Planner integration: items in In Progress can suggest Big 3.

---

# 8) Cross‑Cutting
- **Onboarding:** Allow “skip for now” everywhere; create revisit tasks.  
- **Privacy:** Private by default; optional **accountability share** (partner weekly digest).  
- **Accessibility:** Keyboard‑first, screen reader labels, high contrast mode.  
- **Export:** JSON, CSV, Markdown/PDF for values/mission/goals/journal.  
- **Telemetry:** Opt‑in; track activation, adherence, review cadence, and WIP overages.  
- **Localization:** Content strings externalized; RTL ready.

---

# 9) Ticket Seeds (sample wording)

## VAL‑101 Values Priming Journal — Build
**Story**: As a new user, I want short prompts with guidance so I can warm up and reflect without friction.  
**Acceptance**: autosave; skip/resume; examples toggle; mobile pager; state persisted.

## VAL‑130 Value Bins — Batch Card Sort
**Story**: As a user, I want to sort values into 4 bins in small batches so I can prioritize without fatigue.  
**Acceptance**: 50–60 values; 10/value batch UI; search; randomize; not‑sure; add‑my‑own; progress bar; a11y DnD.

## VAL‑170 Cluster & Name — Drag/Drop
**Story**: As a user, I want to cluster top values into ~5–7 groups and name them so I can see themes.  
**Acceptance**: soft guardrails; merge/split; undo/redo; autosave; emoji optional.

## VAL‑210 Refine to Core Value — Templates
**Story**: As a user, I want templates and examples to define each core value, costs, and behaviors.  
**Acceptance**: minimal completeness; identity statement optional; per‑cluster progress.

## VAL‑240 Mission Statement — Draft/Review/Version
**Story**: As a user, I want to rank values and draft a mission statement with templates and versions.  
**Acceptance**: drag‑rank; tone toggles; version history; export.

---

## GOAL‑101 Vision Backcasting — Journal
**Story**: As a user, I want to translate a long‑term vision into nearer horizons so I can backcast actions.  
**Acceptance**: collapsible timeline; examples; promote to goal.

## GOAL‑140 Create Goal — SMARTER Composer
**Story**: As a user, I want a guided composer that ensures my goal is specific, measurable, relevant to values, and time‑bound.  
**Acceptance**: domain; value link (required); horizon; SMARTER completeness meter; end criteria.

## GOAL‑170 Motivators — Rank & Tag
**Story**: As a user, I want to capture and rank intrinsic/extrinsic motivators to reinforce my why.  
**Acceptance**: at least one intrinsic suggested; display on goal header.

## GOAL‑200 WOOP — Obstacles & If‑Then Plans
**Story**: As a user, I want to create if‑then plans so I know what to do when obstacles arise.  
**Acceptance**: structured editor; attach to reminders; link to habit suggestions.

## GOAL‑230 Rewards & Milestones — Healthy Defaults
**Story**: As a user, I want milestone and completion rewards so I can celebrate progress.  
**Acceptance**: pick list + custom; guardrails; celebration prompt; log on completion.

## GOAL‑260 Next 10‑Minute Action — Today Injection
**Story**: As a user, I want to define a tiny action and send it to Today with one tap.  
**Acceptance**: ≤140 chars; due today default; snooze.

## GOAL‑300 Scheduled Reviews — Templates
**Story**: As a user, I want weekly/monthly/quarterly reviews with templates so I can adjust.  
**Acceptance**: auto‑tasks; summaries; catch‑up flow.

---

## HAB‑110 Create Habit — Cue & Tiny Version
**Story**: As a user, I want to set a cue (time/place or stack) and a tiny version so it’s easy to start.  
**Acceptance**: cue picker; stack existing routines; tiny ≤2 min validation.

## HAB‑150 Track & Celebrate — Streaks
**Story**: As a user, I want one‑tap check‑off, streaks, and gentle celebrations so I feel momentum.  
**Acceptance**: offline tolerant; backfill 7 days; partials; edit history.

## HAB‑190 Smart Reminders — Missed Cue Nudges
**Story**: As a user, I want reminders aligned to cues and helpful nudges if I miss them.  
**Acceptance**: per‑habit settings; quiet hours; snooze presets; relapse re‑entry.

---

## TODO‑100 Today — Unified Action List
**Story**: As a user, I want a single list that auto‑includes due habits, Big 3, and tiny actions.  
**Acceptance**: source tags; reorder; batch complete; focus mode; timebox timer.

---

## PLAN‑120 Big 3 — Goal‑Aware Selection
**Story**: As a user, I want to select a Big 3 with goal/value context so I work on what matters.  
**Acceptance**: tooltips; capacity hint; auto‑add to Today.

## PLAN‑160 End‑of‑Day Review — WWW/EBI
**Story**: As a user, I want a quick evening review to capture wins, misses, and lessons.  
**Acceptance**: summary generated; carryover; review streak.

---

## JRNL‑130 Prompt Library — Scheduling
**Story**: As a user, I want scheduled reflective prompts so I can periodically realign.  
**Acceptance**: link entries to goals/values; export.

---

## KAN‑150 Boards — WIP Limits
**Story**: As a user, I want Kanban boards with WIP limits so I finish more by focusing.  
**Acceptance**: configurable WIP; warnings; next‑action field; convert checklist → Habit/Todo; Planner suggestions.

---

# 10) Non‑Functional & Implementation Notes
- **Performance:** All interactions sub‑100ms where possible; optimistic UI for drag‑and‑drop and check‑offs.  
- **State:** Client‑side draft cache + server persistence with conflict resolution.  
- **Security:** Private by default; field‑level locks for sensitive text; audit log on edits.  
- **Testing:** Unit + accessibility tests per component; E2E happy‑path for each primary workflow.  
- **Analytics KPIs:** activation (completed values cluster), time‑to‑first goal, habit week‑1 adherence, weekly review rate, WIP exceed rate, Big‑3 completion rate.  
- **Rollout:** Ship modules behind flags; start with Values → Goals → Habits → Planner/Today → Kanban.


