# Integración del mapa oficial CChR 2026

Inspección: 8 de octubre de 2026. Interfaz de Congreso 2.0: 2026.10.08.15.
Fuente: https://congresochilenoradiologia.cl/wp-content/uploads/2026/09/mapa_interactivo_CChR2026.html

## Resultado e implementación

Cada ficha de charla ofrece «Ver salón · mapa oficial», enlace HTTPS al documento original en una pestaña nueva, y «Abrir mapa aquí», una vista integrada opcional. La vista conserva el nombre del salón de la agenda y explica que debe seleccionarse manualmente en el mapa. También se accede desde Mapa y desde las vistas de ubicación de Mi Ruta. Los planos locales existentes siguen disponibles.

El iframe se crea únicamente al pulsar el botón: no añade la descarga del mapa a la apertura de la agenda. Usa título accesible, sandbox="allow-scripts" y referrerpolicy="no-referrer". No permite acceso al origen, navegación superior ni ventanas emergentes. El enlace externo está fuera del iframe y siempre disponible. No se infiere éxito a partir de su evento load: los fallos de contenido remoto no pueden detectarse de forma fiable desde el padre. Se avisa de conexión, tamaño y alternativa externa.

No se copió el HTML, sus imágenes, logos, coordenadas ni algoritmos a dist ni al service worker. La descarga de inspección permanece fuera del repositorio, en work. La agenda y las reglas de Mi Ruta no cambiaron. El mapa remoto no tiene garantía de disponibilidad sin conexión.

## Respuesta HTTP y aislamiento

GET público devolvió HTTP 200, Content-Type text/html, Content-Length 11275194 bytes (11,28 MB decimales), Last-Modified 25 septiembre 2026, ETag "ac0bba-65c5205e49287". No se recibieron Content-Security-Policy, X-Frame-Options ni Access-Control-Allow-Origin. No se encontró CSP en meta ni código de escape de marcos.

En la versión inspeccionada, la incrustación funciona. Esto no garantiza futuras políticas del servidor. CORS no es un requisito para navegar un iframe, pero la política de mismo origen impide a Congreso 2.0 leer o modificar su DOM. El sandbox limita adicionalmente el documento a un origen opaco. No se usa proxy ni se eluden restricciones. Si se añade CSP en nuestra app, frame-src deberá permitir exactamente https://congresochilenoradiologia.cl; no basta con configurar connect-src.

## HTML, CSS, JavaScript y datos

Documento autónomo con CSS y JavaScript inline, imágenes raster y logos embebidos mediante data URLs y dos SVG con viewBox 847×381 y 802×250. No se encontraron scripts, hojas de estilo, fuentes web ni APIs externas; la prueba de navegación no observó solicitudes adicionales de recursos de red en el documento.

- sponsors: 43 entidades, con id, nombre, categoría, logos, stands, códigos y zonas A/B. Cada stand tiene rectángulo x/y/w/h y rótulo; algunos auspiciadores tienen varias partes.
- roomHotspots: 16 áreas de planta baja; secondFloorHotspots: 4 áreas de planta alta. Los hotspots contienen id, título, rectángulo y actividades temáticas. No son conferencias con IDs de nuestra agenda.
- routeRoomAnchors: destinos y puntos de entrada a salones, piso y escalera asociada. routeOriginOptions, routeDestinationRoomIds y routeAliases forman los selectores.
- routePixels1 y routePixels2: 3510 y 658 puntos respectivamente. buildPixelGraph conecta vecinos; shortestPixel calcula caminos sobre esa red. Se simplifican polilíneas y se conectan plantas mediante escaleras definidas por el autor. El comentario del código atribuye la red a líneas rojas de planos de flujo; no se verificó físicamente esa atribución.
- No se presenta nuestra propia posición, navegación GPS, tiempo de traslado ni ruta accesible. La lógica observada utiliza escaleras; no debe interpretarse como garantía de accesibilidad.

Correspondencia nominal comprobada en el código oficial, sin importar sus coordenadas:

| Agenda | ID interno oficial | Planta |
| --- | --- | --- |
| Salón 1 · Escultura | salon-escultura (rotulado Esculturas en recorridos) | Baja |
| Salón 2 · Vitacura | salon-vitacura | Baja |
| Salón 3 · Cordillera | salon-cordillera | Baja |
| Salón 4 · Planeadores | salon-planeadores | Baja |
| Salón 6 · Manquehue | salon-manquehue | Alta |
| Salón 7 · Polo | salon-polo | Alta |
| Salón 8 · Parque | salon-parque | Alta |

## Selección desde otra aplicación

No se encontró lectura de location.search/hash, URLSearchParams, listener de message ni postMessage. Los IDs de salón son datos JavaScript internos, no una API pública ni anclas HTML de selección. No se agregan parámetros inventados al enlace. La existencia de funciones internas como showRoute no permite invocarlas a través de un iframe de otro origen.

Hoy son posibles: enlace al original, iframe, contexto del salón fuera del iframe y uso manual de sus selectores. Requieren colaboración con SOCHRADI: contrato documentado de deep links por salón/piso, postMessage con verificación de origen y mensajes ready/error/selected, catálogo estable versionado de salones y permiso para reutilizar o modificar recursos. También convendría acordar cambios de cabeceras, formato móvil, licencia, actualización y rutas accesibles verificadas.

## Rendimiento y móvil

El HTML obliga a transferir unos 11 MB antes de completar la carga; las imágenes inline no tienen caché independiente. La descarga de inspección tardó aproximadamente 36 segundos en esta conexión, no es una medición general de rendimiento móvil. No se ejecutó una auditoría Lighthouse ni una prueba de batería/memoria.

CSS responsive a 1100 y 700 px: la barra lateral pasa a apilarse, con listas desplazables. El primer plano tiene zoom de 80 a 190%; el segundo no comparte ese control. En móvil los mapas quedan más abajo, después de controles/listados; el iframe añade desplazamiento interno y rótulos pequeños. Por eso se conserva prominentemente la apertura externa. No se modifica el CSS remoto desde nuestra app.

## Verificación y autorización

En Edge/Chromium a 375×812, iframe remoto con allow-scripts: selector Cordillera, acción de recorrido y un trazado SVG generados; texto «Entrada → Salón 3, Cordillera». Ancho interno 371 px sin desbordamiento global observado. Integración local comprobada: ninguna solicitud al mapa al abrir una charla, enlace externo correcto, contexto del salón, iframe bajo acción explícita y sin overflow de la página. Sintaxis JS y validación del conjunto de datos aprobadas. Pendiente prueba física en Safari/iOS y Android y verificación independiente de recorridos en el recinto.

El acceso público y la ausencia de bloqueo de iframe no acreditan una licencia de reutilización. No se encontró una licencia explícita en el HTML inspeccionado. Esta implementación conserva el contenido en su servidor de origen, atribuye el mapa al sitio oficial y no lo redistribuye. Copiar, adaptar, alojar offline o publicar sus recursos requeriría aclarar permisos con SOCHRADI y con los titulares correspondientes. No se accedió a recursos privados ni se contactó a la organización.
