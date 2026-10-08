# Integración Clara + Recorrido — 2026.10.08.17

Referencia: ZIP «Diseño mejorado de Mi Ruta.zip», propuestas A (Clara) y B (Recorrido). Elección del usuario: organización y funciones de Clara con colores de Recorrido. Se adaptó el diseño a los componentes existentes; no se incorporó support.js, React/Babel del prototipo ni su agenda parcial. Se conserva Barlow local, cabecera verde, naranja de acción, tarjetas claras, navegación inferior con iconos y controles accesibles.

Antes de editar se guardó outputs/Checkpoint_antes_diseno_Clara_Recorrido.zip. La distribución sigue siendo HTML/CSS/JS sin nuevas dependencias de ejecución.

## Problemas revisados y corregidos

La implementación anterior conservaba mapRoom de la charla en una banda externa mientras el iframe cambiaba de destino. Ahora el selector del mapa es la única fuente del destino activo; informa cambios al contenedor validando origen y ventana. Se retiró la banda duplicada y las visitas posteriores conservan el salón cambiado. Cambiar destino u origen elimina la ruta anterior antes de mostrar otra.

En las fichas queda una sola acción principal «Ver salón». Planos estáticos y fuente se agrupan bajo opciones secundarias. El mapa abre con el salón y planta indicados, sin confundir ubicación actual con Entrada. «Cómo llegar» revela el origen editable; un recorrido exige escoger origen. Se conserva la elección durante la sesión. El plano gana espacio y hay indicación de planta visible, destino en otra planta y acceso al otro tramo. Se muestra una planta por vez inicialmente; Ambas sigue disponible. Zoom conserva el centro; controles de al menos 44 px. Las redes, anclas y coordenadas no cambian.

Las alternativas de una ficha abierta desde Ahora o exploración se clasifican respecto del reloj real/consultado, con En curso, Próxima, Terminó u horario no informado. Las terminadas quedan al final, sin borrarlas ni modificar los conflictos. En Programa se conserva la vista de planificación por solapamiento.

«Después, en este salón» muestra las siguientes actividades del mismo día/sala con inicio a partir del final verificado, incluyendo pausas y empates. Horarios ausentes se señalan y no se inventa la siguiente actividad. Mapa ofrece accesos discretos a actividades personales actuales/siguientes cuando se abre sin salón específico.

## Conservación

Se mantienen las 387 actividades, selección actividad > bloque > sala, exclusiones, Coffee Break seleccionable, almacenamiento local, conflictos y deshacer existentes. No se importa la selección de ejemplo ni la hora simulada del prototipo. No se implementan sugerencias opcionales del ZIP que cambiarían estas reglas (por ejemplo impedir seleccionar pausas). No hay GPS, tiempos de traslado ni rutas nuevas.

## Validación ejecutada

- 31 pruebas unitarias existentes y 2 nuevas sobre estados temporales y siguiente actividad; todas aprobadas.
- Recorrido reproducido Manquehue → tocar Parque: selector, marcador y resumen coinciden; no persiste la banda de Manquehue.
- Trayectos dentro de planta y entre plantas; cambio de origen/destino limpia trayecto previo; origen inicialmente vacío; regreso con Atrás a la ficha original.
- Ventanas de 320, 375, 441 y 768 px; ausencia de desbordamiento global. Capturas de Ahora, Programa, Mi Ruta y Mapa a 375 px.
- Reloj simulado 09:27 y exploración 09:10: alternativas terminadas/en curso usan el contexto correcto.
- Selección de bloque, exclusión individual y recarga conservan exactamente el almacenamiento de Mi Ruta.
- Suites UX, accesibilidad y auditoría aprobadas: teclado/foco/Escape, texto 200%, búsquedas, conflictos/deshacer, fechas y carga fallida.
- Actualización service worker desde checkpoint y recarga sin conexión conservan ruta; caché anterior se retira.
- Validación de agenda y sintaxis aprobadas.

Las pruebas se hicieron en Edge/Chromium con tamaños de ventana y reloj controlados. No sustituyen una prueba en un teléfono físico iPhone/Android ni una validación de las rutas en el recinto.
