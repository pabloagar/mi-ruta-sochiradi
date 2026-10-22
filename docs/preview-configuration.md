# Cloudflare previews / Vistas previas

The configuration exists only on this preview PR branch, not on `main`. Cloudflare's Git preview builds continued to execute the bare command despite the dashboard command edit, so the file uses the automatically discovered name `wrangler.jsonc`.

```sh
npx wrangler preview --config ./wrangler.jsonc
```

Use this command only in **Settings → Builds → Previews Base → Preview command**. The bare `npx wrangler preview` also detects this file. The file serves `./dist`, preserves compatibility date `2026-10-09` and enables the required empty `previews` block. It contains no production routes, secrets or data bindings. Do not merge or deploy this branch to production as part of preview verification.

Keep the production branch `main` and its existing deploy command unchanged:

```sh
npx wrangler deploy --assets ./dist --name mi-ruta-sochiradi --compatibility-date 2026-10-09
```

The original failed build used `npx wrangler preview` without selecting the configuration file. Check the actual command printed in a new build log, then verify its preview URL. Saving a setting or retrying an old build does not by itself establish that a new preview works. Do not promote a preview to production as part of this check.

## Español

El archivo `wrangler.jsonc` existe solo en la rama del PR. Se utiliza el nombre autodetectable porque los builds de Git continuaron usando el comando sin argumentos pese al ajuste del panel. Conserva los recursos de `dist` y la fecha de compatibilidad actual; no modifica el código ni los datos de la aplicación. La rama y el comando de producción deben permanecer intactos.

Comprobar el comando realmente ejecutado en el registro y la URL resultante antes de declarar éxito. Esta corrección permanece en la rama del PR, sin fusionar a `main`.

[Cloudflare configuration reference](https://developers.cloudflare.com/workers/previews/configuration/#wrangler-configuration-file)
