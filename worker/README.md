# Worker IA — BAC & BREVET — FRANÇAIS

Ce dossier contient le bridage pédagogique du moteur IA utilisé par les exercices du site.

## Principe

Le Worker accepte les parcours `annale-guided` du Bac et du Brevet.

### Bac — commentaire
L'IA est strictement limitée à l'étape en cours :
- donné / attente / transformation ;
- problématique ;
- réponses du plan ;
- pourquoi ? / nécessité ;
- transitions sous forme d'une question simple ;
- réalisations ;
- élément textuel → procédé utile → effet ici ;
- rédaction guidée.

Règles non négociables :
- une grande partie = une **RÉPONSE nécessaire** à la problématique ;
- ne jamais employer « établissement » pour nommer une partie ;
- une transition = **une seule question** qui fait apparaître ce qu'il reste encore à expliquer ;
- ne jamais fournir d'emblée une problématique, un plan ou un commentaire complet ;
- ne jamais inventer une citation.

### Brevet
Chaque question / sous-question devient une étape autonome. Le Worker respecte :
- la consigne exacte ;
- le nombre d'éléments demandé ;
- le barème indicatif ;
- le type de compétence (compréhension, interprétation, grammaire, lexique, réécriture, image, rédaction).

Pour une image absente du contexte, l'IA doit signaler la limite et ne rien inventer.

### Retour pédagogique
Le modèle renvoie seulement :
1. un diagnostic (`acquis`, `partiel`, `à reprendre`) ;
2. un point acquis ;
3. un manque principal ;
4. une question de reprise.

Un second contrôle valide la réponse du modèle avant de l'envoyer au navigateur.

## Petit manuel des procédés

Le PDF complet n'est pas envoyé au modèle ni publié comme ressource statique gratuite.
Certaines étapes peuvent transmettre au Worker une courte liste de procédés candidats (3 à 5 maximum).
L'IA reste limitée à cette liste et doit exiger un **effet contextualisé**.

## Secrets requis

Dans Cloudflare Workers :
- `OPENAI_API_KEY`

Optionnel :
- `OPENAI_MODEL`

Ne jamais placer une clé ou un secret dans GitHub.

## Déploiement

Le Worker public utilisé par le site est :
`https://atelier-commentaire-ia.timour-delemen.workers.dev/api/analyze`

Après toute modification de `src/index.js`, il faut redéployer le Worker Cloudflare.

Avec Wrangler :

```bash
cd worker
npx wrangler deploy
```

Si le Worker est géré depuis l'éditeur Cloudflare, remplacer le code par `src/index.js` puis déployer.