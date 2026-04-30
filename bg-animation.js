/**
 * Particle Network Background — Monochrome
 * Interactive: partikel merespons posisi mouse
 */
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '0', pointerEvents: 'none',
    opacity: '1',
  });
  document.body.insertBefore(canvas, document.body.firstChild);

  /* pastikan konten di atas canvas */
  const style = document.createElement('style');
  style.textContent = `
    #particle-canvas { display: block; }
    .navbar-wrapper, main, section, footer, .hero {
      position: relative;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  const ctx = canvas.getContext('2d');
  let W, H, particles, mouse = { x: -9999, y: -9999 };

  /* ── Config ── */
  const CFG = {
    count: 90,
    maxDist: 130,
    mouseRadius: 160,
    speed: 0.45,
    dotMin: 1.5,
    dotMax: 3,
  };

  function isLight() {
    return document.body.classList.contains('light-mode');
  }

  function getColors() {
    return isLight()
      ? { bg: 'rgba(242,244,246,0)', dot: 'rgba(80,80,90,', line: 'rgba(80,80,90,' }
      : { bg: 'rgba(10,12,18,0)',    dot: 'rgba(200,205,215,', line: 'rgba(200,205,215,' };
  }

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Particle class ── */
  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * CFG.speed;
    this.vy = (Math.random() - 0.5) * CFG.speed;
    this.r  = CFG.dotMin + Math.random() * (CFG.dotMax - CFG.dotMin);
    this.baseAlpha = 0.35 + Math.random() * 0.45;
  }

  Particle.prototype.update = function () {
    /* mouse repel */
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < CFG.mouseRadius) {
      const force = (CFG.mouseRadius - dist) / CFG.mouseRadius * 0.6;
      this.x += (dx / dist) * force * 3;
      this.y += (dy / dist) * force * 3;
    }
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -20) this.x = W + 20;
    if (this.x > W + 20) this.x = -20;
    if (this.y < -20) this.y = H + 20;
    if (this.y > H + 20) this.y = -20;
  };

  /* ── Init particles ── */
  function init() {
    resize();
    particles = Array.from({ length: CFG.count }, () => new Particle());
  }

  /* ── Draw ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const C = getColors();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();

      /* dot */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = C.dot + p.baseAlpha + ')';
      ctx.fill();

      /* lines to neighbours */
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CFG.maxDist) {
          const alpha = (1 - d / CFG.maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = C.line + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      /* line to mouse */
      const mx = p.x - mouse.x, my = p.y - mouse.y;
      const md = Math.sqrt(mx * mx + my * my);
      if (md < CFG.mouseRadius) {
        const alpha = (1 - md / CFG.mouseRadius) * 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = C.line + alpha + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  /* ── Events ── */
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  /* touch */
  window.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', () => { mouse.x = -9999; mouse.y = -9999; });

  /* ── Start ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); draw(); });
  } else {
    init(); draw();
  }
})();
