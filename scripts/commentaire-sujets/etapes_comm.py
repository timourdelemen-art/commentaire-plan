# Propositions au clic des pages de commentaire (méthode élève X / Y / comment, AGENTS.md § 2).
# La bonne réponse vient du corrigé et de la copie à 20 de la page ; les autres sont écrites ici, chacune avec son type
# (le type donne l’explication affichée, voir onglets_commentaire.py). Analyse interne : protocole du commentaire littéraire.
# xy : ce que le texte présente (X) et ce que son écriture en fait (Y) · pb : la problématique · plan · ana : une analyse
# AUTRE : le texte sur lequel l’élève refait seul la même opération (ses questions et corrigés viennent de sa page).
E, OK, LONG, AUTRE, PASSAGE = {}, {}, {}, {}, {}

E["bac-commentaire-hugo-branche-rude"] = dict(
 xy=[("X : une branche en hiver. Y : au printemps, une feuille finit par percer le bois noir.","paraphrase"),
     ("X : la nature. Y : le poème parle de l’amour et du passage des saisons.","theme"),
     ("X : un poète désespéré. Y : l’hiver annonce la fin de son amour.","faux")],
 pb=[("Comment Hugo décrit-il une branche d’arbre en hiver ?","description"),
     ("Pourquoi l’amour est-il si important dans ce poème de Hugo ?","theme"),
     ("Comment Hugo prouve-t-il que l’amour fait toujours refleurir les cœurs ?","resout")],
 plan=[("I. Les vers 1 à 6 / II. Les vers 7 à 12 / III. Les vers 13 à 18","lineaire"),
       ("I. La nature / II. L’amour / III. La poésie","thematique"),
       ("I. Les images / II. Les questions / III. L’anaphore de « C’est que »","procedes")],
 ana=[("Le poète dit qu’après l’hiver la branche va de nouveau donner des feuilles.","paraphrase"),
      ("On relève un connecteur d’opposition et un verbe au futur proche.","etiquette"),
      ("Le futur rend le passage plus vivant et montre l’espoir du poète.","general")],
)
OK["bac-commentaire-hugo-branche-rude"] = (
 "X : une branche noire sous la pluie, qui va refleurir. Y : l’analogie fait de cette renaissance une déclaration d’amour.",
 "I. La nature fait jaillir la vie du bois le plus dur / II. Cette branche est le portrait du poète que l’amour fait revivre / III. La renaissance devient une loi du monde",
 "Le connecteur « Mais » et le futur « tu vas voir » annoncent un retournement que l’hiver ne laissait pas prévoir.")
LONG["bac-commentaire-hugo-branche-rude"] = dict(
 paraphrase="X : une branche noire sous la pluie, en plein hiver. Y : au printemps, une feuille tendre finit par percer le bois noir et dur.",
 description="Comment Hugo décrit-il une branche d’arbre noire et nue, battue par la pluie, au cœur de l’hiver ?",
 lineaire="I. Les vers 1 à 6 : la branche en hiver / II. Les vers 7 à 12 : l’âme du poète / III. Les vers 13 à 18 : la loi du monde",
 theme="X : la nature et ses saisons. Y : le poème parle de l’amour, du temps qui passe et du retour du printemps après l’hiver.",
 thematique="I. La nature en hiver et au printemps / II. L’amour du poète pour la jeune femme / III. La poésie et l’écriture des vers",
 general="Le futur rend le passage plus vivant et plus dynamique, et il montre que le poète garde l’espoir malgré la tristesse de l’hiver.")
PASSAGE["bac-commentaire-hugo-branche-rude"] = "« Mais attends que l’hiver s’en aille, et tu vas voir / Une feuille percer ces nœuds si durs pour elle »"

E["bac-commentaire-leconte-de-lisle-hialmar"] = dict(
 xy=[("X : un champ de bataille couvert de morts. Y : Hialmar, blessé, demande au corbeau d’emporter son cœur.","paraphrase"),
     ("X : la guerre. Y : le poème parle de la mort et du courage des guerriers.","theme"),
     ("X : un guerrier victorieux. Y : il célèbre sa victoire avant de rentrer chez lui.","faux")],
 pb=[("Comment Leconte de Lisle décrit-il un champ de bataille couvert de morts ?","description"),
     ("Pourquoi la guerre est-elle si cruelle dans « Le Cœur de Hialmar » ?","theme"),
     ("Comment Leconte de Lisle montre-t-il que mourir au combat est toujours glorieux ?","resout")],
 plan=[("I. Les premières strophes / II. Les strophes du milieu / III. Les dernières strophes","lineaire"),
       ("I. La guerre / II. La mort / III. L’amour","thematique"),
       ("I. Les couleurs / II. Les impératifs / III. Les apostrophes","procedes")],
 ana=[("Hialmar demande au corbeau d’ouvrir sa poitrine et aux loups de boire son sang.","paraphrase"),
      ("On relève deux impératifs et une apostrophe adressée aux loups.","etiquette"),
      ("Les impératifs rendent la scène violente et frappante.","general")],
)
OK["bac-commentaire-leconte-de-lisle-hialmar"] = (
 "X : un guerrier agonise parmi les morts et prend la parole. Y : ses paroles font de sa mort une grandeur héroïque et amoureuse.",
 "I. Le poème montre toute la réalité de la défaite / II. Par la parole, Hialmar reprend la maîtrise de ce qu’il subit / III. La mort change de sens et devient glorieuse",
 "Les impératifs lui font ordonner lui-même ce qu’il devrait subir : le mourant reprend la maîtrise de sa mort.")
LONG["bac-commentaire-leconte-de-lisle-hialmar"] = dict(
 description="Comment Leconte de Lisle décrit-il un champ de bataille glacé, couvert de morts, où un guerrier agonise ?",
 lineaire="I. Les morts sur le champ de bataille / II. Hialmar appelle le corbeau / III. Hialmar envoie son cœur à la fille d’Ylmer",
 theme="X : la guerre et ses massacres. Y : le poème parle de la mort, du courage des guerriers et de l’amour qu’ils laissent derrière eux.",
 thematique="I. La guerre et le champ de bataille / II. La mort du guerrier blessé / III. L’amour pour la fille d’Ylmer",
 general="Les impératifs rendent la scène très violente et frappante, et ils montrent la souffrance terrible du guerrier blessé.")
PASSAGE["bac-commentaire-leconte-de-lisle-hialmar"] = "« Ouvre-moi la poitrine » ; « Buvez, ô loups, mon sang vermeil »"

# Pour l’écrit : chaque page renvoie à un autre texte, dont elle reprend les questions et les corrigés.
AUTRE["bac-commentaire-hugo-branche-rude"] = "bac-commentaire-leconte-de-lisle-hialmar"
AUTRE["bac-commentaire-leconte-de-lisle-hialmar"] = "bac-commentaire-hugo-branche-rude"
