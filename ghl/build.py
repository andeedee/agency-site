#!/usr/bin/env python3
"""Build GHL lean HTML blocks — inlines critical CSS/JS, strips decorative features."""
import os, re, shutil

SRC = '/home/user/agency-site'
OUT = '/home/user/agency-site/ghl'

FILES = ['index.html','services.html','about.html','case-studies.html','calendar.html','contact.html']

CRITICAL_CSS = """\n/* ── GHL INLINE: shared critical CSS ── */
html{scroll-behavior:smooth}
.cta-micro{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:500;margin-top:14px;letter-spacing:.01em;color:rgba(255,255,255,.45);text-align:center}
.svc-light .cta-micro,.svc-lav .cta-micro,.cs-cta .cta-micro,.calc-wrap .cta-micro,.home-svc-wrap .cta-micro,.stats-wrap .cta-micro,.story-wrap .cta-micro{color:rgba(61,74,86,.65)!important}
@keyframes ctaIdle{0%,65%{box-shadow:0 0 0 0 rgba(217,119,6,.45)}100%{box-shadow:0 0 0 18px rgba(217,119,6,0)}}
.cta-pulse{animation:ctaIdle 2.6s ease-out infinite;animation-delay:3s}
.sticky-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:90;padding:12px 14px calc(12px + env(safe-area-inset-bottom));background:rgba(12,26,46,.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,.08);transform:translateY(110%);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.sticky-cta.visible{transform:translateY(0)}
.sticky-cta-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px 20px;border-radius:10px;background:linear-gradient(135deg,#d97706,#15803d);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:-.01em;box-shadow:0 8px 32px rgba(217,119,6,.4)}
.sticky-cta-btn .arrow{display:inline-block;transition:transform .2s}
.sticky-cta-btn:active .arrow{transform:translateX(4px)}
.sticky-cta-sub{text-align:center;font-size:11px;color:rgba(255,255,255,.5);margin-top:6px;font-weight:500;letter-spacing:.02em}
@media(max-width:768px){body[data-page]:not([data-page="calendar"]) .sticky-cta{display:block}body[data-page]:not([data-page="calendar"]) .footer-wrap{padding-bottom:96px}}
@media(max-width:768px){.stats-inner{flex-wrap:nowrap!important;overflow-x:auto!important;justify-content:flex-start!important;padding:4px 0 12px!important;gap:8px!important;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity}.stats-inner::-webkit-scrollbar{display:none}.stat-pill{flex-shrink:0;scroll-snap-align:start}}
@media(max-width:768px){.svc-inner.flip{direction:ltr!important}.svc-inner.flip>*{direction:ltr!important}}
.cs-card-img{font-size:42px!important;background:linear-gradient(145deg,#0a1628,#0c1a2e)!important;position:relative}
.cs-card:nth-child(1) .cs-card-img::before,.cs-card:nth-child(4) .cs-card-img::before{background:rgba(217,119,6,.35)!important}
.cs-card:nth-child(2) .cs-card-img::before,.cs-card:nth-child(5) .cs-card-img::before{background:rgba(14,165,233,.2)!important}
.cs-card:nth-child(3) .cs-card-img::before,.cs-card:nth-child(6) .cs-card-img::before{background:rgba(21,128,61,.25)!important}
.cs-card-img .cs-emoji{position:relative;z-index:2;filter:drop-shadow(0 0 18px rgba(251,191,36,.6))}
.cs-card-img::before{content:'';position:absolute;width:90px;height:90px;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;border:1px solid rgba(255,255,255,.08)}
@media(max-width:768px){.cs-filters{flex-wrap:nowrap!important;overflow-x:auto!important;justify-content:flex-start!important;padding:16px 20px!important;gap:6px!important;-webkit-overflow-scrolling:touch}.cs-filters::-webkit-scrollbar{display:none}.cs-filter-btn{flex-shrink:0}}
@media(max-width:768px){.about-hero-wrap{padding-top:100px!important}.svc-hero{padding-top:100px!important}.cs-hero{padding-top:100px!important}.cal-hero{padding-top:100px!important}.demo-hero{padding-top:100px!important}}
.hero-text h1{text-wrap:balance}
@media(max-width:768px){.cmp-table{font-size:12px}.cmp-table thead tr th,.cmp-table tbody td{padding:12px 10px}.cmp-table thead tr th:nth-child(2),.cmp-table tbody td:nth-child(2){display:none}}
@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:32px 24px!important}.footer-brand{grid-column:1/-1}}
.calc-left h2{text-wrap:balance}
.svc-icon{width:48px!important;height:48px!important;border-radius:12px!important}
.svc-card,.cs-card,.demo-info-card,.cal-step-card{transition:box-shadow .25s ease,transform .25s ease!important}
@media(max-width:768px){.hero-wrap{padding:100px 20px 60px!important}.hero-text h1{font-size:clamp(32px,8vw,44px)!important}.hero-text p{font-size:15px!important;margin-bottom:36px!important}.hero-btns{flex-direction:column!important;gap:10px!important}.hero-btn-primary,.hero-btn-secondary{width:100%!important;text-align:center!important;box-sizing:border-box!important}.hero-btn-primary::before{opacity:1!important}.hero-btn-secondary{border-color:rgba(255,255,255,.28)!important}}
@media(max-width:768px){.svc-light,.svc-lav,.svc-dark{padding:64px 20px!important}.svc-inner{gap:36px!important}}
@media(min-width:600px) and (max-width:900px){.cs-grid{grid-template-columns:repeat(2,1fr)!important}}
.stats-wrap{padding:32px 24px!important}.stat-pill{padding:10px 20px!important;gap:10px!important}
@media(max-width:768px){.h-scroll{display:flex!important;overflow-x:auto!important;scroll-snap-type:x mandatory;gap:14px!important;padding-bottom:20px!important;grid-template-columns:unset!important;-webkit-overflow-scrolling:touch}.h-scroll>*{flex:0 0 83vw!important;scroll-snap-align:start}.h-scroll::-webkit-scrollbar{display:none}}"""

LEAN_JS = """\n<script>
(()=>{'use strict';
const cm={'Book a Call':'Get My Free Call','Book a Free Strategy Call':'Get My Free Strategy Call','Book a Free 30-Min Session':'Get My Free 30-Min Session','Get Your Free Strategy Call':'Get My Free Strategy Call','Book a free 30-min session →':'Get my free 30-min session →','Book a strategy call →':'Get a free strategy call →'};
document.querySelectorAll('.nav-cta span,.nav-mobile-cta,.hero-btn-primary span,.cta-fin-primary span,.about-cta-primary span,.about-hero-btn-p span,.svc-hero-btn span,.cs-cta-btn span,.about-cta-btn span,.footer-brand-link').forEach(el=>{const t=el.textContent.trim();if(cm[t])el.textContent=cm[t];});
[{sel:'.hero-btns',txt:'No pitch \xb7 No pressure \xb7 30 mins'},{sel:'.cta-finale-btns',txt:'⭐ 4.9 from 247 calls \xb7 30 mins'},{sel:'.about-hero-btns',txt:'No pitch \xb7 No pressure \xb7 30 mins'},{sel:'.about-cta-btns',txt:'⭐ 4.9 from 247 calls'}].forEach(({sel,txt})=>{document.querySelectorAll(sel).forEach(c=>{if(c.nextElementSibling?.classList.contains('cta-micro'))return;const m=document.createElement('p');m.className='cta-micro';m.textContent=txt;c.parentNode.insertBefore(m,c.nextSibling);});});
document.querySelectorAll('.calc-cta-btn').forEach(b=>{if(b.nextElementSibling?.classList.contains('cta-micro'))return;const m=document.createElement('p');m.className='cta-micro';m.style.color='rgba(255,255,255,.75)';m.textContent='No pitch \xb7 30 mins';b.parentNode.insertBefore(m,b.nextSibling);});
document.querySelectorAll('.cs-cta-btn').forEach(b=>{if(b.nextElementSibling?.classList.contains('cta-micro'))return;const m=document.createElement('p');m.className='cta-micro';m.style.color='rgba(61,74,86,.65)';m.textContent='No pitch \xb7 30 mins';b.parentNode.insertBefore(m,b.nextSibling);});
document.querySelectorAll('.hero-btn-primary,.cta-fin-primary,.about-cta-primary,.cs-cta-btn').forEach(el=>el.classList.add('cta-pulse'));
if(!document.body.dataset.page){const p=location.pathname.split('/').pop().replace('.html','')||'index';document.body.dataset.page=p;}
if(document.body.dataset.page!=='calendar'){const s=document.createElement('div');s.className='sticky-cta';s.innerHTML=`<a href="calendar.html" class="sticky-cta-btn"><span>Get my free 30-min strategy call</span><span class="arrow">→</span></a><div class="sticky-cta-sub">⭐ 4.9 \xb7 No pitch \xb7 30 mins</div>`;document.body.appendChild(s);const r=()=>{if(window.scrollY>600){s.classList.add('visible');window.removeEventListener('scroll',r);}};window.addEventListener('scroll',r,{passive:true});}
const bolt=`<svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block"><path d="M13.5 0L2 17h9.5L8 30 22 13h-9.5L16 0z" fill="#4ADE80"/></svg>`;
const li=`${bolt}<span style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:17px;letter-spacing:-.01em;color:#fff;line-height:1">AMPLO LABS</span>`;
document.querySelectorAll('.nav-logo,.footer-brand-logo').forEach(el=>{el.style.cssText+=';display:flex;align-items:center;gap:9px;';el.innerHTML=li;});
if(window.innerWidth<=768){const g=document.querySelector('.cs-grid');if(g)g.classList.add('h-scroll');}
const sv=[`<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M13 2L4 14h8.5L9 22l11-13h-8.5L13 2z" fill="#d97706"/></svg>`,`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"/></svg>`,`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6L18 2z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`];
document.querySelectorAll('.home-svc-grid .svc-icon').forEach((el,i)=>{if(sv[i])el.innerHTML=sv[i];});
})();
</script>"""

processed = []
for fname in FILES:
    src_path = os.path.join(SRC, fname)
    out_path = os.path.join(OUT, fname)
    with open(src_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Remove external shared.css link
    html = re.sub(r'\n?<link rel="stylesheet" href="shared\.css">\n?', '\n', html)

    # Inject noindex meta into <head> (guard prevents duplicate if source already has it)
    if 'noindex' not in html:
        html = html.replace('<head>', '<head>\n<meta name="robots" content="noindex, nofollow">', 1)

    # Inject critical CSS before closing </style>
    html = html.replace('</style>', CRITICAL_CSS + '\n</style>', 1)

    # Remove shared.js script tag
    html = re.sub(r'\n?<script src="shared\.js"></script>\n?', '\n', html)

    # Inject lean JS before </body>
    html = html.replace('</body>', LEAN_JS + '\n</body>', 1)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)

    size = os.path.getsize(out_path)
    processed.append(f'{fname}: {size:,} bytes')
    print(f'  ✓ {fname} → {size:,} bytes')

print('\nDone. Files written to ghl/')
