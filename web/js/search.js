export function setupSearch(stations, onSelect) {
  const input = document.querySelector("#search");
  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    const result = stations.filter(s => `${s.nombre} ${s.distrito}`.toLowerCase().includes(term));
    onSelect(result);
  });
}
