const MAP_STATE_KEY='congreso-map-view-v1';let activeFloor='1';
function updateMapHeight(){parent.postMessage({type:'congress-map-height',height:Math.ceil(document.documentElement.getBoundingClientRect().height)},location.origin);}
function saveMapView(){try{sessionStorage.setItem(MAP_STATE_KEY,JSON.stringify({origin:routeOrigin.value,destination:routeDestination.value,floor:activeFloor,zoom,drawn:document.querySelectorAll('.route-line').length>0}));}catch{}}
function setFloor(value){activeFloor=value;document.querySelectorAll('[data-map-floor]').forEach(e=>e.hidden=value!=='both'&&e.dataset.mapFloor!==value);document.querySelectorAll('[data-floor]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.floor===value)));saveMapView();updateMapHeight();}
function highlightRoom(id){document.querySelectorAll('[data-room-id]').forEach(e=>e.classList.toggle('chosen-room',e.dataset.roomId===id));}
function chooseRoom(id){const option=[...routeDestination.options].find(o=>o.value==='r:'+id);if(!option)return;routeDestination.value=option.value;clearRoute();highlightRoom(id);routeStatus.textContent='Destino: '+option.textContent+'. Elige tu origen y pulsa Mostrar recorrido.';const dest=getRoomDestination(id);if(dest)setFloor(String(dest.floor));saveMapView();}
const tools=document.querySelector('.map-tools');document.querySelector('.floor-switch').after(tools);
document.querySelectorAll('[data-floor]').forEach(e=>e.addEventListener('click',()=>setFloor(e.dataset.floor)));
routeDestination.addEventListener('change',()=>{clearRoute();const id=routeDestination.value.startsWith('r:')?routeDestination.value.slice(2):null;highlightRoom(id);const dest=id&&getRoomDestination(id);if(dest)setFloor(String(dest.floor));saveMapView();});
routeOrigin.addEventListener('change',()=>{clearRoute();saveMapView();});
showRouteBtn.addEventListener('click',()=>{const f1=routeLayer1.children.length>0,f2=routeLayer2.children.length>0;setFloor(f1&&f2?'both':f2?'2':'1');saveMapView();});
clearRouteBtn.addEventListener('click',()=>{highlightRoom(null);saveMapView();});
document.querySelectorAll('.map-tools button').forEach(e=>e.addEventListener('click',()=>{saveMapView();updateMapHeight();}));
let saved;try{saved=JSON.parse(sessionStorage.getItem(MAP_STATE_KEY)||'null');}catch{}
if(saved){if([...routeOrigin.options].some(o=>o.value===saved.origin))routeOrigin.value=saved.origin;if([...routeDestination.options].some(o=>o.value===saved.destination))routeDestination.value=saved.destination;setZoom(Number(saved.zoom)||100);if(saved.drawn)showRoute();highlightRoom(routeDestination.value.slice(2));setFloor(['1','2','both'].includes(saved.floor)?saved.floor:'1');}else setFloor('1');
const requested=new URLSearchParams(location.search).get('room');if(requested&&routeDestination.value!=='r:'+requested)chooseRoom(requested);
new ResizeObserver(updateMapHeight).observe(document.body);window.addEventListener('load',updateMapHeight);document.querySelectorAll('img,image').forEach(e=>e.addEventListener('load',updateMapHeight));
document.body.dataset.mapReady='true';
