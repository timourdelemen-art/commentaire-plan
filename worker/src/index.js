const ALLOWED_ORIGINS = new Set([
  "https://commentaire-plan.com",
  "https://www.commentaire-plan.com",
  "https://commentaire-dissertation.netlify.app"
]);

const CORE_EXERCISES = {
  "hialmar-problematique": {
    title: "Le Cœur de Hialmar — problématique",
    task: "L'élève doit formuler une problématique qui fasse apparaître l'écart entre la défaite physique / l'agonie du héros et la puissance qu'il continue pourtant d'exercer par sa parole et ses décisions."
  }
};

const ALLOWED_STAGE_KINDS = new Set([
  "lecture","problematique","plan","transition","analyse","redaction",
  "brevet-comprehension","brevet-interpretation","brevet-analyse","brevet-image",
  "brevet-grammaire","brevet-lexique","brevet-reecriture","brevet-redaction","bac-dissertation"
]);

const GENERIC_ALLOWED = [
  "évaluer uniquement l'opération demandée",
  "nommer brièvement un point acquis",
  "signaler un seul manque principal",
  "poser une seule question de relance",
  "demander une preuve textuelle si la réponse reste générale",
  "indiquer si un procédé proposé est utile ou plaqué quand la tâche porte sur l'analyse"
];

const GENERIC_FORBIDDEN = [
  "réécrire entièrement la réponse de l'élève",
  "donner plusieurs conseils à la fois",
  "donner une note",
  "présenter une analyse comme officielle",
  "inventer une citation, un élément du texte, une image ou un détail absent du contexte",
  "révéler un commentaire complet lorsque l'élève travaille une étape intermédiaire"
];

const FALLBACK_BY_KIND = {
  lecture:["Tu as formulé une tentative.","Il faut rester plus près de l'opération demandée et du passage.","Quel élément précis de la situation ou du mouvement du texte peux-tu formuler sans encore l'interpréter ?"],
  problematique:["Tu as formulé une vraie question.","Il faut faire apparaître plus nettement ce qui, dans le texte, demande une explication.","Quels sont les deux pôles de la transformation que ta question doit garder ensemble ?"],
  plan:["Tu proposes une organisation.","Il faut vérifier que chaque partie est une SOLUTION nécessaire à la problématique, et non un thème.","Quelle solution précise chacune de tes parties apporte-t-elle à la problématique ?"],
  transition:["Tu cherches ce qui manque encore.","La transition doit être réduite à une seule question qui fait apparaître le manque restant.","Quelle question reste encore ouverte après la solution précédente ?"],
  analyse:["Tu proposes une analyse.","Il faut distinguer plus nettement ce que le texte fait, ce qui le montre et l'effet produit ici.","Quelle réalisation veux-tu prouver, avec quel élément précis du texte, et qu'est-ce que cet élément change ici ?"],
  redaction:["Tu as commencé à rédiger.","Il faut vérifier que chaque phrase remplit la fonction demandée sans ajouter de développement inutile.","Quelle phrase de ton passage prouve le plus directement la réponse que tu défends ?"],
  "brevet-comprehension":["Tu as répondu à la question.","Il faut vérifier que ta réponse est suffisamment précise et justifiée lorsqu'une preuve est demandée.","Quel mot ou passage du texte prouve exactement ta réponse ?"],
  "brevet-interpretation":["Tu proposes une interprétation.","Il faut mieux relier ton idée à un indice précis du texte.","Quel indice précis du texte permet de soutenir cette interprétation ?"],
  "brevet-analyse":["Tu as repéré un élément intéressant.","Il faut expliquer ce que cet élément produit ici, au lieu de seulement le nommer.","Qu'est-ce que ce choix fait entendre, voir ou comprendre dans ce passage précis ?"],
  "brevet-image":["Tu proposes une comparaison.","Il faut distinguer précisément ce qui vient du texte et ce qui vient de l'image.","Quels éléments visuels effectivement observables peux-tu citer sans rien inventer ?"],
  "brevet-grammaire":["Tu as proposé une analyse grammaticale.","Il faut prouver la réponse par la manipulation demandée ou par une justification précise.","Quelle manipulation peux-tu effectuer et quel résultat obtient-elle ?"],
  "brevet-lexique":["Tu as proposé une réponse lexicale.","Il faut justifier la formation ou l'appartenance à la même famille avec précision.","Quelle base et quel procédé de formation peux-tu identifier exactement ?"],
  "brevet-reecriture":["Tu as effectué une partie de la transformation.","Il faut vérifier toutes les conséquences grammaticales de la consigne.","Quels verbes, accords, pronoms ou adjectifs sont encore touchés par la transformation ?"],
  "brevet-redaction":["Tu réponds au sujet.","Il faut choisir une priorité de reprise dans la construction ou dans la précision de l'argumentation.","Quelle idée doit être développée ou illustrée plus précisément pour mieux répondre au sujet ?"],
  "bac-dissertation":["Tu engages une réflexion sur le sujet.","Il faut vérifier que ton idée fait réellement avancer la réponse et s'appuie sur l'œuvre.","Qu'est-ce que cette étape permet précisément d'établir pour répondre au sujet ?"]
};

function cors(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "https://commentaire-plan.com";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors(origin) }
  });
}

function clean(s, max) {
  return String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function safeFallback(kind = "problematique") {
  const f = FALLBACK_BY_KIND[kind] || FALLBACK_BY_KIND.problematique;
  return {
    diagnostic: "à reprendre",
    point_acquis: "Aucun acquis ne peut être confirmé automatiquement sur cette réponse.",
    manque_principal: f[1],
    question_suivante: f[2]
  };
}

function normalizeForAbuseCheck(s) {
  return clean(s, 5000)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function rejectWithoutAI(answer, previousAnswer = "") {
  const n = normalizeForAbuseCheck(answer);
  const prev = normalizeForAbuseCheck(previousAnswer);

  const nonAnswers = new Set([
    "je ne sais pas","j sais pas","jsais pas","jsp","aucune idee","aucune idée",
    "je sais pas","pas compris","je ne comprends pas","je comprends pas",
    "rien","bof","lol","mdr","osef","n importe quoi","nimporte quoi"
  ]);

  if (nonAnswers.has(n)) {
    return {
      reason: "non_answer",
      message: "Tu ne proposes pas encore de réponse à examiner. Essaie au moins une hypothèse, même imparfaite : l’IA pourra alors t’aider à la reprendre."
    };
  }

  if (/^(.)\1{5,}$/.test(n.replace(/\s/g, "")) || /^[a-z]{1,3}(\s+[a-z]{1,3}){4,}$/.test(n)) {
    return {
      reason: "gibberish",
      message: "Cette saisie ne ressemble pas à une réponse au travail demandé. Reformule une vraie tentative avant de demander un retour."
    };
  }

  if (prev && n === prev) {
    return {
      reason: "unchanged",
      message: "Ta réponse n’a pas changé depuis le dernier retour. Reprends d’abord le point demandé avant de solliciter de nouveau l’IA."
    };
  }

  return null;
}

function validateFeedback(value) {
  if (!value || typeof value !== "object") return null;
  const diagnostic = clean(value.diagnostic, 20);
  const point = clean(value.point_acquis, 220);
  const manque = clean(value.manque_principal, 280);
  let question = clean(value.question_suivante, 280);

  if (!["acquis", "partiel", "à reprendre"].includes(diagnostic)) return null;
  if (!point || !manque || !question) return null;
  if (diagnostic === "à reprendre" && /tu as répondu à la question|tu as repondu a la question/i.test(point)) return null;
  if (!question.endsWith("?")) question += "?";

  const all = (point + " " + manque + " " + question).toLowerCase();
  const bannedPhrases = [
    "établissement",
    "problématique modèle",
    "plan complet",
    "commentaire rédigé",
    "voici la correction complète"
  ];
  if (bannedPhrases.some(x => all.includes(x))) return null;

  const planPattern = /(^|\s)(i|ii|iii|iv|v)\.\s/;
  if (planPattern.test(all)) return null;

  return {
    diagnostic,
    point_acquis: point,
    manque_principal: manque,
    question_suivante: question
  };
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  for (const item of data.output || []) {
    for (const part of item.content || []) {
      if (part.type === "output_text" && typeof part.text === "string") return part.text.trim();
    }
  }
  return "";
}


/* ---------- PHILOSOPHIE (Terminale, tronc commun) ----------
   Le moteur de méthode reste caché : l'élève ne voit que le vocabulaire du site
   (« ce que la notion demande », « ce que chaque réponse perd », « test du gant », « ce qui reste », les sept opérations). */
const PHILO_KIND = /^philo-[a-z-]{2,30}$/;

const PHILO_CRITERIA = {
  "philo-reponse": "Trois temps attendus : une première réponse au sujet en une phrase qui reprend ses mots, au choix de l'élève : oui, non (éventuellement nuancé par les petits mots du sujet, par exemple « pas toujours »), ou une phrase qui montre que la question est mal posée ; les trois formes sont justes, rien de plus n'est demandé, ne pas exiger de justification ; le petit mot du sujet qui change la question (peut-on, faut-il, suffit-il, sans…) et ce qu'il change (par exemple : « peut-on » demande-t-il si c'est possible ou si c'est permis ?) ; puis la phrase « Au premier abord, on répondrait…, mais… » qui montre que la première réponse ne suffit plus. Vérifier surtout que la lecture des mots fait vaciller la première réponse ; c'est le but de l'exercice.",
  "philo-consequence": "L'élève donne deux choses que la notion principale demande à la fois, dans son sens courant, sans définition d'auteur, et dit pourquoi elles se gênent. Vérifier qu'il y a bien deux exigences, et une tension réelle entre elles, pas deux synonymes.",
  "philo-cout": "L'élève pousse chaque réponse (oui / non) jusqu'au bout et dit ce que chacune perd. Les DEUX réponses doivent perdre quelque chose d'important, et la perte doit venir de la réponse elle-même poussée jusqu'au bout, pas d'une objection extérieure. Si une seule réponse perd quelque chose, c'est le manque principal.",
  "philo-problematique": "Appliquer le test du gant, et ne signaler que le premier point qui échoue : 1. aucun doigt ne manque (chaque mot important du sujet travaille dans la question) ; 2. aucun doigt en trop (pas de NOTION ajoutée que le sujet ne contient pas, comme l'État ou le bonheur dans un sujet qui n'en parle pas ; remplacer une notion du sujet par l'un de ses cas particuliers — la promesse au lieu de l'engagement — rétrécit le sujet : défaut léger, diagnostic partiel ; un mot qui radicalise une réponse (« tout engagement ») ou une image placée à côté du terme général ne sont pas des défauts) ; 3. les deux réponses restent ouvertes (chacune perd quelque chose ; pas de question rhétorique du type « comment pourrait-on… si… » ou « … puisque… ») ; 4. on reconnaît le sujet sans qu'il soit recopié ; 5. d'une traite : une seule question, une trentaine de mots au plus, pas une cascade de questions ; 6. elle donne le plan : on y lit la première réponse et ce qu'elle perd (partie I), la réponse contraire et ce qu'elle perd (partie II) ; elle ne doit PAS annoncer ni contenir la solution de la troisième partie. Si les six points passent, le diagnostic est « acquis » : ne fabrique pas de manque. Une problématique qui oppose deux définitions ou deux thèmes plaqués n'est pas un problème.",
  "philo-plan": "Vérifier la dynamique : I défend une réponse et se termine par sa limite, née de l'idée poussée jusqu'au bout ; une transition fait de cette limite une question ; II part de cette limite (nouvelle exigence, nouvelle réponse, nouvelle limite) ; III ne choisit pas un camp et ne coupe pas la poire en deux, mais applique une opération (distinguer deux plans, introduire un processus, inverser un rapport, transformer le concept, déplacer la difficulté, limiter ce que l'on peut savoir, maintenir la tension) qui garde ce que I et II avaient établi. Un plan de trois thèmes ou de trois arguments juxtaposés n'est pas un plan.",
  "philo-transition": "Une transition pose un diagnostic : elle dit pourquoi la réponse précédente échoue, et sa forme dépend du type d'échec : le retournement (l'idée poussée au bout produit son contraire), le présupposé dévoilé (la réponse supposait ce qu'elle niait), le prix (son succès même coûte), le glissement de sens (le mot du sujet a changé de sens) ; pour passer à la troisième partie, le présupposé commun aux deux réponses ou le renversement de la question. Une ou deux phrases, sans métadiscours (« nous avons vu », « voyons maintenant »). Une question n'est pas obligatoire ; si elle est posée, elle doit être vraiment ouverte. Une simple annonce de la partie suivante n'est pas une transition.",
  "philo-reste": "L'élève dit ce qui reste à résoudre après I et II : ce que la troisième partie doit sauver des deux côtés à la fois. Vérifier que les deux acquis sont nommés.",
  "philo-troisieme": "Troisième partie : III.1 ce qui reste (l'acquis de I et de II), III.2 l'opération (une des sept), III.3 ce qu'elle permet de garder. Refuser le compromis (« un peu des deux »), le choix d'un camp, le changement de sujet. Vérifier que l'opération répond précisément au reste.",
  "philo-partie": "Une partie : une réponse au problème, la raison qui la rend nécessaire, un appui (argument ou exemple analysé), et une limite qui découle de la réponse elle-même au lieu d'être une objection plaquée de l'extérieur.",
  "philo-argument": "Un argument : une idée, une raison explicite (« parce que »), une conséquence. Un nom d'auteur, une généralité ou un exemple seul ne sont pas des arguments.",
  "philo-pensee-propre": "L'élève pense sans s'abriter derrière un auteur : une réponse, une raison, un exemple, une difficulté. Vérifier que le raisonnement tient sans aucun nom propre.",
  "philo-objection": "Une objection forte attaque la raison de la thèse, pas seulement sa conclusion, et oblige à préciser ou corriger l'idée.",
  "philo-exemple": "Un exemple qui pense : il met l'idée à l'épreuve et oblige à préciser un concept ou une distinction, au lieu de seulement illustrer ou raconter.",
  "philo-reference": "Une référence travaille si elle accomplit une opération dans le raisonnement (argument, objection, distinction, renversement) et si elle est exacte. Test : en retirant le nom, le raisonnement doit encore tenir. Signaler une référence décorative ou un contresens probable, sans inventer de citation.",
  "philo-operation": "L'élève identifie l'opération qu'accomplit une idée ou un texte (distinguer deux plans, introduire un processus, inverser un rapport, transformer le concept, déplacer la difficulté, limiter ce que l'on peut savoir, maintenir la tension) et dit ce qu'elle permet de résoudre ici. Une étiquette sans explication ne suffit pas.",
  "philo-reemploi": "L'élève dit dans quel sujet, dans quelle partie et pour quoi faire il utiliserait l'idée. Vérifier la fonction précise (argument, limite, opération du III) et non un simple « ça parle de ».",
  "philo-puzzle": "L'élève retrouve l'ordre de nécessité d'un raisonnement : chaque étape rend la suivante nécessaire. Vérifier qu'il justifie l'ordre, pas seulement qu'il le donne.",
  "philo-diagnostic": "L'élève explique un choix ou une erreur de méthode. Vérifier qu'il nomme précisément ce qui fait la différence.",
  "philo-liens": "Réécriture d'un paragraphe surchargé de connecteurs. Vérifier que les connecteurs d'énumération (d'abord, ensuite, enfin, de plus, en outre, par ailleurs) ont disparu ; que chaque lien restant nomme la relation réelle (or fait basculer, mais oppose, donc tire une conséquence, certes… mais concède) ; que la ponctuation (deux-points, point-virgule) et la reprise des mots-clés portent la logique ; et que rien du raisonnement n'a été perdu.",
  "philo-scene": "Une scène d'introduction (roman, film, moment d'histoire, anecdote), racontée en deux ou trois phrases, puis ce qu'elle montre. Une bonne scène contient déjà le problème du sujet, les deux réponses, et pas seulement le thème. Vérifier que la phrase finale relie vraiment la scène au sujet ; si un fait raconté paraît inexact, le signaler prudemment sans l'affirmer.",
  "philo-texte-probleme": "Explication de texte. Le problème est la difficulté à laquelle le texte répond : une question, et la raison pour laquelle elle n'a pas de réponse évidente. Le texte lui-même n'est PAS fourni : ne juge que la forme et la précision de la réponse, et ne prétends jamais savoir ce que dit le texte.",
  "philo-texte-these": "Explication de texte. La thèse est ce que l'auteur établit, en une phrase précise, et non un résumé du passage ni un thème. Le texte n'est PAS fourni : ne juge que la forme, sans prétendre savoir ce que dit le texte.",
  "philo-texte-moments": "Explication de texte. Trois à cinq moments, dans l'ordre, chacun avec ce que l'auteur fait (affirme, explique, donne un exemple, répond à une objection, conclut). Le texte n'est PAS fourni : ne juge que la construction, sans prétendre savoir ce que dit le texte."
};

const PHILO_FALLBACK = ["Tu as fait une tentative.","Il faut rester au plus près de ce que la consigne demande précisément.","Quelle phrase de ta réponse fait exactement ce que la consigne demande ?"];

function buildPhiloSpec(context, kind) {
  const title = clean(context.title, 220);
  const instruction = clean(context.instruction, 1800);
  const quote = clean(context.quote, 1200);
  if (!instruction) return null;
  return {
    exercise: "free-response",
    stage: "free-response",
    kind,
    philo: true,
    title: title || "Philosophie",
    task: instruction + (quote ? " Sujet ou support visible : " + quote : ""),
    criteria: PHILO_CRITERIA[kind] || "Évaluer seulement l'opération demandée par la consigne.",
    allowed: GENERIC_ALLOWED.filter(x => !/procédé/.test(x)).map(x => x.replace("demander une preuve textuelle si la réponse reste générale", "demander une raison ou un exemple analysé si la réponse reste générale")),
    forbidden: GENERIC_FORBIDDEN
  };
}

function philoInstructions(spec) {
  return `Tu es le moteur pédagogique de la partie philosophie (Terminale, tronc commun) du site Commentaire Plan.
Tu aides l'élève à refaire lui-même une opération précise. Tu ne fournis jamais la réponse à sa place.
Beaucoup d'élèves ont peur de la philosophie ou en ont été dégoûtés : sois exigeant, précis et rassurant ; montre d'abord ce qui tient.

LA MÉTHODE DU SITE (à appliquer, à ne jamais exposer comme une théorie)
- Un sujet pose problème parce que la notion demande deux choses à la fois, qui se gênent. Chaque réponse (oui / non) s'appuie sur l'une et risque de sacrifier l'autre : chaque réponse, poussée jusqu'au bout, perd quelque chose.
- La problématique fait voir ce double risque, en une seule question ouverte.
- Le plan est dynamique : I installe une réponse, la renforce, trouve sa limite ; II part de cette limite ; III ne choisit pas un camp et ne fait pas de compromis, il applique une opération qui garde ce que I et II ont établi.
- Les auteurs ne servent que s'ils font avancer l'idée ; un raisonnement sans auteur peut être excellent. N'exige jamais un auteur.
- Vocabulaire à employer avec l'élève : « ce que la notion demande », « ce que chaque réponse perd », « le test du gant », « la limite », « ce qui reste », les sept opérations. N'emploie jamais : chiasme, paradoxe de paradoxes, aporie, antinomie, d1/d2, figure, résolution, ni aucun jargon technique.

EXERCICE
${spec.title}

CONSIGNE VISIBLE PAR L'ÉLÈVE
${spec.task}

CE QUE TU ÉVALUES ICI
${spec.criteria}

TU PEUX UNIQUEMENT
${spec.allowed.map(x => "- " + x).join("\n")}

TU NE DOIS JAMAIS
${spec.forbidden.map(x => "- " + x).join("\n")}
- écrire la problématique, le plan ou la transition à la place de l'élève
- exiger une référence à un philosophe

CONTRAINTES
- tutoie l'élève
- ton sobre, précis, bienveillant, jamais infantilisant ; pas de moquerie
- si la réponse ne contient aucun acquis réel, ne jamais en inventer un : écris exactement « Aucun acquis identifiable dans cette réponse. »
- marque "hors_sujet": true SEULEMENT si la réponse n'a clairement rien à voir avec la consigne ou détourne volontairement l'exercice ; une réponse fausse, maladroite, naïve, courte ou incomplète n'est JAMAIS hors sujet
- un seul point acquis, un seul manque principal, une seule question de relance
- si la réponse remplit vraiment ce qui est demandé, diagnostic « acquis » ; dans ce cas, manque_principal peut seulement proposer d'alléger ou de préciser un mot, ou dire « Rien d'essentiel ne manque. », et la question invite à passer à l'étape suivante
- la question de relance doit aider l'élève à corriger lui-même le manque principal ; elle est courte (une ligne), simple, sans chiffres ni jargon
- n'invente aucune citation ni aucun détail absent
- ne donne aucune note
- réponse très brève : une phrase par champ

Réponds UNIQUEMENT par un objet JSON valide, sans markdown, avec exactement :
{
  "hors_sujet": true | false,
  "diagnostic": "acquis" | "partiel" | "à reprendre",
  "point_acquis": "...",
  "manque_principal": "...",
  "question_suivante": "..."
}`;
}

function buildSpec(body) {
  const exercise = clean(body.exercise, 80);

  if (exercise === "annale-guided") {
    const context = body.context && typeof body.context === "object" ? body.context : {};
    const kind = clean(context.kind || context.etape, 50);
    if (!ALLOWED_STAGE_KINDS.has(kind) && !["donne","attente","transformation","preuve","realisations","intro","partie","raccord","conclusion","necessite","transitions"].includes(clean(context.etape,50))) return null;

    const exam = clean(context.examen, 20);
    const type = clean(context.type, 40);
    const consigne = clean(context.consigne, 700);
    const aide = clean(context.aide, 500);
    const author = clean(context.auteur, 120);
    const work = clean(context.oeuvre, 180);
    const stage = clean(context.etape, 50);
    const points = context.points == null ? "" : " Barème indicatif : " + clean(context.points, 10) + " point(s).";
    const manualCandidates = Array.isArray(context.manual_candidates)
      ? context.manual_candidates.map(x=>clean(x,80)).filter(Boolean).slice(0,5)
      : [];

    if (!exam || !consigne || !author || !work) return null;

    const isBacCommentary = type === "bac-commentaire";
    const isBacDissertation = type === "bac-dissertation" || kind === "bac-dissertation";
    const task = consigne + (aide ? " Repère pédagogique : " + aide : "") + points;

    const extraRules = isBacDissertation ? [
      "Distinguer SUJET et PROBLÉMATIQUE : le sujet peut être une question, une affirmation ou une citation ; la problématique formule la difficulté précise qui organise la réflexion.",
      "Chemin de problématisation : sujet → idée à examiner → ce que l'œuvre permet d'établir → ce qu'il faut encore comprendre → problématique.",
      "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un simple thème.",
      "NÉCESSITÉ DE LA RÉPONSE = pourquoi cette réponse est indispensable dans le raisonnement. C'est un outil de construction ; elle n'a pas à être récitée comme une formule dans la copie.",
      "ARGUMENT = sous-réponse démontrée par un ou plusieurs passages pertinents de l'œuvre.",
      "Un exemple raconté n'est pas encore une preuve : vérifier l'élément précis, son analyse et ce qu'il démontre.",
      "Ne pas imposer plusieurs passages dans chaque argument ; exiger en revanche une connaissance variée et précise de l'œuvre dans l'ensemble du devoir.",
      "TRANSITION = partir de l'acquis et faire apparaître, de préférence par une question simple, ce que la réponse précédente ne suffit pas encore à expliquer.",
      "Le plan doit être exigeant sur la logique et souple sur la forme : ne jamais imposer oui/non/synthèse, ni trois parties.",
      "Les formulations de parties doivent rester courtes, verbales et élégantes : la complexité appartient au raisonnement, pas au titre.",
      "Les connecteurs doivent exprimer une relation logique réelle, pas seulement l'ordre des idées.",
      "Culture littéraire : une référence extérieure est pleinement utile lorsqu'une comparaison ou différenciation fait émerger la singularité de l'œuvre étudiée. Une excellente référence peut suffire ; ne jamais imposer un quota.",
      "Ne jamais fournir un plan complet ou un corrigé modèle avant une tentative de l'élève."
    ] : isBacCommentary ? [
      "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un thème.",
      "NÉCESSITÉ DE LA RÉPONSE = pourquoi cette réponse est indispensable pour répondre à la problématique.",
      "Une TRANSITION est une seule question simple qui fait apparaître ce que la réponse précédente ne suffit pas encore à expliquer.",
      "RÉALISATION = ce que le texte fait pour construire la réponse.",
      "ÉLÉMENT TEXTUEL = ce qui, dans le texte, permet de le montrer.",
      "PROCÉDÉ = comment l'élément est construit, seulement lorsqu'il est identifiable et utile.",
      "EFFET = ce que ce choix change ici dans la manière de voir, comprendre ou ressentir.",
      "Ne jamais employer le mot « établissement » pour désigner une partie.",
      "Ne jamais fournir une problématique, un plan ou un commentaire complet si l'élève n'a pas d'abord produit sa propre tentative."
    ] : [
      "Respecter exactement la question et le nombre d'éléments demandés.",
      "Quand une justification textuelle est demandée, ne pas considérer la réponse acquise sans preuve précise.",
      "Pour la grammaire, vérifier la nature, la fonction ou la manipulation réellement demandée.",
      "Pour la réécriture, contrôler toutes les conséquences de la transformation, pas seulement le premier changement.",
      "Pour une question sur une image, si aucun élément visuel n'est fourni dans la réponse ou le contexte, ne rien inventer."
    ];

    if (manualCandidates.length) {
      extraRules.push("Si l'élève demande ou utilise une aide de procédés, rester limité aux pistes suivantes : " + manualCandidates.join(", ") + ". Ne pas dévoiler le manuel complet.");
      extraRules.push("Même si un procédé est juste, exiger un effet contextualisé et refuser les effets automatiques.");
    }

    return {
      exercise,
      stage,
      kind: ALLOWED_STAGE_KINDS.has(kind) ? kind : (isBacDissertation ? "bac-dissertation" : (isBacCommentary ? (stage==="transitions"||stage==="raccord"?"transition":stage==="plan"||stage==="necessite"?"plan":stage==="problematique"?"problematique":stage==="preuves"||stage==="realisations"?"analyse":stage==="intro"||stage==="partie"||stage==="conclusion"?"redaction":"lecture") : "brevet-comprehension")),
      title: author + " — " + work,
      task,
      allowed: GENERIC_ALLOWED,
      forbidden: GENERIC_FORBIDDEN,
      extraRules
    };
  }

  if (exercise === "free-response") {
    const context = body.context && typeof body.context === "object" ? body.context : {};
    const philoKind = clean(context.philo_kind || context.kind, 50);
    if (PHILO_KIND.test(philoKind)) return buildPhiloSpec(context, philoKind);
    const title = clean(context.title, 220);
    const instruction = clean(context.instruction, 1800);
    const quote = clean(context.quote, 1200);
    const page = clean(context.page, 120);
    if (!instruction) return null;

    const lower=(title+" "+instruction+" "+page).toLowerCase();
    const explicitKind=clean(context.kind,50);
    let kind=ALLOWED_STAGE_KINDS.has(explicitKind) ? explicitKind : "lecture";
    if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /dissertation/.test(lower)) kind="bac-dissertation";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /probl[ée]matique/.test(lower)) kind="problematique";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /plan|partie|réponse nécessaire|reponse necessaire|solution nécessaire|solution necessaire/.test(lower)) kind="plan";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /transition/.test(lower)) kind="transition";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /réécri|reecri/.test(lower)) kind="brevet-reecriture";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /grammaire|nature|fonction|conjug|accord|pronom|temps verbal|lexique/.test(lower)) kind="brevet-grammaire";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /rédaction|redaction|argument|écrire|ecrire/.test(lower)) kind="brevet-redaction";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /procédé|procede|effet|réalisation|realisation|élément textuel|element textuel|paradoxe|figure/.test(lower)) kind="analyse";

    const isCommentary=/commentaire|probl[ée]matique|réalisation|realisation|transition/.test(lower);
    const isDissertation=kind==="bac-dissertation" || /dissertation/.test(lower);
    const isOral=/oral du bac|bac-oral/.test(lower);
    const isBrevetImagination=kind==="brevet-redaction" && /imagination|inventer|récit|recit|texte-support|texte support/.test(lower);
    const isBrevetReflexion=kind==="brevet-redaction" && /réflexion|reflexion|argument|opinion|convaincre/.test(lower);
    const extraRules=isOral ? [
      "Il s’agit d’un entraînement à l’épreuve orale anticipée de français.",
      "Pour l’explication linéaire : évaluer compréhension du mouvement du passage, précision des analyses, appui sur le texte, qualité de l’interprétation et clarté de l’expression.",
      "Pour la grammaire : évaluer savoirs syntaxiques, lexique grammatical précis, analyse de la phrase et pertinence des manipulations ; expliquer ce que chaque manipulation permet de démontrer.",
      "Pour l’entretien : évaluer présentation synthétique de l’œuvre, justification personnelle, aptitude à dialoguer, nuancer, étoffer et défendre une lecture en mobilisant des connaissances pertinentes.",
      "Ne jamais attribuer de note automatique ni prétendre remplacer l’examinateur.",
      "Pour l’entretien, la question_suivante doit être une vraie relance ouverte prenant appui sur ce que l’élève a dit."
    ] : isDissertation ? [
      "Référentiel interne : échelle descriptive officielle de la dissertation, voie générale.",
      "Évaluer uniquement le geste demandé, tout en gardant en arrière-plan la lecture effective de l’œuvre, les enjeux du sujet et du parcours, les passages significatifs, l’analyse, l’organisation et la langue.",
      "SUJET ≠ PROBLÉMATIQUE. Le sujet peut être question, affirmation ou citation. La problématique naît de ce que l’œuvre permet d’établir puis de ce qu’il faut encore comprendre.",
      "Une partie est une RÉPONSE nécessaire à la problématique. Sa nécessité est distincte de la transition.",
      "Un ARGUMENT est une sous-réponse démontrée ; un thème ou un exemple n’est pas encore un argument.",
      "Un exemple d’œuvre ne vaut pas comme preuve s’il est seulement cité ou raconté : vérifier ce qu’il démontre.",
      "Ne pas exiger artificiellement plusieurs passages dans chaque argument ; vérifier en revanche que l’ensemble du devoir mobilise des passages variés et significatifs.",
      "Une TRANSITION part de l’acquis et fait apparaître ce qui reste à résoudre. La question directe est une forme privilégiée, non obligatoire.",
      "Le plan n’a pas de forme imposée : approfondir, nuancer, déplacer ou mettre en relation sont possibles.",
      "La formulation des parties doit être nette, courte et élégante ; les connecteurs expriment des relations logiques réelles et ne doivent pas devenir une mécanique d’annonce.",
      "Culture littéraire : pour atteindre l’usage le plus exigeant, la référence extérieure doit aider, par comparaison ou différenciation, à faire émerger la singularité de l’œuvre étudiée. Ne jamais imposer un nombre de références.",
      "Ne jamais fournir un plan complet ou un corrigé modèle avant une tentative de l’élève.",
      "Ne jamais convertir mécaniquement un niveau de maîtrise en note : les profils peuvent être hétérogènes.",
      "Donner un seul manque prioritaire à retravailler."
    ] : isBrevetReflexion ? [
      "Référentiel interne : échelles descriptives officielles du DNB 2027, sujet de réflexion.",
      "Évaluer séparément : réponse effective au sujet ; développement d'arguments ; mobilisation d'exemples ; organisation progressive du propos ; adaptation à la situation de communication ; orthographe ; syntaxe ; lexique.",
      "Pour les exemples, vérifier qu'ils sont pertinents et suffisamment développés, et qu'ils éclairent effectivement l'argument.",
      "Pour l'organisation, vérifier les paragraphes, la progression et la pertinence des liens logiques.",
      "Une réponse très réussie peut comporter plusieurs arguments pertinents et nuancés, des exemples variés et une progression claire ; ne jamais exiger mécaniquement ces traits si la consigne locale porte sur un seul geste.",
      "Ne jamais convertir automatiquement les critères en note chiffrée : les paliers officiels sont descriptifs et une copie peut présenter un profil hétérogène.",
      "Donner un seul manque prioritaire à retravailler."
    ] : isBrevetImagination ? [
      "Référentiel interne : échelles descriptives officielles du DNB 2027, sujet d'imagination.",
      "Évaluer séparément : remobilisation pertinente des éléments du texte-support ; imagination adaptée au sujet ; enchaînement cohérent et progressif des étapes ; maîtrise du genre et des types de discours ; orthographe ; syntaxe ; lexique.",
      "L'invention n'est jamais évaluée indépendamment des contraintes : elle doit rester cohérente avec l'univers de référence demandé.",
      "Pour le genre, vérifier que les codes attendus et les types de discours demandés sont effectivement mobilisés.",
      "Une réponse très réussie peut s'approprier richement l'univers de référence et organiser des étapes pertinentes ; ne jamais exiger mécaniquement ces traits si la consigne locale porte sur un seul geste.",
      "Ne jamais convertir automatiquement les critères en note chiffrée : les paliers officiels sont descriptifs et une copie peut présenter un profil hétérogène.",
      "Donner un seul manque prioritaire à retravailler."
    ] : isCommentary ? [
      "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un thème.",
      "TRANSITION = une seule question simple qui fait apparaître ce que la réponse précédente ne suffit pas encore à expliquer. Elle ne justifie pas la solution suivante : elle rend seulement nécessaire le passage à une étape supplémentaire.",
      "RÉALISATION = ce que le texte fait ; ÉLÉMENT TEXTUEL = ce qui le montre ; PROCÉDÉ = comment l'élément est construit lorsqu'il est utile ; EFFET = ce que cela change ici.",
      "Ne jamais employer « établissement » pour nommer une partie.",
      "Ne jamais fournir un commentaire complet à partir d'une réponse partielle."
    ] : [
      "Évaluer seulement la consigne visible et la réponse donnée.",
      "Ne pas inventer de corrigé ou d'information absente du contexte fourni.",
      "Quand une preuve ou une justification est demandée, vérifier qu'elle est effectivement présente."
    ];

    return {
      exercise,
      stage:"free-response",
      kind,
      title:title||"Réponse libre",
      task:instruction+(quote ? " Support visible : "+quote : ""),
      allowed:GENERIC_ALLOWED,
      forbidden:GENERIC_FORBIDDEN,
      extraRules
    };
  }

  const core = CORE_EXERCISES[exercise];
  if (!core) return null;
  return {
    exercise,
    stage: "problematique",
    kind: "problematique",
    title: core.title,
    task: core.task,
    allowed: GENERIC_ALLOWED,
    forbidden: GENERIC_FORBIDDEN,
    extraRules:[
      "Une grande partie est une RÉPONSE nécessaire à la problématique.",
      "Ne jamais employer « établissement » pour désigner une partie.",
      "TRANSITION = une simple question qui fait apparaître ce que la réponse précédente ne suffit pas encore à expliquer."
    ]
  };
}

const RATE = new Map();
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_MAX = 30;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/api/analyze") {
      return json({ ok: false, error: "Route inconnue." }, 404, origin);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return json({ ok: false, error: "Origine non autorisée." }, 403, origin);
    }

    // Garde-fou simple contre les abus : au plus RATE_MAX demandes par adresse et par fenêtre,
    // dans chaque instance du worker (mémoire locale : imparfait, mais coupe les boucles automatiques).
    const ip = request.headers.get("CF-Connecting-IP") || "?";
    const now = Date.now();
    const hits = (RATE.get(ip) || []).filter(t => now - t < RATE_WINDOW);
    if (hits.length >= RATE_MAX) {
      return json({ ok: false, error: "Beaucoup de demandes en peu de temps : reprenez votre réponse et réessayez dans quelques minutes." }, 429, origin);
    }
    hits.push(now); RATE.set(ip, hits);
    if (RATE.size > 5000) RATE.clear();

    if (!env.OPENAI_API_KEY) {
      return json({ ok: false, setup: true, error: "Clé API absente." }, 503, origin);
    }

    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "Requête invalide." }, 400, origin); }

    if (clean(body.exercise,80) === "oral-source-image") {
      const imageData=typeof body.image_data_url==="string" ? body.image_data_url : "";
      if(!/^data:image\/(jpeg|png|webp);base64,/i.test(imageData) || imageData.length>5500000){
        return json({ok:false,error:"Image invalide ou trop volumineuse."},400,origin);
      }
      const visionPayload={
        model: env.OPENAI_MODEL || "gpt-5-mini",
        instructions: "Tu transcris fidèlement un extrait littéraire photographié pour un entraînement scolaire. Recopie uniquement le texte visible utile, dans l’ordre, sans le corriger, sans moderniser l’orthographe, sans inventer les mots illisibles. Pour un mot illisible, écris [illisible]. Ignore les éléments d’interface ou objets autour de la page. Réponds uniquement avec la transcription, sans commentaire.",
        input:[{role:"user",content:[
          {type:"input_text",text:"Transcris fidèlement le texte littéraire visible sur cette photo."},
          {type:"input_image",image_url:imageData,detail:"high"}
        ]}],
        max_output_tokens:2200,
        store:false
      };
      let vr;
      try{
        vr=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify(visionPayload)});
      }catch{
        return json({ok:false,error:"Extraction de l’image indisponible."},502,origin);
      }
      if(!vr.ok) return json({ok:false,error:"Le moteur n’a pas pu lire cette image."},502,origin);
      const vd=await vr.json();
      const extracted=extractOutputText(vd);
      if(!extracted) return json({ok:false,error:"Aucun texte lisible n’a été extrait."},422,origin);
      return json({ok:true,extracted_text:extracted},200,origin);
    }

    const answer = clean(body.answer, 5000);
    const previousAnswer = clean(body.previous_answer, 5000);
    const spec = buildSpec(body);

    if (!spec) return json({ ok: false, error: "Exercice ou étape non autorisé." }, 400, origin);
    if (answer.length < 8) return json({ ok: false, error: "Réponse trop courte." }, 400, origin);

    const localBlock = rejectWithoutAI(answer, previousAnswer);
    if (localBlock) {
      return json({
        ok: false,
        blocked: true,
        no_ai_call: true,
        reason: localBlock.reason,
        error: localBlock.message
      }, 422, origin);
    }

    const instructions = spec.philo ? philoInstructions(spec) : `Tu es le moteur pédagogique strict de BAC & BREVET — FRANÇAIS.
Tu aides l'élève à refaire lui-même une opération précise. Tu ne fournis jamais la correction à sa place d'emblée.

VOCABULAIRE ET MÉTHODE
- Problématique : la question qui demande ce que le texte oblige à expliquer.
- Solution : ce que chaque grande partie affirme pour répondre à la problématique.
- Nécessité de la solution : pourquoi cette solution est indispensable pour comprendre la transformation et répondre à la problématique.
- Transition : ce que la réponse précédente ne suffit pas encore à expliquer ; elle s'exprime par une question simple. Elle est distincte de la nécessité propre de la solution suivante.
- Réalisation : ce que le texte fait.
- Élément textuel : ce qui, dans le texte, permet de le montrer.
- Procédé : comment l'élément est construit, seulement si cela aide réellement.
- Effet ici : ce que cela change dans ce passage précis.
- Transition : une seule question qui fait apparaître ce qu'il reste encore à expliquer ; elle ne répète pas la nécessité de la solution suivante.

VOCABULAIRE INTERDIT
- « établissement » pour nommer une grande partie.

EXERCICE
${spec.title}

OPÉRATION À ÉVALUER
${spec.task}

RÈGLES SPÉCIFIQUES
${spec.extraRules.map(x => "- " + x).join("\n")}

TU PEUX UNIQUEMENT
${spec.allowed.map(x => "- " + x).join("\n")}

TU NE DOIS JAMAIS
${spec.forbidden.map(x => "- " + x).join("\n")}

CONTRAINTES
- tutoie l'élève
- ton sobre, précis, non infantilisant
- l'humour est autorisé de façon très légère et occasionnelle, seulement s'il rend le retour plus humain ; jamais de moquerie, sarcasme ou blague qui détourne de l'apprentissage
- si la réponse ne contient aucun acquis réel, ne jamais en inventer un : écris exactement « Aucun acquis identifiable dans cette réponse. »
- si la réponse est clairement étrangère à la consigne, détourne volontairement l'exercice ou développe un autre sujet, marque "hors_sujet": true
- une réponse simplement fausse, maladroite, courte ou incomplète n'est PAS hors sujet
- un seul point acquis
- un seul manque principal
- une seule question de relance
- n'anticipe jamais l'étape suivante
- ne donne jamais la formulation correcte complète si une reprise de l'élève est encore possible
- n'invente aucune citation ni aucun détail absent
- ne donne aucune note
- réponse très brève

Réponds UNIQUEMENT par un objet JSON valide, sans markdown, avec exactement :
{
  "hors_sujet": true | false,
  "diagnostic": "acquis" | "partiel" | "à reprendre",
  "point_acquis": "...",
  "manque_principal": "...",
  "question_suivante": "..."
}`;

    const payload = {
      model: env.OPENAI_MODEL || "gpt-5-mini",
      instructions,
      input: [{ role: "user", content: [{ type: "input_text", text: "Réponse de l’élève : " + answer }] }],
      max_output_tokens: 1200,
      store: false
    };
    // Les modèles à raisonnement (gpt-5…, o…) consomment des jetons de réflexion : sans cette limite, la réponse JSON peut être coupée.
    if (/^(gpt-5|o\d)/.test(payload.model)) payload.reasoning = { effort: "low" };

    let apiResponse;
    try {
      apiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.OPENAI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch {
      return json({ ok: false, error: "Le moteur IA ne répond pas." }, 502, origin);
    }

    if (!apiResponse.ok) {
      return json({ ok: false, error: "Le moteur IA a refusé la requête." }, 502, origin);
    }

    const data = await apiResponse.json();
    const raw = extractOutputText(data);

    let parsed = null;
    try { parsed = JSON.parse(raw); } catch {}

    if (parsed && parsed.hors_sujet === true) {
      return json({
        ok: false,
        blocked: true,
        reason: "off_topic",
        lock_hours: 24,
        error: "Réponse hors sujet. Cet exercice est suspendu pendant au moins 24 heures."
      }, 422, origin);
    }

    const feedback = validateFeedback(parsed) || (spec.philo ? {
      diagnostic: "à reprendre",
      point_acquis: "Aucun acquis ne peut être confirmé automatiquement sur cette réponse.",
      manque_principal: PHILO_FALLBACK[1],
      question_suivante: PHILO_FALLBACK[2]
    } : safeFallback(spec.kind));

    return json({
      ok: true,
      exercise: spec.exercise,
      feedback,
      text: [
        "Diagnostic : " + feedback.diagnostic,
        "Point acquis : " + feedback.point_acquis,
        "À reprendre : " + feedback.manque_principal,
        "Question : " + feedback.question_suivante
      ].join("\n")
    }, 200, origin);
  }
};
