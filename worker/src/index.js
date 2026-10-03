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
      "Une grande partie est une SOLUTION nécessaire à la problématique, jamais un thème.",
      "NÉCESSITÉ DE LA SOLUTION = pourquoi cette solution est indispensable pour comprendre la transformation et répondre à la problématique.",
      "Une TRANSITION est une seule question simple qui fait apparaître ce qu'il reste encore à expliquer.",
      "RÉALISATION = ce que le texte fait pour construire la solution.",
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

  if (exercise === "free-response") {
    const context = body.context && typeof body.context === "object" ? body.context : {};
    const title = clean(context.title, 220);
    const instruction = clean(context.instruction, 1800);
    const quote = clean(context.quote, 1200);
    const page = clean(context.page, 120);
    if (!instruction) return null;

    const lower=(title+" "+instruction+" "+page).toLowerCase();
    const explicitKind=clean(context.kind,50);
    let kind=ALLOWED_STAGE_KINDS.has(explicitKind) ? explicitKind : "lecture";
    if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /probl[ée]matique/.test(lower)) kind="problematique";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /plan|partie|solution nécessaire|solution necessaire/.test(lower)) kind="plan";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /transition/.test(lower)) kind="transition";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /réécri|reecri/.test(lower)) kind="brevet-reecriture";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /grammaire|nature|fonction|conjug|accord|pronom|temps verbal|lexique/.test(lower)) kind="brevet-grammaire";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /rédaction|redaction|argument|écrire|ecrire/.test(lower)) kind="brevet-redaction";
    else if (!ALLOWED_STAGE_KINDS.has(explicitKind) && /procédé|procede|effet|réalisation|realisation|élément textuel|element textuel|paradoxe|figure/.test(lower)) kind="analyse";

    const isCommentary=/commentaire|probl[ée]matique|réalisation|realisation|transition/.test(lower);
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
      "Une grande partie est une SOLUTION nécessaire à la problématique, jamais un thème.",
      "TRANSITION = une seule question simple qui fait apparaître ce que la solution précédente ne suffit pas encore à expliquer. Elle ne justifie pas la solution suivante : elle rend seulement nécessaire le passage à une étape supplémentaire.",
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
      "Une grande partie est une SOLUTION nécessaire à la problématique.",
      "Ne jamais employer « établissement » pour désigner une partie.",
      "TRANSITION = une simple question qui fait apparaître ce que la solution précédente ne suffit pas encore à expliquer."
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
    const spec = buildSpec(body);

    if (!spec) return json({ ok: false, error: "Exercice ou étape non autorisé." }, 400, origin);
    if (answer.length < 8) return json({ ok: false, error: "Réponse trop courte." }, 400, origin);

    const instructions = `Tu es le moteur pédagogique strict de BAC & BREVET — FRANÇAIS.
Tu aides l'élève à refaire lui-même une opération précise. Tu ne fournis jamais la correction à sa place d'emblée.

VOCABULAIRE ET MÉTHODE
- Problématique : la question qui demande ce que le texte oblige à expliquer.
- Solution : ce que chaque grande partie affirme pour répondre à la problématique.
- Nécessité de la solution : pourquoi cette solution est indispensable pour comprendre la transformation et répondre à la problématique.
- Nécessité de transition : ce que la solution précédente ne suffit pas encore à expliquer ; elle s'exprime par une question simple qui rend nécessaire le passage à l'étape suivante.
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
