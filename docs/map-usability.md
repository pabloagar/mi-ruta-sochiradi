# Usabilidad del mapa — 2026.10.08.22

- Selector principal: siete salones y servicios; accesos rápidos a Baños, Acreditación, Entrada y próxima charla cuando existe un único salón siguiente. Los stands conservan buscador y disponen de «Cómo llegar a este stand» en su ficha. Módulos se consultan desde la agenda.
- Origen sugerido editable a partir de una actividad guardada en curso; si no hay ninguna, última actividad terminada en el mismo día y dentro de los últimos 90 minutos. No se elige arbitrariamente entre salones simultáneos. Pausas y actividades auxiliares no se usan para inferir origen. El horario explorado se identifica en la sugerencia. Una selección manual de origen tiene prioridad. No se usa GPS.
- Planta visible junto a los salones de Ahora, Programa, Mi Ruta y ficha, usando correspondencia explícita de los anclajes oficiales (1–4 baja; 6–8 alta).
- Se conserva ambas plantas y se encuadra el recorrido o destino con zoom automático limitado y controles manuales. Instrucciones compactas sin repetir origen y destino. La referencia izquierda/derecha se refiere expresamente al dibujo, no a la orientación de la persona.
- Parque → Manquehue y Parque → Terraza Manquehue muestran «No hay un recorrido disponible». No se activa el desvío entre alas bajando y subiendo, hasta confirmar con personal/SOCHRADI que sea una conexión real permitida.
- Baños etiquetados por planta, destacando los de la planta del origen elegido. Se muestran ubicaciones, no se promete ruta a baños ni el baño físicamente más cercano.
- Entrada reutiliza exactamente las coordenadas del origen oficial.

Validación: tests/map-context.test.mjs (origen actual/reciente, ambigüedad, día anterior y plantas), tests/map-usability.cjs (accesos, casos sin recorrido, baño por planta, ambas plantas, origen manual y anchos 320/375/441), tests/map-agenda.cjs (charla→mapa, origen sugerido, plantas, recorrido entre plantas y persistencia). Edge automatizado, no teléfono físico. Validación de agenda: 387 actividades y 412 filas PDF, sin cambios de datos. Pendiente: revisión presencial de conexiones del recinto.
