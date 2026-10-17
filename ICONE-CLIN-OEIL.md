# Vignette philosophique — 17 octobre 2026

Demande du propriétaire : intégrer l’image fournie comme petite icône cliquable, pour le plaisir de faire découvrir le site à ses amis. Le propriétaire a ensuite choisi « La Phrase juste » et demandé sa mise en place avec un en-tête court.

La vignette est placée à côté du nom, dans l’en-tête statique et son équivalent JavaScript. Le lien ouvre une page avec l’image entière et un retour à l’accueil. L’image n’est pas retouchée : seules ses dimensions de livraison et son encodage sont adaptés au Web.

La vignette de 120 pixels pèse 4 706 octets ; le grand visuel de 1 117 × 1 408 pixels pèse 104 242 octets. La grande image n’est chargée que sur la page du clin d’œil. Celle-ci porte `noindex,follow` et ne rejoint pas le sitemap. La fonction humoristique est distincte du lien du nom, qui conduit toujours à l’accueil.

Le lien possède un nom accessible, un focus visible et fonctionne sans JavaScript. La vignette conserve l’image entière, sans recadrage. Aucun nouveau script n’est chargé.

Contrôles prévus dans le workflow navigateur : en-tête et menus à 390 et 1280 pixels, vignette chargée, absence de chargement du grand visuel avant le clic, activation au clavier, image entière, retour, captures et parcours sans JavaScript. Le contrôle d’intégration existant vérifie aussi que les six intitulés de navigation ne sont pas tronqués.

Le nom seul, sur deux lignes, figure dans l’en-tête avec la vignette et les menus. La signature « Lire, penser, écrire — du brevet au bac. » figure uniquement sur l’accueil. Les titres précis de chaque page sont conservés, avec le nouveau nom de marque ; le domaine et les URL restent identiques. Le consentement du formulaire et les métadonnées WebSite/Open Graph suivent le nom choisi. Le build harmonise également les pages produites par les autres générateurs. Les contrôles d’en-tête sont étendus à 320 et 1051 pixels, en plus de 390 et 1280 pixels, avec vérification de l’absence de chevauchement.

L’image de partage sociale est exportée depuis `assets/partage-site.svg`, avec le nouveau nom et la signature du site, pour éviter de conserver l’ancienne marque sur les liens partagés.
