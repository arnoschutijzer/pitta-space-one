// ── Core scroll state + animation loop ─────────

window.Pitta = window.Pitta || {};

(function (ns) {
  const track = document.getElementById("track");
  const progress = document.getElementById("progress");
  const hint = document.getElementById("hint");
  const starfield = document.getElementById("starfield");

  let scrollableTrack = 1;
  let targetX = 0;
  let currentX = 0;

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  ns.setupTrack = function () {
    scrollableTrack = track.scrollWidth - window.innerWidth;
  };

  ns.getScrollableTrack = function () {
    return scrollableTrack;
  };

  ns.applyDelta = function (px) {
    targetX = clamp(targetX + px, 0, scrollableTrack);
    updateUI();
  };

  function updateUI() {
    const p = targetX / scrollableTrack;
    progress.style.width = p * 100 + "%";
    starfield.style.opacity = p > 0.05 ? Math.min((p - 0.05) * 8, 0.7) : 0;
    hint.classList.toggle("hidden", p > 0.03);
  }

  ns.animate = function (t) {
    currentX = lerp(currentX, targetX, 0.07);
    track.style.transform = `translateX(${-currentX}px)`;

    ns.drawStars(t * 0.001);

    // Fade sim video backgrounds
    const p = currentX / scrollableTrack;
    const simBreakpoints = [0.22, 0.48, 0.72];
    ["sim1", "sim2", "sim3"].forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const dist = Math.abs(p - simBreakpoints[i]);
      el.style.opacity = Math.max(0, 1 - dist * 12);
    });

    // Reveal fade-sections that are now in view
    document.querySelectorAll(".fade-section:not(.visible)").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.left < window.innerWidth * 1.15 && rect.right > -50) {
        el.classList.add("visible");
      }
    });

    requestAnimationFrame(ns.animate);
  };
})(window.Pitta);
