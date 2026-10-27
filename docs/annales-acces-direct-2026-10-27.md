# Annales : atteindre la consigne sans détour

Le choix d’un auteur mène directement à la première étape du commentaire. Le texte accompagne la zone d’écriture ; la consigne apparaît avant le texte. Les choix de mode et le chronomètre deviennent facultatifs. Les étapes précédente et suivante permettent une navigation libre ; enregistrer et continuer conserve la progression guidée. Le changement d’étape actualise l’adresse, pour qu’un rechargement ne ramène pas à la première question.

L’accueil propose deux onglets : commentaires et dissertations. Une seule liste de textes, avec des filtres d’auteur et d’œuvre ; six œuvres de dissertation disposent d’un accès direct à un entraînement et d’un lien vers leurs sujets officiels. Les archives ministérielles restent dans un panneau dépliable. Les textes protégés restent accessibles par leur PDF officiel, sans reproduction illicite.

Les brouillons sont enregistrés à la saisie. Un stockage refusé ou abîmé n’empêche plus l’exercice de s’ouvrir ; une consigne invite à conserver sa réponse par copie. Le récapitulatif affiche les réponses comme du texte.

## Vérification didactique

Parcours suivi comme un élève : annales, français, filtre Leconte de Lisle, première consigne, lecture du support, rédaction, étape suivante, retour au brouillon, rechargement. Aucun choix de mode supplémentaire ni appel au correcteur n’est requis pour commencer ou poursuivre. Les aides restent progressives. Les six entrées de dissertation ouvrent un exercice existant. Les filtres ne créent pas de cartes : les ressources restent présentes sans JavaScript.

## Vérification technique

- Build complet : contrôles des parcours, pages globales et SEO sans nouvelle erreur ; avertissements de performance préexistants de la banque philosophique inchangés.
- Navigateur 390 et 1280 px : parcours ci-dessus, sélection au clavier, brouillons, choix ciblé, stockage indisponible, accès sans JavaScript ; aucun débordement ni erreur JavaScript.
- Les déplacements de liens sont déclarés un par un dans le registre de conservation. Aucun exercice du catalogue n’est retiré.

## Service de correction : diagnostic séparé

Un appel réel le 27 octobre 2026 au worker de production a renvoyé HTTP 502, `code: ai_configuration`. Ce code correspond dans `worker/src/analyze-failure.js` à un refus HTTP 401 ou 403 du fournisseur d’IA. La route du site est joignable ; ce n’est pas une panne d’accès aux exercices. Aucun secret Cloudflare utilisable n’est disponible dans cet environnement.

Action du responsable : dans Cloudflare, ouvrir le worker `atelier-commentaire-ia`, puis ses paramètres de variables et secrets ; rétablir `OPENAI_API_KEY` avec une clé active autorisée pour le projet et le modèle employés. Ne jamais saisir la clé dans le dépôt ou le chat. Déployer puis relancer « Test du retour déployé » ou `scripts/test-live-feedback.mjs`. Un redéploiement des pages statiques ne répare pas une clé refusée. Ne pas déclarer le service rétabli avant la réussite d’un appel réel.
