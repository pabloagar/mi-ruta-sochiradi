# Mapa adaptado y cuarta pestaña — 8 de octubre de 2026

Esta actualización sustituye la modalidad principal descrita en official-map-integration.md: el usuario solicitó expresamente copiar, mejorar y optimizar el HTML público. La adaptación local se identifica como no oficial y conserva el enlace al original. Esta solicitud no se presenta como una licencia otorgada por SOCHRADI. No se accedió a contenido privado.

## Cambios

- Navegación inferior: Ahora, Programa, Mi Ruta y Mapa. Se retira el acceso duplicado de la cabecera.
- «Ver salón» abre Mapa con el ID de salón previamente comprobado en la fuente; destaca su rectángulo original. No inventa puntos ni trayectos.
- Origen y destino primero; plantas Baja/Alta/Ambas; zoom compartido por ambos planos hasta 300%; auspiciadores plegados.
- Se conserva el algoritmo y la geometría original. El usuario pulsa Mostrar recorrido después de elegir el origen: Entrada no representa su posición real.
- Altura automática del iframe local permite desplazar la página normalmente. El mapa no se reconstruye por el reloj ni al volver al primer plano. Estado de origen/destino/planta/zoom/recorrido guardado en sessionStorage para volver a la misma pestaña. El sistema operativo puede suspender JavaScript cuando el teléfono se bloquea: no se promete ejecución en segundo plano.
- Se conservan planos del PDF como alternativa y un enlace al mapa original.

## Optimización verificable

Fuente HTML: 11.275.194 bytes. Adaptación inicial: aproximadamente 110 KB más CSS/JS pequeños. Se extrajeron 94 imágenes inline a 50 archivos únicos sin recompresión ni pérdida de detalle. Todos los archivos de imagen suman 4.872.442 bytes; los dos planos principales pesan 46.480 y 43.394 bytes. Los logos aparecen bajo demanda en las fichas/avisos de auspiciadores. No se descargan todos al abrir la pestaña.

Los recursos de venue se almacenan bajo demanda mediante el service worker. Sin conexión se dispone solo de lo cargado previamente; los logos aún no consultados pueden faltar. La instalación de la agenda no descarga preventivamente todo el mapa. No se cachea contenido privado.

Datos de procedencia y SHA-256 en map-source.json. Los rectángulos, redes de circulación, anclas, escalera y correspondencias nominales provienen del documento inspeccionado. No se afirma que los recorridos estén comprobados físicamente ni que sean accesibles sin escaleras.

## Verificación

31 pruebas unitarias aprobadas. Validación de agenda y sintaxis aprobadas. Prueba map-tab.cjs: cuarta pestaña, recorrido Cordillera, cambio de planta, conservación al cambiar de pestaña, destino desde ficha y ausencia de desbordamiento a 375 px. Pruebas de teclado/foco, texto 200% a 320 px y jerarquía de selecciones aprobadas tras ajustar el reflujo de los botones. Actualización PWA desde checkpoint, conservación de ruta y recarga offline aprobadas. Pendiente comprobación física en Safari/iOS y Android.
