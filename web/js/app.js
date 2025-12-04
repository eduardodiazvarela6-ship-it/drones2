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
import { formatAQI } from "./utils.js";

let stations = [];

(async function init() {
  initMap();
  const data = await loadData();
  stations = data.stations;
  renderKpis(stations, data.departments);
  renderLeaderboard(data.leaderboard);
  renderTimeline(data.trends);
  renderAlerts(data.alerts);
  renderNews(data.news);
  drawStations(stations);
  setupFilters({ stations, onChange: handleFilter });
  setupSearch(stations, handleFilter);
  document.querySelector("#btn-geo").addEventListener("click", locateUser);
  document.querySelector("#btn-reset").addEventListener("click", () => handleFilter(stations));
  document.querySelector("#last-updated").textContent = new Date().toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" });
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
