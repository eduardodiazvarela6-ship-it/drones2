import { setText } from "./utils.js";

export function renderKpis(stations, departments) {
  const avgAqi = Math.round(stations.reduce((a, s) => a + s.aqi, 0) / stations.length);
  const critical = stations.filter(s => s.aqi >= 150).length;
  const coverage = departments.reduce((a, d) => a + d.cobertura_estaciones, 0);
  const updated = stations.sort((a, b) => new Date(b.ultimo_reporte) - new Date(a.ultimo_reporte))[0];
  setText("#kpi-aqi", avgAqi);
  setText("#kpi-critical", `${critical} zonas en alerta`);
  setText("#kpi-coverage", `${coverage} puntos monitoreados`);
  setText("#kpi-updated", new Date(updated.ultimo_reporte).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }));
}
