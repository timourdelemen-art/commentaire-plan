import sys,re,html
sys.path.insert(0,'.')
from copies import COPIES
R=sys.argv[1]
def plain(s): return re.sub(r'<[^>]+>','',s)
for k,c in COPIES.items():
    rows=[t for h,b in c['blocks'] for t,l in b]
    nw=sum(len(plain(t).split()) for t in rows); ns=len(rows)
    print(k,ns,'phrases',nw,'mots', '(retenue)' if c.get('hold') else '')
    if c.get('hold') and '--all' not in sys.argv: continue
    slug=f"bac-dissertation-copie-20-pour-un-oui-ou-pour-un-non-{k}.html"
    q=plain(c['sujet']).strip('« »').strip()
    blocks=''
    for h,b in c['blocks']:
        inner=(f'<h3 class="c20-h">{h}</h3>' if h else '')+''.join(f'<p class="c20-s"><span class="c20-t">{t}</span><span class="c20-f">{l}</span></p>' for t,l in b)
        blocks+=f'<div class="c20-block">{inner}</div>'
    pdf=f'<br><a class="official-link" href="{c["pdf"]}" rel="noopener">Le sujet officiel (PDF) →</a>' if c['pdf'] else '<br><span class="micro">Libellé vérifié sur deux copies du sujet officiel.</span>'
    why=''.join(f'<div><strong>{a}</strong><p>{b}</p></div>' for a,b in c['why'])
    title=f"Dissertation à 20 sur Pour un oui ou pour un non de Sarraute : {plain(c['titre'])}"
    desc=f"Une dissertation qui mérite 20 sur un vrai sujet du bac de français : {html.escape(plain(c['sujet']))} La fonction de chaque phrase."
    page=f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="styles.css"><link rel="canonical" href="https://commentaire-plan.com/{slug}">
</head><body><header class="top"></header><main class="wrap dc20-page">

<section class="pagehead"><div><div class="kicker">BAC · DISSERTATION · LA COPIE À 20</div><h1>Une dissertation à 20<br>sur <em>Pour un oui ou pour un non</em>.</h1>
<p class="lede">La copie la plus courte qui mérite 20, sur un vrai sujet du bac : {ns} phrases, environ {round(nw,-1)} mots. Lisez-la d’abord d’une traite, puis affichez le rôle de chaque phrase.</p>
<div class="boussole" aria-label="Avant de commencer"><p><b>D’où vous partez</b>Un vrai sujet du bac et une copie complète.</p><p><b>Ce que vous faites</b>Vous lisez la copie, puis vous affichez la fonction de chaque phrase.</p><p><b>Ce que vous obtenez</b>Le modèle d’une copie courte : chaque phrase a un rôle, aucune ne remplit.</p></div></div>
<aside class="side-note"><p><strong>Le sujet</strong><br>{c['sujet']}</p><p class="dc20-meta">{c['session']}. Œuvre : Nathalie Sarraute, <em>Pour un oui ou pour un non</em> ; parcours associé : « théâtre et dispute ».{pdf}</p><p class="dc20-badge">Copie rédigée pour le site</p></aside></section>

<section class="offer-band" id="copie"><div class="kicker">LA COPIE</div><h2>{c['titre']}</h2>
<p><button type="button" class="philo-print dc20-toggle" aria-controls="dc20-copie" aria-pressed="false">Voir la fonction de chaque phrase</button></p>
<div class="c20 dc20 c20-plain" id="dc20-copie">{blocks}</div>
<p class="micro dc20-note">Chaque réplique citée a été relue mot pour mot dans l’édition Gallimard du <em>Théâtre</em> de Nathalie Sarraute. La pièce n’a ni actes ni scènes : les passages sont situés par leur moment dans le dialogue. Les personnages s’y nomment H. 1, H. 2, H. 3 et F.</p>
</section>

<section class="offer-band"><div class="kicker">POURQUOI CETTE COPIE MÉRITE 20</div><h2>Rien n’y est décoratif.</h2>
<div class="grid-3">
{why}
</div>
<p><a class="official-link" href="/bac-dissertation-sujets.html#sarraute">Tous les vrais sujets sur <em>Pour un oui ou pour un non</em> →</a><br><a class="official-link" href="/bac-dissertation.html#diss-probleme">Trouver le problème sur de vrais sujets, au clic →</a><br><a class="official-link" href="/bac-dissertation-methode.html">La méthode complète de la dissertation →</a></p></section>

</main><script>
(function(){{var b=document.querySelector('.dc20-toggle');if(!b)return;var c=document.getElementById(b.getAttribute('aria-controls'));
b.addEventListener('click',function(){{var on=c.classList.toggle('c20-plain');b.setAttribute('aria-pressed',on?'false':'true');b.textContent=on?'Voir la fonction de chaque phrase':'Masquer la fonction de chaque phrase';}});}})();
</script><script src="site-nav.js"></script></body></html>
'''
    open(f"{R}/{slug}","w",encoding='utf8').write(page)
