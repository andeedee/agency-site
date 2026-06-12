---
name: slides
description: Create a beautiful HTML slide deck. Use when the user wants to make a presentation, pitch deck, talk slides, or slide deck. Guides them through content and style, then generates a single self-contained HTML file.
---

# Slides

Create zero-dependency HTML slide decks that run in the browser. Single HTML file, no build tools, no frameworks.

## Step 1: Clarifying questions

The user has told you what they want to present (via $ARGUMENTS or their message). Use AskUserQuestion to ask 4 questions in a single call. Always include questions 1-3, then pick 1 more based on context:

**Always ask:**

1. **"Do you have content ready, or just a topic?"**
   - Options: "I have content to paste" / "Just a topic, help me outline it"

2. **"How many slides?"**
   - Options: "Short (5-8)" / "Medium (10-15)" / "Long (20+)"

3. **"Which style?"**
   - Options: "Brand (default, Paper/Ink/Red)" / "Dark" / "Light (Apple-clean)" / "Dark corporate"
   - **Brand is the default.** If the user has no preference, doesn't answer, or says "you pick," use the Brand style (STYLES.md section 0). Only fall back to another style when they ask for it.

**Pick 1 more from:**
- Will this be screen-shared in a video / recording? (If yes, use the larger "Designing for video / screen-share" sizes in STYLES.md and keep slides sparse.)
- What's the audience? (executives, developers, general public, etc.)
- What's the purpose? (pitch, teach, inform, inspire)
- Any specific content you want on the title slide?
- Do you have images or assets to include?
- What's the key takeaway the audience should remember?

If the user said "I have content to paste," wait for them before continuing.

If the user asks to see style previews, generate single-slide preview files in `output/slide-previews/`, open them, and ask which they prefer. Then continue.

## Step 2: Online research

Use AskUserQuestion to ask:

**"Want me to research anything before I draft the slides?"**
- Options: "Yes, research the topic" / "Yes, let me tell you what to search" / "No, just build it"

If yes: search the web, summarize findings in 3-5 bullets, then continue.

## Image slides: layout rules

Two common failures when a slide centers on an image:

- **Constrain the image by height, not just width.** A full-bleed `width: 100%` image on a tall screenshot overflows a `100vh` slide and gets cropped. Always cap it: `max-height: 74vh; max-width: 100%; width: auto; height: auto; object-fit: contain;` and let the `<figure>` use `flex: 0 1 auto; min-height: 0;` so the title and image share the height. The whole image must be visible without scrolling.
- **Don't put a fade/reveal animation on an image that fills the slide.** A mid-transition screenshot looks washed out or semi-transparent. For image-centric slides, render the image statically at full opacity (skip the `.reveal` class on the `<figure>`).
- For a screenshot that already has its own background (e.g. a white table), let the image's own background show. Don't wrap it in a contrasting card unless the user asks.
- **"Show the image" / showcase slides:** when the user just wants to display a screenshot they'll narrate over, make it a **pure full-bleed framed image with no on-slide title** (image centered, aspect preserved, subtle shadow). Exception: if the image is small (roughly < 700px on its long edge), use a **two-column** layout instead, image enlarged on the right half, a few words of large-text copy on the left, since a tiny image alone looks lost on a big slide.

## Step 3: Generate the deck

Read `STYLES.md` in this skill directory for the style reference. Generate a single self-contained HTML file following these rules:

**Structure:**
- Single HTML file with all CSS and JS inline
- Each slide is a `<section class="slide">` at exactly `100vh` / `100dvh`
- No scrolling within slides. If content overflows, split into multiple slides.
- `scroll-snap-type: y mandatory` for snapping between slides

**Content rules:**
- Title slide: **always use the Cover template** (STYLES.md → "Cover / title slide"). Spark mark + big full-width headline with one red-italic highlight word + optional subtitle. No kicker/eyebrow, no byline/footer. The spark is the constant brand mark; only the title/subtitle change per deck.
- Content slides: 1 heading + max 5-6 bullets OR 1 heading + 2 short paragraphs
- Keep text concise. Slides are visual, not documents.

**Slide format variety. Don't just use bullet lists. Use the 12 canonical formats in STYLES.md, and make sure every style supports all 12:**
- **Cover / title:** Fixed spark mark, full-width headline, one highlighted word or phrase, optional subtitle.
- **Agenda:** Single column, 3-4 numbered circles + bold label + 1-line description. Current item filled red, rest outlined.
- **Two-column:** Left explanation, right real visual, mock, chart, screenshot, or animated illustration.
- **Stat grid:** 2-3 important numbers with short labels and context.
- **Feature grid:** Bento/card grid with hand-built SVG icons, no emoji as the visual system.
- **Comparison:** Structured side-by-side table or rows for before/after, us/them, option A/B.
- **Process / steps:** 3-4 animated illustration steps connected by arrows or a line.
- **Timeline / roadmap:** Milestone cards with date, header, short description, and subtle ambient icon motion. No bare dot-only timelines.
- **Chart:** Chart.js stacked bar (P0), donut/pie (P1), line, or grouped bar. Monochrome tint ramp on `--accent`, hover tooltips, never rainbow.
- **Code block:** Dark editor card with readable code, code-specific tokens, and one subtle cursor or scan animation.
- **Quote:** Big quote plus attribution, with a portrait/logo/branded placeholder if the quote leaves too much blank space.
- **Closing / CTA:** Spark mark, memorable closing line, and one clear next action.
- Use the canonical formats above for at least two-thirds of slides; bullets for the rest.

**Design rules:**
- Every slide needs a visual element; text-only slides are forgettable. Use layout variety, cards, comparison boxes, or icons.
- Don't repeat the same layout on consecutive slides.
- Left-align body text. Only center titles and short hero text.
- Use emojis sparingly: a few as card icons in a recap grid is fine, not on every bullet.
- Commit to a visual motif and carry it across every slide (e.g., accent-colored dot bullets, card borders, same heading style).

**Avoid (common AI slide mistakes):**
- Accent lines or decorative bars under titles, a hallmark of AI-generated slides
- Default blue accent on everything
- Generic gradients or glassmorphism without purpose

**Animations (include in all decks). Use the Animation Toolkit in STYLES.md:**
- Give most slides a subtle entrance: `.reveal` plus one variant (`from-left`, `from-right`, `from-scale`, `from-blur`, `fade-only`), or wrap a group in `.stagger`. The toolkit has a per-layout cheat-sheet; follow it.
- **One hero motion per slide**; everything else just fades. Subtle = 8–24px travel, 450–700ms, ease-out. Never distracting.
- Use `data-count` for big stats, `.draw-line` instead of a static accent line, and `.float`/`.pulse` only on a single small decorative element (never text).
- Image-only slides get a single `fade-only` or no animation at all.
- **Animated illustrations** are the signature move: for process/step slides and concept slides, build inline-SVG illustrations with looping ambient motion (breathing glow, self-writing line, twinkle, drift, flowing connector). See "Animated Illustrations" in STYLES.md, including the **process-flow template** (big title only, no eyebrow, no step numbers, large bold step headlines, animated disc per step). Hold to the **illustration quality bar** there: hand-built SVG with one cohesive visual language, brand palette only, refined not clip-art, never emoji/stock glyphs as the centerpiece.
- Always keep the `prefers-reduced-motion` block (the toolkit disables all motion under it).

Note: the Visual QA renderer (Step 5) freezes animations to their final state, so QA shows the resting layout. Verify motion separately by opening the deck.

**Navigation (include in all decks):**
- Arrow keys (left/right and up/down)
- Space bar to advance
- Scroll / swipe
- Progress bar at top
- Navigation dots on the right edge

**Responsive:**
- All font sizes use `clamp(min, preferred, max)`
- All spacing uses `clamp()` or viewport units
- Height breakpoints at 700px, 600px, 500px
- Hide decorative elements on very short screens

## Step 4: Save

Save the file to `output/slides/[deck-name].html` using a short, descriptive kebab-case name. Do **not** open it for the user yet; first run Visual QA (Step 5).

## Step 5: Visual QA (REQUIRED, do not skip)

You cannot tell whether a deck looks right by reading the HTML. Rendered slides routinely have problems the code doesn't reveal: images cropped by the viewport, text washed out by downscaling, elements overlapping, captures taken mid-animation, low contrast. **Always render and inspect before declaring done.** This step is mandatory even for a single slide.

**1. Render each slide to an image:**
```bash
/usr/bin/python3 ~/.claude/skills/slides/render_slides.py --html output/slides/<deck>.html
```
This prints one image path per line (into `output/slides/qa/slide-NN.png`). It isolates each slide, disables scroll-snap, and forces final (non-animated) state, so you see exactly what renders.

**2. Inspect with a fresh-eyes subagent.** Do NOT inspect them yourself; you've been staring at the code and will see what you expect, not what's there. Spawn a subagent (Agent tool, `general-purpose`) and pass it the image paths plus a one-line "expected" note per slide. Use this prompt:

> Visually inspect these slide images. Assume there are issues — find them. For each slide, list problems (even minor): overlapping elements, text overflow or cut off at edges, images cropped or only partially visible, low-contrast text/icons (light-on-light, dark-on-dark), washed-out or faded images, mid-animation/half-faded captures, footers or citations colliding with content, uneven or cramped gaps (<0.3"), insufficient margin from slide edges (<0.5"), columns not aligned, leftover placeholder text. Report ALL issues with the slide number. If a slide looks clean, say so explicitly.
> Read and analyze:
> 1. <path>/slide-01.png (Expected: <brief description>)
> 2. ...

**3. Fix every real issue**, then **re-render the affected slides and re-inspect**. One fix often creates another problem (e.g. enlarging an image re-crops it).

**4. Repeat until a full pass finds nothing new.** Do not declare success until you've completed at least one fix-and-verify cycle. If the first pass "finds nothing," look again more critically; there is almost always something on the first draft.

## Step 6: Deliver

Only after QA passes:
- Open the file in Chrome with `open -a "Google Chrome" <filepath>` so the user can view it
- Tell the user where it was saved and give a one-line summary of the QA pass (e.g. "rendered all 8 slides, fixed 2 overflow issues, re-verified clean")
- Mention they can customize colors by editing the `:root` CSS variables at the top
- Clean up the `output/slides/qa/` images if no longer needed