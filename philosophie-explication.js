/* Navigation et brouillons locaux. Les comparaisons ne calculent aucune note. */
(function () {
  'use strict';
  document.querySelectorAll('.ecrire [data-parcours]').forEach(function (box) {
    var level = 1, step = 0;
    var status = box.querySelector('[data-save-status]');
    var areas = Array.from(box.querySelectorAll('[data-draft]'));
    var justification = box.querySelector('[data-justification]');
    var justificationSave = box.querySelector('[data-justification-save]');
    function showJustificationSave(ok) {
      if (!justification || !justificationSave) return;
      var message = !ok ? 'Enregistrement indisponible : gardez une copie de votre justification.' : justification.value.trim() ? 'Justification enregistrée automatiquement sur cet appareil.' : 'Votre justification s’enregistre automatiquement sur cet appareil.';
      if (justificationSave.textContent !== message) justificationSave.textContent = message;
    }
    var steps = Array.from(box.querySelectorAll('[data-step]'));
    var prefix = 'philo-explication:v1:' + box.dataset.parcours + ':';
    var storageAvailable = true;
    function saveStatus(ok) {
      storageAvailable = ok;
      var message = ok ? 'Brouillons enregistrés sur cet appareil. Ils ne sont pas envoyés à un correcteur.' : 'Enregistrement indisponible : gardez une copie de votre texte avant de quitter la page.';
      if (status.textContent !== message) status.textContent = message;
    }
    try {
      localStorage.setItem(prefix + 'test', '1');
      localStorage.removeItem(prefix + 'test');
      areas.forEach(function (a) { a.value = localStorage.getItem(prefix + a.dataset.draft) || ''; });
      saveStatus(true);
    } catch (_) { saveStatus(false); }
    showJustificationSave(storageAvailable);
    areas.forEach(function (a) {
      a.addEventListener('input', function () {
        try { localStorage.setItem(prefix + a.dataset.draft, a.value); saveStatus(true); if (a === justification) showJustificationSave(true); }
        catch (_) { saveStatus(false); if (a === justification) showJustificationSave(false); }
      });
    });
    function showLevel(n) {
      level = Math.max(1, Math.min(3, n));
      box.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = +p.dataset.panel !== level; });
      box.querySelectorAll('[data-level]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.level === level)); });
      box.querySelector('[data-previous-level]').disabled = level === 1;
      box.querySelector('[data-next-level]').disabled = level === 3;
    }
    function showStep(n) {
      step = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (p,i) { p.hidden = i !== step; });
      box.querySelectorAll('[data-goto-step]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.gotoStep === step)); });
      box.querySelector('[data-previous-step]').disabled = step === 0;
      box.querySelector('[data-next-step]').disabled = step === steps.length - 1;
    }
    box.querySelectorAll('[data-level],[data-goto-level]').forEach(function (b) {
      b.addEventListener('click', function () { showLevel(+(b.dataset.level || b.dataset.gotoLevel)); });
    });
    box.querySelectorAll('[data-goto-step]').forEach(function (b) {
      b.addEventListener('click', function () { showStep(+b.dataset.gotoStep); });
    });
    box.querySelector('[data-previous-level]').addEventListener('click', function () { showLevel(level - 1); });
    box.querySelector('[data-next-level]').addEventListener('click', function () { showLevel(level + 1); });
    box.querySelector('[data-previous-step]').addEventListener('click', function () { showStep(step - 1); });
    box.querySelector('[data-next-step]').addEventListener('click', function () { showStep(step + 1); });
    box.querySelectorAll('[data-choice]').forEach(function (b) {
      b.addEventListener('click', function () {
        box.querySelectorAll('[data-choice]').forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
        box.querySelector('[data-choice-feedback]').textContent = b.dataset.outcome + ' — ' + b.dataset.reason;
      });
    });
    box.querySelector('[data-restart]').addEventListener('click', function () {
      showLevel(1); showStep(0);
      box.querySelectorAll('[data-choice]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      box.querySelector('[data-choice-feedback]').textContent = '';
      box.querySelectorAll('details').forEach(function (d) { d.open = false; });
    });
    box.querySelector('[data-erase]').addEventListener('click', function () {
      if (!window.confirm('Effacer uniquement les brouillons de cette réponse ?')) return;
      var ok = storageAvailable;
      areas.forEach(function (a) {
        a.value = '';
        try { localStorage.removeItem(prefix + a.dataset.draft); }
        catch (_) { ok = false; }
      });
      saveStatus(ok);
      showJustificationSave(ok);
    });
    box.querySelector('[data-compare]').addEventListener('click', function () {
      var model = box.querySelector('[data-model]');
      model.open = true;
      /* Le corrigé est dans son onglet : on l’ouvre d’abord. */
      var tab = document.getElementById && document.getElementById('onglet-corrige-onglet');
      if (tab) tab.click();
      model.scrollIntoView({ behavior: 'smooth', block: 'start' });
      model.querySelector('summary').focus();
    });
    box.querySelector('[data-annotations]').addEventListener('click', function () {
      var hidden = this.getAttribute('aria-pressed') === 'true';
      box.querySelectorAll('.ecrire-copy').forEach(function (copy) { copy.classList.toggle('sans-annotations', hidden); copy.classList.toggle('c20-plain', hidden); });
      this.setAttribute('aria-pressed', String(!hidden));
      this.textContent = hidden ? 'Afficher les fonctions' : 'Masquer les fonctions';
    });
    showLevel(1); showStep(0);
  });
})();
