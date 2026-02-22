// ── Entry point: wire everything together ──────

(function (ns) {
  // Initialise starfield
  ns.resizeCanvas();
  ns.initStars();

  // DOM star clusters inside video panels
  ns.createStarCluster("stars1", 80);
  ns.createStarCluster("stars2", 80);
  ns.createStarCluster("stars3", 80);

  // Initialise scroll track
  ns.setupTrack();

  // Recalculate on resize
  window.addEventListener("resize", () => {
    ns.resizeCanvas();
    ns.initStars();
    ns.setupTrack();
  });

  // Start animation loop
  requestAnimationFrame(ns.animate);

  // Reveal elements already in view on load
  setTimeout(() => {
    document.querySelectorAll(".fade-section").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.left < window.innerWidth) el.classList.add("visible");
    });
  }, 300);
})(window.Pitta);
