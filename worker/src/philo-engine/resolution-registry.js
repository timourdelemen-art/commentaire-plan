/*
 * Ces procédures sont des adaptations opératoires des huit formes signalées
 * dans la préface à la seconde édition, pas des citations ni une transcription.
 * Elles sont des pistes non exhaustives et peuvent être combinées.
 */
export const RESOLUTION_FORMS = [
  {
    id: 'duplication-ontologique',
    name: 'Duplication ontologique',
    operation: 'Identifier des déterminations incompatibles sous un même rapport ; les rapporter à des niveaux de réalité distincts ; justifier ces niveaux, leur relation et ce qui est conservé.',
    residualRisk: 'Dédoublement du réel et difficulté de relier les niveaux. Une distinction de fonctions ou de points de vue ne suffit pas.'
  },
  {
    id: 'abolition-partielle-totale',
    name: 'Abolition partielle ou totale',
    operation: 'Identifier la détermination ou l’objet récusé ; démontrer pourquoi ; expliquer son apparence de nécessité ou de réalité ; reconstruire l’explication sans lui et reconnaître le sacrifice.',
    residualRisk: 'Appauvrissement ou suppression de ce qu’il fallait comprendre.'
  },
  {
    id: 'processualisation',
    name: 'Processualisation',
    operation: 'Identifier les déterminations incompatibles simultanément ; les comprendre comme moments d’un devenir ; démontrer le moteur de leur passage et l’unité du processus.',
    residualRisk: 'Dispersion de l’unité dans le temps. Une chronologie ne suffit pas.'
  },
  {
    id: 'inversion-indexation',
    name: 'Inversion du rapport d’indexation',
    operation: 'Expliciter le rapport initial de conditionnement et sa difficulté ; démontrer le rapport inversé ; expliquer pourquoi l’expérience immédiate présentait le premier rapport.',
    residualRisk: 'Écart entre compréhension démontrée et expérience spontanée.'
  },
  {
    id: 'metamorphose',
    name: 'Métamorphose',
    operation: 'Identifier la forme contradictoire ; déterminer ce qui doit changer ; justifier la règle de transformation ; préciser ce qui demeure identique et montrer comment la transformation traite la difficulté.',
    residualRisk: 'Risque de rendre l’objet méconnaissable ou de le remplacer.'
  },
  {
    id: 'deplacement-contradiction',
    name: 'Déplacement de la contradiction',
    operation: 'Localiser la difficulté attribuée à un objet ; justifier son transfert vers un autre ; montrer le gain pour le premier et examiner la charge portée par le second.',
    residualRisk: 'La contradiction est transférée, non supprimée, et peut revenir. Un simple déplacement de question ne suffit pas.'
  },
  {
    id: 'suspension-epistemique',
    name: 'Suspension épistémique',
    operation: 'Déterminer la connaissance nécessaire pour trancher ; examiner notre pouvoir de l’établir ; démontrer sa limite ; délimiter l’indécidable et l’accessible, puis en tirer les conséquences.',
    residualRisk: 'Demande de résolution insatisfaite et difficulté à justifier les limites de la pensée.'
  },
  {
    id: 'consentement-contradiction',
    name: 'Consentement à la contradiction',
    operation: 'Établir les exigences et leurs raisons ; formuler précisément ce qui reste incompatible sous le même rapport, au même moment et dans le même sens, ou quelles exigences pratiques ne peuvent être satisfaites ensemble. Tester d’abord si une distinction de sens, de niveau ou de relation lève la difficulté. Si elle la lève, ne pas retenir cette forme. Sinon examiner les tentatives pertinentes de dépassement, justifier leur insuffisance et préciser une manière de penser ou d’agir qui assume effectivement les deux déterminations.',
    residualRisk: 'Tension irréductible maintenue et engagement nécessaire, sans prétendre l’avoir supprimée. Une différence entre constat et jugement, ou une simple vigilance à poursuivre, ne démontre pas cette irréductibilité.'
  }
];
