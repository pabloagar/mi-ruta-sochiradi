import {selected,isLive,sortActivities,filterActivities} from './domain.js';

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
