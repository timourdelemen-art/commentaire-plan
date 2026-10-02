# Worker IA — L’Atelier du commentaire

Ce dossier contient le premier bridage pédagogique du moteur IA.

## Principe

Le Worker n’autorise actuellement qu’un exercice :
- `hialmar-problematique`

Le moteur peut diagnostiquer une tentative, signaler un seul manque et poser une seule question.
Il ne doit pas fournir la problématique modèle, un plan ou une correction complète.

Un second contrôle valide la réponse du modèle avant de l’envoyer au navigateur. Si le format ou le vocabulaire ne respecte pas les règles, le Worker renvoie un retour pédagogique de secours.

## Secret requis

Dans Cloudflare Workers, ajouter/conserver le secret :
- `OPENAI_API_KEY`

Ne jamais mettre la valeur de la clé dans GitHub.

Optionnel :
- `OPENAI_MODEL` pour choisir le modèle sans modifier le code.

## Déploiement

Le fichier à coller dans l’éditeur Cloudflare si l’on ne passe pas par Wrangler est :
- `src/index.js`
