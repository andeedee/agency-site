(() => {
  'use strict';

  // ── CRE: CTA TEXT REPLACEMENTS ───────────────────────────────────────────
  const ctaTextMap = {
    'Book a Call': 'Get My Free Call',
    'Book a Free Strategy Call': 'Get My Free Strategy Call',
    'Book a Free 30-Min Session': 'Get My Free 30-Min Session',
    'Get Your Free Strategy Call': 'Get My Free Strategy Call',
    'Book a free 30-min session →': 'Get my free 30-min session →',
    'Book a strategy call →': 'Get a free strategy call →',
  };
  const textTargets = [
    '.nav-cta span', '.nav-mobile-cta',
    '.hero-btn-primary span', '.cta-fin-primary span',
    '.about-cta-primary span', '.about-hero-btn-p span',
    '.svc-hero-btn span', '.cs-cta-btn span',
    '.about-cta-btn span', '.footer-brand-link',
  ];
  document.querySelectorAll(textTargets.join(',')).forEach(el => {
    const t = el.textContent.trim();
    if (ctaTextMap[t]) el.textContent = ctaTextMap[t];
  });

  // ── CRE: MICRO-COPY UNDER PRIMARY CTAs ───────────────────────────────────
  const microTargets = [
    {sel:'.hero-btns',            txt:'No pitch. 30 minutes. We\'ll show you exactly what you\'re leaving on the table.'},
    {sel:'.cta-finale-btns',      txt:'No pitch · 30 mins'},
    {sel:'.about-hero-btns',      txt:'No pitch · No pressure · 30 mins'},
    {sel:'.about-cta-btns',       txt:'No pitch · 30 mins'},
  ];
  microTargets.forEach(({sel,txt}) => {
    document.querySelectorAll(sel).forEach(c => {
      if (c.nextElementSibling?.classList.contains('cta-micro')) return;
      const m = document.createElement('p');
      m.className = 'cta-micro';
      m.textContent = txt;
      c.parentNode.insertBefore(m, c.nextSibling);
    });
  });
  // Calculator card CTA
  document.querySelectorAll('.calc-cta-btn').forEach(b => {
    if (b.nextElementSibling?.classList.contains('cta-micro')) return;
    const m = document.createElement('p');
    m.className = 'cta-micro';
    m.style.color = 'rgba(255,255,255,0.75)';
    m.textContent = 'No pitch · 30 mins';
    b.parentNode.insertBefore(m, b.nextSibling);
  });
  // Case studies CTA
  document.querySelectorAll('.cs-cta-btn').forEach(b => {
    if (b.nextElementSibling?.classList.contains('cta-micro')) return;
    const m = document.createElement('p');
    m.className = 'cta-micro';
    m.style.color = 'rgba(61,74,86,0.65)';
    m.textContent = 'No pitch · 30 mins';
    b.parentNode.insertBefore(m, b.nextSibling);
  });

  // ── CRE: PULSE ON PRIMARY CTAs ───────────────────────────────────────────
  document.querySelectorAll('.hero-btn-primary, .cta-fin-primary, .about-cta-primary, .cs-cta-btn').forEach(el => {
    el.classList.add('cta-pulse');
  });

  // ── CRE: STICKY MOBILE BOTTOM CTA ────────────────────────────────────────
  if (!document.body.dataset.page) {
    // Tag pages based on URL so the CSS selector works on every page
    const path = location.pathname.split('/').pop().replace('.html','') || 'index';
    document.body.dataset.page = path;
  }
  if (document.body.dataset.page !== 'calendar') {
    const sticky = document.createElement('div');
    sticky.className = 'sticky-cta';
    sticky.innerHTML = `
      <a href="calendar.html" class="sticky-cta-btn">
        <span>Get my free 30-min strategy call</span>
        <span class="arrow">→</span>
      </a>
      <div class="sticky-cta-sub">No pitch · 30 mins · Free this month</div>
    `;
    document.body.appendChild(sticky);
    // Reveal after first scroll
    const reveal = () => {
      if (window.scrollY > 600) {
        sticky.classList.add('visible');
        window.removeEventListener('scroll', reveal);
      }
    };
    window.addEventListener('scroll', reveal, { passive: true });
  }

  // ── LOGO INJECTION ───────────────────────────────────────────────────────
  const boltSVG = `<svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <path d="M13.5 0L2 17h9.5L8 30 22 13h-9.5L16 0z" fill="#4ADE80"/>
  </svg>`;
  const logoInner = `${boltSVG}<span style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:17px;letter-spacing:-0.01em;color:#fff;line-height:1">AMPLO LABS</span>`;
  document.querySelectorAll('.nav-logo, .footer-brand-logo').forEach(el => {
    el.style.cssText += ';display:flex;align-items:center;gap:9px;';
    el.innerHTML = logoInner;
  });

  // ── CURSOR GLOW (desktop pointer devices only) ──────────────────────────
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let mx = window.innerWidth/2, my = window.innerHeight/2, cx = mx, cy = my;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, {passive:true});
    document.addEventListener('mouseleave', () => { glow.style.opacity='0'; });
    document.addEventListener('mouseenter', () => { glow.style.opacity='1'; });
    (function tick() {
      cx += (mx-cx)*0.075; cy += (my-cy)*0.075;
      glow.style.transform = `translate(${cx}px,${cy}px)`;
      requestAnimationFrame(tick);
    })();
  }

  // ── GRAIN ON DARK SECTIONS ───────────────────────────────────────────────
  const grainSelectors = [
    '.svc-dark','.hero-wrap','.cmp-wrap','.cal-hero','.cs-hero',
    '.demo-hero','.about-hero-wrap','.cta-finale-wrap','.about-cta-wrap',
    '.results-wrap','.story-timeline','.demo-dark-card','.cal-reassure',
  ];
  document.querySelectorAll(grainSelectors.join(',')).forEach(el => {
    el.classList.add('grain-overlay');
  });

  // ── GRADIENT MESH INTO HERO SECTIONS ────────────────────────────────────
  const heroSelectors = [
    '.hero-wrap','.svc-hero','.cs-hero','.cal-hero','.demo-hero','.about-hero-wrap',
  ];
  document.querySelectorAll(heroSelectors.join(',')).forEach(el => {
    const mesh = document.createElement('div');
    mesh.className = 'gradient-mesh';
    mesh.innerHTML = '<div class="mesh-blob"></div><div class="mesh-blob"></div><div class="mesh-blob"></div>';
    el.insertBefore(mesh, el.firstChild);
  });

  // ── GLASSMORPHISM ON FLOAT CARD ──────────────────────────────────────────
  document.querySelectorAll('.hero-float-card').forEach(el => el.classList.add('glass-dark'));

  // ── MAGNETIC BUTTONS (desktop pointer devices only) ─────────────────────
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const magneticSel = [
      '.nav-cta','.hero-btn-primary','.cta-fin-primary','.about-cta-primary',
      '.about-hero-btn-p','.svc-hero-btn','.calc-cta-btn','.cs-cta-btn',
      '.cmp-btn','.svc-btn','.about-cta-btn',
    ].join(',');

    document.querySelectorAll(magneticSel).forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) * 0.22;
        const y = (e.clientY - r.top  - r.height/2) * 0.3;
        btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        btn.style.transform = '';
        setTimeout(() => { btn.style.transition = ''; }, 500);
      });
    });
  }

  // ── SCROLL REVEAL ────────────────────────────────────────────────────────
  const revealGroups = [
    'h1,h2,h3',
    '.eyebrow,.svc-eyebrow,.cs-eyebrow,.demo-eyebrow,.cal-eyebrow,.about-cta-eyebrow,.cmp-eyebrow,.story-eyebrow,.svc-label',
    '.hero-text p,.about-hero-inner p,.cs-hero p,.cal-hero p,.demo-hero p,.svc-text p,.story-text p',
    '.hero-btns,.about-hero-btns,.about-cta-btns,.cta-finale-btns',
    '.stat-pill',
    '.result-item',
    '.svc-card',
    '.cs-card',
    '.svc-step,.cal-step,.demo-benefit,.tl-item',
    '.svc-graphic-card,.calc-left,.calc-right-card,.story-timeline,.demo-info-card,.demo-dark-card,.cal-step-card,.cal-reassure',
    '.hero-visual',
    '.anchor-pills,.cs-filters',
    '.footer-brand,.footer-col',
    '.cmp-table',
  ];

  const revealed = new Set();
  revealGroups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (revealed.has(el)) return;
      if (el.closest('.site-nav,.nav-mobile')) return;
      revealed.add(el);
      el.classList.add('reveal');
      // Stagger siblings of same parent
      const sameParentSiblings = Array.from(el.parentElement.children)
        .filter(c => c.classList.contains('reveal'));
      const idx = sameParentSiblings.indexOf(el);
      if (idx > 0 && idx <= 5) el.classList.add(`reveal-delay-${idx}`);
    });
  });

  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px 160px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // ── NUMBER COUNTERS ──────────────────────────────────────────────────────
  const countSelectors = [
    '.stat-pill-val','.result-val','.cs-stat-val',
    '.svc-graphic-stat span','.hero-float-val span',
  ].join(',');

  document.querySelectorAll(countSelectors).forEach(el => {
    const raw = el.textContent.trim();
    if (raw.includes('/')) return;
    const numeric = raw.replace(/[^0-9.]/g, '');
    if (!numeric || parseFloat(numeric) < 1) return;
    const prefix = raw.match(/^[^0-9]*/)[0];
    const suffix = raw.match(/[^0-9.]*$/)[0];
    el.dataset.target  = numeric;
    el.dataset.prefix  = prefix;
    el.dataset.suffix  = suffix;
    el.dataset.decimal = raw.includes('.') ? '1' : '0';
    el.classList.add('count-up');
  });

  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.counted) return;
      e.target.dataset.counted = '1';
      const target   = parseFloat(e.target.dataset.target);
      const prefix   = e.target.dataset.prefix || '';
      const suffix   = e.target.dataset.suffix || '';
      const decimal  = e.target.dataset.decimal === '1';
      const duration = 1700;
      const t0 = performance.now();
      (function frame(now) {
        const p = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val  = target * ease;
        e.target.textContent = prefix + (decimal ? val.toFixed(1) : Math.floor(val)) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      })(t0);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-up').forEach(el => co.observe(el));

  // ── PARALLAX (desktop only — getBoundingClientRect causes reflow on scroll)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const phone = document.querySelector('.hero-phone');
    const floatCard = document.querySelector('.hero-float-card');
    const storyTl = document.querySelector('.story-timeline');

    function onScroll() {
      const y = window.scrollY;
      if (phone)     phone.style.transform     = `translateY(${y * 0.1}px)`;
      if (floatCard) floatCard.style.transform  = `translateY(${y * 0.18}px)`;
      if (storyTl)   storyTl.style.transform   = `translateY(${-y * 0.04}px)`;

      document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed  = parseFloat(el.dataset.parallax);
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── VARIABLE FONT WEIGHT (desktop only) ─────────────────────────────────
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.svc-graphic-stat,.hero-float-val,.result-val,.cs-stat-val').forEach(el => {
      el.classList.add('weight-hover');
    });
  }

  // ── HORIZONTAL SCROLL (mobile case studies) ──────────────────────────────
  if (window.innerWidth <= 768) {
    const csGrid = document.querySelector('.cs-grid');
    if (csGrid) csGrid.classList.add('h-scroll');
  }

  // ── SVG ICONS FOR HOME SERVICE CARDS ────────────────────────────────────
  const svcSVGs = [
    // Revenue Recovery — coin/money
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v1m0 8v1M9.5 9.5C9.5 8.4 10.6 7.5 12 7.5s2.5.9 2.5 2-.9 1.5-2.5 2-2.5 1-2.5 2 1.1 2 2.5 2 2.5-.9 2.5-2"/></svg>`,
    // First Response — lightning
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M13 2L4 14h8.5L9 22l11-13h-8.5L13 2z" fill="#d97706"/></svg>`,
    // Night Shift — moon
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
    // Reputation Builder — star
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    // Cart & Lead Recovery — refresh/loop
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/></svg>`,
  ];
  document.querySelectorAll('.home-svc-grid .svc-icon').forEach((el, i) => {
    if (svcSVGs[i]) el.innerHTML = svcSVGs[i];
  });

  // ── CASE STUDY CARD IMAGE ENHANCEMENT ────────────────────────────────────
  // Wrap bare emoji text node in a span for glow targeting
  document.querySelectorAll('.cs-card-img').forEach(el => {
    const textNodes = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
    textNodes.forEach(tn => {
      const span = document.createElement('span');
      span.className = 'cs-emoji';
      span.textContent = tn.textContent.trim();
      el.replaceChild(span, tn);
    });
    // Add decorative corner accent lines
    const tl = document.createElement('div');
    tl.style.cssText = 'position:absolute;top:12px;left:12px;width:20px;height:20px;border-top:1.5px solid rgba(255,255,255,0.15);border-left:1.5px solid rgba(255,255,255,0.15);border-radius:2px 0 0 0;z-index:2;pointer-events:none';
    const br = document.createElement('div');
    br.style.cssText = 'position:absolute;bottom:12px;right:12px;width:20px;height:20px;border-bottom:1.5px solid rgba(255,255,255,0.15);border-right:1.5px solid rgba(255,255,255,0.15);border-radius:0 0 2px 0;z-index:2;pointer-events:none';
    el.appendChild(tl);
    el.appendChild(br);
  });

  // ── PAGE TRANSITIONS (View Transitions API) ──────────────────────────────
  if ('startViewTransition' in document) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
      e.preventDefault();
      document.startViewTransition(() => { window.location.href = href; });
    });
  }

  // ── SVG DRAW FOR TIMELINE LINES ───────────────────────────────────────────
  const tlObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('drawn');
        tlObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.draw-path').forEach(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 200;
    el.style.setProperty('--path-len', len);
    tlObserver.observe(el);
  });

})();
