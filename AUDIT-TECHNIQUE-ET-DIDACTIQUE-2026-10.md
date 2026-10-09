# Audit technique et pédagogique — Commentaire Plan
Date : 9 octobre 2026. Périmètre : inspection statique ciblée du dépôt GitHub ; pas de test navigateur mobile, ni d'audit exhaustif de tous les fichiers.

## Constats confirmés dans le code

1. **Architecture** : site statique HTML/CSS/JavaScript, complété par des générateurs Node exécutés au build Netlify. Pas de justification technique démontrée pour une réécriture complète.
2. **Publication** : la commande Netlify exécute successivement des générateurs, l'audit SEO, le budget de performance, puis un nettoyage des fichiers non publics. `clean-publish.js` n'efface les fichiers que lorsque `NETLIFY=true`.
3. **Contrôles qualité** : `seo-audit.js` et `performance-budget.js` produisent des rapports mais ne bloquaient pas le déploiement en cas d'erreurs. Option `AUDIT_STRICT=1` ajoutée ; activation différée jusqu'à qualification des erreurs existantes.
4. **Suivi pédagogique** : `philosophie-parcours.js` mémorise dans `localStorage` les étapes cochées par l'élève. Cela ne mesure pas une maîtrise. Libellé changé en « étape parcourue » ; une véritable évaluation de transfert reste à concevoir.
5. **Exercice III** : `philosophie-troisieme-resolutions.js` exige au moins quinze caractères avant l'affichage d'un modèle. Cette condition ne valide ni la qualité de l'argument ni la formulation du reste ; le texte précise qu'il ne s'agit pas d'une correction automatique.
6. **Navigation** : la page de la gamme III n'avait pas initialement le menu statique ni le pied de page standard ; elle les retrouve dans cette branche. Elle a été ajoutée à la liste des pages philosophie de `site-nav.js`.
7. **Entrée dans le parcours** : la page philosophie présentait déjà trois portes, mais les ressources annexes étaient nombreuses et simultanément visibles. La branche reformule les trois objectifs et replie les ressources secondaires.
8. **Contrôle de non-régression** : `scripts/check-philo-parcours.js` vérifie les éléments structurants des trois pages principales, leurs ancres internes, le lien vers la gamme III, la navigation JS et le libellé de progression. Il reste à l'exécuter dans un environnement disposant de tout le dépôt avant de le rendre bloquant.

## Priorités

**P0 — Vérifier avant fusion**
- Vérifier l'aperçu Netlify sur mobile et ordinateur, y compris le menu, les liens d'ancrage et le fonctionnement de la gamme III.
- Exécuter le nouveau contrôle `node scripts/check-philo-parcours.js` sur le dépôt complet ; corriger les erreurs réelles avant de l'intégrer au build.
- Confirmer l'absence de régression sur les autres pages après les changements de navigation.

**P1 — Audit technique transversal**
- Inventorier les pages et scripts, les dépendances et les fonctions dupliquées ; identifier les endroits où une modification se répercute sur plusieurs exercices.
- Tester les formulaires, les retours de correction, la persistance des réponses, les cas limites et l'accessibilité au clavier.
- Examiner les rapports SEO et performance complets, puis mesurer les performances réelles sur téléphone (Core Web Vitals, taille transférée et comportement).
- Tester les générateurs Node et la publication Netlify avec des données reproductibles ; rendre les contrôles bloquants progressivement.

**P1 — Vérification didactique**
- Sur des élèves réels : tentative sans aide, retour, reprise, transfert sur un sujet inédit ; observer les abandons et les erreurs récurrentes.
- Ne pas confondre la longueur d'une réponse avec sa qualité ; ne pas présenter un suivi déclaratif comme une mesure de compétence.

**P2 — Marketing**
- Montrer des exemples de transformation avant/après, avec accord des élèves et contexte de travail ; ne pas inventer de résultats.
- Clarifier les conditions de l'offre payante avant ouverture ; suivre anonymement les parcours d'entrée, d'essai et de retour, sous réserve des règles de confidentialité applicables.

## Décision d'architecture

**Ne pas réécrire le site à neuf.** Conserver les URLs, les contenus, les corrections, les exercices et les mécanismes qui fonctionnent. Refactoriser progressivement, avec un test de non-régression avant chaque extraction de code partagé.

### Risques d'une réécriture globale
- Disparition d'exercices ou de subtilités didactiques, altération des corrigés.
- Rupture de liens externes, d'ancres et de pages indexées.
- Bugs de stockage local et de suivi de parcours.
- Régressions de performance, d'accessibilité ou de navigation.
- Longue période de développement sans amélioration visible pour les élèves.

### Limites du présent audit
Aucun inventaire complet des fichiers n'a encore été réalisé. Aucun test de charge, de sécurité applicative, d'accessibilité automatisée, ni mesure d'engagement réel n'a été exécuté. Les contrôles ajoutés ne doivent pas être présentés comme une certification de l'ensemble du site.
