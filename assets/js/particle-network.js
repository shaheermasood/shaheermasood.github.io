/**
 * Particle Network Animation
 * Canvas-based node graph that reacts to mouse interaction.
 * Nodes drift, connect with lines, and scatter on hover.
 */
(function () {
    'use strict';

    var CONFIG = {
        // Density: one particle per N square pixels (clamped to min/max)
        particleDensity: 10000,
        particleMin: 35,
        particleMax: 90,

        // Particle appearance
        radiusMin: 1.5,
        radiusMax: 3.5,

        // Movement
        speedMin: 0.15,
        speedMax: 0.45,

        // Connections
        connectionDist: 140,     // px — max distance to draw a line
        lineWidthBase: 0.7,

        // Mouse repulsion
        repelRadius: 110,        // px — radius of influence
        repelStrength: 6.0,      // how hard particles are pushed
        returnDamping: 0.035,    // how quickly they drift back to base velocity

        // Mouse attraction zone (inner ring around repel zone) — lines brighten
        attractRadius: 180,

        // Colors (RGBA components; alpha set dynamically)
        nodeR: 242, nodeG: 240, nodeB: 235,
        lineR: 242, lineG: 240, lineB: 235,

        // Max particle speed under repulsion
        maxSpeed: 5.0,
    };

    /* ── Particle class ─────────────────────────────────────────── */
    function Particle(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        var speed = CONFIG.speedMin + Math.random() * (CONFIG.speedMax - CONFIG.speedMin);
        var angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        // Remember calm velocity so we can return to it
        this.baseVx = this.vx;
        this.baseVy = this.vy;

        this.r = CONFIG.radiusMin + Math.random() * (CONFIG.radiusMax - CONFIG.radiusMin);
        // Slight opacity variation for depth
        this.alpha = 0.55 + Math.random() * 0.45;
    }

    Particle.prototype.update = function (w, h, mx, my) {
        // Apply mouse repulsion
        if (mx !== null) {
            var dx = this.x - mx;
            var dy = this.y - my;
            var distSq = dx * dx + dy * dy;
            var repelSq = CONFIG.repelRadius * CONFIG.repelRadius;

            if (distSq < repelSq && distSq > 0.01) {
                var dist = Math.sqrt(distSq);
                var force = (1 - dist / CONFIG.repelRadius) * CONFIG.repelStrength;
                this.vx += (dx / dist) * force * 0.1;
                this.vy += (dy / dist) * force * 0.1;
            }
        }

        // Gently return velocity toward base (dampen)
        this.vx += (this.baseVx - this.vx) * CONFIG.returnDamping;
        this.vy += (this.baseVy - this.vy) * CONFIG.returnDamping;

        // Clamp max speed
        var spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (spd > CONFIG.maxSpeed) {
            this.vx = (this.vx / spd) * CONFIG.maxSpeed;
            this.vy = (this.vy / spd) * CONFIG.maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around canvas edges with a small buffer
        var buf = 12;
        if (this.x < -buf) this.x = w + buf;
        if (this.x > w + buf) this.x = -buf;
        if (this.y < -buf) this.y = h + buf;
        if (this.y > h + buf) this.y = -buf;
    };

    Particle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + CONFIG.nodeR + ',' + CONFIG.nodeG + ',' + CONFIG.nodeB + ',' + this.alpha + ')';
        ctx.fill();
    };

    /* ── Main module ────────────────────────────────────────────── */
    var canvas, ctx, particles, animId, resizeObserver;
    var mouse = { x: null, y: null };
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getParticleCount(w, h) {
        var area = w * h;
        var count = Math.floor(area / CONFIG.particleDensity);
        return Math.max(CONFIG.particleMin, Math.min(CONFIG.particleMax, count));
    }

    function createParticles() {
        var w = canvas.width;
        var h = canvas.height;
        var n = getParticleCount(w, h);
        particles = [];
        for (var i = 0; i < n; i++) {
            particles.push(new Particle(w, h));
        }
    }

    function resize() {
        var parent = canvas.parentElement;
        if (!parent) return;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        createParticles();
    }

    function drawConnections() {
        var n = particles.length;
        var mx = mouse.x;
        var my = mouse.y;
        var hasMouse = mx !== null;

        for (var i = 0; i < n; i++) {
            for (var j = i + 1; j < n; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist >= CONFIG.connectionDist) continue;

                var baseAlpha = (1 - dist / CONFIG.connectionDist) * 0.38;

                // Boost line opacity when mouse is nearby
                var boost = 0;
                if (hasMouse) {
                    var midX = (particles[i].x + particles[j].x) * 0.5;
                    var midY = (particles[i].y + particles[j].y) * 0.5;
                    var mdx = midX - mx;
                    var mdy = midY - my;
                    var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < CONFIG.attractRadius) {
                        boost = (1 - mdist / CONFIG.attractRadius) * 0.45;
                    }
                }

                var alpha = Math.min(1, baseAlpha + boost);
                var lw = CONFIG.lineWidthBase + boost * 0.8;

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = 'rgba(' + CONFIG.lineR + ',' + CONFIG.lineG + ',' + CONFIG.lineB + ',' + alpha + ')';
                ctx.lineWidth = lw;
                ctx.stroke();
            }
        }
    }

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!prefersReducedMotion) {
            particles.forEach(function (p) {
                p.update(canvas.width, canvas.height, mouse.x, mouse.y);
            });
        }

        drawConnections();
        particles.forEach(function (p) { p.draw(ctx); });

        animId = requestAnimationFrame(frame);
    }

    function onMouseMove(e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    function onTouchMove(e) {
        if (e.touches.length === 0) return;
        e.preventDefault();
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
    }

    function onTouchEnd() {
        mouse.x = null;
        mouse.y = null;
    }

    function init() {
        canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');

        resize();

        // Watch parent for size changes (responsive)
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(canvas.parentElement);
        } else {
            window.addEventListener('resize', resize);
        }

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd);

        animId = requestAnimationFrame(frame);
    }

    // Kick off once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
