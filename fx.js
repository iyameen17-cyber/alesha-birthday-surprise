/* fx.js — canvas magic: starry skies, shooting stars, heart fireworks, confetti and particle words */
window.FX = (() => {
  'use strict';
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const COLORS = ['#ff5c9a', '#ffd166', '#ffffff', '#b89cff', '#7fdcff', '#ff9fc8', '#ffb46b', '#ff7aa8'];
  const TAU = Math.PI * 2;

  function fit(canvas) {
    const r = canvas.getBoundingClientRect(), d = DPR();
    const w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    canvas.getContext('2d').setTransform(d, 0, 0, d, 0, 0);
    return { w: r.width, h: r.height };
  }

  function heartPath(ctx, cx, cy, s) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + s * .35);
    ctx.bezierCurveTo(cx - s * 1.1, cy - s * .35, cx - s * .45, cy - s * 1.05, cx, cy - s * .45);
    ctx.bezierCurveTo(cx + s * .45, cy - s * 1.05, cx + s * 1.1, cy - s * .35, cx, cy + s * .35);
    ctx.closePath();
  }

  /* ---------- Sky: stars + shooting stars + fireworks + confetti ---------- */
  class Sky {
    constructor(canvas, opts = {}) {
      this.c = canvas;
      this.x = canvas.getContext('2d');
      this.o = Object.assign({ stars: 140, shooting: true, fireworks: 0 }, opts);
      this.parts = [];
      this.pending = [];
      this.shoot = [];
      this.visible = false;
      this.running = false;
      this.nextFw = 0;
      this.nextShoot = 0;
      this.resize();
      if ('ResizeObserver' in window) new ResizeObserver(() => this.resize()).observe(canvas);
      else window.addEventListener('resize', () => this.resize());
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(es => { this.visible = es[es.length - 1].isIntersecting; if (this.visible) this.kick(); }).observe(canvas);
      } else { this.visible = true; this.kick(); }
    }
    get ambient() { return this.o.stars > 0 || this.o.shooting || this.o.fireworks > 0; }
    resize() {
      const s = fit(this.c);
      this.w = s.w; this.h = s.h;
      const n = this.o.stars ? Math.round(this.o.stars * Math.min(1.5, Math.max(.45, (this.w * this.h) / (1280 * 800)))) : 0;
      this.stars = Array.from({ length: n }, () => ({ x: Math.random() * this.w, y: Math.random() * this.h, r: rand(.35, 1.7), p: rand(0, TAU), s: rand(.5, 2.2), gold: Math.random() < .12 }));
    }
    kick() {
      if (this.running) return;
      this.running = true;
      this.last = performance.now();
      requestAnimationFrame(t => this.loop(t));
    }
    loop(t) {
      const dt = Math.min(48, t - this.last) / 16.67;
      this.last = t;
      this.draw(t, dt);
      if ((this.visible && this.ambient) || this.parts.length || this.shoot.length) requestAnimationFrame(tt => this.loop(tt));
      else { this.running = false; this.x.clearRect(0, 0, this.w, this.h); }
    }
    draw(t, dt) {
      const x = this.x;
      x.clearRect(0, 0, this.w, this.h);
      const calm = reduced();
      for (const s of this.stars) {
        const a = calm ? .7 : .25 + .75 * (.5 + .5 * Math.sin(t / 1000 * s.s + s.p));
        x.globalAlpha = a;
        x.fillStyle = s.gold ? '#ffe7a3' : '#ffffff';
        x.beginPath(); x.arc(s.x, s.y, s.r, 0, TAU); x.fill();
      }
      x.globalAlpha = 1;
      if (this.o.shooting && this.visible && !calm && t > this.nextShoot) {
        const dir = Math.random() < .5 ? -1 : 1;
        this.shoot.push({ x: rand(this.w * .15, this.w * .85), y: rand(0, this.h * .35), vx: rand(7, 11) * dir, vy: rand(2.5, 4.5), life: 1 });
        this.nextShoot = t + rand(2200, 5200);
      }
      this.shoot = this.shoot.filter(s => {
        s.x += s.vx * dt; s.y += s.vy * dt; s.life -= .02 * dt;
        if (s.life <= 0) return false;
        const tx = s.x - s.vx * 14, ty = s.y - s.vy * 14;
        const g = x.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`); g.addColorStop(1, 'rgba(255,255,255,0)');
        x.strokeStyle = g; x.lineWidth = 2; x.lineCap = 'round';
        x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(tx, ty); x.stroke();
        return true;
      });
      if (this.o.fireworks && this.visible && !calm && t > this.nextFw) {
        this.launch();
        this.nextFw = t + rand(1100, 2600) / this.o.fireworks;
      }
      this.step(dt);
    }
    launch(px) {
      const ty = rand(this.h * .1, this.h * .42);
      const G = .07;
      this.parts.push({ k: 'rocket', x: px ?? rand(this.w * .12, this.w * .88), y: this.h + 5, vx: rand(-.5, .5), vy: -Math.sqrt(2 * G * 2 * (this.h - ty)) * rand(.96, 1.04), col: pick(COLORS) });
      this.kick();
    }
    burst(px, py, opts = {}) {
      const heart = opts.heart ?? Math.random() < .4;
      const n = opts.n || (heart ? 64 : 80), col = opts.col || pick(COLORS), col2 = pick(COLORS);
      const sp = (opts.speed || rand(3, 4.6)) * Math.min(1.3, Math.max(.7, this.w / 900));
      for (let i = 0; i < n; i++) {
        let vx, vy;
        if (heart) {
          const a = (i / n) * TAU;
          vx = 16 * Math.pow(Math.sin(a), 3);
          vy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
          vx *= sp / 15; vy *= sp / 15;
        } else {
          const a = rand(0, TAU), s = rand(.25, 1) * sp;
          vx = Math.cos(a) * s; vy = Math.sin(a) * s;
        }
        this.parts.push({ k: 'spark', x: px, y: py, vx, vy, life: 1, decay: rand(.009, .016), col: Math.random() < .75 ? col : col2, r: rand(1.1, 2.3) });
      }
      if (this.parts.length > 1600) this.parts.splice(0, this.parts.length - 1600);
      this.kick();
    }
    confetti(n = 150) {
      for (let i = 0; i < n; i++) {
        this.parts.push({ k: 'conf', x: rand(0, this.w), y: rand(-this.h * .5, -10), vx: rand(-1.2, 1.2), vy: rand(1.6, 3.6), life: 1, decay: rand(.0025, .005), col: pick(COLORS), r: rand(4, 8), rot: rand(0, TAU), vr: rand(-.15, .15), heart: Math.random() < .35 });
      }
      this.kick();
    }
    step(dt) {
      const x = this.x, G = .07;
      x.globalCompositeOperation = 'lighter';
      const keep = [];
      for (const p of this.parts) {
        if (p.k === 'rocket') {
          p.x += p.vx * dt; p.y += p.vy * dt; p.vy += G * 2 * dt;
          x.globalAlpha = .9; x.fillStyle = '#fff6d6';
          x.beginPath(); x.arc(p.x, p.y, 2, 0, TAU); x.fill();
          x.globalAlpha = .35; x.fillStyle = p.col;
          x.beginPath(); x.arc(p.x - p.vx, p.y - p.vy * 1.5, 1.6, 0, TAU); x.fill();
          if (p.vy >= -.4) this.pending.push([p.x, p.y, p.col]); else keep.push(p);
        } else if (p.k === 'spark') {
          p.vx *= .984; p.vy = p.vy * .984 + G * .5 * dt;
          p.x += p.vx * dt; p.y += p.vy * dt; p.life -= p.decay * dt;
          if (p.life <= 0) continue;
          x.globalAlpha = Math.min(1, p.life * 1.3);
          x.fillStyle = p.col;
          x.beginPath(); x.arc(p.x, p.y, p.r * (.6 + p.life * .5), 0, TAU); x.fill();
          keep.push(p);
        } else keep.push(p);
      }
      x.globalCompositeOperation = 'source-over';
      const out = [];
      for (const p of keep) {
        if (p.k !== 'conf') { out.push(p); continue; }
        p.x += (p.vx + Math.sin(p.rot) * .7) * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.life -= p.decay * dt;
        if (p.life <= 0 || p.y > this.h + 20) continue;
        x.globalAlpha = Math.min(1, p.life * 2);
        x.fillStyle = p.col;
        x.save(); x.translate(p.x, p.y); x.rotate(p.rot);
        if (p.heart) { heartPath(x, 0, 0, p.r * 1.1); x.fill(); }
        else { x.scale(1, Math.cos(p.rot * 2) * .8 + .2); x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); }
        x.restore();
        out.push(p);
      }
      x.globalAlpha = 1;
      this.parts = out;
      if (this.pending.length) { const pend = this.pending; this.pending = []; pend.forEach(([a, b, c]) => this.burst(a, b, { col: c })); }
    }
  }

  /* ---------- Words made of glowing particles ---------- */
  class Words {
    constructor(canvas, items, opts = {}) {
      this.c = canvas;
      this.x = canvas.getContext('2d');
      this.items = items;
      this.o = Object.assign({ hold: 4200 }, opts);
      this.parts = [];
      this.i = -1;
      this.mouse = { x: -9999, y: -9999 };
      this.visible = false;
      this.running = false;
      this.resize();
      const move = e => { const r = this.c.getBoundingClientRect(); this.mouse.x = e.clientX - r.left; this.mouse.y = e.clientY - r.top; };
      canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerdown', move);
      canvas.addEventListener('pointerleave', () => { this.mouse.x = this.mouse.y = -9999; });
      if ('ResizeObserver' in window) new ResizeObserver(() => { const old = this.w; this.resize(); if (old !== this.w && this.i >= 0) this.show(this.i); }).observe(canvas);
      new IntersectionObserver(es => {
        this.visible = es[es.length - 1].isIntersecting;
        if (this.visible) { if (this.i < 0) this.next(); this.kick(); this.schedule(); }
        else clearTimeout(this.timer);
      }, { threshold: .25 }).observe(canvas);
    }
    resize() { const s = fit(this.c); this.w = s.w; this.h = s.h; }
    schedule() { clearTimeout(this.timer); this.timer = setTimeout(() => { if (this.visible) { this.next(); this.schedule(); } }, this.o.hold); }
    next() { this.show((this.i + 1) % this.items.length); }
    targets(item) {
      const w = Math.max(1, Math.floor(this.w)), h = Math.max(1, Math.floor(this.h));
      const off = document.createElement('canvas'); off.width = w; off.height = h;
      const o = off.getContext('2d');
      o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle';
      if (item.heart) {
        const s = Math.min(w, h) * .36;
        heartPath(o, w / 2, h / 2 + s * .25, s);
        o.fill();
      } else {
        let size = Math.min(h * (item.size || .42), 220);
        o.font = `${item.weight || ''} ${size}px ${item.font}`;
        while (o.measureText(item.text).width > w * .9 && size > 12) { size -= 2; o.font = `${item.weight || ''} ${size}px ${item.font}`; }
        o.fillText(item.text, w / 2, h / 2);
      }
      const data = o.getImageData(0, 0, w, h).data, gap = w < 520 ? 4 : 5, pts = [];
      for (let y = 0; y < h; y += gap) for (let xx = 0; xx < w; xx += gap) if (data[(y * w + xx) * 4 + 3] > 140) pts.push([xx, y]);
      for (let i = pts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pts[i], pts[j]] = [pts[j], pts[i]]; }
      return pts.slice(0, 3200);
    }
    show(i) {
      this.i = i;
      const pts = this.targets(this.items[i]);
      const n = Math.max(this.parts.length, pts.length);
      for (let k = 0; k < n; k++) {
        let p = this.parts[k];
        if (!p) { p = { x: rand(0, this.w), y: rand(0, this.h), vx: 0, vy: 0, a: 0, hue: Math.random() }; this.parts.push(p); }
        if (k < pts.length) { p.tx = pts[k][0]; p.ty = pts[k][1]; p.free = false; }
        else { p.free = true; p.tx = rand(0, this.w); p.ty = rand(0, this.h); }
      }
      this.kick();
    }
    kick() {
      if (this.running) return;
      this.running = true;
      requestAnimationFrame(() => this.loop());
    }
    loop() {
      const x = this.x, calm = reduced();
      x.clearRect(0, 0, this.w, this.h);
      x.globalCompositeOperation = 'lighter';
      const t = performance.now() / 1000;
      for (const p of this.parts) {
        const dx = p.tx - p.x, dy = p.ty - p.y;
        p.vx = (p.vx + dx * (calm ? .2 : .016)) * .86;
        p.vy = (p.vy + dy * (calm ? .2 : .016)) * .86;
        const mx = p.x - this.mouse.x, my = p.y - this.mouse.y, md = mx * mx + my * my;
        if (md < 6400 && md > .1) { const f = (6400 - md) / 6400 * 6; const d = Math.sqrt(md); p.vx += mx / d * f; p.vy += my / d * f; }
        p.x += p.vx; p.y += p.vy;
        p.a += ((p.free ? 0 : 1) - p.a) * .05;
        if (p.a < .02) continue;
        const tw = .75 + .25 * Math.sin(t * 3 + p.hue * 20);
        x.globalAlpha = p.a * tw;
        x.fillStyle = p.hue < .55 ? '#ff6fa8' : p.hue < .85 ? '#ffd27a' : '#ffffff';
        x.beginPath(); x.arc(p.x, p.y, p.hue < .85 ? 1.9 : 1.4, 0, TAU); x.fill();
      }
      x.globalAlpha = 1;
      x.globalCompositeOperation = 'source-over';
      if (this.visible) requestAnimationFrame(() => this.loop()); else this.running = false;
    }
  }

  /* ---------- the full-screen overlay used for celebrations ---------- */
  let overlay = null;
  function getOverlay() {
    if (!overlay) {
      const c = document.getElementById('fx-canvas');
      if (!c) return null;
      overlay = new Sky(c, { stars: 0, shooting: false, fireworks: 0 });
      overlay.visible = true;
    }
    return overlay;
  }
  function celebrate(level = 1) {
    const o = getOverlay();
    if (!o) return;
    if (reduced()) { o.confetti(40); return; }
    o.confetti(Math.round(110 * level));
    const shots = Math.round(5 * level);
    for (let i = 0; i < shots; i++) setTimeout(() => o.launch(rand(o.w * .15, o.w * .85)), i * 280);
  }
  function burstAt(cx, cy, opts) {
    const o = getOverlay();
    if (o) o.burst(cx, cy, Object.assign({ heart: true, n: 54, speed: 3.4 }, opts));
  }
  function confetti(n) { const o = getOverlay(); if (o) o.confetti(n); }

  return { Sky, Words, celebrate, burstAt, confetti };
})();
