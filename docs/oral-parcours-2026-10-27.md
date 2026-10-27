# Oral du français : un parcours qui peut aller jusqu'au bout

## Problèmes constatés

La page proposait plusieurs imports avant toute action, séparait le démarrage du micro de celui du chronomètre et attendait la correction distante pour ouvrir l'entretien. Une panne du service bloquait donc le passage à la deuxième partie. Les transcriptions et l'échange n'étaient pas restaurés après rechargement. Une erreur de microphone était aussitôt remplacée par « Micro arrêté ».

## Changements

- Trois moments visibles : texte, préparation, passage. Copier le texte ou choisir l'un des deux supports publiés suffit ; photo, PDF et métadonnées sont secondaires.
- Le texte choisi reste entièrement lisible, avec le défilement normal de la page. Le PDF s'ouvre localement pour en copier le passage ; aucune extraction automatique n'est promise.
- Le clic sur le micro demande l'accès au service vocal du navigateur. Le chronomètre de la partie démarre lorsque l'écoute commence. Une seule écoute peut être active. Un refus reste expliqué et permet de réessayer.
- La fin d'un passage arrête l'écoute avant de lire la transcription. Les transcriptions et les échanges restent dans ce navigateur, y compris après rechargement ; recommencer les efface.
- L'entretien s'ouvre sans attendre le bilan de l'exposé. Si le service est indisponible, les relances génériques sont explicitement nommées « relances d'entraînement ». Le bilan propose une reprise, sans inventer d'acquis ni de note. Une transcription ne permet pas d'évaluer la voix.

Le service de retour personnalisé reste en erreur de configuration en production. Ces changements ne rétablissent pas ses identifiants. La politique HTTP qui interdisait tous les microphones a déjà été corrigée séparément dans la PR 227.

## Validation

Build complet dans une copie jetable ; contrôle global et SEO sans erreur nouvelle. Le contrôle d'oral parcourt les deux supports, la transcription, le chronomètre, la panne du service, l'entretien, le bilan, les brouillons, un bilan partiel disponible et le redémarrage, à 390 et 1280 pixels. Les événements de reconnaissance vocale y sont simulés : cela ne constitue pas un test de transcription réelle par Google. L'accès natif au microphone est vérifié séparément par `check-browser-micro.cjs`, avec une vraie piste audio factice et une politique HTTP refusée puis autorisée.

Les nouvelles grilles officielles sont envisagées comme documents facultatifs de relecture, sans ajout de grille à chaque exercice.
