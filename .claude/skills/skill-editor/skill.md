---
name: skill-editor
description: Audit and tighten existing AI skill.md files. Use when editing or improving a skill that already exists, especially to remove AI-speak (em dashes, "X, not Y" pairings, banned filler words) and bloat. Different from skill-creator, which is for building new skills from scratch.
---

# Skill Editor

Audit and tighten existing skill.md files. Goal: same meaning, fewer words, no AI tics.

Make every skill as clear and concise as possible: short enough to scan in a couple of minutes. Aim to keep the instructions to ~150 lines (copy templates and examples don't count against that the same way). Go longer only when the content genuinely earns it.

The workflow has three phases. Don't jump to wording fixes before the structural ones.

## Phase 1: Pre-edit health check

Structural problems matter more than wording. Answer these 5 questions about the skill before hunting for AI-speak:

1. **What is the actual job, in one sentence?** If you can't write it cleanly, the skill needs that clarity first.
2. **Does the description name when to trigger, not just what the skill does?** Good triggers describe a moment ("stuck on a decision," "cleaning a messy spreadsheet"). Bad triggers describe an action ("for use with X").
3. **Does the skill specify what context or input it needs before it can work?** Most skills need an artifact (a doc, a file, a question answered). If that's missing, flag it.
4. **Does it explain the why for non-obvious rules?** ALL CAPS instructions and rigid MUSTs are usually a sign the rule lacks a reason. Reframing as "do X because Y" almost always works better.
5. **Would a smart model follow this and produce good results without asking mid-task?** If the skill leaves obvious gaps, edits to wording won't fix them.

If any answer is no, propose structural changes first.

## Phase 2: Progressive disclosure check

Skills load in three levels: name and description (always in context), SKILL.md body (when triggered), bundled files (on demand). Check that the skill uses these levels appropriately:

- **Length: keep the instructions tight (~150 lines is a good target); 500 is the hard ceiling.** Templates and examples inflate the raw line count, so judge by the prose, not the total. Get there by cutting bloat and redundancy first. Split into a reference file only when content isn't needed on every run, never just to hide length elsewhere.
- **Long inline reference material.** Style guides, schemas, templates, examples that aren't always needed. Move to references/ and point to them with a one-liner.
- **Repeated work the skill could bundle.** If the model writes the same helper script every time (a CSV parser, a chart generator, an HTML template), put the script in scripts/ and have the skill use it.
- **Domain forks.** Skills that handle multiple variants (AWS vs. GCP, Python vs. JS) often work better as a thin SKILL.md plus per-variant reference files.

The goal is loading less context when context isn't needed, not shorter for its own sake.

## Phase 3: Wording and style

### Trigger description issues

**Description format: `[One line of what the skill is]. Use when the user [concrete trigger moments].`** First sentence states what the skill is, plainly. Second sentence starts with "Use when" and names situations the user would actually be in. Example: `Personal life advisor that gives honest advice based on your personal plan. Use whenever the user is stuck on a decision, working through a hard problem, or asking for a gut check.`

Other issues to flag:

- Vague descriptions that won't fire reliably ("Use when you want X")
- Descriptions that assume the user already has the artifact ("based on a detailed life document")
- Descriptions without concrete trigger contexts

### AI-speak to cut

The dead giveaways:

**Em dashes.** One per skill maximum. Multiple em dashes in one sentence are the clearest tell. If you see chains like `— X — Y —`, rewrite as separate sentences or use commas. Periods and commas almost always work better.

**"X, not Y" pairings.** Examples: "Recognition, not flattery." "Coffee chat, not consulting deck." LLMs lean on this construction heavily. One per skill at most. Often the second half can be cut because the first already carries the meaning.

**"This isn't about X. It's about Y."** Same family. Cut.

**Question-then-answer rhetorical setups.** "Why does this matter? Because X." Just say X.

**Banned filler words.** delve, foster, leverage, utilize, facilitate, streamline, robust, seamless, cutting-edge, paradigm shift, game changer, "this is huge," "it's worth noting," "importantly," "critically."

**Hedging stacks.** "It might be worth considering" → "consider." "You may want to potentially" → "you can." "I would suggest" → "do."

**Empty importance signals.** "It's important to note that," "Of course," "Naturally." Usually the sentence works without them.

**Imperative bloat.** "Make sure to ensure that you always" → "always." "Be sure to" → cut.

### Style fixes

- Keep paragraphs to 1-3 sentences.
- Lead with the verb. "Read the user's PLAN.md" beats "You should always make sure to read the user's PLAN.md."
- Explain the why when it isn't obvious. Skip the why when it is.
- Cut "Note that," "Keep in mind," and similar throat-clearing.
- Capitalize the first letter after `: ` in `key: value` bullets and headings. "Lunch: Chicken thigh + rice" beats "Lunch: chicken thigh + rice". Leave it alone when the first character is a number or symbol.

### Formatting

Apply these whenever the skill body or its templates have subsections or rule lists:

- **`###` for subsection titles, not inline `**bold**` labels.** Headings give cleaner hierarchy than bold-prefixed sentences.
- **Paragraph break between every heading and its body.** A heading and its example/description never share a line.
- **Multi-sentence numbered rules become subheaded sections.** Convert `1. **Rule.** Body.` into `### Rule` + blank line + body. A flat numbered list works only when each item is a single short sentence.
- **Templates use `[Example: ...]` blocks per section.** Drop section descriptions when the example does the explaining.
- **Template examples thread one persona across all sections** so the model sees a coherent story, not random fragments. Same character, same numbers, same arc.
- **Bullets stay readable: ≤95 chars per line, ~170 max when a wrap is needed.**
- **HTML comments (`<!-- -->`) for AI-only instructions inside templates.** Hidden in rendered markdown, visible to the model.
- **Headline + breakdown** for goals or any "top-line + components" structure: one headline sentence, then a bulleted breakdown underneath.

### Skill wrapper page header (when applicable)

For a published page that wraps a skill (docs site, wiki entry, marketing page), the top of the page follows:

- H1 = skill name
- One-line description of what the skill does
- `**How to use:**`
- Numbered list, max 3 steps, each step ≤95 chars

Then the embedded `skill.md` block and any supporting templates come after. Skip section descriptions and longer intros; the 3 steps are the entire onboarding.

## Phase 4: Trigger sanity check (lightweight)

You don't need the full description optimization loop for most edits. Quick version:

- Write 3-5 realistic prompts a user might send. Mix cases that should trigger the skill with cases where a similar but different skill should handle it.
- Eyeball each one against the description: would a model see this prompt and reach for this skill?
- If a should-trigger prompt is ambiguous, the description probably needs a clearer trigger context.

## Phase 5: Eval

Phase 5 verifies the edited skill works on hard cases. Use three separated subagents so the grader can't see what the skill was trying to do. Without this separation, you (the coordinator) end up rubber-stamping responses against rules you already know, and the scores come back inflated. Don't grade the responses yourself.

### Step 1: Define the rubric with the user

In one short exchange, write a rubric for this skill. Keep it ephemeral (not committed, not on the wiki):

- 4-6 criteria for "good," specific and falsifiable. "Anchors in actual plan content with named items" beats "is helpful."
- A matching "bad" list to make criteria concrete.
- 3-5 adversarial scenarios designed to expose specific failure modes: validation-seeking traps, vague venting with no decision, conflicting constraints, info vacuums, missing context.

Show the rubric to the user. Get a one-line "looks good" before continuing.

### Step 2: Spawn prompt-drafter subagent

Pass the skill body and the rubric scenarios. The drafter returns one realistic user-style prompt per scenario. Prompts should feel like what an actual user would type, not perfectly structured asks.

### Step 3: Spawn runner subagents in parallel

Each runner gets the skill body + one test prompt + the relevant user data file (PLAN.md, HEALTH.md, etc., real or representative). Returns ONLY the raw skill response.

### Step 4: Spawn blind grader subagent

Grader receives:

- The rubric (good criteria + bad signatures)
- The numbered responses

Grader does NOT receive:

- The skill body
- The test scenarios
- Which scenario produced which response

For each response, the grader scores pass/fail per criterion with a one-line reason. Because the grader doesn't know what "good" was supposed to look like beyond the rubric, it can't inflate.

### Step 5: Read the verdict

Look for:

- **Same criterion failing across multiple responses.** Real skill gap. Propose specific edits to the skill body.
- **All passes but responses feel generic.** Rubric was too lenient or the skill needs sharper output guidance.
- **Failures only on a specific scenario.** Add a clarifying line for that case.

### Step 6: Iterate

If anything failed, edit the skill, then re-run from Step 2 with the same rubric. Different prompts each run is fine (drafter generates new ones); the rubric stays stable so you can tell if the skill is improving.

Don't ship until the skill passes its rubric on the failures that matter.

## When to spawn the heavier eval loop

This skill stays lightweight by default. Reach for `skill-creator`'s full benchmark loop (subagents with baselines, assertions, viewer) when:

- The skill produces objectively checkable output (file transforms, data extraction, code generation) and the user wants measured results.
- You're comparing two versions of a skill and need rigor (use the blind comparator from skill-creator).
- Trigger reliability is critical and the user wants the description optimization script run.

For most edits, the 3-prompt spot check above gives enough signal.

## What good looks like

A finished skill stays tight and a reader can absorb it in a minute or two and feel oriented. The model reading it should know: when to trigger, what context to gather, what the output is, what to avoid. No AI tics, no filler, no apologetic hedging.

## Workflow summary

1. Read the skill. State the actual job in one sentence.
2. Run Phase 1 (health check). Propose structural fixes if needed.
3. Run Phase 2 (progressive disclosure). Propose splits if needed.
4. Get sign-off on structural changes before touching wording.
5. Run Phase 3 (wording and formatting). List issues, get sign-off, apply edits.
6. Run Phase 4 (trigger sanity check) if the description was changed.
7. Run Phase 5 (eval). Define rubric with user, run drafter/runners/blind grader pipeline, surface failures. Iterate if anything failed.
8. Show the final diff.

## Ship workflow

End-to-end loop for taking a draft skill to published. The audit phases above are the editing core. This section is the wrapper.

1. **Take the draft.** User shares a rough skill (description, body, optional template). Read it.
2. **Audit.** Run Phases 1-3 (health check, progressive disclosure, wording + formatting). Apply edits.
3. **Eval.** Run Phase 5: define rubric with user, then run prompt-drafter → parallel runners → blind grader pipeline. If multiple criteria fail across responses, fix the skill body before continuing.
4. **Install for hands-on testing.** Write the audited SKILL.md to `.claude/skills/<name>/SKILL.md` plus any companion files (templates, etc.). Gitignore files with personal data. Tell the user the skill is available and suggest a few test prompts.
5. **Iterate.** User tests in a fresh thread, returns with feedback. Apply edit → spot-test → install loop until they sign off.
6. **Publish.** Mirror the final skill body and template to the wiki page (`src/app/skills/<category>/<slug>/page.mdx`). Apply the wrapper-page header rules from Phase 3.

Throughout: keep installed `.claude/skills/<name>/SKILL.md` and the published wiki version in sync after every change.