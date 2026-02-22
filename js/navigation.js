// ── Input handling: wheel, touch, keyboard ─────

(function(ns) {
  // ── Wheel (desktop + trackpad) ─────────────────
  window.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const multiplier = e.deltaMode === 1 ? 20 : e.deltaMode === 2 ? 300 : 1;
    ns.applyDelta(delta * multiplier);
  }, { passive: false });

  // ── Touch (mobile) ─────────────────────────────
  let touchStartX = 0;
  let touchStartY = 0;
  let touchLastX  = 0;
  let touchLocked = null;

  window.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchLastX  = touchStartX;
    touchLocked = null;
  }, { passive: false });

  window.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    if (!touchLocked) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        touchLocked = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
      }
    }

    e.preventDefault();

    if (touchLocked === 'h') {
      const delta = touchLastX - e.touches[0].clientX;
      ns.applyDelta(delta);
    } else if (touchLocked === 'v') {
      const delta = (touchStartY - e.touches[0].clientY) * 1.5;
      ns.applyDelta(delta / 80);
    }

    touchLastX = e.touches[0].clientX;
  }, { passive: false });

  window.addEventListener('touchend', () => {
    touchLocked = null;
  }, { passive: false });

  // ── Keyboard ───────────────────────────────────
  window.addEventListener('keydown', e => {
    const step = window.innerWidth * 0.4;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') ns.applyDelta(step);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   ns.applyDelta(-step);
    if (e.key === 'End')   ns.applyDelta(ns.getScrollableTrack());
    if (e.key === 'Home')  ns.applyDelta(-ns.getScrollableTrack());
  });
})(window.Pitta);
