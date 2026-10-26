import re,sys,unicodedata,importlib.util
def load(p):
    sp=importlib.util.spec_from_file_location('m',p);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m.C
def norm(s):
    s=s.replace('œ','oe').replace('Œ','OE').replace('æ','ae')
    s=unicodedata.normalize('NFD',s); s=''.join(c for c in s if unicodedata.category(c)!='Mn')
    return re.sub(r'[^a-z0-9]','',s.lower())
def quotes(t):
    t=re.sub(r'<[^>]+>','',t); out=[]; depth=0; cur=''
    for ch in t:
        if ch=='«':
            depth+=1
            if depth==1: cur=''; continue
        if ch=='»':
            depth-=1
            if depth==0: out.append(cur); continue
        if depth>=1: cur+=ch
    return out
src={'ponge':open('ponge_clean.txt').read(),'dorion':open('dorion_clean.txt').read()}
for name,f in [('ponge','ponge_copies.py'),('dorion','dorion_copies.py')]:
    T=norm(src[name]); C=load(f); bad=0
    for k,c in C.items():
        rows=[t for h,b in c['blocks'] for t,l in b]
        for t in rows:
            for q in quotes(t):
                for part in re.split(r'\[…\]|\[[^\]]*\]|…',q):
                    n=norm(part)
                    if len(n)<6: continue
                    if n not in T:
                        bad+=1; print(name,k,'|',part.strip()[:110])
    print(name,'manquants',bad)
