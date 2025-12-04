import { formatDateTime } from "./utils.js";

export function renderAlerts(alerts) {
  const container = document.querySelector(".alerts");
  container.innerHTML = alerts.map(alert => `
    <div class="alert-card">
      <div class="card-header">
        <div>
          <div class="card-title">${alert.titulo}</div>
          <div class="card-subtitle">${alert.departamento}</div>
        </div>
        <span class="tag">${alert.tipo}</span>
      </div>
      <div class="text-muted" style="line-height:1.5;">${alert.mensaje}</div>
      <div class="meta">Vigente hasta ${formatDateTime(alert.vigente_hasta)}</div>
    </div>
  `).join("");
}
