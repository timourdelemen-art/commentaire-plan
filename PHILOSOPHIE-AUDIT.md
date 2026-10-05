# Audit — intégration Philosophie

## Audit 1 — cohérence didactique

### Test
Chaque activité doit correspondre à une opération identifiable et rendre possible une opération ultérieure.

### Résultat
La progression retenue est :
réponse plausible → raison → conséquence → coût → problématique → réponse de partie → limite → transition-question → nouvelle réponse → reste → opération de résolution → rédaction.

### Améliorations appliquées
- suppression du schéma « thèse / antithèse / synthèse » comme modèle directeur ;
- définition de la transition comme question issue du manque restant ;
- définition de la troisième partie comme traitement du reste ;
- création de l’exercice « énoncé philosophique → opération → ce que cela résout ici », symétrique de « procédé → effet ici » ;
- ajout de puzzles, diagnostics, transferts et constructions partielles avant la dissertation complète.

## Audit 2 — sobriété et progressivité

### Test
La complexité professorale doit produire des consignes plus simples.

### Résultat
Deux niveaux sont séparés :
- page méthode complète pour comprendre le système ;
- laboratoire pour isoler une seule opération à la fois.

### Améliorations appliquées
- une phrase avant le paragraphe ;
- paragraphe avant partie ;
- partie avant plan complet ;
- sujet officiel travaillé par étapes sur une fiche séparée ;
- corrections comparatives après tentative dans le laboratoire fixe ;
- auto-audit générique sur les annales dynamiques.

## Audit 3 — corpus

### Corpus élève
- 2 366 dissertations du bac, 1996–2025 ;
- 1 178 textes d’explication du bac, 1996–2025 ;
- sujets officiels 2026.

### Corpus de validation théorique
- banque d’environ 11 000 sujets de concours ;
- Dictionnaire paradoxal de la philosophie.

### Décision
Les concours restent surtout en arrière-plan pour tester la théorie. Le site élève privilégie les annales du bac.

## Audit 4 — IA / sans IA

### Principe
Aucune compétence essentielle ne doit dépendre de l’IA.

### Sans IA
Prioritaire pour :
- choix entre formulations ;
- classement ;
- puzzle logique ;
- repérage ;
- comparaison avec un modèle ;
- grille d’auto-contrôle ;
- consultation du sujet officiel.

### Avec IA
Valeur ajoutée pour :
- problématique personnelle ;
- transition personnelle ;
- plan ;
- paragraphe ;
- diagnostic du problème ou de la thèse d’un texte.

### Limite
L’IA doit intervenir après tentative, diagnostiquer un manque principal et provoquer une reprise. Elle ne doit pas produire la réponse finale.

### État technique actuel
Le mécanisme global de retour libre existe mais l’IA est temporairement désactivée dans `free-response.js`. Les pages restent donc intégralement utilisables sans IA et sont préparées pour un retour futur.

## Audit 5 — architecture du site

### Intégrations
- portail PHILO dans la navigation principale ;
- page d’accueil Philosophie ;
- méthode dissertation ;
- laboratoire d’exercices ;
- annales de philosophie ;
- accès depuis l’accueil général ;
- accès depuis la banque générale d’annales ;
- section Terminale philosophie dans l’espace Enseignants ;
- ajout au plan du site et au sitemap.

### Annales
Chaque sujet 2026 peut être ouvert séparément via un gabarit dynamique :
- dissertation : réponse → conséquences → coût → problématique → plan/transitions ;
- texte : problème → thèse → opération → réemploi.

## Audit 6 — technique

Contrôles exécutés :
- existence des liens internes des nouvelles pages ;
- équilibre des balises de section ;
- absence de chaînes de saut de ligne accidentelles ;
- syntaxe JavaScript des nouveaux scripts et de la navigation ;
- ajout des pages publiques au sitemap ;
- gabarit dynamique d’annale placé en `noindex,follow` pour éviter les duplications SEO.

## Critère final

L’intégration est retenue si elle satisfait simultanément :
1. une méthode plus courte que les méthodes usuelles ;
2. une progression réelle des opérations ;
3. une annale travaillable sans IA ;
4. une IA seulement là où elle apporte une valeur diagnostique ;
5. une navigation qui distingue clairement français, philosophie et brevet ;
6. un corpus officiel suffisamment large pour tester les exercices et faire évoluer la théorie.
