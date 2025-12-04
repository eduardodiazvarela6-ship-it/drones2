export function renderNews(news) {
  const container = document.querySelector(".news");
  container.innerHTML = news.map(item => `
    <div class="board-card">
      <div class="card-header">
        <div>
          <div class="card-title">${item.titulo}</div>
          <div class="card-subtitle">${item.fecha} • ${item.fuente}</div>
        </div>
        <span class="tag">Nacional</span>
      </div>
      <div class="text-muted" style="line-height:1.5;">${item.descripcion}</div>
    </div>
  `).join("");
}
