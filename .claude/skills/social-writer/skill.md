---
name: social-writer
description: Turn a draft, transcript, or rough idea into 3 LinkedIn-first social posts in different styles. Use when the user has source material and wants social posts to promote it or stand alone.
---

# Social writer

You write social posts that earn attention without engagement bait. Default to LinkedIn. Adapt for X/Twitter when the user asks.

## Step 1: Get the source

If the user hasn't provided source material, ask them to paste it. Acceptable inputs:

- Newsletter post or essay
- Podcast or interview transcript
- Rough notes or a single idea
- A link to repurpose (ask them to paste the content)

Also ask which channel if it isn't obvious. Default to LinkedIn; X/Twitter on request.

## Step 2: Pick the 2-3 best styles

Read `.claude/skills/social-writer/social-examples.md` for full examples of each style. The four styles are:

1. **Story-led.** Hook with a surprising scene or claim. Body uses quotes, specifics, and lessons. Best for interviews, founder stories, news commentary.
2. **Numbered framework.** Quick setup, then 3-5 numbered points. Best for essays with a clear framework or list of tips.
3. **Short punch.** Strong claim, then 3-5 short lines with generous whitespace. Best for single-idea posts, mindset content, quote highlights.
4. **Hot take.** Contrarian claim backed by evidence. Best for opinionated essays or industry critique.

Match the source to the styles that fit:

- Interview/transcript → story-led + numbered framework
- Framework essay → numbered framework + hot take
- Single idea → short punch + hot take
- News commentary → story-led + hot take

Tell the user which 2-3 styles you picked and one line on why. If only 2 styles fit naturally, stretch the third into a less obvious choice. That's often where the best version comes from.

## Step 3: Draft 3 posts

Generate one post per style. Each post must follow these rules:

**Hook**
- First 1-2 lines create curiosity or surprise.
- Each of those lines should be under 50 characters when possible.
- Lead with the strongest insight, claim, or scene. Never a question.

**Structure**
- Short paragraphs (1-2 sentences max).
- Generous whitespace between paragraphs.
- For numbered posts, bold the section headers and use 3-5 points.

**CTA**
- End with a soft CTA pointing to the full piece: "Read the full breakdown: [link]" or "📌 Watch now: [link]".
- If the post stands alone (short punch, sometimes hot take), the CTA is optional.
- Never use hashtags.

**X/Twitter mode**
- If channel is X: single-post version stays under 280 characters. For longer ideas, output as a numbered thread (1/, 2/, 3/).
- Drop the soft CTA. X readers click less and the link in bio convention is different.

## Style guide (no AI slop)

Keep the writing human. For the full editor skill, see `/skills/creator/editor`. Quick rules for this skill:

- Banned words: delve, foster, leverage, utilize, robust, seamless, paradigm shift, game changer, this is huge.
- Banned filler: it's worth noting, importantly, really, just, literally, genuinely, honestly, simply, actually.
- No "Question? Answer." setups. No "Not X. It's Y." contrasts.
- No em dashes. Use commas or periods.
- Active voice with a human subject. Avoid "the decision emerges" or "the data tells us." Name the actor.
- No grandiose claims unless the specifics back them up.

## Output format

Return:

1. **Styles picked.** 2-3 bullets, each naming the style and one line on why it fits.
2. **Post 1: [Style name].** Full post in a copy-ready block.
3. **Post 2: [Style name].** Full post in a copy-ready block.
4. **Post 3: [Style name].** Full post in a copy-ready block.
5. **Notes** (optional). Flag any specifics you invented vs. pulled from source so the user can fact-check.