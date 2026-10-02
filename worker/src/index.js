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

const ANNALES = {
  "bac-2026-amerique-du-nord-general-commentaire-leconte-de-lisle-le-coeur-de-hialmar": {
    title: "Le Cœur de Hialmar",
    author: "Leconte de Lisle",
    stages: {
      donne: "Identifier uniquement la situation de départ et les données explicites.",
      attente: "Formuler l'attente la plus simple produite par la situation initiale.",
      transformation: "Faire apparaître ce que le texte produit pourtant, sans donner encore les procédés.",
      problematique: "Construire une question qui conserve la défaite physique et la puissance héroïque persistante.",
      plan: "Proposer deux ou trois réponses nécessaires à la problématique, sans parties-thèmes ni catalogue de procédés.",
      transitions: "Formuler une question simple qui dit ce que la réponse précédente n'explique pas encore.",
      preuve: "Construire une chaîne réalisation → élément textuel → effet, sans sauter d'étape."
    }
  },
  "bac-2025-amerique-du-nord-general-commentaire-montaigne-essais": {
    title: "Essais — Sur l'inégalité entre les hommes",
    author: "Montaigne",
    stages: {
      donne: "Identifier l'objet explicite de la réflexion de Montaigne.",
      attente: "Formuler le critère social spontané que le texte met en cause.",
      transformation: "Faire apparaître le déplacement vers un jugement fondé sur la valeur propre.",
      problematique: "Construire une question qui conserve l'opposition entre apparence sociale et valeur propre.",
      plan: "Proposer deux ou trois réponses nécessaires qui expliquent ce déplacement du jugement.",
      transitions: "Formuler une question simple qui dit ce que la réponse précédente n'explique pas encore.",
      preuve: "Construire une chaîne réalisation → élément textuel → effet."
    }
  },
  "bac-2023-amerique-du-nord-general-commentaire-racine-berenice": {
    title: "Bérénice, IV, 5",
    author: "Jean Racine",
    stages: {
      donne: "Identifier la situation dramatique explicite.",
      attente: "Formuler ce qu'on attendrait normalement d'un aveu amoureux partagé.",
      transformation: "Faire apparaître que l'intensité de l'amour rend pourtant la séparation plus certaine et douloureuse.",
      problematique: "Construire une question qui conserve amour partagé et séparation inévitable.",
      plan: "Proposer deux ou trois réponses nécessaires qui expliquent le rapport entre amour et impossibilité.",
      transitions: "Formuler une question simple qui dit ce que la réponse précédente n'explique pas encore.",
      preuve: "Construire une chaîne réalisation → élément textuel → effet à partir de la parole dramatique."
    }
  },
  "bac-2021-metropole-general-commentaire-perec-les-choses": {
    title: "Les Choses, chapitre 2",
    author: "Georges Perec",
    stages: {
      donne: "Identifier ce que le passage décrit concrètement.",
      attente: "Formuler ce qu'on attendrait d'une simple description de logement.",
      transformation: "Faire apparaître que la description devient le révélateur d'un désir d'existence.",
      problematique: "Construire une question qui conserve le réel médiocre et la vie rêvée.",
      plan: "Proposer deux ou trois réponses nécessaires qui expliquent le passage du réel au désir.",
      transitions: "Formuler une question simple qui dit ce que la réponse précédente n'explique pas encore.",
      preuve: "Construire une chaîne réalisation → élément textuel → effet."
    }
  }
};

const GENERIC_ALLOWED = [
  "évaluer uniquement l'opération demandée",
  "nommer brièvement un point acquis",
  "signaler un seul manque principal",
  "poser une seule question de relance",
  "demander une preuve textuelle si la réponse reste générale"
];

const GENERIC_FORBIDDEN = [
  "donner une problématique modèle",
  "réécrire entièrement la réponse de l'élève",
  "proposer un plan complet",
  "rédiger une partie ou un commentaire",
  "donner plusieurs conseils à la fois",
  "donner une liste de procédés non demandée",
  "donner une note",
  "présenter une analyse comme officielle"
];

const FALLBACK_BY_STAGE = {
  donne: ["Tu as formulé une tentative.", "Il faut rester plus près des données explicites du texte.", "Qu'est-ce qui est objectivement donné dans la situation, avant toute interprétation ?"],
  attente: ["Tu as identifié une attente possible.", "Il faut la rendre plus simple et directement liée à la situation de départ.", "Qu'attendrait-on normalement d'une telle situation avant de lire la suite ?"],
  transformation: ["Tu as repéré un changement.", "Il faut rendre plus nette l'opposition entre l'attente et ce que le texte produit.", "Qu'est-ce que le texte fait apparaître malgré ce qu'on aurait attendu ?"],
  problematique: ["Tu as formulé une vraie question.", "Il faut faire apparaître plus nettement les deux pôles du problème.", "Quels sont les deux éléments que ta question doit garder ensemble ?"],
  plan: ["Tu proposes des réponses.", "Il faut vérifier qu'elles répondent à la problématique plutôt qu'elles ne nomment des thèmes ou procédés.", "Chaque partie répond-elle réellement à la question posée ?"],
  transitions: ["Tu as essayé d'enchaîner les réponses.", "Il faut formuler ce que la réponse précédente n'explique pas encore.", "Quelle question reste ouverte après cette partie ?"],
  preuve: ["Tu proposes une analyse.", "Il faut distinguer plus nettement réalisation, élément textuel et effet.", "Que fait le texte, quel élément précis le montre, et qu'est-ce que cela change ?"]
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

function safeFallback(stage = "problematique") {
  const f = FALLBACK_BY_STAGE[stage] || FALLBACK_BY_STAGE.problematique;
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
  const point = clean(value.point_acquis, 180);
  const manque = clean(value.manque_principal, 240);
  let question = clean(value.question_suivante, 240);

  if (!["acquis", "partiel", "à reprendre"].includes(diagnostic)) return null;
  if (!point || !manque || !question) return null;
  if (!question.endsWith("?")) question += "?";

  const all = (point + " " + manque + " " + question).toLowerCase();
  const bannedPhrases = [
    "établissement",
    "nécessité",
    "problématique modèle",
    "plan complet",
    "commentaire rédigé"
  ];
  if (bannedPhrases.some(x => all.includes(x))) return null;

  // Bloque un vrai plan numéroté sans faux positif sur des mots comme « oui. ».
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
    const annaleId = clean(context.annale_id, 180);
    const stage = clean(context.etape, 40);
    const annale = ANNALES[annaleId];
    if (!annale || !annale.stages[stage]) return null;

    return {
      exercise,
      stage,
      title: annale.author + " — " + annale.title,
      task: annale.stages[stage],
      allowed: GENERIC_ALLOWED,
      forbidden: GENERIC_FORBIDDEN
    };
  }

  const core = CORE_EXERCISES[exercise];
  if (!core) return null;
  return {
    exercise,
    stage: "problematique",
    title: core.title,
    task: core.task,
    allowed: GENERIC_ALLOWED,
    forbidden: GENERIC_FORBIDDEN
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

    const answer = clean(body.answer, 2200);
    const spec = buildSpec(body);

    if (!spec) return json({ ok: false, error: "Exercice ou étape non autorisé." }, 400, origin);
    if (answer.length < 8) return json({ ok: false, error: "Réponse trop courte." }, 400, origin);

    const instructions = `Tu es le moteur pédagogique strict de BAC & BREVET — FRANÇAIS.
Tu aides l'élève à refaire lui-même une opération précise. Tu ne fournis jamais la correction à sa place.

VOCABULAIRE ÉLÈVE À PRIVILÉGIER
- problématique
- réponse
- pourquoi ?
- réalisation
- élément textuel
- effet
- question de transition
- ce qui reste à expliquer

VOCABULAIRE INTERDIT DANS TON RETOUR
- établissement
- nécessité

RÈGLE SUR LA TRANSITION
Une transition peut être une simple question. Elle formule ce que la réponse précédente n'explique pas encore. Ne demande jamais une formule décorative du type « nous allons maintenant étudier ».

EXERCICE
${spec.title}

OPÉRATION À ÉVALUER
${spec.task}

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
- ne donne jamais la formulation correcte complète
- n'invente aucune citation
- si l'élève cite le texte, évalue seulement l'usage de ce qu'il a fourni
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
      max_output_tokens: 260,
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
    const feedback = validateFeedback(parsed) || safeFallback(spec.stage);

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
