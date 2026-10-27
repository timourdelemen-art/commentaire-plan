# Dictée et oral : le microphone était interdit par le site

Le signalement « Micro refusé : autorisez-le dans les réglages du navigateur », dans Chrome, a conduit à vérifier les règles du site avant de demander un changement local à l’utilisateur. L’en-tête réellement reçu en production était `Permissions-Policy: camera=(), microphone=(), geolocation=()` : le site interdisait le microphone à ses propres pages.

La correction remplace uniquement `microphone=()` par `microphone=(self)`. Le navigateur conserve sa demande d’autorisation. Ni les caméras ni la géolocalisation ne sont ouvertes. Aucune activation du micro au chargement, transmission nouvelle ou modification du correcteur.

Le test utilise le vrai `getUserMedia` de Chromium et un périphérique audio factice. Avec la permission du contexte accordée, le témoin reproduisant l’ancienne règle renvoie encore `NotAllowedError`. Avec la nouvelle règle, les pages d’oral et d’exercice obtiennent une piste audio active, puis la ferment. Contrôle à 390 et 1280 px. Cette vérification démontre l’accès au microphone ; elle ne remplace pas une dictée réelle dans le navigateur de l’utilisateur, dont le service de transcription dépend aussi de Chrome.

## Coordination

La PR132 ancienne réserve `netlify.toml` pour son travail sur la commande de build. Le signalement actuel nécessite une correction urgente de l’en-tête global : cette PR isolée ne modifie aucune commande ni ressource de la bibliothèque. La différence se limite à la directive microphone. Le correctif doit être conservé lors des intégrations ultérieures. Le propriétaire autorise explicitement la validation, la fusion et le déploiement des travaux.
