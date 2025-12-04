import { formatAQI, smoothScroll } from "./utils.js";

let map;
let markers = [];

export function initMap() {
  map = L.map("map", { zoomControl: false }).setView([-12.0464, -77.0428], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);
  L.control.zoom({ position: "bottomright" }).addTo(map);
}

export function clearMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
}

export function plotStations(stations, onSelect) {
  clearMarkers();
  stations.forEach(station => {
    const { color } = formatAQI(station.aqi);
    const icon = L.divIcon({
      className: "station-pin",
      html: `<div class="dot" style="background:${color}"></div><div class="label">${station.aqi}</div>`
    });
    const marker = L.marker(station.coordenadas, { icon }).addTo(map);
    marker.on("click", () => {
      onSelect(station);
      smoothScroll(document.querySelector(`[data-station='${station.id}']`));
    });
    markers.push(marker);
  });
}

export function fitToStations(stations) {
  if (!stations.length) return;
  const bounds = L.latLngBounds(stations.map(s => s.coordenadas));
  map.fitBounds(bounds.pad(0.2));
}

export function locateUser() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    L.circle([latitude, longitude], { radius: 300, color: "#22d3ee", fill: false }).addTo(map);
    map.flyTo([latitude, longitude], 14, { duration: 1.2 });
  });
}
