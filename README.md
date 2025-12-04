# EcoDrones Lima

Dashboard estático para visualizar zonas de riesgo de calidad de aire monitoreadas por drones en Lima Metropolitana.

## Estructura
- `web/index.html`: interfaz con mapa Leaflet, filtros por distrito/buscador y tarjetas de zonas.
- `web/data/zonas.json`: catálogo editable de zonas con coordenadas, contaminantes, fuentes y recomendaciones.
- `web/data/nodered_flow.json`: flujo exportado desde Node-RED del dashboard original.

## Uso rápido
1. Instala dependencias mínimas y sirve la carpeta `web` (requiere Node 18+):
   ```bash
   npm install
   npm start
   ```
   Abre `http://localhost:3000` (o el puerto que indique `serve`).

2. Edita `web/data/zonas.json` para añadir todos los distritos de Lima y sus zonas locales. Cada entrada puede incluir imágenes y estados de riesgo.

3. Comparte la carpeta `web` en cualquier hosting estático (S3, Netlify, Vercel) para que clientes accedan desde móvil o PC.

## Integrar con Node-RED
- Importa `web/data/nodered_flow.json` en tu instancia de Node-RED para seguir generando datos desde el dron.
- Ajusta tu flujo para publicar los valores en una API o archivo JSON consumido por este dashboard.

## Personalización
- El diseño usa solo HTML/CSS/JS + Leaflet CDN. Puedes reemplazar el `fetch` de `zonas.json` por una URL de API real.
- Los estados admitidos en las etiquetas son: `BUENO`, `MODERADO`, `ALTO`, `PELIGRO`, `CRITICO`.
