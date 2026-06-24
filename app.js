(() => {
  // Note: auth.js (components/auth.js) can also handle footer year + navbar auth.

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Burger


  const burger = document.querySelector('[data-burger]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (burger && mobileNav) {
    const toggle = () => {
      const open = mobileNav.getAttribute('data-open') === 'true';
      mobileNav.setAttribute('data-open', (!open).toString());
      burger.setAttribute('aria-expanded', (!open).toString());
    };
    burger.addEventListener('click', toggle);
    // close on link click
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileNav.setAttribute('data-open', 'false');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // Chips: set hidden input value
  document.querySelectorAll('[data-searchbar]').forEach(sb => {
    const hidden = sb.querySelector('[data-chip-hidden]');
    const chips = sb.querySelectorAll('[data-chip]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        if (hidden) hidden.value = chip.getAttribute('value') || '';
      });
    });
  });

  // Home page cards: remove fake recommended data.
  // Use only user-posted jobs from localStorage.

  const testimonials = [];
  const stories = [];

  function cardJob(j) {
    return `
      <a class="card" href="job.html?title=${encodeURIComponent(j.title)}&company=${encodeURIComponent(j.company)}">
        <div class="card__top">
          <div>
            <div class="tag tag--money">${j.salary}</div>
          </div>
          <div class="tag">${j.tag}</div>
        </div>
        <div class="card__title" style="margin-top:12px">${j.title}</div>
        <div class="card__meta">
          <span>📍 ${j.city}</span>
          <span>🏢 ${j.company}</span>
        </div>
      </a>
    `;
  }

  function cardCompany(c) {
    return `
      <a class="card" href="company.html?name=${encodeURIComponent(c.name)}">
        <div class="card__top">
          <div class="tag">${c.city}</div>
          <div class="tag tag--money">${c.jobs}</div>
        </div>
        <div class="card__title" style="margin-top:12px">${c.name}</div>
        <div class="card__meta"><span>✨ ${c.focus}</span></div>
      </a>
    `;
  }

  function renderList(selector, htmlArray) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = htmlArray.join('');
  }

  renderList('[data-list="featured-jobs"]', featuredJobs.map(cardJob));
  renderList('[data-list="featured-companies"]', featuredCompanies.map(cardCompany));

  const tEl = document.querySelector('[data-list="testimonials"]');
  if (tEl) {
    tEl.innerHTML = testimonials.map(t => `
      <div class="t-item">
        <div class="t-top">
          <div class="avatar" aria-hidden="true"></div>
          <div>
            <div class="t-name">${t.name}</div>
            <div class="t-role">${t.role}</div>
          </div>
        </div>
        <div class="t-quote">“${t.quote}”</div>
      </div>
    `).join('');
  }

  const sEl = document.querySelector('[data-list="stories"]');
  if (sEl) {
    sEl.innerHTML = stories.map(s => `
      <div class="s-item">
        <div class="s-item__k">${s.k}</div>
        <div class="s-item__t">${s.t}</div>
        <div class="s-item__d">${s.d}</div>
      </div>
    `).join('');
  }

  // Small enhancement: elevate visible cards
  document.querySelectorAll('.card,[data-elevate]').forEach(node => {
    node.style.willChange = 'transform';
  });
})();

