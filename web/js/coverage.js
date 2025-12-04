import { formatAQI } from "./utils.js";

export function renderCoverage(departments) {
  const container = document.querySelector(".coverage-grid");
  const sorted = [...departments].sort((a, b) => b.cobertura_estaciones - a.cobertura_estaciones);
  container.innerHTML = sorted.map(dep => {
    const risk = formatAQI(dep.promedio_aqi);
    const badgeColor = dep.alerta ? "var(--badge-red)" : "var(--badge-green)";
    const badgeText = dep.alerta ? "var(--badge-red-text)" : "var(--badge-green-text)";
    return `
      <div class="coverage-card">
        <div class="title">${dep.departamento}</div>
        <div class="meta">Capital: ${dep.capital} · ${dep.cobertura_estaciones} estaciones</div>
        <div class="meta">AQI ref.: <span style="color:${risk.color};font-weight:700;">${dep.promedio_aqi}</span></div>
        <div class="badge" style="background:${badgeColor};color:${badgeText};">${dep.alerta ? "Alerta activa" : "Seguimiento estable"}</div>
      </div>
    `;
  }).join("");
}
