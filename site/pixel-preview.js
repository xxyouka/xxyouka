/* V3: pixel-transition preview + pointer spotlight (vanilla, hover-capable only) */
(() => {
  const visuals = $$('.project .visual[data-project]');
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!visuals.length || !canHover || reduced) return;
  const COLS = 34, ROWS = 22;
  const accents = { ninth: '#94e2d5', cat: '#fab387', pet: '#cba6f7', meal: '#f9e2af' };
  const twoShots = new Set(['ninth', 'cat', 'meal']);

  const roundRect = (c, x, y, w, h, r) => {
    const rr = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + rr, y);
    c.arcTo(x + w, y, x + w, y + h, rr);
    c.arcTo(x + w, y + h, x, y + h, rr);
    c.arcTo(x, y + h, x, y, rr);
    c.arcTo(x, y, x + w, y, rr);
    c.closePath();
  };

  visuals.forEach(el => {
    const key = el.dataset.project;
    const shots = (caseNotes[key]?.images || []).slice(0, twoShots.has(key) ? 2 : 1).map(item => item[0]);
    if (!shots.length) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'pixel-preview';
    canvas.setAttribute('aria-hidden', 'true');
    const scrim = document.createElement('span');
    scrim.className = 'hover-scrim';
    scrim.setAttribute('aria-hidden', 'true');
    const spot = document.createElement('span');
    spot.className = 'spotlight';
    spot.setAttribute('aria-hidden', 'true');
    el.append(canvas, scrim, spot);
    el.classList.add('preview-ready');
    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d');
    const images = shots.map(src => ({ el: new Image(), ok: false, src }));
    let ready = false, loading = false, settled = 0;
    let cw = 0, ch = 0, raf = 0, cells = [], full = false, pending = null;
    const accent = accents[key] || '#cba6f7';
    spot.style.setProperty('--spot', accent + '2b');

    function load() {
      if (loading || ready) return;
      loading = true;
      images.forEach(state => {
        state.el.decoding = 'async';
        const done = () => {
          state.ok = true;
          if (++settled === images.length) {
            ready = true;
            loading = false;
            resize();
            if (pending) { const p = pending; pending = null; start(p.x, p.y); }
          }
        };
        state.el.onload = done;
        state.el.onerror = done;
        state.el.src = state.src;
      });
    }

    function drawFrame(state, cx, cy, maxW, maxH, angle) {
      if (!state.ok) return;
      const im = state.el;
      const ia = im.naturalWidth / im.naturalHeight;
      let iw, ih;
      if (ia > maxW / maxH) { iw = maxW; ih = iw / ia; }
      else { ih = maxH; iw = ih * ia; }
      const pad = Math.max(4, Math.round(cw * 0.012));
      const fw = iw + pad * 2, fh = ih + pad * 2;
      offCtx.save();
      offCtx.translate(cx, cy);
      offCtx.rotate(angle);
      offCtx.shadowColor = 'rgba(0,0,0,.55)';
      offCtx.shadowBlur = Math.round(cw * 0.04);
      offCtx.shadowOffsetY = Math.round(cw * 0.012);
      offCtx.fillStyle = '#0b0b12';
      roundRect(offCtx, -fw / 2, -fh / 2, fw, fh, pad * 1.6);
      offCtx.fill();
      offCtx.shadowColor = 'transparent';
      offCtx.strokeStyle = accent + '4d';
      offCtx.lineWidth = Math.max(1, cw / 1000);
      roundRect(offCtx, -fw / 2, -fh / 2, fw, fh, pad * 1.6);
      offCtx.stroke();
      offCtx.save();
      roundRect(offCtx, -iw / 2, -ih / 2, iw, ih, pad * 1.1);
      offCtx.clip();
      offCtx.drawImage(im, -iw / 2, -ih / 2, iw, ih);
      offCtx.restore();
      offCtx.restore();
    }

    function source() {
      if (!ready) return;
      off.width = cw;
      off.height = ch;
      const W = cw, H = ch;
      offCtx.fillStyle = '#11111b';
      offCtx.fillRect(0, 0, W, H);
      if (images[0].ok) {
        const im = images[0].el;
        const ia = im.naturalWidth / im.naturalHeight;
        const ca = W / H;
        let sw, sh, sx = 0;
        if (ia > ca) { sh = im.naturalHeight; sw = sh * ca; sx = (im.naturalWidth - sw) / 2; }
        else { sw = im.naturalWidth; sh = sw / ca; }
        offCtx.globalAlpha = 0.14;
        offCtx.drawImage(im, sx, 0, sw, sh, 0, 0, W, H);
        offCtx.globalAlpha = 1;
        offCtx.fillStyle = 'rgba(17,17,27,.68)';
        offCtx.fillRect(0, 0, W, H);
      }
      const glow = offCtx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.68);
      glow.addColorStop(0, accent + '26');
      glow.addColorStop(1, accent + '00');
      offCtx.fillStyle = glow;
      offCtx.fillRect(0, 0, W, H);
      const gap = Math.max(10, Math.round(W / 46));
      const dot = Math.max(0.5, gap * 0.04);
      offCtx.fillStyle = 'rgba(186,194,222,.10)';
      for (let y = gap; y < H; y += gap) {
        for (let x = gap; x < W; x += gap) {
          offCtx.beginPath();
          offCtx.arc(x, y, dot, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
      if (images.length > 1) {
        drawFrame(images[0], W * 0.38, H * 0.51, W * 0.46, H * 0.7, -2.5 * Math.PI / 180);
        drawFrame(images[1], W * 0.67, H * 0.55, W * 0.42, H * 0.6, 3.5 * Math.PI / 180);
      } else {
        drawFrame(images[0], W * 0.5, H * 0.5, W * 0.54, H * 0.72, -1.5 * Math.PI / 180);
      }
    }

    function resize() {
      if (!ready) return;
      const r = el.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const nw = Math.max(1, Math.round(r.width * dpr));
      const nh = Math.max(1, Math.round(r.height * dpr));
      if (nw === cw && nh === ch) return;
      cw = nw; ch = nh;
      canvas.width = cw; canvas.height = ch;
      source();
      if (full) { ctx.clearRect(0, 0, cw, ch); ctx.drawImage(off, 0, 0); }
    }

    function block(c) {
      const x0 = Math.floor(c.x * cw / COLS), x1 = Math.floor((c.x + 1) * cw / COLS);
      const y0 = Math.floor(c.y * ch / ROWS), y1 = Math.floor((c.y + 1) * ch / ROWS);
      ctx.drawImage(off, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0);
    }

    function makeCells(ox, oy) {
      const list = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const nx = (x + 0.5) / COLS, ny = (y + 0.5) / ROWS;
          const d = Math.hypot(nx - ox, ny - oy);
          list.push({ x, y, t: Math.min(0.94, d * 0.78 + Math.random() * 0.12), done: false, cleared: false });
        }
      }
      return list.sort((a, b) => a.t - b.t);
    }

    function start(ox, oy) {
      if (!ready) { pending = { x: ox, y: oy }; load(); return; }
      cancelAnimationFrame(raf);
      resize();
      if (!cw || !ch) return;
      ctx.clearRect(0, 0, cw, ch);
      full = false;
      cells = makeCells(ox, oy);
      const t0 = performance.now(), dur = 640;
      function frame(now) {
        const t = Math.min(1, (now - t0) / dur);
        for (const c of cells) {
          if (!c.done && c.t <= t) { block(c); c.done = true; }
        }
        if (t < 1) raf = requestAnimationFrame(frame);
        else { ctx.clearRect(0, 0, cw, ch); ctx.drawImage(off, 0, 0); full = true; }
      }
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      pending = null;
      if (!ready || !cw) return;
      if (!cells.length) { ctx.clearRect(0, 0, cw, ch); full = false; return; }
      const t0 = performance.now(), dur = 300;
      const list = cells.slice().reverse();
      function frame(now) {
        const t = Math.min(1, (now - t0) / dur);
        for (const c of list) {
          if (!c.cleared && (1 - c.t) <= t) {
            const x0 = Math.floor(c.x * cw / COLS), x1 = Math.floor((c.x + 1) * cw / COLS);
            const y0 = Math.floor(c.y * ch / ROWS), y1 = Math.floor((c.y + 1) * ch / ROWS);
            ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
            c.cleared = true;
          }
        }
        if (t < 1) raf = requestAnimationFrame(frame);
        else { ctx.clearRect(0, 0, cw, ch); full = false; }
      }
      raf = requestAnimationFrame(frame);
    }

    function place(e) {
      const r = el.getBoundingClientRect();
      return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    }

    el.addEventListener('pointerenter', e => {
      const r = el.getBoundingClientRect();
      spot.style.setProperty('--sx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--sy', `${e.clientY - r.top}px`);
      const p = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      if (!ready) { pending = p; load(); } else start(p.x, p.y);
    });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      spot.style.setProperty('--sx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--sy', `${e.clientY - r.top}px`);
      if (!ready && pending) pending = place(e);
    }, { passive: true });
    el.addEventListener('pointerleave', stop);
    el.addEventListener('pointercancel', stop);
    el.addEventListener('focus', () => {
      if (!el.matches(':focus-visible')) return;
      if (!ready) { pending = { x: 0.5, y: 0.5 }; load(); } else start(0.5, 0.5);
    });
    el.addEventListener('blur', stop);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(el);
  });
})();