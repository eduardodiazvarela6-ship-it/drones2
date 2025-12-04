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
  // Inicializar mapa
  initMap();

  // Cargar datos
  const data = await loadData();
  stations = data.stations;

  // Renderizado global
  renderKpis(stations, data.departments);
  renderLeaderboard(data.leaderboard);
  renderTimeline(data.trends);
  renderAlerts(data.alerts);
  renderNews(data.news);

  // Pintar estaciones en mapa + lista
  drawStations(stations);

  // Filtros y búsqueda
  setupFilters({ stations, onChange: handleFilter });
  setupSearch(stations, handleFilter);

  // Botones de mapa
  const btnGeo = document.querySelector("#btn-geo");
  if (btnGeo) btnGeo.addEventListener("click", locateUser);

  const btnReset = document.querySelector("#btn-reset");
  if (btnReset) btnReset.addEventListener("click", () => handleFilter(stations));

  // Registrar última actualización
  const lastUpdatedEl = document.querySelector("#last-updated");
  if (lastUpdatedEl) {
    lastUpdatedEl.textContent = new Date().toLocaleString("es-PE", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
})();


/* ---------------------------------------------------------
   Dibuja en mapa + lista
--------------------------------------------------------- */
function drawStations(list) {
  plotStations(list, handleSelect);
  fitToStations(list);
  renderStationList(list);
}

/* ---------------------------------------------------------
   Filtros
--------------------------------------------------------- */
function handleFilter(list) {
  drawStations(list);
}

/* ---------------------------------------------------------
   Selección de estación
--------------------------------------------------------- */
function handleSelect(station) {
  openDrawer(station);
}

/* ---------------------------------------------------------
   Lista lateral
--------------------------------------------------------- */
function renderStationList(list) {
  const container = document.querySelector(".station-list");
  if (!container) return;

  container.innerHTML = list
    .map((st) => {
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

          <div class="meta">
            PM2.5 ${st.pm25} µg/m³ ·
            PM10 ${st.pm10} µg/m³ ·
            CO₂ ${st.co2} ppm
          </div>

          <div class="chips">
            <span class="tag">${risk.label}</span>
            <span class="tag">Estado ${st.estado}</span>
            <span class="tag">
              Actualizado
              ${new Date(st.ultimo_reporte).toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        </div>
      `;
    })
    .join("");

  // Click en cada tarjeta → abrir drawer
  container.querySelectorAll(".station-card").forEach((card) => {
    card.addEventListener("click", () => {
      const station = stations.find((s) => s.id === card.dataset.station);
      if (station) handleSelect(station);
    });
  });
}
