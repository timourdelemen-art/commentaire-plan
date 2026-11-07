/* Dissertations de philosophie produites avec le protocole V16.1-exp.
   Source unique : scripts/dissertations-v16/<id>.json (fiche de production, citations, copie).
   Ce module charge les sources, les contrôle et en dérive les données des pages et des exercices. */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'dissertations-v16');

const PROTOCOL_WORDS = ['aporie', 'aporétique', 'limite interne', 'acquis', 'déficit', 'régime', 'résolution', 'chemin', 'geste', 'matrice', 'cas témoin', 'acte de lecture', 'prix'];
const FICHE_FIELDS = ['operateur', 'sens', 'verrou', 'trois_reponses', 'conciliation_1_8bis', 'brouillon', 'A', 'FA', 'XA', 'YA', 'ZA', 'type_LA', 'LA', 'six_LA', 'T1', 'B', 'FB', 'XB', 'YB', 'ZB', 'type_LB', 'LB', 'six_LB', 'T2', 'epreuves', 'soupcon_aporie', 'phrase_mouvement', 'probleme_directeur', 'problematique', 'forme_problematique', 'critere', 'contrainte_scene', 'III', 'candidats_III', 'generateur', 'scene', 'statut'];
// Indices qui trahiraient le travail d'assistance (ou la mécanique du protocole) dans le texte public.
const LEAKS = [
  [/œuvre fournie|mot pour mot|citation exacte|retrouvé/iu, 'métadonnée de vérification'],
  [/protocole(?! de Montréal)|V16|\bIA\b|Claude|Anthropic|ChatGPT|assistant/iu, 'mention d’outil ou de méthode'],
  [/\b(I|II|III)\.\d/u, 'numérotation du protocole'],
  [/\bT[12]\b|\bρ\b|\b(FA|FB|XA|XB|LA|LB)\b|scellé/u, 'sigle de fiche'],
  [/soupçon|verrou|régime|cas témoin|restitution|rechute|test propre/iu, 'terme de mécanique interne'],
];
const CITATION_FIELDS = ['texte', 'auteur', 'oeuvre', 'lieu', 'edition', 'verification', 'regime', 'fonction'];

const text = v => typeof v === 'string' && v.trim().length > 0;
const words = s => s.trim().split(/\s+/u).length;
const sub = f => { const m = /^\s*(III|II|I)\.(\d)/.exec(f || ''); return m ? m[1] + '.' + m[2] : ''; };
const isTransition = f => /^\s*Transition\b/i.test(f || '');

function load() {
  if (!fs.existsSync(DIR)) return {};
  const out = {};
  for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort()) {
    const d = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
    out[d.id] = d;
  }
  return out;
}

function check(d) {
  const errors = [];
  const fail = m => errors.push(`${d.id}: ${m}`);
  if (!text(d.subject)) fail('sujet absent');
  const fiche = d.fiche || {};
  for (const k of FICHE_FIELDS) if (fiche[k] == null || (typeof fiche[k] === 'string' && !fiche[k].trim())) fail(`fiche : rubrique ${k} absente`);
  for (const k of ['a', 'b', 'c', 'd', 'e']) if (!text(fiche.brouillon?.[k])) fail(`brouillon 1.10 : question ${k} absente`);
  for (const k of ['operation', 'III1', 'III2', 'III3', 'tests']) if (!text(fiche.III?.[k])) fail(`III : ${k} absent`);
  const cands = fiche.candidats_III || [];
  if (cands.length < 3) fail('au moins trois opérations de III examinées au seuil');
  if (cands.filter(c => c.verdict === 'retenue').length !== 1) fail('une seule opération retenue');
  const copy = d.copy || [];
  const heads = copy.map(([h]) => h);
  if (heads[0] !== 'INTRODUCTION' || !/^I\. /.test(heads[1] || '') || !/^II\. /.test(heads[2] || '') || !/^III\. /.test(heads[3] || '') || heads[4] !== 'CONCLUSION' || heads.length !== 5) fail('structure : INTRODUCTION, I., II., III., CONCLUSION');
  const all = copy.flatMap(([, ss]) => ss.map(([t]) => t)).join(' ');
  // Une seule question dans l’introduction : la problématique.
  const intro = (copy[0] || [, []])[1];
  const qs = intro.filter(([t]) => /\?\s*$/.test(t));
  if (qs.length !== 1) fail(`introduction : ${qs.length} questions (une seule attendue)`);
  else if (qs[0][0] !== fiche.problematique) fail('la problématique de la copie diffère de celle de la fiche');
  // Trois sous-parties par partie, dans l’ordre ; transitions après I et II seulement.
  ['I', 'II', 'III'].forEach((P, i) => {
    const ss = (copy[i + 1] || [, []])[1];
    const body = ss.filter(([, f]) => !isTransition(f));
    const seq = body.map(([, f]) => sub(f));
    if (seq.some(s => !s.startsWith(P + '.'))) fail(`${P} : phrase sans repère de sous-partie`);
    const order = [...new Set(seq)];
    if (order.join() !== [1, 2, 3].map(n => P + '.' + n).join()) fail(`${P} : sous-parties ${order.join(' ')} (attendu ${P}.1 ${P}.2 ${P}.3)`);
    const tr = ss.filter(([, f]) => isTransition(f));
    if (P !== 'III' && !tr.length) fail(`transition absente après ${P}`);
    if (P === 'III' && tr.length) fail('transition après III');
    if (tr.length && ss.findIndex(([, f]) => isTransition(f)) < ss.length - tr.length) fail(`${P} : la transition doit suivre la partie`);
    if (tr.length && !/\?\s*$/.test(tr[tr.length - 1][0])) fail(`transition après ${P} : elle doit s’achever sur une question`);
    const last3 = body.filter(([, f]) => sub(f) === P + '.3');
    if (P === 'I' && last3.length && last3[last3.length - 1][0] !== fiche.LA) fail('fin de I.3 ≠ énoncé scellé LA');
    if (P === 'II' && last3.length && last3[last3.length - 1][0] !== fiche.LB) fail('fin de II.3 ≠ énoncé scellé LB');
    if (P === 'III' && !last3.some(([, f]) => /reste/i.test(f))) fail('III.3 : le reste n’est pas formulé');
  });
  const concl = (copy[4] || [, []])[1];
  if (!concl.length || !/\?\s*$/.test(concl[concl.length - 1][0])) fail('conclusion : le reste doit finir en question');
  for (const w of PROTOCOL_WORDS) if (new RegExp(`(^|[^\\p{L}])${w}`, 'iu').test(all)) fail(`mot du protocole dans la copie : « ${w} »`);
  for (const [re, label] of LEAKS) {
    const hit = re.exec(all) || (d.citations || []).map(c => [c.texte, c.auteur, c.oeuvre, c.lieu, c.edition].filter(Boolean).join(' | ')).map(t => re.exec(t)).find(Boolean);
    if (hit) fail(`indice technique visible sur le site : ${label} (« ${hit[0]} »)`);
  }
  const n = words(all);
  if (n < 880 || n > 1450) fail(`longueur ${n} mots (900 à 1 400 attendus)`);
  for (const c of d.citations || []) {
    for (const k of CITATION_FIELDS) if (!text(c[k])) fail(`citation : ${k} absent`);
    if (text(c.texte) && !all.includes(c.texte)) fail(`citation absente de la copie ou modifiée : ${c.texte.slice(0, 50)}…`);
  }
  return errors;
}

function derive(d) {
  const f = d.fiche;
  const part = i => d.copy[i][1];
  const first = (i, p) => (part(i).find(([, fn]) => sub(fn) === p) || [''])[0];
  const trans = i => part(i).filter(([, fn]) => isTransition(fn)).map(([t]) => t);
  const lastQ = arr => arr.filter(t => /\?\s*$/.test(t)).pop() || arr[arr.length - 1] || '';
  const retained = f.candidats_III.find(c => c.verdict === 'retenue');
  const iii3 = part(3).filter(([, fn]) => sub(fn) === 'III.3');
  const reste = (iii3.find(([, fn]) => /reste/i.test(fn)) || [''])[0];
  const finalQ = part(4)[part(4).length - 1][0];
  return {
    id: d.id, subject: d.subject,
    sens: f.sens, verrou: f.verrou,
    brouillon: f.brouillon, problematique: f.problematique,
    annonce: (part(0).find(([, fn]) => /annonce/i.test(fn)) || [''])[0],
    plan: { I: first(1, 'I.1'), T1: lastQ(trans(1)), II: first(2, 'II.1'), T2: lastQ(trans(2)), III: (iii3[0] || [''])[0] },
    A: f.A, LA: f.LA, B: f.B, LB: f.LB, XA: f.XA, XB: f.XB,
    D: f.T2, critere: f.critere, retained, candidates: f.candidats_III, reste, finalQ,
    operation: f.III.operation, statut: f.statut
  };
}

module.exports = { load, check, derive, DIR, PROTOCOL_WORDS };

if (require.main === module) {
  const all = load();
  const errors = Object.values(all).flatMap(check);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`V16 : ${Object.keys(all).length} dissertations contrôlées (structure, énoncés scellés, problématique, citations, mots du protocole).`);
}
