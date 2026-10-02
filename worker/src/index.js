const ALLOWED_ORIGINS = new Set([
  "https://commentaire-plan.com",
  "https://www.commentaire-plan.com",
  "https://commentaire-dissertation.netlify.app"
]);

const EXERCISES = {
  "hialmar-problematique": {
    title: "Le Cœur de Hialmar — problématique",
    task: "L'élève doit formuler une problématique qui fasse apparaître l'écart entre la défaite physique / l'agonie du héros et la puissance qu'il continue pourtant d'exercer par sa parole et ses décisions.",
    allowed: [
      "évaluer si les deux pôles du problème sont présents",
      "signaler un seul manque principal",
      "nommer brièvement un point acquis",
      "poser une seule question de relance"
    ],
    forbidden: [
      "donner une problématique modèle",
      "réécrire entièrement la réponse de l'élève",
      "proposer un plan",
      "proposer des parties ou sous-parties",
      "rédiger un commentaire",
      "multiplier les conseils",
      "donner une liste de procédés"
    ]
  }
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

function safeFallback() {
  return {
    diagnostic: "à reprendre",
    point_acquis: "Tu as formulé une véritable tentative.",
    manque_principal: "Il faut faire apparaître plus nettement les deux éléments qui semblent se contredire dans la situation.",
    question_suivante: "Qu’attend-on normalement d’un guerrier vaincu et agonisant, et que continue pourtant à faire Hialmar ?"
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
  const banned = [
    "établissement",
    "nécessité",
    "problématique modèle",
    "plan complet",
    "commentaire rédigé",
    "i.",
    "ii.",
    "iii."
  ];
  if (banned.some(x => all.includes(x))) return null;

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

    const exercise = clean(body.exercise, 80);
    const answer = clean(body.answer, 1800);
    const spec = EXERCISES[exercise];

    if (!spec) return json({ ok: false, error: "Exercice non autorisé." }, 400, origin);
    if (answer.length < 8) return json({ ok: false, error: "Réponse trop courte." }, 400, origin);

    const instructions = `Tu es le moteur pédagogique strict de L'Atelier du commentaire.
Tu n'es pas un professeur qui donne la correction : tu aides l'élève à refaire lui-même l'opération.

VOCABULAIRE ÉLÈVE OBLIGATOIRE
- problématique
- réponse
- pourquoi ?
- réalisation
- élément textuel
- effet
- question de transition : ce qui reste à expliquer

VOCABULAIRE INTERDIT DANS TON RETOUR
- établissement
- nécessité

RÈGLE SUR LA TRANSITION
Une transition peut être une simple question. Elle formule ce que la réponse précédente n'explique pas encore et rend la réponse suivante nécessaire. Ne demande jamais une formule décorative du type « nous allons maintenant étudier ».

EXERCICE
${spec.title}
Objectif interne : ${spec.task}

TU PEUX UNIQUEMENT
${spec.allowed.map(x => "- " + x).join("\n")}

TU NE DOIS JAMAIS
${spec.forbidden.map(x => "- " + x).join("\n")}

CONTRAINTES DE RÉPONSE
- tutoie l'élève
- ton sobre, précis, non infantilisant
- un seul point acquis
- un seul manque principal
- une seule question de relance
- ne donne jamais la formulation correcte complète
- ne cite aucun procédé si l'exercice ne porte pas sur les procédés
- ne donne aucune note
- réponse totale très brève

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
    const feedback = validateFeedback(parsed) || safeFallback();

    return json({
      ok: true,
      exercise,
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
