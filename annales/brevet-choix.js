/* Choix de grammaire vérifiés, sur les mêmes questions que la réponse écrite.
   Aucune réponse n'est remplie automatiquement ; aucun appel réseau. */
(() => {
  const ZOLA = 'brevet-2026-general-zola-cage-betes-feroces';
  const questions = {
    q7a: [
      ['Groupe nominal ; complément circonstanciel de temps.', 'ok', '« un matin » contient un déterminant et un nom. Il précise quand les animaux ouvrent la cage ; on peut le déplacer ou le supprimer.'],
      ['Complément circonstanciel de temps, car il indique le moment.', 'def', 'La fonction est juste, mais la question demande aussi la nature : un groupe nominal.'],
      ['Groupe nominal ; sujet du verbe « réussirent ».', 'no', 'Le sujet est « un Lion et une Hyène ». Être en début de phrase ne suffit pas pour être sujet.'],
    ],
    q7b: [
      ['Suppression : « Un Lion et une Hyène du Jardin des Plantes réussirent à ouvrir la porte de leur cage, fermée avec négligence. » Déplacement : « Un Lion et une Hyène du Jardin des Plantes réussirent, un matin, à ouvrir la porte de leur cage, fermée avec négligence. »', 'ok', 'Les deux manipulations sont effectuées. La phrase reste grammaticale : le groupe est supprimable et déplaçable.'],
      ['Suppression : « Un Lion et une Hyène du Jardin des Plantes réussirent à ouvrir la porte de leur cage, fermée avec négligence. » On pourrait aussi déplacer le groupe au sein de la phrase, mais sans le réécrire ici.', 'def', 'La suppression est effectuée, mais la deuxième manipulation est seulement annoncée : il faut écrire la phrase obtenue.'],
      ['Remplacement par « il » : « Il, un Lion et une Hyène du Jardin des Plantes réussirent à ouvrir la porte de leur cage, fermée avec négligence. » Cela prouve que « un matin » est le sujet du verbe « réussirent ».', 'no', 'Le remplacement ne donne pas une phrase grammaticale et ne prouve pas la fonction. Essayez de supprimer ou de déplacer « un matin ».'],
    ],
    q8a: [
      ['Le conditionnel présent.', 'ok', '« pourraient » associe le radical du futur « pourr- » et la terminaison « -aient » du conditionnel présent.'],
      ['Le conditionnel, sans préciser le temps.', 'def', 'Vous reconnaissez la forme, mais le nom complet du temps est « conditionnel présent ».'],
      ['L’imparfait de l’indicatif.', 'no', 'L’imparfait du verbe « pouvoir » serait « pouvaient ». Ici, le radical « pourr- » signale le conditionnel.'],
    ],
    q8b: [
      ['Un futur dans le passé : leur journée est encore à venir.', 'ok', 'Au moment où ils se posent la question : « À quels amusements pourrons-nous consacrer notre journée ? » Le récit au passé transforme ce futur en conditionnel.'],
      ['Une possibilité : ils ne savent pas encore quoi faire.', 'def', 'Cette nuance peut se défendre. Pour préciser la valeur dans le récit, expliquez que l’action est à venir par rapport à « se demandèrent ».'],
      ['Une formule de politesse pour demander une autorisation.', 'no', 'Ils ne demandent pas la permission à quelqu’un : ils s’interrogent sur leur journée à venir.'],
    ],
  };
  const labels = {ok: 'Solide', def: 'Défendable', no: 'À revoir'};
  window.BrevetChoix = {
    render(id, step) {
      document.querySelectorAll('.brevet-choix,.brevet-reponse-modes,.brevet-sans-ia').forEach(el => el.remove());
      const answer = document.getElementById('studentAnswer');
      if (!step.kind?.startsWith('brevet-')) return;
      if (step.correction && ['brevet-grammaire','brevet-lexique','brevet-reecriture'].includes(step.kind)) {
        const note = document.createElement('p');
        note.className = 'micro brevet-sans-ia';
        note.textContent = 'Écrivez votre réponse, puis consultez l’aide et le corrigé pour la comparer. Aucun recours à l’IA n’est nécessaire.';
        answer.before(note);
      }
      const choices = id === ZOLA && questions[step.id];
      if (!choices) return;
      const modes = document.createElement('div');
      modes.className = 'brevet-reponse-modes';
      modes.setAttribute('role', 'group');
      modes.setAttribute('aria-label', 'Façon de répondre');
      const panel = document.createElement('div');
      panel.className = 'brevet-choix';
      panel.hidden = true;
      const prompt = document.createElement('p');
      prompt.textContent = 'Choisissez une réponse. Chaque proposition est expliquée ; vous pourrez ensuite rédiger avec vos mots.';
      const opts = document.createElement('div');
      opts.className = 'chaine-opts';
      const feedback = document.createElement('div');
      feedback.className = 'chaine-fb';
      feedback.setAttribute('aria-live', 'polite');
      panel.append(prompt, opts, feedback);
      const shuffled = choices.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffled.forEach(([text, verdict, why]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'chaine-opt'; b.textContent = text;
        b.addEventListener('click', () => {
          opts.querySelectorAll('button').forEach(el => {el.classList.remove('picked','ok','def','no');el.setAttribute('aria-pressed','false');});
          b.classList.add('picked', verdict); b.setAttribute('aria-pressed','true');
          feedback.className = 'chaine-fb show ' + verdict;
          feedback.textContent = labels[verdict] + '. ' + why;
        });
        opts.append(b);
      });
      const writing = [answer, document.querySelector('.progressive-help'), document.querySelector('.annale-training-actions'), document.getElementById('aiFeedback'), document.getElementById('manualHelp')];
      const prior = writing.map(el => el.hidden);
      function show(choose) {
        // Capture current visibility before hiding, including a correction just opened.
        if (choose && panel.hidden) writing.forEach((el,i) => {prior[i] = el.hidden;});
        panel.hidden = !choose;
        writing.forEach((el,i) => {el.hidden = choose || prior[i];});
        modes.querySelectorAll('button').forEach((el,i) => el.setAttribute('aria-pressed', String(i === (choose ? 0 : 1))));
      }
      ['Je choisis','Je rédige'].forEach((text,i) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = text;
        b.setAttribute('aria-pressed', String(i === 1));
        b.addEventListener('click', () => show(i === 0)); modes.append(b);
      });
      answer.before(modes, panel);
    },
  };
})();
