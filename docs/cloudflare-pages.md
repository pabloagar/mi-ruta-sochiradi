# Desplegar Mi ruta Sochiradi en Cloudflare Pages

El proyecto es HTML, CSS y JavaScript estático, sin backend ni claves de API.

## Conectar GitHub

1. En Cloudflare, entra a Workers & Pages y crea un proyecto de **Pages** conectado a GitHub.
2. Autoriza acceso al repositorio privado `pabloagar/mi-ruta-sochiradi` y selecciónalo.
3. Configura:
   - Rama de producción: `main`.
   - Framework: `None`.
   - Directorio raíz: raíz del repositorio (dejar vacío).
   - Comando de compilación: `node scripts/validate.mjs`.
   - Directorio de salida: `dist`.
   - No requiere variables de entorno ni secretos.
4. Guarda y despliega. Cloudflare asignará la URL HTTPS; luego puedes conectar tu dominio.

El comando valida los datos; los archivos finales ya están en dist. No publiques la raíz completa del repositorio. No se requiere servidor Node en producción, Wrangler ni adaptar la aplicación a Workers.

Los nuevos pushes a main podrán generar despliegues automáticos una vez habilitada la integración. `.openai/hosting.json` identifica el alojamiento anterior y no se necesita para Pages.

## Comprobar el nuevo dominio

Revisar las cuatro pestañas, el mapa, la ficha de charla, agregar/quitar módulos, recargar y verificar que Mi Ruta se conserve. El uso sin conexión requiere una primera visita correcta y la instalación del service worker.

**Las selecciones se guardan por dominio en el navegador:** las elecciones del sitio chatgpt.site no aparecerán automáticamente en la nueva URL de Cloudflare. Cambiar el alojamiento no migra localStorage entre dominios.

Referencias oficiales:
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/get-started/git-integration/

La app es no oficial. Se conservan las atribuciones y procedencia del programa y mapa en docs/; no se atribuye una licencia abierta a materiales de terceros.
