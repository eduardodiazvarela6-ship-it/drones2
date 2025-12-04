export function renderLeaderboard(data) {
  const container = document.querySelector(".leaderboard");
  container.innerHTML = data.map(group => `
    <div class="board-card">
      <h4>${group.titulo}</h4>
      <ul>
        ${group.items.map(item => `<li><span>${item.nombre}</span><strong>${item.aqi}</strong></li>`).join("")}
      </ul>
    </div>
  `).join("");
}
