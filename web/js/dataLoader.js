export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
  return res.json();
}

export async function loadData() {
  const [stations, departments, alerts, news, trends, leaderboard] = await Promise.all([
    loadJSON("./data/air_quality.json"),
    loadJSON("./data/departments.json"),
    loadJSON("./data/alerts.json"),
    loadJSON("./data/news.json"),
    loadJSON("./data/trends.json"),
    loadJSON("./data/leaderboard.json")
  ]);
  return { stations, departments, alerts, news, trends, leaderboard };
}
