import { formatAQI, formatDateTime } from "./utils.js";

const drawer = document.querySelector(".drawer");
const drawerTitle = drawer.querySelector(".drawer-title");
const drawerMeta = drawer.querySelector(".drawer-meta");
const drawerTable = drawer.querySelector("tbody");
const chips = drawer.querySelector(".chips");

export function openDrawer(station) {
  drawerTitle.textContent = `${station.nombre} — ${station.distrito}`;
  drawerMeta.textContent = `Último reporte: ${formatDateTime(station.ultimo_reporte)} · Estado ${station.estado}`;
  drawerTable.innerHTML = renderRows(station);
  chips.innerHTML = renderChips(station);
  drawer.classList.add("open");
}

export function closeDrawer() {
  drawer.classList.remove("open");
}

drawer.querySelector(".drawer-close").addEventListener("click", closeDrawer);

drawer.addEventListener("keydown", e => {
  if (e.key === "Escape") closeDrawer();
});

function renderRows(s) {
  const aqi = formatAQI(s.aqi);
  const rows = [
    ["AQI", `${s.aqi} (${aqi.label})`],
    ["PM2.5", `${s.pm25} µg/m³`],
    ["PM10", `${s.pm10} µg/m³`],
    ["NO₂", `${s.no2} ppb`],
    ["SO₂", `${s.so2} ppb`],
    ["O₃", `${s.o3} ppb`],
    ["CO", `${s.co} ppm`],
    ["Temperatura", `${s.temperatura} °C`],
    ["Humedad", `${s.humedad} %`],
    ["Presión", `${s.presion} hPa`]
  ];
  return rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");
}

function renderChips(s) {
  const aqi = formatAQI(s.aqi);
  const chips = [
    `<span class="badge" style="border-color:${aqi.color};color:${aqi.color}">Riesgo ${aqi.label}</span>`,
    `<span class="badge">${s.estado}</span>`,
    `<span class="badge">${s.departamento}</span>`
  ];
  if (s.fuentes?.length) chips.push(`<span class="badge">Fuentes: ${s.fuentes.slice(0,2).join(", ")}...</span>`);
  if (s.recomendacion) chips.push(`<span class="badge">${s.recomendacion}</span>`);
  return chips.join(" ");
}
