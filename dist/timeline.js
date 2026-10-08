import {minutes,overlap,selected,setRule} from './domain.js';
export const hm=n=>`${Math.floor(n/60)}`.padStart(2,'0')+':'+`${n%60}`.padStart(2,'0');
// Half-open intervals. Unknown times never become invented free time.
export function routeDay(activities,rules,date){
 const daily=activities.filter(a=>a.date===date),chosen=daily.filter(a=>selected(a,rules));
 const known=chosen.filter(a=>a.start&&a.end).sort((a,b)=>a.start.localeCompare(b.start)||a.end.localeCompare(b.end)),groups=[];
 for(const a of known){const last=groups.at(-1),s=minutes(a.start),e=minutes(a.end);if(last&&s<last.end){last.items.push(a);last.end=Math.max(last.end,e);}else groups.push({start:s,end:e,items:[a]});}
 const scheduled=daily.filter(a=>a.start&&a.end),start=scheduled.length?Math.min(...scheduled.map(a=>minutes(a.start))):null,end=scheduled.length?Math.max(...scheduled.map(a=>minutes(a.end))):null;
 const unknown=chosen.filter(a=>!a.start||!a.end),segments=[];let cursor=start,previous=null,changes=0,freeMinutes=0;
 for(const g of groups){if(cursor<g.start&&!unknown.length){segments.push({kind:'free',start:cursor,end:g.start});freeMinutes+=g.start-cursor;}const current=g.items.length===1?g.items[0]:null;const change=previous&&current&&previous.roomId!==current.roomId;if(change)changes++;segments.push({...g,kind:g.items.length>1?'conflict':'activity',change:!!change});previous=current;cursor=g.end;}
 if(cursor!==null&&cursor<end&&!unknown.length){segments.push({kind:'free',start:cursor,end});freeMinutes+=end-cursor;}
 return {chosen,known,unknown,segments,changes,freeMinutes,start,end};
}
export function optionsInGap(activities,date,start,end){return activities.filter(a=>a.date===date&&a.start&&a.end&&minutes(a.start)>=start&&minutes(a.end)<=end);}
export function keepActivity(activities,rules,id){const chosen=activities.find(a=>a.id===id);if(!chosen)return rules;let result=setRule(rules,'activities',id,true);for(const a of activities)if(selected(a,rules)&&overlap(chosen,a))result=setRule(result,'activities',a.id,false);return result;}
export function timetable(activities){
 const known=activities.filter(a=>a.start&&a.end),times=[...new Set(known.flatMap(a=>[a.start,a.end]))].sort(),items=known.map(a=>({activity:a,start:times.indexOf(a.start),end:times.indexOf(a.end),lane:0})),roomLanes={};
 for(const roomId of new Set(known.map(a=>a.roomId))){const lanes=[];for(const item of items.filter(i=>i.activity.roomId===roomId).sort((a,b)=>a.start-b.start||a.end-b.end)){let lane=lanes.findIndex(end=>end<=item.start);if(lane<0)lane=lanes.length;item.lane=lane;lanes[lane]=item.end;}roomLanes[roomId]=lanes.length;}
 return {times,items,roomLanes,unknown:activities.filter(a=>!a.start||!a.end)};
}
