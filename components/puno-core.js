(() => {
  // Ensure component fetch works even when pages are opened directly from filesystem.
  // We rely on fetch() for component HTML injection.
  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  ready(() => {
    // Replace placeholders if present.
    const navRoot = document.getElementById('puno-navbar');
    const footRoot = document.getElementById('puno-footer');

    if (navRoot && !navRoot.dataset.loaded) {
      navRoot.dataset.loaded = '1';
      fetch('components/navbar.html')
        .then(r => r.text())
        .then(html => {
          navRoot.innerHTML = html;
          // burger wiring happens in app.js; we only need auth toggles.
        })
        .catch(() => {});
    }

    if (footRoot && !footRoot.dataset.loaded) {
      footRoot.dataset.loaded = '1';
      fetch('components/footer.html')
        .then(r => r.text())
        .then(html => {
          footRoot.innerHTML = html;
        })
        .catch(() => {});
    }
  });
})();

