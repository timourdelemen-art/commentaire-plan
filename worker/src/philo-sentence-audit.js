/* Audit de surface : contrôle de la présence de phrases annotables, pas de leur vérité philosophique. */
export function auditPhiloCopySentences(copie) {
  const text=String(copie||"").trim();
  const paragraphs=text.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  const sentences=text.match(/[^.!?]+(?:[.!?]+|$)/gu)||[];
  const problems=[];
  if(text.length<1800) problems.push("Texte trop bref pour une dissertation modèle développée.");
  if(/(?:^|\n)\s*(?:Argument\s*\d+|Arguments\s*(?:vs|contre)\s*Références|Analyse des termes)\s*[:—]/im.test(text)) problems.push("Plan ou fiche explicative au lieu d'une copie rédigée.");
  if(/(?:^|\n)\s*[-•]\s+/m.test(text)) problems.push("Présence de listes à puces dans la copie.");
  if(!/\b(?:I\.|première partie|d'abord)\b/i.test(text)||!/\b(?:II\.|deuxième partie|ensuite)\b/i.test(text)||!/\b(?:III\.|troisième partie|enfin)\b/i.test(text)) problems.push("Mouvement argumentatif en trois parties non repérable.");
  if(!/conclusion/i.test(text)) problems.push("Conclusion non repérable.");
  return {ok:problems.length===0,problems,paragraphCount:paragraphs.length,sentenceCount:sentences.length,
    warning:"Contrôle formel seulement : la nécessité logique et la qualité des phrases exigent une évaluation philosophique indépendante."};
}
