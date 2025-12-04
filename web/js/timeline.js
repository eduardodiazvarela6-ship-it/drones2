export function renderTimeline(trends) {
  const canvas = document.querySelector("#timeline-canvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width = canvas.offsetWidth * devicePixelRatio;
  const h = canvas.height = 180 * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  drawSeries(ctx, trends.pm25, "#22d3ee", w / devicePixelRatio, 50);
  drawSeries(ctx, trends.pm10, "#f59e0b", w / devicePixelRatio, 90);
  drawSeries(ctx, trends.co2.map(v => v / 20), "#a855f7", w / devicePixelRatio, 130);
  updateAxis(trends.pm25.length);
}

function drawSeries(ctx, series, color, width, offset) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const step = width / (series.length - 1);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  series.forEach((v, i) => {
    const x = i * step;
    const y = 150 - ((v - min) / range) * 100 + offset - 50;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function updateAxis(length) {
  const axis = document.querySelector("#timeline-axis");
  const now = new Date();
  const labels = [];
  for (let i = length - 1; i >= 0; i -= Math.max(1, Math.floor(length / 4))) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", timeZone: "America/Lima" }));
  }
  axis.innerHTML = labels.map(l => `<span>${l}</span>`).join("");
  const first = new Date(now.getTime() - (length - 1) * 60 * 60 * 1000);
  const rangeLabel = `${first.toLocaleString("es-PE", { hour: "2-digit", minute: "2-digit", timeZone: "America/Lima" })} - ${now.toLocaleString("es-PE", { hour: "2-digit", minute: "2-digit", timeZone: "America/Lima" })}`;
  document.querySelector("#timeline-range").textContent = `Últimas ${length}h · ${rangeLabel}`;
}
