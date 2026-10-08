/* Adapted controls; original room coordinates and routing algorithms are unchanged. */
const MAP_STATE_KEY='congreso-map-view-v2';let activeFloor='both',hasRoute=false,originChosen=false;
const groupOrder=['Salones','Áreas','Módulos','Actividades','Simposios','Stands'];for(const label of groupOrder){const group=[...routeDestination.querySelectorAll('optgroup')].find(g=>g.label===label);if(group){if(label==='Salones')[...group.children].sort((a,b)=>a.textContent.localeCompare(b.textContent,'es',{numeric:true})).forEach(o=>group.append(o));if(label==='Áreas')group.label='Servicios y áreas de apoyo';routeDestination.append(group);}}
const box=document.querySelector('.route-box'),content=document.querySelector('.content');
const destinationLabel=document.createElement('label');destinationLabel.htmlFor='routeDestination';destinationLabel.className='destination-label';destinationLabel.textContent='Hasta';
const directions=document.createElement('details');directions.className='directions';const summary=document.createElement('summary');summary.textContent='Cómo llegar';directions.append(summary);
const originLabel=document.createElement('label');originLabel.htmlFor='routeOrigin';originLabel.textContent='Desde';
const originHelp=document.createElement('small');originHelp.textContent='Elige tu punto de partida. No detectamos tu ubicación.';
directions.append(originLabel,routeOrigin,originHelp,showRouteBtn);
const status=document.createElement('div');status.className='route-summary-line';routeStatus.setAttribute('aria-live','polite');status.append(routeStatus,clearRouteBtn);
box.replaceChildren(originLabel,routeOrigin,destinationLabel,routeDestination);box.classList.add('auto-route');box.className='destination-card auto-route';
const tools=document.querySelector('.map-tools');document.querySelector('.floor-switch').after(tools);
const floorHint=document.createElement('div');floorHint.className='floor-hint';tools.before(floorHint);content.prepend(status);
showRouteBtn.textContent='Mostrar recorrido';clearRouteBtn.textContent='Quitar recorrido';document.querySelector('#zoomReset').textContent='Ver plano completo';
function notifyDestination(){parent.postMessage({type:'congress-map-destination',roomId:routeDestination.value.startsWith('r:')?routeDestination.value.slice(2):null},location.origin);}
function updateMapHeight(){parent.postMessage({type:'congress-map-height',height:Math.ceil(document.body.getBoundingClientRect().height)},location.origin);}
function saveMapView(){try{sessionStorage.setItem(MAP_STATE_KEY,JSON.stringify({origin:originChosen?routeOrigin.value:'',destination:routeDestination.value,floor:activeFloor,zoom,drawn:hasRoute}));}catch{}}
function destinationInfo(){const [kind,id]=routeDestination.value.split(':');if(kind==='r')return getRoomDestination(id);if(kind==='s')return {floor:1};if(kind==='alias'&&routeAliases[id]?.target)return getRoomDestination(routeAliases[id].target);return null;}
function updateControls(){clearRouteBtn.hidden=!hasRoute;floorHint.hidden=true;notifyDestination();}
function setFloor(){activeFloor='both';document.querySelectorAll('[data-map-floor]').forEach(e=>e.hidden=false);updateControls();saveMapView();updateMapHeight();}
function highlightRoom(id){document.querySelectorAll('[data-room-id]').forEach(e=>e.classList.toggle('chosen-room',e.dataset.roomId===id));}
const guide=document.createElement('ol');guide.className='route-guide';status.after(guide);
function renderGuide(){guide.replaceChildren();if(!hasRoute)return;const dest=destinationInfo(),origin=getOriginLoc();if(!dest)return;const destName=routeDestination.selectedOptions[0].textContent,originName=routeOrigin.selectedOptions[0].textContent;const add=(icon,text)=>{const li=document.createElement('li'),badge=document.createElement('b'),label=document.createElement('span');badge.textContent=icon;label.textContent=text;li.append(badge,label);guide.append(li);};
 if(origin.floor===dest.floor){add('1','Planta '+(origin.floor===1?'baja':'alta')+' · Sigue el trazado hasta '+destName+'.');return;}
 const side=(origin.floor===1?dest.stair:origin.stair)||'left',stair='escalera '+(side==='left'?'izquierda':'derecha');
 add('1','Desde '+originName+' hasta la '+stair+'.');add(origin.floor===1?'↑':'↓',(origin.floor===1?'Sube a planta alta':'Baja a planta baja')+' por la '+stair+'.');add('2','Desde la escalera hasta '+destName+'.');
}

function placeEndpoint(floor,point,kind,label){const svg=document.querySelector('[data-map-floor="'+floor+'"] svg'),stage=svg.parentElement,box=svg.viewBox.baseVal;const marker=document.createElement('div');marker.className='map-endpoint '+kind+(point[0]/box.width<.2?' edge-left':point[0]/box.width>.8?' edge-right':'')+(point[1]/box.height>.78?' near-bottom':'');marker.dataset.kind=kind;marker.setAttribute('role','img');marker.setAttribute('aria-label',label);marker.style.left=(point[0]/box.width*100)+'%';marker.style.top=(point[1]/box.height*100)+'%';const dot=document.createElement('i'),text=document.createElement('span');text.textContent=label;marker.append(dot,text);stage.append(marker);}
function renderEndpoints(){document.querySelectorAll('.map-endpoint').forEach(e=>e.remove());const value=routeDestination.value,[kind,id]=value.split(':'),dest=destinationInfo();const origin=originChosen?getOriginLoc():null;let targets=[];if(dest?.coord)targets=[{floor:dest.floor,point:dest.coord}];else if(kind==='s'){const paths=[...routeLayer1.querySelectorAll('.route-line')],last=paths.at(-1);if(last){const p=last.getPointAtLength(last.getTotalLength());targets=[{floor:1,point:[p.x,p.y]}];}}else{const special=kind==='alias'?routeAliases[id]?.target:kind==='special'?id:null;if(special==='baths')targets=bathroomTargets.map(b=>({floor:b.floor,point:b.pin}));if(special==='posters')targets=posterTargets.map(b=>({floor:b.floor,point:b.coord}));}
 const same=origin&&targets.length===1&&targets[0].floor===origin.floor&&targets[0].point[0]===origin.coord[0]&&targets[0].point[1]===origin.coord[1];if(same){placeEndpoint(origin.floor,origin.coord,'destination','Inicio y destino');return;}if(origin)placeEndpoint(origin.floor,origin.coord,'origin','Desde aquí');targets.forEach(t=>placeEndpoint(t.floor,t.point,'destination','Tu destino'));
}
function recalculate(){clearRoute();guide.replaceChildren();originChosen=!!routeOrigin.value;hasRoute=false;highlightRoom(routeDestination.value.startsWith('r:')?routeDestination.value.slice(2):null);if(originChosen&&routeDestination.value){showRoute();hasRoute=routeLayer1.children.length+routeLayer2.children.length>0;renderGuide();}else routeStatus.textContent=routeDestination.value?'Elige desde dónde sales para ver el recorrido.':'Elige origen y destino. El recorrido aparece automáticamente.';renderEndpoints();setFloor();}
function destinationChanged(){recalculate();}
function chooseRoom(id){if(![...routeDestination.options].some(o=>o.value==='r:'+id))return;routeDestination.value='r:'+id;destinationChanged();}
document.querySelectorAll('[data-floor]').forEach(e=>e.addEventListener('click',()=>setFloor(e.dataset.floor)));
routeDestination.addEventListener('change',destinationChanged);
routeOrigin.addEventListener('change',recalculate);
clearRouteBtn.addEventListener('click',()=>{routeOrigin.value='';recalculate();});
// Preserve the visual centre while zooming either floor.
const originalSetZoom=setZoom;setZoom=function(v){const containers=[...document.querySelectorAll('.map-scroll')],ratios=containers.map(e=>[(e.scrollLeft+e.clientWidth/2)/Math.max(1,e.scrollWidth),(e.scrollTop+e.clientHeight/2)/Math.max(1,e.scrollHeight)]);originalSetZoom(v);requestAnimationFrame(()=>{containers.forEach((e,i)=>{e.scrollLeft=ratios[i][0]*e.scrollWidth-e.clientWidth/2;e.scrollTop=ratios[i][1]*e.scrollHeight-e.clientHeight/2;});saveMapView();updateMapHeight();});};
directions.addEventListener('toggle',updateMapHeight);document.querySelectorAll('.map-tools button').forEach(e=>e.addEventListener('click',saveMapView));
let saved;try{saved=JSON.parse(sessionStorage.getItem(MAP_STATE_KEY)||'null');}catch{}
routeOrigin.value='';if(saved){if([...routeOrigin.options].some(o=>o.value===saved.origin)){routeOrigin.value=saved.origin;originChosen=!!saved.origin;}if([...routeDestination.options].some(o=>o.value===saved.destination))routeDestination.value=saved.destination;setZoom(Number(saved.zoom)||100);if(saved.drawn&&originChosen&&routeDestination.value){showRoute();hasRoute=true;}else routeStatus.textContent=routeDestination.value?'Destino: '+routeDestination.selectedOptions[0].textContent:'Selecciona un salón.';highlightRoom(routeDestination.value.slice(2));setFloor(['1','2','both'].includes(saved.floor)?saved.floor:'1');}else{routeStatus.textContent='Selecciona un salón para ubicarlo.';setFloor('1');}
const requested=new URLSearchParams(location.search).get('room');if(requested&&routeDestination.value!=='r:'+requested)chooseRoom(requested);
new ResizeObserver(updateMapHeight).observe(document.body);window.addEventListener('load',updateMapHeight);document.querySelectorAll('img,image').forEach(e=>e.addEventListener('load',updateMapHeight));recalculate();document.body.dataset.mapReady='true';
