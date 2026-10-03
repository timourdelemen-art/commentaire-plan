(() => {
  const CONFIG = {
    freeDiagnostics: 5,
    storageKey: "bbf-access-v1"
  };

  function load(){
    try{
      const raw=JSON.parse(localStorage.getItem(CONFIG.storageKey)||"{}");
      return {
        used:Number.isFinite(raw.used)?raw.used:0,
        premium:Boolean(raw.premium)
      };
    }catch{
      return {used:0,premium:false};
    }
  }

  function save(state){
    localStorage.setItem(CONFIG.storageKey,JSON.stringify(state));
  }

  function getStatus(){
    const state=load();
    return {
      premium:state.premium,
      used:state.used,
      limit:CONFIG.freeDiagnostics,
      remaining:state.premium ? Infinity : Math.max(0,CONFIG.freeDiagnostics-state.used)
    };
  }

  function canUseAI(){
    const s=getStatus();
    return s.premium || s.remaining>0;
  }

  function consumeDiagnostic(){
    const state=load();
    if(!state.premium){
      state.used=Math.min(CONFIG.freeDiagnostics,state.used+1);
      save(state);
    }
    return getStatus();
  }

  function paywallUrl(){
    return "../offre.html?source=annale";
  }

  function renderBadge(el){
    if(!el)return;
    const s=getStatus();
    if(s.premium){
      el.textContent="ACCÈS COMPLET";
      el.classList.add("premium");
    }else{
      el.textContent=s.remaining+" RETOUR"+(s.remaining>1?"S":"")+" GRATUIT"+(s.remaining>1?"S":"")+" RESTANT"+(s.remaining>1?"S":"");
    }
  }

  function showPaywall(container){
    if(!container)return;
    container.innerHTML=
      "<div class='paywall-box'>"+
      "<div class='kicker'>ACCÈS COMPLET</div>"+
      "<h3>Vous avez utilisé vos 5 retours gratuits.</h3>"+
      "<p>Vous pouvez continuer à travailler le texte. Pour recevoir de nouveaux retours, accéder aux parcours complets et aux entraînements ciblés, l’accès complet ouvre tout l’espace élève pendant 12 mois.</p>"+
      "<a class='btn red small' href='"+paywallUrl()+"'>Voir l’offre · 29 € pour 12 mois →</a>"+
      "</div>";
    container.classList.add("show");
  }

  window.AccessControl={
    getStatus,
    canUseAI,
    consumeDiagnostic,
    renderBadge,
    showPaywall
  };
})();