# Revisión UX local — pendiente de aprobación para publicar

Producción permanece en la versión 8, commit `2005be2092dc03ac002aa8127cb3104f52983b16`. No se guardó ninguna versión de Sites, no se subió código y no se desplegó esta revisión.

## Checkpoint

Etiqueta Git `checkpoint-antes-ux-v8` y archivo independiente `Checkpoint_Congreso_2_0_v8.zip` en la carpeta de entregas. El ZIP incluye fuentes y código, pero no las preferencias personales de cada navegador. Extraerlo en otra carpeta permite inspeccionar o recuperar la versión anterior sin sobrescribir trabajo posterior.

## Cambios

- Ahora calcula la próxima selección personal con independencia de la siguiente franja general. Muestra elecciones simultáneas, actividad en curso, próxima elección en otro día, intervalos, ponente, sala y acceso al plano. Distingue agenda vacía, finalizada y horarios desconocidos.
- Buscar desde cualquier sección lleva al programa. La sala que se estaba explorando no limita una búsqueda: el filtro explícito de sala es independiente. El ámbito indica el día o todo el congreso. Se muestran resultados globales, filtros activos y acción de limpieza.
- Mi Ruta conserva su cálculo de conflictos y huecos, pero representa los huecos como filas, sin escala proporcional. Continúan disponibles opciones para cada intervalo, selección, Quedarme, deshacer y restablecimiento confirmado.
- Programa abre inicialmente Por horario. La preferencia se recuerda en una clave separada; al cambiar entre secciones se conservan vista, filtros, salón, bloques abiertos y posición. La tabla de escritorio se sustituye por la lista cuando la ventana pasa a móvil.
- El reloj muestra la hora real de Santiago. La consulta temporal tiene una banda explícita que permanece al cambiar de sección, con Volver al presente.
- Títulos y ponentes ya no se recortan. Las filas se ajustan al texto; el intervalo individual es visible. A 320 px se redistribuye la sala sobre el título para disponer de más anchura.
- Se añadieron historial interno, regreso desde ficha y perfiles, cierre con Escape, devolución de foco, asociación del diálogo con su título y foco visible. La selección sigue teniendo área táctil de 44 × 44 px.
- Las acciones colectivas expresan cuántas actividades abarcan. Las excepciones individuales se conservan.
- En información aparecen definiciones de los niveles, resumidas a partir de la [clasificación oficial de SOCHRADI](https://sochradi.cl/nueva-clasificacion-de-actividades-academicas-sochradi/), publicada el 4 de marzo de 2026. No se reasignaron niveles ni se infirieron requisitos de las charlas.

## Reproducción previa

En v8 se reprodujo BI-RADS: Por salón mostraba Sin resultados en este salón, mientras la lista global encontraba seis actividades. También se comprobó que volver a Programa forzaba Por salón y que el diálogo carecía de aria-labelledby. Se inspeccionaron los cálculos que limitaban la próxima elección al siguiente inicio general y la altura proporcional de los huecos.

## Validación

Entorno: Node.js y Edge/Chromium automatizado en Windows. Contextos aislados, sin modificar el almacenamiento del sitio publicado. Las capturas usan un reloj de prueba identificado en los scripts; no son capturas de producción ni pruebas con asistentes al congreso.

| Recorrido | Resultado |
|---|---|
| Agenda vacía y opciones generales | Comprobado |
| Solo elección 09:10 frente a próximo bloque 08:30 | Comprobado |
| Actividad en curso y próxima elección | Comprobado |
| Dos elecciones simultáneas, Quedarme y deshacer | Comprobado |
| Selecciones en días distintos, noche y fin del evento | Comprobado |
| BI-RADS desde otro salón y Todas las salas | Comprobado |
| Sin resultados, ámbito temporal y limpieza | Comprobado |
| Regreso a Programa con vista y scroll | Comprobado |
| Consulta de otra hora y regreso al presente | Comprobado |
| Atrás en ficha, perfil y entre secciones | Comprobado |
| Recarga con elecciones y vista preferida | Comprobado |
| Recarga sin conexión | Comprobado |
| Error de carga y reintento | Comprobado |
| 320, 390 y 1440 px | Comprobado |
| Texto al 200 %, teclado, Escape y foco | Comprobado en los recorridos automatizados e inspección visual |
| Paso de tabla de escritorio a móvil | Comprobado |
| Actualización v8 → vista previa | Comprobado: almacenamiento de ruta idéntico y caché anterior eliminada |
| Selección de bloque conservando exclusión individual | Comprobado |
| Planos y fichas de ponentes | Comprobado |
| Restablecer con confirmación y deshacer | Comprobado |

29 pruebas unitarias aprobadas. Validación de la distribución y sintaxis aprobadas. Los colores de texto revisados en encabezado, bloque, metadatos y día activo tienen contrastes calculados de 6,36:1 a 16,03:1. Es una muestra, no una certificación WCAG 2.2 AA.

Una única elección matinal produce aproximadamente 327 px de contenido de Mi Ruta en el escenario probado; el hueco de 570 minutos se presenta como una fila. La legibilidad tiene prioridad sobre una altura rígida cuando aumenta el texto.

### Ejecutar

Desde la raíz del proyecto:

```text
node scripts/serve.mjs
node --test tests/domain.test.mjs tests/timeline.test.mjs tests/experience.test.mjs tests/ux.test.mjs
node scripts/validate.mjs
```

La vista previa está en http://127.0.0.1:4173 mientras el servidor local está activo. Abrir ese origen mantiene separados sus datos de los del sitio público.

Pruebas de navegador: `node tests/ux-browser.cjs`, `node tests/ux-accessibility.cjs` y `node tests/ux-update.cjs`. Requieren Playwright y un navegador instalado. Opcionalmente configurar PLAYWRIGHT_MODULE con la ruta al módulo, BROWSER_PATH con el ejecutable y UX_OUTPUT_DIR con la carpeta de capturas. La prueba de actualización necesita el historial Git que contiene el checkpoint y utiliza el puerto local 4190.

## Compatibilidad y pendientes

- Sin migración: se conserva `congreso-2-route-v1`, esquema 1, IDs, reglas, precedencia y datos de la agenda. La preferencia visual usa `congreso-2-view-v1`, independiente de las elecciones.
- `agenda.json`, `speakers.json`, `domain.js` y `timeline.js` son idénticos a los del checkpoint. Los datos originales y sus fuentes no se editaron.
- Se detectó un problema previo: los bloques de neurorradiología pediátrica I y II del jueves en Salón 6 comparten el mismo ID. Por ello comparten ámbito de selección y pueden repetir actividades en Por salón. Se mantiene sin corregir para no alterar datos ni reasignar elecciones sin revisar el PDF y diseñar una migración. Es un pendiente independiente de esta revisión visual.
- Pendientes Safari/iPhone y Android físicos, evaluación completa de accesibilidad y validación con personas. No se afirma conformidad WCAG total ni logro de la meta de diez segundos.
- Las fotos de ponentes continúan siendo externas; el programa, ruta y planos incluidos pueden consultarse sin conexión después de cargar.
- Las elecciones del sitio publicado no aparecen automáticamente en localhost, porque son orígenes distintos. Esta separación protege la ruta real durante la revisión.

No publicar esta revisión sin una nueva instrucción del usuario.
