# Mapa automático — versión 2026.10.08.18

Solicitud: salones primero, recorrido automático al elegir Desde/Hasta, ambas plantas siempre visibles e instrucciones compactas.

- Destinos ordenados: Salones (numéricamente), Servicios y áreas de apoyo, Módulos, Actividades, Simposios, Stands. Se conservan todas las opciones e IDs originales.
- Desde y Hasta siempre visibles en una fila. No existe botón Mostrar recorrido en la interfaz. Se recalcula con cada cambio o toque de salón cuando ambos puntos son válidos. No se supone un origen si falta.
- Ambas plantas permanecen visibles, sin selector que oculte una. Controles de zoom compartidos y desplazamiento vertical normal.
- Guía de una indicación para la misma planta; tres para cambiar de planta: llegar a la escalera, subir/bajar, llegar al destino. Izquierda/derecha se deriva de las mismas anclas usadas por el algoritmo existente. No se inventan distancias ni tiempos. Las opciones especiales sin destino único no reciben instrucciones ficticias.
- Quitar recorrido borra el origen y los trazados, conserva el destino. Se restaura la selección durante la sesión.
- Se corrigió la lectura de destinos de tipo alias en el adaptador; ahora usa el discriminador real `alias` del mapa original.

Pruebas aprobadas: orden de grupos, selección de destino sin origen, cálculo al modificar cualquiera de los dos selectores, planta baja → alta por escalera izquierda, alta → baja por derecha, misma planta, ambas plantas visibles, borrar/restaurar, tamaños 320/375/441, navegación de vuelta a la ficha, persistencia de Mi Ruta y actualización PWA/offline. Captura revisada a 375 px. Las pruebas de navegador no equivalen a probar teléfonos físicos ni validar recorridos en terreno.
