import test from 'node:test';
import assert from 'node:assert/strict';
import {examinerCandidate,selectionnerProblematiques,RELATIONS} from './problematic-selector.mjs';

function exemplaire(){
  return {
    id:"artiste-reciproque",
    sujet:{libelle:"L’artiste sait-il ce qu’il fait ?",operateur:"sait-il",portee:"Quel savoir est exigé par la conduite d'une création ?",glissementsExclus:["ne pas assimiler savoir à prévision intégrale"]},
    branches:[
      {reponse:"Le métier rend le geste délibéré",raisonForte:"Un choix technique a des raisons",meilleurCas:"L'artiste expert",obstacle:"Le métier n'établit pas toute la singularité du résultat",inferenceInterne:"Des règles reproductibles ne déterminent pas seules la forme singulière",objectionForte:"L'artiste sait improviser",reponseObjection:"L'improvisation est un savoir, mais il faut expliquer comment il s'acquiert"},
      {reponse:"La forme apparaît en travaillant",raisonForte:"Le retour de la matière informe le geste",meilleurCas:"L'artiste improvise lucidement",obstacle:"La surprise ne permet pas seule d'attribuer une œuvre à un auteur",inferenceInterne:"Un accident non retenu n'est pas une décision créatrice",objectionForte:"L'œuvre peut naître du hasard",reponseObjection:"Il faut justifier le rôle du jugement qui retient la trouvaille"}
    ],
    relation:{type:"dependance_reciproque",mecanisme:"Le savoir règle l'essai; l'essai transforme le savoir",liaisonDesObstacles:"L'acte réglé manque d'invention; l'invention sans sélection manque de conduite",deAversB:"Le projet doit subir l'épreuve de la forme produite",deBversA:"Une forme surgie doit être reconnue, jugée et reprise",meilleurCumul:"Artiste expert, inventif et réflexif",deficitDuCumul:"Cette coexistence ne décrit pas encore comment un jugement se forme par la production",epreuveContraire:"Une exécution mécanique n'est-elle pas suffisante ?",reponseEpreuve:"Elle prouve un savoir-faire, non l'invention particulière",questionNouvelle:"Comment le savoir de l'artiste se forme-t-il dans son acte sans perdre sa capacité de le diriger ?"},
    formulations:[
      {question:"Comment un artiste peut-il savoir ce qu'il fait lorsque son travail lui apprend ce qu'il fait ?",gain:"Fait porter la question sur la genèse du savoir",risque:"Répétition à condenser"},
      {question:"Comment le savoir de l'artiste dirige-t-il une création qui le transforme ?",gain:"Exprime le rapport réciproque",risque:"Peut préjuger la résolution"}
    ]
  };
}
test('la relation réciproque requiert les deux preuves de dépendance',()=>{
  const c=exemplaire();
  assert.equal(examinerCandidate(c).statut,"recevable_pour_examen_contradictoire");
  delete c.relation.deBversA;
  const r=examinerCandidate(c);
  assert.equal(r.statut,"a_reconstruire");
  assert(r.objectionsDocumentaires.some(x=>x.where==="relation.deBversA"));
});
test('un lien verbal ne remplace pas le déficit du cumul',()=>{
  const c=exemplaire();
  c.relation.deficitDuCumul="";
  assert.equal(examinerCandidate(c).statut,"a_reconstruire");
});
test('la contradiction stricte est une forme possible et exige sa preuve propre',()=>{
  const c=exemplaire();
  c.relation.type="incompatibilite";
  assert(examinerCandidate(c).objectionsDocumentaires.some(x=>x.where==="relation.conditionCommune"));
  c.relation.conditionCommune="Une même propriété selon le même rapport";
  c.relation.impossibilite="La propriété serait simultanément requise et exclue";
  assert.equal(examinerCandidate(c).statut,"recevable_pour_examen_contradictoire");
});
test('une reformulation rétrospective ne peut être déduite de la matrice seule',()=>{
  const c=exemplaire();
  c.revisionRetrospective={nouvelleFormulation:"Question séduisante"};
  const r=examinerCandidate(c);
  assert(r.objectionsDocumentaires.some(x=>x.where==="revisionRetrospective.raisonIndependante"));
});
test('une matrice candidate doit expliciter ses trois acquis et son coût',()=>{
  const c=exemplaire();
  c.resolution={matrice:"processualisation",mecanisme:"boucle de travail",eclairageRetrospectif:"le savoir est transformé par l'action",preuvesAvantMatrice:"choix et expérience sont déjà établis",coutEtReste:"valeur indépendante de l'œuvre",acquisIII:["savoir situé","révision de la forme"]};
  assert(examinerCandidate(c).objectionsDocumentaires.some(x=>x.where==="resolution.acquisIII"));
  c.resolution.acquisIII.push("jugement nouveau");
  assert.equal(examinerCandidate(c).statut,"recevable_pour_examen_contradictoire");
});
test('sélection non automatique même sur fiche complète',()=>{
  const c=exemplaire();
  const dossier={sujet:c.sujet.libelle,candidates:[c]};
  const without=selectionnerProblematiques(dossier);
  assert.equal(without.selectionProvisoire,null);
  assert.equal(without.homologation,false);
  dossier.arbitrage={id:c.id,justificationComparative:"Meilleure explication du mécanisme que la simple juxtaposition",objectionDecisive:"La cohabitation des deux savoirs peut suffire",reponseAObjection:"Le processus de formation du jugement demeure à prouver",relecteur:"Audit comparatif"};
  const selected=selectionnerProblematiques(dossier);
  assert.equal(selected.selectionProvisoire,c.id);
  assert.equal(selected.homologation,false);
});
test('aucune fiche lacunaire n'est choisie par défaut',()=>{
  const c=exemplaire();c.relation.liaisonDesObstacles="";
  const r=selectionnerProblematiques({candidates:[c],arbitrage:{id:c.id,justificationComparative:"x",objectionDecisive:"y",reponseAObjection:"z",relecteur:"A"}});
  assert.deepEqual(r.admissiblesPourExamen,[]);
  assert.equal(r.selectionProvisoire,null);
});
test('répertoire ouvert de relations : le nom seul ne valide rien',()=>{
  assert(RELATIONS.dependance_reciproque);
  const c=exemplaire();c.relation.type="autre";
  c.relation.mecanisme="";
  assert.equal(examinerCandidate(c).statut,"a_reconstruire");
});
