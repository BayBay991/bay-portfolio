/**
 * intro-animation.js
 * BAY Portfolio - Landing Page Intro Animation
 * Level B: Text reveal + particles + glitch effect → smooth exit
 */

(function () {
    'use strict';

    const DURATION      = 3600;   // ms to display before auto-exit
    const GLITCH_DELAY  = 1400;   // ms after reveal before glitch starts
    const GLITCH_DUR    = 700;    // ms glitch runs
    const EXIT_DELAY    = 3200;   // ms total before exit begins

    const overlay   = document.getElementById('intro-overlay');
    const canvas    = document.getElementById('intro-canvas');
    const bayText   = document.getElementById('intro-bay-text');
    const tagline   = document.getElementById('intro-tagline');
    const skipBtn   = document.getElementById('intro-skip');
    const progress  = document.getElementById('intro-progress');

    if (!overlay) return; // Not on index page, bail

    // ── Lock scroll ──────────────────────────────────────────────
    document.body.classList.add('intro-active');

    // ── Canvas Particle System ───────────────────────────────────
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animFrameId;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x    = Math.random() * W;
            this.y    = initial ? Math.random() * H : -10;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedY = Math.random() * 0.55 + 0.15;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.6 + 0.1;
            this.twinkle = Math.random() * Math.PI * 2;
            // Colour: mostly white, occasional blue or red accent
            const r = Math.random();
            if      (r < 0.12) this.color = `52,152,219`;   // blue
            else if (r < 0.20) this.color = `231,76,60`;    // red
            else               this.color = `255,255,255`;  // white
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.twinkle += 0.04;
            if (this.y > H + 10) this.reset();
        }
        draw() {
            const a = this.opacity * (0.6 + 0.4 * Math.sin(this.twinkle));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${a})`;
            ctx.fill();
        }
    }

    // Spawn particles
    const COUNT = Math.min(160, Math.floor((W * H) / 8000));
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    function drawLoop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        animFrameId = requestAnimationFrame(drawLoop);
    }
    drawLoop();

    // ── Scanlines overlay effect ─────────────────────────────────
    function drawScanlines() {
        for (let y = 0; y < H; y += 4) {
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(0, y, W, 1);
        }
    }

    // ── Progress bar ─────────────────────────────────────────────
    function startProgress(duration) {
        progress.style.transition = `width ${duration}ms linear`;
        requestAnimationFrame(() => {
            progress.style.width = '100%';
        });
    }

    // ── Reveal sequence ──────────────────────────────────────────
    function runIntro() {
        // Step 1: reveal text (300ms after load)
        setTimeout(() => {
            bayText.classList.add('revealed');
            tagline.classList.add('revealed');
            skipBtn.classList.add('revealed');
            startProgress(EXIT_DELAY - 300);
        }, 300);

        // Step 2: glitch burst
        setTimeout(() => {
            bayText.classList.add('glitching');
        }, GLITCH_DELAY);

        setTimeout(() => {
            bayText.classList.remove('glitching');
        }, GLITCH_DELAY + GLITCH_DUR);

        // Step 3: second glitch burst (shorter)
        setTimeout(() => {
            bayText.classList.add('glitching');
        }, GLITCH_DELAY + GLITCH_DUR + 600);

        setTimeout(() => {
            bayText.classList.remove('glitching');
        }, GLITCH_DELAY + GLITCH_DUR + 750);

        // Step 4: auto exit
        setTimeout(exitIntro, EXIT_DELAY);
    }

    // ── Exit animation ───────────────────────────────────────────
    let exited = false;
    function exitIntro() {
        if (exited) return;
        exited = true;

        // Scale-up + fade out the BAY text before overlay fades
        bayText.style.transition = 'transform 0.7s cubic-bezier(0.76,0,0.24,1), opacity 0.7s ease, filter 0.7s ease';
        bayText.style.transform  = 'scale(1.12)';
        bayText.style.opacity    = '0';
        bayText.style.filter     = 'blur(8px)';
        tagline.style.transition = 'opacity 0.4s ease';
        tagline.style.opacity    = '0';

        setTimeout(() => {
            overlay.classList.add('exit');
        }, 250);

        setTimeout(() => {
            overlay.classList.add('gone');
            document.body.classList.remove('intro-active');
            cancelAnimationFrame(animFrameId);
        }, 1200);
    }

    // ── Skip button ──────────────────────────────────────────────
    skipBtn.addEventListener('click', exitIntro);
    // Also allow pressing any key to skip
    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
            exitIntro();
            document.removeEventListener('keydown', onKey);
        }
    });

    // ── Start ────────────────────────────────────────────────────
    runIntro();

})();
