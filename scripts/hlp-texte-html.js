'use strict';
/* Rendu HTML des textes HLP relevés dans les PDF officiels (scripts/hlp-textes.json).
   Partagé par build-hlp.js (pages de sujet) et build-hlp-parcours.js (pages d’entraînement). */
const TEXTES=require('./hlp-textes.json');
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function texteHtml(id){
  const T=TEXTES[id]; if(!T) return '';
  const labels=T.notes.map(n=>n[0]).filter(Boolean), done=new Set();
  const sup=t=>{
    let h=esc(t);
    if(/\(\d\)/.test(h)&&!labels.length) return h.replace(/ \((\d)\)/g,'<sup>($1)</sup>');
    for(const lab of labels){
      if(done.has(lab)) continue;
      const L=lab.replace('*','\\*');
      const m=new RegExp('(?<=[^\\s\\d(])'+L+'(?![\\dA-Za-zÀ-ÿ])|\\s?\\('+L+'\\)| '+L+'(?=[\\s.,;:])').exec(h);
      if(!m) continue;
      h=h.slice(0,m.index)+'<sup>'+lab+'</sup>'+h.slice(m.index+m[0].length); done.add(lab);
    }
    return h;
  };
  const rows=T.items.map(x=>{
    if(x.k==='chap') return '<p class="didascalie">'+sup(x.t)+'</p>';
    if(x.k==='title') return '<p class="vers"><strong>'+esc(x.t)+'</strong></p>';
    if(x.k==='sp'){ const m=x.t.match(/^([^,]+)(,.*)?$/); return '<p class="vers locuteur">'+esc(m[1])+(m[2]?'<em>'+esc(m[2])+'</em>':'')+'</p>'; }
    if(x.k==='did') return '<p class="didascalie">'+sup(x.t)+'</p>';
    if(x.k==='date') return '<p class="vers" style="text-align:right">'+esc(x.t)+'</p>';
    if(x.k==='v') return '<p class="vers"'+(x.stanza?' style="margin-top:.9em"':'')+'>'+(x.n?'<span class="line-no" aria-hidden="true">'+x.n+'</span>':'')+(x.cont?'<span style="display:inline-block;width:6em"></span>':'')+sup(x.t)+'</p>';
    return '<p>'+sup(x.t)+'</p>';
  }).join('\n');
  const notes=T.notes.length?'<p class="micro">'+T.notes.map(n=>(n[0]?'<sup>'+esc(n[0])+'</sup> ':'')+esc(n[1])).join('<br>')+'</p>':'';
  return '<div class="texte-examen">\n'+rows+'\n</div>\n<p class="micro">'+esc(T.src)+'</p>'+notes;
}
const PARCOURS=require('./hlp-parcours-data.json').subjects.filter(q=>q.level==='terminale');
module.exports={TEXTES,texteHtml};
