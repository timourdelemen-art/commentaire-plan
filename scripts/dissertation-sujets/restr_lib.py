import re
def parse(h):
    m=re.search(r'(<div class="c20 dc20[^"]*" id="dc20-copie">)(.*?)(</div>\s*<p class="micro dc20-note">)',h,re.S)
    blocks=[]
    for b in re.findall(r'<div class="c20-block">(.*?)</div>',m.group(2),re.S):
        hd=re.search(r'<h3 class="c20-h">(.*?)</h3>',b)
        rows=re.findall(r'<span class="c20-t">(.*?)</span><span class="c20-f">(.*?)</span>',b)
        blocks.append([hd.group(1) if hd else None, list(rows)])
    return m,blocks
def render(blocks):
    out=''
    for h,b in blocks:
        out+='<div class="c20-block">'+(f'<h3 class="c20-h">{h}</h3>' if h else '')+''.join(f'<p class="c20-s"><span class="c20-t">{t}</span><span class="c20-f">{l}</span></p>' for t,l in b)+'</div>'
    return out
def save(f,h,m,blocks):
    h=h[:m.start(2)]+render(blocks)+h[m.end(2):]
    rows=[t for _,b in blocks for t,_ in b]
    ns=len(rows); nw=sum(len(re.sub('<[^>]+>','',t).split()) for t in rows)
    h=re.sub(r'(class="lede">[^<]*?: )\d+ phrases, environ \d+ mots',lambda x:f'{x.group(1)}{ns} phrases, environ {round(nw,-1)} mots',h)
    open(f,'w').write(h); print(f,ns,nw,[len(b) for _,b in blocks])
A,P,C='Argument','Le passage qui prouve','Ce que le passage montre'
