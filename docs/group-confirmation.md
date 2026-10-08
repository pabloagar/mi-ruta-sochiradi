# Confirmación al agregar módulos — 2026.10.08.21

La acción principal ahora dice «Agregar a Mi Ruta» (o «Listo» si las actividades ya están guardadas). El diálogo muestra el horario publicado del módulo, una lista inicial de tres actividades y «Ver más». Se eliminó el mensaje innecesario cuando no hay exclusiones; cuando las hay, se explica que seguirán fuera de Mi Ruta.

Al guardar correctamente se cierra el diálogo y aparece una confirmación temporal con nombre y horario, con Deshacer. Los nuevos conflictos se informan junto con la confirmación. Si el almacenamiento falla, permanece el diálogo y se muestra el error sin afirmar que se guardó.

Verificado con tests/group-confirmation.cjs en Edge automatizado a 375 px: guardado y cierre, módulo ya guardado, exclusiones individuales, conflictos, persistencia al recargar y fallo simulado de almacenamiento. No equivale a una prueba en teléfono real. Agenda y reglas jerárquicas conservadas.
