export const SCHEMA=1, STORAGE_KEY='congreso-2-route-v1';
export const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const minutes=s=>/^\d{2}:\d{2}$/.test(s??'')?Number(s.slice(0,2))*60+Number(s.slice(3)):null;
export const roomKey=a=>`${a.date}:${a.roomId}`;
export const emptyRules=()=>({rooms:{},blocks:{},activities:{}});
export const owns=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
export function decision(a,rules){
 if(owns(rules.activities,a.id))return {selected:rules.activities[a.id],source:'individual'};
 if(owns(rules.blocks,a.blockId))return {selected:rules.blocks[a.blockId],source:'block'};
 if(owns(rules.rooms,roomKey(a)))return {selected:rules.rooms[roomKey(a)],source:'room'};
 return {selected:false,source:'none'};
}
export const selected=(a,r)=>decision(a,r).selected;
export function setRule(rules,scope,key,value){
 if(!['rooms','blocks','activities'].includes(scope)||typeof key!=='string'||!key||!['boolean','undefined'].includes(typeof value))throw Error('Regla inválida');
 const next={...rules,[scope]:{...rules[scope]}};
 if(value===undefined)delete next[scope][key];else next[scope][key]=value;
 return next;
}
export function groupState(activities,rules){const count=activities.filter(a=>selected(a,rules)).length;return {count,total:activities.length,state:count===0?'none':count===activities.length?'all':'mixed'};}
export function overlap(a,b){
 if(a.id===b.id||a.date!==b.date)return false;
 const av=[minutes(a.start),minutes(a.end)],bv=[minutes(b.start),minutes(b.end)];
 if([...av,...bv].some(t=>t===null))return null;
 return Math.max(av[0],bv[0])<Math.min(av[1],bv[1]);
}
export function conflicts(activities,rules){
 const route=activities.filter(a=>selected(a,rules)),pairs=[],ids=new Set(),unknown=route.filter(a=>minutes(a.start)===null||minutes(a.end)===null);
 for(let i=0;i<route.length;i++)for(let j=i+1;j<route.length;j++)if(overlap(route[i],route[j])){const a=route[i],b=route[j];pairs.push({a:a.id,b:b.id,minutes:Math.min(minutes(a.end),minutes(b.end))-Math.max(minutes(a.start),minutes(b.start))});ids.add(a.id);ids.add(b.id);}
 return {pairs,ids,unknown};
}
export function eventClock(date=new Date()){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));
 return {date:`${parts.year}-${parts.month}-${parts.day}`,time:`${parts.hour}:${parts.minute}`};
}
export const isLive=(a,clock)=>a.date===clock.date&&minutes(a.start)!==null&&minutes(a.end)!==null&&minutes(a.start)<=minutes(clock.time)&&minutes(clock.time)<minutes(a.end);
export const sortActivities=(a,b)=>a.date.localeCompare(b.date)||(a.start??'99:99').localeCompare(b.start??'99:99')||a.id.localeCompare(b.id);
export function filterActivities(activities,{day,room='',level='',q='',aux=true},lookup){
 const query=normalize(q).trim();
 return activities.filter(a=>(!day||a.date===day)&&(!room||a.roomId===room)&&(!level||(level==='none'?a.levels.length===0:a.levels.includes(Number(level))))&&(aux||!a.auxiliary)&&(!query||normalize(`${a.title} ${a.speaker??''} ${lookup.rooms[a.roomId]?.name??''} ${lookup.blocks[a.blockId]?.title??''}`).includes(query)));
}
export function loadState(raw,data,legacyRaw){
 const state={schema:SCHEMA,dataVersion:data.meta.version,rules:emptyRules(),signatures:{}},warnings=[];
 try{
  if(raw){const parsed=JSON.parse(raw);if(parsed.schema!==SCHEMA)throw Error('La ruta guardada usa otro formato; no se ha sobrescrito.');
   for(const scope of ['rooms','blocks','activities']){const values=parsed.rules?.[scope];if(!values||typeof values!=='object'||Array.isArray(values))throw Error('No se pudo leer la ruta guardada.');for(const [key,value] of Object.entries(values)){if(typeof value!=='boolean'||['__proto__','constructor','prototype'].includes(key))throw Error('La ruta guardada contiene reglas inválidas.');state.rules[scope][key]=value;}}
   state.signatures=parsed.signatures??{};
   for(const [old,id]of Object.entries(data.meta.aliases??{})){if(owns(state.rules.activities,old)){if(!owns(state.rules.activities,id))state.rules.activities[id]=state.rules.activities[old];delete state.rules.activities[old];}}
   if(parsed.dataVersion!==data.meta.version)warnings.push('El programa se actualizó. Revisa los horarios y conflictos de tu ruta.');
   const validIds=new Set(data.activities.map(a=>a.id)),missing=Object.keys(state.rules.activities).filter(id=>!validIds.has(id));if(missing.length)warnings.push(`${missing.length} decisiones pertenecen a actividades que ya no están en esta versión; se conservaron sin reasignarlas.`);
  }else if(legacyRaw){const picks=JSON.parse(legacyRaw);for(const a of data.activities){const all=[a.id,...Object.entries(data.meta.aliases??{}).filter(([,id])=>id===a.id).map(([id])=>id)];if(all.some(id=>picks[id]))state.rules.activities[a.id]=true;}if(Object.keys(state.rules.activities).length)warnings.push('Se recuperaron las elecciones de la versión anterior en este navegador.');}
  return {state,warnings,readOnly:false};
 }catch(e){return {state,warnings:[e.message||'No se pudo leer la ruta guardada.'],readOnly:true};}
}
export function validateData(data){
 const errors=[],ids=new Set(),rooms=new Set(data.rooms.map(x=>x.id)),blocks=new Map(data.blocks.map(x=>[x.id,x]));
 for(const a of data.activities){if(ids.has(a.id))errors.push(`ID duplicado: ${a.id}`);ids.add(a.id);if(!a.title||!/^\d{4}-\d{2}-\d{2}$/.test(a.date))errors.push(`Identidad incompleta: ${a.id}`);if(!rooms.has(a.roomId)||!blocks.has(a.blockId))errors.push(`Referencia inválida: ${a.id}`);if(blocks.has(a.blockId)&&(blocks.get(a.blockId).date!==a.date||blocks.get(a.blockId).roomId!==a.roomId))errors.push(`Bloque inconsistente: ${a.id}`);if(a.start!==null&&a.end!==null&&(!(minutes(a.start)<minutes(a.end))||minutes(a.end)>1440))errors.push(`Intervalo inválido: ${a.id}`);if(a.levels.some(l=>![1,2,3].includes(l)))errors.push(`Nivel inválido: ${a.id}`);if(!a.source?.page||a.source.page>data.meta.sourcePages)errors.push(`Fuente inválida: ${a.id}`);}
 return errors;
}
