#!/usr/bin/env python3
"""Increase text contrast across all source HTML files."""
import re

SRC = '/home/user/agency-site'
FILES = ['index.html','services.html','about.html','case-studies.html','calendar.html','contact.html']

# ── FOOTER (identical across all 6 files) ─────────────────────────────────────
FOOTER = [
    # footer-brand p (.65 → .82)
    ('color:rgba(255,255,255,.65);margin:0 0 20px;max-width:280px}',
     'color:rgba(255,255,255,.82);margin:0 0 20px;max-width:280px}'),
    # footer-col h4 (.55 → .72)
    ('text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:20px}',
     'text-transform:uppercase;color:rgba(255,255,255,.72);margin-bottom:20px}'),
    # footer-col ul a (.72 → .88)
    ('color:rgba(255,255,255,.72);text-decoration:none;transition:color .2s}',
     'color:rgba(255,255,255,.88);text-decoration:none;transition:color .2s}'),
    # footer-bar p (.45 → .65)
    ('font-size:13px;color:rgba(255,255,255,.45)}',
     'font-size:13px;color:rgba(255,255,255,.65)}'),
    # footer-bar a (.45 → .65)
    ('font-size:13px;color:rgba(255,255,255,.45);text-decoration:none;transition:color .2s}',
     'font-size:13px;color:rgba(255,255,255,.65);text-decoration:none;transition:color .2s}'),
    # footer-bar a:hover (.5 → .75)
    ('color:rgba(255,255,255,.5)}',
     'color:rgba(255,255,255,.75)}'),
]

# ── PER-FILE CHANGES ───────────────────────────────────────────────────────────
PER_FILE = {
    'index.html': [
        # hero-float-label (.65 → .82)
        ('letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:6px}',
         'letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.82);margin-bottom:6px}'),
        # hero-float-sub (.72 → .88)
        ('.hero-float-sub{font-size:12px;color:rgba(255,255,255,.72);margin-top:2px}',
         '.hero-float-sub{font-size:12px;color:rgba(255,255,255,.88);margin-top:2px}'),
        # hero-text p (.6 → .82)
        ('color:rgba(255,255,255,.6);margin:0 0 40px',
         'color:rgba(255,255,255,.82);margin:0 0 40px'),
        # results-inner p (.75 → .88)
        ('font-size:16px;color:rgba(255,255,255,.75);margin:0 0 48px}',
         'font-size:16px;color:rgba(255,255,255,.88);margin:0 0 48px}'),
        # cta-trust-item (.72 → .88)
        ('color:rgba(255,255,255,.72);display:flex;align-items:center;gap:8px}',
         'color:rgba(255,255,255,.88);display:flex;align-items:center;gap:8px}'),
    ],

    'services.html': [
        # svc-hero p (.6 → .82)
        ('.svc-hero p{font-size:17px;line-height:1.7;color:rgba(255,255,255,.6);margin:0 0 36px}',
         '.svc-hero p{font-size:17px;line-height:1.7;color:rgba(255,255,255,.82);margin:0 0 36px}'),
        # svc-dark .svc-text p (.6 → .85)
        ('.svc-dark .svc-text p{color:rgba(255,255,255,.6)}',
         '.svc-dark .svc-text p{color:rgba(255,255,255,.85)}'),
        # svc-dark .step-text (.6 → .85)
        ('.svc-dark .step-text{color:rgba(255,255,255,.6)}',
         '.svc-dark .step-text{color:rgba(255,255,255,.85)}'),
        # svc-graphic-label (.6 → .78)
        ('color:rgba(255,255,255,.6);margin-bottom:20px}',
         'color:rgba(255,255,255,.78);margin-bottom:20px}'),
        # svc-graphic-sub (.7 → .85)
        ('.svc-graphic-sub{font-size:14px;color:rgba(255,255,255,.7);margin-bottom:28px}',
         '.svc-graphic-sub{font-size:14px;color:rgba(255,255,255,.85);margin-bottom:28px}'),
        # svc-graphic-bar-label (.6 → .78)
        ('color:rgba(255,255,255,.6);display:flex;justify-content:space-between}',
         'color:rgba(255,255,255,.78);display:flex;justify-content:space-between}'),
        # cmp-head p (.72 → .88)
        ('.cmp-head p{font-size:16px;color:rgba(255,255,255,.72);line-height:1.7}',
         '.cmp-head p{font-size:16px;color:rgba(255,255,255,.88);line-height:1.7}'),
        # cmp-table tbody td (.7 → .85)
        ('font-size:14px;color:rgba(255,255,255,.7);vertical-align:middle}',
         'font-size:14px;color:rgba(255,255,255,.85);vertical-align:middle}'),
        # cross marks (.35 → .55)
        ('.cross{color:rgba(255,255,255,.35);font-size:18px}',
         '.cross{color:rgba(255,255,255,.55);font-size:18px}'),
        # cmp-swipe-hint (.4 → .68)
        ('color:rgba(255,255,255,.4);margin-bottom:12px',
         'color:rgba(255,255,255,.68);margin-bottom:12px'),
        # Night Shift stat card inline labels (.65 → .82)
        ('margin-top:4px">Avg added MRR</div>',
         'margin-top:6px;color:rgba(255,255,255,.82)">Avg added MRR</div>'),
        ('margin-top:4px">Missed evenings</div>',
         'margin-top:6px;color:rgba(255,255,255,.82)">Missed evenings</div>'),
        # Reputation before/after labels (.75 → .90)
        ('<span style="font-size:13px;color:rgba(255,255,255,.75)">Before</span>',
         '<span style="font-size:13px;color:rgba(255,255,255,.90)">Before</span>'),
        ('<span style="font-size:13px;color:rgba(255,255,255,.75)">3.8</span>',
         '<span style="font-size:13px;color:rgba(255,255,255,.90)">3.8</span>'),
        # Cart Recovery ROI sub (.65 → .82)
        ('margin-top:4px">on average, month one</div>',
         'margin-top:6px;color:rgba(255,255,255,.82)">on average, month one</div>'),
    ],

    'about.html': [
        # tl-desc (.55 → .82)
        ('.tl-desc{font-size:14px;line-height:1.65;color:rgba(255,255,255,.55)}',
         '.tl-desc{font-size:14px;line-height:1.65;color:rgba(255,255,255,.82)}'),
        # timeline-heading (.65 → .80)
        ('color:rgba(255,255,255,.65);margin:0 0 32px}',
         'color:rgba(255,255,255,.80);margin:0 0 32px}'),
    ],

    'calendar.html': [
        # cal-hero p (.65 → .82)
        ('color:rgba(255,255,255,.65);margin:0 0 24px;max-width:520px',
         'color:rgba(255,255,255,.82);margin:0 0 24px;max-width:520px'),
    ],

    'contact.html': [
        # demo-dark-card p (.55 → .82)
        ('.demo-dark-card p{font-size:14px;line-height:1.65;color:rgba(255,255,255,.55);margin:0 0 20px}',
         '.demo-dark-card p{font-size:14px;line-height:1.65;color:rgba(255,255,255,.82);margin:0 0 20px}'),
    ],
}

for fname in FILES:
    path = f'{SRC}/{fname}'
    with open(path, 'r') as f:
        html = f.read()
    original = html

    # Apply footer fixes
    for old, new in FOOTER:
        html = html.replace(old, new)

    # Apply per-file fixes
    for old, new in PER_FILE.get(fname, []):
        if old not in html:
            print(f'  WARN [{fname}] pattern not found: {old[:60]}')
        html = html.replace(old, new)

    if html != original:
        with open(path, 'w') as f:
            f.write(html)
        print(f'  ✓ {fname}')
    else:
        print(f'  — {fname} (no changes)')
