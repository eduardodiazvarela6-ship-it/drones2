# Perú AirWatch – Lima/Callao

Dashboard estático inspirado en WAQI para monitoreo de calidad de aire centrado en Lima y Callao, con referencias nacionales en 10 departamentos. Incluye mapa Leaflet, filtros por riesgo/territorio, KPIs, rankings, alertas, noticias, reloj local y guía rápida de salud.

## Requisitos
- Node.js 18+
- Acceso local a navegador (sirve como sitio estático)

## Uso rápido
```bash
npm install
npm run start # sirve la carpeta web
```
Visita `http://localhost:3000` (o el puerto que indique `serve`).

## Estructura
- `web/index.html`: layout principal estilo WAQI.
- `web/css/`: estilos modulares (base, layout, mapa, tarjetas, drawer, rankings, timeline, alertas, pie).
- `web/js/`: módulos ES para mapa, filtros, drawer, KPIs, rankings, timeline (canvas), alertas, búsqueda, cobertura nacional, guía de salud y carga de datos.
- `web/data/air_quality.json`: 25+ estaciones priorizadas en Lima/Callao y 10 departamentos.
- `web/data/*.json`: departamentos, alertas, noticias, tendencias horarias, rankings y guía de salud.

## Notas de diseño
- Los datos son estáticos pero el reloj, la última actualización y los sellos horarios se generan con zona horaria Lima.
- El mapa usa OpenStreetMap + Leaflet y centra en Lima con opción de geolocalización del usuario.
- El drawer muestra panel detallado por estación con contaminantes criterio y metereología.
- Inspiración visual WAQI: esquema oscuro, chips de filtros, leyenda AQI y rankings laterales.
