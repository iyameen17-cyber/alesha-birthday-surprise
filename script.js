/* Alesha's 33rd Birthday — script.js (vanilla JS, no dependencies) */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => motionQuery.matches;
  const rand = (a, b) => a + Math.random() * (b - a);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- The 33 surprises ---------- */
  const CARDS = [
    ['🎂', 'Happy birthday', 'Happy birthday, Alesha. Thirty-three is a lovely number, and it looks wonderful on you.'],
    ['🧠', 'A curious mind', 'You have the kind of mind that notices details, asks questions, and keeps learning. That is a rare and beautiful thing.'],
    ['📚', 'Books', 'May this year bring you a book you cannot put down — and the perfect quiet hour to read it in.'],
    ['🎬', 'Movies', 'Wishing you a perfect movie night: a cosy blanket, excellent snacks, and an ending that leaves you smiling.'],
    ['🏅', 'Gold medal', 'A gold medal in English literature does not happen by accident. It takes effort and real love for the subject. Be proud of her — you.'],
    ['⏰', 'Long conversations', 'Some conversations forget the clock. Here is to more of those — and to hours that still feel too short.'],
    ['🐼', 'Panda wisdom', 'A tiny panda wants you to know: you deserve all the bamboo, naps, and cuddles in the world.'],
    ['🧸', 'Teddy bear', 'A teddy bear is standing by with a very serious announcement: today you are allowed to rest, eat cake, and do absolutely nothing.'],
    ['⭐', 'Stars', 'There are a great many stars in the sky, and one of them has been assigned to wish you a happy birthday. It is working overtime.'],
    ['🕊️', 'Peace', 'May this year bring you peace — the quiet kind that settles into your shoulders and stays a while.'],
    ['🌱', 'Growth', 'May you keep growing in the directions that make you feel most like yourself.'],
    ['🏆', 'Success', 'Here is to meaningful work, well-earned success, and moments when you step back and think, “I did that.”'],
    ['📖', 'Open chapters', 'Every person is a story with many chapters still unwritten. Yours is a good one — and you are the author.'],
    ['💪', 'Dedication', 'Dedication like yours is admirable, and it shows in what you have achieved. Today, let it be celebrated.'],
    ['🕯️', 'Candles', 'Fun fact: 33 candles is a lot of candles. Please keep them away from the library.'],
    ['☕', 'Small joys', 'May your days be full of small joys: a warm drink, a favourite song, a message that makes you smile.'],
    ['🌈', 'Individuality', 'There is only one you — your tastes, your ideas, your way of seeing things. Keep it exactly that way.'],
    ['🔭', 'Curiosity', 'Stay curious. The world still holds a thousand books, films, and questions waiting for you.'],
    ['🗺️', 'The future', 'The future is an open book, and you get to decide what goes on the next page.'],
    ['🤍', 'Kindness', 'I hope people are as kind to you this year as you deserve — which is very kind indeed.'],
    ['📜', 'Permission slip', 'Official birthday permission slip: you may take today slowly. Signed, the Panda Council.'],
    ['✍️', 'Words', 'Someone with a literature degree deserves the very best words. So here are a few: brilliant, determined, radiant, wonderful.'],
    ['🎞️', 'Great script', 'May your year have a great script, a wonderful cast, and a happy ending — with only pleasant plot twists.'],
    ['💬', 'Time flies', 'Hours can pass in a conversation and still feel too short. Thank you for the way you share your time and your thoughts.'],
    ['🌟', 'Be proud', 'Take a moment today to be proud of how far you have come. Not tomorrow — today.'],
    ['🎋', 'Bamboo', 'Pandas spend most of the day eating bamboo and being adorable. Today you may do the same, minus the bamboo.'],
    ['🦋', 'Courage', 'May you have the courage to chase what you want, and the gentleness to forgive yourself on the harder days.'],
    ['😲', 'Wonder', 'May something this year make you gasp with delight — a view, a line in a book, a scene in a film.'],
    ['🌠', 'Wishes', 'If birthday wishes are real, I hope every one of yours arrives at the right time and in the right order.'],
    ['🎓', 'Learning', 'A mind that loves learning is one of the loveliest things a person can have. Keep yours well fed.'],
    ['🎁', 'A hidden gift', 'A small gift tucked inside this card: the reminder that you are appreciated more than a single day can say.'],
    ['🪑', 'A cosy corner', 'I hope you always have a place — a chair, a corner, a shelf — where you feel completely at ease.'],
    ['🎉', 'Chapter 33', 'Thirty-three cards, thirty-three years, and one wish: may this be a chapter full of wonderful surprises.']
  ];

  /* ---------- Dialog helpers ---------- */
  let lastTrigger = null;
  function openDialog(dlg, trigger) {
    lastTrigger = trigger || document.activeElement;
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute('open', '');
  }
  function closeDialog(dlg) {
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
    restoreFocus();
  }
  function restoreFocus() {
    if (lastTrigger && document.contains(lastTrigger) && typeof lastTrigger.focus === 'function') lastTrigger.focus({ preventScroll: true });
  }
  $$('dialog').forEach(dlg => {
    dlg.addEventListener('click', e => { if (e.target === dlg) closeDialog(dlg); });
    dlg.addEventListener('close', () => { if (fx.parentNode === dlg) document.body.appendChild(fx); restoreFocus(); });
    $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => closeDialog(dlg)));
  });

  /* ---------- Floating effects (hearts / confetti) ---------- */
  const fx = $('#fx');
  function emit(chars, count, mode) {
    /* an open <dialog> sits in the top layer, so the effects must live inside it to stay visible */
    const host = document.querySelector('dialog[open]') || document.body;
    if (fx.parentNode !== host) host.appendChild(fx);
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      if (reduced()) {
        s.className = 'calm';
        s.style.setProperty('--x', rand(5, 90) + '%');
        s.style.setProperty('--y', rand(15, 80) + '%');
        s.style.setProperty('--s', rand(1.4, 2.4) + 'rem');
        setTimeout(() => s.remove(), 1900);
        if (i > 9) continue;
      } else {
        if (mode === 'fall') s.className = 'fall';
        s.style.setProperty('--x', rand(2, 96) + '%');
        s.style.setProperty('--s', rand(1.2, 2.4) + 'rem');
        s.style.setProperty('--d', rand(3.2, 6) + 's');
        s.style.setProperty('--dx', rand(-60, 60) + 'px');
        s.style.setProperty('--r', rand(-40, 40) + 'deg');
        s.addEventListener('animationend', () => s.remove());
        setTimeout(() => s.remove(), 7000);
      }
      fx.appendChild(s);
    }
  }
  const hearts = () => emit(['💗', '💖', '💜', '🤍', '💕'], 26, 'rise');
  const confetti = () => emit(['✨', '💗', '⭐', '🎈', '🌸', '🎉'], 44, 'fall');

  /* ---------- Opening gate ---------- */
  const gate = $('#gate'), story = $('#story'), openBtn = $('#open-btn');
  function openStory() {
    openBtn.disabled = true;
    gate.classList.add('opening');
    const delay = reduced() ? 0 : 1300;
    setTimeout(() => {
      story.hidden = false;
      document.body.classList.remove('locked');
      gate.classList.add('leaving');
      window.scrollTo(0, 0);
      setTimeout(() => { gate.hidden = true; }, reduced() ? 0 : 800);
      const title = $('#main-title');
      if (title) title.focus({ preventScroll: true });
      setupReveal();
      updateScroll();
      if (!reduced()) emit(['✨', '💗'], 14, 'rise');
    }, delay);
  }
  openBtn.addEventListener('click', openStory);

  function replay() {
    closeNav();
    story.hidden = true;
    gate.hidden = false;
    gate.classList.remove('opening', 'leaving');
    openBtn.disabled = false;
    document.body.classList.add('locked');
    $$('.reveal').forEach(el => el.classList.remove('in'));
    $('#book').classList.remove('turned');
    window.scrollTo(0, 0);
    openBtn.focus({ preventScroll: true });
  }
  $('#replay-btn').addEventListener('click', replay);

  /* ---------- Scroll reveal, progress, nav, back-to-top ---------- */
  let revealObserver = null;
  function setupReveal() {
    const els = $$('.reveal');
    if (reduced() || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    els.forEach(e => revealObserver.observe(e));
  }

  const bar = $('#progress-bar'), toTop = $('#to-top');
  function updateScroll() {
    if (story.hidden) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    toTop.hidden = y < 700;
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateScroll(); ticking = false; });
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }));

  const navToggle = $('#nav-toggle'), navPanel = $('#nav-panel');
  function closeNav() { navPanel.hidden = true; navToggle.setAttribute('aria-expanded', 'false'); }
  navToggle.addEventListener('click', () => {
    const open = navPanel.hidden;
    navPanel.hidden = !open;
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navPanel.addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !navPanel.hidden) { closeNav(); navToggle.focus(); } });
  document.addEventListener('click', e => { if (!navPanel.hidden && !e.target.closest('#nav-panel, #nav-toggle')) closeNav(); });

  if ('IntersectionObserver' in window) {
    const links = new Map($$('#nav-panel a').map(a => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const a = links.get(en.target.id);
        if (!a) return;
        if (en.isIntersecting) { links.forEach(l => l.removeAttribute('aria-current')); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Chapter 3: book ---------- */
  const book = $('#book'), bookBtn = $('#book-btn');
  bookBtn.addEventListener('click', () => {
    const on = book.classList.toggle('turned');
    bookBtn.setAttribute('aria-pressed', String(on));
    bookBtn.textContent = on ? 'Turn it back 📖' : 'Turn the page 📖';
  });

  /* ---------- Chapter 4: clock ---------- */
  const ticks = $('#ticks');
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180, long = i % 3 === 0;
    const r1 = long ? 96 : 102, r2 = 112;
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', 150 + r1 * Math.sin(a)); l.setAttribute('y1', 150 - r1 * Math.cos(a));
    l.setAttribute('x2', 150 + r2 * Math.sin(a)); l.setAttribute('y2', 150 - r2 * Math.cos(a));
    ticks.appendChild(l);
  }
  const hours = $('#hours'), hoursVal = $('#hours-val'), hoursOut = $('#hours-out');
  const hourLines = [
    [0, 'A conversation begins like any other…'],
    [1, 'An hour in, and nobody is checking the clock.'],
    [4, 'Topics have changed several times, and there is still something left to say.'],
    [7, 'Somewhere outside, the light has probably changed.'],
    [10, 'Ten hours or more — sometimes that is a whole day of talking.'],
    [13, 'Somehow, still not the end of the conversation. ✨']
  ];
  function updateClock() {
    const h = Number(hours.value);
    $('#hand-h').style.transform = `rotate(${(h % 12) * 30}deg)`;
    $('#hand-m').style.transform = `rotate(${h * 360}deg)`;
    hoursVal.textContent = h + (h === 1 ? ' hour' : ' hours');
    hours.setAttribute('aria-valuetext', hoursVal.textContent);
    hoursOut.textContent = hourLines.filter(l => h >= l[0]).pop()[1];
    $$('#clock-bubbles li').forEach(li => li.classList.toggle('on', h >= Number(li.dataset.at)));
  }
  hours.addEventListener('input', updateClock);
  updateClock();

  /* ---------- Chapter 5: bookshelf + medal ---------- */
  (function buildShelf() {
    const svg = $('#shelf'), NS = 'http://www.w3.org/2000/svg';
    const colors = ['#ff9fbe', '#bfe3ff', '#ffd9a0', '#cdb8ff', '#ffb79b', '#b9e8c8', '#f7d6ff', '#fff0a8'];
    let seed = 7;
    const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    [[60, 82], [150, 82], [240, 82]].forEach(([y, h], row) => {
      let x = 14;
      while (x < 330 + (row === 0 ? 70 : 0) && x < 404) {
        const w = 14 + Math.floor(r() * 14), bh = h - 10 - Math.floor(r() * 26);
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', x); rect.setAttribute('y', y + (h - bh) - 22); rect.setAttribute('width', w); rect.setAttribute('height', bh);
        rect.setAttribute('rx', 2); rect.setAttribute('fill', colors[Math.floor(r() * colors.length)]);
        svg.appendChild(rect);
        const band = document.createElementNS(NS, 'rect');
        band.setAttribute('x', x + 2); band.setAttribute('y', y + (h - bh) - 22 + 8); band.setAttribute('width', w - 4); band.setAttribute('height', 3);
        band.setAttribute('fill', 'rgba(255,255,255,.7)');
        svg.appendChild(band);
        x += w + 2;
      }
      const shelf = document.createElementNS(NS, 'rect');
      shelf.setAttribute('x', 4); shelf.setAttribute('y', y + h - 22); shelf.setAttribute('width', 412); shelf.setAttribute('height', 9); shelf.setAttribute('rx', 3);
      shelf.setAttribute('fill', '#8a6aa8');
      svg.appendChild(shelf);
    });
  })();
  $('#medal').addEventListener('click', e => {
    const m = e.currentTarget;
    m.classList.add('glow');
    setTimeout(() => m.classList.remove('glow'), 1200);
    $('#medal-note').textContent = 'Gold medalist, English literature — and you earned every bit of it. 🏅';
  });

  /* ---------- Chapter 6: photo fallback ---------- */
  const img = $('.photo img');
  function photoFailed() { img.hidden = true; $('.photo-fallback').hidden = false; }
  img.addEventListener('error', photoFailed);
  if (img.complete && img.naturalWidth === 0) photoFailed();

  /* ---------- 33 cards ---------- */
  const grid = $('#card-grid'), STORE_KEY = 'alesha33-opened';
  let opened = new Set();
  try { JSON.parse(store.get(STORE_KEY) || '[]').forEach(n => { if (n >= 1 && n <= 33) opened.add(n); }); } catch (e) { opened = new Set(); }

  CARDS.forEach((_, i) => {
    const n = i + 1, b = document.createElement('button');
    b.type = 'button'; b.className = 'gift'; b.dataset.n = n;
    b.innerHTML = `<span>${n}</span>`;
    b.addEventListener('click', () => showCard(n, b));
    grid.appendChild(b);
  });

  function refreshCards() {
    $$('.gift', grid).forEach(b => {
      const n = Number(b.dataset.n), done = opened.has(n);
      b.classList.toggle('opened', done);
      b.setAttribute('aria-label', `Surprise ${n}, ${done ? 'already opened' : 'not opened yet'}`);
    });
    $('#count-n').textContent = opened.size;
    $('#meter-fill').style.width = (opened.size / 33) * 100 + '%';
    $('#all-done').hidden = opened.size < 33;
    store.set(STORE_KEY, JSON.stringify([...opened]));
  }

  const cardDlg = $('#card-dialog');
  function showCard(n, trigger) {
    const [emoji, tag, msg] = CARDS[n - 1];
    $('#card-num').textContent = `Surprise ${n} of 33`;
    $('#card-emoji').textContent = emoji;
    $('#card-title').textContent = `${n} · ${tag}`;
    $('#card-msg').textContent = msg;
    const wasNew = !opened.has(n);
    opened.add(n);
    refreshCards();
    $('#card-another').hidden = opened.size >= 33;
    openDialog(cardDlg, trigger || $(`.gift[data-n="${n}"]`, grid));
    if (wasNew && opened.size === 33 && !reduced()) emit(['🎉', '✨', '💗'], 24, 'fall');
  }
  function randomUnopened() {
    const left = [];
    for (let n = 1; n <= 33; n++) if (!opened.has(n)) left.push(n);
    return left.length ? left[Math.floor(Math.random() * left.length)] : null;
  }
  $('#surprise-me').addEventListener('click', e => {
    const n = randomUnopened();
    if (n) showCard(n, e.currentTarget);
    else showCard(1 + Math.floor(Math.random() * 33), e.currentTarget);
  });
  $('#card-another').addEventListener('click', () => {
    const n = randomUnopened();
    if (n) { lastTrigger = $(`.gift[data-n="${n}"]`, grid); showCard(n, lastTrigger); }
    else closeDialog(cardDlg);
  });
  $('#reset-cards').addEventListener('click', () => { opened.clear(); refreshCards(); });
  refreshCards();

  /* ---------- Panda playground ---------- */
  const sparks = $$('.spark');
  sparks.forEach(sp => sp.addEventListener('click', () => {
    sp.classList.add('found');
    $('#spark-msg').firstChild.textContent = sp.dataset.msg + ' ';
    $('#spark-count').textContent = `${$$('.spark.found').length} of ${sparks.length} found.`;
  }));
  $('#burst-btn').addEventListener('click', hearts);

  (function buildCake() {
    const g = $('#candles'), NS = 'http://www.w3.org/2000/svg';
    const cols = ['#bfe3ff', '#ffb3cc', '#cdb8ff', '#ffe08a'];
    let n = 0;
    [112, 124, 136].forEach((y, row) => {
      for (let i = 0; i < 11; i++) {
        const x = 60 + i * 24 + (row === 1 ? 12 : 0);
        const c = document.createElementNS(NS, 'rect');
        c.setAttribute('x', x - 3); c.setAttribute('y', y - 18); c.setAttribute('width', 6); c.setAttribute('height', 18); c.setAttribute('rx', 1.5);
        c.setAttribute('fill', cols[n % cols.length]);
        const f = document.createElementNS(NS, 'path');
        f.setAttribute('d', `M${x} ${y - 32}c5 6 5 11 0 13-5-2-5-7 0-13z`);
        f.setAttribute('fill', '#ffc94d'); f.setAttribute('class', 'flame');
        f.style.animationDelay = (-(n % 7) * 0.13) + 's';
        g.appendChild(c); g.appendChild(f); n++;
      }
    });
    g.dataset.count = n; /* 3 rows x 11 = 33 candles */
  })();
  const blowBtn = $('#blow-btn');
  blowBtn.addEventListener('click', () => {
    const out = $('#cake').classList.toggle('out');
    blowBtn.setAttribute('aria-pressed', String(out));
    blowBtn.textContent = out ? 'Relight the candles 🕯️' : 'Blow out the candles 🌬️';
    $('#blow-msg').textContent = out ? 'Poof! Hopefully you made a wish. ✨' : '';
  });

  /* ---------- Future dreams ---------- */
  $$('.dream').forEach(d => d.addEventListener('click', () => {
    const open = d.getAttribute('aria-expanded') !== 'true';
    d.setAttribute('aria-expanded', String(open));
    $('.dream-more', d).hidden = !open;
  }));
  const imagineBtn = $('#imagine-btn'), daydream = $('#daydream');
  imagineBtn.addEventListener('click', () => {
    const show = daydream.hidden;
    daydream.hidden = !show;
    imagineBtn.setAttribute('aria-expanded', String(show));
    imagineBtn.textContent = show ? 'Close the daydream ✨' : 'Imagine our little future ✨';
    if (show) daydream.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
  });

  /* ---------- Hug + envelopes ---------- */
  $('#hug-btn').addEventListener('click', e => {
    openDialog($('#hug-dialog'), e.currentTarget);
    if (!reduced()) emit(['🤍', '💗'], 10, 'rise');
  });
  $$('.mini-env').forEach(b => b.addEventListener('click', () => {
    const letter = b.parentElement.querySelector('.mini-letter');
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    letter.hidden = !open;
  }));

  /* ---------- Final wish ---------- */
  $('#wish-btn').addEventListener('click', e => { openDialog($('#wish-dialog'), e.currentTarget); confetti(); });
  $('#wish-again').addEventListener('click', () => { confetti(); hearts(); });

  motionQuery.addEventListener && motionQuery.addEventListener('change', setupReveal);
})();
