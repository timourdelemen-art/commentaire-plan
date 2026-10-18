/* Une seule adresse par page.
   Netlify sert chaque page à deux adresses : /page.html et /page. Google indexait les deux,
   et choisissait parfois la version sans .html malgré la balise canonique (ex. la notion de
   conscience : 176 impressions sans .html, 64 avec, en octobre 2026). Le fichier _redirects ne
   peut pas envoyer /page vers /page.html (Netlify sert le fichier avant la règle) : il faut
   cette fonction.
   Règle : une adresse sans extension qui renvoie une page HTML (200) est redirigée en 301 vers
   la même adresse suivie de .html, paramètres conservés. Tout le reste passe sans changement :
   l'accueil, les dossiers (/…/), les fichiers avec extension, les erreurs et les redirections. */

export default async (request, context) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  const url = new URL(request.url);
  const path = url.pathname;
  const last = path.slice(path.lastIndexOf('/') + 1);
  if (!last || last.includes('.')) return;

  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (response.status !== 200 || !type.includes('text/html')) return response;

  url.pathname = path + '.html';
  return new Response(null, {
    status: 301,
    headers: { location: url.pathname + url.search, 'cache-control': 'public, max-age=3600' },
  });
};

export const config = {
  path: '/*',
  excludedPath: [
    '/*.html', '/*.css', '/*.js', '/*.mjs', '/*.json', '/*.xml', '/*.txt',
    '/*.png', '/*.jpg', '/*.jpeg', '/*.webp', '/*.gif', '/*.svg', '/*.ico',
    '/*.pdf', '/*.woff', '/*.woff2', '/*.mp3', '/*.mp4',
  ],
};
