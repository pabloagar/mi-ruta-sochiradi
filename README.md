# Congreso 2.0

Agenda PWA en español que continúa el HTML aportado por el usuario. Ahora, Programa y Mi Ruta; selección por sala/día, bloque y actividad, exclusiones, conflictos y almacenamiento local.

## Ejecutar

Requiere Node.js moderno. Sin dependencias de ejecución ni instalación: `npm run dev`. Abrir http://127.0.0.1:4173. No abrir index.html directamente como archivo: módulos y PWA requieren un servidor.

`npm test` ejecuta 13 pruebas de dominio. `npm run check` revisa sintaxis JavaScript. `npm run validate` verifica datos y archivos necesarios. `npm run build` valida la distribución estática existente en dist; no transpila.

## Fuentes

`data/source/base-original.html` y `data/source/programa-2026.pdf` conservan los archivos del usuario. `dist/agenda.json` contiene 387 actividades únicas, 67 bloques y 7 salas. Las 412 filas horarias extraídas del PDF están asociadas a registros, incluidas repeticiones entre idiomas y ceremonias compartidas. Consultar `docs/data-audit.md`, `data/coverage.json` y `data/corrections.json` para procedencia, cambios e incertidumbres.

No hay horas exactas documentadas para el Encuentro de Residentes. Una actividad de ICIS difiere entre la versión española e inglesa; ambas evidencias se conservan y la interfaz lo indica.

## Regenerar los datos

Requiere Python con pypdf y pdfplumber. Ejecutar en orden, desde la raíz: `python scripts/import_base.py`, `python scripts/audit_pdf.py`, `node scripts/reconcile.mjs`, `npm run validate`, `npm test`. No ejecutar reconcile por separado sobre datos ya conciliados. Revisar visualmente las anomalías antes de aceptar una nueva fuente; las correcciones actuales corresponden exclusivamente al PDF conservado y a sus hashes.

## Diseño y evolución

HTML, CSS y módulos JavaScript conservan la base original sin introducir un framework. `dist/domain.js` separa reglas, horarios, conflictos y persistencia; `dist/app.js` presenta la interfaz. Cambiar los estilos y componentes cuando lleguen las visuales, sin alterar las reglas de AGENTS.md ni sustituir los datos auditados.

Verde/naranja inspirados en la referencia del congreso y la portada del PDF; los tonos utilizados no se certifican como códigos oficiales. Niveles: 1 verde, 2 morado y 3 amarillo.

## PWA, privacidad y actualizaciones

La ruta se guarda por navegador y origen. Las selecciones del HTML abierto como archivo no se transfieren automáticamente al nuevo sitio. La migración del formato anterior solo funciona si sus datos existen en el mismo origen. No hay sincronización entre dispositivos.

La primera visita necesita conexión. Después se guardan interfaz y agenda; el PDF se descarga únicamente al abrirlo y no está disponible offline por defecto. Para instalar, usar Agregar a pantalla de inicio en Safari o la opción de instalación del navegador compatible.

En cada cambio de distribución, incrementar VERSION en dist/sw.js. La nueva caché se prepara íntegramente y la app ofrece aplicar la actualización; las reglas de ruta permanecen en localStorage. No eliminar claves de versiones desconocidas ni datos corruptos silenciosamente.

## Publicación

`dist/` es una web estática desplegable por HTTPS. Este proyecto usa Sites, con identidad en `.openai/hosting.json`; reutilizarla al actualizar, sin crear otro sitio. La publicación inicial es privada. Nunca guardar credenciales en el repositorio.

Ver `docs/verification.md` para pruebas ejecutadas y pendientes. La emulación no sustituye la comprobación en Safari/iPhone y Chrome/Android físicos.
