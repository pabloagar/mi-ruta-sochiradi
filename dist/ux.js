import {selected,isLive,sortActivities,filterActivities,setRule,roomKey} from './domain.js';

// Personal choices are independent of filters and the next general start.
export function personalAgenda(activities,rules,clock){
 const chosen=activities.filter(a=>selected(a,rules)).sort(sortActivities);
 const current=chosen.filter(a=>isLive(a,clock));
 const future=chosen.filter(a=>a.start&&(a.date>clock.date||a.date===clock.date&&a.start>clock.time));
 const first=future[0],next=first?future.filter(a=>a.date===first.date&&a.start===first.start):[];
 const unknown=chosen.filter(a=>!a.start||!a.end);
 return {chosen,current,next,unknown,status:!chosen.length?'empty':current.length||next.length?'scheduled':unknown.length?'unknown':'finished'};
}

// Browsing a room is separate from explicitly filtering search results by room.
export function searchProgram(activities,filters,lookup){
 return filterActivities(activities,{...filters,day:filters.scope==='all'?undefined:filters.day},lookup).sort(sortActivities);
}

export function routeDates(activities,rules,visibleDates){
 return [...new Set([...visibleDates,...activities.filter(a=>selected(a,rules)).map(a=>a.date)])].sort();
}

// Preview the existing include action; never changes current choices.
export function groupPreview(items,rules,scope,key){
 const keys=scope==='block'?[key]:[...new Set(items.map(roomKey))];
 const proposed=keys.reduce((r,k)=>setRule(r,scope==='block'?'blocks':'rooms',k,true),rules);
 const included=items.filter(a=>selected(a,proposed)).sort(sortActivities);
 return {included,excluded:items.filter(a=>!selected(a,proposed)),added:included.filter(a=>!selected(a,rules)).length,kept:included.filter(a=>selected(a,rules)).length};
}
