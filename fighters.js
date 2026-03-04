(function () {
  "use strict";

  // stvara modal ako ne postoji i vraća modal i box elemente
  function ensureModal() {
    let modal = document.getElementById("fighterModal");
    let box = document.getElementById("fighterBox");

    if (modal && box) return { modal, box };

    modal = document.createElement("div");
    modal.id = "fighterModal";
    modal.className = "modal";

    box = document.createElement("div");
    box.id = "fighterBox";
    box.className = "modal-content";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "close-modal";
    close.setAttribute("aria-label", "Zatvori");
    close.innerHTML = "&times;";

    const content = document.createElement("div");
    content.id = "fighterInfo";

    box.appendChild(close);
    box.appendChild(content);
    modal.appendChild(box);
    document.body.appendChild(modal);

    close.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });

    return { modal, box };
  }

  function closeModal() {
    const modal = document.getElementById("fighterModal");
    if (modal) modal.style.display = "none";
  }

  function getCategoryFromSection(buttonEl) {
    // tražimo najbližu "category-section" pa h3 tekst
    const section = buttonEl.closest(".category-section");
    if (!section) return "—";
    const h3 = section.querySelector("h3");
    if (!h3) return "—";
    return h3.textContent.trim();
  }

  function getRowData(buttonEl) {
    const tr = buttonEl.closest("tr");
    if (!tr) return null;

    const tds = tr.querySelectorAll("td");
    if (tds.length < 3) return null;

    return {
      rank: tds[0].textContent.trim(),
      name: tds[1].textContent.trim(),
      record: tds[2].textContent.trim(),
    };
  }

  // funckija showFigther koja se poziva klikom na gumb prikaži
  window.showFighter = function (fighterId) {
    // pronađi točno taj button prema onclick
    const btn = document.querySelector(`button[onclick*="'${fighterId}'"]`);
    if (!btn) {
      alert("Ne mogu pronaći gumb za ovog borca (provjeri fighterId).");
      return;
    }

    const row = getRowData(btn);
    if (!row) {
      alert("Ne mogu pročitati podatke iz tablice.");
      return;
    }

    const category = getCategoryFromSection(btn);

    const ui = ensureModal();
    const info = document.getElementById("fighterInfo");

    
    info.innerHTML = `
      <div class="fighter-modal">
        <h2 class="fighter-name">${row.name}</h2>
       

        <div class="fighter-stats">
          <div class="stat">
            <span class="stat-label">Rang</span>
            <span class="stat-value">${row.rank}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Rekord</span>
            <span class="stat-value">${row.record}</span>
          </div>
        </div>

        
      </div>
    `;

    ui.modal.style.display = "block";
  };
})();
