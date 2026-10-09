# Cloudflare Web Analytics — 2026.10.09.26

Se incorpora una sola vez en dist/index.html el snippet de Web Analytics proporcionado por el propietario el 9 de octubre de 2026. Se conserva type="module" y el token de sitio recibido. El token de beacon es un identificador público incluido en el HTML, no una credencial de API.

No se incorpora al iframe del mapa para evitar contar su carga como otra página de la app. No se envían reglas, exclusiones ni contenido de Mi Ruta mediante código propio; no se añaden eventos personalizados. El script externo no forma parte de la caché offline. Se incrementa la versión del service worker para actualizar el HTML cacheado.

Comprobación: una sola inclusión del snippet, validación de agenda. La recepción de métricas debe confirmarse en el panel Web Analytics; disponer del script publicado no demuestra que ya haya recibido visitas.
