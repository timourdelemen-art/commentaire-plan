# Accès gratuit / premium — architecture

## État actuel
- La méthode, les textes et les réponses écrites restent accessibles.
- 5 diagnostics IA gratuits sont accordés dans le navigateur.
- Le quota diminue uniquement après un diagnostic IA réussi.
- À quota nul, le diagnostic IA est remplacé par le paywall vers `offre.html`.
- Prix de lancement affiché : 29 €, paiement unique envisagé.

## Règle de sécurité avant commercialisation
Le stockage navigateur n'est qu'un mécanisme de pré-lancement. Il ne doit jamais constituer la preuve d'un achat.

Avant d'activer le paiement :
1. créer une identité utilisateur ou un identifiant d'achat durable ;
2. recevoir la confirmation du prestataire de paiement côté serveur (webhook) ;
3. enregistrer le droit premium côté serveur ;
4. vérifier ce droit côté Worker avant chaque opération IA premium ;
5. ne jamais faire confiance à une valeur `premium=true` envoyée par le navigateur.

## Intégration du futur prestataire
Le prestataire (Garanti Sanal POS, PayTR ou autre) ne doit changer qu'une seule chose :
`free / blocked -> paid`

Le contenu pédagogique ne dépend pas du prestataire de paiement.
