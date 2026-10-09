import sys,re,json,html,os,datetime
SP=os.path.dirname(os.path.abspath(__file__))
C=os.environ.get('CORPUS',os.path.join(SP,'corpus'))
sys.path.insert(0,SP)
from exemples_src import E
def base(s):
    s=html.unescape(s).replace('œ','oe').replace('Œ','Oe').replace('’',"'").replace('ʼ',"'").replace(' ',' ').replace(' ',' ')
    s=re.sub(r'[«»“”"]',' ',s); s=re.sub(r'\s*([;:!?,.])',r'\1',s); s=re.sub(r'\s+',' ',s).replace("' ","'")
    return s.strip()
cache={}
def text(f):
    if f not in cache:
        raw=open(os.path.join(C,f),encoding='utf-8').read()
        raw=re.sub(r'<(teiHeader|note)[\s\S]*?</\1>',' ',raw); raw=re.sub(r'<lb\s*/>|</l>|</p>|</sp>',' ',raw)
        cache[f]=base(re.sub(r'<[^>]+>',' ',raw))
    return cache[f]
URL={'fredracor':'https://github.com/dracor-org/fredracor/blob/main/','oe-hugo':'https://github.com/oeuvres/hugo/blob/gh-pages/','oe-zola':'https://github.com/oeuvres/zola/blob/gh-pages/','oe-baudelaire':'https://github.com/oeuvres/baudelaire/blob/gh-pages/','oe-flaubert':'https://github.com/oeuvres/flaubert/blob/gh-pages/','oe-stendhal':'https://github.com/oeuvres/stendhal/blob/gh-pages/','oe-maupassant':'https://github.com/oeuvres/maupassant/blob/gh-pages/','oe-proust':'https://github.com/oeuvres/proust/blob/gh-pages/'}
NAME={'fredracor':'FreDraCor, corpus du théâtre français (DraCor)'}
today=datetime.date.today().isoformat()
out=[];bad=[]
for e in E:
    e=dict(e); c=e.pop('cit',None)
    if c:
        t=text(c['src']); n=base(c['n'])
        i=t.lower().find(n.lower())
        if i<0: bad.append((e['id'],'introuvable')); c=None
        else:
            orig=t[i:i+len(n)]
            mine=base(c['t'].replace('\n',' ')).rstrip('.,;:!? ')
            if mine.lower() not in base(t[max(0,i-5):i+len(n)+5]).lower() and mine.lower()!=orig.lower():
                bad.append((e['id'],'texte affiché différent : '+orig))
            if orig[0]!=n[0] and orig[0].lower()==n[0].lower(): bad.append((e['id'],'casse: corpus='+orig[:30]))
            top=c['src'].split('/')[0]
            c={'t':c['t'],'qui':c['qui'],'verif':{'date':today,'source':NAME.get(top,'Bibliothèque numérique « oeuvres » (OBVIL, Sorbonne Université)'),'url':URL[top]+c['src'].split('/',1)[1] if top!='fredracor' else URL[top]+c['src'].split('/',1)[1]}}
    e['citation']=c
    out.append(e)
open(sys.argv[1],'w').write('/* Banque d’exemples (philosophie). Généré par l’outil de vérification des citations : ne pas modifier à la main les champs « verif ». */\nwindow.PHILO_EXEMPLES='+json.dumps(out,ensure_ascii=False,indent=0)+';\n')
print(len(out),'fiches ;',sum(1 for e in out if e['citation']),'citations vérifiées')
for b in bad: print('!!',b)
