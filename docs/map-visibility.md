# Revisión de visibilidad del mapa — 2026.10.08.24

Comprobado antes de editar: el plano comenzaba a 285 px en ventana 375×812 sin sugerencias; ya no existía el atajo duplicado, los salones estaban ordenados 1,2,3,4,6,7,8 y los stands tenían marcador sin origen. Se conserva ese comportamiento.

Correcciones: planta del destino primero (ambas permanecen visibles), aviso «Destino marcado en planta alta/baja», separación y controles más compactos conservando toque de 44 px, etiqueta Escultura consistente y aviso de recorrido no disponible dirigido al visitante. El plano completo elimina el límite interno de altura; en escritorio no se recorta el plano por max-height. Se eliminó la transición de ancho que dejaba un recorte temporal al restablecer el zoom.

Pruebas: tests/map-visibility.cjs y tests/map-places.cjs, Edge automatizado: planta destino primero y antes de 400 px, ausencia de atajo duplicado, orden/nombre, marcador stand sin origen, aviso sin recorrido, planos completos sin desbordamiento interno a 375 y 1440 px, cuatro baños, selectores y persistencia. No es prueba física de teléfono ni confirmación presencial de conexiones del recinto.
