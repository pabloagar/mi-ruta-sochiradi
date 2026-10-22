# Verificación de la primera versión

- 18 pruebas automatizadas de dominio aprobadas: jerarquía y excepciones, alcance por día, idempotencia, selección parcial, conflictos, intervalos contiguos y desconocidos, zona America/Santiago con cliente en Tokio, búsqueda con tildes, migración, corrupción y esquema futuro, cambios de agenda y trazabilidad.
- Datos: 387 actividades únicas, 67 bloques, 7 salas; 412 filas horarias reconciliadas. SHA-256 de las fuentes y detalle en data-audit.md. Revisión textual/posicional de todas las páginas y revisión visual de planos, leyenda y anomalías; no se afirma una segunda transcripción visual independiente de cada página.
- Flujo real en Edge Chromium headless de Windows con viewport móvil y zona Asia/Tokyo: elegir sala, excluir actividad, conservar exclusión al reelegir sala, filtros sin recortar ámbito, elegir otra sala, ver conflictos, recargar, explorar otra hora, cargar sin conexión y conservar ruta. Sin errores JavaScript observados.
- Anchos 320, 375, 390, 430 y 1024 px, más zoom de texto 200%: sin desbordamiento horizontal. Revisión visual de captura móvil.
- Datos locales corruptos se conservan; la app avisa y permite uso sin sobrescribirlos.
- Comprobación de sintaxis y validación de archivos/datos mediante los comandos del README.

## Límites y comprobaciones pendientes

- No se ha probado en Safari/iPhone ni Chrome/Android físicos. Edge comparte Chromium, pero no equivale a una ejecución real de Chrome móvil.
- Instalación desde el navegador y actualización desde el origen publicado deben comprobarse en dispositivos reales. Las pruebas offline se ejecutaron en el servidor local, no en el origen HTTPS autenticado.
- No se realizó auditoría completa con lector de pantalla. La app usa controles nativos, foco visible, etiquetas y diálogo, pero no se certifica conformidad WCAG.
- WebMCP está disponible solo cuando el navegador expone la API nativa; no estaba disponible en el entorno probado y no se simuló su presencia.
- Este proyecto usa JavaScript; hay comprobación de sintaxis, no un análisis de tipos TypeScript ni un linter instalado.

## Rediseño Tablero

- Se comprobaron tablero, grilla, salón, ruta, detalle/plano y opciones de huecos con los datos reales. Se revisaron capturas de las vistas principales.
- Cinco anchos (320, 375, 390, 430, 1024) y zoom de texto 200% en las tres pestañas, sin desbordamiento de página; la grilla conserva su desplazamiento interno.
- Selecciones de sala, exclusión individual, reelección sin borrar excepciones, Quedarme y Deshacer, planos y ruta disponibles tras recarga offline; ningún error JavaScript observado en Edge Chromium.
- Se probó un ciclo real de service worker desde el código v1 al nuevo Tablero en un origen local estable: aviso de actualización, activación voluntaria, ruta conservada, caché vieja eliminada y recarga offline correcta.
- Pruebas nuevas: unión de intervalos, opciones que caben en un hueco, ausencia de promesas de tiempo libre con horarios desconocidos, exclusión solo de solapamientos directos y grilla de duraciones variables.



## Preview aislada de Cloudflare — 22 de octubre de 2026

- Build de preview `84512c52-25b0-4512-8d8b-326a0e90577e` aprobado para el commit `88179f9`, mediante Wrangler 4.152.0.
- URL comprobada en Chrome de escritorio: https://docs-portfolio-refresh-2026-10-mi-ruta-sochiradi.pablo-aguirre-araya.workers.dev/
- El programa carga. Se agregaron las cuatro actividades del módulo Hands-On, se comprobó que Mi Ruta conserva las cuatro al recargar y se retiró la selección de prueba por los controles normales.
- La sección Mapa abre su contenedor; esta comprobación no certifica toda la interacción del mapa ni repite una validación clínica o de datos del congreso.
- El validador local confirmó 387 actividades, 67 bloques y 412 filas de fuente vinculadas. Las 33 pruebas y siete comprobaciones de sintaxis ya estaban aprobadas; no se cambió el código funcional.
- La rama `main` conserva `fc88ac11a43d698343fcbfa6fa58347317742723`. Las huellas SHA-256 del HTML, app.js, agenda.json, styles.css y sw.js publicados en producción coinciden antes y después.
- Se mantuvo el comando de producción y la fecha de compatibilidad 2026-10-09. La configuración Wrangler autodetectable existe solo en esta rama de revisión, sin fusionar a main. Ver [configuración de previews](preview-configuration.md).
- No se realizaron pruebas en teléfonos físicos ni una prueba offline del origen de preview durante esta comprobación.

## Actualización compacta

23 pruebas de dominio aprobadas. Prueba de navegador en Edge Chromium con viewport móvil y zona Asia/Tokyo: primera actividad comienza antes de 300 px (aprox. 220 px a 375 de ancho), lista por hora, ausencia de guiones de nivel, Pausa café, aviso inmediato al crear conflicto, perfil de Taouli con foto pública y sus ocho actividades (incluidas sesiones compartidas), Salón 4 viernes/sábado, Lo próximo a las 22:28, final de congreso, En curso y minutos restantes. Tres pestañas comprobadas a 320/375/390/430/1024 px y con texto 200%, sin desbordamiento de página. Ruta conservada tras recarga offline. Safari/iPhone real sigue pendiente.

Fuente de perfiles: página de conferencistas enlazada por congresochilenoradiologia.cl/programa/, consultada 8 de octubre; 218 perfiles públicos, correspondencia exacta de nombre normalizado, sin importar horarios de Conf.app ni reemplazar el PDF. Descripciones como extractos de hasta 24 palabras, enlace a ficha completa; no se inventan bios ausentes.
