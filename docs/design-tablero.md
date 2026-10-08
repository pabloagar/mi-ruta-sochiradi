# Adaptación de la dirección Tablero

Referencia: ZIP «Congreso 2.0 Mobile App.zip» aportado por el usuario. Se revisaron las siete capturas: Ahora, Programa por horario, Programa por salón, Mi ruta, detalle, plano y opciones de tiempo libre. Su README se trató como documentación de diseño; no se ejecutó el prototipo ni su lógica.

## Implementado

- Paleta verde #0B6B46, verde oscuro #084F34 y naranja #E8742A, tomada de la referencia. No se certifican estos HEX como oficiales del congreso.
- Barlow y Barlow Semi Condensed, extraídas de los recursos de fuentes del propio prototipo y servidas localmente. Sin dependencias de Google Fonts en tiempo de ejecución.
- Cabecera compacta con hora de Chile, tablero de actividades actuales y siguientes, numerales de sala, progreso y resumen de ruta. No se dibuja una falsa barra de estado del teléfono.
- Programa por horario con ejes fijos, selección de salas/bloques y celdas atenuadas por filtros. La tabla tiene desplazamiento propio; la página no se desborda. La vista por salón evita el desplazamiento horizontal de la tabla.
- Sala activa y barras verticales con selección completa/parcial; selección individual, exclusión y herencia con las reglas originales conservadas.
- Mi Ruta por día, conflictos, cambios de salón, intervalos libres y opciones que caben íntegramente en cada intervalo. Los tiempos libres se calculan sobre la unión de intervalos ocupados. No se aseguran huecos si hay una selección sin horario.
- «Quedarme» excluye únicamente selecciones que realmente se superponen con esa actividad. Se puede deshacer. Los grupos de conflictos conectados no se interpretan como si todos sus pares chocaran.
- Panel inferior con detalles, niveles, alternativas simultáneas y los planos originales de las páginas 5 y 6 del PDF. Planos y fuentes también disponibles offline.
- Actualización de caché v1 a v2 con conservación de preferencias.

## Decisiones respecto del prototipo

- Se conservan las 387 actividades auditadas, sus IDs y las 7 identidades de sala reales. Cada día muestra solo las salas que tienen programa ese día. No se importaron las 60 charlas ficticias ni sus alias.
- No se copió el plano inventado, el supuesto «estás aquí» ni los minutos de traslado. La ubicación real del usuario no se conoce.
- No se copió la regla del prototipo que borra exclusiones al completar un grupo. La regla acordada conserva decisiones específicas; restablecerlas sigue siendo una acción explícita.
- Los horarios reales no comparten franjas de igual duración. La grilla usa todos los límites documentados y amplía una sala en carriles cuando la fuente contiene actividades solapadas en ella, sin esconder registros.
- La ruta mantiene proporción temporal en intervalos amplios, pero amplía los breves para garantizar legibilidad; la interfaz lo señala. Los conflictos se apilan en móvil. La altura no representa una escala estrictamente uniforme.
- Controles de al menos 44 px y tipografía mayor que varias etiquetas del prototipo. Los niveles circulares tienen nombres accesibles y texto explicativo en el detalle.
- Búsqueda de tema/ponente y filtros por sala y nivel funcionan con los datos existentes. No se inventaron categorías de especialidad para mostrar chips sin respaldo.

## Opinión de diseño

El tablero y los numerales facilitan comparar salas rápidamente; la franja de ruta y los paneles inferiores mantienen el contexto. La grilla resulta útil como comparación y funciona mejor acompañada de la alternativa por salón. Los tamaños mínimos del prototipo y una línea temporal rígida necesitan adaptación a títulos largos, duraciones irregulares y uso con una mano. La jerarquía visual se conserva sin sacrificar esos casos.
