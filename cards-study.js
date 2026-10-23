(() => {
  const labels = {new_relationship:"Новое знакомство",existing_relationship:"Существующие отношения",separation_or_ex:"Расставание или бывший партнёр",work_and_study:"Работа и учёба",family:"Семья",self_development:"Личное развитие",choice:"Выбор"};
  const esc = value => String(value || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const cards = () => window.MANARA_DATA || [];
  function openCard(id) {
    const card = cards().find(item => item.id === id); if (!card) return;
    const contexts = Object.entries(card.contexts || {}).map(([key,value]) => `<section><h3>${esc(labels[key] || key)}</h3><p>${esc(value)}</p></section>`).join("");
    document.getElementById("card-detail").innerHTML = `<p class="eyebrow">${esc(card.id)}</p><h2>${esc(card.name)}</h2><p class="keywords">${(card.keywords||[]).map(esc).join(" · ")}</p><section><h3>Ядро значения</h3><p>${esc(card.core_theme)}</p></section>${card.feelings?`<section><h3>Чувства</h3><p>${esc(card.feelings)}</p></section>`:""}${card.intentions?`<section><h3>Намерения</h3><p>${esc(card.intentions)}</p></section>`:""}${card.behavior?`<section><h3>Поведение</h3><p>${esc(card.behavior)}</p></section>`:""}${contexts}<section><h3>Совет</h3><p>${esc(card.advice)}</p></section><section><h3>Риск трактовки</h3><p>${esc(card.risk)}</p></section><p class="keywords">Теги: ${(card.tags||[]).map(esc).join(" · ")}</p>`;
    document.getElementById("card-dialog").showModal();
  }
  const observer = new MutationObserver(() => {
    document.querySelectorAll("#card-list .catalog-card:not([data-study-ready])").forEach(article => {
      const text = article.querySelector("p")?.textContent || ""; const id = text.split("·").pop()?.trim(); if (!id || !cards().some(card => card.id === id)) return;
      article.dataset.studyReady = "true"; const button = document.createElement("button"); button.className = "secondary card-open"; button.textContent = "Открыть подробное значение"; button.addEventListener("click", () => openCard(id)); article.append(button);
    });
  });
  observer.observe(document.getElementById("card-list"), {childList:true,subtree:true});
  document.getElementById("close-card").addEventListener("click", () => document.getElementById("card-dialog").close());
  document.getElementById("card-dialog").addEventListener("click", event => {if (event.target.id === "card-dialog") event.target.close();});
})();
