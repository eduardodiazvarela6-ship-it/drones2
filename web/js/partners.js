export function renderPartners(factories) {
  const container = document.querySelector(".partners-grid");
  container.innerHTML = factories.map(f => `
    <article class="partner-card">
      <div class="logo-wrap">
        <img src="${f.logo}" alt="${f.nombre}" loading="lazy" />
      </div>
      <div class="partner-body">
        <div class="partner-title">${f.nombre}</div>
        <div class="partner-meta">${f.ciudad} · ${f.distrito}</div>
        <div class="partner-tagline">${f.tagline}</div>
        <div class="partner-flags">
          <span class="tag">Planta baja emisión</span>
          <span class="tag">${f.programa}</span>
          <span class="tag">${f.aporte}</span>
        </div>
      </div>
    </article>
  `).join("");
}
