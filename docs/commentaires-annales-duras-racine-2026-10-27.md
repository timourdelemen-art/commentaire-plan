# Deux commentaires d’annales avec entraînement

Demande du propriétaire : enrichir les commentaires issus de vraies annales, avec un
texte lisible, un modèle bref et des exercices, en suivant le protocole fourni et le
*Petit manuel des procédés*. Les documents joints sont des références de production.

## Sources effectivement consultées

- Claire de Duras, *Édouard* (1825), bac général 2024, Métropole, 24-FRGEME1.
  [Sujet Éduscol, version agrandie](https://eduscol.education.gouv.fr/sites/default/files/document/24-frgeme1-a24pdf-109221.pdf),
  pages 2–4 sur 6, lignes 1–29. SHA-256 du PDF téléchargé :
  `d83b3989d2795674371936287c12d50d1e1cbbba444151595dcea0d336029214`.
- Racine, *Bérénice* (1670), IV, 5, bac général 2023, Amérique du Nord,
  23-FRGEAN1. [Sujet Éduscol, version agrandie](https://eduscol.education.gouv.fr/sites/default/files/document/23-frgean1-a16pdf-103929.pdf),
  pages 2–4 sur 6, 48 vers. SHA-256 :
  `ca643b4230fb61bd6bd2c5dbdb9e783ccb966e9bdd83f16c204d772e2890b59c`.

Les deux extraits sont du domaine public. Textes, chapeaux et notes ont été relevés
sur ces PDF : aucune reconstitution de mémoire, aucune coupe supplémentaire. Contrôle
du texte de Duras et des 48 vers de Racine après normalisation des blancs et des
apostrophes ; la césure typographique « dis- / je » du PDF est réunie en « dis-je ».
Les chapeaux se distinguent du texte par l’italique. Les deux sources restent liées.

## Choix de lecture

- Duras : harmonie sensible, retour de la frontière sociale, dialogue et gestes
  empêchés. La conscience du narrateur ne permet pas d’affirmer la réciprocité de
  tous ses sentiments. « Je n’osai lui dire que oui » signifie qu’il serait
  malheureux de prolonger cette seule proximité. Les anciennes réponses du catalogue
  qui affirmaient sans réserve un amour partagé sont précisées.
- Racine : demande de dignité commune, accusation de Bérénice, réponse de Titus.
  La nécessité est invoquée par Titus ; le commentaire ne la présente pas comme un
  verdict du dramaturge. La gloire est personnifiée, sans être automatiquement
  qualifiée de prosopopée. Le dernier vers ne vaut pas accord de Bérénice.

Les modèles font respectivement 705 et 693 mots. Chacun comporte
introduction, neuf sous-parties, deux transitions-questions, conclusion. Ce choix
de treize paragraphes suit le modèle demandé, sans être présenté comme une norme
nationale. Chaque phrase a une fonction ; les deux modes communs conservent son texte.

Le protocole sert à relier la progression aux réalisations du texte ; le manuel
sert à vérifier la chaîne mots précis → construction → effet ici. Les analyses ne
prêtent pas un effet universel aux procédés.

## Exercices et accès

Chaque texte offre trois étapes : comprendre, organiser, analyser. Chacune propose
trois choix expliqués (Solide / Défendable / À revoir), puis une tâche écrite courte,
un indice facultatif et un modèle à comparer après un essai. Une dernière étape
permet d’écrire tout le commentaire, puis de recommencer seul sur l’autre extrait.
Les distracteurs reprennent des erreurs de lecture : prendre une proximité pour
une union possible, les fleurs pour une consolation acquise, une décision ferme
pour la disparition de l’amour, ou la fin d’une réplique pour un accord.

Le support reste entièrement déplié, dans le défilement ordinaire de la page.
Les réponses se conservent localement ; ces comparaisons préparées fonctionnent
sans solliciter le correcteur distant. Le modèle ne porte aucune promesse de note.

Les deux entrées apparaissent dans Commentaire et dans les annales. Le bouton
principal des cartes Duras/Racine ouvre directement la première étape du nouveau
parcours. Le parcours détaillé antérieur reste accessible par la fiche du sujet ;
aucune étape du catalogue n’est supprimée. Les deux changements d’adresses sont
déclarés dans le registre de conservation. Le mode examen de Racine propose le
modèle seulement après la rédaction.

## Source et régénération

- Données : `scripts/commentaires-annales-data.json`.
- Génération : `python3 -B scripts/build-commentaires-annales.py`.
- Générateur commun : `scripts/build-commentaires-programme.py`, désormais importable
  sans réécrire les pages du programme. Les mentions de programme et les liens de
  dissertation ne s’appliquent pas aux vraies annales.
- Tests étendus : cohérence des citations/structure, parcours des quatre textes
  programme + annales, entrée Commentaire et accès direct depuis les annales.

Les pages produites sont versionnées comme les commentaires du programme ; la
construction Netlify les conserve. Aucune reproduction de livre fourni n’est publiée.
