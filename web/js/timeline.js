export function renderTimeline(trends) {
  const canvas = document.querySelector("#timeline-canvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width = canvas.offsetWidth * devicePixelRatio;
  const h = canvas.height = 180 * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  drawSeries(ctx, trends.pm25, "#22d3ee", w / devicePixelRatio, 50);
  drawSeries(ctx, trends.pm10, "#f59e0b", w / devicePixelRatio, 90);
  drawSeries(ctx, trends.co2.map(v => v / 20), "#a855f7", w / devicePixelRatio, 130);
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
