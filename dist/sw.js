const VERSION='congreso-2026-v1',PREFIX='congreso-2026-';
const CORE=['./','./index.html','./styles.css','./app.js','./domain.js','./agenda.json','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./audit.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(CORE)));});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.endsWith('.pdf'))return;event.respondWith(caches.open(VERSION).then(async cache=>{const saved=await cache.match(event.request,{ignoreSearch:true});if(saved)return saved;try{return await fetch(event.request);}catch{if(event.request.mode==='navigate')return await cache.match('./index.html');return new Response('Sin conexión',{status:503});}}));});
