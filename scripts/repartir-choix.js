'use strict';
/* Varier la place de la proposition solide en gardant les identifiants
   d’origine des choix et leurs explications. Aucune réponse n’est réécrite. */
module.exports=function repartir(choices,position){
 const items=choices.map((choice,index)=>({choice,index}));
 const solid=choices.findIndex(c=>c[1]==='Solide');
 if(solid<0||!items.length)return items;
 const shift=(solid-position%items.length+items.length)%items.length;
 return items.slice(shift).concat(items.slice(0,shift));
};
