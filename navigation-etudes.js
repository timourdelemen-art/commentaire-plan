/* Filtres progressifs : les contenus et les liens restent accessibles sans JavaScript. */
(() => {
  function revealHash(hash = location.hash) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch (_) { return; }
    const target = id && document.getElementById(id);
    if (!target) return;
    for (let p = target; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
  }
  revealHash();
  window.addEventListener('hashchange', () => revealHash());
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (link) revealHash(link.getAttribute('href'));
  });
  document.querySelectorAll('[data-catalogue]').forEach(root => {
    const form = root.querySelector('form'), cards = [...root.querySelectorAll('[data-card]')];
    if (!form || !cards.length) return;
    const controls = [...form.querySelectorAll('input[name],select[name]')];
    const count = root.querySelector('[data-count]'), empty = root.querySelector('[data-empty]');
    const normal = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ');
    const params = new URLSearchParams(location.search);
    for (const el of controls) {
      const value = params.get(el.name);
      if (value && (el.tagName !== 'SELECT' || [...el.options].some(o => o.value === value))) el.value = value;
    }
    function apply(updateUrl) {
      const state = Object.fromEntries(controls.map(el => [el.name, el.value]));
      const words = normal(state.q || '').trim().split(/\s+/).filter(Boolean);
      let n = 0;
      for (const card of cards) {
        let ok = words.every(w => normal(card.textContent).includes(w));
        if (state.notion) ok = ok && (card.dataset.notions || '').split('|').includes(state.notion);
        if (state.niveau) ok = ok && card.dataset.niveau === state.niveau;
        const links = [...card.querySelectorAll('[data-exercice]')];
        if (links.length) {
          for (const link of links) link.hidden = Boolean((state.exercice && link.dataset.exercice !== state.exercice) || (state.discipline && link.dataset.discipline !== state.discipline));
          ok = ok && links.some(a => !a.hidden);
        }
        card.hidden = !ok;
        if (ok) n++;
      }
      count.textContent = n + ' sujet' + (n > 1 ? 's' : '') + ' sur ' + cards.length;
      empty.hidden = n !== 0;
      if (updateUrl) {
        const url = new URL(location.href);
        for (const [key,value] of Object.entries(state)) value ? url.searchParams.set(key,value) : url.searchParams.delete(key);
        history.replaceState(null,'',url);
      }
    }
    form.hidden = false;
    form.addEventListener('submit',e => {e.preventDefault();apply(true);});
    form.addEventListener('input',() => apply(true));
    form.addEventListener('change',() => apply(true));
    form.addEventListener('reset',() => {for (const el of controls) el.value='';apply(true);});
    apply(false);
  });
})();
