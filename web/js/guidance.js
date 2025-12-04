export function renderGuidance(items) {
  const container = document.querySelector(".guidance-grid");
  container.innerHTML = items.map(item => {
    const palette = getPalette(item.color);
    return `
      <div class="guidance-card">
        <div class="badge" style="background:${palette.bg};color:${palette.text};">${item.nivel}</div>
        <div class="title">Acciones sugeridas</div>
        <ul>
          ${item.acciones.map(act => `<li>${act}</li>`).join("")}
        </ul>
      </div>
    `;
  }).join("");
}

function getPalette(color) {
  if (color === "green") return { bg: "var(--badge-green)", text: "var(--badge-green-text)" };
  if (color === "amber") return { bg: "var(--badge-amber)", text: "var(--badge-amber-text)" };
  if (color === "red") return { bg: "var(--badge-red)", text: "var(--badge-red-text)" };
  return { bg: "var(--badge-blue)", text: "var(--badge-blue-text)" };
}
