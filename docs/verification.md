# Verificación de la primera versión

- 13 pruebas automatizadas de dominio aprobadas: jerarquía y excepciones, alcance por día, idempotencia, selección parcial, conflictos, intervalos contiguos y desconocidos, zona America/Santiago con cliente en Tokio, búsqueda con tildes, migración, corrupción y esquema futuro, cambios de agenda y trazabilidad.
- Datos: 387 actividades únicas, 67 bloques, 7 salas; 412 filas horarias reconciliadas. SHA-256 de las fuentes y detalle en data-audit.md. Revisión textual/posicional de todas las páginas y revisión visual de planos, leyenda y anomalías; no se afirma una segunda transcripción visual independiente de cada página.
- Flujo real en Edge Chromium headless de Windows con viewport móvil y zona Asia/Tokyo: elegir sala, excluir actividad, conservar exclusión al reelegir sala, filtros sin recortar ámbito, elegir otra sala, ver conflictos, recargar, explorar otra hora, cargar sin conexión y conservar ruta. Sin errores JavaScript observados.
- Anchos 320, 375, 390, 430 y 1024 px, más zoom de texto 200%: sin desbordamiento horizontal. Revisión visual de captura móvil.
- Datos locales corruptos se conservan; la app avisa y permite uso sin sobrescribirlos.
- Comprobación de sintaxis y validación de archivos/datos mediante los comandos del README.

## Límites y comprobaciones pendientes

- No se ha probado en Safari/iPhone ni Chrome/Android físicos. Edge comparte Chromium, pero no equivale a una ejecución real de Chrome móvil.
- Instalación desde el navegador y ciclo de actualización de una versión publicada deben comprobarse en dispositivos reales. Las pruebas offline se ejecutaron en el servidor local, no en el origen HTTPS autenticado.
- No se realizó auditoría completa con lector de pantalla. La app usa controles nativos, foco visible, etiquetas y diálogo, pero no se certifica conformidad WCAG.
- WebMCP está disponible solo cuando el navegador expone la API nativa; no estaba disponible en el entorno probado y no se simuló su presencia.
- Este proyecto usa JavaScript; hay comprobación de sintaxis, no un análisis de tipos TypeScript ni un linter instalado.
