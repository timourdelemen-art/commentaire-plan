/* Noms de fichiers partagés par les générateurs de la partie philosophie. */
const slug=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function annaleFile(x){
  if(x.type==='dissertation') return 'philosophie-bac-2026-'+slug(x.title)+'.html';
  return 'philosophie-bac-2026-texte-'+slug(x.title.replace(/\(\d{4}\)/,''))+'.html';
}
/* Les cinq gestes du parcours de philosophie, dans l'ordre. Libellés identiques partout :
   bande d'étapes, navigation précédent/suivant (build-philo-boussole.js), menus (site-nav.js, seo-build.js),
   page philosophie.html. Contrôlé par check-philo-parcours.js. */
const PHILO_STEPS=[['philosophie-probleme-pas-a-pas.html','Trouver le problème'],['philosophie-plan-pas-a-pas.html','Construire le plan'],['philosophie-dissertation-entrainement.html','Rédiger'],['philosophie-laboratoire.html','Reprendre une difficulté'],['philosophie-annales.html','Traiter un sujet du bac']];
/* Ressources sans numéro d'étape : diagnostic facultatif et cours. */
const PHILO_RESOURCES=['philosophie-diagnostic.html','philosophie-dissertation.html','philosophie-problematisation.html'];
module.exports={slug,annaleFile,PHILO_STEPS,PHILO_RESOURCES};
