# Seguimiento de auditoría — 8 de octubre de 2026

Informe revisado: Informe_auditoria_Mi_ruta_Sochiradi_2026-10-08 (2).docx.
Versión de interfaz: 2026.10.08.13. Datos conservados sin cambios.

## Correcciones

- Información y Mapa: título y cierre oscuros sobre fondo claro, área del cierre de 44 px y retorno del foco al botón de origen.
- Mi Ruta: el miércoles 7 aparece únicamente cuando existen selecciones guardadas ese día. Programa sigue comenzando el jueves 8. El resumen distingue las selecciones del día del total guardado.
- Siguiente: avanza desde la hora consultada, incluyendo pulsaciones consecutivas. Entrar en Mi Ruta desde una consulta abre la fecha consultada.
- Selección de bloque/salón: acción principal sencilla, cantidad de actividades nuevas, lista desplegable del contenido y aviso explícito de almuerzo/pausas incluidos. Se conservan exclusiones individuales; las opciones avanzadas quedan plegadas.
- Información muestra una versión de interfaz independiente de la versión de los datos.

## Verificación

31 pruebas unitarias aprobadas. Validación de 387 actividades y 412 filas fuente vinculadas aprobada. Pruebas de navegador de auditoría, recorridos UX, accesibilidad y actualización del service worker aprobadas en Edge/Chromium. Se verificaron cierres y foco en 388, 485 y 1165 px, navegación por fechas, avance de bloques, selecciones, conflictos, persistencia y recarga sin conexión. Capturas tomadas con la animación de apertura finalizada.

No se realizó una nueva auditoría manual de todas las conferencias ni pruebas en dispositivos físicos Safari/iOS o Android. Estos resultados no constituyen una certificación integral de accesibilidad.
