# Slide Styles Reference

The **Brand** style below is the default — use it unless the user asks for another. The three business styles after it are alternates. Each should look good as a webpage with animations, not just a presentation.

**Styles vs. formats.** A *style* (one of the 4 below) sets the palette, fonts, and mood. A *format* (one of the 12 in "Layout Formats") is a slide layout. **Every format works under every style** because formats only ever use these shared CSS variables — the "format contract" — which all 4 styles define: `--bg-primary`, `--text-primary`, `--text-secondary`, `--accent`, `--accent-dim`, `--on-accent`, `--surface`, `--border`, `--font-title`, `--font-body`. Never hardcode a color in a format; reach for a token so it themes automatically.

**All styles must support all 12 formats.** Brand, Default Dark, Light, and Dark Corporate are not separate template sets. They are four skins over the same 12 format templates: cover, agenda, two-column, stat grid, feature grid, comparison, process, timeline, chart, code block, quote, and closing CTA. When adding or changing a format, update the shared "Layout Formats" section and verify it under all four styles.

---

## 0. Brand (Default) — Peter Yang

Peter's personal brand. Warm "paper" content slides, near-black "ink" title/closing slides, one sharp red accent. Serif display headlines (Crimson Pro) over a clean geometric sans body (Manrope). Feels editorial and premium, not corporate.

**Typography:**
- Import: `https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,500;0,600;1,500&family=Manrope:wght@500;600;700&display=swap`
- Titles/display: **Crimson Pro** Medium (500), `var(--font-title)` — serif
- Body/labels: **Manrope** Semibold (600), `var(--font-body)` — sans
- Italic Crimson Pro (`1,500`) for accent taglines and key stats

**Colors:**
```css
:root {
    /* Palette */
    --red: #D30800;     /* sharp accent — links, CTA, ONE shape/stat per slide */
    --ink: #100202;     /* text, borders, dark-slide background */
    --paper: #FBEFD9;   /* warm light background — dominates content slides (~65%) */

    /* Roles — content (light) slides */
    --bg-primary: var(--paper);
    --text-primary: var(--ink);
    --text-secondary: rgba(16, 2, 2, 0.60);
    --accent: var(--red);
    --accent-dim: rgba(211, 8, 0, 0.10);
    --border: rgba(16, 2, 2, 0.14);
    --surface: #ffffff;        /* cards, discs, panels */
    --on-accent: #ffffff;      /* text/glyphs sitting on an --accent fill */

    --font-title: 'Crimson Pro', Georgia, 'Times New Roman', serif;
    --font-body: 'Manrope', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
}

/* Dark slides: add class="slide slide--dark" to title + closing slides */
.slide--dark {
    --bg-primary: var(--ink);
    --text-primary: var(--paper);
    --text-secondary: rgba(251, 239, 217, 0.66);
    --border: rgba(251, 239, 217, 0.16);
    --accent-dim: rgba(211, 8, 0, 0.22);
    background: var(--ink);
    color: var(--paper);
}
```

**Signature elements:**
- **Sandwich structure** — dark (`--ink`) title slide and closing slide; `--paper` content slides in between. Commit to this rhythm.
- **Red is precious** — one accent moment per slide (a link, a key number, a single circle/underline-free highlight). Never flood a slide with red.
- Crimson Pro titles do the visual work; Manrope keeps body crisp and legible.
- Section headers can sit next to a small **red filled circle** holding an icon/number (high contrast: white glyph on red).
- Progress bar and active nav dot use `--red`; inactive dots use `--text-secondary`.
- Titles set in Crimson Pro look best at weight 500 with slight negative letter-spacing (`-0.01em`).

### Cover / title slide (default opening — use for EVERY deck)

Every deck opens with this cover. It's a dark (`--ink`) slide with a big full-width Crimson Pro headline in **all white** (`--text-primary` on dark = paper) and a **hand-drawn red lasso looping around one italic highlight phrase** — Peter's actual signature mark (think "Behind the Craft" header). A soft red aura drifts behind the headline; the lasso draws in on entrance like a marker stroke. **No kicker/eyebrow, no byline/footer, no separate spark glyph** — the lasso IS the brand mark. Title and subtitle swap per deck; the lasso stays.

```html
<section class="slide slide--dark cover">
  <div class="aura"></div>
  <div class="inner">
    <h1 class="reveal from-blur">{{LEAD WORDS}} <span class="circle-word">{{HIGHLIGHT PHRASE}}<svg class="circle-mark" viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden="true"><path d="M 364 32 C 286 4, 78 6, 22 34 C -22 60, -4 104, 92 118 C 240 134, 380 118, 392 80 C 402 48, 386 38, 364 32"/></svg></span></h1>
    <p class="sub reveal">{{OPTIONAL SUBTITLE}}</p>
  </div>
</section>
```
```css
.cover{justify-content:center;align-items:flex-start}
.cover .aura{position:absolute;z-index:0;pointer-events:none;width:64vw;height:64vw;left:-10vw;top:50%;
  background:radial-gradient(circle, color-mix(in srgb, var(--accent) 42%, transparent), color-mix(in srgb, var(--accent) 10%, transparent) 45%, transparent 70%);
  filter:blur(26px);transform:translateY(-50%);animation:drift 17s ease-in-out infinite}
@keyframes drift{0%{transform:translateY(-50%) translateX(-2%) scale(1)}50%{transform:translateY(-54%) translateX(4%) scale(1.1)}100%{transform:translateY(-50%) translateX(-2%) scale(1)}}
.cover .inner{position:relative;z-index:1;max-width:min(92vw,1600px)}
.cover h1{color:var(--text-primary);font-size:clamp(3.6rem,8.2vw,6.8rem);line-height:1.0;letter-spacing:-.018em}
.circle-word{position:relative;display:inline-block;font-style:italic;color:var(--text-primary);white-space:nowrap;padding:0 .12em;isolation:isolate}
/* soft red glow behind the highlight — fades in then breathes */
.circle-word::before{content:"";position:absolute;inset:-35% -14%;background:radial-gradient(ellipse at center,color-mix(in srgb,var(--accent) 34%,transparent),transparent 65%);filter:blur(24px);z-index:-2;opacity:0;transform:scale(.94);transition:opacity 1.2s cubic-bezier(.16,1,.3,1) 1.4s,transform 1.2s cubic-bezier(.16,1,.3,1) 1.4s;pointer-events:none}
.cover.visible .circle-word::before{opacity:.78;transform:scale(1);animation:wordGlow 5.4s ease-in-out 2.6s infinite}
@keyframes wordGlow{0%,100%{opacity:.5;transform:scale(.96)}50%{opacity:.95;transform:scale(1.06)}}
/* lasso SVG sits behind the text via z-index:-1 inside the isolation context */
.circle-mark{position:absolute;left:-7%;top:-22%;width:114%;height:144%;overflow:visible;pointer-events:none;z-index:-1}
.circle-mark path{fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1100;stroke-dashoffset:1100;transition:stroke-dashoffset 1.5s cubic-bezier(.6,.04,.4,1) 1.1s}
.cover.visible .circle-mark path{stroke-dashoffset:0}
.cover .sub{font-size:clamp(1.6rem,3vw,2.6rem);margin-top:clamp(1.6rem,3vh,2.4rem);max-width:30ch}
.cover.visible h1{transition-delay:.05s} .cover.visible .sub{transition-delay:.22s}
/* prefers-reduced-motion: include .circle-mark path{stroke-dashoffset:0} and .circle-word::before{animation:none;opacity:.6;transform:scale(1)} */
```
Notes: the headline is intentionally large (video-safe) and full-width. Pick one short phrase (2–3 words) for the italic `.circle-word`. **Keep the lasso path identical across decks** — it's the brand mark. Use the same pattern on the closing slide for matching bookends. The lasso replaces the old "spark" glyph; do not bring sparks back.

---

## 1. Default (Dark)

Black background, white text, yellow highlights. Clean and bold.

**Typography:**
- Font: `Inter` via `https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap` (falls back to `-apple-system`, `Helvetica Neue`, `Arial`, sans-serif)
- Title: weight 700, letter-spacing -0.018em
- Body: weight 500-600
- Italics get weight 600 (italic + bolder gives it visible emphasis at small sizes)

**Colors + tokens:**
```css
:root{
    --paper:#000;             /* alias used by base CSS; redefine so tl-marker border etc. read as black */
    --ink:#fff;
    --bg-primary:#000;
    --text-primary:#fff;
    --text-secondary:#a3a3a3;
    --accent:#f5c518;
    --accent-dim:rgba(245,197,24,.16);
    --border:rgba(255,255,255,.12);
    --surface:rgba(255,255,255,.05);
    --on-accent:#000;          /* yellow accent needs dark text on it */
    --chart-1:#7a6210; --chart-2:#b8930e; --chart-3:#f5c518; --chart-4:#f7d35a; --chart-5:#fbe89c;
    --font-title:'Inter',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;
    --font-body:'Inter',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;
}
/* slide--dark is a no-op here — the deck is already dark */
.slide--dark{--bg-primary:#000;--text-primary:#fff;--text-secondary:rgba(255,255,255,.72);--border:rgba(255,255,255,.18);--surface:rgba(255,255,255,.06)}
.code-slide{--code-bg:#0a0a0a;--code-text:#fff;--code-muted:rgba(255,255,255,.55)}
```

**Required brand-color overrides** (base CSS has Brand red hardcoded in several shadows — patch each when applying this template):
```css
.code-accent{color:var(--accent)}
.code-head i:first-child{background:var(--accent)}
.agenda-item.active .agenda-num{box-shadow:0 14px 36px rgba(245,197,24,.26)}
.tl-marker{box-shadow:0 12px 30px rgba(245,197,24,.26)}
.tl-step.now .tl-marker{box-shadow:0 12px 30px rgba(245,197,24,.28),0 0 0 4px rgba(245,197,24,.18)}
.scan{background:linear-gradient(to bottom,transparent,rgba(245,197,24,.10),transparent)}
.card,.disc,.mock{box-shadow:0 8px 24px rgba(0,0,0,.5);background:var(--surface)}
.code-card{box-shadow:0 24px 60px rgba(0,0,0,.7)}
.portrait-card{background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(245,197,24,.10));box-shadow:0 26px 80px rgba(0,0,0,.6)}
.file-card,.tpl-card,.thumb{background:var(--surface);box-shadow:0 8px 24px rgba(0,0,0,.5)}
.install-frame{background:#0a0a0a;box-shadow:0 36px 90px rgba(0,0,0,.7)}
h1,h2{font-weight:700;letter-spacing:-.018em} .italic{font-style:italic;font-weight:600}
```

**Signature elements:**
- Pure black background, no gradients
- Yellow accent for highlights, lasso, progress bar, and inline code
- Generous whitespace — let content breathe
- Same lasso brand mark on cover/closing, just tinted yellow via `var(--accent)`
- Supports all 12 shared formats through the format-contract tokens. Do not create dark-only layout variants unless the shared format cannot express the idea.

**Reference deck:** `output/slides/format-gallery-dark.html` is the canonical 15-slide build of this template.

---

## 2. Light (Apple-Clean)

Pure white background, bold sans-serif headlines, extreme whitespace. Inspired by apple.com.

**Typography:**
- Font: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif` — pure system stack, no external font load
- Title: weight 700, letter-spacing -0.025em (cover/closing: -0.03em)
- Use weight variation (500-700) for emphasis instead of color; italics get weight 600

**Colors + tokens:**
```css
:root{
    --paper:#fff;
    --ink:#1d1d1f;
    --bg-primary:#fff;
    --text-primary:#1d1d1f;
    --text-secondary:#6e6e73;
    --accent:#0071e3;
    --accent-dim:rgba(0,113,227,.10);
    --border:#d2d2d7;
    --surface:#f5f5f7;
    --on-accent:#fff;
    --chart-1:#003a75; --chart-2:#0056b3; --chart-3:#0071e3; --chart-4:#5ba8f5; --chart-5:#aed4fa;
    --font-title:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif;
    --font-body:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif;
}
/* slide--dark is a no-op here — keep everything light (the dark code card stands on its own) */
.slide--dark{--bg-primary:#fff;--text-primary:#1d1d1f;--text-secondary:#6e6e73;--border:#d2d2d7;--surface:#f5f5f7}
.code-slide{--code-bg:#1d1d1f;--code-text:#fff;--code-muted:rgba(255,255,255,.55)}
```

**Required brand-color overrides** (base CSS has Brand red hardcoded in several shadows — patch each when applying this template):
```css
.code-accent{color:#5ba8f5}
.code-head i:first-child{background:var(--accent)}
.agenda-item.active .agenda-num{box-shadow:0 14px 36px rgba(0,113,227,.22)}
.tl-marker{box-shadow:0 12px 30px rgba(0,113,227,.22)}
.tl-step.now .tl-marker{box-shadow:0 12px 30px rgba(0,113,227,.22),0 0 0 4px rgba(0,113,227,.16)}
.scan{background:linear-gradient(to bottom,transparent,rgba(0,113,227,.10),transparent)}
.card,.disc,.mock{box-shadow:0 12px 30px rgba(0,0,0,.06);background:#fff}
.code-card{box-shadow:0 24px 60px rgba(0,0,0,.18)}
.portrait-card{background:linear-gradient(145deg,rgba(0,113,227,.05),rgba(0,113,227,.14));box-shadow:0 26px 80px rgba(0,0,0,.12)}
.file-card,.tpl-card,.thumb{background:#fff;box-shadow:0 12px 30px rgba(0,0,0,.06)}
.install-frame{background:#f5f5f7;box-shadow:0 36px 90px rgba(0,0,0,.18)}
h1,h2{font-weight:700;letter-spacing:-.025em} .cover h1,.closing h1{letter-spacing:-.03em} .italic{font-style:italic;font-weight:600}
```

**Signature elements:**
- Pure white background, no textures, no gradients
- Massive whitespace — more padding than you think you need
- Same lasso brand mark on cover/closing, tinted blue via `var(--accent)`
- Code editor card stays dark for contrast against the white slide
- Blue accent used only for the lasso, links, CTAs, and chart series — never decorative
- Supports all 12 shared formats through the format-contract tokens.

**Reference deck:** `output/slides/format-gallery-light.html` is the canonical 15-slide build of this template.

---

## 3. Dark Corporate

Navy background, white text, teal accent. Professional and polished.

**Typography:**
- Font: `Inter` (400/600/700) via Google Fonts
- Title: `clamp(1.5rem, 4vw, 2rem)`
- Body: `clamp(0.875rem, 1.8vw, 1.125rem)`

**Colors:**
```css
:root {
    --bg-primary: #0f172a;
    --bg-card: rgba(255, 255, 255, 0.05);
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --accent: #2dd4bf;
    --accent-dim: rgba(45, 212, 191, 0.15);
    --border: rgba(255, 255, 255, 0.08);
    --surface: rgba(255, 255, 255, 0.05);
    --on-accent: #0f172a;      /* dark text on light teal */
    --font-title: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
}
```

**Signature elements:**
- Deep navy background (not pure black — slightly warmer)
- Teal accent for highlights, buttons, and interactive elements
- Cards with faint borders and slight background tint
- Clean, modern sans-serif throughout (Inter)
- Feels like a premium SaaS dashboard or investor deck
- Supports all 12 shared formats through the format-contract tokens. Keep the same format structure, but tune visuals toward crisp SaaS/investor-deck restraint.

---

## Base CSS (All Styles)

Include this in every deck. Adapt colors/fonts per style.

```css
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    height: 100%;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overflow-x: hidden;
}

body {
    height: 100%;
    font-family: var(--font-body);
    background: var(--bg-primary);
    color: var(--text-primary);
    overflow-x: hidden;
}

.slide {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: var(--slide-padding);
}

.slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 100%;
    overflow: hidden;
}

:root {
    --slide-padding: clamp(2rem, 6vw, 5rem);
    --content-gap: clamp(0.75rem, 2vw, 1.5rem);
    /* Font fallbacks so a deck always renders even if a style forgets to set these.
       Each style's :root should override --font-title / --font-body. */
    --font-title: Georgia, 'Times New Roman', serif;
    --font-body: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
}

/* Animations: the canonical .reveal / .stagger / illustration classes live in the
   "Animation Toolkit" section below — include THAT CSS, don't redefine .reveal here.
   Do NOT add blanket `.reveal:nth-child` stagger delays; use `.stagger` on a
   container when you want children to sequence, so each slide keeps one hero motion. */

/* Responsive */
@media (max-height: 700px) {
    :root {
        --slide-padding: clamp(1rem, 4vw, 3rem);
        --content-gap: clamp(0.5rem, 1.5vw, 1rem);
    }
}

@media (max-height: 600px) {
    .nav-dots, .decorative { display: none; }
}

@media (max-height: 500px) {
    :root {
        --slide-padding: clamp(0.75rem, 3vw, 1.5rem);
    }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }
    html { scroll-behavior: auto; }
}
```

## Base JavaScript (All Styles)

Include this navigation controller in every deck:

```javascript
class SlidePresentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.setupObserver();
        this.setupKeyboard();
        this.setupProgress();
        this.setupDots();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('visible', entry.isIntersecting); // replay motion on revisit
                if (entry.isIntersecting) {
                    this.currentSlide = [...this.slides].indexOf(entry.target);
                    this.updateProgress();
                    this.updateDots();
                    this.countUp(entry.target);
                }
            });
        }, { threshold: 0.5 });
        this.slides.forEach(slide => observer.observe(slide));
    }

    countUp(slide) {
        slide.querySelectorAll('[data-count]').forEach(el => {
            if (el.dataset.done) return;
            el.dataset.done = '1';
            const end = parseFloat(el.dataset.count), dur = 1100, t0 = performance.now();
            const suffix = el.dataset.suffix || '';
            (function tick(now) {
                const p = Math.min(1, (now - t0) / dur);
                const k = 1 - Math.pow(1 - p, 3);          // ease-out
                el.textContent = Math.round(end * k).toLocaleString() + suffix;
                if (p < 1) requestAnimationFrame(tick);
            })(t0);
        });
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                this.goTo(this.currentSlide + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.goTo(this.currentSlide - 1);
            }
        });
    }

    goTo(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.slides[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    setupProgress() {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:var(--accent);z-index:100;transition:width 0.3s ease;';
        document.body.prepend(bar);
        this.progressBar = bar;
    }

    updateProgress() {
        const pct = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressBar.style.width = pct + '%';
    }

    setupDots() {
        const nav = document.createElement('nav');
        nav.className = 'nav-dots';
        nav.style.cssText = 'position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:0.5rem;z-index:100;';
        this.slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.style.cssText = 'width:8px;height:8px;border-radius:50%;border:none;background:var(--text-secondary);opacity:0.4;cursor:pointer;transition:all 0.3s;padding:0;';
            dot.addEventListener('click', () => this.goTo(i));
            nav.appendChild(dot);
        });
        document.body.appendChild(nav);
        this.dots = nav.querySelectorAll('button');
    }

    updateDots() {
        this.dots.forEach((dot, i) => {
            dot.style.opacity = i === this.currentSlide ? '1' : '0.4';
            dot.style.background = i === this.currentSlide ? 'var(--text-primary)' : 'var(--text-secondary)';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new SlidePresentation());

/* Chart.js helper — resolves var(--chart-N) tints, applies brand theme,
   installs hover tooltip skin, defers init until the slide is visible.
   Requires Chart.js loaded via CDN in <head>:
   <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script> */
window.Deck = window.Deck || {};
Deck._pending = {};
Deck.chart = function(id, cfg){ Deck._pending[id] = cfg; };
Deck._cssVar = function(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};
Deck._resolveColor = function(v){
    if (typeof v !== 'string') return v;
    const m = v.match(/^var\((--[^)]+)\)$/);
    return m ? Deck._cssVar(m[1]) : v;
};
Deck._theme = function(cfg){
    const text = Deck._cssVar('--text-secondary');
    const grid = Deck._cssVar('--border');
    const font = Deck._cssVar('--font-body').replace(/['\"]/g,'').split(',')[0].trim() || 'sans-serif';
    Chart.defaults.font.family = font;
    Chart.defaults.font.size = 14;
    Chart.defaults.color = text;
    // resolve var() colors in datasets
    (cfg.data && cfg.data.datasets || []).forEach(ds => {
        ['backgroundColor','borderColor','pointBackgroundColor','pointBorderColor','hoverBackgroundColor'].forEach(k => {
            if (Array.isArray(ds[k])) ds[k] = ds[k].map(Deck._resolveColor);
            else if (ds[k]) ds[k] = Deck._resolveColor(ds[k]);
        });
    });
    // merge default scales (only if axes exist for this chart type)
    cfg.options = cfg.options || {};
    if (cfg.type === 'bar' || cfg.type === 'line') {
        cfg.options.scales = cfg.options.scales || {};
        ['x','y'].forEach(ax => {
            cfg.options.scales[ax] = Object.assign(
                { ticks:{color:text}, grid:{color:grid, drawBorder:false}, border:{color:grid} },
                cfg.options.scales[ax] || {}
            );
        });
    }
    // tooltip + legend skin
    cfg.options.plugins = Object.assign({
        legend: { labels: { color: Deck._cssVar('--text-primary'), padding: 14, boxWidth: 14, boxHeight: 14, font:{ size: 13, weight: '600' } } },
        tooltip: {
            backgroundColor: Deck._cssVar('--ink') || '#100202',
            titleColor: Deck._cssVar('--paper') || '#fff',
            bodyColor: Deck._cssVar('--paper') || '#fff',
            borderColor: Deck._cssVar('--accent'),
            borderWidth: 1, padding: 12, cornerRadius: 10, displayColors: true, boxPadding: 6,
            titleFont:{ weight:'700', size: 13 }, bodyFont:{ weight:'500', size: 14 }
        }
    }, cfg.options.plugins || {});
    cfg.options.responsive = true;
    cfg.options.maintainAspectRatio = false;
    // Headroom for stack totals + room for axis labels
    cfg.options.layout = Object.assign({padding:{top:42, right:14, bottom:4, left:8}}, cfg.options.layout || {});
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) cfg.options.animation = false;
    return cfg;
};
// Plugin: draw the sum of each stack in Crimson Pro above the top bar.
// Auto-applied to stacked bar charts. Override via plugins.stackTotals.
Deck._stackTotals = {
    id: 'stackTotals',
    afterDatasetsDraw(chart, _, opts){
        const {ctx, scales:{x, y}, data} = chart;
        if (!chart.options?.scales?.y?.stacked) return;
        const titleFont = (Deck._cssVar('--font-title') || 'Georgia, serif').split(',')[0].replace(/['"]/g,'').trim();
        const accent = Deck._cssVar('--accent') || '#D30800';
        const unit = opts?.unit || '', suffix = opts?.suffix || '';
        ctx.save();
        ctx.fillStyle = accent;
        ctx.font = `600 ${Math.round((opts?.size || 22))}px ${titleFont}, Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        data.labels.forEach((_, i) => {
            let total = 0;
            data.datasets.forEach((ds, di) => {
                if (!chart.getDatasetMeta(di).hidden) total += +ds.data[i] || 0;
            });
            if (!total) return;
            ctx.fillText(unit + total.toLocaleString() + suffix, x.getPixelForValue(i), y.getPixelForValue(total) - 10);
        });
        ctx.restore();
    }
};
Deck._initCharts = function(slide){
    if (typeof Chart === 'undefined') return;
    if (!Deck._chartRegistered) { Chart.register(Deck._stackTotals); Deck._chartRegistered = true; }
    slide.querySelectorAll('canvas[id]').forEach(cv => {
        const cfg = Deck._pending[cv.id];
        if (!cfg || cv.dataset.done) return;
        cv.dataset.done = '1';
        new Chart(cv.getContext('2d'), Deck._theme(cfg));
    });
};
// hook the existing observer: SlidePresentation.countUp triggers on visible — patch it
document.addEventListener('DOMContentLoaded', () => {
    // re-observe to also init charts on visible
    document.querySelectorAll('.slide').forEach(s => {
        const io = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting) Deck._initCharts(e.target);
        }), { threshold: 0.4 });
        io.observe(s);
    });
});
```

## Animation Toolkit (subtle by default)

Per-slide motion is the point of HTML decks — but it must be *subtle*, never distracting. This toolkit makes adding motion a one-class job. Drop this CSS into every deck; then animating an element is just adding a class.

**The rules that keep it subtle (don't break these):**
- **Distance:** 8–24px of travel, scale no smaller than `0.96`, blur ≤ 8px. Big slides = small moves.
- **Duration:** 450–700ms, always ease-out (`cubic-bezier(.16,1,.3,1)`). Never bounce or spin.
- **One hero motion per slide.** Pick a single focal element to draw the eye; everything else just fades quietly. Competing motion is what reads as "distracting."
- **Continuous motion** (`float`, `pulse`) goes on at most ONE small decorative element, never on text.
- **Image-only slides:** a single `fade-only`, or nothing. Don't animate a lone image's parts.
- **Reduced motion:** the base `prefers-reduced-motion` block already collapses all of this to near-instant. Keep it.

```css
/* Entrance reveals — element starts hidden, animates in when its slide is active.
   Add ONE variant class to pick the motion. Default (no variant) is a gentle fade-up. */
.reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity .6s cubic-bezier(.16,1,.3,1),
                transform .6s cubic-bezier(.16,1,.3,1),
                filter   .6s ease;
    will-change: opacity, transform;
}
.slide.visible .reveal { opacity: 1; transform: none; filter: none; }

.reveal.fade-only  { transform: none; }              /* pure fade — best for images */
.reveal.from-down  { transform: translateY(-16px); }
.reveal.from-left  { transform: translateX(-24px); }
.reveal.from-right { transform: translateX(24px); }
.reveal.from-scale { transform: scale(.96); }
.reveal.from-blur  { filter: blur(8px); transform: none; }

/* Stagger — wrap a group; its direct children animate in sequence.
   Combine with a variant on the container, e.g. <div class="stagger from-left"> */
.stagger > * {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity .55s cubic-bezier(.16,1,.3,1),
                transform .55s cubic-bezier(.16,1,.3,1);
}
.slide.visible .stagger > * { opacity: 1; transform: none; }
.slide.visible .stagger > *:nth-child(1) { transition-delay: .05s; }
.slide.visible .stagger > *:nth-child(2) { transition-delay: .13s; }
.slide.visible .stagger > *:nth-child(3) { transition-delay: .21s; }
.slide.visible .stagger > *:nth-child(4) { transition-delay: .29s; }
.slide.visible .stagger > *:nth-child(5) { transition-delay: .37s; }
.slide.visible .stagger > *:nth-child(6) { transition-delay: .45s; }

/* Emphasis: a thin accent line that draws itself in (use instead of a static rule) */
.draw-line { transform: scaleX(0); transform-origin: left; transition: transform .7s cubic-bezier(.16,1,.3,1) .2s; }
.slide.visible .draw-line { transform: scaleX(1); }

/* Continuous ambient motion — VERY subtle, one decorative element only, never text */
@keyframes floaty   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes softpulse{ 0%,100% { opacity: 1; }              50% { opacity: .55; } }
.float { animation: floaty 5s ease-in-out infinite; }
.pulse { animation: softpulse 2.4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
    .float, .pulse { animation: none; }
}
```

**Count-up for big stats** is already wired into the Base JS controller above (the `countUp` method). Just add the attribute to any number: `<span data-count="700000" data-suffix="+">0</span>` — it animates from 0 when its slide appears.

**Replay on revisit** is also already in the Base JS (`classList.toggle('visible', …)`), so entrance motion replays when you scroll back to a slide — which feels good in HTML.

**Which motion for which layout** (pick one focal motion, the rest fade):
| Layout | Suggested motion |
|---|---|
| Title slide | Title `from-blur`, subtitle plain `.reveal` (fades up after) |
| Bullet / icon rows | Wrap the list in `.stagger` |
| Two-column (text + visual) | Text `from-left`, visual `from-right` |
| Card grid | `.stagger` on the grid container |
| Big stat callout | `data-count` on the number; label plain `.reveal` |
| Comparison columns | Left `from-left`, right `from-right` |
| Image-only | Single `fade-only` (or nothing) |
| Section header w/ accent | `.draw-line` on the accent, never a static underline |
| Chart | `.reveal` on the wrap; Chart.js plays its own entrance once when the slide becomes visible |
| Agenda | Wrap the agenda-list in `.stagger`; each numbered row fades up in sequence |
| Timeline | `.reveal` on the wrap; the red track fills via `fillTrack`, current step gets `.now` pulse |

## Animated Illustrations (ambient SVG motion)

Beyond entrance reveals, slides can have **looping motion on the illustrations themselves** — a glow that breathes, a pencil that writes, sparkles that twinkle. This is the signature move for an HTML deck. Build illustrations as **inline SVG** and animate their parts with small CSS `@keyframes`. Keep loops slow (2.5–4s), movements tiny (≤6px, scale ≤1.1), ease-in-out, and always disable under `prefers-reduced-motion`.

**Reusable loop keyframes** (drop in and apply the class to an SVG part):
```css
/* breathing glow — a red radial behind an icon */
.glow { position:absolute; width:70%; height:70%; border-radius:50%;
        background: radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%);
        animation: breathe 3.2s ease-in-out infinite; }
@keyframes breathe { 0%,100%{ transform:scale(.7); opacity:.15 } 50%{ transform:scale(1.1); opacity:.55 } }

/* gentle bob — for a pencil, pin, anything "alive" */
@keyframes bob { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-3px) } }
.bob { animation: bob 2.6s ease-in-out infinite; }

/* self-writing underline — grows, holds, fades, repeats */
.write { transform-origin:left center; animation: write 2.6s ease-in-out infinite; }
@keyframes write { 0%{ transform:scaleX(0); opacity:1 } 45%{ transform:scaleX(1); opacity:1 }
                   80%{ transform:scaleX(1); opacity:1 } 100%{ transform:scaleX(1); opacity:0 } }

/* twinkle — put on 2-3 sparkles with staggered animation-delay (.5s, 1s) */
@keyframes twinkle { 0%,100%{ transform:scale(.3); opacity:0 } 50%{ transform:scale(1); opacity:1 } }
.spark { transform-origin:center; animation: twinkle 2.4s ease-in-out infinite; }

/* drift — paper plane / arrow floating in place */
@keyframes fly { 0%,100%{ transform:translate(0,0) rotate(0) } 50%{ transform:translate(4px,-5px) rotate(4deg) } }
.fly { animation: fly 3.4s ease-in-out infinite; }

/* flowing dashes — a connector line that implies forward motion */
@keyframes flow { to { stroke-dashoffset:-16 } }
.dash { stroke:var(--accent); stroke-width:2.6; stroke-dasharray:5 6; stroke-linecap:round; fill:none;
        animation: flow 1.1s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .glow,.bob,.write,.spark,.fly,.dash { animation: none; }
  .write { transform: scaleX(1); opacity:1; }
}
```

**Process-flow template (the default for "step by step" slides).** Big title only — **no eyebrow, no step numbers**. Each step is an icon in a circular disc (white fill, red ring) with a **large bold headline** and a short caption, connected by flowing dashed arrows. The disc's SVG carries one looping animation from the kit above. Steps fade in via `.stagger`; the loops run continuously after. Keep illustration metaphors literal (lightbulb = capture, pencil = draft, sparkles = refine, paper plane = publish) and swap freely.

```html
<div class="flow stagger">
  <div class="step">
    <div class="disc"><span class="glow"></span><svg viewBox="0 0 48 48"><!-- icon --></svg></div>
    <h3>Capture</h3>
    <p>Short caption.</p>
  </div>
  <div class="conn"><svg viewBox="0 0 76 22"><path class="dash" d="M2 11 H60"/><path class="arrowhead" d="M60 4 L74 11 L60 18 Z"/></svg></div>
  <!-- repeat step + conn for 3–4 steps; last has no trailing conn -->
</div>
```
Disc sizing for legibility: `width: clamp(112px,11.5vw,176px)`. Wrap to two rows under ~820px (`.flow{flex-wrap:wrap} .conn{display:none}`).

**Illustration quality bar — custom and editorial, never clip-art.** The illustrations are a brand signal; cheap-looking ones cheapen the whole deck. Hold this standard:
- **Hand-build SVG**, don't drop in emoji or stock glyphs as the centerpiece. (A single emoji as a tiny accent is fine; an emoji standing in for "the illustration" is not.)
- **One cohesive visual language across the whole deck** — same stroke weight, same corner radius, same fill approach, same level of detail on every illustration. Mismatched styles read as clip-art.
- **Stick to the palette** — ink + red on white/paper. No rainbow multicolor, no unmotivated gradients, no heavy drop-shadows or faux-3D.
- **Simple and intentional beats detailed.** Clean geometric/line forms with deliberate negative space look more premium than busy, literal drawings.
- **Every illustration gets at least one subtle loop** from the kit above — motion is what separates these from static icons. Keep it subtle (the rules at the top of this section).
- When in doubt, fewer shapes, heavier negative space, one accent color moment. Refined > decorated.

## Layout Formats (the 12 core formats)

These are the twelve formats to reach for. Every deck is a sequence of them. **All twelve are style-agnostic** — they use only the format-contract tokens, so the same markup renders correctly under Brand, Dark, Light, or Dark Corporate. Each ships with one subtle animation. Pick a different format for adjacent slides; never run the same layout twice in a row.

**Anchor every content format with an eyebrow + title.** Don't drop a lone centered block into the middle of the slide — that's where the "too much empty space" look comes from. Open content slides with a small uppercase `.eyebrow` label in `--accent`, then the title, then the body. The eyebrow gives structure and makes the frame feel intentional (this is what Stripe / Linear / keynote decks do). Hero formats (cover, quote, closing) stay centered without an eyebrow.

**Top-anchor content slides.** Set `.slide { justify-content: flex-start; padding-top: clamp(3.4rem, 8vh, 5.6rem) }` as the default, then override the centered formats: `.slide.cover, .slide.quote, .slide.code-slide { justify-content: center; padding-top: var(--slide-padding) }`. Without this, every content slide pools in the bottom half and looks half-finished.

> Shared building blocks used below: `.cols` (two-column), `.disc`/`.flow`/`.conn` (process), `.card`, and the entrance classes from the Animation Toolkit (`reveal`, `from-left/right/blur`, `stagger`, `draw-line`).

```css
/* shared format CSS — include once, used by several formats */
.eyebrow{display:block;font-size:clamp(.95rem,1.3vw,1.15rem);letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:.7rem}
.cols{display:flex;gap:clamp(1.4rem,3vw,2.6rem);align-items:center}
.col-text{flex:1 1 52%} .col-media{flex:1 1 48%;display:flex;justify-content:center}
.lead{font-size:clamp(1.2rem,1.9vw,1.55rem);color:var(--text-secondary);margin-top:1.1rem;max-width:34ch;line-height:1.45}
.checks{list-style:none;margin-top:1.6rem;display:flex;flex-direction:column;gap:.7rem}
.checks li{display:flex;gap:.7rem;align-items:center;font-size:clamp(1.1rem,1.5vw,1.35rem);font-weight:600}
.checks .mk{color:var(--accent);font-weight:800}
.framed{max-width:100%;height:auto;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.18)}
.accentword{color:var(--accent);font-style:italic}
/* product mock — a styled stand-in when you don't have a real screenshot */
.mock{width:100%;max-width:560px;border-radius:16px;background:var(--surface);border:1px solid var(--border);box-shadow:0 24px 64px rgba(0,0,0,.16);overflow:hidden}
.mock-bar{display:flex;gap:7px;align-items:center;padding:15px 18px;border-bottom:1px solid var(--border)}
.mock-bar i{width:11px;height:11px;border-radius:50%;background:var(--border)} .mock-bar i:first-child{background:var(--accent)}
.mock-body{padding:clamp(1.6rem,3vw,2.4rem)}
.ln{height:13px;border-radius:7px;background:var(--border);margin-bottom:15px}
.ln.a{background:color-mix(in srgb,var(--accent) 55%,transparent);width:55%} .ln.w90{width:90%} .ln.w70{width:70%} .ln.w40{width:40%}
.mock-btn{display:inline-block;margin-top:6px;background:var(--accent);color:var(--on-accent);font-weight:700;padding:.55em 1.1em;border-radius:11px}
```

### 1. Cover / title
See the detailed **"Cover / title slide"** block in the Brand section — it's already token-driven (`var(--accent)` spark + aura). Brand puts it on a dark slide via `class="slide slide--dark cover"`; other styles drop `slide--dark` and use their own background.

### 2. Agenda
Single-column list of 2-4 items, each a numbered circle + bold label + 1-line description. The current item gets a filled red circle; the rest stay outlined. Better than a "section divider" for almost every deck — it tells the audience what's coming and gives them a mental table of contents.

```html
<section class="slide">
  <span class="eyebrow reveal">Agenda</span>
  <h2 class="reveal">What you'll see today.</h2>
  <div class="agenda-list stagger">
    <div class="agenda-item active">
      <span class="agenda-num">01</span>
      <div class="agenda-text"><h3>First section</h3><p>One sentence about what they'll learn.</p></div>
    </div>
    <div class="agenda-item">
      <span class="agenda-num">02</span>
      <div class="agenda-text"><h3>Second section</h3><p>And the next thing they'll learn.</p></div>
    </div>
    <div class="agenda-item">
      <span class="agenda-num">03</span>
      <div class="agenda-text"><h3>Third section</h3><p>Wrap with the takeaway.</p></div>
    </div>
  </div>
</section>
```
```css
.agenda-list{margin-top:clamp(3.6rem,8vh,6rem);display:flex;flex-direction:column;gap:clamp(2rem,4.5vh,3.4rem);max-width:1080px}
.agenda-item{display:grid;grid-template-columns:auto 1fr;gap:clamp(1.8rem,3vw,2.6rem);align-items:center}
.agenda-num{width:clamp(78px,7vw,108px);height:clamp(78px,7vw,108px);border-radius:50%;border:1.5px solid color-mix(in srgb,var(--text-primary) 35%,transparent);display:grid;place-items:center;font-family:var(--font-body);font-weight:700;font-size:clamp(1.3rem,1.7vw,1.55rem);color:var(--text-primary);letter-spacing:.04em;background:transparent;transition:all .35s ease}
.agenda-item.active .agenda-num{background:var(--accent);border-color:var(--accent);color:var(--on-accent);box-shadow:0 14px 36px rgba(211,8,0,.26)}
.agenda-text h3{font-family:var(--font-body);font-weight:700;font-size:clamp(1.85rem,2.7vw,2.3rem);letter-spacing:-.005em;margin-bottom:.35rem}
.agenda-text p{font-size:clamp(1.18rem,1.55vw,1.4rem);color:var(--text-secondary);line-height:1.45;max-width:48ch}
```
Keep agenda items to **3 ideally, 4 max**. More than that and the slide becomes a list, not a frame. For a real section break in a long deck, drop a second cover-style slide instead — section dividers without an agenda role just chew slot count.

### 3. Two-column (text + visual)
The workhorse content slide. Left = eyebrow + title + lead + a short check list (give the text side substance, not one lonely line). Right = a substantial visual: a real screenshot, an animated illustration, a chart, or the `.mock` stand-in. Text slides in from the left, visual from the right.
```html
<section class="slide">
  <div class="cols">
    <div class="col-text reveal from-left">
      <span class="eyebrow">The workhorse</span>
      <h2>Heading goes here</h2>
      <p class="lead">One supporting line in your voice.</p>
      <ul class="checks"><li><span class="mk">✓</span>Pairs words with proof</li><li><span class="mk">✓</span>Second supporting point</li></ul>
    </div>
    <div class="col-media reveal from-right">
      <!-- real screenshot: <img class="framed" src="..."> — or the styled mock: -->
      <div class="mock"><div class="mock-bar"><i></i><i></i><i></i></div>
        <div class="mock-body"><div class="ln a"></div><div class="ln w90"></div><div class="ln w70"></div><div class="ln w40"></div><span class="mock-btn">Get started</span></div></div>
    </div>
  </div>
</section>
```

### 4. Stat grid (count-up KPIs)
3 big numbers that count up from zero. Each has a styled unit, a bold label, and a muted context line; thin dividers separate them. Keep the unit in its own `.u` span (the count-up only animates the number).
```html
<section class="slide">
  <span class="eyebrow reveal">Adoption</span>
  <h2 class="reveal">The numbers that matter</h2>
  <div class="stats stagger">
    <div class="stat"><div class="statnum"><span data-count="900">0</span><span class="u">M</span></div><div class="statlabel">Monthly users</div><div class="statctx">Second only to ChatGPT</div></div>
    <div class="stat"><div class="statnum"><span data-count="3">0</span><span class="u">×</span></div><div class="statlabel">Faster</div><div class="statctx">Versus the model a year ago</div></div>
    <div class="stat"><div class="statnum"><span data-count="40">0</span><span class="u">%</span></div><div class="statlabel">Lower cost</div><div class="statctx">Per agentic task at scale</div></div>
  </div>
</section>
```
```css
.stats{display:flex;margin-top:clamp(2.2rem,6vh,4rem)}
.stat{flex:1;padding:0 clamp(1.4rem,3vw,2.8rem)} .stat:first-child{padding-left:0} .stat+.stat{border-left:1px solid var(--border)}
.statnum{font-family:var(--font-title);font-weight:600;color:var(--accent);font-size:clamp(4rem,9.5vw,7.2rem);line-height:.82;letter-spacing:-.02em}
.statnum .u{font-size:.5em;font-weight:600;margin-left:.04em}
.statlabel{font-weight:700;font-size:clamp(1.2rem,1.7vw,1.5rem);margin-top:.9rem}
.statctx{font-size:clamp(1rem,1.35vw,1.2rem);color:var(--text-secondary);margin-top:.35rem;max-width:20ch;line-height:1.35}
```

### 5. Feature / bento grid
A bento of cards. The lead card spans two columns and gets a **solid accent icon tile** (`.card.hero`) so the eye lands there first; the rest get accent-dim tiles. Cards use `--surface` + `--border`, cascade in via `.stagger`. **Give every icon one subtle ambient loop** so the grid is alive without being busy — apply `.float` to the hero icon and pick from `.float` / `.bob` / `.pulse` (with staggered `animation-delay` of `.4s` / `.6s` / `.8s`) for the other icons. Loops live on the `.cardic` wrapper or on a specific inner SVG path.
```html
<section class="slide">
  <span class="eyebrow reveal">What's inside</span>
  <h2 class="reveal">Feature grid</h2>
  <div class="grid stagger">
    <div class="card hero span2"><span class="cardic"><svg viewBox="0 0 24 24"><path class="ic-s" d="..."/></svg></span><h3>Hero feature</h3><p>The lead card spans two columns and gets a solid accent icon.</p></div>
    <div class="card"><span class="cardic"><svg viewBox="0 0 24 24"><path class="ic-s" d="..."/></svg></span><h3>Title</h3><p>One clear line.</p></div>
    <!-- 3-4 more cards -->
  </div>
</section>
```
```css
.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:clamp(1rem,1.8vw,1.5rem);margin-top:clamp(1.8rem,4.5vh,2.8rem)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:clamp(1.4rem,2.4vw,2.1rem);display:flex;flex-direction:column;box-shadow:0 12px 30px rgba(0,0,0,.07)}
.card.span2{grid-column:span 2}
.cardic{display:grid;place-items:center;width:clamp(48px,4.2vw,64px);height:clamp(48px,4.2vw,64px);border-radius:14px;background:var(--accent-dim);margin-bottom:1rem}
.card.hero .cardic{background:var(--accent)} .card.hero .cardic .ic-s{stroke:var(--on-accent)}
.cardic svg{width:56%}
.ic-s{fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.card h3{font-size:clamp(1.3rem,2vw,1.7rem);font-weight:700;margin-bottom:.35rem;letter-spacing:-.01em}
.card p{font-size:clamp(1.02rem,1.4vw,1.25rem);color:var(--text-secondary);line-height:1.4}
.card.hero h3{font-size:clamp(1.7rem,2.6vw,2.2rem)} .card.hero p{font-size:clamp(1.1rem,1.5vw,1.4rem);max-width:32ch}
```

### 6. Comparison (side-by-side)
A real comparison **table**: a criteria column on the left, then two columns, with the winning column tinted (`.col-win` uses `--accent-dim`). Far more credible than two loose bullet lists. Built natively so it stays crisp — never screenshot a comparison.
```html
<section class="slide">
  <span class="eyebrow reveal">Us vs. them</span>
  <h2 class="reveal">Comparison</h2>
  <div class="cmp reveal">
    <div class="cmp-row cmp-head"><span></span><span class="col-win">Our agent</span><span>The others</span></div>
    <div class="cmp-row"><span class="crit">Works in your messaging app</span><span class="col-win"><span class="mk yes">✓</span></span><span><span class="mk no">✗</span></span></div>
    <div class="cmp-row"><span class="crit">Any API or MCP</span><span class="col-win"><span class="mk yes">✓</span></span><span><span class="mk no">✗</span></span></div>
    <!-- more rows -->
  </div>
</section>
```
```css
.cmp{margin-top:clamp(1.8rem,4.5vh,3rem);border:1px solid var(--border);border-radius:18px;overflow:hidden}
.cmp-row{display:grid;grid-template-columns:1.7fr 1fr 1fr;align-items:center}
.cmp-row>*{padding:clamp(.95rem,1.9vw,1.45rem) clamp(1.1rem,2vw,1.7rem);font-size:clamp(1.08rem,1.5vw,1.35rem)}
.cmp-row+.cmp-row{border-top:1px solid var(--border)} .cmp-row>*+*{border-left:1px solid var(--border)}
.cmp-head{font-weight:700;background:var(--surface)}
.cmp .crit{color:var(--text-secondary);font-weight:600}
.cmp-row>span:not(.crit){text-align:center}
.col-win{background:var(--accent-dim)}
.mk{font-weight:800} .mk.yes{color:var(--accent)} .mk.no{color:var(--text-secondary)}
```

### 7. Process / steps
The animated step flow — 3 (sometimes 4) refined inline-SVG illustrations in soft-ringed discs, connected by flowing dashed arrows. **Discs use a thin 1.5px pink-tinted ring (not a bold red ring)** — the heavy ring reads as kindergarten clip-art. Each illustration carries exactly ONE ambient loop from the `.trace` / `.lift` / `.gridCell` / `.glow` kit; resist piling on multiple loops per disc.

```html
<section class="slide">
  <span class="eyebrow reveal">How it works</span>
  <h2 class="reveal">From topic to deck in three moves.</h2>
  <div class="flow stagger">
    <div class="step">
      <div class="disc">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <g class="lift">
            <rect x="11" y="9" width="26" height="32" rx="3" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5"/>
            <line x1="16" y1="17" x2="32" y2="17" stroke="var(--ink)" stroke-width="1.3" stroke-linecap="round" opacity=".35"/>
            <path class="trace" d="M16 24 H32" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/>
            <line x1="16" y1="30" x2="32" y2="30" stroke="var(--ink)" stroke-width="1.3" stroke-linecap="round" opacity=".35"/>
          </g>
        </svg>
      </div>
      <h3>Outline</h3><p>Tell it the topic. Get the slide plan.</p>
    </div>
    <div class="conn"><svg viewBox="0 0 84 22"><path class="dash" d="M2 11 H68"/><path class="arrowhead" d="M68 4 L82 11 L68 18 Z"/></svg></div>
    <!-- repeat step + conn for 3-4 steps; last has no trailing conn -->
  </div>
</section>
```
```css
.flow{display:flex;align-items:flex-start;justify-content:center;gap:clamp(.6rem,1.6vw,1.6rem);margin-top:clamp(3rem,7vh,5rem)}
.step{flex:1 1 0;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:24ch}
.disc{width:clamp(132px,13vw,196px);height:clamp(132px,13vw,196px);border-radius:50%;background:var(--surface);border:1.5px solid color-mix(in srgb,var(--accent) 55%,transparent);position:relative;display:grid;place-items:center;box-shadow:0 22px 50px rgba(0,0,0,.10);overflow:hidden}
.disc svg{width:58%;height:58%;overflow:visible;position:relative;z-index:1}
.step h3{font-family:var(--font-body);font-size:clamp(1.55rem,2.5vw,2rem);font-weight:700;margin:clamp(1.6rem,2.6vh,2rem) 0 .45rem;letter-spacing:-.005em}
.step p{font-size:clamp(1.05rem,1.5vw,1.3rem);color:var(--text-secondary);line-height:1.45}
.conn{flex:0 0 auto;align-self:flex-start;margin-top:clamp(62px,6.4vw,98px)}
.conn svg{width:clamp(48px,5.4vw,84px);height:22px;overflow:visible}
.arrowhead{fill:var(--accent)}
.ink-s{fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round} .rd{fill:var(--accent)}

/* refined ambient loops for illustrations */
@keyframes traceSlow{0%{stroke-dashoffset:60}55%,100%{stroke-dashoffset:0}}
.trace{stroke-dasharray:60;stroke-dashoffset:60;animation:traceSlow 3.4s cubic-bezier(.6,.05,.4,1) infinite}
@keyframes liftSoft{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.lift{animation:liftSoft 3.6s ease-in-out infinite;transform-origin:center}
@keyframes gridPulse{0%,100%{fill:var(--accent);opacity:1}50%{opacity:.55}}
.gridCell{animation:gridPulse 2.6s ease-in-out infinite}
```
**Illustration ideas** (use these or invent similar — keep them clean line drawings, paper fill, ink strokes, one red accent that animates):
- **Outline / brief** — a document card with 3 ghosted lines, the middle one being drawn in red via `.trace`.
- **Generate / render** — a 3×3 grid of mini-slide rectangles, one cell filled red with `.gridCell` softpulse.
- **Polish / QA** — a magnifying glass containing a red check that draws in via `.trace`.
- **Ship / publish** — a paper plane on a `.lift` loop, optional dashed trail behind it.

### 8. Timeline / roadmap
Milestones live **directly on a horizontal track** — a filled red dot for each step, with the title + 1-line description stacked **below** the dot. The "Now" step gets a pulsing outer ring; future steps render as outlined circles. The red part of the track fills via animation up to the current step **only after the markers have settled** (1s delay) so the line never appears momentarily without its anchors. **Don't put icons inside the dots** — they read as clip-art and clutter the rhythm. **Skip "Shipped" labels on past steps** (their position before "Now" already says it); only label `.now` with `Now` and `.future` with `Next` when useful — past steps stay clean.

```html
<section class="slide">
  <span class="eyebrow reveal">Where we're headed</span>
  <h2 class="reveal">The roadmap.</h2>
  <div class="tl-wrap reveal">
    <div class="tl-grid stagger">
      <div class="tl-step">
        <span class="tl-marker">Q1</span>
        <h3 class="tl-title">First milestone</h3>
        <p class="tl-desc">One sentence on what landed.</p>
      </div>
      <div class="tl-step now">
        <span class="tl-marker">Q2</span>
        <span class="tl-date">Now</span>
        <h3 class="tl-title">In flight</h3>
        <p class="tl-desc">What you're shipping this quarter.</p>
      </div>
      <div class="tl-step future">
        <span class="tl-marker">Q3</span>
        <span class="tl-date">Next</span>
        <h3 class="tl-title">Coming up</h3>
        <p class="tl-desc">The follow-on bet.</p>
      </div>
    </div>
  </div>
</section>
```
```css
.tl-wrap{position:relative;margin-top:clamp(4rem,10vh,7rem);padding:0 clamp(2%,3vw,4%)}
.tl-wrap::before{content:"";position:absolute;left:clamp(2%,3vw,4%);right:clamp(2%,3vw,4%);top:clamp(34px,3.4vw,44px);height:2px;background:var(--border);transform:translateY(-1px)}
.tl-wrap::before{z-index:0}
.tl-wrap::after{content:"";position:absolute;left:clamp(2%,3vw,4%);width:74%;top:clamp(34px,3.4vw,44px);height:2px;background:var(--accent);transform:translateY(-1px) scaleX(0);transform-origin:left;z-index:0}
.slide.visible .tl-wrap::after{animation:fillTrack 1.1s cubic-bezier(.16,1,.3,1) 1s forwards}
@keyframes fillTrack{from{transform:translateY(-1px) scaleX(0)}to{transform:translateY(-1px) scaleX(1)}}
.tl-grid{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(1rem,2vw,1.6rem)}
.tl-step{display:flex;flex-direction:column;align-items:center;text-align:center;gap:clamp(.4rem,1vh,.6rem)}
.tl-marker{width:clamp(64px,6.4vw,88px);height:clamp(64px,6.4vw,88px);border-radius:50%;display:grid;place-items:center;background:var(--accent);color:var(--on-accent);font-family:var(--font-body);font-weight:800;font-size:clamp(1.05rem,1.4vw,1.3rem);letter-spacing:.04em;border:6px solid var(--bg-primary);box-shadow:0 12px 30px rgba(211,8,0,.26);position:relative;z-index:1}
.tl-step.future .tl-marker{background:var(--bg-primary);color:var(--text-primary);border:6px solid var(--bg-primary);box-shadow:0 0 0 2px var(--border) inset;font-weight:700}
.tl-step.now .tl-marker::after{content:"";position:absolute;inset:-12px;border-radius:50%;border:2px solid var(--accent);animation:nowPulse 2s ease-in-out infinite}
@keyframes nowPulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.18);opacity:0}}
.tl-title{font-family:var(--font-body);font-weight:700;font-size:clamp(1.35rem,2vw,1.75rem);letter-spacing:-.005em;margin-top:clamp(1.4rem,2.6vh,2rem)}
.tl-desc{font-size:clamp(1rem,1.35vw,1.18rem);color:var(--text-secondary);max-width:24ch;line-height:1.45;margin-top:.35rem}
.tl-date{font-size:clamp(.85rem,1.1vw,.98rem);font-weight:700;color:var(--accent);letter-spacing:.14em;text-transform:uppercase;margin-top:.4rem}
```
Adjust `tl-wrap::after { width: N% }` to match how far you've progressed (e.g. `width: 50%` after Q2 of 4). Set `border: 6px solid var(--bg-primary)` so each marker punches a hole in the track that matches the slide background. Stagger the steps; the track fills on its own.

### 9. Chart (Chart.js, monochrome accent tints)
The chart format gives the deck quantitative substance. Rendered with Chart.js (UMD via CDN), themed against the brand: a **single-hue tint ramp** of `--accent`, never a categorical rainbow. Hover tooltips come free.

**Supported:** stacked bar (P0), donut / pie (P1), line, grouped bar. Always one chart per slide — charts read large from a Loom feed.

**Load Chart.js once** in `<head>`:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

**Define 5 chart tints** as CSS vars on `:root` (each style sets its own — see "Chart tint ramps per style" below). Brand:
```css
:root{
  --chart-1:#7A1A0E; --chart-2:#A6160A; --chart-3:#D30800; --chart-4:#EB6F66; --chart-5:#F5B7B0;
}
```
Order datasets darkest → lightest so the eye lands on the largest, most-saturated category.

**Markup:**
```html
<section class="slide chart-slide">
  <span class="eyebrow reveal">Growth by segment</span>
  <h2 class="reveal">Where the gains are coming from</h2>
  <p class="lead reveal">Hover any bar to see the underlying number.</p>
  <div class="chart-wrap reveal"><canvas id="ch-rev"></canvas></div>
</section>
```
```css
.chart-slide .chart-wrap{position:relative;flex:1;min-height:0;margin-top:clamp(1.2rem,3vh,2rem)}
.chart-slide canvas{width:100%!important;height:100%!important;max-height:60vh}
```

**Config — stacked bar (P0):**
```js
Deck.chart('ch-rev', {
  type:'bar',
  data:{
    labels:['2021','2022','2023','2024','2025'],
    datasets:[
      {label:'Enterprise', data:[12,18,24,32,41], backgroundColor:'var(--chart-3)'},
      {label:'Mid-market', data:[ 8,11,14,17,20], backgroundColor:'var(--chart-4)'},
      {label:'SMB',        data:[ 4, 6, 7, 9,11], backgroundColor:'var(--chart-5)'}
    ]
  },
  options:{ scales:{ x:{stacked:true}, y:{stacked:true} } }
});
```

**Config — donut / pie (P1):**
```js
Deck.chart('ch-mix', {
  type:'doughnut',   // or 'pie'
  data:{
    labels:['Enterprise','Mid-market','SMB','Self-serve','Other'],
    datasets:[{ data:[41,20,11,7,4],
      backgroundColor:['var(--chart-1)','var(--chart-2)','var(--chart-3)','var(--chart-4)','var(--chart-5)']}]
  },
  options:{ cutout:'62%' }
});
```

**Config — line:** `type:'line'`, `borderColor:'var(--chart-3)'`, `tension:0.3`, `fill:false`, `pointBackgroundColor:'var(--chart-3)'`.
**Config — grouped bar:** same as stacked, drop `stacked:true`.

`Deck.chart()` is in the Base JS below; it resolves the `var(--chart-N)` strings to live hex, applies brand-themed axes (labels = `--text-secondary`, gridlines = `--border`, font = `--font-body`), and installs the hover tooltip skin (paper text on ink card, red border). Animations disable automatically under `prefers-reduced-motion`.

**Quality rules:**
- Max 5 categories. Roll the tail into "Other" — more than 5 tints stop being distinguishable.
- Always show a unit on the axis (`$M`, `users`, `%`).
- Percentages → donut, not stacked bar.
- Never rainbow. Always one hue.
- Title the takeaway in the eyebrow / h2 — don't make the audience read the chart cold.

**Stack totals (always-visible, not hover-only).** The `ChartKit.stackTotals` plugin draws the sum of each stack in Crimson Pro above the top bar, so the audience reads the headline number without hovering. It's auto-applied to stacked bar charts. Pass options via `plugins.stackTotals`:
```js
options: {
  scales: { y: { stacked: true } },
  plugins: { stackTotals: { unit: '$', suffix: 'M', size: 22 } }
}
```
The plugin lives in the Base JS controller (`Deck._chart.stackTotals`) and skips non-stacked charts automatically. Reserve `~42px` of top padding in `layout.padding.top` so labels never clip — the helper does this for you.

**Chart tint ramps per style** — each style defines `--chart-1` (darkest) → `--chart-5` (lightest) so the format works in any palette:
| Style | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Brand | `#7A1A0E` | `#A6160A` | `#D30800` | `#EB6F66` | `#F5B7B0` |
| Dark | `#7A6310` | `#A6850A` | `#F5C518` | `#F8D460` | `#FBE49B` |
| Light | `#073C7C` | `#0057B8` | `#0071E3` | `#5BA5EF` | `#A8CCF6` |
| Dark Corp. | `#0E5F58` | `#178C82` | `#2DD4BF` | `#6DE2D2` | `#B5EFE6` |

### 10. Code block
For tutorials and technical walkthroughs where the snippet is the visual. Use a dark editor card, syntax color via code-specific tokens (`--code-bg`, `--code-text`, `--code-muted`), and one tiny ambient motion such as a blinking cursor or slow scan. Keep code short enough to read from a video. Do not override slide-level `--text-secondary`; that breaks the Light style's left-side copy.

**Optional: type-in the second line of the headline.** Wrap the last phrase in `.type-line` plus an inline `.type-caret` for a terminal-style reveal — fits the code-slide vibe and draws the eye to the punchline.
```html
<section class="slide slide--dark code-slide">
  <div class="code-grid">
    <div class="col-text reveal from-left">
      <span class="eyebrow">Tutorial mode</span>
      <h2>Tell Claude. <br><span class="type-line">Get a deck.</span><span class="type-caret" aria-hidden="true"></span></h2>
      <p class="lead">Use this when the snippet is the visual.</p>
    </div>
    <div class="code-card reveal from-right"><span class="scan"></span><pre><code>deck.render("output/slides")<span class="cursor"></span></code></pre></div>
  </div>
</section>
```
```css
/* typewriter reveal for a single phrase — fires after the col-text reveals */
.type-line{display:inline-block;clip-path:inset(0 100% 0 0)}
.code-slide.visible .type-line{animation:typeReveal 1s steps(12,end) 1.1s forwards}
@keyframes typeReveal{to{clip-path:inset(0 0 0 0)}}
.type-caret{display:inline-block;width:.06em;height:.85em;background:var(--accent);vertical-align:-.04em;margin-left:.08em;opacity:0;transition:opacity .15s 1.08s}
.code-slide.visible .type-caret{opacity:1;animation:caretBlink 1s steps(1,end) 2.12s infinite}
@keyframes caretBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
/* reduced motion: .type-line,.type-caret{animation:none}; .type-line{clip-path:inset(0 0 0 0)} */
```

### 11. Quote
A big pull-quote anchored by an oversized accent quotation mark. Add a portrait, logo, or branded placeholder on the right when the quote is short; otherwise the slide has too much dead space. Quote focuses in from blur, portrait slides in from the right, and the portrait can carry one ambient glow or sparkle.
```html
<section class="slide slide--dark quote">
  <div class="quote-grid">
    <div class="reveal from-left"><span class="qmark">&ldquo;</span><blockquote><span class="accentword">Velocity</span> over planning. Prototypes over decks.</blockquote><p class="qattr">Josh Woodward · Google</p></div>
    <div class="portrait-card reveal from-right"><!-- portrait, logo, or branded placeholder --></div>
  </div>
</section>
```
```css
.quote{justify-content:center}
.qmark{font-family:var(--font-title);font-size:clamp(5rem,12vw,9rem);line-height:.5;color:var(--accent);display:block;margin-bottom:.4rem;height:.55em}
.quote blockquote{font-family:var(--font-title);font-style:italic;font-size:clamp(2.2rem,4.6vw,4rem);line-height:1.12;max-width:20ch;border:0;margin:0}
.qattr{margin-top:1.6rem;font-weight:700;font-size:clamp(1.1rem,1.6vw,1.4rem);color:var(--text-secondary)}
```

### 12. Closing / CTA
Bookends the cover. Reuses the cover's lasso + aura, adds a single button. The CTA uses `--accent` with `--on-accent` text so it's readable on any palette.
```html
<section class="slide slide--dark cover closing">
  <div class="aura"></div>
  <div class="inner">
    <h1 class="reveal from-blur">Thanks for <span class="circle-word">reading<svg class="circle-mark" viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden="true"><path d="M 364 32 C 286 4, 78 6, 22 34 C -22 60, -4 104, 92 118 C 240 134, 380 118, 392 80 C 402 48, 386 38, 364 32"/></svg></span></h1>
    <p class="sub reveal">Get the full skill at behindthecraft.com</p>
    <a class="cta reveal" href="#">Get the skill →</a>
  </div>
</section>
```
```css
.cta{display:inline-block;margin-top:clamp(1.4rem,3vh,2rem);background:var(--accent);color:var(--on-accent);
     font-weight:700;font-size:clamp(1.1rem,1.6vw,1.4rem);padding:.7em 1.4em;border-radius:999px;text-decoration:none}
.closing.visible .cta{transition-delay:.42s}
```

## Designing for video / screen-share

The large default Type Scale above is sized precisely because decks are often screen-shared in video, where text rides a compressed, downscaled stream. So the defaults already cover this. For video especially: keep slides sparse, drop optional chrome (eyebrows, index numbers) that adds clutter without aiding comprehension, and lean on a few big elements per slide.

## Design Principles

Apply these to every deck, in any style:

- **Dominance over equality.** One color carries 60–70% of the visual weight, 1–2 supporting tones, one sharp accent. Never give all colors equal weight.
- **Content-informed palette.** The palette should feel chosen for *this* topic. If the same colors would work on a totally different deck, they're too generic. (When using the Brand style, this is already decided — paper/ink/red.)
- **Every slide needs a visual element** — image, chart, icon, shape, big stat, or a strong layout. A plain title + bullets is forgettable.
- **Vary the layout.** Don't repeat the same arrangement on consecutive slides. Rotate through: two-column (text + visual), icon+text rows, 2×2 / 2×3 card grid, half-bleed image with overlay, big-stat callout, comparison columns, timeline/process flow.
- **Left-align body text.** Center only titles and short hero lines — never paragraphs or lists.
- **Italic accent text** (Crimson Pro italic in Brand) for taglines and key stats.
- **Icons in small colored circles** next to section headers — white glyph on the accent color for contrast.

**Hard "don'ts" (these read as AI-generated or sloppy):**
- NEVER put a decorative line/bar under a title — use whitespace or background color instead.
- Don't center body text. Don't default to blue. Don't use low-contrast text or icons (light-on-light, dark-on-dark).
- Don't style one slide and leave the rest plain — commit fully or keep it simple throughout.
- Don't mix spacing randomly — pick one gap rhythm and keep it.

## Type Scale & Spacing

**This is the default scale for ALL styles and templates — it is authoritative and overrides any smaller per-style sizes listed in the style sections above.** Slides are viewed from across a room or screen-shared in a video, so text runs large by default. Keep the *hierarchy* (title ≈ 2× body, header ≈ 1.5× body):

| Element | Size (clamp) | Font / weight |
|---|---|---|
| Slide title | `clamp(2.8rem, 6.4vw, 4.6rem)` | `--font-title` 500 |
| Section header / step headline | `clamp(1.6rem, 3vw, 2.3rem)` | `--font-body` 700 |
| Body text | `clamp(1.15rem, 1.8vw, 1.5rem)` | `--font-body` 500–600 |
| Caption / footer | `clamp(0.95rem, 1.3vw, 1.1rem)` | `--font-body` 500, `--text-secondary` |

- **Never go below ~1rem** for readable text. If a slide feels too dense to fit at these sizes, split it — don't shrink the type.
- Pick **one** gap value (e.g. `--content-gap`) for spacing between blocks and use it consistently — don't alternate cramped and roomy.
- Keep generous margins from slide edges (the `--slide-padding` token). Leave breathing room; don't fill every inch.
- When aligning a shape or line to the edge of a text block, zero the text's margin (`margin: 0`) or offset the shape — text boxes have built-in padding that throws alignment off.

## Content Density Limits

Never exceed these per slide:

| Slide type | Maximum content |
|---|---|
| Title | 1 heading + 1 subtitle |
| Content | 1 heading + 5-6 bullets (1-2 lines each) |
| Grid | 1 heading + 6 cards (2x3 or 3x2) |
| Quote | 1 quote (max 3 lines) + attribution |
| Image | 1 heading + 1 image (constrain by height, ~74vh, `object-fit: contain`) |

Too much content? Split into multiple slides. Never scroll.