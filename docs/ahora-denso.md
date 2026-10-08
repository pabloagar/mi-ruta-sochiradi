# Ahora y Programa compactos

Actualización visual: encabezado de 56 px, lupa para filtros, Ahora y A continuación en contenedores con filas de 60 px. Los horarios consultables se obtienen de los inicios publicados; no hay entrada libre de hora. Los bloques se determinan por el próximo inicio real, aunque solo empiece una sala a esa hora. Si las actividades en curso tienen intervalos distintos, la cabecera indica la hora consultada; cada ficha conserva su intervalo exacto.

Pausas equivalentes se reúnen visualmente. Al tocarlas se mantienen disponibles los registros originales y sus selecciones independientes. La franja gris mide 32 px dentro de un área táctil de 44 px. Los títulos se limitan a dos líneas y se leen completos en su ficha. Los nombres largos y módulos usan elipsis. Los perfiles de ponentes siguen accesibles desde la ficha.

Los datos, los niveles, domain.js, timeline.js y el contenido de la ficha de charla permanecen intactos. Las correcciones previas de nombres pegados a títulos ya están incluidas en la agenda auditada.

## Verificación

- 23 pruebas de dominio, horarios y datos aprobadas; validación de 387 actividades, 67 bloques y 412 filas del PDF.
- Edge/Chromium automatizado: 375 × 812, siete charlas completas visibles en Ahora a las 09:30 del jueves. El siguiente inicio real es 09:40, no 09:50 en todas las salas.
- Sin desbordamiento de página en Ahora, Programa y Mi Ruta a 320, 375, 390, 430, 767, 768 y 1024 px. Aviso de actualización comprobado a 375 px.
- Selector de día y bloques publicados, búsqueda, apertura de ficha, banner personal, noche con siguiente jornada, persistencia y recarga offline comprobados.
- Actualización real de caché v3 a v4, mediante el botón de actualización: selecciones guardadas idénticas y funcionamiento offline posterior.
- No se ha probado esta revisión en Safari o dispositivos físicos. La emulación no sustituye esas pruebas.

## Ejecutar

Desde la raíz: `node scripts/serve.mjs`. Abrir la dirección local indicada. Requiere Node.js. Validación: `node scripts/validate.mjs`. Pruebas: `node --test tests/domain.test.mjs tests/timeline.test.mjs tests/experience.test.mjs`.

La carpeta dist contiene la app completa desplegable por HTTPS; el resto incluye código auxiliar, fuentes, auditoría e instrucciones de desarrollo.
