// Installation is optional; never asks for notification permissions.
const KEY='congreso-install-hint-v1',SESSION='congreso-install-hint-shown';
let deferred=null,elapsed=0,sessionShown=false,installed=false,until=0;
try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');installed=!!saved.installed;until=Number(saved.until)||0;sessionShown=sessionStorage.getItem(SESSION)==='1';}catch{}
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const mobile=ios||/Android/i.test(navigator.userAgent);
const banner=document.createElement('aside');banner.id='installHint';banner.hidden=true;banner.setAttribute('aria-label','Instalar Mi ruta Sochiradi');banner.innerHTML='<p aria-live="polite"><strong>Ten Mi ruta Sochiradi a mano</strong><br>Agrega la app a tu pantalla de inicio.</p><div class="install-actions"><button type="button" class="primary" id="installStart">Cómo instalar</button><button type="button" id="installLater">Ahora no</button></div><p id="installSteps" hidden></p>';
document.body.append(banner);const start=banner.querySelector('#installStart'),steps=banner.querySelector('#installSteps');
function persist(){try{localStorage.setItem(KEY,JSON.stringify({installed,until}));}catch{}}
function dismiss(){until=Date.now()+7*24*60*60*1000;persist();banner.hidden=true;}
function instructions(){steps.hidden=false;steps.textContent=ios?'En Safari, toca Compartir (puede estar dentro de Más), luego «Agregar a pantalla de inicio». Activa «Abrir como app web» si aparece y toca Agregar.':/Android/i.test(navigator.userAgent)?'Abre el menú ⋮ de Chrome y busca «Instalar app» o «Agregar a pantalla principal». Si estás dentro de otra app, abre primero este enlace en Chrome.':'En Chrome o Edge, busca la opción de instalar esta página en la barra de direcciones o en el menú del navegador. Si no aparece, puedes seguir usando el enlace web.';start.hidden=true;banner.querySelector('#installLater').textContent='Entendido';}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferred=event;start.textContent='Instalar';});
window.addEventListener('appinstalled',()=>{installed=true;deferred=null;persist();banner.hidden=true;});
matchMedia('(display-mode: standalone)').addEventListener('change',()=>{if(standalone())banner.hidden=true;});
window.addEventListener('storage',e=>{if(e.key===KEY){try{const value=JSON.parse(e.newValue||'{}');installed=!!value.installed;until=Number(value.until)||0;if(installed||until>Date.now())banner.hidden=true;}catch{}}});
banner.querySelector('#installLater').addEventListener('click',dismiss);
start.addEventListener('click',async()=>{if(!deferred){instructions();return;}const event=deferred;deferred=null;try{await event.prompt();const result=await event.userChoice;if(result.outcome==='accepted'){installed=true;persist();banner.hidden=true;}else dismiss();}catch{start.textContent='Cómo instalar';instructions();}});
const busy=()=>!!document.querySelector('dialog[open]')||['toast','update'].some(id=>{const e=document.getElementById(id);return e&&!e.hidden;});
setInterval(()=>{if(document.visibilityState!=='visible'||standalone()||installed){banner.hidden=true;return;}if(!banner.hidden&&busy()){banner.hidden=true;sessionShown=false;return;}if(sessionShown||until>Date.now())return;elapsed++;if(elapsed<45||!document.body.dataset.ready||busy()||(!mobile&&!deferred))return;sessionShown=true;try{sessionStorage.setItem(SESSION,'1');}catch{}start.textContent=deferred?'Instalar':'Cómo instalar';banner.hidden=false;},1000);
