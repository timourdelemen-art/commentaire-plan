/**
 * Sélecteur expérimental de problématiques — recherche V7.4.
 * Ne produit ni vérité philosophique ni homologation automatique.
 * Ne modifie ni le moteur de publication ni le protocole V7.3.
 */
export const RELATIONS = Object.freeze({
  incompatibilite: "Deux exigences ne peuvent être satisfaites sous une même condition démontrée.",
  dependance_reciproque: "Chaque obstacle renvoie à une condition que l'autre réponse permet de penser, dans les deux sens.",
  dependance_asymetrique: "Une réponse suppose l'autre, qui modifie ses conditions ou son domaine.",
  condition_autolimitante: "Une condition de réussite tend, dans des conditions prouvées, à compromettre cette réussite.",
  retroaction: "Le résultat de chaque moment modifie les conditions du moment suivant.",
  changement_de_critere: "Deux échecs révèlent que le critère initial d'évaluation doit être reconstruit.",
  autre: "Une relation singulière est reconstruite et argumentée sans être forcée dans une famille."
});

const present = value => typeof value === "string" && value.trim().length > 0;
const list = value => Array.isArray(value) && value.length > 0;
const issue = (where, problem) => ({ where, problem });
const check = (problems, path, value, message) => { if (!present(value)) problems.push(issue(path, message)); };

/** Vérifie la complétude des JUSTIFICATIONS, non la vérité de leur contenu. */
export function examinerCandidate(candidate) {
  const problems = [];
  const s = candidate?.sujet || {};
  check(problems, "sujet.libelle", s.libelle, "Le libellé exact manque.");
  check(problems, "sujet.operateur", s.operateur, "L'opérateur du sujet n'est pas qualifié.");
  check(problems, "sujet.portee", s.portee, "La portée de l'opérateur n'est pas établie.");
  if (!list(s.glissementsExclus)) problems.push(issue("sujet.glissementsExclus", "Il faut auditer les glissements de sens à éviter."));

  const branches = candidate?.branches;
  if (!Array.isArray(branches) || branches.length !== 2) {
    problems.push(issue("branches", "Deux réponses sérieuses et deux obstacles propres sont attendus."));
  } else {
    branches.forEach((b, i) => {
      for (const field of ["reponse", "raisonForte", "meilleurCas", "obstacle", "inferenceInterne", "objectionForte", "reponseObjection"]) {
        check(problems, `branches[${i}].${field}`, b?.[field], "Le raisonnement de branche n'est pas reconstruit.");
      }
    });
  }

  const r = candidate?.relation || {};
  if (!Object.hasOwn(RELATIONS, r.type)) problems.push(issue("relation.type", "Rapport inconnu ou non spécifié."));
  for (const field of ["mecanisme", "liaisonDesObstacles", "meilleurCumul", "deficitDuCumul", "epreuveContraire", "reponseEpreuve", "questionNouvelle"]) {
    check(problems, `relation.${field}`, r[field], "Le rapport doit être démontré, pas seulement nommé.");
  }
  if (r.type === "dependance_reciproque") {
    check(problems, "relation.deAversB", r.deAversB, "Prouver la première dépendance.");
    check(problems, "relation.deBversA", r.deBversA, "Prouver la dépendance inverse, non la répéter.");
  }
  if (r.type === "incompatibilite") {
    check(problems, "relation.conditionCommune", r.conditionCommune, "Identifier la condition sous laquelle l'incompatibilité est prouvée.");
    check(problems, "relation.impossibilite", r.impossibilite, "Démontrer l'incompatibilité, non l'affirmer.");
  }
  if (r.type === "retroaction") {
    check(problems, "relation.regleDePassage", r.regleDePassage, "Expliquer la règle de passage et les effets en retour.");
  }
  if (r.type === "condition_autolimitante") {
    check(problems, "relation.condition", r.condition, "Identifier la condition indispensable.");
    check(problems, "relation.retournement", r.retournement, "Démontrer comment et quand la condition devient limitante.");
  }
  const secondary = candidate?.relationsSecondaires || [];
  if (!Array.isArray(secondary)) problems.push(issue("relationsSecondaires","Les rapports secondaires doivent former une liste."));
  else {
    secondary.forEach((sr,i) => {
      if (!Object.hasOwn(RELATIONS,sr?.type)) problems.push(issue(`relationsSecondaires[${i}].type`,"Relation secondaire inconnue."));
      check(problems,`relationsSecondaires[${i}].mecanisme`,sr?.mecanisme,"Démontrer le rapport secondaire.");
      check(problems,`relationsSecondaires[${i}].apportDistinct`,sr?.apportDistinct,"Ce rapport doit ajouter quelque chose au rapport principal.");
    });
    if (secondary.length) check(problems,"articulationDesRapports",candidate?.articulationDesRapports,"Prouver comment les rapports différents se combinent, sans juxtaposition.");
  }
  const formulations = candidate?.formulations;
  if (!list(formulations)) problems.push(issue("formulations", "Comparer plusieurs formulations de la problématique."));
  else formulations.forEach((f,i) => {
    check(problems,`formulations[${i}].question`,f?.question,"Formulation manquante.");
    check(problems,`formulations[${i}].gain`,f?.gain,"L'apport de cette formulation n'est pas établi.");
    check(problems,`formulations[${i}].risque`,f?.risque,"Le risque de formulation n'est pas examiné.");
  });

  const resolution = candidate?.resolution; // L'examen de III est optionnel : il ne fonde jamais rétroactivement les obstacles.
  if (resolution) {
    for (const field of ["matrice", "mecanisme", "eclairageRetrospectif", "preuvesAvantMatrice", "coutEtReste"])
      check(problems,`resolution.${field}`,resolution[field],"La matrice n'est pas assez étayée pour réviser le problème.");
    if (!Array.isArray(resolution?.acquisIII) || resolution.acquisIII.length !== 3 || !resolution.acquisIII.every(present))
      problems.push(issue("resolution.acquisIII","Les trois acquis distincts de III.1–III.3 doivent être précisés."));
  }
  if (candidate?.revisionRetrospective && !present(candidate?.revisionRetrospective?.raisonIndependante))
    problems.push(issue("revisionRetrospective.raisonIndependante","La reformulation doit être justifiée indépendamment de la matrice choisie."));

  return {
    id: candidate?.id ?? null,
    type: r.type ?? null,
    statut: problems.length ? "a_reconstruire" : "recevable_pour_examen_contradictoire",
    objectionsDocumentaires: problems,
    certificableAutomatiquement: false,
    commentaire: "La complétude d'une fiche n'atteste ni l'aporie ni la puissance du problème."
  };
}

/**
 * Sélection comparative : AUCUNE note ou hiérarchie automatique de puissance.
 * Même une candidate complète doit être arbitrée par un lecteur responsable.
 */
export function selectionnerProblematiques(dossier) {
  const examined = Array.isArray(dossier?.candidates) ? dossier.candidates.map(examinerCandidate) : [];
  const possibles = examined.filter(x => x.statut === "recevable_pour_examen_contradictoire");
  const review = dossier?.arbitrage || {};
  const proposed = possibles.find(x => x.id === review.id);
  const supportedArbitration = examined.length >= 2 && !!proposed &&
    present(review.justificationComparative) &&
    present(review.objectionDecisive) &&
    present(review.reponseAObjection) &&
    present(review.relecteur);
  return {
    sujet: dossier?.sujet ?? null,
    candidates: examined,
    admissiblesPourExamen: possibles.map(x => x.id),
    selectionProvisoire: supportedArbitration ? proposed.id : null,
    statut: supportedArbitration ? "proposee_sous_reserve_de_validation_independante" : "aucune_selection_homologuee",
    homologation: false,
    regle: "Ne jamais imposer l'incompatibilité, ni déduire la problématique de la matrice; la liaison des deux obstacles est à prouver."
  };
}
