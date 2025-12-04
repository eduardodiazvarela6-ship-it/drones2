import { initMap, plotStations, fitToStations, locateUser } from "./map.js";
import { loadData } from "./dataLoader.js";
import { setupFilters } from "./filters.js";
import { openDrawer } from "./drawer.js";
import { renderKpis } from "./kpis.js";
import { renderLeaderboard } from "./leaderboard.js";
import { renderTimeline } from "./timeline.js";
import { renderAlerts } from "./alerts.js";
import { setupSearch } from "./search.js";
import { renderNews } from "./news.js";
import { renderCoverage } from "./coverage.js";
import { renderGuidance } from "./guidance.js";
import { renderPartners } from "./partners.js";
import { formatAQI } from "./utils.js";

let stations = [];

(async function init() {
  initMap();
  const data = await loadData();
  stations = refreshTimestamps(data.stations);
  renderKpis(stations, data.departments);
  renderLeaderboard(data.leaderboard);
  renderTimeline(data.trends);
  renderAlerts(data.alerts);
  renderNews(data.news);
  renderCoverage(data.departments);
  renderPartners(data.factories);
  renderGuidance(data.guidance);
  drawStations(stations);
  setupFilters({ stations, onChange: handleFilter });
  setupSearch(stations, handleFilter);
  document.querySelector("#btn-geo").addEventListener("click", locateUser);
  document.querySelector("#btn-reset").addEventListener("click", () => handleFilter(stations));
  startClocks();
  updateCoverageBadges(data.departments.length);
})();

function drawStations(list) {
  plotStations(list, handleSelect);
  fitToStations(list);
  renderStationList(list);
}

function handleFilter(list) {
  drawStations(list);
}

function handleSelect(station) {
  openDrawer(station);
}

function refreshTimestamps(list) {
  const now = Date.now();
  return list.map(item => {
    const offsetMinutes = Math.floor(Math.random() * 50);
    const stamp = new Date(now - offsetMinutes * 60 * 1000).toISOString();
    return { ...item, ultimo_reporte: stamp };
  });
}

function renderStationList(list) {
  const container = document.querySelector(".station-list");
  container.innerHTML = list.map(st => {
    const risk = formatAQI(st.aqi);
    return `
      <div class="station-card" data-station="${st.id}">
        <div class="top">
          <div>
            <div class="card-title">${st.nombre}</div>
            <div class="card-subtitle">${st.distrito} · ${st.departamento}</div>
          </div>
          <div class="aqi" style="color:${risk.color}">${st.aqi}</div>
        </div>
        <div class="meta">PM2.5 ${st.pm25} µg/m³ · PM10 ${st.pm10} µg/m³ · CO₂ ${st.co2} ppm</div>
        <div class="chips">
          <span class="tag">${risk.label}</span>
          <span class="tag">Estado ${st.estado}</span>
          <span class="tag">Actualizado ${new Date(st.ultimo_reporte).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".station-card").forEach(card => {
    card.addEventListener("click", () => {
      const station = stations.find(s => s.id === card.dataset.station);
      handleSelect(station);
    });
  });
}

function startClocks() {
  const update = () => {
    const now = new Date();
    document.querySelector("#local-clock").textContent = now.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Lima"
    });
    document.querySelector("#last-updated").textContent = now.toLocaleString("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Lima"
    });
  };
  update();
  setInterval(update, 1000 * 30);
}

function updateCoverageBadges(count) {
  const badge = document.querySelector("#coverage-badge");
  const tag = document.querySelector("#coverage-tag");
  if (badge) badge.textContent = `Cobertura ${count} departamentos`;
  if (tag) tag.textContent = `${count} regiones monitoreadas`;
}
