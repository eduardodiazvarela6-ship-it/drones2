export function formatAQI(aqi) {
  if (aqi >= 150) return { label: "Peligroso", color: "var(--danger)" };
  if (aqi >= 100) return { label: "Moderado", color: "#f59e0b" };
  return { label: "Bueno", color: "var(--good)" };
}

export function formatDateTime(iso) {
  const date = new Date(iso);
  return date.toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" });
}

export function setText(el, value) {
  const node = typeof el === "string" ? document.querySelector(el) : el;
  if (node) node.textContent = value;
}

export function badge(text) {
  const span = document.createElement("span");
  span.className = "badge";
  span.textContent = text;
  return span;
}

export function selectAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

export function smoothScroll(target) {
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
}
