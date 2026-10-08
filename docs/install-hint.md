# Invitación de instalación — 2026.10.08.25

Aviso opcional tras 45 segundos acumulados con la página visible. Se difiere mientras haya una ficha, aviso de actualización o mensaje de guardado. No roba el foco ni solicita notificaciones. Se oculta en modo standalone y tras instalación detectada.

Si beforeinstallprompt está disponible, Instalar abre el diálogo nativo tras el toque. En iPhone/iPad muestra instrucciones de Safari; Android sin evento recibe indicaciones del menú de Chrome. En escritorio solo se ofrece automáticamente si llega el evento de instalación. Ahora no/Entendido posponen siete días por navegador y dominio; el aviso aparece como máximo una vez por sesión de pestaña. La detección de instalación entre navegadores no es universal.

Pruebas tests/install-hint.cjs: reloj simulado antes/después de 45 segundos, instrucciones con agente de usuario iPhone, evento nativo simulado invocado solo al pulsar, descarte persistente y standalone. No se realizó instalación en teléfono físico.

Referencias: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event y https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios
