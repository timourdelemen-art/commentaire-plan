/* Noms de fichiers partagés par les générateurs de la partie philosophie. */
const slug=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function annaleFile(x){
  if(x.type==='dissertation') return 'philosophie-bac-2026-'+slug(x.title)+'.html';
  return 'philosophie-bac-2026-texte-'+slug(x.title.replace(/\(\d{4}\)/,''))+'.html';
}
module.exports={slug,annaleFile};
