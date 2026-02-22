// ── Star field canvas + DOM star clusters ──────

window.Pitta = window.Pitta || {};

(function(ns) {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  ns.resizeCanvas = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  ns.initStars = function() {
    stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2
      });
    }
  };

  ns.drawStars = function(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha = 0.3 + 0.5 * Math.sin(t * s.speed * 60 + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,236,227,${s.alpha})`;
      ctx.fill();
    });
  };

  ns.createStarCluster = function(containerId, count = 60) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2 + 0.5;
      s.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        --dur:${Math.random()*3+2}s; --delay:${Math.random()*3}s;
        opacity:${Math.random()*0.6+0.2};
      `;
      container.appendChild(s);
    }
  };
})(window.Pitta);
