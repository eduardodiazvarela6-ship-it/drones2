import { selectAll } from "./utils.js";

export function setupFilters({ stations, onChange }) {
  const chips = selectAll(".chip[data-filter]");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const type = chip.dataset.filter;
      const value = chip.dataset.value;
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filtered = applyFilter(stations, type, value);
      onChange(filtered);
    });
  });
}

function applyFilter(stations, type, value) {
  if (type === "all") return stations;
  if (type === "departamento") return stations.filter(s => s.departamento === value);
  if (type === "estado") return stations.filter(s => s.estado.toLowerCase() === value);
  return stations;
}
