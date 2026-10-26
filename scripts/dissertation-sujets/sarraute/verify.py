import re,sys,unicodedata
sys.path.insert(0,'.')
from copies import COPIES
play=open('play.txt',encoding='utf8').read()
play=play.replace('­\n','').replace('-\n','')
play=re.sub(r'\n\s*\d{1,2}\s+Pour un oui ou pour un non\s*\n|\n\s*Pour un oui ou pour un non\s+\d{1,2}\s*\n|\n\s*i\d\s+Pour un oui ou pour un non\s*\n','\n',play)
def words(s):
    s=s.replace('’',"'").replace('œ','oe').lower()
    s=re.sub(r'<[^>]+>','',s)
    return ' '.join(re.findall(r"[a-zàâäéèêëîïôöùûüç0-9]+",s))
P=words(play)
# allow OCR 1/i confusion not needed in quotes
def toplevel(s):
    out=[];depth=0;cur=''
    for ch in s:
        if ch=='«':
            depth+=1
            if depth==1: cur='';continue
        if ch=='»':
            depth-=1
            if depth==0: out.append(cur);continue
        if depth>=1: cur+=ch
    return out
crit=['un jeu dans lequel tous les coups sont permis','spectaculaire','profondément théâtrale','ce qui se tisse entre les mots','développent une agressivité','la raison est insaisissable','théâtre et dispute']
bad=0;n=0
for k,c in COPIES.items():
    for h,rows in c['blocks']:
        for t,l in rows:
            for q in toplevel(t):
                if any(x in q for x in crit): continue
                parts=[p for p in re.split(r'\[[^\]]*\]',q) if words(p)]
                for p in parts:
                    n+=1
                    if words(p) not in P:
                        bad+=1; print(k,'| NON TROUVÉ:',p)
print(n,'citations,',bad,'non trouvées')
