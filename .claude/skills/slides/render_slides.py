#!/usr/bin/python3
"""
Render each slide of a self-contained HTML deck to its own image for Visual QA.

The /slides skill MUST run this before declaring a deck done, then hand the
images to a fresh-eyes subagent to inspect. We learned the hard way that
"looks right in the code" != "looks right rendered" (cropped images, washed-out
downscaling, mid-animation captures all shipped because nobody looked).

How it works: for each slide it injects a tiny CSS override that shows only that
one <section class="slide"> (everything else display:none), disables scroll-snap,
and forces .reveal elements to their final opacity — so we never screenshot a
half-faded slide. Then headless Chrome screenshots the viewport. Works on any
deck this skill produces without needing template cooperation.

Usage:
  render_slides.py --html output/slides/deck.html [--out-dir output/slides/qa]
                   [--width 1600] [--height 900] [--scale 2] [--count N]

Prints one image path per line. Exit codes: 0 ok, 1 error, 4 no Chrome found.
"""
import argparse
import os
import re
import subprocess
import sys
import tempfile

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
]


def find_chrome():
    for c in CHROME_CANDIDATES:
        if os.path.exists(c):
            return c
    for name in ("google-chrome", "chromium", "chromium-browser"):
        from shutil import which
        if which(name):
            return which(name)
    return None


def count_slides(html):
    return len(re.findall(r'<section[^>]*class="[^"]*\bslide\b[^"]*"', html))


ISOLATE_TMPL = """
<style id="qa-isolate">
  html {{ scroll-snap-type: none !important; }}
  section.slide {{ display: none !important; }}
  section.slide:nth-of-type({n}) {{ display: flex !important; }}
  .progress-bar, .nav-dots {{ display: none !important; }}
  .reveal {{ opacity: 1 !important; transform: none !important; transition: none !important; }}
  .stagger > * {{ opacity: 1 !important; transform: none !important; transition: none !important; }}
  .type-line {{ clip-path: inset(0 0 0 0) !important; animation: none !important; }}
  .circle-mark path {{ stroke-dashoffset: 0 !important; transition: none !important; }}
  .circle-word::before {{ opacity: .7 !important; transform: scale(1) !important; transition: none !important; }}
  .tl-wrap::after {{ animation: none !important; transform: translateY(-1px) scaleX(1) !important; }}
</style>
<script id="qa-force-visible">
document.addEventListener('DOMContentLoaded', function() {{
  // Force the target slide into "visible" state (IntersectionObserver may not
  // fire reliably in headless mode) and run count-up animations to completion.
  var target = document.querySelectorAll('section.slide')[{n} - 1];
  if (target) target.classList.add('visible');
  document.querySelectorAll('[data-count]').forEach(function(el) {{
    var end = parseFloat(el.dataset.count);
    var sf = el.dataset.suffix || '';
    if (!isNaN(end)) {{
      el.textContent = end.toLocaleString() + sf;
      el.dataset.done = '1'; // block cu() from re-animating from 0
    }}
  }});
}});
</script>
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--html", required=True)
    ap.add_argument("--out-dir", default=None)
    ap.add_argument("--width", type=int, default=1600)
    ap.add_argument("--height", type=int, default=900)
    ap.add_argument("--scale", type=int, default=2, help="Device scale factor (2 = Retina)")
    ap.add_argument("--count", type=int, default=0, help="Override slide count")
    args = ap.parse_args()

    if not os.path.exists(args.html):
        print(f"HTML not found: {args.html}", file=sys.stderr)
        sys.exit(1)
    chrome = find_chrome()
    if not chrome:
        print("No Chromium-based browser found for rendering.", file=sys.stderr)
        sys.exit(4)

    html = open(args.html, "r", encoding="utf-8").read()
    n = args.count or count_slides(html) or 1
    deck_dir = os.path.dirname(os.path.abspath(args.html))
    out_dir = args.out_dir or os.path.join(deck_dir, "qa")
    os.makedirs(out_dir, exist_ok=True)

    # Inject the isolation style right before </head> (fallback: prepend to <body>).
    if "</head>" in html:
        split_at = html.index("</head>")
    elif "<body" in html:
        split_at = html.index("<body")
    else:
        split_at = 0
    head, tail = html[:split_at], html[split_at:]

    paths = []
    for i in range(1, n + 1):
        doc = head + ISOLATE_TMPL.format(n=i) + tail
        # Temp file in the deck dir so any relative asset refs still resolve.
        fd, tmp = tempfile.mkstemp(suffix=f".qa{i}.html", dir=deck_dir)
        os.close(fd)
        open(tmp, "w", encoding="utf-8").write(doc)
        out = os.path.join(out_dir, f"slide-{i:02d}.png")
        try:
            subprocess.run([
                chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                "--force-color-profile=srgb", f"--force-device-scale-factor={args.scale}",
                f"--window-size={args.width},{args.height}",
                "--virtual-time-budget=2000",
                f"--screenshot={out}", f"file://{tmp}",
            ], capture_output=True, text=True, timeout=60)
        finally:
            os.remove(tmp)
        if os.path.exists(out):
            paths.append(out)
        else:
            print(f"WARNING: slide {i} did not render", file=sys.stderr)

    for p in paths:
        print(p)


if __name__ == "__main__":
    main()