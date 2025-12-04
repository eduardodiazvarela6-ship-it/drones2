export function renderTimeline(trends) {
  const canvas = document.querySelector("#timeline-canvas");
  if (!canvas || !trends) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.offsetWidth || 320;

  // Tamaño del canvas en píxeles reales
  canvas.width = cssWidth * dpr;
  canvas.height = 180 * dpr;

  // Escalar contexto para alta resolución
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, 180);

  // Dibujar series (colores compatibles con tu diseño)
  drawSeries(ctx, trends.pm25, "#22d3ee", cssWidth, 50);   // PM2.5
  drawSeries(ctx, trends.pm10, "#f59e0b", cssWidth, 90);   // PM10
  drawSeries(
    ctx,
    trends.co2.map((v) => v / 20),
    "#a855f7",
    cssWidth,
    130
  ); // CO₂ reescalado
}

function drawSeries(ctx, series, color, width, offset) {
  if (!Array.isArray(series) || series.length < 2) return;

  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const step = width / (series.length - 1);

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  series.forEach((v, i) => {
    const x = i * step;
    const y = 150 - ((v - min) / range) * 100 + offset - 50; // 150 base, 100 de alto útil

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
