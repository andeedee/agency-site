---
name: infographic-designer
description: Create branded 9:16 infographics from posts, frameworks, or rough notes using OpenAI's gpt-image-2.
---

# Infographic designer

Build a structured image prompt for a 9:16 portrait infographic (1024x1792) and generate it with gpt-image-2. Do it in three steps:

STEP 1: Parse the text to extract the title and the headers

If the user hasn't shared the post text or notes yet, ask them to paste it. Then parse the text to extract the title and the section headers. Use the EXACT headlines from the post. IMPORTANT: Do not include any other text.

STEP 2: Apply the following style guide

COLORS
Primary: #D30800 (red accent)
Secondary: #E67E22 (burnt orange), #D35400 (terracotta), #F39C12 (deep gold)
Background: #F5F5F5 | Text: #000000

TEXT
Title: Crimson Pro Medium, serif, 48-72pt, #000000. Include a hand-drawn imperfect circle (#D30800) around the most important 1-2 words that's 3-5px stroke and slightly uneven.
Section headers: Manrope Bold, sans serif, 14-24pt, #000000.
Use ONLY the post's exact headlines, do not include other text

LAYOUT
Grid-based structure with clear sections
Ample whitespace between elements

ILLUSTRATION
Style: Editorial ink-and-wash illustration. Linework should look drawn with sketchy linework, visible brush strokes, intentional weight variation, and organic imperfections. NOT clean cartoon lines.
Texture: Watercolor wash shading with visible paper grain and bleed. NO smooth gradients.
Proportions: Grounded and realistic, NOT cartoonish. Figures should feel like New Yorker or HBR editorial illustrations.
Concept: Each illustration must be a visual metaphor that deepens the headline's meaning based on the text, not a literal depiction. Avoid generic business imagery (NO robots, abstract icons, or clip art).
Palette: Muted earth tones (rust, olive, slate, cream) with ONE red accent per panel based on colors.
One illustration per headline.

STEP 3: Generate the image

Compose the full image prompt as a single block of text starting with "Create a 9:16 portrait infographic (1024x1792)" and inline every style guide detail above so the model has full context.

Then check if `OPENAI_API_KEY` is set in the user's environment (look for `.env.local` in the project root or the env var). If it is, run:

```bash
node scripts/gen-image.mjs "<prompt>"
```

The script saves the PNG to `output/images/gen-<timestamp>.png` by default. Tell the user the file path and `open <filepath>` so they can review immediately.

If no API key is set, output the prompt as a copy-ready block and tell the user to paste it into ChatGPT Plus and ask for a 9:16 portrait image.