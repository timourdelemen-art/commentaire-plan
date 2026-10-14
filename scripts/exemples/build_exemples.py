import sys,re,json,html,os,datetime,hashlib
from pathlib import Path
SP=os.path.dirname(os.path.abspath(__file__))
C=os.environ.get('CORPUS',os.path.join(SP,'corpus'))
sys.path.insert(0,SP)
from exemples_src import E

def build_scene_bank(output=None, examples=None, audit_path=None):
    """Build the Worker candidate bank from the example source and scene audit."""
    examples = E if examples is None else examples
    audit_path = Path(audit_path or Path(SP,'scenes-audit.json'))
    output = Path(output or Path(SP).resolve().parents[1] /
                  'worker/src/philo-engine/scene-bank.json')
    audit_data = json.loads(audit_path.read_text(encoding='utf-8'))
    audits = {scene['id']: scene for scene in audit_data['scenes']}
    candidates = []

    for item in examples:
        audit = audits.get(item['id'])
        if not audit:
            continue
        links = []
        audited_links = {link['sujet']: link for link in audit.get('raccords', [])}
        for subject in item.get('sujets') or []:
            if not subject.get('limite1') or not subject.get('limite2'):
                continue
            links.append({
                **subject,
                'audit': audited_links.get(subject['s'])
            })
        if not links:
            continue
        candidates.append({
            'id': item['id'],
            'oeuvre': item.get('oeuvre'),
            'auteur': item.get('auteur'),
            'annee': item.get('annee'),
            'genre': item.get('genre'),
            'ref': item.get('ref'),
            'scene': item.get('scene'),
            'scene_description_sha256': hashlib.sha256(
                (item.get('scene') or '').encode('utf-8')
            ).hexdigest(),
            'sujets': links,
            'audit': {
                'sha256_fiche': audit.get('sha256_fiche'),
                'source_narrative': audit.get('source_narrative'),
                'statut_narratif': audit.get('statut_narratif'),
                'citation_controlee': audit.get('citation_controlee'),
                'homologation_ouverture': audit.get('homologation_ouverture'),
                'description_fidelity_verified': audit.get(
                    'description_fidelity_verified', False
                ),
                'verified_scene_description_sha256': audit.get(
                    'verified_scene_description_sha256'
                )
            }
        })

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(candidates, ensure_ascii=False, indent=2) + '\n',
                      encoding='utf-8')
    return candidates

def base(s):
    s=html.unescape(s).replace('œ','oe').replace('Œ','Oe').replace('’',"'").replace('ʼ',"'").replace(' ',' ').replace(' ',' ')
    s=re.sub(r'[«»“”"]',' ',s); s=re.sub(r'\s*([;:!?,.])',r'\1',s); s=re.sub(r'\s+',' ',s).replace("' ","'")
    return s.strip()
cache={}
def text(f):
    if f not in cache:
        raw=Path(C,f).read_text(encoding='utf-8')
        raw=re.sub(r'<(teiHeader|note)[\s\S]*?</\1>',' ',raw); raw=re.sub(r'<lb\s*/>|</l>|</p>|</sp>',' ',raw)
        cache[f]=base(re.sub(r'<[^>]+>',' ',raw))
    return cache[f]
URL={'fredracor':'https://github.com/dracor-org/fredracor/blob/main/','oe-hugo':'https://github.com/oeuvres/hugo/blob/gh-pages/','oe-zola':'https://github.com/oeuvres/zola/blob/gh-pages/','oe-baudelaire':'https://github.com/oeuvres/baudelaire/blob/gh-pages/','oe-flaubert':'https://github.com/oeuvres/flaubert/blob/gh-pages/','oe-stendhal':'https://github.com/oeuvres/stendhal/blob/gh-pages/','oe-maupassant':'https://github.com/oeuvres/maupassant/blob/gh-pages/','oe-proust':'https://github.com/oeuvres/proust/blob/gh-pages/'}
NAME={'fredracor':'FreDraCor, corpus du théâtre français (DraCor)'}
def checked(c):
    """Only mark a displayed quotation verified if its exact normalized text exists."""
    try:
        t=text(c['src']); needle=base(c['n']); displayed=base(c['t'].replace('\n',' '))
    except (OSError,KeyError) as err:
        return None,'source indisponible : '+str(err)
    if not needle or needle.lower() not in t.lower():
        return None,'passage introuvable'
    # Typography is normalized; word order, punctuation and case are preserved.
    if not displayed or displayed not in t:
        return None,'texte affiché différent du corpus'
    top=c['src'].split('/')[0]
    if top not in URL:
        return None,'corpus sans provenance'
    return {'t':c['t'],'qui':c['qui'],'verif':{
        'date':datetime.date.today().isoformat(),
        'source':NAME.get(top,'Bibliothèque numérique « oeuvres » (OBVIL, Sorbonne Université)'),
        'url':URL[top]+c['src'].split('/',1)[1],
        'sha256_source':hashlib.sha256(Path(C,c['src']).read_bytes()).hexdigest()}},None

def build(output):
    out=[];bad=[]
    ids=[e['id'] for e in E]
    if len(ids)!=len(set(ids)):raise ValueError('Identifiant de scène dupliqué')
    for item in E:
        e=dict(item); c=e.pop('cit',None)
        if c:
            c,error=checked(c)
            if error:bad.append((e['id'],error))
        e['citation']=c;out.append(e)
    # A rejected quotation is kept only as a scene, with no badge. Return failure
    # so a release cannot silently turn a failed verification into a success.
    Path(output).write_text('/* Banque d’exemples (philosophie). Généré par le vérificateur : ne pas modifier les champs « verif ». */\nwindow.PHILO_EXEMPLES='+json.dumps(out,ensure_ascii=False,indent=0)+';\n',encoding='utf-8')
    print(len(out),'fiches ;',sum(1 for e in out if e['citation']),'citations vérifiées')
    for b in bad:print('!!',b)
    return 1 if bad else 0

if __name__=='__main__':
    status=build(sys.argv[1])
    build_scene_bank()
    sys.exit(status)
