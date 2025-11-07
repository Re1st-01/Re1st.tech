/* Matrix background (binary rain) for Re1stx Tech)
   - Multi-canvas support (hero, footer)
   - Color controlled by CSS var --matrix-color
   - Intensity (density) controlled by CSS var --matrix-intensity (0..1)
   - Respects prefers-reduced-motion
   - Handles DPR, resize, visibility pause, and simple FPS limiting
*/
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvases = Array.from(document.querySelectorAll('.matrix-canvas'));
  if (!canvases.length || prefersReduced) return;

  // Read CSS vars
  const rootStyle = getComputedStyle(document.documentElement);
  const color = rootStyle.getPropertyValue('--matrix-color').trim() || '#7c4dff';
  const intensityVar = parseFloat(rootStyle.getPropertyValue('--matrix-intensity'));
  const intensity = isNaN(intensityVar) ? 1 : Math.max(0, Math.min(1, intensityVar));
  const speedVar = parseFloat(rootStyle.getPropertyValue('--matrix-speed'));
  const speedMult = isNaN(speedVar) ? 0.6 : Math.max(0.1, Math.min(2, speedVar));
  const alphaVar = parseFloat(rootStyle.getPropertyValue('--matrix-alpha'));
  const headAlpha = isNaN(alphaVar) ? 0.45 : Math.max(0.1, Math.min(1, alphaVar));

  // Characters: binary + a bit of hex for variety
  const chars = '01';
  const headColor = hexToRgba(color, headAlpha);
  const tailColor = hexToRgba(color, Math.min(0.12, headAlpha * 0.25));
  const fadeAlpha = 0.05 * (0.5 + 0.5 * intensity);

  function createInstance(canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    let columns = 0;
    let drops = [];
    let fontSize = 16;
    let frameId = null;
    let lastTime = 0;
    const maxFPS = 48;
    const minFrameTime = 1000 / maxFPS;

    function resize() {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const parent = canvas.parentElement;
      const vw = parent ? parent.clientWidth : window.innerWidth;
      const vh = parent ? parent.clientHeight : window.innerHeight;
      canvas.style.width = vw + 'px';
      canvas.style.height = vh + 'px';
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);

      fontSize = Math.max(12, Math.min(24, Math.round(16 * dpr)));
      ctx.font = fontSize + 'px monospace';
      ctx.textBaseline = 'top';

      width = canvas.width;
      height = canvas.height;

      columns = Math.max(1, Math.floor(width / (fontSize * 0.9)));
      const activeColumns = Math.max(2, Math.floor(columns * (0.3 + 0.7 * intensity)));

      drops = new Array(columns).fill(0);
      for (let i = 0; i < columns; i++) {
        drops[i] = -Math.random() * 40;
      }

      const step = Math.max(1, Math.floor(columns / activeColumns));
      const activeMask = new Array(columns).fill(false);
      for (let i = 0; i < columns; i += step) activeMask[i] = true;
      ctx._activeMask = activeMask;

      const colWidth = width / columns;
      ctx._colX = new Array(columns);
      for (let i = 0; i < columns; i++) ctx._colX[i] = Math.floor(i * colWidth);

      const base = lerp(0.15, 0.7, intensity) * speedMult;
      ctx._speed = new Array(columns);
      for (let i = 0; i < columns; i++) {
        const jitter = 0.6 + Math.random() * 0.8;
        ctx._speed[i] = base * jitter;
      }
    }

    function draw(now) {
      frameId = requestAnimationFrame(draw);
      if (now - lastTime < minFrameTime) return;
      lastTime = now;

      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      ctx.fillRect(0, 0, width, height);

      const activeMask = ctx._activeMask || [];
      const colX = ctx._colX || [];
      const speedArr = ctx._speed || [];

      for (let i = 0; i < columns; i++) {
        if (!activeMask[i]) continue;
        if (intensity < 0.5 && Math.random() > intensity * 2) continue;

        const text = chars[(Math.random() * chars.length) | 0];
        const x = colX[i] || Math.floor(i * (width / columns));
        const y = (Math.floor(drops[i]) * fontSize) | 0;

        ctx.fillStyle = headColor;
        ctx.fillText(text, x, y);

        ctx.fillStyle = tailColor;
        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = -Math.random() * 40;
        } else {
          drops[i] += speedArr[i] || (0.4 * speedMult);
        }
      }
    }

    function start() {
      stop();
      lastTime = 0;
      frameId = requestAnimationFrame(draw);
    }

    function stop() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
    }

    return { resize, start, stop };
  }

  // Helpers
  function hexToRgba(hex, a) {
    const h = hex.replace('#', '').trim();
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  const instances = canvases.map(createInstance);

  // Resize handling (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      instances.forEach(i => i.resize());
    }, 100);
  });

  // Page visibility handling
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      instances.forEach(i => i.stop());
    } else {
      instances.forEach(i => i.start());
    }
  });

  // Initialize
  instances.forEach(i => i.resize());
  instances.forEach(i => i.start());
})();
