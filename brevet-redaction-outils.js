/* Outils des pages de rédaction du brevet : copies à 20 (fonction de chaque phrase),
   niveaux d'aide, exercice d'ordre, banque de sujets (zone d'écriture), filtres de la banque d'exemples.
   Les choix en trois états (.brevet-qcm) sont gérés par brevet-targeted.js. */
(function () {
  var $$ = function (sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); };

  /* 1. Copies à 20 : afficher ou masquer la fonction de chaque phrase. */
  $$('.bc20-toggle').forEach(function (b) {
    var c = document.getElementById(b.getAttribute('aria-controls'));
    if (!c) return;
    b.addEventListener('click', function () {
      var plain = c.classList.toggle('c20-plain');
      b.setAttribute('aria-pressed', plain ? 'false' : 'true');
      b.textContent = plain ? 'Voir la fonction de chaque phrase' : 'Masquer la fonction de chaque phrase';
    });
  });

  /* 2. Niveaux d'aide : onglets, niveau précédent / suivant, recommencer. */
  $$('.bniv').forEach(function (box) {
    var tabs = $$('[data-niv-tab]', box), panes = $$('.bniv-pane', box);
    function show(n, focus) {
      tabs.forEach(function (t) { var on = t.getAttribute('data-niv-tab') === String(n); t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
      panes.forEach(function (p) { p.hidden = p.getAttribute('data-niv') !== String(n); });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t.getAttribute('data-niv-tab')); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var j = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        show(tabs[j].getAttribute('data-niv-tab'), true);
      });
    });
    $$('[data-niv-go]', box).forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-niv-go')); box.scrollIntoView({ block: 'start', behavior: 'smooth' }); });
    });
    $$('[data-niv-reset]', box).forEach(function (b) {
      b.addEventListener('click', function () {
        var pane = b.closest('.bniv-pane');
        $$('.brevet-qcm button[data-state]', pane).forEach(function (x) { x.classList.remove('picked', 'ok', 'def', 'no'); });
        $$('.brevet-qcm-fb', pane).forEach(function (f) { f.className = 'brevet-qcm-fb chaine-fb'; f.innerHTML = ''; });
        $$('.bordre', pane).forEach(resetOrdre);
        $$('details.correction', pane).forEach(function (d) { d.open = false; });
      });
    });
    show(1);
  });

  /* 3. Exercice d'ordre : cliquer les phrases de la première à la dernière. */
  function resetOrdre(ex) {
    ex._seq = [];
    $$('.bordre-item', ex).forEach(function (b) { b.disabled = false; b.classList.remove('done'); b.querySelector('.bordre-n').textContent = ''; });
    var fb = ex.querySelector('.bordre-fb'); fb.className = 'bordre-fb chaine-fb'; fb.textContent = '';
  }
  $$('.bordre').forEach(function (ex) {
    var items = $$('.bordre-item', ex), fb = ex.querySelector('.bordre-fb');
    ex._seq = [];
    items.forEach(function (b) {
      b.addEventListener('click', function () {
        ex._seq.push(Number(b.getAttribute('data-rang')));
        b.disabled = true; b.classList.add('done');
        b.querySelector('.bordre-n').textContent = ex._seq.length + '.';
        if (ex._seq.length < items.length) return;
        var ok = ex._seq.every(function (r, i) { return r === i + 1; });
        fb.className = 'bordre-fb chaine-fb show ' + (ok ? 'ok' : 'no');
        fb.textContent = ex.getAttribute(ok ? 'data-ok' : 'data-ko');
        if (!ok) {
          var again = document.createElement('button');
          again.type = 'button'; again.className = 'btn small bordre-again'; again.textContent = 'Recommencer';
          again.addEventListener('click', function () { resetOrdre(ex); });
          fb.appendChild(document.createTextNode(' ')); fb.appendChild(again);
        }
      });
    });
  });

  /* 4. Banque de sujets : « Écrire ce sujet » place le sujet dans la zone d'écriture. */
  var main = document.querySelector('main[data-instructions]');
  var area = document.getElementById('ecrire-texte');
  if (main && area) {
    var instr = {};
    try { instr = JSON.parse(main.getAttribute('data-instructions')); } catch (e) {}
    var meta = document.getElementById('ecrire-meta'), cons = document.getElementById('ecrire-consigne');
    var choose = function (id) {
      var card = document.getElementById(id);
      if (!card || !instr[id]) return false;
      meta.textContent = card.getAttribute('data-label').toUpperCase();
      cons.innerHTML = card.querySelector('.bsr-consigne').innerHTML;
      area.setAttribute('data-feedback-instruction', instr[id]);
      return true;
    };
    $$('a[data-sujet]').forEach(function (a) {
      a.addEventListener('click', function () { choose(a.getAttribute('data-sujet')); });
    });
    var q = /[?&]sujet=([a-z0-9-]+)/.exec(location.search);
    if (q && choose(q[1])) {
      var go = function () { document.getElementById('ecrire').scrollIntoView(); };
      if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
    }
  }

  /* 5. Banque d'exemples : filtres par thème ou par genre. */
  var cards = $$('.bex-card'), compte = document.querySelector('.bex-compte');
  if (cards.length) {
    var btns = $$('[data-filtre]');
    var apply = function (f) {
      var n = 0;
      cards.forEach(function (c) {
        var on = f === 'tous' || (f.indexOf('theme:') === 0 ? (' ' + c.getAttribute('data-themes') + ' ').indexOf(' ' + f.slice(6) + ' ') > -1 : c.getAttribute('data-genre') === f.slice(6));
        c.hidden = !on; if (on) n++;
      });
      btns.forEach(function (b) { var on = b.getAttribute('data-filtre') === f; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      if (compte) compte.textContent = n + (n > 1 ? ' exemples affichés.' : ' exemple affiché.');
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-filtre')); }); });
    apply('tous');
  }
})();
