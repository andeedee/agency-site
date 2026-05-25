(() => {
  'use strict';

  // ── LOGO INJECTION ───────────────────────────────────────────────────────
  const boltSVG = `<svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;display:block">
    <path d="M13.5 0L2 17h9.5L8 30 22 13h-9.5L16 0z" fill="#4ADE80"/>
  </svg>`;
  const logoInner = `${boltSVG}<span style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:17px;letter-spacing:-0.01em;color:#fff;line-height:1">AMPLO LABS</span>`;
  document.querySelectorAll('.nav-logo, .footer-brand-logo').forEach(el => {
    el.style.cssText += ';display:flex;align-items:center;gap:9px;';
    el.innerHTML = logoInner;
  });

  // ── CURSOR GLOW ──────────────────────────────────────────────────────────
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

  // ── MAGNETIC BUTTONS ─────────────────────────────────────────────────────
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
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // ── NUMBER COUNTERS ──────────────────────────────────────────────────────
  const countSelectors = [
    '.stat-pill-val','.result-val','.cs-stat-val',
    '.svc-graphic-stat span','.hero-float-val span',
  ].join(',');

  document.querySelectorAll(countSelectors).forEach(el => {
    const raw = el.textContent.trim();
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

  // ── PARALLAX ────────────────────────────────────────────────────────────
  const phone = document.querySelector('.hero-phone');
  const floatCard = document.querySelector('.hero-float-card');
  const storyTl = document.querySelector('.story-timeline');

  function onScroll() {
    const y = window.scrollY;
    if (phone)    phone.style.transform    = `translateY(${y * 0.1}px)`;
    if (floatCard) floatCard.style.transform = `translateY(${y * 0.18}px)`;
    if (storyTl)  storyTl.style.transform  = `translateY(${-y * 0.04}px)`;

    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed  = parseFloat(el.dataset.parallax);
      const rect   = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── VARIABLE FONT WEIGHT ─────────────────────────────────────────────────
  document.querySelectorAll('.svc-graphic-stat,.hero-float-val,.result-val,.cs-stat-val').forEach(el => {
    el.classList.add('weight-hover');
  });

  // ── HORIZONTAL SCROLL (mobile case studies) ──────────────────────────────
  if (window.innerWidth <= 768) {
    const csGrid = document.querySelector('.cs-grid');
    if (csGrid) csGrid.classList.add('h-scroll');
  }

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
