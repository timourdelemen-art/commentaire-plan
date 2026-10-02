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
  "brevet-grammaire","brevet-lexique","brevet-reecriture","brevet-redaction"
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
  plan:["Tu proposes une organisation.","Il faut vérifier que chaque partie est une réponse nécessaire à la problématique, et non un thème.","Que répond exactement chacune de tes parties à la problématique ?"],
  transition:["Tu cherches ce qui manque encore.","La transition doit être réduite à une seule question qui fait apparaître le manque restant.","Quelle question reste encore ouverte après la réponse précédente ?"],
  analyse:["Tu proposes une analyse.","Il faut distinguer plus nettement ce que le texte fait, ce qui le montre et l'effet produit ici.","Quelle réalisation veux-tu prouver, avec quel élément précis du texte, et qu'est-ce que cet élément change ici ?"],
  redaction:["Tu as commencé à rédiger.","Il faut vérifier que chaque phrase remplit la fonction demandée sans ajouter de développement inutile.","Quelle phrase de ton passage prouve le plus directement la réponse que tu défends ?"],
  "brevet-comprehension":["Tu as répondu à la question.","Il faut vérifier que ta réponse est suffisamment précise et justifiée lorsqu'une preuve est demandée.","Quel mot ou passage du texte prouve exactement ta réponse ?"],
  "brevet-interpretation":["Tu proposes une interprétation.","Il faut mieux relier ton idée à un indice précis du texte.","Quel indice précis du texte permet de soutenir cette interprétation ?"],
  "brevet-analyse":["Tu as repéré un élément intéressant.","Il faut expliquer ce que cet élément produit ici, au lieu de seulement le nommer.","Qu'est-ce que ce choix fait entendre, voir ou comprendre dans ce passage précis ?"],
  "brevet-image":["Tu proposes une comparaison.","Il faut distinguer précisément ce qui vient du texte et ce qui vient de l'image.","Quels éléments visuels effectivement observables peux-tu citer sans rien inventer ?"],
  "brevet-grammaire":["Tu as proposé une analyse grammaticale.","Il faut prouver la réponse par la manipulation demandée ou par une justification précise.","Quelle manipulation peux-tu effectuer et quel résultat obtient-elle ?"],
  "brevet-lexique":["Tu as proposé une réponse lexicale.","Il faut justifier la formation ou l'appartenance à la même famille avec précision.","Quelle base et quel procédé de formation peux-tu identifier exactement ?"],
  "brevet-reecriture":["Tu as effectué une partie de la transformation.","Il faut vérifier toutes les conséquences grammaticales de la consigne.","Quels verbes, accords, pronoms ou adjectifs sont encore touchés par la transformation ?"],
  "brevet-redaction":["Tu réponds au sujet.","Il faut choisir une priorité de reprise dans la construction ou dans la précision de l'argumentation.","Quelle idée doit être développée ou illustrée plus précisément pour mieux répondre au sujet ?"]
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
    point_acquis: f[0],
    manque_principal: f[1],
    question_suivante: f[2]
  };
}

function validateFeedback(value) {
  if (!value || typeof value !== "object") return null;
  const diagnostic = clean(value.diagnostic, 20);
  const point = clean(value.point_acquis, 220);
  const manque = clean(value.manque_principal, 280);
  let question = clean(value.question_suivante, 280);

  if (!["acquis", "partiel", "à reprendre"].includes(diagnostic)) return null;
  if (!point || !manque || !question) return null;
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

    const isBac = type === "bac-commentaire" || exam.toLowerCase() === "bac";
    const task = consigne + (aide ? " Repère pédagogique : " + aide : "") + points;

    const extraRules = isBac ? [
      "Une grande partie est une RÉPONSE nécessaire à la problématique, jamais un thème.",
      "NÉCESSITÉ / Pourquoi ? = pourquoi cette réponse est nécessaire pour poursuivre la démonstration.",
      "Une TRANSITION est une seule question simple qui fait apparaître ce qu'il reste encore à expliquer.",
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
      kind: ALLOWED_STAGE_KINDS.has(kind) ? kind : (isBac ? (stage==="transitions"||stage==="raccord"?"transition":stage==="plan"||stage==="necessite"?"plan":stage==="problematique"?"problematique":stage==="preuves"||stage==="realisations"?"analyse":stage==="intro"||stage==="partie"||stage==="conclusion"?"redaction":"lecture") : "brevet-comprehension"),
      title: author + " — " + work,
      task,
      allowed: GENERIC_ALLOWED,
      forbidden: GENERIC_FORBIDDEN,
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
      "Une transition est une simple question qui fait apparaître ce qui manque encore."
    ]
  };
}

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

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ ok: false, error: "Origine non autorisée." }, 403, origin);
    }

    if (!env.OPENAI_API_KEY) {
      return json({ ok: false, setup: true, error: "Clé API absente." }, 503, origin);
    }

    let body;
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "Requête invalide." }, 400, origin); }

    const answer = clean(body.answer, 5000);
    const spec = buildSpec(body);

    if (!spec) return json({ ok: false, error: "Exercice ou étape non autorisé." }, 400, origin);
    if (answer.length < 8) return json({ ok: false, error: "Réponse trop courte." }, 400, origin);

    const instructions = `Tu es le moteur pédagogique strict de BAC & BREVET — FRANÇAIS.
Tu aides l'élève à refaire lui-même une opération précise. Tu ne fournis jamais la correction à sa place d'emblée.

VOCABULAIRE ET MÉTHODE
- Problématique : la question qui demande ce que le texte oblige à expliquer.
- Réponse : ce que chaque grande partie affirme pour répondre à la problématique.
- Pourquoi ? / nécessité : pourquoi cette réponse est nécessaire dans la démonstration.
- Réalisation : ce que le texte fait.
- Élément textuel : ce qui, dans le texte, permet de le montrer.
- Procédé : comment l'élément est construit, seulement si cela aide réellement.
- Effet ici : ce que cela change dans ce passage précis.
- Transition : une seule question qui fait apparaître ce qu'il reste encore à expliquer.

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
  "diagnostic": "acquis" | "partiel" | "à reprendre",
  "point_acquis": "...",
  "manque_principal": "...",
  "question_suivante": "..."
}`;

    const payload = {
      model: env.OPENAI_MODEL || "gpt-5-mini",
      instructions,
      input: [{ role: "user", content: [{ type: "input_text", text: "Réponse de l’élève : " + answer }] }],
      max_output_tokens: 320,
      store: false
    };

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
    const feedback = validateFeedback(parsed) || safeFallback(spec.kind);

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
