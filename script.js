/* Alesha's birthday universe — script.js (vanilla JS, no build step) */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  const K = '#2b2238';

  /* ================= characters ================= */
  function pandaSVG(kind) {
    const her = kind === 'her';
    return `<svg class="panda" viewBox="0 0 200 232" aria-hidden="true" focusable="false">
  <ellipse class="p-shadow" cx="100" cy="225" rx="60" ry="6"/>
  <g class="p-all">
    <ellipse cx="66" cy="208" rx="25" ry="16" fill="${K}"/><ellipse cx="134" cy="208" rx="25" ry="16" fill="${K}"/>
    <ellipse cx="66" cy="211" rx="11" ry="6.5" fill="#4b3f5e"/><ellipse cx="134" cy="211" rx="11" ry="6.5" fill="#4b3f5e"/>
    <ellipse cx="100" cy="164" rx="56" ry="50" fill="#fff"/>
    <ellipse cx="100" cy="174" rx="33" ry="29" fill="#f6f0fa"/>
    ${her ? '' : '<path d="M100 188l-11-10a7 7 0 0 1 11-8.5 7 7 0 0 1 11 8.5z" fill="#ff6f9f"/>'}
    <g class="p-arm p-arm-l"><ellipse cx="54" cy="160" rx="15" ry="30" transform="rotate(22 54 160)" fill="${K}"/></g>
    <g class="p-arm p-arm-r"><ellipse cx="146" cy="160" rx="15" ry="30" transform="rotate(-22 146 160)" fill="${K}"/></g>
    <g class="p-head">
      <circle cx="44" cy="40" r="23" fill="${K}"/><circle cx="156" cy="40" r="23" fill="${K}"/>
      <circle cx="44" cy="40" r="11" fill="#4b3f5e"/><circle cx="156" cy="40" r="11" fill="#4b3f5e"/>
      <ellipse cx="100" cy="88" rx="68" ry="60" fill="#fff"/>
      <ellipse cx="68" cy="86" rx="17" ry="21" transform="rotate(30 68 86)" fill="${K}"/>
      <ellipse cx="132" cy="86" rx="17" ry="21" transform="rotate(-30 132 86)" fill="${K}"/>
      <g class="p-eyes"><g class="p-blink">
        <circle cx="70" cy="84" r="8" fill="#fff"/><circle cx="71" cy="85.5" r="5.4" fill="${K}"/><circle cx="73.5" cy="82" r="2.1" fill="#fff"/>
        <circle cx="130" cy="84" r="8" fill="#fff"/><circle cx="129" cy="85.5" r="5.4" fill="${K}"/><circle cx="131.5" cy="82" r="2.1" fill="#fff"/>
      </g></g>
      <g class="p-eyes-happy" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M61 89q9-11 18 0"/><path d="M121 89q9-11 18 0"/></g>
      <g class="p-glasses" fill="none" stroke="#ffd166" stroke-width="3.5"><circle cx="70" cy="85" r="15"/><circle cx="130" cy="85" r="15"/><path d="M85 84q15-7 30 0"/></g>
      <ellipse cx="100" cy="106" rx="10" ry="7" fill="${K}"/>
      <path class="p-mouth" d="M89 115q5.5 7 11 0q5.5 7 11 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
      <path class="p-kiss" d="M100 126l-7-6.5a4.3 4.3 0 0 1 7-5 4.3 4.3 0 0 1 7 5z" fill="#ff4f8f"/>
      <ellipse class="p-blush" cx="52" cy="111" rx="11" ry="7" fill="#ff8fb3"/><ellipse class="p-blush" cx="148" cy="111" rx="11" ry="7" fill="#ff8fb3"/>
      ${her ? '<g transform="translate(150 28) rotate(18)"><g class="p-bow"><path d="M0 0C-6-15-27-15-25 0-27 15-6 15 0 0z" fill="#ff4f8f"/><path d="M0 0C6-15 27-15 25 0 27 15 6 15 0 0z" fill="#ff4f8f"/><path d="M-19-5q-4 5 0 10M19-5q4 5 0 10" stroke="#ffc2da" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle r="6.5" fill="#ff8fbd"/></g></g>' : ''}
    </g>
  </g>
</svg>`;
  }

  function teddySVG() {
    return `<svg class="teddy" viewBox="0 0 200 226" aria-hidden="true" focusable="false">
  <ellipse class="t-shadow" cx="100" cy="219" rx="58" ry="6"/>
  <g class="t-all">
    <ellipse cx="66" cy="202" rx="25" ry="17" fill="#b97a4a"/><ellipse cx="134" cy="202" rx="25" ry="17" fill="#b97a4a"/>
    <ellipse cx="66" cy="205" rx="13" ry="9" fill="#f3d2ad"/><ellipse cx="134" cy="205" rx="13" ry="9" fill="#f3d2ad"/>
    <ellipse cx="100" cy="158" rx="54" ry="50" fill="#c98d5b"/>
    <ellipse cx="100" cy="168" rx="33" ry="31" fill="#f3d2ad"/>
    <path class="t-heart" d="M100 198l-26-24a15 15 0 0 1 26-18 15 15 0 0 1 26 18z" fill="url(#g-heart)"/>
    <g class="t-arm t-arm-l"><ellipse cx="62" cy="160" rx="15" ry="29" transform="rotate(-38 62 160)" fill="#c98d5b"/></g>
    <g class="t-arm t-arm-r"><ellipse cx="138" cy="160" rx="15" ry="29" transform="rotate(38 138 160)" fill="#c98d5b"/></g>
    <g class="t-head">
      <circle cx="50" cy="44" r="23" fill="#c98d5b"/><circle cx="50" cy="44" r="12" fill="#f3d2ad"/>
      <circle cx="150" cy="44" r="23" fill="#c98d5b"/><circle cx="150" cy="44" r="12" fill="#f3d2ad"/>
      <circle cx="100" cy="90" r="61" fill="#c98d5b"/>
      <ellipse cx="100" cy="108" rx="28" ry="21" fill="#f3d2ad"/>
      <g class="t-blink"><circle cx="76" cy="84" r="6.5" fill="${K}"/><circle cx="124" cy="84" r="6.5" fill="${K}"/><circle cx="78.5" cy="81.5" r="2.2" fill="#fff"/><circle cx="126.5" cy="81.5" r="2.2" fill="#fff"/></g>
      <ellipse cx="100" cy="100" rx="9.5" ry="7" fill="${K}"/>
      <path d="M91 111q9 9 18 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="62" cy="106" rx="9" ry="6" fill="#ff8fb3" opacity=".6"/><ellipse cx="138" cy="106" rx="9" ry="6" fill="#ff8fb3" opacity=".6"/>
    </g>
  </g>
</svg>`;
  }

  function miniPanda(x, y, bow) {
    return `<g transform="translate(${x} ${y})">
      <circle cx="-9" cy="-9" r="5" fill="${K}"/><circle cx="9" cy="-9" r="5" fill="${K}"/>
      <circle r="11" fill="#fff"/>
      <ellipse cx="-4.5" cy="0" rx="3.4" ry="4" transform="rotate(25 -4.5 0)" fill="${K}"/><ellipse cx="4.5" cy="0" rx="3.4" ry="4" transform="rotate(-25 4.5 0)" fill="${K}"/>
      <circle cx="-4" cy="-.5" r="1.2" fill="#fff"/><circle cx="4" cy="-.5" r="1.2" fill="#fff"/>
      <ellipse cy="4.5" rx="2" ry="1.4" fill="${K}"/>
      ${bow ? '<path d="M9-12l-5-3v6zM9-12l5-3v6z" fill="#ff4f8f"/>' : ''}
    </g>`;
  }

  function trainSVG() {
    const wheel = (cx) => `<g class="wheel"><circle cx="${cx}" cy="84" r="10" fill="${K}"/><circle cx="${cx}" cy="84" r="4" fill="#ffd166"/><path d="M${cx - 8} 84h16M${cx} 76v16" stroke="#6d5579" stroke-width="2"/></g>`;
    const car = (x, fill, inner) => `<rect x="${x}" y="30" width="104" height="48" rx="10" fill="${fill}"/><rect x="${x}" y="70" width="104" height="8" rx="3" fill="rgba(0,0,0,.12)"/>
      <rect x="${x + 10}" y="38" width="36" height="26" rx="6" fill="#fff8e8"/><rect x="${x + 58}" y="38" width="36" height="26" rx="6" fill="#fff8e8"/>${inner}${wheel(x + 22)}${wheel(x + 82)}`;
    return `<svg viewBox="0 0 360 100" aria-hidden="true" focusable="false">
      <circle class="puff" cx="318" cy="16" r="8" fill="#fff"/><circle class="puff" cx="318" cy="16" r="8" fill="#fff"/><circle class="puff" cx="318" cy="16" r="8" fill="#fff"/>
      ${car(4, '#b89cff', miniPanda(28, 54, true) + '<text x="76" y="58" font-size="16" text-anchor="middle">🧸</text>')}
      <rect x="108" y="62" width="12" height="5" fill="#6d5579"/>
      ${car(120, '#7fdcff', miniPanda(144, 54, false) + '<text x="192" y="58" font-size="16" text-anchor="middle">💗</text>')}
      <rect x="224" y="62" width="12" height="5" fill="#6d5579"/>
      <rect x="236" y="40" width="98" height="38" rx="9" fill="#ff5c9a"/>
      <rect x="236" y="16" width="44" height="34" rx="7" fill="#e0216b"/>
      <rect x="244" y="22" width="28" height="18" rx="4" fill="#fff8e8"/>
      <rect x="310" y="22" width="14" height="22" rx="3" fill="${K}"/>
      <path d="M334 48h12l8 30h-20z" fill="#e0216b"/>
      <path d="M300 62l-6-5.5a3.6 3.6 0 0 1 6-4 3.6 3.6 0 0 1 6 4z" fill="#fff"/>
      <rect x="250" y="4" width="18" height="4" fill="#000"/><rect x="250" y="8" width="18" height="4" fill="#dd0000"/><rect x="250" y="12" width="18" height="4" fill="#ffce00"/>
      <line x1="250" y1="4" x2="250" y2="18" stroke="${K}" stroke-width="2"/>
      ${wheel(258)}${wheel(290)}${wheel(322)}
    </svg>`;
  }

  $$('.panda-slot').forEach(el => { el.innerHTML = pandaSVG(el.dataset.panda); });
  $$('.teddy-slot').forEach(el => { el.innerHTML = teddySVG(); });
  $('#train').innerHTML = trainSVG();
  $('#peek').insertAdjacentHTML('afterbegin', pandaSVG('me'));

  /* ================= global little helpers ================= */
  const tapLayer = $('#tap-layer');
  function sprinkle(x, y, chars = ['💗', '💖', '💕', '✨'], n = 6, spread = 70) {
    if (reduced()) n = Math.min(n, 2);
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.textContent = pick(chars);
      const a = rand(0, Math.PI * 2), d = rand(spread * .4, spread);
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'px');
      s.style.setProperty('--dy', (Math.sin(a) * d - spread * .5).toFixed(1) + 'px');
      s.style.setProperty('--r', rand(-40, 40).toFixed(0) + 'deg');
      s.style.setProperty('--s', rand(14, 28).toFixed(0) + 'px');
      tapLayer.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  }
  const centerOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  let toastTimer = 0;
  function toast(msg, ms = 2800) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }

  const sfx = {
    pop() {
      const ctx = LoveSong.context();
      if (!ctx) return;
      const len = Math.floor(ctx.sampleRate * .12), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 5);
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = buf; f.type = 'bandpass'; f.frequency.value = 1200; f.Q.value = .7; g.gain.value = .55;
      s.connect(f); f.connect(g); g.connect(ctx.destination); s.start();
    },
    chime() {
      const ctx = LoveSong.context();
      if (!ctx) return;
      const t = ctx.currentTime;
      [1046.5, 1318.5, 1568, 2093].forEach((fq, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain(), dt = i * .07;
        o.type = 'sine'; o.frequency.value = fq;
        g.gain.setValueAtTime(0, t + dt); g.gain.linearRampToValueAtTime(.06, t + dt + .01); g.gain.setTargetAtTime(0, t + dt + .02, .3);
        o.connect(g); g.connect(ctx.destination); o.start(t + dt); o.stop(t + dt + 1.6);
      });
    }
  };

  /* dialogs: effects must live inside an open dialog to show above it */
  const fxCanvas = $('#fx-canvas');
  function openDialog(dlg) {
    dlg.appendChild(fxCanvas);
    dlg.appendChild(tapLayer);
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
  }
  function closeDialog(dlg) { if (typeof dlg.close === 'function') dlg.close(); else { dlg.removeAttribute('open'); dlg.dispatchEvent(new Event('close')); } }
  $$('dialog').forEach(dlg => {
    dlg.addEventListener('click', e => { if (e.target === dlg) closeDialog(dlg); });
    dlg.addEventListener('close', () => { document.body.appendChild(fxCanvas); document.body.appendChild(tapLayer); });
    $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => closeDialog(dlg)));
  });

  /* ================= gate ================= */
  LoveSong.preload();
  const gateSky = new FX.Sky($('#gate-sky'), { stars: 180, shooting: true });
  const gate = $('#gate'), openBtn = $('#open-btn'), main = $('#main');
  let opened = false;
  openBtn.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    openBtn.classList.add('boom');
    LoveSong.start();
    const [cx, cy] = centerOf(openBtn);
    FX.burstAt(cx, cy, { n: 110, speed: 6 });
    setTimeout(() => FX.burstAt(cx, cy, { n: 80, speed: 4, heart: false }), 250);
    sprinkle(cx, cy, ['💗', '💖', '💕', '✨', '🌸'], 22, 200);
    setTimeout(enterUniverse, reduced() ? 50 : 750);
  });

  function enterUniverse() {
    main.hidden = false;
    $('#topbar').hidden = false;
    $('#player').hidden = false;
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    gate.classList.add('leaving');
    setTimeout(() => { gate.hidden = true; gateSky.visible = false; }, 1200);
    const title = $('#hero-title');
    if (title) title.focus({ preventScroll: true });
    initUniverse();
  }

  /* ================= hero ================= */
  (function splitTitle() {
    const el = $('[data-split]');
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = ch === ' ' ? 'ch sp' : 'ch';
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.setProperty('--i', i);
      s.setAttribute('aria-hidden', 'true');
      el.appendChild(s);
    });
    el.addEventListener('pointerover', e => {
      const c = e.target.closest('.ch');
      if (!c || c.classList.contains('sp') || c.classList.contains('bounce')) return;
      c.classList.add('bounce');
      c.addEventListener('animationend', () => c.classList.remove('bounce'), { once: true });
    });
  })();

  (function bunting() {
    const letters = ['♥', 'A', 'L', 'E', 'S', 'H', 'A', '♥'], cols = ['#ff5c9a', '#ffd166', '#b89cff', '#7fdcff', '#ff8fbd', '#ffb46b', '#b89cff', '#ff5c9a'];
    const b = $('#bunting');
    letters.forEach((l, i) => {
      const s = document.createElement('span');
      s.textContent = l;
      s.style.setProperty('--c', cols[i]);
      s.style.setProperty('--i', i);
      s.style.setProperty('--y', (Math.sin(Math.PI * i / (letters.length - 1)) * 26).toFixed(1) + 'px');
      b.appendChild(s);
    });
  })();

  const POP_WORDS = ['hug! 🤗', 'kiss! 💋', 'cuddle! 🥰', 'Ich liebe dich', '33! 🎉', 'bis bald ✈️', 'mein Schatz 💗', 'pandas! 🐼', 'beautiful ✨', 'mwah! 💋'];
  const BALLOON_COLS = ['#ff5c9a', '#ffd166', '#b89cff', '#7fdcff', '#ff8fbd', '#ffb46b', '#8ee6b0', '#ff7aa8'];
  function setupBalloons() {
    const field = $('#balloon-field');
    const n = window.innerWidth < 600 ? 6 : 9;
    for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'balloon';
      b.setAttribute('aria-label', 'Pop the balloon');
      styleBalloon(b, i * 1.7 + rand(0, 1.5));
      b.addEventListener('click', () => popBalloon(b, field));
      field.appendChild(b);
    }
  }
  function styleBalloon(b, delay) {
    b.style.setProperty('--x', rand(3, 90).toFixed(1) + '%');
    b.style.setProperty('--c', pick(BALLOON_COLS));
    b.style.setProperty('--w', rand(42, 66).toFixed(0) + 'px');
    b.style.setProperty('--t', rand(13, 19).toFixed(1) + 's');
    b.style.setProperty('--delay', delay.toFixed(1) + 's');
  }
  function popBalloon(b, field) {
    if (b.classList.contains('popped')) return;
    const r = b.getBoundingClientRect(), fr = field.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    b.classList.add('popped');
    sfx.pop();
    FX.burstAt(x, y, { n: 36, speed: 2.6, heart: true, col: getComputedStyle(b).getPropertyValue('--c').trim() || '#ff5c9a' });
    const w = document.createElement('span');
    w.className = 'pop-word';
    w.textContent = pick(POP_WORDS);
    w.style.left = (x - fr.left) + 'px';
    w.style.top = (y - fr.top) + 'px';
    field.appendChild(w);
    setTimeout(() => w.remove(), 1400);
    setTimeout(() => { styleBalloon(b, 0); b.classList.remove('popped'); }, 2500);
  }

  /* ================= song + lyrics ================= */
  const lyricsBox = $('#lyrics'), track = document.createElement('div');
  track.className = 'ly-track';
  const lineEls = LoveSong.lines.map(l => {
    const p = document.createElement('p');
    p.className = 'ly-line';
    p.innerHTML = (l.part ? `<span class="ly-part">${l.part}</span>` : '') + '<span class="ly-txt"></span>';
    p.querySelector('.ly-txt').textContent = l.txt;
    track.appendChild(p);
    return p;
  });
  lyricsBox.appendChild(track);

  const viz = $('#viz');
  const bars = Array.from({ length: 24 }, () => { const i = document.createElement('i'); viz.appendChild(i); return i; });
  let fbuf = null, curLine = -2;
  const playerLine = $('#player-line');
  const songSection = $('#song');
  let songVisible = false;
  new IntersectionObserver(es => { songVisible = es[es.length - 1].isIntersecting; }).observe(songSection);

  function setLine(i) {
    curLine = i;
    lineEls.forEach((el, j) => { el.classList.toggle('on', j === i); el.classList.toggle('past', j < i); });
    const target = lineEls[Math.max(0, i)];
    track.style.transform = `translateY(${-(target.offsetTop + target.offsetHeight / 2)}px)`;
    const txt = i >= 0 ? LoveSong.lines[i].txt : '♪';
    if (playerLine.textContent !== txt) {
      playerLine.textContent = txt;
      playerLine.classList.remove('swap'); void playerLine.offsetWidth; playerLine.classList.add('swap');
    }
  }
  function syncLoop() {
    if (LoveSong.playing) {
      const beat = LoveSong.position(), i = LoveSong.lineAt(beat);
      if (i !== curLine) setLine(i);
      if (i >= 0) {
        const L = LoveSong.lines[i], p = Math.min(1, Math.max(0, (beat - L.t) / L.d));
        lineEls[i].style.setProperty('--p', (p * 100).toFixed(1) + '%');
      }
      const an = LoveSong.analyser();
      if (an && songVisible) {
        if (!fbuf) fbuf = new Uint8Array(an.frequencyBinCount);
        an.getByteFrequencyData(fbuf);
        bars.forEach((b, k) => {
          const bin = Math.round(Math.pow(70, k / (bars.length - 1)));
          const v = fbuf[bin] / 255;
          b.style.transform = `scaleY(${Math.min(1, Math.max(.06, Math.pow(v, 1.9) * (1 + k / 22))).toFixed(3)})`;
        });
      }
    } else if (songVisible) bars.forEach(b => { b.style.transform = 'scaleY(.06)'; });
    requestAnimationFrame(syncLoop);
  }

  const playerEl = $('#player'), songToggle = $('#song-toggle');
  LoveSong.onChange(playing => {
    playerEl.classList.toggle('paused', !playing);
    $('#player-icon').textContent = playing ? '❚❚' : '▶';
    $('#player-btn').setAttribute('aria-label', playing ? 'Pause the song' : 'Play the song');
    songToggle.textContent = playing ? '❚❚ Pause' : '▶ Play';
    $('#vinyl').classList.toggle('on', playing);
    $('.tonearm').classList.toggle('on', playing);
    if (!playing) playerLine.textContent = LoveSong.singing ? '🎂 singing Happy Birthday to you…' : 'paused — tap ▶ to play';
    else curLine = -2;
  });
  $('#player-btn').addEventListener('click', () => LoveSong.toggle());
  songToggle.addEventListener('click', () => LoveSong.toggle());
  $('#song-restart').addEventListener('click', () => { LoveSong.restart(); curLine = -2; });

  /* ================= story ================= */
  (function floaties() {
    const box = $('#story .floaties'), chars = ['💗', '✨', '🐼', '💕', '⭐', '🌸', '🧸'];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('span');
      s.textContent = pick(chars);
      s.style.setProperty('--x', rand(0, 96).toFixed(1) + '%');
      s.style.setProperty('--s', rand(14, 30).toFixed(0) + 'px');
      s.style.setProperty('--t', rand(16, 28).toFixed(1) + 's');
      s.style.setProperty('--delay', (-rand(0, 28)).toFixed(1) + 's');
      box.appendChild(s);
    }
  })();
  const tl = $('#timeline'), tlFill = $('#tl-fill');

  /* ================= smile ================= */
  const COMPLIMENTS = [
    'Most beautiful smile in the universe: confirmed ✅',
    'Gold medal for being gorgeous 🏅',
    'This photo belongs in a museum. The Louvre called. 🖼️',
    'Warning: this smile causes 15-hour conversations ⏰',
    'Beauty + brains + kindness = Alesha 💗',
    'I could look at this forever. Actually, I will. 😌',
    'The stars are a little jealous right now ✨',
    'Ich finde dich wunderschön — I think you\'re beautiful 💗'
  ];
  let compI = 0;
  $('#polaroid').addEventListener('click', e => {
    const p = e.currentTarget;
    p.classList.remove('wow'); void p.offsetWidth; p.classList.add('wow');
    const [x, y] = centerOf(p);
    FX.burstAt(x, y, { n: 60, speed: 4 });
    sprinkle(x, y, ['💗', '😍', '✨', '💖'], 10, 160);
    toast(COMPLIMENTS[compI++ % COMPLIMENTS.length]);
  });

  /* ================= panda love land ================= */
  const stage = $('#stage'), actMsg = $('#act-msg'), acts = $$('.act');
  const counts = Object.assign({ hug: 0, kiss: 0, cuddle: 0, squeeze: 0, teddy: 0 }, store.get('alesha-love', {}));
  const saveCounts = () => store.set('alesha-love', counts);
  const showCounts = () => ['hug', 'kiss', 'cuddle', 'squeeze', 'teddy'].forEach(k => { const el = $('#n-' + k); if (el) el.textContent = counts[k]; });
  showCounts();
  const ACT_MSG = {
    hug: ['Biggest panda hug ever delivered 🤗', 'Squeeeeeze! That one is from me.', 'A hug for every hour we talked 🤗', 'Hug sent across the miles — arriving now 💗', 'I\'m never letting go. Ever. 🐼'],
    kiss: ['Mwah! A kiss on your cheek 💋', 'One for your forehead, one for your nose 💋', 'Kiss delivered. Blushing pandas everywhere 😳', 'Küsschen! (that\'s "little kiss" in German) 💋'],
    cuddle: ['Cuddles under the stars 🌙', 'A blanket, the moon, and you. Perfect. 🥰', 'Kuscheln — our favourite German word 🥰', 'Shh… the pandas are cuddling 💤']
  };
  const ACT_FX = { hug: ['💗', '🤗', '💖', '💕'], kiss: ['💋', '💗', '😘', '💕'], cuddle: ['✨', '🌙', '⭐', '💤', '💗'] };
  const ACT_DUR = { hug: 4000, kiss: 3600, cuddle: 6000 };
  let busy = false;
  function doAct(kind) {
    if (busy) return;
    busy = true;
    acts.forEach(b => { b.disabled = true; });
    stage.classList.remove('hug', 'kiss', 'cuddle', 'pop');
    void stage.offsetWidth;
    stage.classList.add(kind);
    actMsg.textContent = pick(ACT_MSG[kind]);
    counts[kind]++; saveCounts(); showCounts();
    setTimeout(() => {
      stage.classList.add('pop');
      const r = stage.getBoundingClientRect();
      sprinkle(r.left + r.width / 2, r.top + r.height * .42, ACT_FX[kind], 14, Math.min(220, r.width * .3));
      if (kind === 'kiss') FX.burstAt(r.left + r.width / 2, r.top + r.height * .35, { n: 50, speed: 3, col: '#ff4f8f' });
    }, kind === 'cuddle' ? 2200 : 1100);
    setTimeout(() => {
      stage.classList.remove(kind, 'pop');
      busy = false;
      acts.forEach(b => { b.disabled = false; });
    }, ACT_DUR[kind] + 120);
  }
  acts.forEach(b => b.addEventListener('click', () => doAct(b.dataset.act)));
  const SAY = {
    a: ['Hehe 💗', 'That\'s me! 🎀', 'I love you too!', 'Hug me! 🤗', 'Danke, Schatz! 🥰'],
    b: ['Happy birthday, Alesha!', 'I love you 💗', 'Bis bald, Schatz!', 'You\'re so cute 🙈', 'Ich liebe dich!']
  };
  [['a', $('.pd-a')], ['b', $('.pd-b')]].forEach(([k, pd]) => {
    pd.addEventListener('click', () => {
      if (busy) return;
      pd.classList.remove('giggle'); void pd.offsetWidth; pd.classList.add('giggle');
      const say = $('#say-' + k);
      say.textContent = pick(SAY[k]);
      say.classList.add('show');
      clearTimeout(say._t);
      say._t = setTimeout(() => say.classList.remove('show'), 2000);
      const [x, y] = centerOf(pd);
      sprinkle(x, y - 20, ['💗', '💕'], 5, 60);
    });
  });

  /* ================= teddy ================= */
  const TEDDY_LINES = [
    'That one was from me 🤗', 'Hug delivered! Batteries: unlimited 🔋', 'Teddy says: you\'re the cutest human alive 🧸',
    'Fun fact: I\'m 100% stuffed with love', 'Hug level: maximum. Please hold 💞', 'Ich hab dich lieb! (teddy-German for “I love you”) 🧸',
    'Another one? Okay, okay… 🫶', 'This hug is a placeholder for the real one ✈️', 'Squeezed with love, sent across the miles 💌', 'Mwah! Teddies can kiss too 💋'
  ];
  let teddyI = 0;
  const teddyBig = $('#teddy-big'), teddyBubble = $('#teddy-bubble');
  teddyBig.addEventListener('click', () => {
    teddyBig.classList.remove('squish'); void teddyBig.offsetWidth; teddyBig.classList.add('squish');
    teddyBubble.textContent = TEDDY_LINES[teddyI++ % TEDDY_LINES.length];
    teddyBubble.classList.remove('swap'); void teddyBubble.offsetWidth; teddyBubble.classList.add('swap');
    counts.squeeze++; saveCounts(); showCounts();
    const [x, y] = centerOf(teddyBig);
    sprinkle(x, y, ['💗', '🤗', '💕', '🧸'], 9, 140);
  });
  const teddyRow = $('#teddy-row');
  const sides = ['left', 'right'].map(s => { const d = document.createElement('div'); d.className = 'side ' + s; teddyRow.appendChild(d); return d; });
  let dropN = 0;
  $('#teddy-order').addEventListener('click', () => {
    const side = sides[dropN++ % 2];
    if (side.children.length >= 3) {
      const old = side.firstElementChild;
      old.classList.add('leaving');
      setTimeout(() => old.remove(), 600);
    }
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.innerHTML = `<div class="drop"><div class="drop-balloons"><i></i><i></i><i></i></div>${teddySVG()}</div>`;
    side.appendChild(slot);
    counts.teddy++; saveCounts(); showCounts();
    setTimeout(() => {
      const [x, y] = centerOf(slot);
      sprinkle(x, y, ['💗', '✨'], 6, 70);
    }, 2400);
    toast(pick(['🪂 Teddy incoming!', '🧸 One teddy hug, express delivery!', '🪂 Special delivery for Alesha!']), 1800);
  });

  /* ================= love-o-meter ================= */
  const jar = $('#jar'), liquid = $('#liquid'), pct = $('#pct'), meterMsg = $('#meter-msg'), meterBtn = $('#meter-btn');
  let metering = false;
  const setLevel = p => { liquid.style.transform = `translateY(${(190 - Math.min(p, 100) / 100 * 184).toFixed(1)}px)`; };
  meterBtn.addEventListener('click', () => {
    if (metering) return;
    metering = true;
    meterBtn.disabled = true;
    jar.classList.remove('gone', 'shake');
    pct.classList.remove('inf');
    setLevel(0);
    meterMsg.textContent = 'Measuring… 🔬';
    const t0 = performance.now();
    const steps = [[100, '100%… wait. It\'s still going? 😳'], [300, 'Uh oh. The machine is overheating… 🔥'], [600, 'ERROR: too much love detected ⚠️'], [900, 'It\'s going to blow!! 💥']];
    let si = 0, lastSpark = 0;
    function frame(now) {
      const t = (now - t0) / 1000;
      let p;
      if (reduced()) p = 1000;
      else if (t < 2.4) p = 100 * (1 - Math.pow(1 - t / 2.4, 3));
      else p = 100 + Math.pow(Math.min(1, (t - 2.4) / 3.8), 2.2) * 899;
      setLevel(p);
      pct.textContent = Math.round(p) + '%';
      while (si < steps.length && p >= steps[si][0]) { meterMsg.textContent = steps[si][1]; si++; }
      if (p > 100) {
        jar.classList.add('shake');
        if (now - lastSpark > 240) { lastSpark = now; const r = jar.getBoundingClientRect(); sprinkle(rand(r.left + r.width * .2, r.right - r.width * .2), r.top + 20, ['💗', '💖'], 2, 60); }
      }
      if (p >= 999) {
        jar.classList.remove('shake');
        jar.classList.add('gone');
        const r = jar.getBoundingClientRect();
        FX.burstAt(r.left + r.width / 2, r.top + r.height / 2, { n: 130, speed: 6.5 });
        FX.confetti(90);
        sprinkle(r.left + r.width / 2, r.top + r.height / 2, ['💗', '💖', '💕', '💘'], 18, 220);
        pct.textContent = '∞';
        pct.classList.add('inf');
        meterMsg.textContent = 'It can\'t be measured. It just keeps growing — a little more every single day. 💗';
        meterBtn.textContent = 'Measure again ↺';
        meterBtn.disabled = false;
        metering = false;
        return;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });

  /* ================= deutsch ================= */
  const WORDS = [
    ['🎂', 'Alles Gute zum Geburtstag!', 'Happy birthday!', 'AH-les GOO-teh tsoom geh-BOORTS-tahk'],
    ['💗', 'Ich liebe dich', 'I love you', 'ikh LEE-beh dikh'],
    ['🥺', 'Ich vermisse dich', 'I miss you', 'ikh fehr-MISS-eh dikh'],
    ['💎', 'Mein Schatz', 'My treasure · my darling', 'mine SHAHTS'],
    ['🤗', 'Eine Umarmung', 'A hug', 'EYE-neh oom-AR-moong'],
    ['💋', 'Ein Küsschen', 'A little kiss', 'ine KÜSS-khen'],
    ['🥰', 'Kuscheln', 'To cuddle', 'KOO-sheln'],
    ['✈️', 'Bis bald', 'See you soon', 'biss BALT'],
    ['🌍', 'Du bist mein Ein und Alles', 'You are my everything', 'doo bist mine ine oont AH-les'],
    ['👫', 'Zusammen', 'Together', 'tsoo-ZAH-men'],
    ['♾️', 'Für immer', 'Forever', 'fyoor IM-mer'],
    ['🐼', 'Mein Pandabär', 'My panda bear', 'mine PAHN-dah-bair'],
    ['🧸', 'Kuschelbär', 'Cuddle bear (a teddy!)', 'KOO-shel-bair'],
    ['😊', 'Ich freue mich auf dich', 'I can\'t wait to see you', 'ikh FROY-eh mikh owf dikh'],
    ['🌙', 'Gute Nacht, mein Engel', 'Good night, my angel', 'GOO-teh nahkht, mine ENG-el'],
    ['☀️', 'Guten Morgen, Schatz', 'Good morning, darling', 'GOO-ten MOR-gen, shahts']
  ];
  const CARD_COLS = ['#ff8fbd', '#ffd166', '#b89cff', '#7fdcff', '#8ee6b0', '#ffb46b'];
  const cardsBox = $('#cards');
  WORDS.forEach(([emo, de, en, pron], i) => {
    const card = document.createElement('div');
    card.className = 'fc reveal';
    card.style.setProperty('--c', CARD_COLS[i % CARD_COLS.length]);
    card.style.setProperty('--d', ((i % 4) * .08).toFixed(2) + 's');
    card.innerHTML = `<button type="button" class="fc-flip" aria-pressed="false"><span class="fc-inner">
        <span class="fc-face fc-front"><span class="fc-emoji" aria-hidden="true">${emo}</span><b lang="de"></b><small>tap to flip</small></span>
        <span class="fc-face fc-back"><b></b><i></i></span></span></button>
      <button type="button" class="fc-say">🔊</button>`;
    $('.fc-front b', card).textContent = de;
    $('.fc-back b', card).textContent = en;
    $('.fc-back i', card).textContent = 'say it: ' + pron;
    const flip = $('.fc-flip', card), sayBtn = $('.fc-say', card);
    flip.setAttribute('aria-label', `${de} — tap to see what it means`);
    sayBtn.setAttribute('aria-label', `Hear “${de}” spoken`);
    flip.addEventListener('click', () => {
      const on = card.classList.toggle('flipped');
      flip.setAttribute('aria-pressed', String(on));
      if (on) { const [x, y] = centerOf(card); sprinkle(x, y, ['✨', '💗'], 4, 60); }
    });
    sayBtn.addEventListener('click', () => speak(de, sayBtn));
    cardsBox.appendChild(card);
  });
  function speak(text, btn) {
    if (!('speechSynthesis' in window)) { toast('Your browser can\'t speak German — so say it out loud to me instead 😄'); return; }
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = .82;
    const voices = synth.getVoices();
    const v = voices.find(x => /^de[-_]DE/i.test(x.lang)) || voices.find(x => /^de/i.test(x.lang));
    if (v) u.voice = v;
    btn.classList.add('talking');
    const done = () => btn.classList.remove('talking');
    u.onend = done; u.onerror = done;
    setTimeout(done, 6000);
    synth.speak(u);
  }
  if ('speechSynthesis' in window) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); }

  const QUIZ = [
    ['What does “Ich liebe dich” mean?', 'I love you', ['I like bread', 'Good morning', 'See you later']],
    ['How do you say “see you soon”?', 'Bis bald', ['Guten Tag', 'Danke schön', 'Gute Nacht']],
    ['“Kuscheln” means…', 'to cuddle', ['to cook', 'to sneeze', 'to run away']],
    ['“Mein Schatz” means…', 'my treasure · my darling', ['my shoe', 'my homework', 'my umbrella']],
    ['How do you say “Happy birthday”?', 'Alles Gute zum Geburtstag', ['Frohe Weihnachten', 'Guten Appetit', 'Wie geht\'s?']]
  ];
  let qi = 0, qLock = false;
  const qQ = $('#quiz-q'), qOpts = $('#quiz-opts'), qFb = $('#quiz-fb'), qStep = $('#quiz-step'), quiz = $('#quiz'), cert = $('#cert');
  function renderQ() {
    const [q, right, wrong] = QUIZ[qi];
    qStep.textContent = `${qi + 1} / ${QUIZ.length}`;
    qQ.textContent = q;
    qFb.textContent = '';
    qOpts.textContent = '';
    qLock = false;
    [right, ...wrong].sort(() => Math.random() - .5).forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = opt;
      b.addEventListener('click', () => answer(b, opt === right));
      qOpts.appendChild(b);
    });
  }
  function answer(b, ok) {
    if (qLock) return;
    if (ok) {
      qLock = true;
      b.classList.add('right');
      qFb.textContent = pick(['Sehr gut! ⭐', 'Richtig! Clever girl 💗', 'Wunderbar! 🎉', 'Perfekt, Schatz! 🥰']);
      const [x, y] = centerOf(b);
      FX.burstAt(x, y, { n: 40, speed: 3, heart: false });
      sfx.chime();
      setTimeout(() => {
        qi++;
        if (qi < QUIZ.length) renderQ();
        else {
          quiz.hidden = true;
          cert.hidden = false;
          FX.celebrate(1.2);
          cert.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
        }
      }, 1100);
    } else {
      b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
      qFb.textContent = pick(['Fast! (that means “almost”) — try again 😊', 'Nein, nein 🙈 one more try!', 'So close, Schatz! 💗']);
    }
  }
  $('#quiz-again').addEventListener('click', () => { qi = 0; cert.hidden = true; quiz.hidden = false; renderQ(); });
  renderQ();

  /* ================= meet ================= */
  const pass = $('#pass'), passWrap = $('.pass-wrap');
  passWrap.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || reduced()) return;
    const r = pass.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    pass.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
  });
  passWrap.addEventListener('pointerleave', () => { pass.style.transform = ''; });

  function flyPlane(done) {
    if (reduced()) { done && done(); return; }
    const p = document.createElement('div');
    p.className = 'flyer';
    p.textContent = '✈️';
    document.body.appendChild(p);
    const W = window.innerWidth, H = window.innerHeight;
    const P0 = [-60, H * .8], P1 = [W * .3, H * .1], P2 = [W * .7, H * .95], P3 = [W + 60, H * .2];
    const t0 = performance.now(), dur = 2300;
    let lastHeart = 0;
    function step(now) {
      const t = Math.min(1, (now - t0) / dur), u = 1 - t;
      const x = u * u * u * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t * t * t * P3[0];
      const y = u * u * u * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t * t * t * P3[1];
      p.style.transform = `translate(${x - 23}px, ${y - 23}px)`;
      if (now - lastHeart > 70) { lastHeart = now; sprinkle(x, y, ['💗', '💕', '✨'], 2, 30); }
      if (t < 1) requestAnimationFrame(step); else { p.remove(); done && done(); }
    }
    requestAnimationFrame(step);
  }

  const road = $('#road'), roadCap = $('#road-caption');
  let running = false;
  function runToEachOther() {
    if (running) return;
    running = true;
    road.classList.remove('met', 'run');
    roadCap.textContent = 'the distance, for now…';
    setTimeout(() => {
      road.classList.add('run');
      roadCap.textContent = 'running to you… 💨';
      setTimeout(() => {
        road.classList.remove('run');
        road.classList.add('met');
        $$('.panda', road).forEach(s => s.classList.add('happy'));
        roadCap.textContent = '…and finally, the hug. 💗';
        const r = road.getBoundingClientRect();
        FX.burstAt(r.left + r.width / 2, r.top + r.height * .35, { n: 90, speed: 5 });
        sprinkle(r.left + r.width / 2, r.top + r.height * .45, ['💗', '🤗', '💖', '✨'], 16, 180);
        running = false;
      }, reduced() ? 50 : 2400);
    }, 350);
    $$('.panda', road).forEach(s => s.classList.remove('happy'));
  }
  $('#run-btn').addEventListener('click', runToEachOther);
  $('#board-btn').addEventListener('click', e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    pass.classList.remove('torn'); void pass.offsetWidth; pass.classList.add('torn');
    toast('✈️ Boarding complete. Destination: my arms.');
    flyPlane(() => {
      road.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
      setTimeout(runToEachOther, 700);
      setTimeout(() => { pass.classList.remove('torn'); btn.disabled = false; btn.textContent = 'Fly again ✈️'; }, 2600);
    });
  });

  let loaded = false;
  const loadFill = $('#load-fill'), loadPct = $('#load-pct'), loadNote = $('#load-note');
  new IntersectionObserver((es, ob) => {
    if (!es[es.length - 1].isIntersecting || loaded) return;
    loaded = true; ob.disconnect();
    const t0 = performance.now();
    (function f(now) {
      const t = Math.min(1, (now - t0) / 3200), v = Math.round(99 * (1 - Math.pow(1 - t, 3)));
      loadFill.style.width = v + '%';
      loadPct.textContent = v;
      if (t < 1) requestAnimationFrame(f);
      else loadNote.textContent = '— only waiting for one thing now: you. 💗';
    })(t0);
  }, { threshold: .6 }).observe($('#loading'));

  const SOMEDAY = [
    'Hug you for a really, really long time 🤗',
    'Give you the softest forehead kiss 💋',
    'Movie date — you pick the film, I bring the snacks 🍿',
    'Get happily lost in a library together 📚',
    'Say “Ich liebe dich” to you in person 💗',
    'Study in Germany, side by side 🎓',
    'Write our research paper together 📝',
    'Cuddle and talk for 15 hours — in person this time 🥰',
    'Celebrate your 34th birthday together 🎂'
  ];
  const checked = store.get('alesha-someday', []);
  const list = $('#checklist');
  SOMEDAY.forEach((txt, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<span class="box" aria-hidden="true"></span><span class="txt"></span>';
    $('.txt', b).textContent = txt;
    const set = on => { b.setAttribute('aria-pressed', String(on)); $('.box', b).textContent = on ? '💗' : ''; };
    set(checked.includes(i));
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      set(on);
      const idx = checked.indexOf(i);
      if (on && idx < 0) checked.push(i);
      if (!on && idx >= 0) checked.splice(idx, 1);
      store.set('alesha-someday', checked);
      if (on) { const [x, y] = centerOf($('.box', b)); sprinkle(x, y, ['💗', '✨'], 6, 60); }
      if (checked.length === SOMEDAY.length) toast('All of them. Every single one. Soon. 💗', 3500);
    });
    li.appendChild(b);
    list.appendChild(li);
  });

  /* ================= 33 surprises ================= */
  const GIFTS = [
    ['🎂', 'Happy birthday, my Alesha', 'Of all the days in the year, this one is my favourite — because it\'s the day the world got you.'],
    ['💗', 'My favourite notification', 'You are the best thing that ever happened to my phone screen… and very soon, to my real life.'],
    ['🐼', 'Panda wisdom', 'If I were a panda, you\'d be my bamboo. (That\'s the highest compliment in panda language. I checked.)'],
    ['🤗', 'One very long hug', 'This box contains one (1) very long, very tight hug. Redeemable in person. No expiry date.'],
    ['💋', 'Three kisses', 'One on your forehead, one on your cheek, and one I\'m saving for when I finally see you.'],
    ['🧸', 'A job application', 'Teddy bears are great for cuddles — but I\'m officially applying for the position full-time.'],
    ['🥨', 'Ich liebe dich', 'I\'ll keep practising until I can say it perfectly — and then I\'ll keep saying it anyway.'],
    ['📚', 'My favourite story', 'You\'re my favourite book. I read every chapter of you and still can\'t wait for the next page.'],
    ['🏅', 'Undefeated', 'Gold medalist in English Literature. Gold medalist in my heart. Undefeated in both.'],
    ['⏰', 'What you do to time', 'Fifteen hours of talking and I still hang up with something left to say. That\'s you.'],
    ['🎬', 'Future movie date', 'You choose the film. I\'ll hold the popcorn and your hand. Mostly your hand.'],
    ['✈️', 'One day closer', 'Every day that passes is one day closer to the day I finally see your smile in person.'],
    ['🌙', 'Goodnight', 'Goodnight texts are lovely. But one day I want to say it right next to you.'],
    ['😊', 'Gravity', 'Your smile has its own gravity. I\'ve been falling ever since that first hello.'],
    ['🥰', 'Coupon', 'Valid for: unlimited cuddles. Terms and conditions: none. Valid: forever.'],
    ['🌸', 'A gentle year', 'I hope 33 treats you as gently and beautifully as you deserve — which is the most gently and beautifully.'],
    ['🍫', 'Special delivery', 'If I could, I\'d send you cake, chocolate, and myself in a box. (Please open carefully.)'],
    ['💌', 'Out of all the hellos', 'Out of every hello in the world, I\'m so glad I said mine to you.'],
    ['⭐', 'Thank you, stars', 'I asked the stars for something wonderful. They sent you.'],
    ['🗝️', 'Bis bald', 'It means “see you soon”. It\'s my favourite German phrase, because it\'s a promise.'],
    ['☕', 'Someday soon', 'Two cups of tea, one blanket, no plans, and you telling me about your favourite book.'],
    ['🌈', 'Your superpower', 'You make ordinary days feel special and long days feel short.'],
    ['🫶', 'Lucky me', 'You\'re beautiful, brilliant and kind — and somehow I get to make you a birthday universe. Lucky me.'],
    ['🎵', 'About that song', 'The song playing right now? Written for you. Every note is just a fancy way of saying “I love you”.'],
    ['🐻', 'Squeeze!', 'That was a teddy hug. A real one is coming soon, and it\'ll be much, much better.'],
    ['🗺️', 'Distance', 'Distance is just a test of how far love can travel. Spoiler: ours goes all the way.'],
    ['📝', 'Our research paper', 'Working title: “On Falling for Someone Over Snapchat: A Very Happy Study.” Co-authors: us.'],
    ['🍰', 'Make a wish', 'Make a wish, Alesha. And if it\'s about me — it\'s already coming true.'],
    ['🌻', 'Today\'s forecast', 'Today you should feel as loved as you are. (Warning: that\'s a LOT.)'],
    ['🦋', 'Butterflies', 'You still give me butterflies, even through a screen. Imagine the zoo when I see you.'],
    ['🏛️', 'A library in Germany', 'One day: a quiet library in Germany, two books, and your head on my shoulder.'],
    ['🎁', 'Your real gift', 'Your real gift is still on its way: me, a hug, and many, many birthdays together.'],
    ['🎉', 'Chapter 33', '33 surprises, 33 years, and one wish: that you always know how loved you are. Happy birthday, mein Schatz.']
  ];
  const GIFT_COLS = [['#ff8fbd', '#ff5c9a', '#fff'], ['#b89cff', '#9b7bff', '#ffd166'], ['#7fdcff', '#4cc3f0', '#ff5c9a'], ['#ffd166', '#ffbf3c', '#ff5c9a'], ['#8ee6b0', '#5fd18f', '#fff'], ['#ffb46b', '#ff9a3c', '#fff']];
  const giftGrid = $('#gift-grid'), giftDlg = $('#gift-dlg');
  const openedGifts = new Set(store.get('alesha-gifts', []).filter(n => n >= 1 && n <= 33));
  GIFTS.forEach((_, i) => {
    const n = i + 1, [c, c2, rib] = GIFT_COLS[i % GIFT_COLS.length];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'gift';
    b.dataset.n = n;
    b.style.setProperty('--c', c); b.style.setProperty('--c2', c2); b.style.setProperty('--rib', rib);
    b.innerHTML = `<span class="g-box"></span><span class="g-lid"></span><span class="g-num">${n}</span>`;
    b.addEventListener('click', () => openGift(n));
    giftGrid.appendChild(b);
  });
  function refreshGifts() {
    $$('.gift', giftGrid).forEach(b => {
      const n = Number(b.dataset.n), on = openedGifts.has(n);
      b.classList.toggle('opened', on);
      b.setAttribute('aria-label', `Surprise ${n}${on ? ', opened' : ''}`);
    });
    $('#gift-n').textContent = openedGifts.size;
    $('#gift-fill').style.width = (openedGifts.size / 33 * 100) + '%';
    $('#all-open').hidden = openedGifts.size < 33;
    $('#gift-next').hidden = openedGifts.size >= 33;
    store.set('alesha-gifts', [...openedGifts]);
  }
  function openGift(n) {
    const b = $(`.gift[data-n="${n}"]`, giftGrid);
    b.classList.remove('shaking'); void b.offsetWidth; b.classList.add('shaking');
    sfx.chime();
    setTimeout(() => {
      const wasNew = !openedGifts.has(n);
      openedGifts.add(n);
      refreshGifts();
      const [emo, title, msg] = GIFTS[n - 1];
      $('#gift-num').textContent = `Surprise ${n} of 33`;
      $('#gift-emoji').textContent = emo;
      $('#gift-title').textContent = title;
      $('#gift-msg').textContent = msg;
      openDialog(giftDlg);
      const [x, y] = centerOf($('.dlg-card', giftDlg));
      FX.burstAt(x, y - 80, { n: 50, speed: 3.6 });
      if (wasNew && openedGifts.size === 33) setTimeout(() => FX.celebrate(1.5), 400);
    }, reduced() ? 0 : 420);
  }
  const randomUnopened = () => { const left = []; for (let n = 1; n <= 33; n++) if (!openedGifts.has(n)) left.push(n); return left.length ? pick(left) : 1 + Math.floor(Math.random() * 33); };
  $('#gift-random').addEventListener('click', () => openGift(randomUnopened()));
  $('#gift-next').addEventListener('click', () => { closeDialog(giftDlg); setTimeout(() => openGift(randomUnopened()), 150); });
  refreshGifts();

  /* ================= cake ================= */
  const cakeBtn = $('#cake-btn'), cakeMsg = $('#cake-msg'), hbLine = $('#hb-line'), relight = $('#relight-btn');
  (function buildCandles() {
    const g = $('#candles'), cols = ['#7fdcff', '#ff8fbd', '#b89cff', '#ffd166', '#8ee6b0'];
    let html = '<defs><radialGradient id="g-flame" cx="50%" cy="65%" r="60%"><stop offset="0" stop-color="#fff8d6"/><stop offset=".5" stop-color="#ffd166"/><stop offset="1" stop-color="#ff8a3c"/></radialGradient><radialGradient id="g-glow"><stop offset="0" stop-color="#ffd98a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient></defs>';
    let n = 0;
    [[148, 10, 108], [168, 11, 136], [190, 12, 112]].forEach(([y, count, hw]) => {
      for (let i = 0; i < count; i++) {
        const x = 200 - hw + (2 * hw * i) / (count - 1), top = y - 30, c = cols[n % cols.length];
        const d = (-Math.random()).toFixed(2), o = (Math.random() * .7).toFixed(2);
        html += `<g class="candle" style="--d:${d}s;--o:${o}s">
          <rect x="${x - 3.5}" y="${top}" width="7" height="30" rx="2" fill="${c}"/>
          <path d="M${x - 3.5} ${top + 8}l7-4M${x - 3.5} ${top + 17}l7-4M${x - 3.5} ${top + 26}l7-4" stroke="#fff" stroke-width="2" opacity=".7"/>
          <line x1="${x}" y1="${top}" x2="${x}" y2="${top - 4}" stroke="#4a3a5a" stroke-width="1.5"/>
          <circle class="glow" cx="${x}" cy="${top - 11}" r="15" fill="url(#g-glow)"/>
          <path class="flame" d="M${x} ${top - 23}c5 7 7 11 7 14a7 7 0 0 1-14 0c0-3 2-7 7-14z" fill="url(#g-flame)"/>
          <path class="smoke" d="M${x} ${top - 5}q-6-9 0-18t0-18"/>
        </g>`;
        n++;
      }
    });
    g.innerHTML = html;
  })();
  let blown = false;
  function blowOut() {
    if (blown) return;
    blown = true;
    cakeBtn.classList.add('out');
    sfx.pop();
    cakeMsg.textContent = 'Poof! 🌬️';
    setTimeout(() => {
      FX.celebrate(1.6);
      cakeMsg.textContent = 'Yaaay! 🎉 Your wish is on its way to the stars. (I hope it\'s about me 🙈)';
      relight.hidden = false;
    }, reduced() ? 0 : 900);
  }
  cakeBtn.addEventListener('click', () => { if (blown) { toast('Relight the candles first 🕯️'); return; } blowOut(); });
  relight.addEventListener('click', () => {
    blown = false;
    cakeBtn.classList.remove('out');
    relight.hidden = true;
    cakeMsg.textContent = 'Candles relit. Make another wish 🕯️✨';
  });
  $('#sing-btn').addEventListener('click', async e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    if (blown) relight.click();
    cakeMsg.textContent = '';
    const ok = await LoveSong.birthday((txt) => {
      hbLine.textContent = txt;
      hbLine.classList.remove('swap'); void hbLine.offsetWidth; hbLine.classList.add('swap');
      const [x, y] = centerOf(hbLine);
      sprinkle(x, y, ['🎵', '🎶', '💗', '✨'], 6, 120);
    });
    btn.disabled = false;
    hbLine.textContent = ok ? 'Now close your eyes… make a wish… and blow! 🌬️' : '';
    if (!ok) toast('Tap the heart at the top to turn the music on first 🎵');
  });
  $('#mic-btn').addEventListener('click', async e => {
    const btn = e.currentTarget;
    if (blown) relight.click();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { cakeMsg.textContent = 'No microphone here — just tap the cake to blow 😊'; return; }
    btn.disabled = true;
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (err) {
      btn.disabled = false;
      cakeMsg.textContent = 'No mic? No problem — just tap the cake to blow 😊';
      return;
    }
    let ctx = LoveSong.context(), own = false;
    if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; ctx = new AC(); own = true; }
    if (ctx.state !== 'running') await ctx.resume().catch(() => {});
    const src = ctx.createMediaStreamSource(stream), an = ctx.createAnalyser();
    an.fftSize = 1024;
    src.connect(an);
    const data = new Float32Array(an.fftSize), meter = $('#mic-meter'), level = $('#mic-level');
    meter.hidden = false;
    cakeMsg.textContent = 'Make a wish… now blow! 🌬️';
    let loud = 0;
    const t0 = performance.now();
    const stop = () => { stream.getTracks().forEach(t => t.stop()); src.disconnect(); meter.hidden = true; btn.disabled = false; if (own) ctx.close(); };
    (function listen() {
      an.getFloatTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
      const rms = Math.sqrt(sum / data.length);
      level.style.width = Math.min(100, rms * 500) + '%';
      loud = rms > .11 ? loud + 1 : Math.max(0, loud - 1);
      if (loud > 7) { stop(); blowOut(); return; }
      if (performance.now() - t0 > 15000) { stop(); cakeMsg.textContent = 'I couldn\'t hear you — blow harder, or just tap the cake 😄'; return; }
      requestAnimationFrame(listen);
    })();
  });

  /* ================= letter ================= */
  const envelope = $('#envelope'), letter = $('#love-letter');
  envelope.addEventListener('click', () => {
    if (envelope.classList.contains('open')) { letter.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); return; }
    envelope.classList.add('open');
    envelope.setAttribute('aria-expanded', 'true');
    const [x, y] = centerOf(envelope);
    sprinkle(x, y, ['💗', '💌', '💋', '✨'], 14, 160);
    sfx.chime();
    setTimeout(() => {
      letter.hidden = false;
      letter.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    }, reduced() ? 0 : 900);
  });

  /* ================= finale ================= */
  $('#wish-btn').addEventListener('click', () => {
    FX.celebrate(2.2);
    sfx.chime();
    setTimeout(() => { openDialog($('#wish-dlg')); FX.celebrate(1); }, reduced() ? 0 : 1600);
  });
  $('#wish-more').addEventListener('click', () => FX.celebrate(1.6));
  $('#replay-btn').addEventListener('click', () => {
    try { history.scrollRestoration = 'manual'; } catch (e) { /* ignore */ }
    window.scrollTo(0, 0);
    location.reload();
  });

  /* ================= peekaboo panda ================= */
  const peek = $('#peek');
  let peekTimer = 0;
  function schedulePeek() {
    clearTimeout(peekTimer);
    peekTimer = setTimeout(() => {
      if (document.querySelector('dialog[open]') || document.hidden) { schedulePeek(); return; }
      peek.hidden = false;
      requestAnimationFrame(() => peek.classList.add('show'));
      setTimeout(() => { peek.classList.remove('show'); schedulePeek(); }, 4500);
    }, rand(28000, 50000));
  }
  peek.addEventListener('click', () => {
    const [x, y] = centerOf(peek);
    sprinkle(x, y, ['💋', '💗', '😘'], 10, 120);
    toast('💋 Mwah! A kiss from a shy panda');
    peek.classList.remove('show');
  });

  /* ================= universe setup (after the gate) ================= */
  let universeReady = false;
  function initUniverse() {
    if (universeReady) return;
    universeReady = true;
    new FX.Sky($('#hero-sky'), { stars: 160, shooting: true, fireworks: 1 });
    new FX.Sky($('#cake-sky'), { stars: 90, shooting: true });
    new FX.Sky($('#finale-sky'), { stars: 200, shooting: true, fireworks: .7 });
    setupBalloons();
    setupReveal();
    setupSectionPause();
    setupNav();
    setLine(-1);
    requestAnimationFrame(syncLoop);
    schedulePeek();
    const fontsReady = document.fonts && document.fonts.load ? Promise.race([Promise.all([document.fonts.load('100px "Great Vibes"'), document.fonts.load('700 100px Fredoka')]), new Promise(r => setTimeout(r, 2500))]) : Promise.resolve();
    fontsReady.then(() => {
      new FX.Words($('#words'), [
        { text: 'Happy Birthday', font: 'Fredoka, sans-serif', weight: 700, size: .36 },
        { text: 'Alesha', font: '"Great Vibes", cursive', size: .62 },
        { heart: true },
        { text: 'Ich liebe dich', font: '"Great Vibes", cursive', size: .5 },
        { text: 'Bis bald', font: '"Great Vibes", cursive', size: .55 }
      ]);
    });
  }

  function setupReveal() {
    const els = $$('.reveal');
    if (reduced() || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const ob = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); ob.unobserve(en.target); } }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    els.forEach(e => ob.observe(e));
  }

  function setupSectionPause() {
    const ob = new IntersectionObserver(es => es.forEach(en => en.target.classList.toggle('paused', !en.isIntersecting)), { rootMargin: '150px 0px' });
    $$('.sec').forEach(s => ob.observe(s));
  }

  function setupNav() {
    const menuBtn = $('#menu-btn'), menu = $('#menu'), fill = $('#progress-fill');
    const close = () => { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); };
    menuBtn.addEventListener('click', e => { e.stopPropagation(); const open = menu.hidden; menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); });
    menu.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('#menu, #menu-btn')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { close(); menuBtn.focus(); } });
    const links = new Map($$('a', menu).map(a => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver(es => es.forEach(en => {
      const a = links.get(en.target.id);
      if (a && en.isIntersecting) { links.forEach(l => l.removeAttribute('aria-current')); a.setAttribute('aria-current', 'true'); }
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
    let ticking = false;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + '%';
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * .6 - r.top) / r.height));
      tlFill.style.transform = `scaleY(${p.toFixed(3)})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }

  /* tiny hearts wherever she taps */
  let lastTap = 0;
  document.addEventListener('pointerdown', e => {
    const now = performance.now();
    if (now - lastTap < 110 || e.target.closest('input, textarea, #words')) return;
    lastTap = now;
    sprinkle(e.clientX, e.clientY, ['💗', '💕', '✨', '💖'], 5, 50);
  }, { passive: true });
})();
