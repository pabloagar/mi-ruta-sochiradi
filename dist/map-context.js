import {selected,isLive,minutes,sortActivities} from './domain.js';
import {isPause} from './experience.js';
// Floor assignments from the official map anchors; no inference from room numbering.
const floors={'1':'Planta baja','2':'Planta baja','3':'Planta baja','4':'Planta baja','6':'Planta alta','7':'Planta alta','8':'Planta alta'};
export const floorLabel=number=>floors[number]||'';
export function mapSuggestions(activities,rules,c){
 const chosen=activities.filter(a=>selected(a,rules)&&!isPause(a)&&!a.auxiliary),current=chosen.filter(a=>isLive(a,c));
 const unique=items=>new Set(items.map(a=>a.roomId)).size===1?items.slice().sort(sortActivities)[0]:null;
 const recent=chosen.filter(a=>a.date===c.date&&a.end&&a.end<=c.time&&minutes(c.time)-minutes(a.end)<=90);
 const lastEnd=recent.map(a=>a.end).sort().at(-1);
 const origin=current.length?unique(current):unique(recent.filter(a=>a.end===lastEnd));
 const future=chosen.filter(a=>a.start&&(a.date>c.date||a.date===c.date&&a.start>c.time)).sort(sortActivities),first=future[0];
 return {origin,next:first?unique(future.filter(a=>a.date===first.date&&a.start===first.start)):null};
}
