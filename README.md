# EcoDrones Lima & Callao

Panel estilo WAQI para monitorear calidad de aire simulada en Lima, Callao y cobertura nacional de referencia.

## Características
- **Mapa interactivo Leaflet** con marcadores por estación y leyenda de colores AQI.
- **25+ estaciones** en distritos de Lima/Callao y provincias cercanas con PM2.5, PM10, NO₂, SO₂, O₃ y CO.
- **Filtro y búsqueda** por distrito/zona con tarjetas sincronizadas con el mapa y panel lateral.
- **KPIs rápidos** (promedios PM, pico AQI y conteo de estaciones).
- **Drawer de detalle** con ubicación, fuentes de emisión y recomendaciones instantáneas.
- **Cobertura nacional**: 10 departamentos resumidos como referencia para expansión.
- **Fecha/hora dinámica local** (es-PE) en la cabecera.

## Ejecutar localmente
```bash
npm install
npm start
```
Luego abre `http://localhost:3000` (por defecto `serve` usa ese puerto) y verás el dashboard en `web/`.

## Estructura
- `web/index.html`: SPA estática con Leaflet y estilos.
- `web/data/air_quality.json`: dataset simulados de estaciones y departamentos.
- `package.json`: script para servir la carpeta `web`.

## Notas
- Los valores son simulados con rangos realistas inspirados en perfiles urbanos/industriales de Lima y Callao.
- Se pensó para usarse offline/edge; basta un servidor estático para desplegar (GitHub Pages, Vercel, Nginx).
